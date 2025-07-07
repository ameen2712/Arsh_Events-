import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ContextPattern {
  wedding: string;
  corporate: string;
  birthday: string;
  engagement: string;
  default: string;
}

const contextPatterns: ContextPattern = {
  wedding: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFB6C1' fill-opacity='0.05'%3E%3Cpath d='M30 30c0-8.284 6.716-15 15-15s15 6.716 15 15-6.716 15-15 15-15-6.716-15-15zm-15 0c0-8.284 6.716-15 15-15s15 6.716 15 15-6.716 15-15 15-15-6.716-15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  corporate: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234169E1' fill-opacity='0.05'%3E%3Cpath d='M20 20h20v20H20z M0 0h20v20H0z M40 0h20v20H40z M0 40h20v20H0z M40 40h20v20H40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  birthday: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF69B4' fill-opacity='0.05'%3E%3Cpath d='M30 0L35 20L30 40L25 20z M0 30L20 35L40 30L20 25z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  engagement: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.05'%3E%3Cpath d='M30 10L35 25L50 30L35 35L30 50L25 35L10 30L25 25z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  default: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
};

const contextColors: ContextPattern = {
  wedding: "from-pink-400/10 to-rose-400/10",
  corporate: "from-blue-400/10 to-indigo-400/10",
  birthday: "from-purple-400/10 to-pink-400/10",
  engagement: "from-yellow-400/10 to-amber-400/10",
  default: "from-cinematic-purple/10 to-cinematic-gold/10",
};

interface ContextAwareNavProps {
  children: React.ReactNode;
  className?: string;
}

export default function ContextAwareNav({
  children,
  className = "",
}: ContextAwareNavProps) {
  const [currentContext, setCurrentContext] =
    useState<keyof ContextPattern>("default");

  useEffect(() => {
    // Detect context from current page/section
    const detectContext = () => {
      const url = window.location.href.toLowerCase();
      const body = document.body;

      // Check URL parameters or hash
      if (url.includes("wedding") || url.includes("#wedding")) {
        setCurrentContext("wedding");
        body.setAttribute("data-page", "wedding");
      } else if (url.includes("corporate") || url.includes("#corporate")) {
        setCurrentContext("corporate");
        body.setAttribute("data-page", "corporate");
      } else if (url.includes("birthday") || url.includes("#birthday")) {
        setCurrentContext("birthday");
        body.setAttribute("data-page", "birthday");
      } else if (url.includes("engagement") || url.includes("#engagement")) {
        setCurrentContext("engagement");
        body.setAttribute("data-page", "engagement");
      } else {
        setCurrentContext("default");
        body.setAttribute("data-page", "default");
      }
    };

    // Intersection Observer to detect visible sections
    const observerOptions = {
      threshold: 0.5,
      rootMargin: "-20% 0px -20% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (
            sectionId === "wedding" ||
            entry.target.getAttribute("data-context") === "wedding"
          ) {
            setCurrentContext("wedding");
          } else if (
            sectionId === "corporate" ||
            entry.target.getAttribute("data-context") === "corporate"
          ) {
            setCurrentContext("corporate");
          } else if (
            sectionId === "birthday" ||
            entry.target.getAttribute("data-context") === "birthday"
          ) {
            setCurrentContext("birthday");
          } else if (
            sectionId === "engagement" ||
            entry.target.getAttribute("data-context") === "engagement"
          ) {
            setCurrentContext("engagement");
          }
        }
      });
    }, observerOptions);

    // Observe sections with context data
    const contextSections = document.querySelectorAll(
      "[data-context], #wedding, #corporate, #birthday, #engagement",
    );
    contextSections.forEach((section) => observer.observe(section));

    // Initial detection
    detectContext();

    // Listen for hash changes
    window.addEventListener("hashchange", detectContext);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", detectContext);
    };
  }, []);

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        backgroundImage: contextPatterns[currentContext],
      }}
      animate={{
        backgroundImage: contextPatterns[currentContext],
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Context-aware gradient overlay */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${contextColors[currentContext]} pointer-events-none`}
        animate={{
          background: `linear-gradient(to right, var(--tw-gradient-stops))`,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Floating context indicators */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {currentContext === "wedding" && (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0, 1, 0],
                  y: [100, -100],
                  x: [0, 50, -30],
                }}
                transition={{
                  duration: 8,
                  delay: i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute text-pink-300/20 text-2xl"
                style={{
                  left: `${20 + i * 30}%`,
                  bottom: "0%",
                }}
              >
                💖
              </motion.div>
            ))}
          </>
        )}

        {currentContext === "corporate" && (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={`corp-${i}`}
                initial={{ opacity: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 0.2, 0],
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 6,
                  delay: i * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-8 h-8 border-2 border-blue-300/20"
                style={{
                  left: `${10 + i * 25}%`,
                  top: `${20 + i * 15}%`,
                }}
              />
            ))}
          </>
        )}

        {currentContext === "birthday" && (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={`party-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.4, 0],
                  scale: [0, 1.5, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute text-purple-300/30 text-xl"
                style={{
                  left: `${10 + i * 20}%`,
                  top: `${30 + Math.sin(i) * 20}%`,
                }}
              >
                🎉
              </motion.div>
            ))}
          </>
        )}

        {currentContext === "engagement" && (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`ring-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 5,
                  delay: i * 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute text-yellow-300/25 text-lg"
                style={{
                  left: `${25 + i * 25}%`,
                  top: `${40 + i * 10}%`,
                }}
              >
                💍
              </motion.div>
            ))}
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Context transition effect */}
      <motion.div
        key={currentContext}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.05, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${
            currentContext === "wedding"
              ? "rgba(255, 182, 193, 0.1)"
              : currentContext === "corporate"
                ? "rgba(65, 105, 225, 0.1)"
                : currentContext === "birthday"
                  ? "rgba(255, 105, 180, 0.1)"
                  : currentContext === "engagement"
                    ? "rgba(255, 215, 0, 0.1)"
                    : "rgba(139, 92, 246, 0.1)"
          }, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

// Hook to use current context in other components
export function useCurrentContext() {
  const [currentContext, setCurrentContext] =
    useState<keyof ContextPattern>("default");

  useEffect(() => {
    const handleContextChange = () => {
      const body = document.body;
      const page = body.getAttribute("data-page") as keyof ContextPattern;
      setCurrentContext(page || "default");
    };

    // Initial check
    handleContextChange();

    // Listen for changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-page"
        ) {
          handleContextChange();
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-page"],
    });

    return () => observer.disconnect();
  }, []);

  return currentContext;
}
