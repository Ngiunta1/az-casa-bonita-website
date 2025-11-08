// ScrollSnap.tsx
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";

interface ScrollSnapProps {
  /** Optional total sections if you want guard rails; otherwise inferred at runtime */
  totalSections?: number;
  children: React.ReactNode;
  /** Duration of each scroll animation in ms (default: 1000) */
  scrollDuration?: number;
  /** Pause between sections when scrolling multiple sections in ms (default: 300) */
  pauseDuration?: number;
}

export type ScrollSnapHandle = {
  scrollTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  getIndex: () => number;
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const ScrollSnap = forwardRef<ScrollSnapHandle, ScrollSnapProps>(
  (
    { children, totalSections, scrollDuration = 1000, pauseDuration = 300 },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const isScrolling = useRef(false);
    const touchStart = useRef(0);

    const sectionCount = useMemo(() => {
      const kids = React.Children.toArray(children);
      return totalSections ?? kids.length;
    }, [children, totalSections]);

    const viewportH = () => window.innerHeight;

    const computeIndex = useCallback(() => {
      const el = containerRef.current;
      if (!el) return 0;
      return Math.round(el.scrollTop / viewportH());
    }, []);

    // Easing function
    const easeInOutCubic = useCallback((t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }, []);

    // Animate scroll to position
    const animateScrollTo = useCallback(
      (targetIndex: number, onComplete?: () => void) => {
        const container = containerRef.current;
        if (!container) return;

        const viewportHeight = viewportH();
        const targetScroll = targetIndex * viewportHeight;
        const startScroll = container.scrollTop;
        const distance = targetScroll - startScroll;

        if (distance === 0) {
          onComplete?.();
          return;
        }

        const duration = scrollDuration;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = easeInOutCubic(progress);

          container.scrollTop = startScroll + distance * easeProgress;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            onComplete?.();
          }
        };

        requestAnimationFrame(animate);
      },
      [scrollDuration, easeInOutCubic]
    );

    // Snap to section with optional multi-section pause behavior
    const doSnap = useCallback(
      (targetIndex: number) => {
        const clamped = clamp(targetIndex, 0, sectionCount - 1);
        const diff = Math.abs(clamped - index);

        if (diff > 1) {
          // Multi-section scroll with pauses
          isScrolling.current = true;
          const direction = clamped > index ? 1 : -1;
          let current = index;

          const scrollNext = () => {
            current += direction;
            setIndex(current);
            animateScrollTo(current, () => {
              if (current !== clamped) {
                setTimeout(scrollNext, pauseDuration);
              } else {
                isScrolling.current = false;
              }
            });
          };
          scrollNext();
        } else {
          // Single section scroll
          isScrolling.current = true;
          setIndex(clamped);
          animateScrollTo(clamped, () => {
            isScrolling.current = false;
          });
        }
      },
      [index, sectionCount, animateScrollTo, pauseDuration]
    );

    // Expose imperative API
    useImperativeHandle(
      ref,
      () => ({
        scrollTo: (i: number) => doSnap(i),
        next: () => doSnap(index + 1),
        prev: () => doSnap(index - 1),
        getIndex: () => index,
      }),
      [doSnap, index]
    );

    // Wheel and touch handling
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();

        if (isScrolling.current) return;

        // Respect prefers-reduced-motion
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          return;
        }

        isScrolling.current = true;

        const viewportHeight = viewportH();
        const currentIndex = Math.round(container.scrollTop / viewportHeight);

        // Snap immediately on scroll direction
        const nextIndex =
          e.deltaY > 0
            ? Math.min(currentIndex + 1, sectionCount - 1)
            : Math.max(currentIndex - 1, 0);

        setIndex(nextIndex);

        const targetScroll = nextIndex * viewportHeight;
        const startScroll = container.scrollTop;
        const distance = targetScroll - startScroll;

        if (distance === 0) {
          isScrolling.current = false;
          return;
        }

        const duration = scrollDuration;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = easeInOutCubic(progress);

          container.scrollTop = startScroll + distance * easeProgress;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            isScrolling.current = false;
          }
        };

        requestAnimationFrame(animate);
      };

      // Handle touch for mobile
      const handleTouchStart = (e: TouchEvent) => {
        touchStart.current = e.touches[0].clientY;
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (isScrolling.current) {
          e.preventDefault();
          return;
        }

        const touchEnd = e.touches[0].clientY;
        const diff = touchStart.current - touchEnd;

        // Trigger on minimal touch movement (more sensitive)
        if (Math.abs(diff) > 30) {
          e.preventDefault();
          handleWheel({ deltaY: diff, preventDefault: () => {} } as WheelEvent);
        }
      };

      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });

      return () => {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
      };
    }, [scrollDuration, easeInOutCubic, sectionCount]);

    // Keep local index in sync when user scrolls manually
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      let rAF = 0;
      const onScroll = () => {
        cancelAnimationFrame(rAF);
        rAF = requestAnimationFrame(() => {
          if (!isScrolling.current) {
            setIndex(computeIndex());
          }
        });
      };
      el.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        el.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(rAF);
      };
    }, [computeIndex]);

    return (
      <div
        ref={containerRef}
        className="
          h-screen overflow-y-scroll
          snap-y snap-mandatory
          overscroll-contain
        "
        style={{
          // iOS momentum + consistent behavior
          WebkitOverflowScrolling: "touch",
        }}
        // Bonus A11y: allow PageUp/PageDown/Home/End navigation
        onKeyDown={(e) => {
          if (e.defaultPrevented) return;
          if (["PageDown", "ArrowDown", "Space"].includes(e.key)) {
            e.preventDefault();
            (ref as any)?.current?.next?.();
          } else if (["PageUp", "ArrowUp"].includes(e.key)) {
            e.preventDefault();
            (ref as any)?.current?.prev?.();
          } else if (e.key === "Home") {
            e.preventDefault();
            (ref as any)?.current?.scrollTo?.(0);
          } else if (e.key === "End") {
            e.preventDefault();
            (ref as any)?.current?.scrollTo?.(sectionCount - 1);
          }
        }}
        tabIndex={0} // make the container focusable for keyboard control
      >
        {children}
      </div>
    );
  }
);

ScrollSnap.displayName = "ScrollSnap";

export default ScrollSnap;
