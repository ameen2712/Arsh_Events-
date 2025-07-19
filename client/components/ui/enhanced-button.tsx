import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  glow?: boolean;
  magnetic?: boolean;
}

const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingText,
      icon,
      iconPosition = "left",
      fullWidth = false,
      glow = false,
      magnetic = false,
      disabled,
      onClick,
      ...props
    },
    ref,
  ) => {
    const baseClasses = cn(
      "relative overflow-hidden font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
      "inline-flex items-center justify-center gap-2",
      {
        // Variants
        "bg-gradient-to-r from-cinematic-purple to-cinematic-gold text-white hover:shadow-lg":
          variant === "primary",
        "bg-card text-card-foreground border border-border hover:bg-accent":
          variant === "secondary",
        "bg-transparent text-card-foreground hover:bg-accent":
          variant === "ghost",
        "glass text-card-foreground hover:bg-white/20": variant === "glass",

        // Sizes
        "px-3 py-1.5 text-sm rounded-lg": size === "sm",
        "px-6 py-3 text-base rounded-xl": size === "md",
        "px-8 py-4 text-lg rounded-2xl": size === "lg",

        // Full width
        "w-full": fullWidth,

        // Glow effect
        "shadow-glow": glow && variant === "primary",
      },
      className,
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || isLoading) return;
      onClick?.(e);
    };

    const content = (
      <>
        {/* Background animation */}
        {variant === "primary" && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cinematic-gold to-cinematic-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
        )}

        {/* Content */}
        <span className="relative flex items-center gap-2">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {loadingText || "Loading..."}
            </>
          ) : (
            <>
              {icon && iconPosition === "left" && icon}
              {children}
              {icon && iconPosition === "right" && icon}
            </>
          )}
        </span>
      </>
    );

    if (magnetic) {
      return (
        <motion.button
          ref={ref}
          className={cn(baseClasses, "group")}
          onClick={handleClick}
          disabled={disabled || isLoading}
          whileHover={{
            scale: 1.05,
            y: -2,
            ...(glow && {
              boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)",
            }),
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          {...props}
        >
          {content}
        </motion.button>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(baseClasses, "group")}
        onClick={handleClick}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  },
);

EnhancedButton.displayName = "EnhancedButton";

export { EnhancedButton };
