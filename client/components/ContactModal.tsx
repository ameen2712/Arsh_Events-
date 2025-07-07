import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MapPin, Mail, Phone } from "lucide-react";
import { useState } from "react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    onClose();

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      city: "",
      message: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-heading font-bold text-gray-800">
                Let's Talk About Your Dream Event
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-luxury-blush/10 rounded-lg">
                  <MapPin className="text-luxury-purple" size={20} />
                  <div>
                    <p className="font-brand font-semibold text-sm">
                      Locations
                    </p>
                    <p className="text-gray-600 text-xs">
                      Guntur, Vijayawada, Hyderabad
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-luxury-peach/10 rounded-lg">
                  <Mail className="text-luxury-purple" size={20} />
                  <div>
                    <p className="font-brand font-semibold text-sm">Email</p>
                    <p className="text-gray-600 text-xs">
                      hello@elysianevents.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-luxury-gold/10 rounded-lg">
                  <Phone className="text-luxury-purple" size={20} />
                  <div>
                    <p className="font-brand font-semibold text-sm">Phone</p>
                    <p className="text-gray-600 text-xs">+91 98765 43210</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-brand font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-purple focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-brand font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-purple focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-brand font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-purple focus:border-transparent transition-all duration-200"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-brand font-medium text-gray-700 mb-2">
                      Event Type *
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-purple focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select event type</option>
                      <option value="birthday">Birthday Celebration</option>
                      <option value="wedding">Wedding Ceremony</option>
                      <option value="engagement">Engagement</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-brand font-medium text-gray-700 mb-2">
                    Preferred City *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-purple focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select city</option>
                    <option value="guntur">Guntur</option>
                    <option value="vijayawada">Vijayawada</option>
                    <option value="hyderabad">Hyderabad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-brand font-medium text-gray-700 mb-2">
                    Tell us about your vision
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-purple focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Describe your dream event, special requirements, or any questions you have..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full bg-gradient-to-r from-luxury-purple to-luxury-gold text-white py-4 rounded-lg font-brand font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                    isSubmitting
                      ? "opacity-75 cursor-not-allowed"
                      : "hover:shadow-lg"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
