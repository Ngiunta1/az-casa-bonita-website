interface ButtonProps {
  text: string;
  backgroundColor: "primary" | "secondary" | "danger" | "info";
  borderColor?: string;
  icon?: string;
}

const Button = ({ text, backgroundColor, borderColor, icon }: ButtonProps) => {
  const buttonColor = () => {
    switch (backgroundColor) {
      case "primary":
        return "bg-[rgba(23,23,23,0.6)] hover:bg-[rgba(23,23,23,0.8)]";
      case "secondary":
        return "";
      case "danger":
        return "bg-[rgba(220,38,38,0.6)] hover:bg-[rgba(220,38,38,0.8)]";
      case "info":
        return "bg-[rgba(14,165,233,0.6)] hover:bg-[rgba(14,165,233,0.8)]";
    }
  };

  return (
    <div className="flex gap-1 content-center">
      <button
        className={`${buttonColor()} ${borderColor} font-bold text-white rounded- [2vw]`}
      >
        {text}
      </button>
      <img src={icon} className="w-1rem"></img>
    </div>
  );
};

export default Button;
