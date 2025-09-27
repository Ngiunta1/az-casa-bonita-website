import Title from "./Title";
import { useNavigate } from "react-router";

interface TitleLogoProps {
  title: string;
  logoSrc: string;
}

const TitleLogo = ({ title, logoSrc }: TitleLogoProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex gap-2 row flex-col-reverse items-center lg:gap-8 lg:flex-row hover:cursor-pointer"
      onClick={() => navigate("/")}
    >
      <Title title={title} />
      <img src={logoSrc} className="w-35 lg:w-12" />
    </div>
  );
};

export default TitleLogo;
