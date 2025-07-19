import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Heart,
  CheckCircle,
  Star,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLenis } from "../hooks/useLenis";
import { useEffect, useState } from "react";

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

export default function Booking() {
  // Initialize Lenis for this page
  useLenis();

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

  useEffect(() => {
    // Set page title
    document.title = "Book Your Dream Event | Premium Events";

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Book your premium event with our comprehensive planning service. Birthdays, weddings, corporate events in Guntur, Vijayawada, and Hyderabad.",
      );
    }
  }, []);

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
    // Here you would typically send the data to your backend
    alert(
      "Thank you! Your booking request has been submitted. We'll contact you soon.",
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                Select Your Preferred City
              </h3>
              <p className="text-muted-foreground">
                Choose the city where you'd like to host your event
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cities.map((city) => (
                <motion.button
                  key={city}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setBookingData({ ...bookingData, city })}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-center ${
                    bookingData.city === city
                      ? "border-primary bg-primary/10 shadow-lg"
                      : "border-border hover:border-primary/50 glass"
                  }`}
                >
                  <div className="text-xl font-brand font-bold mb-2">
                    {city}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Available for all event types
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                What Type of Event Are You Planning?
              </h3>
              <p className="text-muted-foreground">
                Select the type of celebration you want to create
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventTypes.map((type) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setBookingData({ ...bookingData, eventType: type })
                  }
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    bookingData.eventType === type
                      ? "border-primary bg-primary/10 shadow-lg"
                      : "border-border hover:border-primary/50 glass"
                  }`}
                >
                  <div className="text-lg font-brand font-bold">{type}</div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                When Would You Like Your Event?
              </h3>
              <p className="text-muted-foreground">
                Choose your preferred date and time
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-brand font-medium text-foreground">
                  Event Date
                </label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, date: e.target.value })
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-brand font-medium text-foreground">
                  Preferred Time
                </label>
                <select
                  value={bookingData.time}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, time: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
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
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                Choose Your Theme & Add-ons
              </h3>
              <p className="text-muted-foreground">
                Customize your event with themes and additional services
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-lg font-brand font-semibold text-foreground mb-4">
                  Select Theme
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {themes.map((theme) => (
                    <motion.button
                      key={theme}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setBookingData({ ...bookingData, theme })}
                      className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                        bookingData.theme === theme
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 glass"
                      }`}
                    >
                      {theme}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-brand font-semibold text-foreground mb-4">
                  Add-on Services (Optional)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                      className={`p-3 rounded-xl border transition-all duration-200 text-left text-sm ${
                        bookingData.addOns.includes(addon)
                          ? "border-secondary bg-secondary/10"
                          : "border-border hover:border-secondary/50 glass"
                      }`}
                    >
                      {addon}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                Personal Details
              </h3>
              <p className="text-muted-foreground">
                Tell us about yourself so we can create the perfect event
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-brand font-medium text-foreground">
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
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-brand font-medium text-foreground">
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
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-brand font-medium text-foreground">
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
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-brand font-medium text-foreground">
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
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Home
            </Link>
          </motion.div>

          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              <span className="text-shimmer">Book Your Dream Event</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Let's create magic together. Tell us about your vision and we'll
              bring it to life with our premium event planning services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 ${
                      index <= currentStep
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        index <= currentStep
                          ? "border-primary bg-primary text-white"
                          : "border-muted-foreground"
                      }`}
                    >
                      {index < currentStep ? (
                        <CheckCircle size={16} />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <span className="text-sm font-brand font-medium hidden md:block">
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                />
              </div>
            </div>

            {/* Form Content */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-3xl p-8 md:p-12 mb-8"
            >
              {renderStepContent()}
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <motion.button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
                whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-brand font-semibold transition-all duration-200 ${
                  currentStep === 0
                    ? "text-muted-foreground cursor-not-allowed"
                    : "text-primary hover:bg-primary/10 glass"
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
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-xl font-brand font-semibold hover:shadow-lg transition-all duration-200"
                >
                  <Sparkles size={20} />
                  Submit Booking
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-brand font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Next
                  <ArrowLeft size={20} className="rotate-180" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
