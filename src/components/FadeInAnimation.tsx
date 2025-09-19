import React, { useState, useEffect } from "react";

interface FadeInComponentProps {
  children: React.ReactNode;
  delay?: number;
}

const FadeInAnimation: React.FC<FadeInComponentProps> = ({
  children,
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`
        transform transition-all duration-500 ease-out flex w-fit
        ${
          isVisible
            ? "opacity-100 translate-x-0 translate-y-0"
            : "opacity-0 -translate-x-8 -translate-y-8"
        }
      `}
    >
      {children}
    </div>
  );
};

export default FadeInAnimation;
