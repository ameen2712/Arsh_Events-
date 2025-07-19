import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  offset?: string[];
  imageUrl?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  height?: string;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  className = "",
  speed = 0.5,
  offset = ["start end", "end start"],
  imageUrl,
  overlay = true,
  overlayOpacity = 0.7,
  height = "100vh",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as [string, string],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%]">
        {imageUrl ? (
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        ) : (
          <div className="w-full h-full gradient-mesh" />
        )}

        {overlay && (
          <motion.div
            style={{ opacity }}
            className="absolute inset-0 bg-gradient-to-t from-cinematic-midnight/90 via-cinematic-midnight/40 to-cinematic-midnight/20"
          />
        )}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
  parallaxSpeed?: number;
  minHeight?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = "",
  backgroundImage,
  parallaxSpeed = 0.5,
  minHeight = "100vh",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * parallaxSpeed;
        setOffsetY(rate);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [parallaxSpeed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight }}
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
          transform: `translateY(${offsetY}px)`,
        }}
      >
        {!backgroundImage && (
          <div className="w-full h-full gradient-mesh opacity-60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-cinematic-midnight/80 via-transparent to-cinematic-midnight/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

interface FloatingElementProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  amplitude?: number;
  className?: string;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  speed = 1,
  direction = "up",
  amplitude = 20,
  className = "",
}) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed * 0.1;

      let newOffset;
      switch (direction) {
        case "up":
          newOffset = -rate;
          break;
        case "down":
          newOffset = rate;
          break;
        case "left":
          newOffset = -rate;
          break;
        case "right":
          newOffset = rate;
          break;
        default:
          newOffset = -rate;
      }

      setOffset(newOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, direction]);

  const transform =
    direction === "left" || direction === "right"
      ? `translateX(${offset}px)`
      : `translateY(${offset}px)`;

  return (
    <div
      className={`transform-gpu will-change-transform ${className}`}
      style={{ transform }}
    >
      {children}
    </div>
  );
};

interface ScrollProgressProps {
  className?: string;
  height?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  className = "",
  height = "4px",
  backgroundColor = "hsl(var(--primary))",
  children,
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <motion.div
        style={{ scaleX, backgroundColor, height }}
        className="origin-left"
      />
      {children}
    </div>
  );
};

interface RevealOnScrollProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  animation?: "fade" | "slide" | "scale" | "rotate";
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  threshold = 0.1,
  rootMargin = "0px",
  className = "",
  animation = "fade",
  direction = "up",
  delay = 0,
  duration = 0.6,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  const getVariants = () => {
    const baseHidden = { opacity: 0 };
    const baseVisible = {
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    };

    switch (animation) {
      case "slide":
        const slideDistance = 50;
        const slideAxis =
          direction === "left" || direction === "right" ? "x" : "y";
        const slideValue =
          direction === "up" || direction === "left"
            ? slideDistance
            : -slideDistance;

        return {
          hidden: { ...baseHidden, [slideAxis]: slideValue },
          visible: { ...baseVisible, [slideAxis]: 0 },
        };

      case "scale":
        return {
          hidden: { ...baseHidden, scale: 0.8 },
          visible: { ...baseVisible, scale: 1 },
        };

      case "rotate":
        return {
          hidden: { ...baseHidden, rotate: -10 },
          visible: { ...baseVisible, rotate: 0 },
        };

      default: // fade
        return {
          hidden: baseHidden,
          visible: baseVisible,
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
