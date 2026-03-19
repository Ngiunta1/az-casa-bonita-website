interface CoreValueSectionProps {
  icon: React.ReactNode;
  title: string;
  subTitle: string;
}

const CoreValueSection = ({ icon, title, subTitle }: CoreValueSectionProps) => {
  return <CoreValueContent icon={icon} title={title} subTitle={subTitle} />;
};

const CoreValueContent = ({
  icon,
  title,
  subTitle,
}: {
  icon: React.ReactNode;
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="flex w-full items-center justify-center gap-8 p-8">
      <div className="flex items-center justify-center w-56 h-56 p-10 bg-black/30 rounded-full">
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
  );
};

export default CoreValueSection;
