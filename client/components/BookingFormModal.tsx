import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Calendar,
  MapPin,
  Heart,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BookingData {
  city: string;
  eventType: string;
  date: string;
  time: string;
  theme: string;
  addOns: string[];
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    budget: string;
  };
}

const steps = [
  { title: "Choose City", icon: <MapPin size={20} /> },
  { title: "Event Type", icon: <Heart size={20} /> },
  { title: "Date & Time", icon: <Calendar size={20} /> },
  { title: "Theme & Add-ons", icon: <CheckCircle size={20} /> },
  { title: "Personal Details", icon: <CheckCircle size={20} /> },
];

export default function BookingFormModal({
  isOpen,
  onClose,
}: BookingFormModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState<BookingData>({
    city: "",
    eventType: "",
    date: "",
    time: "",
    theme: "",
    addOns: [],
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      budget: "",
    },
  });

  const cities = ["Guntur", "Vijayawada", "Hyderabad"];
  const eventTypes = [
    "Birthday Celebration",
    "Wedding Ceremony",
    "Engagement",
    "Corporate Event",
  ];
  const themes = [
    "Royal Heritage",
    "Garden Romance",
    "Unicorn Fantasy",
    "Space Adventure",
    "Princess Palace",
  ];
  const addOns = [
    "Photography",
    "Catering",
    "Decoration",
    "Entertainment",
    "Live Music",
    "Video Coverage",
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Booking submitted:", bookingData);
    onClose();
    // Reset form
    setCurrentStep(0);
    setBookingData({
      city: "",
      eventType: "",
      date: "",
      time: "",
      theme: "",
      addOns: [],
      personalInfo: {
        name: "",
        email: "",
        phone: "",
        budget: "",
      },
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-bold text-gray-800 mb-6">
              Select Your Preferred City
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {cities.map((city) => (
                <motion.button
                  key={city}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setBookingData({ ...bookingData, city })}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    bookingData.city === city
                      ? "border-luxury-purple bg-luxury-purple/10"
                      : "border-gray-200 hover:border-luxury-purple/50"
                  }`}
                >
                  <div className="font-brand font-semibold">{city}</div>
                  <div className="text-sm text-gray-600">
                    Available for all event types
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-bold text-gray-800 mb-6">
              What Type of Event Are You Planning?
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {eventTypes.map((type) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setBookingData({ ...bookingData, eventType: type })
                  }
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    bookingData.eventType === type
                      ? "border-luxury-purple bg-luxury-purple/10"
                      : "border-gray-200 hover:border-luxury-purple/50"
                  }`}
                >
                  <div className="font-brand font-semibold">{type}</div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-heading font-bold text-gray-800 mb-6">
              When Would You Like Your Event?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-brand font-medium text-gray-700 mb-2">
                  Event Date
                </label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, date: e.target.value })
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-purple focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-brand font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <select
                  value={bookingData.time}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, time: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-purple focus:border-transparent"
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                  <option value="evening">Evening (4 PM - 8 PM)</option>
                  <option value="night">Night (8 PM - 12 AM)</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-heading font-bold text-gray-800 mb-6">
              Choose Your Theme & Add-ons
            </h3>

            <div>
              <label className="block text-sm font-brand font-medium text-gray-700 mb-4">
                Select Theme
              </label>
              <div className="grid grid-cols-1 gap-3">
                {themes.map((theme) => (
                  <motion.button
                    key={theme}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setBookingData({ ...bookingData, theme })}
                    className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                      bookingData.theme === theme
                        ? "border-luxury-purple bg-luxury-purple/10"
                        : "border-gray-200 hover:border-luxury-purple/50"
                    }`}
                  >
                    {theme}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-brand font-medium text-gray-700 mb-4">
                Add-on Services (Optional)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {addOns.map((addon) => (
                  <motion.button
                    key={addon}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const newAddOns = bookingData.addOns.includes(addon)
                        ? bookingData.addOns.filter((item) => item !== addon)
                        : [...bookingData.addOns, addon];
                      setBookingData({ ...bookingData, addOns: newAddOns });
                    }}
                    className={`p-3 rounded-lg border transition-all duration-200 text-left text-sm ${
                      bookingData.addOns.includes(addon)
                        ? "border-luxury-gold bg-luxury-gold/10"
                        : "border-gray-200 hover:border-luxury-gold/50"
                    }`}
                  >
                    {addon}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-heading font-bold text-gray-800 mb-6">
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-brand font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={bookingData.personalInfo.name}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      personalInfo: {
                        ...bookingData.personalInfo,
                        name: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-purple focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-brand font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={bookingData.personalInfo.email}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      personalInfo: {
                        ...bookingData.personalInfo,
                        email: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-purple focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-brand font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={bookingData.personalInfo.phone}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      personalInfo: {
                        ...bookingData.personalInfo,
                        phone: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-purple focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-brand font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <select
                  value={bookingData.personalInfo.budget}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      personalInfo: {
                        ...bookingData.personalInfo,
                        budget: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-purple focus:border-transparent"
                >
                  <option value="">Select budget range</option>
                  <option value="10000-25000">₹10,000 - ₹25,000</option>
                  <option value="25000-50000">₹25,000 - ₹50,000</option>
                  <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                  <option value="100000-250000">₹1,00,000 - ₹2,50,000</option>
                  <option value="250000+">₹2,50,000+</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl max-w-3xl w-[90vw] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-heading font-bold text-gray-800">
                Book Your Dream Event
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 ${
                      index <= currentStep
                        ? "text-luxury-purple"
                        : "text-gray-400"
                    }`}
                  >
                    {step.icon}
                    <span className="text-sm font-brand font-medium hidden md:block">
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-r from-luxury-purple to-luxury-gold h-2 rounded-full"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <motion.button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
                whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-brand font-semibold transition-all duration-200 ${
                  currentStep === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-luxury-purple hover:bg-luxury-purple/10"
                }`}
              >
                <ArrowLeft size={20} />
                Previous
              </motion.button>

              {currentStep === steps.length - 1 ? (
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-luxury-purple to-luxury-gold text-white px-8 py-3 rounded-lg font-brand font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Submit Booking
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-luxury-purple to-luxury-gold text-white px-6 py-3 rounded-lg font-brand font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Next
                  <ArrowRight size={20} />
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
