import Navbar from "./Navbar";
import TitleLogo from "./TitleLogo";
import FadeInAnimation from "./FadeInAnimation";

interface HeaderProps {
  subPages: string[];
  logoSrc: string;
  title: string;
}

const Header = ({ subPages, logoSrc, title }: HeaderProps) => {
  return (
    <header className="flex items-baseline justify-between w-full">
      {/* Logo + Title */}
      <FadeInAnimation delay={0}>
        <TitleLogo title={title} logoSrc={logoSrc} />
      </FadeInAnimation>

      {/* Navigation */}
      <FadeInAnimation delay={0}>
        <Navbar subPages={subPages} />
      </FadeInAnimation>
    </header>
  );
};

export default Header;
