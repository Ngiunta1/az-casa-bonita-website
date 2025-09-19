interface TaglineProps {
  tagline: string;
}

const Tagline = ({ tagline }: TaglineProps) => {
  return (
    <div className="font-noto text-white text-pretty tracking-tighter font-semibold text-center lg:text-left text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
      {tagline}
    </div>
  );
};

export default Tagline;
