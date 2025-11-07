import MainWrapper from "../components/MainWrapper";
import Tagline from "../components/Tagline";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { Animate } from "../components/Animate";
import { Deck } from "../components/Deck";
import Section from "../components/Section";
import Footer from "../components/Footer";
import { useEffect, useRef, useState } from "react";

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
        <Footer />
      </div>
    </Deck>
  );
};

export default Home;
