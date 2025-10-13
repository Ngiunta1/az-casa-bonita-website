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
    <div className="flex flex-col bg-[rgba(23,23,23,0.4)] hover:bg-[rgba(23,23,23,0.6)]  items-center rounded-2xl cursor-pointer w-[40px] h-[20px]"></div>
  );
};

export default ContactButton;
