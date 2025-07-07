import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";

interface DynamicBackgroundProps {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
  pattern?: "geometric" | "organic" | "luxe";
}

export default function DynamicBackground({
  className = "",
  intensity = "medium",
  pattern = "geometric",
}: DynamicBackgroundProps) {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Scroll-based transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const patternRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const patternScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const getIntensityValues = () => {
    switch (intensity) {
      case "subtle":
        return { opacity: 0.03, blur: "60px", scale: 0.8 };
      case "strong":
        return { opacity: 0.08, blur: "40px", scale: 1.2 };
      default:
        return { opacity: 0.05, blur: "50px", scale: 1 };
    }
  };

  const { opacity, blur, scale } = getIntensityValues();

  const renderGeometricPattern = () => (
    <>
      {/* Primary geometric shapes */}
      <motion.div
        style={{
          rotate: patternRotate,
          scale: patternScale,
          x: mouseXSpring,
          y: mouseYSpring,
        }}
        className="absolute inset-0"
      >
        {/* Hexagonal grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='${opacity * 10}'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            filter: `blur(${blur})`,
            transform: `scale(${scale})`,
          }}
        />

        {/* Diamond pattern overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFA500' fill-opacity='${opacity * 8}' fill-rule='evenodd'%3E%3Cpath d='M20 20L10 30L20 40L30 30z'/%3E%3C/g%3E%3C/svg%3E")`,
            filter: `blur(${blur})`,
            transform: `scale(${scale * 0.8}) rotate(45deg)`,
          }}
        />
      </motion.div>

      {/* Floating geometric elements */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            opacity: [opacity, opacity * 2, opacity],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
          className="absolute w-8 h-8 border border-yellow-400"
          style={{
            filter: `blur(${parseInt(blur) / 2}px)`,
            borderWidth: "1px",
            borderColor: `rgba(255, 215, 0, ${opacity * 5})`,
          }}
        />
      ))}
    </>
  );

  const renderOrganicPattern = () => (
    <motion.div
      style={{
        y: backgroundY,
        scale: patternScale,
      }}
      className="absolute inset-0"
    >
      {/* Organic blob shapes */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
          }}
          animate={{
            x: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
            y: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-64 h-64 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(255,215,0,${opacity}) 0%, transparent 70%)`,
            filter: `blur(${blur})`,
          }}
        />
      ))}
    </motion.div>
  );

  const renderLuxePattern = () => (
    <>
      {/* Art Deco inspired pattern */}
      <motion.div
        style={{
          rotate: patternRotate,
          scale: patternScale,
        }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='${opacity * 6}'%3E%3Cpath d='M50 0L60 40L100 50L60 60L50 100L40 60L0 50L40 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            filter: `blur(${blur})`,
          }}
        />
      </motion.div>

      {/* Luxury sparkles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: 0,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, opacity * 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
          className="absolute w-2 h-2"
          style={{
            background: `conic-gradient(from 0deg, #FFD700, #FFA500, #FFD700)`,
            filter: `blur(1px)`,
          }}
        />
      ))}
    </>
  );

  const renderPattern = () => {
    switch (pattern) {
      case "organic":
        return renderOrganicPattern();
      case "luxe":
        return renderLuxePattern();
      default:
        return renderGeometricPattern();
    }
  };

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
    >
      {/* Mouse-reactive gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,215,0,${opacity * 2}), transparent 40%)`,
        }}
      />

      {/* Main pattern */}
      {renderPattern()}

      {/* Scroll-reactive overlay */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cinematic-gold/5 to-transparent"
      />
    </div>
  );
}
