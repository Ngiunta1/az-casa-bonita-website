import { Animate } from "./Animate";
import Navbar from "./Navbar";
import TitleLogo from "./TitleLogo";

interface HeaderProps {
  subPages: string[];
  logoSrc: string;
  title: string;
}

const Header = ({ subPages, logoSrc, title }: HeaderProps) => {
  return (
    <Animate
      mount={{ variant: "fadeDown" }}
      className="fixed top-0 w-full z-100"
    >
      <header className="flex flex-col py-4 px-6 items-center w-full justify-center gap-6 lg:px-12 lg:py-8 lg:justify-between lg:flex-row lg:items-baseline">
        {/* Logo + Title */}
        <TitleLogo title={title} logoSrc={logoSrc} />

        {/* Navigation */}
        <Navbar subPages={subPages} />
      </header>
    </Animate>
  );
};

export default Header;
