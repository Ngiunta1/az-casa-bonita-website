import { div } from "motion/react-client";
import { useState } from "react";
import { Animate } from "./Animate";

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
    <Animate mount={{ variant: "fadeUp" }} hover={{ variant: "lift" }}>
      <button
        className="flex bg-[rgba(23,23,23,0.4)] hover:bg-[rgba(23,23,23,0.6)] rounded-xl cursor-pointer items-center transition-all duration-500"
        onClick={onClick}
      >
        <div className="flex flex-row w-2xl px-4 py-5 gap-4">
          {Icon && <Icon className="text-white w-auto h-32" strokeWidth={1} />}
          <div className="flex flex-col justify-center font-noto items-start">
            <h1 className="text-white font-medium">{mainText}</h1>
            <h1 className="text-white font-extralight">{subText}</h1>
          </div>
        </div>
      </button>
    </Animate>
  );
};

export default ContactButton;
