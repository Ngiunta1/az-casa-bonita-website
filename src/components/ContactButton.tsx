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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex bg-[rgba(23,23,23,0.4)] hover:bg-[rgba(23,23,23,0.6)] rounded-md cursor-pointer w-[600px] h-[100px] items-center">
        <div className="flex flex-row">
          <i className={`${icon} text-white text-5xl`}></i>
          <div className="flex flex-col justify-center align-center items-center">
            <h1 className="text-white font-bold">{mainText}</h1>
            <h1 className="text-white font-light">{subText}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactButton;
