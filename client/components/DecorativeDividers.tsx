import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DecorativeDividerProps {
  type?: "line" | "diamond" | "sparkle" | "curve";
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  className?: string;
}

export function DecorativeDivider({
  type = "line",
  size = "md",
  animate = true,
  className = "",
}: DecorativeDividerProps) {
  const sizes = {
    sm: { width: "w-16", height: "h-px", gap: "gap-2" },
    md: { width: "w-20", height: "h-0.5", gap: "gap-3" },
    lg: { width: "w-24", height: "h-1", gap: "gap-4" },
  };

  const renderLine = () => (
    <div className={`flex items-center ${sizes[size].gap} ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={animate ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`${sizes[size].width} ${sizes[size].height} bg-gradient-to-r from-transparent via-cinematic-gold to-transparent origin-center`}
      />
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={animate ? { scale: 1, rotate: 360 } : {}}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="w-2 h-2 bg-cinematic-gold rounded-full"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={animate ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className={`${sizes[size].width} ${sizes[size].height} bg-gradient-to-r from-transparent via-cinematic-gold to-transparent origin-center`}
      />
    </div>
  );

  const renderDiamond = () => (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.svg
        width="60"
        height="20"
        viewBox="0 0 60 20"
        className="text-cinematic-gold"
        initial={{ opacity: 0, scale: 0 }}
        animate={animate ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.path
          d="M10 10L20 5L30 10L20 15z M30 10L40 5L50 10L40 15z"
          fill="currentColor"
          initial={{ pathLength: 0 }}
          animate={animate ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <motion.circle
          cx="5"
          cy="10"
          r="1"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={animate ? { scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.3 }}
        />
        <motion.circle
          cx="55"
          cy="10"
          r="1"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={animate ? { scale: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.3 }}
        />
      </motion.svg>
    </div>
  );

  const renderSparkle = () => (
    <div className={`flex items-center justify-center ${className}`}>
      <SparklePattern animate={animate} />
    </div>
  );

  const renderCurve = () => (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.svg
        width="100"
        height="20"
        viewBox="0 0 100 20"
        className="text-cinematic-gold"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.path
          d="M10 10 Q30 5 50 10 T90 10"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={animate ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.circle
          cx="10"
          cy="10"
          r="2"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={animate ? { scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.3 }}
        />
        <motion.circle
          cx="90"
          cy="10"
          r="2"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={animate ? { scale: 1 } : {}}
          transition={{ delay: 1, duration: 0.3 }}
        />
      </motion.svg>
    </div>
  );

  switch (type) {
    case "diamond":
      return renderDiamond();
    case "sparkle":
      return renderSparkle();
    case "curve":
      return renderCurve();
    default:
      return renderLine();
  }
}

// Sparkle Pattern Component
function SparklePattern({ animate }: { animate: boolean }) {
  const [sparkles, setSparkles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      delay: i * 0.2,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="relative w-24 h-8">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute w-1 h-1"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={
            animate
              ? {
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  rotate: [0, 180, 360],
                }
              : {}
          }
          transition={{
            duration: 2,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        >
          <svg
            width="4"
            height="4"
            viewBox="0 0 4 4"
            className="text-cinematic-gold"
          >
            <path
              d="M2 0L2.5 1.5L4 2L2.5 2.5L2 4L1.5 2.5L0 2L1.5 1.5z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      ))}

      {/* Central line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={animate ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cinematic-gold to-transparent transform -translate-y-1/2"
      />
    </div>
  );
}

// Foil-style divider for navigation
export function NavDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-px h-6 bg-gradient-to-b from-transparent via-cinematic-gold to-transparent"
      />
    </div>
  );
}

// Sparkle accent for backgrounds
export function BackgroundSparkles() {
  const [sparkles, setSparkles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      duration: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSparkle = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 2 + 2,
        delay: 0,
      };

      setSparkles((prev) => [...prev.slice(-10), newSparkle]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: sparkle.duration,
            ease: "easeInOut",
          }}
          onAnimationComplete={() => {
            setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id));
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 4 4"
            className="text-cinematic-gold/60"
          >
            <path
              d="M2 0L2.5 1.5L4 2L2.5 2.5L2 4L1.5 2.5L0 2L1.5 1.5z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
