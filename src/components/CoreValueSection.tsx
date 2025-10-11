import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface CoreValueSectionProps {
  icon: React.ReactNode;
  image: string;
  title: string;
  subTitle: string;
  className?: string;
  motionValues?: { sm: MotionValue; md: MotionValue; lg: MotionValue };
}

const CoreValueSection = ({
  icon,
  title,
  subTitle,
  image,
  className,
  motionValues,
}: CoreValueSectionProps) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["end end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 0]);

  return (
    <div className="relative h-[150vh]">
      <motion.section
        ref={container}
        className={`${className} sticky h-screen flex flex-col p-20 bg-cover bg-center pt-48`}
        style={{
          backgroundImage: `url(${image})`,
          backgroundColor: "rgba(0,0,0,0.3)",
          backgroundBlendMode: "color",
          y,
        }}
      ></motion.section>
      <CoreValueContent icon={icon} title={title} subTitle={subTitle} />
    </div>
  );
};

const CoreValueContent = ({
  icon,
  title,
  subTitle,
}: {
  icon: React.ReactNode;
  title: string;
  subTitle: string;
}) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <motion.section
      ref={container}
      className="absolute left-0 top-0 flex h-screen w-full gap-8 items-center justify-center"
      style={{ y }}
    >
      <div className="flex items-cetner justify-center w-56 h-56 p-10 bg-black/30 rounded-full">
        {icon}
      </div>
      <div className="flex flex-col gap-20">
        <h1 className="text-white text-6xl font-bold text-center drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">
          {title}
        </h1>
        <h2 className="text-white text-4xl font-light text-center">
          {subTitle}
        </h2>
      </div>
      <div className="w-56" />
    </motion.section>
  );
};

export default CoreValueSection;
