import { motion } from "framer-motion";
import { ArrowLeft, Palette, Crown, Heart, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import FloatingNav from "../components/FloatingNav";
import ContactModal from "../components/ContactModal";
import BookingFormModal from "../components/BookingFormModal";

const themeCategories = [
  {
    id: 1,
    name: "Wedding Themes",
    description: "Romantic and elegant themes for your special day",
    count: 12,
    color: "from-rose-500 to-pink-600",
  },
  {
    id: 2,
    name: "Birthday Themes",
    description: "Fun and vibrant themes for all ages",
    count: 18,
    color: "from-purple-500 to-violet-600",
  },
  {
    id: 3,
    name: "Corporate Themes",
    description: "Professional and sophisticated themes",
    count: 8,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 4,
    name: "Luxury Premium",
    description: "Exclusive high-end themes",
    count: 6,
    color: "from-yellow-500 to-amber-600",
  },
];

const featuredThemes = [
  {
    id: 1,
    title: "Royal Palace",
    category: "Wedding",
    description:
      "Majestic golden décor with royal blue accents, featuring ornate chandeliers and luxurious fabrics.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
    ],
    price: "₹2,50,000+",
    rating: 4.9,
    features: [
      "Golden Mandap",
      "Crystal Chandeliers",
      "Silk Drapes",
      "Royal Seating",
    ],
    colors: ["#FFD700", "#4169E1", "#8B0000", "#FFFFFF"],
  },
  {
    id: 2,
    title: "Enchanted Garden",
    category: "Wedding",
    description:
      "Natural beauty with lush greenery, fairy lights, and floral arrangements in a magical garden setting.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
    ],
    price: "₹1,80,000+",
    rating: 4.8,
    features: [
      "Floral Archway",
      "Fairy Lights",
      "Garden Seating",
      "Natural Décor",
    ],
    colors: ["#228B22", "#FFB6C1", "#FFFFFF", "#DDA0DD"],
  },
  {
    id: 3,
    title: "Princess Castle",
    category: "Birthday",
    description:
      "Magical princess theme with pink and gold décor, perfect for little princesses' dream celebrations.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
    ],
    price: "₹45,000+",
    rating: 5.0,
    features: [
      "Castle Backdrop",
      "Princess Throne",
      "Balloon Arch",
      "Crown Props",
    ],
    colors: ["#FFB6C1", "#FFD700", "#DDA0DD", "#FFFFFF"],
  },
  {
    id: 4,
    title: "Modern Minimalist",
    category: "Corporate",
    description:
      "Clean, sophisticated design with geometric patterns and premium materials for corporate excellence.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
    ],
    price: "₹1,20,000+",
    rating: 4.7,
    features: [
      "Geometric Décor",
      "LED Lighting",
      "Premium Seating",
      "Brand Integration",
    ],
    colors: ["#000000", "#FFFFFF", "#C0C0C0", "#4169E1"],
  },
  {
    id: 5,
    title: "Vintage Romance",
    category: "Wedding",
    description:
      "Timeless elegance with vintage elements, lace details, and soft romantic lighting.",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
    ],
    price: "₹2,00,000+",
    rating: 4.9,
    features: [
      "Vintage Furniture",
      "Lace Details",
      "Antique Props",
      "Soft Lighting",
    ],
    colors: ["#F5F5DC", "#DDA0DD", "#FFB6C1", "#8FBC8F"],
  },
  {
    id: 6,
    title: "Superhero Adventure",
    category: "Birthday",
    description:
      "Action-packed superhero theme with vibrant colors and exciting décor elements.",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
    ],
    price: "₹35,000+",
    rating: 4.8,
    features: [
      "Hero Backdrops",
      "Action Props",
      "Costume Station",
      "Comic Décor",
    ],
    colors: ["#FF0000", "#0000FF", "#FFD700", "#000000"],
  },
];

export default function Themes() {
  const [selectedTheme, setSelectedTheme] = useState<
    (typeof featuredThemes)[0] | null
  >(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const filteredThemes =
    activeCategory === "All"
      ? featuredThemes
      : featuredThemes.filter((theme) => theme.category === activeCategory);

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
              Themes &
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Décor Collection
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover our curated collection of stunning themes and décor
              styles. From traditional elegance to modern sophistication, find
              the perfect aesthetic for your celebration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Theme Categories */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {themeCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveCategory(category.name.split(" ")[0])}
                className={`cursor-pointer group ${
                  activeCategory === category.name.split(" ")[0]
                    ? "scale-105"
                    : ""
                }`}
              >
                <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Palette className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary font-semibold">
                      {category.count} Themes
                    </span>
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Eye className="text-primary" size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["All", "Wedding", "Birthday", "Corporate"].map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveCategory(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === filter
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Themes Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredThemes.map((theme, index) => (
              <motion.div
                key={theme.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedTheme(theme)}
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border">
                  {/* Theme Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={theme.image}
                      alt={theme.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {theme.category}
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full">
                      <Star
                        className="text-yellow-400 fill-current"
                        size={14}
                      />
                      <span className="text-sm font-medium">
                        {theme.rating}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {theme.title}
                      </h3>
                      <p className="text-white/80">{theme.price}</p>
                    </div>
                  </div>

                  {/* Theme Content */}
                  <div className="p-6">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {theme.description}
                    </p>

                    {/* Color Palette */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground mb-3">
                        Color Palette
                      </h4>
                      <div className="flex gap-2">
                        {theme.colors.map((color, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded-full border-2 border-border shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground mb-3">
                        Key Features
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {theme.features.slice(0, 2).map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                        {theme.features.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{theme.features.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity duration-300"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Theme Detail Modal */}
      {selectedTheme && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTheme(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="bg-card rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Content */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-foreground">
                  {selectedTheme.title}
                </h2>
                <button
                  onClick={() => setSelectedTheme(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div>
                  <img
                    src={selectedTheme.image}
                    alt={selectedTheme.title}
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    {selectedTheme.gallery.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${selectedTheme.title} ${idx + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {selectedTheme.description}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Features Included
                      </h4>
                      <div className="space-y-2">
                        {selectedTheme.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Color Scheme
                      </h4>
                      <div className="flex gap-3">
                        {selectedTheme.colors.map((color, idx) => (
                          <div key={idx} className="text-center">
                            <div
                              className="w-12 h-12 rounded-full border-2 border-border shadow-sm mb-2"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-xs text-muted-foreground">
                              {color}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-border">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {selectedTheme.price}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Starting price
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold"
                      >
                        Choose This Theme
                      </motion.button>
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