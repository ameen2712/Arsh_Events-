/**
 * Smooth scroll utilities for section navigation and enhanced UX
 */

export interface ScrollOptions {
  behavior?: "smooth" | "instant" | "auto";
  block?: "start" | "center" | "end" | "nearest";
  inline?: "start" | "center" | "end" | "nearest";
  offset?: number;
}

/**
 * Smoothly scroll to a specific element by ID or selector
 */
export const scrollToElement = (
  selector: string,
  options: ScrollOptions = {},
): Promise<void> => {
  return new Promise((resolve) => {
    const element = document.querySelector(selector);
    if (!element) {
      console.warn(`Element with selector "${selector}" not found`);
      resolve();
      return;
    }

    const { behavior = "smooth", block = "start", offset = 0 } = options;

    // Calculate position with offset
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition + offset;

    window.scrollTo({
      top: offsetPosition,
      behavior,
    });

    // Wait for scroll to complete
    setTimeout(resolve, behavior === "smooth" ? 800 : 100);
  });
};

/**
 * Scroll to top of page
 */
export const scrollToTop = (behavior: ScrollBehavior = "smooth"): void => {
  window.scrollTo({
    top: 0,
    behavior,
  });
};

/**
 * Get current scroll progress (0-1)
 */
export const getScrollProgress = (): number => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  return height > 0 ? winScroll / height : 0;
};

/**
 * Check if element is in viewport
 */
export const isElementInViewport = (
  element: Element,
  threshold = 0,
): boolean => {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView =
    rect.top + threshold <= windowHeight &&
    rect.top + rect.height - threshold >= 0;
  const horInView =
    rect.left + threshold <= windowWidth &&
    rect.left + rect.width - threshold >= 0;

  return vertInView && horInView;
};

/**
 * Scroll to section with header offset compensation
 */
export const scrollToSection = (sectionId: string): void => {
  // Account for fixed header height (144px total: 64px + 80px)
  scrollToElement(`#${sectionId}`, { offset: -150 });
};

/**
 * Create intersection observer for scroll animations
 */
export const createScrollObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {},
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: "-10% 0px -10% 0px",
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

/**
 * Throttle function for scroll event handling
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;

  return (...args: Parameters<T>) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => {
          func(...args);
          lastExecTime = Date.now();
        },
        delay - (currentTime - lastExecTime),
      );
    }
  };
};

/**
 * Scroll to element with animation and callback
 */
export const animatedScrollTo = (
  target: string | number,
  duration = 800,
  easing = "easeInOutCubic",
  callback?: () => void,
): void => {
  const targetPosition =
    typeof target === "string"
      ? document.querySelector(target)?.getBoundingClientRect().top +
        window.pageYOffset -
        150
      : target;

  if (targetPosition === undefined) return;

  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  const easingFunctions = {
    easeInOutCubic: (t: number) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeOutCubic: (t: number) => --t * t * t + 1,
    easeInCubic: (t: number) => t * t * t,
  };

  const easingFunction =
    easingFunctions[easing] || easingFunctions.easeInOutCubic;

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    window.scrollTo(0, startPosition + distance * easingFunction(progress));

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else if (callback) {
      callback();
    }
  };

  requestAnimationFrame(animation);
};
