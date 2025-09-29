import React, { useMemo, forwardRef, type JSX } from "react";
import {
  motion,
  type Variant,
  type MotionProps,
  type Transition,
} from "framer-motion";

// ============================================================================
// Type Definitions
// ============================================================================

type AnimationVariant =
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
  | "scaleX"
  | "scaleY"
  | "zoom"
  | "rotate"
  | "rotateX"
  | "rotateY"
  | "flip"
  | "flipX"
  | "flipY"
  | "bounce"
  | "shake"
  | "pulse"
  | "swing"
  | "wobble"
  | "lift"
  | "float"
  | "glow"
  | "tilt"
  | "grow"
  | "press"
  | "blur"
  | "skew"
  | "morph"
  | "fadeBounce"
  | "wavyGlow";

type IntensityLevel = "subtle" | "normal" | "strong" | "extreme";

type EasingFunction =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "circIn"
  | "circOut"
  | "circInOut"
  | "backIn"
  | "backOut"
  | "backInOut"
  | "anticipate"
  | [number, number, number, number]; // Custom cubic bezier

interface CustomIntensity {
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  opacity?: number;
  blur?: number;
  skew?: number;
}

interface AnimationConfig {
  variant: AnimationVariant;
  intensity?: IntensityLevel;
  duration?: number;
  delay?: number;
  repeat?: number | "infinite";
  repeatType?: "loop" | "reverse" | "mirror";
  repeatDelay?: number;
  ease?: EasingFunction;
  customIntensity?: CustomIntensity;
  stagger?: number;
  spring?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

interface ScrollConfig extends AnimationConfig {
  once?: boolean;
  threshold?: number;
  margin?: string;
  exitAnimation?: boolean; // Animate out when scrolling out of view
}

interface ManualConfig extends AnimationConfig {
  isActive: boolean;
  reverse?: boolean;
}

interface AnimateProps
  extends Omit<MotionProps, "animate" | "initial" | "exit"> {
  children: React.ReactNode;
  scroll?: ScrollConfig;
  hover?: AnimationConfig;
  tap?: AnimationConfig;
  focus?: AnimationConfig;
  mount?: AnimationConfig;
  manual?: ManualConfig;
  exit?: AnimationConfig;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
  disabled?: boolean;
  debug?: boolean;
}

// ============================================================================
// Animation Presets Factory
// ============================================================================

const INTENSITY_MULTIPLIERS: Record<IntensityLevel, number> = {
  subtle: 0.5,
  normal: 1,
  strong: 1.5,
  extreme: 2,
};

const createAnimationStates = (
  variant: AnimationVariant,
  intensity: IntensityLevel = "normal",
  customIntensity?: CustomIntensity
): { hidden: Variant; visible: Variant } => {
  const multiplier = INTENSITY_MULTIPLIERS[intensity];
  const custom = customIntensity || {};

  const animations: Record<
    AnimationVariant,
    { hidden: Variant; visible: Variant }
  > = {
    fadeUp: {
      hidden: {
        opacity: 0,
        y: custom.y !== undefined ? custom.y : 20 * multiplier,
      },
      visible: {
        opacity: custom.opacity ?? 1,
        y: 0,
      },
    },
    fadeDown: {
      hidden: {
        opacity: 0,
        y: custom.y !== undefined ? -custom.y : -20 * multiplier,
      },
      visible: {
        opacity: custom.opacity ?? 1,
        y: 0,
      },
    },
    fadeLeft: {
      hidden: {
        opacity: 0,
        x: custom.x !== undefined ? custom.x : 20 * multiplier,
      },
      visible: {
        opacity: custom.opacity ?? 1,
        x: 0,
      },
    },
    fadeRight: {
      hidden: {
        opacity: 0,
        x: custom.x !== undefined ? -custom.x : -20 * multiplier,
      },
      visible: {
        opacity: custom.opacity ?? 1,
        x: 0,
      },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: custom.opacity ?? 1 },
    },
    slideUp: {
      hidden: { y: custom.y !== undefined ? custom.y : 50 * multiplier },
      visible: { y: 0 },
    },
    slideDown: {
      hidden: { y: custom.y !== undefined ? -custom.y : -50 * multiplier },
      visible: { y: 0 },
    },
    slideLeft: {
      hidden: { x: custom.x !== undefined ? custom.x : 50 * multiplier },
      visible: { x: 0 },
    },
    slideRight: {
      hidden: { x: custom.x !== undefined ? -custom.x : -50 * multiplier },
      visible: { x: 0 },
    },
    scale: {
      hidden: {
        scale: custom.scale ?? 1 - 0.2 * multiplier,
        opacity: 0,
      },
      visible: {
        scale: 1,
        opacity: 1,
      },
    },
    scaleX: {
      hidden: { scaleX: custom.scale ?? 1 - 0.2 * multiplier },
      visible: { scaleX: 1 },
    },
    scaleY: {
      hidden: { scaleY: custom.scale ?? 1 - 0.2 * multiplier },
      visible: { scaleY: 1 },
    },
    zoom: {
      hidden: {
        scale: custom.scale ?? 1 - 0.1 * multiplier,
        opacity: 0,
      },
      visible: {
        scale: 1,
        opacity: 1,
      },
    },
    rotate: {
      hidden: {
        rotate: custom.rotate ?? 10 * multiplier,
        opacity: 0,
      },
      visible: {
        rotate: 0,
        opacity: 1,
      },
    },
    rotateX: {
      hidden: {
        rotateX: custom.rotate ?? 15 * multiplier,
        opacity: 0,
      },
      visible: {
        rotateX: 0,
        opacity: 1,
      },
    },
    rotateY: {
      hidden: {
        rotateY: custom.rotate ?? 15 * multiplier,
        opacity: 0,
      },
      visible: {
        rotateY: 0,
        opacity: 1,
      },
    },
    flip: {
      hidden: { rotateY: 180, opacity: 0 },
      visible: { rotateY: 0, opacity: 1 },
    },
    flipX: {
      hidden: { rotateX: 180, opacity: 0 },
      visible: { rotateX: 0, opacity: 1 },
    },
    flipY: {
      hidden: { rotateY: 180, opacity: 0 },
      visible: { rotateY: 0, opacity: 1 },
    },
    bounce: {
      hidden: { y: 0 },
      visible: {
        y: [0, -(6 * multiplier), 0],
        transition: {
          duration: 0.6,
          times: [0, 0.5, 1],
          ease: "easeOut",
        },
      },
    },
    shake: {
      hidden: { x: 0 },
      visible: {
        x: [
          -2 * multiplier,
          2 * multiplier,
          -2 * multiplier,
          2 * multiplier,
          0,
        ],
        transition: {
          duration: 0.5,
          ease: "linear",
        },
      },
    },
    pulse: {
      hidden: { scale: 1 },
      visible: {
        scale: [1, 1 + 0.05 * multiplier, 1],
        transition: {
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },
    swing: {
      hidden: { rotate: 0 },
      visible: {
        rotate: [
          0,
          5 * multiplier,
          -5 * multiplier,
          3 * multiplier,
          -3 * multiplier,
          0,
        ],
        transition: {
          duration: 0.8,
          ease: "easeInOut",
        },
      },
    },
    wobble: {
      hidden: { rotate: 0, x: 0 },
      visible: {
        rotate: [0, -5 * multiplier, 3 * multiplier, -3 * multiplier, 0],
        x: [0, -5 * multiplier, 3 * multiplier, -3 * multiplier, 0],
        transition: {
          duration: 0.8,
          ease: "easeInOut",
        },
      },
    },
    lift: {
      hidden: { y: 0, scale: 1 },
      visible: {
        y: -(8 * multiplier),
        scale: 1 + 0.02 * multiplier,
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      },
    },
    float: {
      hidden: { y: 0 },
      visible: {
        y: [-2 * multiplier, 2 * multiplier],
        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      },
    },
    glow: {
      hidden: {
        filter: "brightness(1) drop-shadow(0 0 0px transparent)",
      },
      visible: {
        filter: `brightness(${1 + 0.1 * multiplier}) drop-shadow(0 0 ${
          10 * multiplier
        }px rgba(255, 255, 255, 0.5))`,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
    },
    tilt: {
      hidden: { rotateX: 0, rotateY: 0 },
      visible: {
        rotateX: 5 * multiplier,
        rotateY: 5 * multiplier,
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      },
    },
    grow: {
      hidden: { scale: 1 },
      visible: {
        scale: 1 + 0.05 * multiplier,
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      },
    },
    press: {
      hidden: { scale: 1 },
      visible: {
        scale: 1 - 0.05 * multiplier,
        transition: {
          duration: 0.1,
          ease: "easeOut",
        },
      },
    },
    blur: {
      hidden: {
        filter: `blur(${custom.blur ?? 8 * multiplier}px)`,
        opacity: 0,
      },
      visible: {
        filter: "blur(0px)",
        opacity: 1,
      },
    },
    skew: {
      hidden: {
        skewX: custom.skew ?? 10 * multiplier,
        opacity: 0,
      },
      visible: {
        skewX: 0,
        opacity: 1,
      },
    },
    morph: {
      hidden: {
        borderRadius: "0%",
        scale: custom.scale ?? 0.8,
        opacity: 0,
      },
      visible: {
        borderRadius: "50%",
        scale: 1,
        opacity: 1,
        transition: {
          borderRadius: { duration: 0.3 },
          scale: { duration: 0.5 },
          opacity: { duration: 0.2 },
        },
      },
    },
    fadeBounce: {
      hidden: { opacity: 0, y: 0 },
      visible: {
        opacity: 1,
        y: [0, -6, 0],
        transition: {
          opacity: { duration: 0.5 },
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        },
      },
    },
    wavyGlow: {
      hidden: {
        opacity: 0,
        y: 0,
        filter: "drop-shadow(0 0 0px rgba(255, 255, 255, 0))",
      },
      visible: {
        opacity: 1,
        y: [0, -3 * multiplier, 0, 3 * multiplier, 0], // wave motion
        filter: [
          "drop-shadow(0 0 4px rgba(255, 255, 255, 0.5))",
          "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))",
          "drop-shadow(0 0 12px rgba(255, 255, 255, 1))",
          "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))",
          "drop-shadow(0 0 4px rgba(255, 255, 255, 0.5))",
        ],
        transition: {
          duration: 2,
          ease: "easeInOut",
        },
      },
    },
  };

  return animations[variant] || animations.fadeIn;
};

// ============================================================================
// Animation State Builders
// ============================================================================

const buildTransition = (config: AnimationConfig): Transition => {
  const {
    duration = 0.5,
    delay = 0,
    repeat = 0,
    repeatType = "reverse",
    repeatDelay = 0,
    ease = "easeOut",
    spring,
  } = config;

  const baseTransition: Transition = {
    duration,
    delay,
    ease: ease as any,
    repeat: repeat === "infinite" ? Infinity : repeat,
    repeatType: repeatType as any,
    repeatDelay,
  };

  if (spring) {
    return {
      type: "spring",
      ...spring,
      delay,
      repeat: repeat === "infinite" ? Infinity : repeat,
      repeatType: repeatType as any,
      repeatDelay,
    };
  }

  return baseTransition;
};

const buildAnimationState = (config: AnimationConfig): Variant => {
  const { variant, intensity = "normal", customIntensity } = config;
  const states = createAnimationStates(variant, intensity, customIntensity);
  const visibleState = states.visible;

  // If the visible state already has a transition, preserve it
  if (
    visibleState &&
    typeof visibleState === "object" &&
    "transition" in visibleState
  ) {
    return {
      ...visibleState,
      transition: {
        ...(visibleState.transition as Transition),
        ...buildTransition(config),
      },
    };
  }

  return {
    ...visibleState,
    transition: buildTransition(config),
  };
};

const buildInitialState = (config: AnimationConfig): Variant => {
  const { variant, intensity = "normal", customIntensity } = config;
  return createAnimationStates(variant, intensity, customIntensity).hidden;
};

// ============================================================================
// Main Animate Component
// ============================================================================

export const Animate = forwardRef<HTMLElement, AnimateProps>(
  (
    {
      children,
      scroll,
      hover,
      tap,
      focus,
      mount,
      manual,
      exit,
      className = "",
      style = {},
      as = "div",
      disabled = false,
      debug = false,
      ...restProps
    },
    ref
  ) => {
    // Memoize animation props for performance
    const animationProps = useMemo(() => {
      if (disabled) return {};

      const props: any = {
        style: {
          ...style,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity, filter",
        },
      };

      // Scroll animations
      if (scroll) {
        props.initial = buildInitialState(scroll);
        props.whileInView = buildAnimationState(scroll);
        props.viewport = {
          once: scroll.once !== false,
          amount: scroll.threshold ?? 0.1,
          margin: scroll.margin ?? "0px",
        };

        if (scroll.exitAnimation) {
          props.exit = buildInitialState(scroll);
        }
      }

      // Mount animations
      if (mount) {
        if (!props.initial) props.initial = buildInitialState(mount);
        props.animate = buildAnimationState(mount);
      }

      // Manual animations
      if (manual) {
        if (!props.initial) props.initial = buildInitialState(manual);
        if (manual.isActive) {
          props.animate = manual.reverse
            ? buildInitialState(manual)
            : buildAnimationState(manual);
        } else if (manual.reverse) {
          props.animate = buildAnimationState(manual);
        }
      }

      // Interaction animations
      if (hover) props.whileHover = buildAnimationState(hover);
      if (tap) props.whileTap = buildAnimationState(tap);
      if (focus) props.whileFocus = buildAnimationState(focus);

      // Exit animations
      if (exit) props.exit = buildInitialState(exit);

      return props;
    }, [scroll, hover, tap, focus, mount, manual, exit, disabled, style]);

    // Debug mode
    if (debug && typeof window !== "undefined") {
      console.log("Animate Component Debug:", {
        props: { scroll, hover, tap, focus, mount, manual, exit },
        generatedAnimationProps: animationProps,
      });
    }

    const MotionComponent = motion[as as keyof typeof motion] as any;

    // Extract interaction transitions for consistent exit animations
    const transitionOverride = useMemo(() => {
      if (!hover && !tap && !focus) return undefined;

      // Use the hover transition as the default exit transition
      // This makes the "unhover" animation match the hover speed
      const config = hover || tap || focus;
      if (config) {
        return buildTransition(config);
      }
      return undefined;
    }, [hover, tap, focus]);

    return (
      <MotionComponent
        ref={ref}
        className={`${disabled ? "" : "transform-gpu"} ${className}`}
        transition={transitionOverride}
        {...animationProps}
        {...restProps}
      >
        {children}
      </MotionComponent>
    );
  }
);
