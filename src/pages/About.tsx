import { motion } from "motion/react";
import { Animate } from "../components/Animate";
import Tagline from "../components/Tagline";

interface WavyGlowTextProps {
  text: string;
}

const WavyGlowText = ({ text }: WavyGlowTextProps) => {
  return (
    <div
      style={{ display: "flex", gap: "0.1em" }}
      className="text-transparent bg-clip-text bg-gradient-to-r from-[#A8C090] via-[#F28294] to-[#7DB3D9]"
    >
      {text.split("").map((char, i) => (
        <Animate
          key={i}
          mount={{
            variant: "wavyGlow",
            delay: i * 0.03,
            intensity: "normal",
          }}
          style={{
            display: "inline-block",
            fontSize: "2.5rem",
            fontWeight: "bold",
          }}
        >
          {char}
        </Animate>
      ))}
    </div>
  );
};

const About = () => {
  return (
    <div className="flex justify-center">
      {/* <Animate mount={{ variant: "fadeUp" }}>
        <Tagline
          tagline="Making Your Casa Bonita"
          className="pb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#A8C090] via-[#F28294] to-[#7DB3D9]"
        />
      </Animate> */}
      <WavyGlowText text="Making Your Casa Bonita" />
    </div>
  );
};

export default About;
