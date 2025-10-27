import { useEffect, useRef } from "react";
import { Animate } from "../components/Animate";
import ContactButton from "../components/ContactButton";
import Tagline from "../components/Tagline";
import { Phone, Mail, ChevronDown } from "lucide-react";

const Contact = () => {
  const phoneNumber = "+1 (602) 884-9751";
  const email = "AZCasaBonitaServices@gmail.com";
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const touchStart = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling.current) return;

      isScrolling.current = true;

      const viewportHeight = window.innerHeight;
      const currentIndex = Math.round(container.scrollTop / viewportHeight);

      // Snap immediately on scroll direction
      const nextIndex =
        e.deltaY > 0
          ? Math.min(currentIndex + 1, 1) // Only 2 sections (0 and 1)
          : Math.max(currentIndex - 1, 0);

      const targetScroll = nextIndex * viewportHeight;
      const startScroll = container.scrollTop;
      const distance = targetScroll - startScroll;

      if (distance === 0) {
        isScrolling.current = false;
        return;
      }

      const duration = 1000;
      const startTime = performance.now();

      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

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
  }, []);

  return (
    <div ref={containerRef} className="h-screen overflow-y-auto">
      <section className="flex h-screen w-full items-center justify-center lg:p-20">
        <div className="flex flex-col h-full items-center justify-center">
          <div className="flex flex-1 flex-row items-center justify-center gap-12 p-2">
            <Animate mount={{ variant: "fadeUp" }} hover={{ variant: "lift" }}>
              <Tagline
                tagline="Your Dream Clean Just a Call Away"
                className="text-white cursor-pointer"
                onClick={() => (window.location.href = `tel:${phoneNumber}`)}
              />
            </Animate>
            <div className="flex flex-col gap-6 text-3xl">
              <ContactButton
                mainText="Phone Number"
                subText={phoneNumber}
                icon={Phone}
                onClick={() => (window.location.href = `tel:${phoneNumber}`)}
              />
              <ContactButton
                mainText="Email"
                subText={email}
                icon={Mail}
                onClick={() => (window.location.href = `mailto:${email}`)}
              />
            </div>
          </div>
          <Animate mount={{ variant: "fadeBounce", intensity: "extreme" }}>
            <div className="flex flex-col gap-3 items-center">
              <h1 className="text-white font-semibold text-3xl tracking-tight">
                Scroll Down For Scheduling
              </h1>
              <ChevronDown color="white" size={36} />
            </div>
          </Animate>
        </div>
      </section>
      <section
        className="flex h-screen w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('src/assets/images/night-living-room.png')",
        }}
      ></section>
    </div>
  );
};

export default Contact;
