import { AnimatePresence } from "motion/react";
import { Animate } from "./Animate";

const SocialsPrompt = () => {
  return (
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
  );
};
