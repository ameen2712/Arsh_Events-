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
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Gold particles */}
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerWidth : 1200),
                  y:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerHeight : 800),
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  y: [null, -200],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              />
            ))}

            {/* Floating orbs */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={`orb-${i}`}
                initial={{
                  x:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerWidth : 1200),
                  y:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerHeight : 800),
                  opacity: 0,
                }}
                animate={{
                  x: [
                    null,
                    Math.random() *
                      (typeof window !== "undefined"
                        ? window.innerWidth
                        : 1200),
                  ],
                  y: [
                    null,
                    Math.random() *
                      (typeof window !== "undefined"
                        ? window.innerHeight
                        : 800),
                  ],
                  opacity: [0, 0.3, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 8,
                  delay: i * 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full blur-xl"
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
            {/* Enhanced Logo Section */}
            <motion.div
              initial={{ scale: 0, opacity: 0, rotateY: -180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-12"
            >
              <div className="relative">
                {/* Logo with glow effect */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(250, 204, 21, 0.3)",
                      "0 0 40px rgba(250, 204, 21, 0.6)",
                      "0 0 20px rgba(250, 204, 21, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 relative overflow-hidden"
                >
                  <span
                    className="text-black font-black text-4xl"
                    style={{ fontFamily: "Cinzel Decorative, serif" }}
                  >
                    A
                  </span>

                  {/* Shimmer effect */}
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 1,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12"
                  />
                </motion.div>

                {/* Brand info */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <h1
                    className="text-5xl font-bold text-white mb-3"
                    style={{ fontFamily: "Cinzel Decorative, serif" }}
                  >
                    Arsh Events
                  </h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-xl text-yellow-400 font-signature mb-2"
                  >
                    Legendary Celebrations
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="text-white/70 text-sm"
                  >
                    Creating magical moments across Andhra Pradesh
                  </motion.p>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-yellow-400"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-yellow-400"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-yellow-400"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-yellow-400"></div>
              </div>
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mb-8"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl text-white font-semibold mb-4"
              >
                Preparing your magical experience...
              </motion.h2>

              {/* Enhanced loading dots */}
              <div className="flex justify-center gap-2 mb-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.4, 0.8],
                      backgroundColor: [
                        "rgba(250, 204, 21, 0.5)",
                        "rgba(250, 204, 21, 1)",
                        "rgba(250, 204, 21, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-3 h-3 bg-yellow-400 rounded-full"
                  />
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="text-white/60 text-sm"
              >
                Crafting extraordinary moments just for you
              </motion.p>
            </motion.div>

            {/* Enhanced Progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="w-80 mx-auto"
            >
              <div className="relative">
                {/* Progress label */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-white/80">
                    Loading Experience
                  </span>
                  <motion.span
                    key={progress}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-lg font-bold text-yellow-400"
                  >
                    {Math.round(progress)}%
                  </motion.span>
                </div>

                {/* Progress track */}
                <div className="relative">
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                    {/* Progress fill */}
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full relative"
                    >
                      {/* Multiple shimmer effects */}
                      <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      />

                      {/* Glow effect */}
                      <motion.div
                        animate={{
                          boxShadow: [
                            "0 0 10px rgba(250, 204, 21, 0.5)",
                            "0 0 20px rgba(250, 204, 21, 0.8)",
                            "0 0 10px rgba(250, 204, 21, 0.5)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-full"
                      />
                    </motion.div>
                  </div>

                  {/* Progress indicator dot */}
                  <motion.div
                    style={{ left: `${progress}%` }}
                    className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow-lg"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-full h-full bg-yellow-400 rounded-full"
                    />
                  </motion.div>
                </div>
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
