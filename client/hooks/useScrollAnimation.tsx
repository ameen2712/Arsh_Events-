import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  duration?: number;
  stagger?: number;
}

/**
 * Hook for scroll-triggered animations using Intersection Observer
 */
export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "-10% 0px -10% 0px",
    triggerOnce = true,
    delay = 0,
    duration = 0.6,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, {
    threshold,
    margin: rootMargin,
    once: triggerOnce,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!triggerOnce) {
      controls.start("hidden");
    }
  }, [controls, inView, triggerOnce]);

  const variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return { ref, controls, variants, inView };
};

/**
 * Hook for staggered scroll animations
 */
export const useStaggeredAnimation = (
  options: ScrollAnimationOptions & { itemCount?: number } = {},
) => {
  const {
    threshold = 0.1,
    rootMargin = "-10% 0px -10% 0px",
    triggerOnce = true,
    delay = 0,
    duration = 0.6,
    stagger = 0.1,
    itemCount = 1,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, {
    threshold,
    margin: rootMargin,
    once: triggerOnce,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!triggerOnce) {
      controls.start("hidden");
    }
  }, [controls, inView, triggerOnce]);

  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: stagger,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return { ref, controls, variants, itemVariants, inView };
};

/**
 * Hook for parallax scroll effects
 */
export const useParallaxScroll = (speed: number = 0.5) => {
  const [offsetY, setOffsetY] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        setOffsetY(rate);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offsetY };
};

/**
 * Hook for reveal animations on scroll
 */
export const useRevealAnimation = (
  direction: "up" | "down" | "left" | "right" = "up",
) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    threshold: 0.2,
    margin: "-10% 0px -10% 0px",
    once: true,
  });

  const directionVariants = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  };

  const variants = {
    hidden: {
      opacity: 0,
      ...directionVariants[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return { ref, variants, inView };
};

/**
 * Hook for counter animations on scroll
 */
export const useCounterAnimation = (
  target: number,
  duration: number = 2000,
) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    threshold: 0.5,
    once: true,
  });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const startValue = 0;
      const endValue = target;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(
          startValue + (endValue - startValue) * easedProgress,
        );

        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [inView, target, duration]);

  return { ref, count };
};

/**
 * Hook for typing animation on scroll
 */
export const useTypingAnimation = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    threshold: 0.5,
    once: true,
  });

  useEffect(() => {
    if (inView) {
      let index = 0;
      const timer = setInterval(() => {
        setDisplayText(text.slice(0, index + 1));
        index++;
        if (index >= text.length) {
          clearInterval(timer);
        }
      }, speed);

      return () => clearInterval(timer);
    }
  }, [inView, text, speed]);

  return { ref, displayText };
};

/**
 * Enhanced ScrollReveal component
 */
interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
}) => {
  const { ref, variants } = useRevealAnimation(direction);

  const customVariants = {
    ...variants,
    visible: {
      ...variants.visible,
      transition: {
        ...variants.visible.transition,
        delay,
        duration,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={customVariants}
      initial="hidden"
      animate={ref.current ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Staggered reveal component for lists
 */
interface StaggeredRevealProps {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
}

export const StaggeredReveal: React.FC<StaggeredRevealProps> = ({
  children,
  stagger = 0.1,
  delay = 0,
  className = "",
}) => {
  const { ref, variants, itemVariants } = useStaggeredAnimation({
    delay,
    stagger,
  });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={ref.current ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};
