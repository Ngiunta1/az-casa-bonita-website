export type AnimationVariant =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "fadeIn"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "zoom"
  | "rotate"
  | "flip"
  | "bounce"
  | "shake"
  | "lift"
  | "glow"
  | "tilt"
  | "grow"
  | "press";

export type TriggerType = "scroll" | "hover" | "tap" | "focus" | "mount";

export type IntensityLevel = "subtle" | "normal" | "strong";

export interface CustomIntensity {
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  opacity?: number;
}

export interface AnimationConfig {
  variant: AnimationVariant;
  intensity?: IntensityLevel;
  duration?: number;
  delay?: number;
  repeat?: number | "infinite";
  customIntensity?: CustomIntensity;
}

export interface ScrollConfig extends AnimationConfig {
  once?: boolean;
  threshold?: number;
  margin?: string;
}

export interface ManualConfig extends AnimationConfig {
  isActive?: boolean;
}

export interface AnimateProps {
  children: React.ReactNode;

  // Animation configs for each trigger
  scroll?: ScrollConfig;
  hover?: AnimationConfig;
  tap?: AnimationConfig;
  focus?: AnimationConfig;
  mount?: AnimationConfig;
  manual?: ManualConfig;

  // Style and events
  className?: string;
  onClick?: () => void;
  onAnimationComplete?: () => void;
}
