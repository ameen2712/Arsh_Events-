import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg";
  onHover?: boolean;
  autoAnimate?: boolean;
  className?: string;
}

export default function AnimatedLogo({
  size = "md",
  onHover = true,
  autoAnimate = true,
  className = "",
}: AnimatedLogoProps) {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const sizes = {
    sm: { container: "w-8 h-8", text: "text-base" },
    md: { container: "w-10 h-10", text: "text-lg" },
    lg: { container: "w-16 h-16", text: "text-2xl" },
  };

  useEffect(() => {
    if (autoAnimate) {
      const animateSequence = async () => {
        await controls.start({
          scale: [1, 1.1, 1],
          rotate: [0, 360],
          transition: { duration: 2, ease: "easeInOut" },
        });

        // Shimmer effect
        await controls.start({
          background: [
            "linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)",
            "linear-gradient(90deg, #FFA500 0%, #FFD700 50%, #FFA500 100%)",
            "linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)",
          ],
          transition: { duration: 1.5, repeat: 2 },
        });
      };

      animateSequence();
    }
  }, [controls, autoAnimate]);

  const handleHover = () => {
    if (onHover) {
      setIsHovered(true);
      controls.start({
        scale: 1.05,
        rotate: 5,
        boxShadow: "0 0 30px rgba(255, 215, 0, 0.6)",
        transition: { duration: 0.3 },
      });
    }
  };

  const handleHoverEnd = () => {
    if (onHover) {
      setIsHovered(false);
      controls.start({
        scale: 1,
        rotate: 0,
        boxShadow: "0 0 0px rgba(255, 215, 0, 0)",
        transition: { duration: 0.3 },
      });
    }
  };

  return (
    <motion.div
      animate={controls}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
      className={`${sizes[size].container} bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center cursor-pointer relative overflow-hidden ${className}`}
    >
      {/* Shimmer overlay */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "100%" } : { x: "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        style={{ transform: "skewX(-20deg)" }}
      />

      {/* SVG Letter A with path animation */}
      <motion.svg
        viewBox="0 0 24 24"
        className={`${sizes[size].text} text-black font-black`}
        fill="currentColor"
      >
        <motion.path
          d="M12 2L2 20h3l2-4h10l2 4h3L12 2zm0 6l3 6H9l3-6z"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          stroke="currentColor"
          strokeWidth="0.5"
          fill="currentColor"
        />
      </motion.svg>

      {/* Sparkle effects */}
      {isHovered && (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: [0, 180],
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${20 + i * 20}%`,
                left: `${20 + i * 30}%`,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}
