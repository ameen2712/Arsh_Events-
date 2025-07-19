import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface ScrollProgressIndicatorProps {
  className?: string;
  height?: number;
  color?: string;
  showPercentage?: boolean;
}

export const ScrollProgressIndicator: React.FC<
  ScrollProgressIndicatorProps
> = ({
  className = "",
  height = 3,
  color = "hsl(var(--primary))",
  showPercentage = false,
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setProgress(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <motion.div
        style={{
          scaleX,
          backgroundColor: color,
          height: `${height}px`,
          transformOrigin: "0%",
        }}
        className="w-full"
      />

      {showPercentage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollYProgress.get() > 0.01 ? 1 : 0 }}
          className="absolute top-2 right-4 text-xs font-medium text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded"
        >
          {progress}%
        </motion.div>
      )}
    </div>
  );
};

interface SectionProgressProps {
  sections: { id: string; title: string }[];
  activeSection: string;
  className?: string;
}

export const SectionProgress: React.FC<SectionProgressProps> = ({
  sections,
  activeSection,
  className = "",
}) => {
  const currentIndex = sections.findIndex(
    (section) => section.id === activeSection,
  );
  const progress =
    sections.length > 0 ? ((currentIndex + 1) / sections.length) * 100 : 0;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={`flex items-center gap-2 ${
            index < sections.length - 1
              ? "after:w-8 after:h-0.5 after:bg-border after:ml-2"
              : ""
          }`}
        >
          <motion.div
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index <= currentIndex ? "bg-primary" : "bg-border"
            }`}
            animate={{
              scale: section.id === activeSection ? 1.3 : 1,
            }}
            transition={{ duration: 0.2 }}
          />

          {section.id === activeSection && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-xs font-medium text-primary"
            >
              {section.title}
            </motion.span>
          )}
        </div>
      ))}
    </div>
  );
};

interface ReadingProgressProps {
  target?: React.RefObject<HTMLElement>;
  className?: string;
}

export const ReadingProgress: React.FC<ReadingProgressProps> = ({
  target,
  className = "",
}) => {
  const { scrollYProgress } = useScroll({
    target: target?.current || undefined,
    offset: ["start end", "end start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className={`h-1 bg-gradient-to-r from-primary to-primary/60 origin-left ${className}`}
    />
  );
};

export default ScrollProgressIndicator;
