import { Outlet } from "react-router";
import Header from "./Header";
import { useRef } from "react";

const subPages = ["Home", "About", "Contact"];
const logoSrc = "src/assets/images/az-casa-bonita-logo.png";
const title = "AZ Casa Bonita";

// const backgrounds: Record<string, string> = {
//   "/": "src/assets/images/clean-living-room.png",
//   "/about": "src/assets/images/sunset-living-room.png",
//   "/contact": "src/assets/images/kitchen.png",
// };

const Layout = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col">
      <Header subPages={subPages} logoSrc={logoSrc} title={title} />
      <Outlet />
    </div>
  );
};

export default Layout;
