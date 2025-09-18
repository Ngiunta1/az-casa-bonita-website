import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import MainWrapper from "./MainWrapper";

const subPages = ["Home", "About", "Contact"];
const logoSrc = "src/assets/images/az-casa-bonita-logo.png";
const title = "AZ Casa Bonita";

const Layout = () => {
  const location = useLocation();

  const getBackgroundForRoute = (route: string) => {
    const backgrounds: Record<string, string> = {
      "/": "src/assets/images/clean-living-room.png",
      "/about": "src/assets/images/sunset-living-room.png",
      "/contact": "src/assets/images/kitchen.png",
    };

    return backgrounds[route];
  };

  return (
    <MainWrapper backgroundImageSrc={getBackgroundForRoute(location.pathname)}>
      <Header subPages={subPages} logoSrc={logoSrc} title={title} />
      <main className="w-full h-full">
        <Outlet />
      </main>
    </MainWrapper>
  );
};

export default Layout;
