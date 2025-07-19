import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface EnhancedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
  overlayClassName?: string;
  headerClassName?: string;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  preventScroll?: boolean;
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-7xl",
};

export const EnhancedModal: React.FC<EnhancedModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  subtitle,
  size = "md",
  showBackButton = false,
  onBack,
  className = "",
  overlayClassName = "",
  headerClassName = "",
  closeOnOverlayClick = true,
  showCloseButton = true,
  preventScroll = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Handle body scroll
  useEffect(() => {
    if (preventScroll) {
      const originalStyle = window.getComputedStyle(document.body).overflow;

      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = originalStyle;
      }

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen, preventScroll]);

  // Focus management
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0] as HTMLElement;
      if (firstElement) {
        firstElement.focus();
      }
    }
  }, [isOpen]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center p-4",
            "bg-black/60 backdrop-blur-sm",
            overlayClassName,
          )}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
        >
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className={cn(
              "relative w-full bg-background rounded-2xl shadow-2xl overflow-hidden",
              "border border-border",
              sizeClasses[size],
              className,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || showBackButton || showCloseButton) && (
              <div
                className={cn(
                  "flex items-center justify-between px-6 py-4 border-b border-border",
                  "bg-gradient-to-r from-background to-muted/20",
                  headerClassName,
                )}
              >
                <div className="flex items-center gap-4">
                  {showBackButton && onBack && (
                    <button
                      onClick={onBack}
                      className="p-2 rounded-full hover:bg-muted transition-colors"
                      aria-label="Go back"
                    >
                      <ArrowLeft size={20} />
                    </button>
                  )}

                  {title && (
                    <div>
                      <h2
                        id="modal-title"
                        className="text-xl font-semibold text-foreground"
                      >
                        {title}
                      </h2>
                      {subtitle && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {subtitle}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="relative">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Modal content sections
export const ModalHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div className={cn("px-6 py-4 border-b border-border", className)}>
    {children}
  </div>
);

export const ModalBody: React.FC<{
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
}> = ({ children, className = "", maxHeight = "70vh" }) => (
  <div
    className={cn("px-6 py-4 overflow-y-auto", className)}
    style={{ maxHeight }}
  >
    {children}
  </div>
);

export const ModalFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div
    className={cn(
      "px-6 py-4 border-t border-border bg-muted/20 flex items-center justify-end gap-3",
      className,
    )}
  >
    {children}
  </div>
);

// Progress indicator for multi-step modals
export const ModalProgress: React.FC<{
  currentStep: number;
  totalSteps: number;
  className?: string;
}> = ({ currentStep, totalSteps, className = "" }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("px-6 py-2 border-b border-border", className)}>
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <motion.div
          className="bg-primary rounded-full h-2"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

// Loading state for modals
export const ModalLoading: React.FC<{
  message?: string;
  className?: string;
}> = ({ message = "Loading...", className = "" }) => (
  <div
    className={cn("flex flex-col items-center justify-center py-12", className)}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mb-4"
    />
    <p className="text-muted-foreground">{message}</p>
  </div>
);

// Success state for modals
export const ModalSuccess: React.FC<{
  title?: string;
  message?: string;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
}> = ({
  title = "Success!",
  message,
  onAction,
  actionLabel = "Continue",
  className = "",
}) => (
  <div
    className={cn("flex flex-col items-center justify-center py-12", className)}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
    >
      <motion.svg
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-8 h-8 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <motion.path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </motion.svg>
    </motion.div>

    <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
    {message && (
      <p className="text-muted-foreground text-center mb-6">{message}</p>
    )}

    {onAction && (
      <button
        onClick={onAction}
        className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
      >
        {actionLabel}
      </button>
    )}
  </div>
);
