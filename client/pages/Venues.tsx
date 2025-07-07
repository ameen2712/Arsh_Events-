import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Users,
  Car,
  Wifi,
  Camera,
  Music,
  Star,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import FloatingNav from "../components/FloatingNav";
import ContactModal from "../components/ContactModal";
import BookingFormModal from "../components/BookingFormModal";

const venueCategories = [
  {
    id: 1,
    name: "Luxury Hotels",
    description: "Premium hotels with world-class amenities",
    count: 15,
    icon: "🏨",
  },
  {
    id: 2,
    name: "Banquet Halls",
    description: "Spacious halls perfect for large celebrations",
    count: 25,
    icon: "🏛️",
  },
  {
    id: 3,
    name: "Outdoor Venues",
    description: "Beautiful gardens and open-air locations",
    count: 12,
    icon: "🌳",
  },
  {
    id: 4,
    name: "Heritage Properties",
    description: "Historic venues with royal charm",
    count: 8,
    icon: "🏰",
  },
];

const featuredVenues = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    location: "Hyderabad",
    category: "Luxury Hotels",
    description:
      "A magnificent 5-star property offering unparalleled luxury and sophistication for your special events.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
    ],
    capacity: "200-1000 guests",
    pricing: "₹8,000-15,000 per plate",
    rating: 4.9,
    amenities: [
      "Valet Parking",
      "Premium Catering",
      "AV Equipment",
      "Bridal Suite",
      "Garden Area",
      "Swimming Pool",
    ],
    features: {
      parking: "500 cars",
      ac: "Central AC",
      wifi: "High-speed WiFi",
      photography: "Professional Setup",
    },
  },
  {
    id: 2,
    name: "Royal Gardens Resort",
    location: "Guntur",
    category: "Outdoor Venues",
    description:
      "Sprawling gardens with elegant pavilions, perfect for outdoor ceremonies and receptions.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
    ],
    capacity: "150-800 guests",
    pricing: "₹5,000-12,000 per plate",
    rating: 4.8,
    amenities: [
      "Garden Ceremony",
      "Outdoor Catering",
      "Weather Protection",
      "Lighting Setup",
      "Sound System",
      "Backup Venues",
    ],
    features: {
      parking: "300 cars",
      ac: "Open Air",
      wifi: "WiFi Available",
      photography: "Natural Lighting",
    },
  },
  {
    id: 3,
    name: "Emerald Banquet Hall",
    location: "Vijayawada",
    category: "Banquet Halls",
    description:
      "Modern banquet hall with state-of-the-art facilities and customizable décor options.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
    ],
    capacity: "100-600 guests",
    pricing: "₹4,000-10,000 per plate",
    rating: 4.7,
    amenities: [
      "Flexible Seating",
      "Stage Setup",
      "LED Screens",
      "Professional Kitchen",
      "Changing Rooms",
      "Security",
    ],
    features: {
      parking: "200 cars",
      ac: "Central AC",
      wifi: "High-speed WiFi",
      photography: "Studio Lighting",
    },
  },
  {
    id: 4,
    name: "Heritage Haveli",
    location: "Hyderabad",
    category: "Heritage Properties",
    description:
      "A restored traditional haveli offering authentic charm and royal ambiance for memorable celebrations.",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
    ],
    capacity: "80-400 guests",
    pricing: "₹6,000-18,000 per plate",
    rating: 5.0,
    amenities: [
      "Heritage Architecture",
      "Traditional Décor",
      "Courtyard Space",
      "Period Furniture",
      "Cultural Programs",
      "Photography Spots",
    ],
    features: {
      parking: "150 cars",
      ac: "Traditional Cooling",
      wifi: "WiFi Available",
      photography: "Heritage Backdrop",
    },
  },
];

export default function Venues() {
  const [selectedVenue, setSelectedVenue] = useState<
    (typeof featuredVenues)[0] | null
  >(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const filteredVenues =
    activeCategory === "All"
      ? featuredVenues
      : featuredVenues.filter((venue) =>
          venue.category.includes(activeCategory.replace(" Venues", "")),
        );

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Navigation */}
      <FloatingNav
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenBooking={() => setIsBookingModalOpen(true)}
      />

      <div className="pt-36">
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
              Premium
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Venues Collection
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover exceptional venues across Andhra Pradesh. From luxury
              hotels to heritage properties, find the perfect setting for your
              celebration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Venue Categories */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {venueCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveCategory(category.name)}
                className="cursor-pointer group"
              >
                <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300 text-center">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <span className="text-sm text-primary font-semibold">
                    {category.count} Venues
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["All", "Luxury", "Banquet", "Outdoor", "Heritage"].map(
              (filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setActiveCategory(filter)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeCategory.includes(filter) || activeCategory === filter
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {filter}
                </motion.button>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Featured Venues Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedVenue(venue)}
              >
                <div className="bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border">
                  {/* Venue Image */}
                  <div className="relative h-80 overflow-hidden">
                    <motion.img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Location Badge */}
                    <div className="absolute top-6 left-6 bg-primary/90 text-primary-foreground px-4 py-2 rounded-full flex items-center gap-2">
                      <MapPin size={16} />
                      <span className="font-medium">{venue.location}</span>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-6 right-6 flex items-center gap-1 bg-black/70 text-white px-3 py-2 rounded-full">
                      <Star
                        className="text-yellow-400 fill-current"
                        size={16}
                      />
                      <span className="font-medium">{venue.rating}</span>
                    </div>

                    {/* Venue Info */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {venue.name}
                      </h3>
                      <p className="text-white/80 mb-3">{venue.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/90 text-lg font-semibold">
                          {venue.capacity}
                        </span>
                        <span className="text-yellow-400 font-bold">
                          {venue.pricing.split("-")[0]}+
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Venue Content */}
                  <div className="p-8">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {venue.description}
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <Car className="text-primary" size={20} />
                        <div>
                          <div className="font-semibold text-foreground text-sm">
                            Parking
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {venue.features.parking}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Wifi className="text-primary" size={20} />
                        <div>
                          <div className="font-semibold text-foreground text-sm">
                            Internet
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {venue.features.wifi}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Camera className="text-primary" size={20} />
                        <div>
                          <div className="font-semibold text-foreground text-sm">
                            Photography
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {venue.features.photography}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Music className="text-primary" size={20} />
                        <div>
                          <div className="font-semibold text-foreground text-sm">
                            Climate
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {venue.features.ac}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">
                        Amenities
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {venue.amenities.slice(0, 3).map((amenity, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                        {venue.amenities.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{venue.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-semibold"
                      >
                        View Details
                      </motion.button>
                      <motion.a
                        href="tel:+918919836337"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center"
                      >
                        <Phone size={20} />
                      </motion.a>
                      <motion.a
                        href="https://wa.me/918919836337"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center"
                      >
                        <MessageCircle size={20} />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Detail Modal */}
      {selectedVenue && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVenue(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="bg-card rounded-2xl overflow-hidden max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Content */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">
                    {selectedVenue.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedVenue.location} • {selectedVenue.category}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedVenue(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div>
                  <img
                    src={selectedVenue.image}
                    alt={selectedVenue.name}
                    className="w-full h-80 object-cover rounded-xl mb-4"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    {selectedVenue.gallery.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${selectedVenue.name} ${idx + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {selectedVenue.description}
                  </p>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          Capacity
                        </h4>
                        <p className="text-muted-foreground">
                          {selectedVenue.capacity}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          Pricing
                        </h4>
                        <p className="text-muted-foreground">
                          {selectedVenue.pricing}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        All Amenities
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedVenue.amenities.map((amenity, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-muted-foreground text-sm">
                              {amenity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Star
                          className="text-yellow-400 fill-current"
                          size={20}
                        />
                        <span className="font-semibold text-foreground">
                          {selectedVenue.rating}/5.0
                        </span>
                        <span className="text-muted-foreground text-sm">
                          Rating
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <motion.a
                          href="tel:+918919836337"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-green-500 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2"
                        >
                          <Phone size={16} />
                          Call Now
                        </motion.a>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-semibold"
                        >
                          Book Venue
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}