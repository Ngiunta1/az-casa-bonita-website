import { useState } from "react";
import { useNavigate } from "react-router";

interface NavbarProps {
  subPages: string[];
}

const Navbar = ({ subPages }: NavbarProps) => {
  const [currentPage, setCurrentPage] = useState("Home");

  const navigate = useNavigate();

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
