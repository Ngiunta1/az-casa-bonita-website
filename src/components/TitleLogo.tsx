import Title from "./Title";

interface TitleLogoProps {
  title: string;
  logoSrc: string;
}

const TitleLogo = (props: TitleLogoProps) => {
  return (
    <div className="flex gap-8">
      <Title title={props.title} />
      <img src={props.logoSrc} className="w-12" />
    </div>
  );
};

export default TitleLogo;
