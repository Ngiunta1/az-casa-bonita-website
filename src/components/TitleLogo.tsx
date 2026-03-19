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
      className="flex items-center justify-center gap-4 w-full flex-row hover:cursor-pointer lg:justify-start"
      onClick={() => navigate("/")}
    >
      <img src={logoSrc} alt={title} className="w-12" />
      <Title title={title} />
    </div>
  );
};

export default TitleLogo;
