interface ButtonProps {
  text: string;
  backgroundColor: "primary" | "secondary" | "danger" | "info";
  borderColor?: string;
  icon?: string;
  onClick: () => void;
}

const Button = ({
  text,
  backgroundColor,
  borderColor,
  icon,
  onClick,
}: ButtonProps) => {
  const buttonColor = () => {
    switch (backgroundColor) {
      case "primary":
        return "bg-[rgba(23,23,23,0.4)] hover:bg-[rgba(23,23,23,0.6)]";
      case "secondary":
        return "";
      case "danger":
        return "bg-[rgba(220,38,38,0.4)] hover:bg-[rgba(220,38,38,0.6)]";
      case "info":
        return "bg-[rgba(14,165,233,0.4)] hover:bg-[rgba(14,165,233,0.6)]";
    }
  };

  return (
    <div
      className={`${buttonColor()} ${borderColor} flex gap-5 p-5 h-fit items-center rounded-2xl cursor-pointer group transition-all duration-400`}
      onClick={onClick}
    >
      <button className="font-bold text-white text-3xl cursor-pointer">
        {text}
      </button>
      <img
        src={icon}
        className="w-auto h-8 transition-all duration-700 group-hover:scale-120"
      ></img>
    </div>
  );
};

export default Button;
