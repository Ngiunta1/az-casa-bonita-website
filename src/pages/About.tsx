import { useEffect, useRef, useState } from "react";
import { Animate } from "../components/Animate";
import BioLeaves from "../components/icons/BioLeaves";
import GalaxyStar from "../components/icons/GalaxyStar";
import HouseHands from "../components/icons/HouseHands";
import WavyGlowText from "../components/WavyGlowText";
import CoreValue from "../components/CoreValue";
import CoreValueSection from "../components/CoreValueSection";
import Lenis from "lenis";
import { useScroll, useTransform } from "motion/react";
import Section from "../components/Section";
import { Deck } from "../components/Deck";

const About = () => {
  const container = useRef(null);

  // const { scrollYProgress } = useScroll({
  //   target: container,
  //   offset: ["start end", "end start"],
  // });

  // const sm = useTransform(scrollYProgress, [0, 1], [250, -500]);
  // const md = useTransform(scrollYProgress, [0, 1], [400, -1000]);

  // const ecoSm = useTransform(scrollYProgress, [0, 1], [250, -500]);
  // const ecoMd = useTransform(scrollYProgress, [0, 1], [400, -650]);

  // const lg = useTransform(scrollYProgress, [0, 1], [400, -1000]);

  return (
    <Deck
      images={[
        "src/assets/images/sunset-living-room.png",
        "src/assets/images/eco-friendly-bg.png",
        "src/assets/images/care-and-compassion-bg.png",
        "src/assets/images/excellence-bg.png",
      ]}
    >
      <div className="h-screen overflow-y-auto">
        <Section className="h-full" deckIndex={0}>
          <div className="flex flex-col w-full h-full justify-evenly items-center lg:p-20">
            <WavyGlowText text="Making Your Casa Bonita" />
            <div className="flex flex-wrap w-full justify-around gap-8">
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
            </div>
          </div>
        </Section>
        <Section className="h-full" deckIndex={1}>
          <div className="flex w-full h-full items-center justify-center gap-8 p-8">
            <div className="flex flex-col items-center gap-20">
              <div className="flex items-cetner justify-center w-56 h-56 p-10 bg-black/30 rounded-full">
                <BioLeaves fill="#A8C090" />
              </div>
              <h1 className="text-white text-6xl font-bold text-center drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">
                Eco-Friendly
              </h1>
              <h2 className="text-white text-4xl font-light text-center w-3xl">
                We use eco-friendly products and sustainable practices that
                leave your home sparkling—without harsh chemicals.
              </h2>
            </div>
          </div>
        </Section>
        <Section className="h-full" deckIndex={2}>
          <div className="flex w-full h-full items-center justify-center gap-8 p-8">
            <div className="flex flex-col items-center gap-20">
              <div className="flex items-cetner justify-center w-56 h-56 p-10 bg-black/30 rounded-full">
                <HouseHands fill="#F28294" />
              </div>
              <h1 className="text-white text-6xl font-bold text-center drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">
                Care & Compassion
              </h1>
              <h2 className="text-white text-4xl font-light text-center w-3xl">
                We treat every space with the same care as our own, bringing
                comfort, respect, and peace of mind with every clean.
              </h2>
            </div>
          </div>
        </Section>
        <Section className="h-full" deckIndex={3}>
          <div className="flex w-full h-full items-center justify-center gap-8 p-8">
            <div className="flex flex-col items-center gap-20">
              <div className="flex items-cetner justify-center w-56 h-56 p-10 bg-black/30 rounded-full">
                <GalaxyStar fill="#7DB3D9" />
              </div>
              <h1 className="text-white text-6xl font-bold text-center drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">
                Excellence
              </h1>
              <h2 className="text-white text-4xl font-light text-center w-3xl">
                From first booking to final walkthrough, we go above and beyond
                because good enough isn't good enough.
              </h2>
            </div>
          </div>
        </Section>
      </div>
    </Deck>
  );
};

export default About;
