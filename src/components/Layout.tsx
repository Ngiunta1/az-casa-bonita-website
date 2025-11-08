import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import MainWrapper from "./MainWrapper";
import Footer from "./Footer";
import { Animate } from "./Animate";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Lenis from "lenis";

const subPages = ["Home", "About", "Contact"];
const logoSrc = "src/assets/images/az-casa-bonita-logo.png";
const title = "AZ Casa Bonita";

const backgrounds: Record<string, string> = {
  "/": "src/assets/images/clean-living-room.png",
  "/about": "src/assets/images/sunset-living-room.png",
  "/contact": "src/assets/images/kitchen.png",
};

const Layout = () => {
  const [showFooter, setShowFooter] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const isScrollingDown = e.deltaY > 0;
      setShowFooter(isScrollingDown);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col">
      <Header subPages={subPages} logoSrc={logoSrc} title={title} />
      <Outlet />
      <AnimatePresence>
        {!showFooter && (
          <Animate
            mount={{
              variant: "fadeBounce",
            }}
            exit={{
              variant: "fadeDown",
              duration: 0.6,
              ease: "easeOut",
            }}
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-md flex items-center gap-2 z-40"
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
};

export default Layout;
