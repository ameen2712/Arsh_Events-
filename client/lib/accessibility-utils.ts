/**
 * Accessibility utilities and helpers for improved user experience
 */

/**
 * Generate unique IDs for form elements and ARIA labeling
 */
export const generateId = (prefix: string = "component"): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Announce content to screen readers
 */
export const announceToScreenReader = (
  message: string,
  priority: "polite" | "assertive" = "polite",
): void => {
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");
  announcement.setAttribute("class", "sr-only");
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Trap focus within a container (useful for modals)
 */
export const trapFocus = (container: HTMLElement): (() => void) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[
    focusableElements.length - 1
  ] as HTMLElement;

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  container.addEventListener("keydown", handleTabKey);

  // Focus first element
  if (firstElement) {
    firstElement.focus();
  }

  // Return cleanup function
  return () => {
    container.removeEventListener("keydown", handleTabKey);
  };
};

/**
 * Check if an element is visible to screen readers
 */
export const isVisibleToScreenReader = (element: HTMLElement): boolean => {
  const style = window.getComputedStyle(element);
  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    !element.hasAttribute("aria-hidden") &&
    element.getAttribute("aria-hidden") !== "true"
  );
};

/**
 * Get the accessible name of an element
 */
export const getAccessibleName = (element: HTMLElement): string => {
  // Check aria-label first
  const ariaLabel = element.getAttribute("aria-label");
  if (ariaLabel) return ariaLabel;

  // Check aria-labelledby
  const ariaLabelledBy = element.getAttribute("aria-labelledby");
  if (ariaLabelledBy) {
    const labelElement = document.getElementById(ariaLabelledBy);
    if (labelElement) return labelElement.textContent || "";
  }

  // Check associated label (for form controls)
  if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
    const id = element.getAttribute("id");
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`);
      if (label) return label.textContent || "";
    }
  }

  // Check title attribute
  const title = element.getAttribute("title");
  if (title) return title;

  // Fall back to text content
  return element.textContent || "";
};

/**
 * Skip link functionality for keyboard navigation
 */
export const createSkipLink = (
  targetId: string,
  text: string = "Skip to main content",
): HTMLElement => {
  const skipLink = document.createElement("a");
  skipLink.href = `#${targetId}`;
  skipLink.textContent = text;
  skipLink.className =
    "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50";

  skipLink.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });

  return skipLink;
};

/**
 * Add skip links to page
 */
export const addSkipLinks = (): void => {
  const skipLinks = [
    { targetId: "main-content", text: "Skip to main content" },
    { targetId: "navigation", text: "Skip to navigation" },
    { targetId: "footer", text: "Skip to footer" },
  ];

  const container = document.createElement("div");
  container.className = "skip-links";

  skipLinks.forEach(({ targetId, text }) => {
    const target = document.getElementById(targetId);
    if (target) {
      container.appendChild(createSkipLink(targetId, text));
    }
  });

  document.body.insertBefore(container, document.body.firstChild);
};

/**
 * Manage focus for route changes
 */
export const manageFocusOnRouteChange = (routeTitle: string = "Page"): void => {
  // Update page title
  document.title = `${routeTitle} - Arsh Events`;

  // Announce route change
  announceToScreenReader(`Navigated to ${routeTitle}`, "assertive");

  // Focus management
  const mainContent = document.getElementById("main-content");
  if (mainContent) {
    mainContent.focus();
    mainContent.scrollIntoView({ behavior: "smooth" });
  }
};

/**
 * Color contrast utilities
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    // Convert color to RGB values
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return 0;

    const [r, g, b] = rgb.map((c) => {
      const value = parseInt(c) / 255;
      return value <= 0.03928
        ? value / 12.92
        : Math.pow((value + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Check WCAG compliance for color contrast
 */
export const checkContrastCompliance = (
  backgroundColor: string,
  textColor: string,
  level: "AA" | "AAA" = "AA",
  size: "normal" | "large" = "normal",
): { isCompliant: boolean; ratio: number; required: number } => {
  const ratio = getContrastRatio(backgroundColor, textColor);

  let required = 4.5; // WCAG AA normal text
  if (level === "AAA") {
    required = size === "large" ? 4.5 : 7;
  } else if (size === "large") {
    required = 3;
  }

  return {
    isCompliant: ratio >= required,
    ratio,
    required,
  };
};

/**
 * Reduced motion utilities
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * High contrast mode detection
 */
export const prefersHighContrast = (): boolean => {
  return window.matchMedia("(prefers-contrast: high)").matches;
};

/**
 * Keyboard navigation helpers
 */
export const isNavigationKey = (key: string): boolean => {
  const navigationKeys = [
    "Tab",
    "Enter",
    "Space",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Home",
    "End",
    "PageUp",
    "PageDown",
  ];
  return navigationKeys.includes(key);
};

/**
 * Escape key handler
 */
export const handleEscapeKey = (
  callback: () => void,
): ((event: KeyboardEvent) => void) => {
  return (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      callback();
    }
  };
};

/**
 * ARIA live region management
 */
class LiveRegionManager {
  private static instance: LiveRegionManager;
  private politeRegion: HTMLElement | null = null;
  private assertiveRegion: HTMLElement | null = null;

  private constructor() {
    this.createRegions();
  }

  static getInstance(): LiveRegionManager {
    if (!LiveRegionManager.instance) {
      LiveRegionManager.instance = new LiveRegionManager();
    }
    return LiveRegionManager.instance;
  }

  private createRegions(): void {
    // Polite live region
    this.politeRegion = document.createElement("div");
    this.politeRegion.setAttribute("aria-live", "polite");
    this.politeRegion.setAttribute("aria-atomic", "true");
    this.politeRegion.className = "sr-only";
    document.body.appendChild(this.politeRegion);

    // Assertive live region
    this.assertiveRegion = document.createElement("div");
    this.assertiveRegion.setAttribute("aria-live", "assertive");
    this.assertiveRegion.setAttribute("aria-atomic", "true");
    this.assertiveRegion.className = "sr-only";
    document.body.appendChild(this.assertiveRegion);
  }

  announce(message: string, priority: "polite" | "assertive" = "polite"): void {
    const region =
      priority === "assertive" ? this.assertiveRegion : this.politeRegion;
    if (region) {
      region.textContent = message;
      // Clear after announcement
      setTimeout(() => {
        if (region) region.textContent = "";
      }, 1000);
    }
  }
}

export const liveRegionManager = LiveRegionManager.getInstance();

/**
 * Form validation accessibility
 */
export const setFormFieldError = (
  fieldId: string,
  errorMessage: string,
): void => {
  const field = document.getElementById(fieldId);
  if (!field) return;

  // Create or update error message
  let errorElement = document.getElementById(`${fieldId}-error`);
  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.id = `${fieldId}-error`;
    errorElement.className = "text-destructive text-sm mt-1";
    errorElement.setAttribute("role", "alert");
    field.parentNode?.insertBefore(errorElement, field.nextSibling);
  }

  errorElement.textContent = errorMessage;
  field.setAttribute("aria-describedby", `${fieldId}-error`);
  field.setAttribute("aria-invalid", "true");

  // Announce error
  liveRegionManager.announce(`Error: ${errorMessage}`, "assertive");
};

export const clearFormFieldError = (fieldId: string): void => {
  const field = document.getElementById(fieldId);
  const errorElement = document.getElementById(`${fieldId}-error`);

  if (field) {
    field.removeAttribute("aria-describedby");
    field.removeAttribute("aria-invalid");
  }

  if (errorElement) {
    errorElement.remove();
  }
};
