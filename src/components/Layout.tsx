import { Outlet } from "react-router";
import Header from "./Header";

const subPages = ["Home", "About", "Contact"];
const logoSrc = "/images/az-casa-bonita-logo.png";
const title = "AZ Casa Bonita";

const Layout = () => {
  return (
    <div className="relative h-dvh overflow-hidden flex flex-col">
      <Header subPages={subPages} logoSrc={logoSrc} title={title} />
      <Outlet />
    </div>
  );
};

export default Layout;
