import { useRef } from "react";
import CoreValue from "../components/CoreValue";
import { Deck } from "../components/Deck";
import Footer from "../components/Footer";
import BioLeaves from "../components/icons/BioLeaves";
import GalaxyStar from "../components/icons/GalaxyStar";
import HouseHands from "../components/icons/HouseHands";
import ScrollSnap, { type ScrollSnapHandle } from "../components/ScrollSnap";
import Section from "../components/Section";
import WavyGlowText from "../components/WavyGlowText";

const About = () => {
  const snapRef = useRef<ScrollSnapHandle>(null);

  return (
    <Deck
      images={[
        "/images/sunset-living-room.png",
        "/images/eco-friendly-bg.png",
        "/images/care-and-compassion-bg.png",
        "/images/excellence-bg.png",
      ]}
    >
      <ScrollSnap ref={snapRef}>
        <Section className="h-full" deckIndex={0}>
          <div className="flex flex-col w-full h-full justify-start gap-10 pt-72 md:justify-center md:gap-16 md:pt-0 items-center lg:p-20">
            <WavyGlowText
              text="Making Your Casa Bonita"
              fontSize="font-noto text-pretty tracking-tighter font-semibold text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
            />
            <div className="grid grid-cols-1 w-full justify-around gap-8 text-nowrap md:grid-cols-3">
              <CoreValue
                text="Eco-Friendly"
                color="#A8C090"
                icon={<BioLeaves fill="#A8C090" />}
                delay={0}
                onClick={() => snapRef.current?.scrollTo(1)}
              />
              <CoreValue
                text="Care & Compassion"
                color="#F28294"
                icon={<HouseHands fill="#F28294" />}
                delay={0.5}
                onClick={() => snapRef.current?.scrollTo(2)}
              />
              <CoreValue
                text="Excellence"
                color="#7DB3D9"
                icon={<GalaxyStar fill="#7DB3D9" />}
                delay={1}
                onClick={() => snapRef.current?.scrollTo(3)}
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
        <Footer />
      </ScrollSnap>
    </Deck>
  );
};

export default About;
