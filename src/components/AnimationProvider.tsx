import { useEffect, useRef } from "react";

interface AnimationProviderProps {
  children: React.ReactNode;
  replay?: boolean;
}

const AnimationProvider = ({
  children,
  replay = true,
}: AnimationProviderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mountElements = container.querySelectorAll(
      '[data-animate-trigger="mount"]'
    );
    mountElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const delay = parseInt(htmlEl.getAttribute("data-animate-delay") || "0");

      setTimeout(() => {
        htmlEl.setAttribute("data-animated", "true");
      }, delay);
    });

    const scrollElements = container.querySelectorAll(
      '[data-animate-trigger="scroll"], [data-animate]:not([data-animate-trigger])'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const htmlEl = entry.target as HTMLElement;
          const delay = parseInt(
            htmlEl.getAttribute("data-animate-delay") || "0"
          );

          if (entry.isIntersecting) {
            setTimeout(() => {
              htmlEl.setAttribute("data-animated", "true");
            }, delay);
          } else if (replay) {
            htmlEl.removeAttribute("data-animated");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    scrollElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [replay]);

  return <div ref={containerRef}>{children}</div>;
};

// Inject styles
const styleId = "animation-styles";
if (!document.getElementById(styleId)) {
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    [data-animate] {
      transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    }

    ### FADE UP ANIMATION ###

    [data-animate="fade-up"]:not([data-animated]) {
      opacity: 0;
      transform: translateY(30px);
    }
    [data-animate="fade-up"][data-animated] {
      opacity: 1;
      transform: translateY(0);
    }

    ### FADE IN ANIMATION ###

    [data-animate="fade-in"]:not([data-animated]) {
      opacity: 0;
    }
    [data-animate="fade-in"][data-animated] {
      opacity: 1;
    }

    ### SLIDE LEFT ANIMATION ###

    [data-animate="slide-left"]:not([data-animated]) {
      transform: translateX(-100px);
      opacity: 0;
    }
    [data-animate="slide-left"][data-animated] {
      transform: translateX(0);
      opacity: 1;
    }

    ### SLIDE RIGHT ANIMATION ###

    [data-animate="slide-right"]:not([data-animated]) {
      transform: translateX(100px);
      opacity: 0;
    }
    [data-animate="slide-right"][data-animated] {
      transform: translateX(0);
      opacity: 1;
    }

    ### SCALE ANIMATION ###

    [data-animate="scale"]:not([data-animated]) {
      transform: scale(0.8);
      opacity: 0;
    }
    [data-animate="scale"][data-animated] {
      transform: scale(1);
      opacity: 1;
    }

    ### ZOOM ANIMATION ###

    [data-animate="zoom"]:not([data-animated]) {
      transform: scale(0.9);
      opacity: 0;
    }
    [data-animate="zoom"][data-animated] {
      transform: scale(1);
      opacity: 1;
    }

    ### LIFT ANIMATION ###

    [data-animate="lift"]:not([data-animated]) {
      transform: translateY(30px);
      opacity: 0;
    }
    [data-animate="lift"][data-animated] {
      transform: translateY(0);
      opacity: 1;
    }
    [data-animate="lift"][data-animated]:hover {
      transform: translateY(-8px) scale(1.02);
    }

    ### ROTATE ANIMATION ###

    [data-animate="rotate"]:not([data-animated]) {
      transform: rotate(-10deg) scale(0.9);
      opacity: 0;
    }
    [data-animate="rotate"][data-animated] {
      transform: rotate(0deg) scale(1);
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
}

export default AnimationProvider;
