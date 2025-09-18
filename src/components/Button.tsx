interface ButtonProps {
  text: string;
  backgroundColor: "primary" | "secondary" | "danger" | "info";
  borderColor?: string;
}

const Button = ({ text, backgroundColor, borderColor }: ButtonProps) => {
  const buttonColor = () => {
    switch (backgroundColor) {
      case "primary":
        return "zinc-950 hover:opacity-80";
      case "secondary":
        return "";
      case "danger":
        return "red-600 hover:opacity-80";
      case "info":
        return "sky-600 hover:opacity-80";
    }
  };

  return <button className={`bg-${buttonColor()} opacity-60`}>{text}</button>;
};

export default Button;
