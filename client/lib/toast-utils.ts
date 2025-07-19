import { toast } from "sonner";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

export interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Success toast notification
 */
export const showSuccessToast = (
  message: string,
  options: ToastOptions = {},
) => {
  return toast.success(message, {
    description: options.description,
    duration: options.duration || 4000,
    icon: CheckCircle,
    action: options.action,
    style: {
      background: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
      border: "1px solid hsl(var(--border))",
    },
  });
};

/**
 * Error toast notification
 */
export const showErrorToast = (message: string, options: ToastOptions = {}) => {
  return toast.error(message, {
    description: options.description,
    duration: options.duration || 6000,
    icon: XCircle,
    action: options.action,
    style: {
      background: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
      border: "1px solid hsl(var(--destructive))",
    },
  });
};

/**
 * Warning toast notification
 */
export const showWarningToast = (
  message: string,
  options: ToastOptions = {},
) => {
  return toast.warning(message, {
    description: options.description,
    duration: options.duration || 5000,
    icon: AlertCircle,
    action: options.action,
    style: {
      background: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
      border: "1px solid hsl(var(--warning))",
    },
  });
};

/**
 * Info toast notification
 */
export const showInfoToast = (message: string, options: ToastOptions = {}) => {
  return toast.info(message, {
    description: options.description,
    duration: options.duration || 4000,
    icon: Info,
    action: options.action,
    style: {
      background: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
      border: "1px solid hsl(var(--primary))",
    },
  });
};

/**
 * Custom toast with loading state
 */
export const showLoadingToast = (message: string) => {
  return toast.loading(message, {
    style: {
      background: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
      border: "1px solid hsl(var(--border))",
    },
  });
};

/**
 * Promise-based toast for async operations
 */
export const showPromiseToast = <T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: any) => string);
  },
) => {
  return toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error,
    style: {
      background: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
      border: "1px solid hsl(var(--border))",
    },
  });
};

/**
 * Action confirmation toast
 */
export const showConfirmationToast = (
  message: string,
  onConfirm: () => void,
  options: Partial<ToastOptions> = {},
) => {
  return toast(message, {
    description: options.description,
    duration: 10000, // Longer duration for confirmation
    action: {
      label: "Confirm",
      onClick: onConfirm,
    },
    cancel: {
      label: "Cancel",
      onClick: () => {},
    },
    style: {
      background: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
      border: "1px solid hsl(var(--border))",
    },
  });
};

/**
 * Booking confirmation toast
 */
export const showBookingToast = (eventType: string) => {
  return showSuccessToast("Booking Request Sent!", {
    description: `We'll contact you shortly about your ${eventType} event.`,
    action: {
      label: "View Details",
      onClick: () => {
        // Navigate to booking status or contact page
        window.location.href = "/contact";
      },
    },
  });
};

/**
 * Contact form submission toast
 */
export const showContactToast = () => {
  return showSuccessToast("Message Sent Successfully!", {
    description: "We'll get back to you within 24 hours.",
    action: {
      label: "Call Now",
      onClick: () => {
        window.open("tel:+918919836337", "_self");
      },
    },
  });
};

/**
 * Newsletter subscription toast
 */
export const showNewsletterToast = () => {
  return showSuccessToast("Welcome to Our Newsletter!", {
    description: "You'll receive updates about new themes and offers.",
  });
};

/**
 * File download toast
 */
export const showDownloadToast = (fileName: string) => {
  return showSuccessToast("Download Started", {
    description: `${fileName} is being downloaded.`,
  });
};
