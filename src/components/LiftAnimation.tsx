import { useEffect, useState } from "react";

interface LiftAnimationProps {
  children: React.ReactNode;
  delay?: number;
}

const LiftAnimation = ({ children, delay = 0 }: LiftAnimationProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`
        transform transition-all duration-700 ease-out cursor-pointer w-fit
        ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${isHovered ? "scale-105 -translate-y-2" : "scale-100 translate-y-0"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transitionTimingFunction: isLoaded
          ? "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          : "cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {children}
    </div>
  );
};

export default LiftAnimation;
