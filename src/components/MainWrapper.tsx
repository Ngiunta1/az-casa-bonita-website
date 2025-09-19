import React from "react";

interface MainWrapperProps {
  children: React.ReactNode;
  backgroundImageSrc?: string;
}

const MainWrapper = ({ children, backgroundImageSrc }: MainWrapperProps) => {
  return (
    <div
      style={
        backgroundImageSrc
          ? { backgroundImage: `url(${backgroundImageSrc})` }
          : undefined
      }
      className={`flex flex-col bg-cover bg-center h-screen transition-all duration-400 px-8 py-6 lg:py-18 lg:px-24`}
    >
      {children}
    </div>
  );
};

export default MainWrapper;
