import { Outlet } from "react-router";
import { BgProvider } from "./BgLayer";
import Header from "./Header";

const subPages = ["Home", "About", "Contact"];
const logoSrc = "/images/az-casa-bonita-logo.png";
const title = "AZ Casa Bonita";

const Layout = () => {
  return (
    <BgProvider>
      <div className="relative h-dvh overflow-hidden flex flex-col">
        <Header subPages={subPages} logoSrc={logoSrc} title={title} />
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </BgProvider>
  );
};

export default Layout;
