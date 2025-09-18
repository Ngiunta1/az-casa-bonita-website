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
      className={`flex flex-col px-24 py-18 bg-cover bg-center h-screen transition-all duration-400`}
    >
      {children}
    </div>
  );
};

export default MainWrapper;
