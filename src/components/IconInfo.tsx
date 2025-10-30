import BioLeaves from "./icons/BioLeaves";

interface IconInfoProps {
  icon: string;
  title: string;
  subTitle: string;
}

const IconInfo = ({ icon, title, subTitle }: IconInfoProps) => {
  return (
    <section
      className="flex flex-col p-20 h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url(src/assets/images/eco-friendly-bg.png)",
        backgroundColor: "rgba(0,0,0,0.3)",
        backgroundBlendMode: "color",
      }}
    >
      <div className="flex gap-8 items-center">
        <div className="flex items-cetner justify-center w-56 h-56 bg-black/30 rounded-full">
          <BioLeaves fill="#A8C090" className="w-32 h-32 m-12" />
          {icon}
        </div>
        <div className="flex flex-col gap-20">
          <h1 className="text-white text-6xl font-bold text-center drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">
            Cleaning That's Better for You & the Planet
            {title}
          </h1>
          <h2 className="text-white text-4xl font-light text-center">
            We use eco-friendly products and sustainable practices that leave
            your home sparkling—without harsh chemicals.
            {subTitle}
          </h2>
        </div>
        <div className="w-56" />
      </div>
    </section>
  );
};

export default IconInfo;
