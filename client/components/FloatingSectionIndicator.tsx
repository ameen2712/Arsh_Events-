import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { scrollToSection } from "@/lib/scroll-utils";

interface Section {
  id: string;
  title: string;
  icon?: React.ReactNode;
}

interface FloatingSectionIndicatorProps {
  sections: Section[];
  activeSection: string;
  className?: string;
  position?: "left" | "right";
  showOnlyOnScroll?: boolean;
}

export const FloatingSectionIndicator: React.FC<
  FloatingSectionIndicatorProps
> = ({
  sections,
  activeSection,
  className = "",
  position = "right",
  showOnlyOnScroll = true,
}) => {
  const [isVisible, setIsVisible] = useState(!showOnlyOnScroll);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!showOnlyOnScroll) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 200); // Show after scrolling 200px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showOnlyOnScroll]);

  const handleSectionClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsExpanded(false);
  };

  const positionClasses = {
    left: "left-6",
    right: "right-6",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: position === "right" ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: position === "right" ? 100 : -100 }}
          className={`fixed top-1/2 -translate-y-1/2 z-40 ${positionClasses[position]} ${className}`}
        >
          <div
            className="relative"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
          >
            {/* Main Indicator */}
            <motion.div
              className="bg-background/90 backdrop-blur-md border border-border rounded-full p-2 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              {/* Active Section Dot */}
              <div className="relative w-3 h-3 bg-primary rounded-full">
                <motion.div
                  className="absolute inset-0 bg-primary rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>

            {/* Expanded Menu */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    x: position === "right" ? 20 : -20,
                  }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    x: position === "right" ? 20 : -20,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`absolute top-0 ${
                    position === "right" ? "right-full mr-4" : "left-full ml-4"
                  } min-w-[200px]`}
                >
                  <div className="bg-background/95 backdrop-blur-md border border-border rounded-xl p-2 shadow-xl">
                    {sections.map((section, index) => {
                      const isActive = section.id === activeSection;

                      return (
                        <motion.button
                          key={section.id}
                          onClick={() => handleSectionClick(section.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Section Indicator */}
                          <div
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              isActive ? "bg-primary-foreground" : "bg-border"
                            }`}
                          />

                          {/* Section Title */}
                          <span className="font-medium">{section.title}</span>

                          {/* Icon (if provided) */}
                          {section.icon && (
                            <div className="ml-auto opacity-70">
                              {section.icon}
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface TableOfContentsProps {
  sections: Section[];
  activeSection: string;
  className?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  sections,
  activeSection,
  className = "",
}) => {
  return (
    <nav className={`space-y-2 ${className}`} aria-label="Table of contents">
      <h3 className="text-sm font-semibold text-foreground mb-3">
        On this page
      </h3>

      <ul className="space-y-1">
        {sections.map((section, index) => {
          const isActive = section.id === activeSection;

          return (
            <motion.li
              key={section.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary border-l-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                aria-current={isActive ? "location" : undefined}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? "bg-primary" : "bg-border"
                    }`}
                  />
                  <span>{section.title}</span>
                </div>
              </button>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
};

export default FloatingSectionIndicator;
