import MainWrapper from "../components/MainWrapper";
import Tagline from "../components/Tagline";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { Animate } from "../components/Animate";
import { Deck } from "../components/Deck";
import Section from "../components/Section";
import Footer from "../components/Footer";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  return (
    <Deck images={["src/assets/images/clean-living-room.png"]}>
      <div className="h-screen overflow-y-auto">
        <Section deckIndex={0} className="h-full">
          <div className="flex h-full">
            <div className="flex flex-col w-full justify-evenly items-center lg:justify-between lg:flex-row lg:items-end lg:p-20">
              <Animate
                mount={{ variant: "fadeUp" }}
                hover={{ variant: "lift" }}
              >
                <div className="w-xs sm:w-md lg:w-lg xl:w-2xl 2xl:w-4xl cursor-pointer">
                  <Tagline
                    className="text-white text-center lg:text-left"
                    tagline="The Next Level of Clean for Your Home"
                    onClick={() => navigate("/about")}
                  />
                </div>
              </Animate>
              <Animate
                mount={{ variant: "fadeUp" }}
                hover={{ variant: "lift" }}
              >
                <Button
                  text="Book Now"
                  backgroundColor="primary"
                  icon="src\assets\icons\go-arrow.png"
                  onClick={() => navigate("/contact")}
                  data-animate="lift"
                />
              </Animate>
            </div>
          </div>
        </Section>
        <AnimatePresence>
          <Animate
            mount={{
              variant: "fadeBounce",
            }}
            exit={{
              variant: "fadeDown",
              duration: 0.6,
              ease: "easeOut",
            }}
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-md flex items-center gap-2 z-40"
          >
            <span>Socials</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Animate>
        </AnimatePresence>
        <Footer />
      </div>
    </Deck>
  );
};

export default Home;
