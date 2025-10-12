import { useEffect, useRef, useState } from "react";
import { Animate } from "../components/Animate";
import BioLeaves from "../components/icons/BioLeaves";
import GalaxyStar from "../components/icons/GalaxyStar";
import HouseHands from "../components/icons/HouseHands";
import WavyGlowText from "../components/WavyGlowText";
import CoreValue from "../components/CoreValue";
import CoreValueSection from "../components/CoreValueSection";
import Lenis from "lenis";
import { useScroll, useTransform, motion } from "motion/react";

const About = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const sm = useTransform(scrollYProgress, [0, 1], [250, -500]);
  const md = useTransform(scrollYProgress, [0, 1], [400, -1000]);

  const ecoSm = useTransform(scrollYProgress, [0, 1], [250, -500]);
  const ecoMd = useTransform(scrollYProgress, [0, 1], [400, -650]);

  const lg = useTransform(scrollYProgress, [0, 1], [400, -1000]);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div ref={container} className="flex flex-col snap-y snap-mandatory">
      <section className="flex flex-col h-screen snap-center items-center gap-40 bg-cover bg-center pt-38">
        <motion.div style={{ y: sm }}>
          <WavyGlowText text="Making Your Casa Bonita" />
        </motion.div>
        <motion.div style={{ y: md, width: "100%" }}>
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
        </motion.div>
      </section>
      <CoreValueSection
        icon={<BioLeaves fill="#A8C090" />}
        index={1}
        image="src/assets/images/eco-friendly-bg.png"
        title="Cleaning That's Better for You & the Planet"
        subTitle="We use eco-friendly products and sustainable practices that leave
            your home sparkling—without harsh chemicals."
        motionValues={{ sm: ecoSm, md: ecoMd, lg: lg }}
      />

      <CoreValueSection
        className="bg-top"
        index={2}
        icon={<HouseHands fill="#F28294" />}
        image="src/assets/images/care-and-compassion-bg.png"
        title="Cleaning With Heart"
        subTitle="We treat every space with the same care as our own, 
            bringing comfort, respect, and peace of mind with every clean."
        motionValues={{ sm: sm, md: md, lg: lg }}
      />

      <CoreValueSection
        icon={<GalaxyStar fill="#7DB3D9" />}
        index={3}
        image="src/assets/images/excellence-bg.png"
        title="Raising the Standard of Clean"
        subTitle="From first booking to final walkthrough, 
            we go above and beyond because good enough isn't good enough."
        motionValues={{ sm: sm, md: md, lg: lg }}
      />
    </div>
  );
};

export default About;
