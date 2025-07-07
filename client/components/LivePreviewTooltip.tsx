import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface PreviewData {
  id: string;
  title: string;
  image: string;
  description: string;
  price?: string;
  rating?: number;
}

interface LivePreviewTooltipProps {
  children: React.ReactNode;
  previewData: PreviewData;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

const themePreviewData: Record<string, PreviewData> = {
  luxury: {
    id: "luxury",
    title: "Luxury Royal Theme",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=200&fit=crop",
    description: "Opulent gold and burgundy décor with crystal chandeliers",
    price: "₹2,50,000+",
    rating: 4.9,
  },
  vintage: {
    id: "vintage",
    title: "Vintage Rustic Theme",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300&h=200&fit=crop",
    description: "Charming rustic elements with vintage accents",
    price: "₹1,80,000+",
    rating: 4.7,
  },
  modern: {
    id: "modern",
    title: "Contemporary Modern",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&h=200&fit=crop",
    description: "Sleek minimalist design with bold geometric patterns",
    price: "₹2,00,000+",
    rating: 4.8,
  },
  garden: {
    id: "garden",
    title: "Garden Paradise",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=200&fit=crop",
    description: "Lush greenery with natural floral arrangements",
    price: "₹1,60,000+",
    rating: 4.6,
  },
  beach: {
    id: "beach",
    title: "Coastal Elegance",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=200&fit=crop",
    description: "Ocean-inspired blues with sandy neutral tones",
    price: "₹2,20,000+",
    rating: 4.8,
  },
};

export default function LivePreviewTooltip({
  children,
  previewData,
  position = "top",
  delay = 500,
}: LivePreviewTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getTooltipPosition = () => {
    const offset = 20;
    switch (position) {
      case "bottom":
        return {
          x: mousePosition.x - 150,
          y: mousePosition.y + offset,
        };
      case "left":
        return {
          x: mousePosition.x - 320 - offset,
          y: mousePosition.y - 100,
        };
      case "right":
        return {
          x: mousePosition.x + offset,
          y: mousePosition.y - 100,
        };
      default: // top
        return {
          x: mousePosition.x - 150,
          y: mousePosition.y - 220 - offset,
        };
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="relative"
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: getTooltipPosition().x,
              top: getTooltipPosition().y,
            }}
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-w-xs">
              {/* Image */}
              <div className="relative overflow-hidden">
                <motion.img
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={previewData.image}
                  alt={previewData.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Rating */}
                {previewData.rating && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                  >
                    ⭐ {previewData.rating}
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-semibold text-gray-900 mb-2"
                >
                  {previewData.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-sm text-gray-600 mb-3 leading-relaxed"
                >
                  {previewData.description}
                </motion.p>

                {/* Price */}
                {previewData.price && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-lg font-bold text-cinematic-purple">
                      {previewData.price}
                    </span>
                    <span className="text-xs text-gray-500">Starting from</span>
                  </motion.div>
                )}

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
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 pointer-events-none"
                />
              </div>
            </div>

            {/* Tooltip Arrow */}
            <div
              className={`absolute w-3 h-3 bg-white/95 border border-gray-200 transform rotate-45 ${
                position === "top"
                  ? "bottom-[-6px] left-1/2 -translate-x-1/2"
                  : position === "bottom"
                    ? "top-[-6px] left-1/2 -translate-x-1/2"
                    : position === "left"
                      ? "right-[-6px] top-1/2 -translate-y-1/2"
                      : "left-[-6px] top-1/2 -translate-y-1/2"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Enhanced dropdown with live previews
export function EnhancedDropdown({
  trigger,
  items,
  onSelect,
}: {
  trigger: React.ReactNode;
  items: Array<{ id: string; label: string; previewKey?: string }>;
  onSelect: (item: any) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 min-w-64"
          >
            {items.map((item, index) => (
              <div key={item.id}>
                {item.previewKey ? (
                  <LivePreviewTooltip
                    previewData={themePreviewData[item.previewKey]}
                    position="right"
                  >
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        onSelect(item);
                        setIsOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      {item.label}
                    </motion.button>
                  </LivePreviewTooltip>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      onSelect(item);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    {item.label}
                  </motion.button>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Export theme data for use in other components
export { themePreviewData };
