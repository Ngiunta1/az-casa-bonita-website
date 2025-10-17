import { Animate } from "../components/Animate";
import ContactButton from "../components/ContactButton";
import Tagline from "../components/Tagline";

const Contact = () => {
  const phoneNumber = "+1 (602) 884-9751";
  const email = "AZCasaBonitaServices@gmail.com";
  return (
    <section className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-row items-center gap-12 p-2">
        <Animate mount={{ variant: "fadeUp" }} hover={{ variant: "lift" }}>
          <Tagline
            tagline="Your Dream Clean Just a Call Away"
            className="text-white cursor-pointer"
            onClick={() => (window.location.href = `tel:${phoneNumber}`)}
          />
        </Animate>
        <div className="flex flex-col gap-6">
          <ContactButton
            mainText="Phone Number"
            subText={phoneNumber}
            icon="fa-solid fa-phone"
            onClick={() => (window.location.href = `tel:${phoneNumber}`)}
          />
          <ContactButton
            mainText="Email"
            subText={email}
            icon="fa-regular fa-envelope"
            onClick={() => (window.location.href = `mailto:${email}`)}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
