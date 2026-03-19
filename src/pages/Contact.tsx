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
  const phoneNumber = "+1 (480) 479-3481";
  const email = "AZCasaBonitaServices@gmail.com";
  const snapRef = useRef<ScrollSnapHandle>(null);

  return (
    <Deck images={["/images/kitchen.png", "/images/night-living-room.png"]}>
      <ScrollSnap ref={snapRef}>
        <Section
          className="flex h-screen w-full items-center justify-center p-6 xl:p-10"
          deckIndex={0}
        >
          <div className="flex flex-col h-full items-center justify-center">
            <div className="xl:flex-nowrap flex-wrap flex items-center justify-center gap-16 p-2 text-center">
              <Animate
                mount={{ variant: "fadeUp" }}
                hover={{ variant: "lift" }}
              >
                <Tagline
                  tagline="Your Dream Clean Just a Call Away"
                  className="text-white cursor-pointer max-w-5xl"
                  onClick={() => (window.location.href = `tel:${phoneNumber}`)}
                />
              </Animate>
              <div className="flex flex-col gap-6 text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl">
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
          </div>
        </Section>
        <Footer />
      </ScrollSnap>
    </Deck>
  );
};

export default Contact;
