import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import MainWrapper from "./components/MainWrapper.tsx";
import Header from "./components/Header.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";

const subPages = ["Home", "About", "Contact"];
const logoSrc = "src/assets/images/az-casa-bonita-logo.png";
const title = "AZ Casa Bonita";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MainWrapper backgroundImageSrc="src/assets/images/clean-living-room.png">
        <Header subPages={subPages} logoSrc={logoSrc} title={title} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  </StrictMode>
);
