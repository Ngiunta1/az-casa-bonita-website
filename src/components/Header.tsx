import Navbar from "./Navbar";
import TitleLogo from "./TitleLogo";

interface HeaderProps {
  subPages: string[];
  logoSrc: string;
  title: string;
}

const Header = ({ subPages, logoSrc, title }: HeaderProps) => {
  return (
    <header className="flex items-baseline justify-between w-full">
      {/* Logo + Title */}
      <TitleLogo title={title} logoSrc={logoSrc} />

      {/* Navigation */}
      <Navbar subPages={subPages} />
    </header>
  );
};

export default Header;
