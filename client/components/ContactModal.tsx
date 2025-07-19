import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MapPin,
  Mail,
  Phone,
  Clock,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import {
  EnhancedModal,
  ModalBody,
  ModalFooter,
  ModalSuccess,
} from "./ui/enhanced-modal";
import { EnhancedButton } from "./ui/enhanced-button";
import { showContactToast, showErrorToast } from "@/lib/toast-utils";
import { trackModal, trackContact, trackError } from "@/lib/analytics-utils";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    city: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track form submission attempt
    trackContact("form_submit_attempt", "contact_modal");

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", formData);
      setIsSuccess(true);
      showContactToast();

      // Track successful submission
      trackContact("form_submit_success", "contact_modal");

      // Reset form after success
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          city: "",
          message: "",
        });
      }, 2000);
    } catch (error) {
      showErrorToast("Failed to send message. Please try again.");
      trackError("contact_form_error", "Form submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    trackModal("contact_modal", "close");
    setIsSuccess(false);
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const eventTypes = [
    "Wedding Ceremony",
    "Birthday Celebration",
    "Corporate Event",
    "Engagement Party",
    "Anniversary",
    "Other",
  ];

  const cities = ["Guntur", "Vijayawada", "Hyderabad"];

  return (
    <EnhancedModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Let's Create Your Dream Event"
      subtitle="Tell us about your vision and we'll make it extraordinary"
      size="lg"
      className="max-h-[90vh]"
    >
      {isSuccess ? (
        <ModalSuccess
          title="Message Sent Successfully!"
          message="We'll get back to you within 24 hours to discuss your dream event."
          onAction={() => window.open("tel:+918919836337", "_self")}
          actionLabel="Call Us Now"
        />
      ) : (
        <>
          <ModalBody maxHeight="70vh">
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20"
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    Locations
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Guntur, Vijayawada, Hyderabad
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-xl border border-green-500/20"
              >
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Phone className="text-green-500" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    Call Us
                  </p>
                  <p className="text-muted-foreground text-xs">
                    +91 8919836337
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-xl border border-blue-500/20"
              >
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Clock className="text-blue-500" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    Response Time
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Within 24 hours
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-background"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-background"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-background"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="eventType"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Event Type *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-background"
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Preferred City *
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-background"
                  >
                    <option value="">Select city</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Tell us about your event
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-background resize-none"
                  placeholder="Share your vision, date preferences, budget range, or any special requirements..."
                />
              </div>
            </form>
          </ModalBody>

          <ModalFooter>
            <EnhancedButton
              variant="secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </EnhancedButton>

            <EnhancedButton
              onClick={handleSubmit}
              isLoading={isSubmitting}
              loadingText="Sending..."
              icon={<Send size={18} />}
              magnetic
              glow
            >
              Send Message
            </EnhancedButton>
          </ModalFooter>
        </>
      )}
    </EnhancedModal>
  );
}
