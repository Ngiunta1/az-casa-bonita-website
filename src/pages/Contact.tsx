import { Mail, Phone } from "lucide-react";
import { useRef } from "react";
import { Animate } from "../components/Animate";
import ContactButton from "../components/ContactButton";
import { Deck } from "../components/Deck";
import Footer from "../components/Footer";
import ScrollSnap, { type ScrollSnapHandle } from "../components/ScrollSnap";
import Section from "../components/Section";
import Tagline from "../components/Tagline";

const Contact = () => {
  const phoneNumber = "+1 (602) 884-9751";
  const email = "AZCasaBonitaServices@gmail.com";
  const snapRef = useRef<ScrollSnapHandle>(null);

  return (
    <Deck images={["/images/kitchen.png", "/images/night-living-room.png"]}>
      <ScrollSnap ref={snapRef}>
        <Section
          className="flex h-screen w-full items-center justify-center lg:p-20"
          deckIndex={0}
        >
          <div className="flex flex-col h-full items-center justify-center">
            <div className="flex flex-1 items-center justify-center gap-12 p-2">
              <Animate
                mount={{ variant: "fadeUp" }}
                hover={{ variant: "lift" }}
              >
                <Tagline
                  tagline="Your Dream Clean Just a Call Away"
                  className="text-white cursor-pointer"
                  onClick={() => (window.location.href = `tel:${phoneNumber}`)}
                />
              </Animate>
              <div className="flex flex-col gap-6 text-3xl">
                <ContactButton
                  mainText="Phone Number"
                  subText={phoneNumber}
                  icon={Phone}
                  onClick={() => (window.location.href = `tel:${phoneNumber}`)}
                />
                <ContactButton
                  mainText="Email"
                  subText={email}
                  icon={Mail}
                  onClick={() => (window.location.href = `mailto:${email}`)}
                />
              </div>
            </div>
            {/* <Animate mount={{ variant: "fadeBounce", intensity: "extreme" }}>
              <div className="flex flex-col gap-3 items-center">
                <h1
                  className="text-white font-semibold text-3xl tracking-tight"
                  onClick={() => snapRef.current?.next()}
                >
                  Scroll Down For Scheduling
                </h1>
                <ChevronDown color="white" size={36} />
              </div>
            </Animate> */}
          </div>
        </Section>
        {/* <Section deckIndex={1}></Section> */}
        <Footer />
      </ScrollSnap>
    </Deck>
  );
};

export default Contact;
