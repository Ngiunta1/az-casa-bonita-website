interface TaglineProps {
  tagline: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Tagline = ({ tagline, className, style, onClick }: TaglineProps) => {
  return (
    <div
      className={`font-noto text-pretty tracking-tighter font-semibold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl ${className}`}
      style={style}
      onClick={onClick}
      data-animate="lift"
    >
      {tagline}
    </div>
  );
};

export default Tagline;
