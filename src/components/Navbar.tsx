import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { capitalizeFirst } from "../utils";

interface NavbarProps {
  subPages: string[];
}

const Navbar = ({ subPages }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentPage = (path: string) => {
    if (path === "/") {
      return "Home";
    } else {
      return capitalizeFirst(path.slice(1));
    }
  };

  const [currentPage, setCurrentPage] = useState(
    getCurrentPage(location.pathname)
  );

  useEffect(() => {
    setCurrentPage(getCurrentPage(location.pathname));
  }, [location.pathname]);

  const handleClickSubPage = (subPage: string) => {
    setCurrentPage(subPage);
    if (subPage === "Home") {
      navigate(`/`);
    } else {
      navigate(`/${subPage.toLowerCase()}`);
    }
  };

  return (
    <nav className="flex gap-16 text-white text-lg">
      {subPages.map((subPage) => (
        <button
          key={subPage}
          onClick={() => handleClickSubPage(subPage)}
          className={`transition-all duration-400 hover:scale-120 cursor-pointer ${
            currentPage === subPage
              ? "opacity-100 font-semibold"
              : "opacity-60 hover:opacity-80"
          }`}
        >
          {subPage}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
