import { div } from "motion/react-client";
import { useState } from "react";

interface ContactButtonProps {
  icon?: React.ComponentType<any>;
  mainText?: string;
  subText?: string;
  onClick?: () => void;
}

const ContactButton = ({
  icon: Icon,
  mainText,
  subText,
  onClick,
}: ContactButtonProps) => {
  return (
    <button
      className="flex bg-[rgba(23,23,23,0.4)] hover:bg-[rgba(23,23,23,0.6)] rounded-md cursor-pointer items-center"
      onClick={onClick}
    >
      <div className="flex flex-row w-md px-4 py-5 gap-4">
        {Icon && <Icon className="text-white w-auto h-32" strokeWidth={1} />}
        <div className="flex flex-col justify-center font-noto">
          <h1 className="text-white font-medium">{mainText}</h1>
          <h1 className="text-white font-extralight">{subText}</h1>
        </div>
      </div>
    </button>
  );
};

export default ContactButton;
