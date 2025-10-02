import { useState } from "react";
import { Animate } from "./Animate";
import { hexToRgba } from "../utils";
import DownArrow from "../components/icons/DownArrow";

interface CoreValueProps {
  text: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
}

const CoreValue = ({ text, icon, color, delay }: CoreValueProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Animate
      mount={{ variant: "fadeRight", intensity: "extreme", delay: delay }}
    >
      <div
        className="flex flex-col gap-8 items-center group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
            fontSize: "4rem",
            fontWeight: 300,
          }}
        >
          {text}
        </Animate>
        <div className="w-56 h-56 p-10 bg-black/30 group-hover:bg-black/60 transition-all duration-300 rounded-full">
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
          <DownArrow className="fill-white w-26 mt-[-1rem]" />
        </Animate>
      </div>
    </Animate>
  );
};

export default CoreValue;
