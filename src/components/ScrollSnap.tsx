// ScrollSnap.tsx
import { AnimatePresence } from "motion/react";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { Animate } from "./Animate";

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
  scrollTo: (
    index: number,
    opts?: { duration?: number; pause?: number },
  ) => void;
  next: () => void;
  prev: () => void;
  getIndex: () => number;
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

/**
 * Returns a stable viewport height that doesn't shift when mobile
 * browser chrome (URL bar) shows/hides. Falls back to window.innerHeight
 * on browsers that don't support dvh.
 */
function useStableViewportHeight() {
  const [height, setHeight] = useState(() => window.innerHeight);

  useEffect(() => {
    // Probe for dvh support — create a temp element sized to 100dvh
    const probe = document.createElement("div");
    probe.style.height = "100dvh";
    probe.style.position = "fixed";
    probe.style.visibility = "hidden";
    document.body.appendChild(probe);
    const dvhSupported =
      probe.offsetHeight > 0 && probe.offsetHeight !== window.innerHeight;
    // Even if equal, dvh is still more correct — but we use it as a signal
    const getDvhHeight = () => probe.offsetHeight;
    document.body.removeChild(probe);

    // Use visualViewport API if available (best for mobile)
    const vv = window.visualViewport;
    if (vv) {
      const update = () => setHeight(vv.height);
      update();
      vv.addEventListener("resize", update);
      return () => vv.removeEventListener("resize", update);
    }

    // Fallback: listen to resize
    const update = () => setHeight(window.innerHeight);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return height;
}

const ScrollSnap = forwardRef<ScrollSnapHandle, ScrollSnapProps>(
  (
    { children, totalSections, scrollDuration = 1000, pauseDuration = 300 },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const isScrolling = useRef(false);
    const viewportHeight = useStableViewportHeight();

    // Touch tracking refs
    const touchStartY = useRef(0);
    const touchStartTime = useRef(0);
    const touchTracking = useRef(false);

    const sectionCount = useMemo(() => {
      const kids = React.Children.toArray(children);
      return totalSections ?? kids.length;
    }, [children, totalSections]);

    const computeIndex = useCallback(() => {
      const el = containerRef.current;
      if (!el) return 0;
      return Math.round(el.scrollTop / viewportHeight);
    }, [viewportHeight]);

    const easeInOutCubic = useCallback((t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }, []);

    // Core animated scroll — shared by wheel, touch, and imperative API
    const animateScrollTo = useCallback(
      (
        targetIndex: number,
        onComplete?: () => void,
        durationOverride?: number,
      ) => {
        const container = containerRef.current;
        if (!container) return;

        const targetScroll = targetIndex * viewportHeight;
        const startScroll = container.scrollTop;
        const distance = targetScroll - startScroll;

        if (Math.abs(distance) < 1) {
          container.scrollTop = targetScroll;
          onComplete?.();
          return;
        }

        const duration = durationOverride ?? scrollDuration;
        const startTime = performance.now();

        const step = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          container.scrollTop =
            startScroll + distance * easeInOutCubic(progress);

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            onComplete?.();
          }
        };

        requestAnimationFrame(step);
      },
      [scrollDuration, easeInOutCubic, viewportHeight],
    );

    // Snap to a target index (handles multi-section jumps with pauses)
    const doSnap = useCallback(
      (targetIndex: number, opts?: { duration?: number; pause?: number }) => {
        if (isScrolling.current) return;

        const clamped = clamp(targetIndex, 0, sectionCount - 1);
        if (clamped === index) return;

        const dur = opts?.duration;
        const pse = opts?.pause ?? pauseDuration;

        // Respect prefers-reduced-motion globally
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          const container = containerRef.current;
          if (container) {
            container.scrollTop = clamped * viewportHeight;
          }
          setIndex(clamped);
          return;
        }

        const diff = Math.abs(clamped - index);

        if (diff > 1) {
          // Multi-section scroll: animate one section at a time with pauses
          isScrolling.current = true;
          const direction = clamped > index ? 1 : -1;
          let current = index;

          const scrollNext = () => {
            current += direction;
            setIndex(current);
            animateScrollTo(
              current,
              () => {
                if (current !== clamped) {
                  setTimeout(scrollNext, pse);
                } else {
                  isScrolling.current = false;
                }
              },
              dur,
            );
          };
          scrollNext();
        } else {
          isScrolling.current = true;
          setIndex(clamped);
          animateScrollTo(
            clamped,
            () => {
              isScrolling.current = false;
            },
            dur,
          );
        }
      },
      [index, sectionCount, animateScrollTo, pauseDuration, viewportHeight],
    );

    // Expose imperative API
    useImperativeHandle(
      ref,
      () => ({
        scrollTo: (i: number, opts?: { duration?: number; pause?: number }) =>
          doSnap(i, opts),
        next: () => doSnap(index + 1),
        prev: () => doSnap(index - 1),
        getIndex: () => index,
      }),
      [doSnap, index],
    );

    // ── Wheel handling ──────────────────────────────────────────────
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        if (isScrolling.current) return;

        const currentIndex = Math.round(container.scrollTop / viewportHeight);
        const nextIndex = e.deltaY > 0 ? currentIndex + 1 : currentIndex - 1;
        doSnap(nextIndex);
      };

      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    }, [viewportHeight, doSnap]);

    // ── Touch handling (evaluate on touchend, not touchmove) ────────
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleTouchStart = (e: TouchEvent) => {
        // Don't hijack if already animating
        if (isScrolling.current) return;
        touchStartY.current = e.touches[0].clientY;
        touchStartTime.current = performance.now();
        touchTracking.current = true;
      };

      const handleTouchMove = (e: TouchEvent) => {
        // Prevent native scroll while we own the gesture
        if (touchTracking.current || isScrolling.current) {
          e.preventDefault();
        }
      };

      const handleTouchEnd = (e: TouchEvent) => {
        if (!touchTracking.current) return;
        touchTracking.current = false;

        if (isScrolling.current) return;

        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY.current - touchEndY; // positive = swipe up
        const elapsed = performance.now() - touchStartTime.current;

        // Velocity in px/ms
        const velocity = Math.abs(deltaY) / Math.max(elapsed, 1);

        // Thresholds — either a deliberate drag (distance) or a fast flick (velocity)
        const DISTANCE_THRESHOLD = 50; // px — intentional swipe
        const VELOCITY_THRESHOLD = 0.3; // px/ms — fast flick
        const MIN_DISTANCE = 15; // px — ignore tiny accidental touches

        const absDistance = Math.abs(deltaY);
        const isIntentional =
          absDistance > DISTANCE_THRESHOLD ||
          (absDistance > MIN_DISTANCE && velocity > VELOCITY_THRESHOLD);

        if (!isIntentional) return;

        const currentIndex = Math.round(container.scrollTop / viewportHeight);
        const nextIndex = deltaY > 0 ? currentIndex + 1 : currentIndex - 1;
        doSnap(nextIndex);
      };

      // touchstart is passive — we don't preventDefault in it
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      // touchmove must be non-passive so we can preventDefault to block native scroll
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });

      return () => {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      };
    }, [viewportHeight, doSnap]);

    // ── Keep index in sync if browser scrolls natively (edge case) ──
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

    const showFooter = index !== sectionCount - 2;

    return (
      <div
        ref={containerRef}
        className="
          h-[100dvh] overflow-y-scroll
          snap-y snap-mandatory
          overscroll-none
          touch-none
        "
        // A11y: allow PageUp/PageDown/Home/End navigation
        onKeyDown={(e) => {
          if (e.defaultPrevented) return;
          if (["PageDown", "ArrowDown", " "].includes(e.key)) {
            e.preventDefault();
            doSnap(index + 1);
          } else if (["PageUp", "ArrowUp"].includes(e.key)) {
            e.preventDefault();
            doSnap(index - 1);
          } else if (e.key === "Home") {
            e.preventDefault();
            doSnap(0);
          } else if (e.key === "End") {
            e.preventDefault();
            doSnap(sectionCount - 1);
          }
        }}
        tabIndex={0}
      >
        {children}
        <AnimatePresence>
          {!showFooter && (
            <Animate
              mount={{ variant: "fadeBounce" }}
              exit={{ variant: "fadeDown", duration: 0.6, ease: "easeOut" }}
              className="fixed bottom-3 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-md flex items-center gap-2 z-40"
            >
              <span>Socials</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Animate>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

ScrollSnap.displayName = "ScrollSnap";

export default ScrollSnap;
