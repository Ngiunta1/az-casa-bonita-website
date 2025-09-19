import Title from "./Title";

interface TitleLogoProps {
  title: string;
  logoSrc: string;
}

const TitleLogo = ({ title, logoSrc }: TitleLogoProps) => {
  return (
    <div className="flex gap-2 row flex-col-reverse items-center lg:gap-8 lg:flex-row">
      <Title title={title} />
      <img src={logoSrc} className="w-35 lg:w-12" />
    </div>
  );
};

export default TitleLogo;
