interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return (
    <h2 className="font-noto text-white text-nowrap text-4xl sm:text-6xl lg:text-3xl">
      {title}
    </h2>
  );
};

export default Title;
