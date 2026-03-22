import { useState } from "react";
import { Animate } from "./Animate";
import { hexToRgba } from "../utils";
import DownArrow from "../components/icons/DownArrow";

interface CoreValueProps {
  text: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
  onClick?: () => void;
}

const CoreValue = ({ text, icon, color, delay, onClick }: CoreValueProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Animate
      mount={{ variant: "fadeRight", intensity: "extreme", delay: delay }}
    >
      <div
        className="flex flex-col gap-2 items-center group cursor-pointer text-xs sm:text-2xl sm:gap-3 lg:text-3xl xl:text-4xl xl:gap-5 2xl:text-5xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <Animate
          manual={{
            isActive: isHovered,
            variant: "growGlow",
            customIntensity: {
              glowColor: hexToRgba(color, 0.8),
              textColor: color,
            },
          }}
          style={{
            color: "#ffffff",
            fontWeight: 300,
          }}
        >
          {text}
        </Animate>
        <div className="w-14 p-3 aspect-square bg-black/30 group-hover:bg-black/60 transition-all duration-300 rounded-full sm:w-24 sm:p-4 md:w-32 md:p-6 lg:w-40 lg:p-8 xl:w-48 xl:p-10 2xl:w-56 2xl:p-11">
          <Animate
            manual={{
              isActive: isHovered,
              variant: "glow",
              intensity: "subtle",
              customIntensity: { glowColor: hexToRgba(color, 0.8) },
            }}
          >
            {icon}
          </Animate>
        </div>
        <Animate
          manual={{
            isActive: isHovered,
            variant: "bounce",
            repeat: "infinite",
          }}
        >
          <DownArrow className="fill-white w-7 mt-[-0.5rem] sm:w-16 sm:mt-[-1rem] md:w-20 lg:w-24 xl:w-28 2xl:w-32" />
        </Animate>
      </div>
    </Animate>
  );
};

export default CoreValue;
