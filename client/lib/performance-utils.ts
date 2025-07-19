/**
 * Performance optimization utilities for better user experience
 */

/**
 * Lazy load images with intersection observer
 */
export const lazyLoadImage = (
  img: HTMLImageElement,
  src: string,
  placeholder?: string,
): void => {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target as HTMLImageElement;
            image.src = src;
            image.classList.remove("lazy");
            observer.unobserve(image);
          }
        });
      },
      { threshold: 0.1 },
    );

    img.src =
      placeholder ||
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E";
    img.classList.add("lazy");
    observer.observe(img);
  } else {
    // Fallback for older browsers
    img.src = src;
  }
};

/**
 * Preload critical resources
 */
export const preloadResource = (
  url: string,
  type: "image" | "font" | "script" | "style" | "fetch" = "fetch",
): void => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = url;
  link.as = type;

  if (type === "font") {
    link.crossOrigin = "anonymous";
  }

  document.head.appendChild(link);
};

/**
 * Preload multiple resources
 */
export const preloadResources = (
  resources: Array<{
    url: string;
    type?: "image" | "font" | "script" | "style" | "fetch";
  }>,
): void => {
  resources.forEach(({ url, type = "fetch" }) => {
    preloadResource(url, type);
  });
};

/**
 * Debounce function for expensive operations
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false,
): T => {
  let timeout: NodeJS.Timeout | null = null;

  return ((...args: Parameters<T>) => {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func(...args);
  }) as T;
};

/**
 * Throttle function for scroll events
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): T => {
  let inThrottle: boolean;

  return ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
};

/**
 * Request idle callback wrapper with fallback
 */
export const requestIdleCallback = (
  callback: IdleRequestCallback,
  options?: IdleRequestOptions,
): number => {
  if ("requestIdleCallback" in window) {
    return window.requestIdleCallback(callback, options);
  } else {
    // Fallback for Safari and older browsers
    return setTimeout(() => {
      const start = Date.now();
      callback({
        didTimeout: false,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
      });
    }, 1) as unknown as number;
  }
};

/**
 * Cancel idle callback with fallback
 */
export const cancelIdleCallback = (id: number): void => {
  if ("cancelIdleCallback" in window) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
};

/**
 * Web Worker utilities for offloading heavy computations
 */
export const createWorker = (
  workerFunction: (...args: any[]) => any,
): Worker => {
  const blob = new Blob(
    [
      `
    self.onmessage = function(e) {
      const result = (${workerFunction.toString()})(...e.data);
      self.postMessage(result);
    }
  `,
    ],
    { type: "application/javascript" },
  );

  return new Worker(URL.createObjectURL(blob));
};

/**
 * Memory management utilities
 */
export const cleanupMemory = (): void => {
  // Force garbage collection in development
  if (process.env.NODE_ENV === "development" && "gc" in window) {
    (window as any).gc();
  }

  // Clear unused resources
  const unusedImages = document.querySelectorAll('img[src=""], img:not([src])');
  unusedImages.forEach((img) => img.remove());
};

/**
 * Bundle size analyzer
 */
export const analyzeBundleSize = (): void => {
  if (process.env.NODE_ENV === "development") {
    console.log("Bundle Analysis:");
    console.log("Scripts:", document.scripts.length);
    console.log("Stylesheets:", document.styleSheets.length);
    console.log("Images:", document.images.length);

    // Performance metrics
    if ("performance" in window) {
      const navigation = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming;
      console.log("Performance Metrics:", {
        domContentLoaded: navigation.domContentLoadedEventEnd,
        loadComplete: navigation.loadEventEnd,
        firstPaint: performance.getEntriesByName("first-paint")[0]?.startTime,
        firstContentfulPaint: performance.getEntriesByName(
          "first-contentful-paint",
        )[0]?.startTime,
      });
    }
  }
};

/**
 * Image optimization utilities
 */
export const optimizeImage = (
  src: string,
  width?: number,
  height?: number,
  format: "webp" | "avif" | "jpg" | "png" = "webp",
): string => {
  // If using a service like Cloudinary or Imagekit
  if (src.includes("unsplash.com")) {
    const url = new URL(src);
    if (width) url.searchParams.set("w", width.toString());
    if (height) url.searchParams.set("h", height.toString());
    url.searchParams.set("fit", "crop");
    url.searchParams.set("crop", "center");
    if (format === "webp") url.searchParams.set("fm", "webp");
    return url.toString();
  }

  return src;
};

/**
 * Generate responsive image sources
 */
export const generateResponsiveImages = (
  baseSrc: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1536],
): Array<{ src: string; width: number; media?: string }> => {
  return sizes.map((width) => ({
    src: optimizeImage(baseSrc, width),
    width,
    media: `(max-width: ${width}px)`,
  }));
};

/**
 * Critical resource hints
 */
export const addResourceHints = (): void => {
  const hints = [
    { rel: "dns-prefetch", href: "//fonts.googleapis.com" },
    { rel: "dns-prefetch", href: "//images.unsplash.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true },
  ];

  hints.forEach(({ rel, href, crossorigin }) => {
    const link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    if (crossorigin) link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });
};

/**
 * Service Worker registration for caching
 */
export const registerServiceWorker = (): void => {
  if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }
};

/**
 * Prefetch next route or resource
 */
export const prefetchRoute = (path: string): void => {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = path;
  document.head.appendChild(link);
};

/**
 * Monitor performance metrics
 */
export const monitorPerformance = (): void => {
  if ("performance" in window) {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === "measure") {
          console.log(`${entry.name}: ${entry.duration}ms`);
        }
      });
    });

    observer.observe({ entryTypes: ["measure", "navigation", "paint"] });

    // Monitor LCP (Largest Contentful Paint)
    if ("LargestContentfulPaint" in window) {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log("LCP:", lastEntry.startTime);
      }).observe({ type: "largest-contentful-paint", buffered: true });
    }

    // Monitor FID (First Input Delay)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        console.log("FID:", entry.processingStart - entry.startTime);
      });
    }).observe({ type: "first-input", buffered: true });

    // Monitor CLS (Cumulative Layout Shift)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log("CLS:", clsValue);
    }).observe({ type: "layout-shift", buffered: true });
  }
};

/**
 * Code splitting utilities
 */
export const dynamicImport = <T>(importFn: () => Promise<T>): Promise<T> => {
  return importFn().catch((error) => {
    console.error("Dynamic import failed:", error);
    throw error;
  });
};

/**
 * Component lazy loading with error boundary
 */
export const lazyComponent = <T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ComponentType,
): React.LazyExoticComponent<T> => {
  return React.lazy(() =>
    importFn().catch((error) => {
      console.error("Component lazy loading failed:", error);
      // Return fallback component or rethrow
      if (fallback) {
        return { default: fallback as T };
      }
      throw error;
    }),
  );
};

/**
 * Initialize performance optimizations
 */
export const initializePerformanceOptimizations = (): void => {
  // Add resource hints
  addResourceHints();

  // Register service worker
  registerServiceWorker();

  // Monitor performance
  if (process.env.NODE_ENV === "development") {
    monitorPerformance();
    analyzeBundleSize();
  }

  // Cleanup on page unload
  window.addEventListener("beforeunload", cleanupMemory);
};

/**
 * React import placeholder for TypeScript
 */
declare const React: any;
