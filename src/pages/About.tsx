import { useEffect, useRef, useState } from "react";
import { Animate } from "../components/Animate";
import BioLeaves from "../components/icons/BioLeaves";
import GalaxyStar from "../components/icons/GalaxyStar";
import HouseHands from "../components/icons/HouseHands";
import WavyGlowText from "../components/WavyGlowText";
import CoreValue from "../components/CoreValue";
import CoreValueSection from "../components/CoreValueSection";
import Lenis from "lenis";
import { useScroll, useTransform } from "motion/react";
import Section from "../components/Section";
import { Deck } from "../components/Deck";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const touchStart = useRef(0);

  // Function to scroll to a specific section
  const scrollToSection = (sectionIndex: number) => {
    console.log("scrollToSection called with index:", sectionIndex);

    const container = containerRef.current;
    console.log("Container:", container);
    console.log("isScrolling.current:", isScrolling.current);

    if (!container || isScrolling.current) {
      console.log("Exiting early - container or isScrolling issue");
      return;
    }

    isScrolling.current = true;

    const viewportHeight = window.innerHeight;
    const targetScroll = sectionIndex * viewportHeight;
    const startScroll = container.scrollTop;
    const distance = targetScroll - startScroll;

    console.log("Scroll details:", {
      viewportHeight,
      targetScroll,
      startScroll,
      distance,
    });

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
        console.log("Scroll animation complete");
        isScrolling.current = false;
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling.current) return;

      isScrolling.current = true;

      const viewportHeight = window.innerHeight;
      const currentIndex = Math.round(container.scrollTop / viewportHeight);

      // Snap immediately on scroll direction (4 sections: 0, 1, 2, 3)
      const nextIndex =
        e.deltaY > 0
          ? Math.min(currentIndex + 1, 3) // 4 sections total
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
    <Deck
      images={[
        "src/assets/images/sunset-living-room.png",
        "src/assets/images/eco-friendly-bg.png",
        "src/assets/images/care-and-compassion-bg.png",
        "src/assets/images/excellence-bg.png",
      ]}
    >
      <div ref={containerRef} className="h-screen overflow-y-auto">
        <Section className="h-full" deckIndex={0}>
          <div className="flex flex-col w-full h-full justify-evenly items-center lg:p-20">
            <WavyGlowText text="Making Your Casa Bonita" />
            <div className="flex flex-wrap w-full justify-around gap-8">
              <CoreValue
                text="Eco-Friendly"
                color="#A8C090"
                icon={<BioLeaves fill="#A8C090" />}
                delay={0}
                onClick={() => scrollToSection(1)}
              />
              <CoreValue
                text="Care & Compassion"
                color="#F28294"
                icon={<HouseHands fill="#F28294" />}
                delay={0.5}
                onClick={() => scrollToSection(2)}
              />
              <CoreValue
                text="Excellence"
                color="#7DB3D9"
                icon={<GalaxyStar fill="#7DB3D9" />}
                delay={1}
                onClick={() => scrollToSection(3)}
              />
            </div>
          </div>
        </Section>
        <Section className="h-full" deckIndex={1}>
          <div className="flex w-full h-full items-center justify-center gap-8 p-8">
            <div className="flex flex-col items-center gap-20">
              <div className="flex items-cetner justify-center w-56 h-56 p-10 bg-black/30 rounded-full">
                <BioLeaves fill="#A8C090" />
              </div>
              <h1 className="text-white text-6xl font-bold text-center drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">
                Eco-Friendly
              </h1>
              <h2 className="text-white text-4xl font-light text-center w-3xl">
                We use eco-friendly products and sustainable practices that
                leave your home sparkling—without harsh chemicals.
              </h2>
            </div>
          </div>
        </Section>
        <Section className="h-full" deckIndex={2}>
          <div className="flex w-full h-full items-center justify-center gap-8 p-8">
            <div className="flex flex-col items-center gap-20">
              <div className="flex items-cetner justify-center w-56 h-56 p-10 bg-black/30 rounded-full">
                <HouseHands fill="#F28294" />
              </div>
              <h1 className="text-white text-6xl font-bold text-center drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">
                Care & Compassion
              </h1>
              <h2 className="text-white text-4xl font-light text-center w-3xl">
                We treat every space with the same care as our own, bringing
                comfort, respect, and peace of mind with every clean.
              </h2>
            </div>
          </div>
        </Section>
        <Section className="h-full" deckIndex={3}>
          <div className="flex w-full h-full items-center justify-center gap-8 p-8">
            <div className="flex flex-col items-center gap-20">
              <div className="flex items-cetner justify-center w-56 h-56 p-10 bg-black/30 rounded-full">
                <GalaxyStar fill="#7DB3D9" />
              </div>
              <h1 className="text-white text-6xl font-bold text-center drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">
                Excellence
              </h1>
              <h2 className="text-white text-4xl font-light text-center w-3xl">
                From first booking to final walkthrough, we go above and beyond
                because good enough isn't good enough.
              </h2>
            </div>
          </div>
        </Section>
      </div>
    </Deck>
  );
};

export default About;
