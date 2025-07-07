import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgressGlow() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Transform scroll progress to width percentage
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Glow intensity based on scroll progress
  const glowIntensity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.3, 0.8, 1],
  );

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setIsVisible(latest > 0.01); // Show after minimal scroll
    });

    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 h-1"
    >
      {/* Background bar */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />

      {/* Progress bar with glow */}
      <motion.div
        style={{
          width,
          boxShadow: useTransform(
            glowIntensity,
            [0, 1],
            [
              "0 0 10px rgba(255, 215, 0, 0.3)",
              "0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4)",
            ],
          ),
        }}
        className="h-full bg-gradient-to-r from-cinematic-purple via-cinematic-gold to-cinematic-rose relative overflow-hidden"
      >
        {/* Shimmer effect */}
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          style={{ transform: "skewX(-20deg)" }}
        />

        {/* Sparkle particles */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, 20, 40],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut",
            }}
            className="absolute top-1/2 w-1 h-1 bg-white rounded-full"
            style={{
              left: `${i * 30 + 10}%`,
              transform: "translateY(-50%)",
            }}
          />
        ))}
      </motion.div>

      {/* Decorative end points */}
      <motion.div
        style={{ x: width }}
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-cinematic-gold rounded-full shadow-lg"
      >
        {/* Pulsing glow */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-cinematic-gold rounded-full"
        />
      </motion.div>
    </motion.div>
  );
}
