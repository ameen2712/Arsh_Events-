import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  MapPin,
  Users,
  Calendar,
  Star,
  ArrowRight,
  X,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef, useState } from "react";
import { showSuccessToast, showInfoToast } from "@/lib/toast-utils";
import { trackCitySelection, trackContact } from "@/lib/analytics-utils";
import { RevealOnScroll, FloatingElement } from "./ParallaxBackground";
import { useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { useCommonQueries } from "@/hooks/useResponsive";

interface City {
  name: string;
  description: string;
  image: string;
  backImage: string;
  events: number;
  venues: number;
  rating: number;
  specialties: string[];
  priceRange: string;
  featured: string[];
  eventTypes: string[];
  gallery: string[];
}

const cities: City[] = [
  {
    name: "Guntur",
    description:
      "Where tradition meets contemporary luxury in the heart of Andhra Pradesh",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop&crop=center",
    backImage:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop&crop=center",
    events: 150,
    venues: 25,
    rating: 4.9,
    specialties: [
      "Traditional Weddings",
      "Cultural Celebrations",
      "Heritage Venues",
    ],
    priceRange: "₹2L - ₹8L",
    featured: ["Palace Gardens", "Heritage Hotels", "Lakeside Venues"],
    eventTypes: ["Birthday", "Wedding", "Engagement", "Corporate"],
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
    ],
  },
  {
    name: "Vijayawada",
    description:
      "Riverside elegance where Krishna's waters bless your special moments",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center",
    backImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&crop=center",
    events: 200,
    venues: 30,
    rating: 4.8,
    specialties: [
      "Destination Weddings",
      "Riverfront Venues",
      "Modern Celebrations",
    ],
    priceRange: "₹3L - ₹10L",
    featured: ["Krishna Riverfront", "Luxury Resorts", "Rooftop Venues"],
    eventTypes: ["Wedding", "Corporate", "Birthday", "Engagement"],
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
    ],
  },
  {
    name: "Hyderabad",
    description:
      "Metropolitan magnificence in the city of pearls and palatial grandeur",
    image:
      "https://images.unsplash.com/photo-1566219497843-c7917bb28295?w=600&h=400&fit=crop&crop=center",
    backImage:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop&crop=center",
    events: 300,
    venues: 50,
    rating: 5.0,
    specialties: ["Royal Weddings", "Corporate Events", "Luxury Celebrations"],
    priceRange: "₹5L - ₹25L",
    featured: ["Palace Hotels", "Tech City Venues", "Historic Forts"],
    eventTypes: ["Wedding", "Corporate", "Engagement", "Birthday"],
    gallery: [
      "https://images.unsplash.com/photo-1566219497843-c7917bb28295?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
    ],
  },
];

export default function CityCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { isMobile, isTablet } = useCommonQueries();
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const handleCityClick = (city: City) => {
    trackCitySelection(city.name);
    setSelectedCity(city);
    setCurrentImageIndex(0);
  };

  const handleCall = () => {
    trackContact("call_initiated", "phone");
    showInfoToast("Connecting to call...", {
      description: "You'll be connected to our event planning team.",
    });
    setTimeout(() => {
      window.open("tel:+918919836337", "_self");
    }, 500);
  };

  const handleWhatsApp = () => {
    trackContact("whatsapp_initiated", "whatsapp");
    showInfoToast("Opening WhatsApp...", {
      description: "Chat with us for instant planning assistance.",
    });
    setTimeout(() => {
      window.open("https://wa.me/918919836337", "_blank");
    }, 500);
  };

  const nextImage = () => {
    if (selectedCity) {
      setCurrentImageIndex((prev) =>
        prev === selectedCity.gallery.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const prevImage = () => {
    if (selectedCity) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedCity.gallery.length - 1 : prev - 1,
      );
    }
  };

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 gradient-mesh opacity-20"
      />

      {/* Floating Particles - Reduced on mobile */}
      <div className="absolute inset-0">
        {Array.from({ length: isMobile ? 8 : 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-2 h-2 bg-cinematic-gold/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-cinematic-purple to-cinematic-gold mx-auto mb-6 rounded-full"
          />

          <h2
            id="cities-heading"
            className="text-5xl md:text-6xl font-heading font-bold mb-6"
          >
            Cities Where We
            <span className="block text-shimmer">Create Magic</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From intimate celebrations to grand spectacles, we bring your vision
            to life across Andhra Pradesh's most stunning locations
          </p>
        </motion.div>

        {/* City Cards Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {cities.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group perspective-1000 h-[500px] card-hover"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <motion.div
                className="card-3d w-full h-full cursor-pointer"
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {/* Front Face */}
                <div className="card-face glass rounded-3xl overflow-hidden shadow-floating">
                  <div className="relative h-full">
                    {/* Background Image */}
                    <motion.div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${city.image})` }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cinematic-midnight/90 via-transparent to-cinematic-midnight/20" />

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-between p-8">
                      {/* Top Section */}
                      <div className="flex items-start justify-between">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="glass p-3 rounded-full"
                        >
                          <MapPin className="text-cinematic-gold" size={24} />
                        </motion.div>

                        <div className="flex items-center gap-1 glass px-3 py-1 rounded-full">
                          <Star
                            className="text-cinematic-gold fill-current"
                            size={16}
                          />
                          <span className="text-white font-semibold">
                            {city.rating}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Section */}
                      <div>
                        <motion.h3
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-3xl font-heading font-bold text-white mb-3"
                        >
                          {city.name}
                        </motion.h3>

                        <p className="text-white/80 mb-4 line-clamp-2">
                          {city.description}
                        </p>

                        {/* Quick Stats */}
                        <div className="flex items-center gap-4 text-sm text-white/70">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{city.events}+ Events</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{city.venues} Venues</span>
                          </div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="flex items-center justify-between mt-4"
                        >
                          <span className="text-cinematic-gold font-semibold">
                            {city.priceRange}
                          </span>
                          <ArrowRight
                            className="text-white/60 group-hover:text-cinematic-gold transition-colors"
                            size={20}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back Face */}
                <div className="card-face card-back glass rounded-3xl overflow-hidden shadow-floating">
                  <div className="relative h-full">
                    {/* Background */}
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-30"
                      style={{ backgroundImage: `url(${city.backImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-cinematic-purple/90 to-cinematic-midnight/90" />

                    {/* Content */}
                    <div className="relative h-full p-8 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-heading font-bold text-white mb-6">
                          Experience {city.name}
                        </h3>

                        {/* Specialties */}
                        <div className="mb-6">
                          <h4 className="text-cinematic-gold font-semibold mb-3">
                            Specialties
                          </h4>
                          <div className="space-y-2">
                            {city.specialties.map((specialty, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-2 text-white/80"
                              >
                                <div className="w-1.5 h-1.5 bg-cinematic-gold rounded-full" />
                                <span className="text-sm">{specialty}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Featured Venues */}
                        <div className="mb-6">
                          <h4 className="text-cinematic-gold font-semibold mb-3">
                            Featured Venues
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {city.featured.map((venue, idx) => (
                              <span
                                key={idx}
                                className="glass px-3 py-1 rounded-full text-xs text-white/80"
                              >
                                {venue}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        onClick={() => handleCityClick(city)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-cinematic-gold to-cinematic-purple text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-glow"
                      >
                        Explore {city.name}
                        <ArrowRight size={18} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="glass px-12 py-4 rounded-full text-cinematic-purple font-semibold text-lg hover:text-white hover:bg-cinematic-purple/20 transition-all duration-300"
          >
            Plan Your Dream Event in Any City
          </motion.button>
        </motion.div>
      </div>

      {/* City Modal */}
      <AnimatePresence>
        {selectedCity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCity(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-64 bg-gradient-to-br from-cinematic-purple to-cinematic-gold">
                <button
                  onClick={() => setSelectedCity(null)}
                  className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Image Carousel */}
                <div className="relative h-full">
                  <img
                    src={selectedCity.gallery[currentImageIndex]}
                    alt={`${selectedCity.name} event`}
                    className="w-full h-full object-cover"
                  />

                  {/* Carousel Controls */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedCity.gallery.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-6 text-white">
                    <h2 className="text-3xl font-bold mb-2">
                      {selectedCity.name}
                    </h2>
                    <p className="text-white/80">{selectedCity.description}</p>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Event Types */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Event Types We Handle
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedCity.eventTypes.map((type, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-cinematic-purple/10 to-cinematic-gold/10 rounded-lg p-3 text-center"
                      >
                        <span className="font-medium text-gray-700">
                          {type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cinematic-purple">
                      {selectedCity.events}+
                    </div>
                    <div className="text-sm text-gray-600">Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cinematic-purple">
                      {selectedCity.venues}
                    </div>
                    <div className="text-sm text-gray-600">Venues</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cinematic-purple">
                      {selectedCity.rating}
                    </div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cinematic-purple">
                      {selectedCity.priceRange}
                    </div>
                    <div className="text-sm text-gray-600">Price Range</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    onClick={handleCall}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    <Phone size={18} />
                    Call Now
                  </motion.button>
                  <motion.button
                    onClick={handleWhatsApp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
