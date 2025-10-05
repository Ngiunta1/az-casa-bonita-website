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
      className="fixed top-0 w-full z-10"
    >
      <header className="flex flex-col py-8 px-12 items-center w-full justify-center gap-15 lg:justify-between lg:flex-row lg:items-baseline">
        {/* Logo + Title */}
        <TitleLogo title={title} logoSrc={logoSrc} />

        {/* Navigation */}
        <Navbar subPages={subPages} />
      </header>
    </Animate>
  );
};

export default Header;
