import Title from "./Title";

interface TitleLogoProps {
  title: string;
  logoSrc: string;
}

const TitleLogo = ({ title, logoSrc }: TitleLogoProps) => {
  return (
    <div className="flex gap-8">
      <Title title={title} />
      <img src={logoSrc} className="w-12" />
    </div>
  );
};

export default TitleLogo;
