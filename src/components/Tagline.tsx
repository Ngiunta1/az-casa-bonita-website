interface TaglineProps {
  tagline: string;
}

const Tagline = ({ tagline }: TaglineProps) => {
  return (
    <div className="p-16 font-noto text-white text-8xl w-1/2">{tagline}</div>
  );
};

export default Tagline;
