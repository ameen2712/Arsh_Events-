import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar, X, Phone, MessageCircle, Mail } from "lucide-react";

interface FloatingActionButtonProps {
  onBooking: () => void;
  onContact: () => void;
  isHidden?: boolean;
}

export default function FloatingActionButton({
  onBooking,
  onContact,
  isHidden = false,
}: FloatingActionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide/show based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsExpanded(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const actionButtons = [
    {
      id: "book",
      label: "Plan My Event",
      icon: Calendar,
      action: onBooking,
      color: "from-pink-500 to-purple-600",
      delay: 0.1,
    },
    {
      id: "call",
      label: "Call Us",
      icon: Phone,
      action: () => window.open("tel:+919876543210"),
      color: "from-green-500 to-emerald-600",
      delay: 0.2,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: MessageCircle,
      action: () => window.open("https://wa.me/919876543210"),
      color: "from-green-400 to-green-600",
      delay: 0.3,
    },
    {
      id: "contact",
      label: "Contact Form",
      icon: Mail,
      action: onContact,
      color: "from-blue-500 to-cyan-600",
      delay: 0.4,
    },
  ];

  // Haptic feedback for supported devices
  const triggerHaptic = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };

  // Sound effect (optional)
  const playClickSound = () => {
    // Web Audio API implementation would go here
    // For now, we'll use a simple approach
    try {
      const audio = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAaBjez3/W3dynTY",
      );
      audio.volume = 0.1;
      audio.play().catch(() => {}); // Silent fail if audio is blocked
    } catch (error) {
      // Silent fail
    }
  };

  const handleMainClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
      triggerHaptic();
      playClickSound();
    }
  };

  const handleActionClick = (action: () => void) => {
    action();
    setIsExpanded(false);
    triggerHaptic();
    playClickSound();
  };

  return (
    <AnimatePresence>
      {isVisible && !isHidden && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Action buttons */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-20 right-0 space-y-3"
              >
                {actionButtons.map((button) => (
                  <motion.div
                    key={button.id}
                    initial={{ opacity: 0, x: 50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 50, scale: 0.8 }}
                    transition={{
                      delay: button.delay,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="flex items-center gap-3"
                  >
                    {/* Label */}
                    <motion.span
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: button.delay + 0.1 }}
                      className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap backdrop-blur-sm"
                    >
                      {button.label}
                    </motion.span>

                    {/* Button */}
                    <motion.button
                      onClick={() => handleActionClick(button.action)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${button.color} text-white shadow-lg flex items-center justify-center`}
                    >
                      <button.icon size={20} />
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB */}
          <motion.button
            onClick={handleMainClick}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isVisible ? 1 : 0,
              opacity: isVisible ? 1 : 0,
              rotate: isExpanded ? 45 : 0,
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 8px 30px rgba(236, 72, 153, 0.4)",
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-white shadow-2xl flex items-center justify-center relative overflow-hidden ${
              isExpanded ? "rotate-45" : ""
            }`}
          >
            {/* Shimmer effect */}
            <motion.div
              animate={{
                x: isExpanded ? "100%" : "-100%",
              }}
              transition={{
                duration: 1.5,
                repeat: isExpanded ? 0 : Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
            />

            {/* Icon */}
            <motion.div
              animate={{ rotate: isExpanded ? -45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isExpanded ? <X size={24} /> : <Calendar size={24} />}
            </motion.div>

            {/* Ripple effect */}
            <motion.div
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{
                scale: isExpanded ? [0, 2, 0] : 0,
                opacity: isExpanded ? [0.5, 0, 0] : 0,
              }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-white rounded-full"
            />
          </motion.button>

          {/* Tooltip */}
          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 2 }}
                className="absolute bottom-5 right-20 bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap backdrop-blur-sm pointer-events-none"
              >
                Plan My Event
                <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-black/80 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulsing ring */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 w-16 h-16 rounded-full border-2 border-pink-400 pointer-events-none"
          />
        </div>
      )}
    </AnimatePresence>
  );
}
