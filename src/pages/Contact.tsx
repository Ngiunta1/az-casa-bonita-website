import ContactButton from "../components/ContactButton";

const Contact = () => {
  return (
    <section className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col gap-6">
        <ContactButton
          mainText="Phone Number"
          subText="+1 (602) 884-9751"
          icon="fa-solid fa-phone"
        />
        <ContactButton
          mainText="Email"
          subText="AZCasaBonitaServices@gmail.com"
          icon="fa-regular fa-envelope"
        />
      </div>
    </section>
  );
};

export default Contact;
