interface CoreValueSectionProps {
  icon: React.ReactNode;
  image: string;
  title: string;
  subTitle: string;
  className?: string;
}

const CoreValueSection = ({
  icon,
  title,
  subTitle,
  image,
  className,
}: CoreValueSectionProps) => {
  return (
    <section
      className={
        className
          ? className + " flex flex-col p-20 h-screen bg-cover bg-center pt-48"
          : "flex flex-col p-20 h-screen bg-cover bg-center pt-48"
      }
      style={{
        backgroundImage: `url(${image})`,
        backgroundColor: "rgba(0,0,0,0.3)",
        backgroundBlendMode: "color",
      }}
    >
      <div className="flex gap-8 items-center">
        <div className="flex items-cetner justify-center w-56 h-56 p-10 bg-black/30 rounded-full">
          {icon}
        </div>
        <div className="flex flex-col gap-20">
          <h1 className="text-white text-6xl font-bold text-center drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">
            {title}
          </h1>
          <h2 className="text-white text-4xl font-light text-center">
            {subTitle}
          </h2>
        </div>
        <div className="w-56" />
      </div>
    </section>
  );
};

export default CoreValueSection;
