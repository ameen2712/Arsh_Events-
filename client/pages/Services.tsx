import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import {
  Heart,
  Crown,
  Gift,
  Users,
  Calendar,
  Star,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  Sparkles,
  Trophy,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import FloatingNav from "../components/FloatingNav";
import ContactModal from "../components/ContactModal";
import BookingFormModal from "../components/BookingFormModal";

interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ComponentType<any>;
  color: string;
  features: string[];
  priceRange: string;
  duration: string;
  capacity: string;
  portfolio: string[];
  videoUrl?: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Luxury Weddings",
    subtitle: "Where Two Hearts Become One",
    description:
      "Create your perfect love story with cinematic elegance, from intimate ceremonies to grand celebrations that will be remembered for generations.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
    icon: Heart,
    color: "from-rose-500 via-pink-500 to-red-500",
    features: [
      "Traditional & Destination Ceremonies",
      "Pre-wedding Photography Sessions",
      "Custom Mandap & Décor Design",
      "Multi-cuisine Catering & Hospitality",
      "Live Entertainment & DJ Services",
      "Complete Guest Coordination",
      "Bridal & Groom Preparation",
      "Wedding Photography & Videography",
    ],
    priceRange: "₹2.5L - ₹25L",
    duration: "2-7 Days",
    capacity: "50-1000 Guests",
    portfolio: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop",
    ],
    videoUrl: "https://player.vimeo.com/video/example",
  },
  {
    id: 2,
    title: "Birthday Celebrations",
    subtitle: "Celebrating Life's Special Moments",
    description:
      "Transform birthdays into magical experiences with playful themes, creative decorations, and joyful celebrations that create lasting memories.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
    icon: Gift,
    color: "from-orange-500 via-yellow-500 to-amber-500",
    features: [
      "Themed Birthday Parties",
      "Custom Cake & Dessert Stations",
      "Entertainment & Activities",
      "Balloon Decorations & Arches",
      "Photography & Memory Books",
      "Party Favors & Gift Coordination",
      "Age-appropriate Entertainment",
      "Outdoor & Indoor Venues",
    ],
    priceRange: "₹25K - ₹2L",
    duration: "1 Day",
    capacity: "20-200 Guests",
    portfolio: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    ],
  },
  {
    id: 3,
    title: "Corporate Events",
    subtitle: "Professional Excellence Redefined",
    description:
      "Elevate your business presence with sophisticated corporate events that inspire, engage, and deliver measurable results for your organization.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
    icon: Users,
    color: "from-blue-500 via-indigo-500 to-purple-600",
    features: [
      "Conference & Seminar Management",
      "Product Launch Events",
      "Team Building Activities",
      "Award Ceremonies & Galas",
      "Brand Activation Campaigns",
      "Executive Retreats",
      "Trade Show Exhibitions",
      "Virtual & Hybrid Events",
    ],
    priceRange: "₹50K - ₹10L",
    duration: "1-3 Days",
    capacity: "30-2000 Guests",
    portfolio: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop",
    ],
  },
  {
    id: 4,
    title: "Premium Events",
    subtitle: "Exclusive Luxury Experiences",
    description:
      "Bespoke premium events crafted for discerning clients who demand nothing but the finest in luxury, sophistication, and exclusivity.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
    icon: Crown,
    color: "from-purple-500 via-violet-500 to-indigo-600",
    features: [
      "High-Profile Celebrity Events",
      "Luxury Brand Experiences",
      "Private Concerts & Shows",
      "Exclusive Dinner Parties",
      "Art Gallery Openings",
      "Fashion Show Productions",
      "VIP Hospitality Services",
      "International Event Coordination",
    ],
    priceRange: "₹5L - ₹50L",
    duration: "1-5 Days",
    capacity: "10-500 Guests",
    portfolio: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
    ],
  },
];

const stats = [
  { icon: Trophy, value: "500+", label: "Events Completed" },
  { icon: Heart, value: "98%", label: "Client Satisfaction" },
  { icon: Star, value: "50+", label: "Awards Won" },
  { icon: Users, value: "10K+", label: "Happy Clients" },
];

const process = [
  {
    step: 1,
    title: "Initial Consultation",
    description: "We listen to your vision and understand your requirements",
    icon: MessageCircle,
  },
  {
    step: 2,
    title: "Custom Planning",
    description: "Our team creates a detailed plan tailored to your needs",
    icon: Calendar,
  },
  {
    step: 3,
    title: "Execution",
    description: "Flawless execution with attention to every detail",
    icon: CheckCircle,
  },
  {
    step: 4,
    title: "Celebration",
    description: "Enjoy your perfect event while we handle everything",
    icon: Sparkles,
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  const openWhatsApp = (service?: Service) => {
    const message = service
      ? `Hi! I'm interested in your ${service.title} service. Could you please provide more details?`
      : "Hi! I'd like to know more about your event planning services.";

    window.open(
      `https://wa.me/918919836337?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <>
      <FloatingNav
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenBooking={() => setIsBookingModalOpen(true)}
      />

      <div className="min-h-screen bg-background" ref={containerRef}>
        {/* Hero Section with Parallax */}
        <motion.section
          style={{ y, opacity }}
          className="relative pt-36 pb-24 px-4 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_70%)]" />

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-6xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full text-primary font-medium mb-8"
            >
              <Sparkles className="w-5 h-5" />
              Premium Event Planning Services
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight">
              Events We Plan
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              From intimate gatherings to grand celebrations, we craft
              extraordinary experiences that turn your special moments into
              lifelong memories.
            </p>

            {/* Stats */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Services Grid */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="px-4 mb-24"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -5 }}
                    className="group relative bg-card border border-border rounded-3xl overflow-hidden"
                  >
                    {/* Background Image */}
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Content Overlay */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>

                        <h3 className="text-3xl font-bold text-white mb-2">
                          {service.title}
                        </h3>
                        <p className="text-lg text-gray-200 mb-4">
                          {service.subtitle}
                        </p>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                          {service.description}
                        </p>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="text-center">
                            <div className="text-xs text-gray-400 mb-1">
                              Price Range
                            </div>
                            <div className="text-sm font-semibold text-white">
                              {service.priceRange}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-400 mb-1">
                              Duration
                            </div>
                            <div className="text-sm font-semibold text-white">
                              {service.duration}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-400 mb-1">
                              Capacity
                            </div>
                            <div className="text-sm font-semibold text-white">
                              {service.capacity}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <motion.button
                            onClick={() => setSelectedService(service)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 bg-white text-black px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
                          >
                            View Details
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => openWhatsApp(service)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition-all"
                          >
                            <MessageCircle className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Process Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="px-4 mb-24"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Our Process
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From concept to celebration, we follow a proven process that
                ensures every detail is perfect.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative text-center"
                  >
                    {/* Step Number */}
                    <div className="text-6xl font-bold text-primary/20 mb-4">
                      {step.step.toString().padStart(2, "0")}
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-2xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {/* Connector Line */}
                    {index < process.length - 1 && (
                      <div className="hidden lg:block absolute top-24 left-full w-full h-0.5 bg-border -translate-x-1/2 z-[-1]" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="px-4 pb-24"
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-12 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                  Ready to Plan Your Dream Event?
                </h2>
                <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                  Let's create something extraordinary together. Contact us
                  today for a free consultation.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    onClick={() => setIsBookingModalOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-primary px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-3 hover:bg-gray-100 transition-all"
                  >
                    <Calendar className="w-5 h-5" />
                    Book Consultation
                  </motion.button>
                  <motion.a
                    href="tel:+918919836337"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 text-primary-foreground px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-3 hover:bg-white/20 transition-all backdrop-blur-sm"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Service Detail Modal */}
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-card rounded-3xl max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white"
                >
                  ×
                </button>
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-bold text-card-foreground mb-4">
                  {selectedService.title}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {selectedService.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground mb-4">
                      What's Included
                    </h3>
                    <ul className="space-y-3">
                      {selectedService.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 text-muted-foreground"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-card-foreground mb-4">
                      Event Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Price Range:
                        </span>
                        <span className="font-semibold">
                          {selectedService.priceRange}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-semibold">
                          {selectedService.duration}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Capacity:</span>
                        <span className="font-semibold">
                          {selectedService.capacity}
                        </span>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-card-foreground mb-4">
                        Portfolio
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedService.portfolio.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`${selectedService.title} ${index + 1}`}
                            className="aspect-square object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    onClick={() => {
                      setSelectedService(null);
                      setIsBookingModalOpen(true);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-3"
                  >
                    <Calendar className="w-5 h-5" />
                    Book This Service
                  </motion.button>
                  <motion.button
                    onClick={() => openWhatsApp(selectedService)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-green-600 text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-3"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      <BookingFormModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
