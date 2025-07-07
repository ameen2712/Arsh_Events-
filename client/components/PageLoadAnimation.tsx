import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AnimatedLogo from "./AnimatedLogo";

interface PageLoadAnimationProps {
  onComplete: () => void;
  showLoader?: boolean;
}

export default function PageLoadAnimation({
  onComplete,
  showLoader = true,
}: PageLoadAnimationProps) {
  const [loadingStage, setLoadingStage] = useState<
    "initial" | "logo" | "complete"
  >("initial");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!showLoader) {
      onComplete();
      return;
    }

    const sequence = async () => {
      // Stage 1: Initial delay and progress
      setLoadingStage("initial");

      // Simulate loading progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 100);

      // Stage 2: Show logo animation
      setTimeout(() => {
        setLoadingStage("logo");
      }, 800);

      // Stage 3: Complete
      setTimeout(() => {
        setLoadingStage("complete");
        clearInterval(progressInterval);
        setProgress(100);
      }, 2000);

      // Finish and call onComplete
      setTimeout(() => {
        onComplete();
      }, 3000);
    };

    sequence();
  }, [onComplete, showLoader]);

  // Sound effect function
  const playLoadSound = () => {
    try {
      // Simple tone generation for load complete
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.2,
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      // Silent fail if Web Audio API is not supported
    }
  };

  useEffect(() => {
    if (loadingStage === "complete") {
      playLoadSound();
    }
  }, [loadingStage]);

  if (!showLoader) return null;

  return (
    <AnimatePresence>
      {loadingStage !== "complete" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-cinematic-midnight via-cinematic-purple to-cinematic-gold"
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                }}
                animate={{
                  y: [null, -100],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute w-1 h-1 bg-cinematic-gold rounded-full"
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={
                loadingStage === "logo"
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0, opacity: 0 }
              }
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-4">
                <AnimatedLogo size="lg" autoAnimate={true} />
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={
                    loadingStage === "logo"
                      ? { x: 0, opacity: 1 }
                      : { x: -50, opacity: 0 }
                  }
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <h1 className="text-4xl font-heading font-bold text-white mb-2">
                    Arsh Events
                  </h1>
                  <p className="text-cinematic-gold font-signature">
                    Legendary Celebrations
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-8"
            >
              <motion.h2
                key={loadingStage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl text-white/80 mb-2"
              >
                {loadingStage === "initial"
                  ? "Preparing your magical experience..."
                  : loadingStage === "logo"
                    ? "Crafting extraordinary moments..."
                    : "Welcome to Arsh Events!"}
              </motion.h2>

              {/* Loading dots animation */}
              <div className="flex justify-center gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-2 h-2 bg-cinematic-gold rounded-full"
                  />
                ))}
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="w-64 mx-auto"
            >
              <div className="relative">
                {/* Background */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  {/* Progress fill */}
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-cinematic-gold to-cinematic-rose rounded-full relative"
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                  </motion.div>
                </div>

                {/* Progress text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-2 text-center"
                >
                  <span className="text-sm text-white/60">
                    {Math.round(progress)}%
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    rotate: [0, 180],
                  }}
                  transition={{
                    duration: 2,
                    delay: 1 + i * 0.3,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "easeInOut",
                  }}
                  className="absolute text-cinematic-gold/60"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + Math.sin(i) * 20}%`,
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>
          </div>

          {/* Completion animation */}
          {loadingStage === "complete" && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: [1, 2, 0],
                  opacity: [1, 0.8, 0],
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-32 h-32 border-4 border-cinematic-gold rounded-full"
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Entrance animation for navbar tiers
export function NavbarEntranceAnimation({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      }}
    >
      {children}
    </motion.div>
  );
}

// Staggered entrance for navbar items
export function NavItemEntrance({
  children,
  index = 0,
}: {
  children: React.ReactNode;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.5 + index * 0.1,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
