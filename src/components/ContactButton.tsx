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
        className="flex bg-[rgba(23,23,23,0.4)] hover:bg-[rgba(23,23,23,0.6)] rounded-xl w-full cursor-pointer items-center transition-all duration-500"
        onClick={onClick}
      >
        <div className="flex flex-row max-w-3xl px-4 py-5 gap-4">
          {Icon && (
            <Icon
              className="text-white h-auto w-16 lg:w-20 xl:w-24 2xl:w-28"
              strokeWidth={1}
            />
          )}
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
