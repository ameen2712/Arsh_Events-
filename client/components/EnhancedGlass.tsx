import { motion } from "framer-motion";
import { ReactNode } from "react";

interface EnhancedGlassProps {
  children: ReactNode;
  variant?: "subtle" | "medium" | "strong" | "luxury";
  shape?: "rounded" | "card" | "pill" | "custom";
  glow?: boolean;
  shimmer?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function EnhancedGlass({
  children,
  variant = "medium",
  shape = "rounded",
  glow = false,
  shimmer = false,
  className = "",
  onClick,
}: EnhancedGlassProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "subtle":
        return {
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(8px) saturate(120%)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow:
            "inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 4px 20px rgba(0, 0, 0, 0.1)",
        };
      case "strong":
        return {
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow:
            "inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 8px 40px rgba(0, 0, 0, 0.15)",
        };
      case "luxury":
        return {
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))",
          backdropFilter: "blur(16px) saturate(160%)",
          border: "1px solid rgba(255, 215, 0, 0.3)",
          boxShadow:
            "inset 0 1px 1px rgba(255, 215, 0, 0.2), 0 8px 32px rgba(255, 215, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.1)",
        };
      default: // medium
        return {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px) saturate(150%)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow:
            "inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 6px 30px rgba(0, 0, 0, 0.12)",
        };
    }
  };

  const getShapeStyles = () => {
    switch (shape) {
      case "card":
        return "rounded-2xl";
      case "pill":
        return "rounded-full";
      case "custom":
        return "";
      default:
        return "rounded-xl";
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <motion.div
      onClick={onClick}
      whileHover={
        onClick
          ? {
              scale: 1.02,
              boxShadow: glow
                ? `${variantStyles.boxShadow}, 0 0 40px rgba(255, 215, 0, 0.2)`
                : variantStyles.boxShadow,
            }
          : {}
      }
      whileTap={onClick ? { scale: 0.98 } : {}}
      className={`relative overflow-hidden ${getShapeStyles()} ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      style={variantStyles}
    >
      {/* Shimmer effect */}
      {shimmer && (
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 3,
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 pointer-events-none"
        />
      )}

      {/* Inner border highlight */}
      <div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)",
        }}
      />

      {/* Glow effect */}
      {glow && (
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-inherit pointer-events-none"
          style={{
            boxShadow: "0 0 30px rgba(255, 215, 0, 0.3)",
            filter: "blur(1px)",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Noise texture for luxury variant */}
      {variant === "luxury" && (
        <div
          className="absolute inset-0 rounded-inherit pointer-events-none opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
    </motion.div>
  );
}

// Specialized glass components
export function GlassDropdown({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <EnhancedGlass
      variant="strong"
      shape="card"
      shimmer
      className={`border border-white/30 shadow-2xl ${className}`}
    >
      {children}
    </EnhancedGlass>
  );
}

export function GlassCard({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <EnhancedGlass
      variant="medium"
      shape="card"
      glow
      shimmer
      onClick={onClick}
      className={className}
    >
      {children}
    </EnhancedGlass>
  );
}

export function LuxuryGlass({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <EnhancedGlass
      variant="luxury"
      shape="card"
      glow
      shimmer
      className={className}
    >
      {children}
    </EnhancedGlass>
  );
}
