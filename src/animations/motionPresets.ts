// src/animations/motionPresets.ts
// -------------------------------------------------------------
// ✨ Framer Motion animation presets for React + TypeScript
// Author: You (MIT License)
// -------------------------------------------------------------
import type { Variants, Transition } from "framer-motion";

// const EASE: Transition["ease"] = [0.22, 1, 0.36, 1]; // tried 1st
// const EASE: Transition["ease"] = [0.16, 1, 0.3, 1]; // tried 2nd
// const EASE: Transition["ease"] = [0.25, 1.5, 0.5, 1]; // tried 3rd
const EASE: Transition["ease"] = [0.39, 0.575, 0.565, 1]; //tried 4th KOT SINE OUT
// const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];
// const EASE: Transition["ease"] = [0.25, 1.5, 0.5, 1];
// const EASE: Transition["ease"] = [0.23, 1, 0.32, 1];
// const EASE: Transition["ease"] = [0.18, 0.9, 0.22, 1];
const FAST = 0.4;
export const DURATION = 0.6;

// -------------------------------------------------------------
// 🧩 Utility Functions
// -------------------------------------------------------------
type MotionOptions = {
  delay?: number;
  duration?: number;
  distance?: number;
  scaleFrom?: number;
  opacityFrom?: number;
  ease?: Transition["ease"];
};

const getTransition = (o?: MotionOptions): Transition => ({
  duration: o?.duration ?? DURATION,
  delay: o?.delay ?? 0,
  ease: o?.ease ?? EASE,
});

export const sequentialTextAppear = (index: number, baseDelay = 0.5): Variants => {
  const delay = baseDelay + index * 0.075;
  return {
    hidden: { y: 30, opacity: 0, scale: 0.75 },
    show: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: EASE,
        delay,
      },
    },
  };
};

/* Backdrop fade + blur */
export const backdropVariants: Variants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  show: {
    opacity: 1,
    backdropFilter: "blur(12px)",
    transition: { duration: DURATION, ease: EASE },
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    transition: { duration: 0.3, ease: EASE },
  },
};

/* Modal pop + lift */
export const modalVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: EASE,
      delay: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: { duration: 0.3, ease: EASE },
  },
};

/* CONTACT / FORM FIELDS */
export const formFieldsReview = (index: number, baseDelay = 0.5): Variants => {
  const delay = baseDelay + index * 0.125;
  return {
    hidden: { y: 30, opacity: 0, scale: 0.75 },
    show: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: EASE,
        delay,
      },
    },
  };
};

/* PACKETS */
export const packetBox = (index: number, baseDelay = 0.5): Variants => {
  const delay = baseDelay + index * 0.25;
  return {
    hidden: { y: 30, opacity: 0, scale: 0.75 },
    show: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: EASE,
        delay,
      },
    },
  };
};


/* REVIEWS */
export const reviewTrack = (delay = 0): Variants => ({
  hidden: { y: 30, opacity: 0, transform: "scale(0.75)", },
  show: {
    y: 0,
    opacity: 1,
    transform: "scale(1)",
    transition: {
      duration: 0.5,
      ease: EASE,
      delay, // ✅ delay belongs inside transition
    },
  },
});

export const reviewArrows = (delay = 0): Variants => ({
  hidden: { y: 30, opacity: 0, transform: "scale(0.75)", },
  show: {
    y: 0,
    opacity: 1,
    transform: "scale(1)",
    transition: {
      duration: 0.5,
      ease: EASE,
      delay, // ✅ delay belongs inside transition
    },
  },
});

export const sectionHeader = (delay = 0): Variants => ({
  hidden: { y: 30, opacity: 0, transform: "scale(0.75)", },
  show: {
    y: 0,
    opacity: 1,
    transform: "scale(1)",
    transition: {
      duration: 0.5,
      ease: EASE,
      delay, // ✅ delay belongs inside transition
    },
  },
});

export const AboutHeaderAppear = (delay = 0.2): Variants => ({
  hidden: { y: 50, opacity: 0, transform: "scale(0.75)", },
  show: {
    y: 0,
    opacity: 1,
    transform: "scale(1)",
    transition: {
      duration: 0.35,
      ease: EASE,
      delay, // ✅ delay belongs inside transition
    },
  },
});

export const AboutDescriptionAppear = (delay = 0.5): Variants => ({
  hidden: { y: "50%", opacity: 0, transform: "scale(0.8)", },
  show: {
    y: 0,
    opacity: 1,
    transform: "scale(1)",
    transition: {
      duration: 0.35,
      ease: EASE,
      delay, // ✅ delay belongs inside transition
    },
  },
});

export const slightTextAppear = (delay = 0): Variants => ({
  hidden: { y: 30, opacity: 0, transform: "scale(0.75)", },
  show: {
    y: 0,
    opacity: 1,
    transform: "scale(1)",
    transition: {
      duration: 0.35,
      ease: EASE,
      delay, // ✅ delay belongs inside transition
    },
  },
});

export const CTAButtonAppear = (o?: MotionOptions): Variants => ({
  hidden: {
    opacity: o?.opacityFrom ?? 0,
    scale: o?.scaleFrom ?? 0.95,
    filter: "blur(4px)",
    transform: "scale(0.675)",
  },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: getTransition(o),
    transform: "scale(1)",
  },
});

export const AboutHeaderTextAppear = (o?: MotionOptions): Variants => ({
  hidden: {
    opacity: o?.opacityFrom ?? 0,
    scale: o?.scaleFrom ?? 0.95,
    transform: "scale(0.675)",
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: getTransition(o),
    transform: "scale(1)",
  },
});

// -------------------------------------------------------------
// 🔝 Navigation Fade From Top
// -------------------------------------------------------------
export const navFadeFromTop = (o?: MotionOptions): Variants => ({
  hidden: { y: -79, opacity: 1 },
  show: { y: 0, opacity: 1, transition: getTransition(o) },
});
// -------------------------------------------------------------
// 🧍 Footer Fade From Bottom
// -------------------------------------------------------------
export const footerFromBottom = (o?: MotionOptions): Variants => ({
  hidden: { y: 50, opacity: 0 },
  show: { y: 0, opacity: 1, transition: getTransition(o) },
});


// Word-by-word staggered text
export const textStaggerContainer = (
  stagger = 0.05,
  delayChildren = 0
): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const textStaggerItem = (o?: MotionOptions): Variants => ({
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: getTransition(o) },
});

// -------------------------------------------------------------
// 🖼️ Image / Photo Appear (Zoom + Fade + Blur)
// -------------------------------------------------------------
export const photoAppear = (o?: MotionOptions): Variants => ({
  hidden: {
    opacity: o?.opacityFrom ?? 0,
    scale: o?.scaleFrom ?? 0.95,
    filter: "blur(4px)",
    // transform: "scale(0.5)",
  },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: getTransition(o),
    // transform: "scale(1)",
  },
});

export const rightMainSlide = (
  direction: "left" | "right" | "up" | "down",
  o?: MotionOptions
): Variants => {
  const dist = o?.distance ?? "100%";

  const isHorizontal = direction === "left" || direction === "right";
  const axis: "x" | "y" = isHorizontal ? "x" : "y";
  const from =
    direction === "left"
      ? -dist
      : direction === "right"
      ? dist
      : direction === "up"
      ? dist
      : -dist;

  const transition = getTransition(o);

  // Build objects explicitly using discriminated property type
  const hidden =
    axis === "x"
      ? { opacity: 0, x: from, transition,  }
      : { opacity: 0, y: from, transition,  };

  const show =
    axis === "x"
      ? { opacity: 1, x: 0, transition, transform: "scale(1)" }
      : { opacity: 1, y: 0, transition, transform: "scale(1)" };

  return { hidden, show };
};


// -------------------------------------------------------------
// 🧱 Multiple Elements Appear (Staggered Container)
// -------------------------------------------------------------
export const staggerContainer = (
  stagger = 0.08,
  delayChildren = 0
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const staggerItem = (o?: MotionOptions): Variants => ({
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: getTransition(o) },
});


// -------------------------------------------------------------
// 🪄 Floating Cards (Organic Spring Motion)
// -------------------------------------------------------------
export const floatIn = (o?: MotionOptions): Variants => ({
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 12,
      delay: o?.delay ?? 0,
    },
  },
});

// -------------------------------------------------------------
// 💫 Route/Page Transition
// -------------------------------------------------------------
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.5, ease: EASE },
  },
};

// -------------------------------------------------------------
// 🪶 Hover & Tap Interactions
// -------------------------------------------------------------
export const hoverLift = {
  whileHover: { y: -4, scale: 1.02, transition: { type: "spring", stiffness: 300 } },
  whileTap: { scale: 0.97 },
};

export const hoverGlow = {
  whileHover: {
    boxShadow: "0 0 12px rgba(255,255,255,0.3)",
    scale: 1.03,
    transition: { duration: 0.2 },
  },
  whileTap: { scale: 0.96 },
};

// -------------------------------------------------------------
// 🪄 Parallax Hover (Tilted 3D effect for images/cards)
// -------------------------------------------------------------
export const hoverParallax = {
  onMouseMove:
    (setRotate: (v: { x: number; y: number }) => void) =>
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setRotate({ x: y * 10, y: x * -10 });
    },
  onMouseLeave: (setRotate: (v: { x: number; y: number }) => void) => () => {
    setRotate({ x: 0, y: 0 });
  },
};

// -------------------------------------------------------------
// 🌈 Gradient Shimmer (for backgrounds or buttons)
// -------------------------------------------------------------
export const shimmerBackground: Variants = {
  initial: { backgroundPosition: "200% center" },
  animate: {
    backgroundPosition: "-200% center",
    transition: { duration: 3, repeat: Infinity, ease: "linear" },
  },
};

// -------------------------------------------------------------
// 🧩 Simple Fade / Slide Presets
// -------------------------------------------------------------
export const fadeIn = (o?: MotionOptions): Variants => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: getTransition(o) },
});

export const slideIn = (
  direction: "left" | "right" | "up" | "down",
  o?: MotionOptions
): Variants => {
  const dist = o?.distance ?? "100%";

  const isHorizontal = direction === "left" || direction === "right";
  const axis: "x" | "y" = isHorizontal ? "x" : "y";
  const from =
    direction === "left"
      ? -dist
      : direction === "right"
      ? dist
      : direction === "up"
      ? dist
      : -dist;

  const transition = getTransition(o);

  // Build objects explicitly using discriminated property type
  const hidden =
    axis === "x"
      ? { opacity: 0, x: from, transition }
      : { opacity: 0, y: from, transition };

  const show =
    axis === "x"
      ? { opacity: 1, x: 0, transition }
      : { opacity: 1, y: 0, transition };

  return { hidden, show };
};

// -------------------------------------------------------------
// 1️⃣ Curtain Reveal – horizontal mask like a stage opening
// -------------------------------------------------------------
export const curtainReveal: Variants = {
  hidden: { clipPath: "inset(0 50% 0 50%)", opacity: 0 },
  show: {
    clipPath: "inset(0 0% 0 0%)",
    opacity: 1,
    transition: { duration: 1, ease: EASE },
  },
};

// -------------------------------------------------------------
// 2️⃣ Glow Pulse – gentle breathing light loop (for CTAs/icons)
// -------------------------------------------------------------
export const glowPulse: Variants = {
  hidden: { filter: "brightness(1)" },
  show: {
    filter: ["brightness(1)", "brightness(1.25)", "brightness(1)"],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

// -------------------------------------------------------------
// 3️⃣ Rotate In – smooth rotate + scale fade-in (logos/icons)
// -------------------------------------------------------------
export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -15, scale: 0.9 },
  show: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: FAST, ease: EASE },
  },
};

// -------------------------------------------------------------
// 4️⃣ Swipe Up Mask – vertical reveal for cards or tiles
// -------------------------------------------------------------
export const swipeUpMask: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", opacity: 0 },
  show: {
    clipPath: "inset(0% 0 0 0)",
    opacity: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

// -------------------------------------------------------------
// 5️⃣ Soft Shake – micro playful hover wiggle (for icons)
// -------------------------------------------------------------
export const softShake = {
  whileHover: {
    rotate: [0, -3, 3, -2, 2, 0],
    transition: { duration: 0.6 },
  },
};

// -------------------------------------------------------------
// 6️⃣ Card Pop Orbit – floaty entrance for feature cards
// -------------------------------------------------------------
export const cardPopOrbit: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.9, rotate: -2 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 70, damping: 12 },
  },
};

// -------------------------------------------------------------
// 7️⃣ Line Draw – stroke animation for SVG paths/logos
// -------------------------------------------------------------
export const lineDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: EASE },
  },
};

// -------------------------------------------------------------
// 8️⃣ Backdrop Blur Pop – glassmorphism fade-in for modals
// -------------------------------------------------------------
export const backdropBlurPop: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(0px) brightness(0.8)",
  },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(8px) brightness(1)",
    transition: { duration: 0.7, ease: EASE },
  },
};

// -------------------------------------------------------------
// 9️⃣ Slide + Zoom Out – cinematic motion for hero text
// -------------------------------------------------------------
export const slideZoomOut: Variants = {
  hidden: { opacity: 0, y: "100%", scale: 1.1 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

// -------------------------------------------------------------
// 🔟 Wave Cascade – staggered “wave” entrance for lists/menus
// -------------------------------------------------------------
export const waveContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      ease: "easeOut",
    },
  },
};

export const waveItem: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: 15 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};