import { div } from "motion/react-client";
import { useState } from "react";

interface ContactButtonProps {
  icon?: string;
  mainText?: string;
  subText?: string;
  onClick?: () => void;
}

const ContactButton = ({
  icon,
  mainText,
  subText,
  onClick,
}: ContactButtonProps) => {
  return (
    <div
      className="flex bg-[rgba(23,23,23,0.4)] hover:bg-[rgba(23,23,23,0.6)] rounded-md cursor-pointer items-center"
      onClick={onClick}
    >
      <div className="flex flex-row w-md px-4 py-5 gap-4">
        <i className={`${icon} text-white text-5xl`}></i>
        <div className="flex flex-col justify-center font-noto">
          <h1 className="text-white font-medium">{mainText}</h1>
          <h1 className="text-white font-extralight">{subText}</h1>
        </div>
      </div>
    </div>
  );
};

export default ContactButton;
