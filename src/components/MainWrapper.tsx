import React from "react";

interface MainWrapperProps {
  children: React.ReactNode;
}

const MainWrapper = ({ children }: MainWrapperProps) => {
  return (
    <div className={`flex flex-col h-screen px-8 py-6 lg:py-18 lg:px-24`}>
      {children}
    </div>
  );
};

export default MainWrapper;
