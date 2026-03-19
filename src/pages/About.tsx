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
          <div className="flex flex-col w-full h-full justify-center gap-6 pt-20 md:justify-center sm:gap-24 items-center lg:p-20">
            <WavyGlowText
              text="Making Your Casa Bonita"
              fontSize="font-noto text-pretty tracking-tighter font-semibold text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
            />
            <div className="grid grid-cols-1 w-full justify-around gap-4 text-nowrap sm:grid-cols-3">
              <CoreValue
                text="Eco-Friendly"
                color="#A8C090"
                icon={<BioLeaves fill="#A8C090" />}
                delay={0}
                onClick={() =>
                  snapRef.current?.scrollTo(1, { duration: 200, pause: 0 })
                }
              />
              <CoreValue
                text="Care & Compassion"
                color="#F28294"
                icon={<HouseHands fill="#F28294" />}
                delay={0.5}
                onClick={() =>
                  snapRef.current?.scrollTo(2, { duration: 200, pause: 0 })
                }
              />
              <CoreValue
                text="Excellence"
                color="#7DB3D9"
                icon={<GalaxyStar fill="#7DB3D9" />}
                delay={1}
                onClick={() =>
                  snapRef.current?.scrollTo(3, { duration: 200, pause: 0 })
                }
              />
            </div>
          </div>
        </Section>
        <Section className="h-full" deckIndex={1}>
          <div className="flex w-full h-full items-center justify-center gap-8 p-8">
            <div className="flex flex-col items-center gap-10">
              <div className="flex items-cetner justify-center aspect-square w-40 p-7 lg:w-40 lg:p-7 xl:w-48 xl:p-10 2xl:w-56 2xl:p-12 bg-black/30 rounded-full">
                <BioLeaves fill="#A8C090" />
              </div>
              <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-bold text-center drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">
                Eco-Friendly
              </h1>
              <h2 className="text-white text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-light text-center max-w-3xl">
                We use eco-friendly products and sustainable practices that
                leave your home sparkling - without harsh chemicals.
              </h2>
            </div>
          </div>
        </Section>
        <Section className="h-full" deckIndex={2}>
          <div className="flex w-full h-full items-center justify-center gap-8 p-8">
            <div className="flex flex-col items-center gap-20">
              <div className="flex items-cetner justify-center aspect-square w-40 p-7 lg:w-40 lg:p-7 xl:w-48 xl:p-10 2xl:w-56 2xl:p-12 bg-black/30 rounded-full">
                <HouseHands fill="#F28294" />
              </div>
              <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-bold text-center drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">
                Care & Compassion
              </h1>
              <h2 className="text-white text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-light text-center max-w-3xl">
                We treat every space with the same care as our own, bringing
                comfort, respect, and peace of mind with every clean.
              </h2>
            </div>
          </div>
        </Section>
        <Section className="h-full" deckIndex={3}>
          <div className="flex w-full h-full items-center justify-center gap-8 p-8">
            <div className="flex flex-col items-center gap-20">
              <div className="flex items-cetner justify-center aspect-square w-40 p-7 lg:w-40 lg:p-7 xl:w-48 xl:p-10 2xl:w-56 2xl:p-12 bg-black/30 rounded-full">
                <GalaxyStar fill="#7DB3D9" />
              </div>
              <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-bold text-center drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">
                Excellence
              </h1>
              <h2 className="text-white text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-light text-center max-w-3xl">
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
