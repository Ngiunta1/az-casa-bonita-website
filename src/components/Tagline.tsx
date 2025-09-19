interface TaglineProps {
  tagline: string;
}

const Tagline = ({ tagline }: TaglineProps) => {
  return (
    <div className="font-noto text-white text-8xl w-2/3 tracking-tighter font-semibold">
      {tagline}
    </div>
  );
};

export default Tagline;
