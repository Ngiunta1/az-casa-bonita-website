import Navbar from "./Navbar";
import TitleLogo from "./TitleLogo";

interface HeaderProps {
  subPages: string[];
  logoSrc: string;
  title: string;
}

const Header = ({ subPages, logoSrc, title }: HeaderProps) => {
  return (
    <header className="flex flex-col items-center w-full justify-center gap-15 lg:justify-between lg:flex-row lg:items-baseline">
      {/* Logo + Title */}
      <TitleLogo title={title} logoSrc={logoSrc} />

      {/* Navigation */}
      <Navbar subPages={subPages} />
    </header>
  );
};

export default Header;
