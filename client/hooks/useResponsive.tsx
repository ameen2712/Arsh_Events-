import { useState, useEffect } from "react";

interface BreakpointValues {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  "2xl": boolean;
}

interface ViewportInfo {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  orientation: "portrait" | "landscape";
}

/**
 * Hook to track current breakpoints based on Tailwind CSS breakpoints
 */
export const useBreakpoints = (): BreakpointValues => {
  const [breakpoints, setBreakpoints] = useState<BreakpointValues>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    "2xl": false,
  });

  useEffect(() => {
    const checkBreakpoints = () => {
      const width = window.innerWidth;

      setBreakpoints({
        xs: width >= 0,
        sm: width >= 640,
        md: width >= 768,
        lg: width >= 1024,
        xl: width >= 1280,
        "2xl": width >= 1536,
      });
    };

    checkBreakpoints();
    window.addEventListener("resize", checkBreakpoints);

    return () => window.removeEventListener("resize", checkBreakpoints);
  }, []);

  return breakpoints;
};

/**
 * Hook to get viewport information
 */
export const useViewport = (): ViewportInfo => {
  const [viewport, setViewport] = useState<ViewportInfo>({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isTouch: false,
    orientation: "portrait",
  });

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setViewport({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isTouch: "ontouchstart" in window || navigator.maxTouchPoints > 0,
        orientation: width > height ? "landscape" : "portrait",
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    window.addEventListener("orientationchange", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("orientationchange", updateViewport);
    };
  }, []);

  return viewport;
};

/**
 * Hook to check if current viewport matches a specific breakpoint
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatches = () => setMatches(media.matches);

    updateMatches();
    media.addEventListener("change", updateMatches);

    return () => media.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
};

/**
 * Common media queries
 */
export const useCommonQueries = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isLargeScreen = useMediaQuery("(min-width: 1280px)");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isHighDPI = useMediaQuery("(min-resolution: 2dppx)");
  const isLandscape = useMediaQuery("(orientation: landscape)");
  const isPortrait = useMediaQuery("(orientation: portrait)");

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeScreen,
    prefersReducedMotion,
    prefersDarkMode,
    isHighDPI,
    isLandscape,
    isPortrait,
  };
};

/**
 * Hook for touch gestures
 */
export const useTouchGestures = (
  element: React.RefObject<HTMLElement>,
  options: {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
    threshold?: number;
  } = {},
) => {
  const { threshold = 50 } = options;

  useEffect(() => {
    const el = element.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;

      const deltaX = endX - startX;
      const deltaY = endY - startY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > threshold) {
          if (deltaX > 0) {
            options.onSwipeRight?.();
          } else {
            options.onSwipeLeft?.();
          }
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaY) > threshold) {
          if (deltaY > 0) {
            options.onSwipeDown?.();
          } else {
            options.onSwipeUp?.();
          }
        }
      }
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [element, options, threshold]);
};

/**
 * Responsive component that renders different content based on breakpoints
 */
interface ResponsiveProps {
  children: React.ReactNode;
  breakpoint?: "sm" | "md" | "lg" | "xl" | "2xl";
  above?: boolean;
  below?: boolean;
}

export const Responsive: React.FC<ResponsiveProps> = ({
  children,
  breakpoint = "md",
  above = false,
  below = false,
}) => {
  const breakpoints = useBreakpoints();
  const shouldShow = above
    ? breakpoints[breakpoint]
    : below
      ? !breakpoints[breakpoint]
      : breakpoints[breakpoint];

  return shouldShow ? <>{children}</> : null;
};

export default useBreakpoints;
