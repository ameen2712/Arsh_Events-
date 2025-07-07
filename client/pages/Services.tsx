import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Crown,
  Gift,
  Users,
  Calendar,
  Star,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "Luxury Weddings",
    subtitle: "Where Two Hearts Become One",
    description:
      "Create your perfect love story with cinematic elegance, from intimate ceremonies to grand celebrations.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
    features: [
      "Traditional & Destination Ceremonies",
      "Pre-wedding Photography",
      "Mandap & Décor Design",
      "Catering & Hospitality",
      "Entertainment & Music",
      "Guest Coordination",
    ],
    priceRange: "₹2.5L - ₹25L",
    duration: "2-7 Days",
    capacity: "50-1000 Guests",
  },
  {
    id: 2,
    title: "Birthday Celebrations",
    subtitle: "Celebrating Life's Special Moments",
    description:
      "Transform birthdays into magical experiences with playful themes and joyful celebrations.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
    icon: Gift,
    color: "from-purple-500 to-violet-600",
    features: [
      "Custom Theme Decorations",
      "Entertainment Shows",
      "Custom Cake Design",
      "Photography & Videography",
      "Fun Activities & Games",
      "Party Favors & Gifts",
    ],
    priceRange: "₹15K - ₹2L",
    duration: "1 Day",
    capacity: "20-200 Guests",
  },
  {
    id: 3,
    title: "Corporate Events",
    subtitle: "Professional Excellence Meets Celebration",
    description:
      "Sophisticated corporate gatherings that reflect your brand's prestige and values.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
    icon: Users,
    color: "from-blue-500 to-indigo-600",
    features: [
      "Conference & Seminar Setup",
      "Product Launch Events",
      "Team Building Activities",
      "Awards & Recognition",
      "Networking Sessions",
      "Brand Integration",
    ],
    priceRange: "₹50K - ₹10L",
    duration: "1-3 Days",
    capacity: "50-500 Guests",
  },
  {
    id: 4,
    title: "Premium Events",
    subtitle: "Luxury Beyond Imagination",
    description:
      "Exclusive, bespoke celebrations for discerning clients who demand extraordinary experiences.",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop",
    icon: Crown,
    color: "from-yellow-500 to-amber-600",
    features: [
      "VIP Experiences",
      "Celebrity Performances",
      "Luxury Transportation",
      "Premium Hospitality",
      "Exclusive Venues",
      "Personalized Service",
    ],
    priceRange: "₹10L+",
    duration: "1-5 Days",
    capacity: "Exclusive",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background pt-36">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>

            <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-6">
              Events We
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Plan & Execute
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              From intimate gatherings to grand celebrations, we specialize in
              creating unforgettable experiences that reflect your unique vision
              and style.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border">
                  {/* Service Image */}
                  <div className="relative h-80 overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Service Icon */}
                    <div className="absolute top-6 left-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center shadow-lg`}
                      >
                        <service.icon className="text-white" size={28} />
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                      <span className="font-semibold">
                        {service.priceRange}
                      </span>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-white/80 text-lg font-signature">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-8">
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Service Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="text-center">
                        <Calendar
                          className="text-primary mx-auto mb-2"
                          size={20}
                        />
                        <div className="text-sm font-semibold text-foreground">
                          {service.duration}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Duration
                        </div>
                      </div>
                      <div className="text-center">
                        <Users
                          className="text-primary mx-auto mb-2"
                          size={20}
                        />
                        <div className="text-sm font-semibold text-foreground">
                          {service.capacity}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Capacity
                        </div>
                      </div>
                      <div className="text-center">
                        <Star className="text-primary mx-auto mb-2" size={20} />
                        <div className="text-sm font-semibold text-foreground">
                          5.0
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Rating
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-foreground mb-4">
                        What's Included
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle
                              className="text-primary flex-shrink-0"
                              size={16}
                            />
                            <span className="text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full bg-gradient-to-r ${service.color} text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      Plan Your {service.title}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Ready to Plan Your Perfect Event?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss your vision and create an unforgettable celebration
              together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Free Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-2xl font-semibold transition-all duration-300"
              >
                View Our Portfolio
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
