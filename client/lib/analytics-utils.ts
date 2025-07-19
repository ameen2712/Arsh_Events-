/**
 * Analytics and tracking utilities for user interaction monitoring
 */

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export interface UserProperties {
  user_id?: string;
  device_type?: "mobile" | "tablet" | "desktop";
  session_id?: string;
  page_location?: string;
  referrer?: string;
}

class AnalyticsManager {
  private static instance: AnalyticsManager;
  private initialized = false;
  private sessionId: string;
  private events: AnalyticsEvent[] = [];

  private constructor() {
    this.sessionId = this.generateSessionId();
  }

  static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager();
    }
    return AnalyticsManager.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getDeviceType(): "mobile" | "tablet" | "desktop" {
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }

  private getUserProperties(): UserProperties {
    return {
      device_type: this.getDeviceType(),
      session_id: this.sessionId,
      page_location: window.location.href,
      referrer: document.referrer,
    };
  }

  initialize(): void {
    if (this.initialized) return;

    this.initialized = true;

    // Track page view
    this.trackEvent({
      action: "page_view",
      category: "engagement",
      custom_parameters: {
        page_title: document.title,
        page_location: window.location.href,
        ...this.getUserProperties(),
      },
    });

    // Track session start
    this.trackEvent({
      action: "session_start",
      category: "engagement",
      custom_parameters: this.getUserProperties(),
    });

    // Set up automatic event tracking
    this.setupAutomaticTracking();

    console.log("Analytics initialized");
  }

  private setupAutomaticTracking(): void {
    // Track scroll depth
    this.trackScrollDepth();

    // Track time on page
    this.trackTimeOnPage();

    // Track clicks on external links
    this.trackExternalLinks();

    // Track form interactions
    this.trackFormInteractions();
  }

  private trackScrollDepth(): void {
    let maxScroll = 0;
    const thresholds = [25, 50, 75, 90, 100];
    const tracked = new Set<number>();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100,
      );

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;

        thresholds.forEach((threshold) => {
          if (scrollPercent >= threshold && !tracked.has(threshold)) {
            tracked.add(threshold);
            this.trackEvent({
              action: "scroll_depth",
              category: "engagement",
              label: `${threshold}%`,
              value: threshold,
            });
          }
        });
      }
    };

    window.addEventListener("scroll", this.debounce(handleScroll, 500));
  }

  private trackTimeOnPage(): void {
    const startTime = Date.now();

    const trackTime = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      this.trackEvent({
        action: "time_on_page",
        category: "engagement",
        value: timeSpent,
      });
    };

    // Track at intervals
    const intervals = [10, 30, 60, 120, 300]; // seconds
    intervals.forEach((interval) => {
      setTimeout(trackTime, interval * 1000);
    });

    // Track on page unload
    window.addEventListener("beforeunload", trackTime);
  }

  private trackExternalLinks(): void {
    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.hostname !== window.location.hostname) {
        this.trackEvent({
          action: "external_link_click",
          category: "navigation",
          label: link.href,
        });
      }
    });
  }

  private trackFormInteractions(): void {
    // Track form submissions
    document.addEventListener("submit", (event) => {
      const form = event.target as HTMLFormElement;
      const formName = form.getAttribute("name") || form.id || "unknown";

      this.trackEvent({
        action: "form_submit",
        category: "form",
        label: formName,
      });
    });

    // Track form field interactions
    document.addEventListener("focus", (event) => {
      const target = event.target as HTMLElement;
      if (target.matches("input, textarea, select")) {
        const fieldType =
          target.getAttribute("type") || target.tagName.toLowerCase();
        const fieldName = target.getAttribute("name") || target.id || "unknown";

        this.trackEvent({
          action: "form_field_focus",
          category: "form",
          label: `${fieldType}_${fieldName}`,
        });
      }
    });
  }

  trackEvent(event: AnalyticsEvent): void {
    const enhancedEvent = {
      ...event,
      timestamp: Date.now(),
      session_id: this.sessionId,
      ...this.getUserProperties(),
    };

    // Store event for potential batch sending
    this.events.push(enhancedEvent);

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log("Analytics Event:", enhancedEvent);
    }

    // Send to analytics service (placeholder)
    this.sendToAnalytics(enhancedEvent);
  }

  private async sendToAnalytics(event: any): Promise<void> {
    try {
      // Placeholder for actual analytics service integration
      // This could be Google Analytics, Mixpanel, PostHog, etc.

      // Example: Google Analytics 4
      if (typeof gtag !== "undefined") {
        gtag("event", event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
          custom_parameters: event.custom_parameters,
        });
      }

      // Example: Custom analytics endpoint
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(event)
      // });
    } catch (error) {
      console.error("Failed to send analytics event:", error);
    }
  }

  // Business-specific tracking methods
  trackBookingInteraction(action: string, eventType?: string): void {
    this.trackEvent({
      action: `booking_${action}`,
      category: "booking",
      label: eventType,
      custom_parameters: {
        event_type: eventType,
      },
    });
  }

  trackContactInteraction(action: string, method?: string): void {
    this.trackEvent({
      action: `contact_${action}`,
      category: "contact",
      label: method,
      custom_parameters: {
        contact_method: method,
      },
    });
  }

  trackCitySelection(cityName: string): void {
    this.trackEvent({
      action: "city_selected",
      category: "navigation",
      label: cityName,
      custom_parameters: {
        city: cityName,
      },
    });
  }

  trackModalInteraction(modalName: string, action: string): void {
    this.trackEvent({
      action: `modal_${action}`,
      category: "ui_interaction",
      label: modalName,
      custom_parameters: {
        modal_name: modalName,
      },
    });
  }

  trackSectionView(sectionName: string): void {
    this.trackEvent({
      action: "section_view",
      category: "engagement",
      label: sectionName,
      custom_parameters: {
        section: sectionName,
      },
    });
  }

  trackButtonClick(buttonName: string, context?: string): void {
    this.trackEvent({
      action: "button_click",
      category: "ui_interaction",
      label: buttonName,
      custom_parameters: {
        button_name: buttonName,
        context,
      },
    });
  }

  trackErrorOccurred(errorType: string, errorMessage: string): void {
    this.trackEvent({
      action: "error_occurred",
      category: "error",
      label: errorType,
      custom_parameters: {
        error_type: errorType,
        error_message: errorMessage,
      },
    });
  }

  // Utility methods
  private debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
  ): T {
    let timeout: NodeJS.Timeout;
    return ((...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    }) as T;
  }

  // Export data for analysis
  exportEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  // Clear stored events
  clearEvents(): void {
    this.events = [];
  }

  // Get session info
  getSessionInfo(): { sessionId: string; eventCount: number } {
    return {
      sessionId: this.sessionId,
      eventCount: this.events.length,
    };
  }
}

// Export singleton instance
export const analytics = AnalyticsManager.getInstance();

// Convenience functions
export const trackEvent = (event: AnalyticsEvent) =>
  analytics.trackEvent(event);
export const trackBooking = (action: string, eventType?: string) =>
  analytics.trackBookingInteraction(action, eventType);
export const trackContact = (action: string, method?: string) =>
  analytics.trackContactInteraction(action, method);
export const trackCitySelection = (cityName: string) =>
  analytics.trackCitySelection(cityName);
export const trackModal = (modalName: string, action: string) =>
  analytics.trackModalInteraction(modalName, action);
export const trackSectionView = (sectionName: string) =>
  analytics.trackSectionView(sectionName);
export const trackButtonClick = (buttonName: string, context?: string) =>
  analytics.trackButtonClick(buttonName, context);
export const trackError = (errorType: string, errorMessage: string) =>
  analytics.trackErrorOccurred(errorType, errorMessage);

// Initialize analytics
export const initializeAnalytics = () => analytics.initialize();

// Type declarations for global gtag (if using Google Analytics)
declare global {
  function gtag(...args: any[]): void;
}

export default analytics;
