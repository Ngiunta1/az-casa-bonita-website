import { useState } from "react";
import { Animate } from "../components/Animate";
import BioLeaves from "../components/icons/BioLeaves";
import GalaxyStar from "../components/icons/GalaxyStar";
import HouseHands from "../components/icons/HouseHands";
import WavyGlowText from "../components/WavyGlowText";
import CoreValue from "../components/CoreValue";

const About = () => {
  return (
    <div className="flex flex-col h-full gap-48 items-center mt-4">
      <WavyGlowText text="Making Your Casa Bonita" />
      <section className="flex flex-wrap w-full justify-around gap-12">
        <CoreValue
          text="Eco-Friendly"
          color="#A8C090"
          icon={<BioLeaves fill="#A8C090" />}
          delay={0}
        />
        <CoreValue
          text="Care & Compassion"
          color="#F28294"
          icon={<HouseHands fill="#F28294" />}
          delay={0.5}
        />
        <CoreValue
          text="Excellence"
          color="#7DB3D9"
          icon={<GalaxyStar fill="#7DB3D9" />}
          delay={1}
        />
      </section>
      <section
        className="flex bg-cover h-64 w-full"
        style={{ backgroundImage: "../images/eco-friendly-bg.png" }}
      >
        <a>boom</a>
      </section>
    </div>
  );
};

export default About;
