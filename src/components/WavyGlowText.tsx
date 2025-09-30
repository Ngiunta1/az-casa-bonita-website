import { motion } from "motion/react";
import Tagline from "./Tagline";

interface WavyGlowTextProps {
  text: string;
  fontSize?: string;
}

const WavyGlowText = ({ text }: WavyGlowTextProps) => {
  // Calculate gradient color for each character based on position
  const getGradientColor = (index: number, total: number) => {
    const colors = [
      { r: 168, g: 192, b: 144 }, // #A8C090
      { r: 242, g: 130, b: 148 }, // #F28294
      { r: 125, g: 179, b: 217 }, // #7DB3D9
    ];

    // Position in gradient (0 to 1)
    const position = index / Math.max(total - 1, 1);

    // Determine which two colors to interpolate between
    const scaledPos = position * (colors.length - 1);
    const colorIndex = Math.floor(scaledPos);
    const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);
    const localPosition = scaledPos - colorIndex;

    // Interpolate between the two colors
    const color1 = colors[colorIndex];
    const color2 = colors[nextColorIndex];

    const r = Math.round(color1.r + (color2.r - color1.r) * localPosition);
    const g = Math.round(color1.g + (color2.g - color1.g) * localPosition);
    const b = Math.round(color1.b + (color2.b - color1.b) * localPosition);

    return { r, g, b };
  };

  const characters = text.split("");
  const staggerDelay = 0.05;

  return (
    <div style={{ display: "flex", gap: "0.04em" }}>
      {characters.map((char, i) => {
        const color = getGradientColor(i, characters.length);
        const rgb = `${color.r}, ${color.g}, ${color.b}`;
        const delay = i * staggerDelay;

        return (
          <motion.span
            key={i}
            initial={{
              opacity: 1,
              y: 0,
              filter: `drop-shadow(0 0 0px rgba(${rgb}, 0))`,
            }}
            animate={{
              opacity: [0, 1, 1],
              y: [0, -8, 0],
              filter: [
                `drop-shadow(0 0 0px rgba(${rgb}, 0))`,
                `drop-shadow(0 0 16px rgba(${rgb}, 1))`,
                `drop-shadow(0 0 4px rgba(${rgb}, 0.3))`,
              ],
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: delay,
            }}
          >
            <Tagline
              tagline={char === " " ? "\u00A0" : char}
              style={{ color: `rgb(${rgb})` }}
            />
          </motion.span>
        );
      })}
    </div>
  );
};

export default WavyGlowText;
