import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Search,
  Filter,
  Heart,
  Star,
  Eye,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
  X,
  Palette,
  Crown,
  Leaf,
  Sun,
  Waves,
  Sparkles,
  Calendar,
  MapPin,
  Users,
  Phone,
  MessageCircle,
} from "lucide-react";
import FloatingNav from "../components/FloatingNav";
import ContactModal from "../components/ContactModal";
import BookingFormModal from "../components/BookingFormModal";

interface Theme {
  id: number;
  title: string;
  category: string;
  description: string;
  mainImage: string;
  gallery: string[];
  priceRange: string;
  popularity: number;
  colors: string[];
  features: string[];
  occasions: string[];
  tags: string[];
  featured: boolean;
}

const categories = [
  {
    id: "all",
    label: "All Themes",
    icon: Palette,
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "luxury",
    label: "Luxury Royal",
    icon: Crown,
    color: "from-yellow-500 to-orange-600",
  },
  {
    id: "nature",
    label: "Garden & Nature",
    icon: Leaf,
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "modern",
    label: "Contemporary",
    icon: Sun,
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "coastal",
    label: "Coastal & Beach",
    icon: Waves,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "vintage",
    label: "Vintage & Rustic",
    icon: Sparkles,
    color: "from-amber-500 to-orange-600",
  },
];

const themes: Theme[] = [
  {
    id: 1,
    title: "Royal Palace Wedding",
    category: "luxury",
    description:
      "Experience the grandeur of Indian royalty with opulent gold décor, majestic mandaps, and luxurious fabrics.",
    mainImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=600&h=400&fit=crop",
    ],
    priceRange: "₹5L - ₹25L",
    popularity: 95,
    colors: ["#FFD700", "#8B0000", "#FF6B35", "#8B4513"],
    features: [
      "Golden Mandap with Crystal Chandeliers",
      "Royal Throne Setup",
      "Luxury Fabric Draping",
      "Traditional Music & Dance",
      "Royal Procession Setup",
      "Premium Floral Arrangements",
    ],
    occasions: ["Weddings", "Engagements", "Anniversaries"],
    tags: ["royal", "gold", "luxury", "traditional", "mandap"],
    featured: true,
  },
  {
    id: 2,
    title: "Garden Paradise",
    category: "nature",
    description:
      "Celebrate in nature's embrace with lush greenery, floral arches, and organic décor elements.",
    mainImage:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=600&h=400&fit=crop",
    ],
    priceRange: "₹2L - ₹12L",
    popularity: 88,
    colors: ["#228B22", "#FFB6C1", "#F0E68C", "#98FB98"],
    features: [
      "Natural Floral Arches",
      "Fairy Light Canopies",
      "Rustic Wood Elements",
      "Organic Centerpieces",
      "Garden Pathway Lighting",
      "Live Plant Installations",
    ],
    occasions: ["Weddings", "Birthdays", "Corporate"],
    tags: ["garden", "natural", "floral", "outdoor", "organic"],
    featured: true,
  },
  {
    id: 3,
    title: "Modern Minimalist",
    category: "modern",
    description:
      "Clean lines, contemporary design, and sophisticated color palettes for the modern couple.",
    mainImage:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&h=400&fit=crop",
    ],
    priceRange: "₹3L - ₹15L",
    popularity: 82,
    colors: ["#2F2F2F", "#FFFFFF", "#C0C0C0", "#4A90E2"],
    features: [
      "Geometric Stage Design",
      "LED Panel Backdrops",
      "Sleek Furniture Arrangements",
      "Monochromatic Color Schemes",
      "Contemporary Lighting",
      "Architectural Elements",
    ],
    occasions: ["Corporate", "Birthdays", "Engagements"],
    tags: ["modern", "minimalist", "contemporary", "geometric", "clean"],
    featured: false,
  },
  {
    id: 4,
    title: "Coastal Elegance",
    category: "coastal",
    description:
      "Bring the serenity of the ocean with blues, whites, and nautical-inspired décor elements.",
    mainImage:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1504691342899-4d92b50853e1?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
    ],
    priceRange: "₹2.5L - ₹10L",
    popularity: 76,
    colors: ["#0066CC", "#FFFFFF", "#F0F8FF", "#20B2AA"],
    features: [
      "Nautical Rope Decorations",
      "Seashell Centerpieces",
      "Ocean-inspired Backdrops",
      "Sandy Color Palettes",
      "Driftwood Arrangements",
      "Beach Umbrella Setups",
    ],
    occasions: ["Weddings", "Birthdays", "Corporate"],
    tags: ["coastal", "beach", "nautical", "ocean", "blue"],
    featured: false,
  },
  {
    id: 5,
    title: "Vintage Romance",
    category: "vintage",
    description:
      "Step back in time with antique furniture, warm lighting, and nostalgic décor elements.",
    mainImage:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=600&h=400&fit=crop",
    ],
    priceRange: "₹1.5L - ₹8L",
    popularity: 71,
    colors: ["#8B4513", "#DEB887", "#F5DEB3", "#CD853F"],
    features: [
      "Antique Furniture Collections",
      "Vintage Lace & Doilies",
      "Edison Bulb Lighting",
      "Old-world Charm Elements",
      "Rustic Wooden Backdrops",
      "Vintage Photo Displays",
    ],
    occasions: ["Weddings", "Anniversaries", "Birthdays"],
    tags: ["vintage", "antique", "rustic", "romantic", "warm"],
    featured: true,
  },
  {
    id: 6,
    title: "Bollywood Glamour",
    category: "luxury",
    description:
      "Lights, camera, action! A glamorous theme inspired by Bollywood's golden era.",
    mainImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop",
    ],
    priceRange: "₹4L - ₹20L",
    popularity: 89,
    colors: ["#FF1493", "#FFD700", "#9932CC", "#FF4500"],
    features: [
      "Bollywood Dance Floor",
      "Movie Poster Backdrops",
      "Glamorous Lighting Effects",
      "Star-studded Decorations",
      "Red Carpet Entry",
      "Filmi Music Setup",
    ],
    occasions: ["Birthdays", "Weddings", "Corporate"],
    tags: ["bollywood", "glamour", "filmi", "dance", "entertainment"],
    featured: true,
  },
];

export default function Themes() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likedThemes, setLikedThemes] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState<"popularity" | "price" | "name">(
    "popularity",
  );
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const filteredThemes = themes
    .filter((theme) => {
      const matchesCategory =
        selectedCategory === "all" || theme.category === selectedCategory;
      const matchesSearch =
        theme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.popularity - a.popularity;
        case "price":
          return (
            parseInt(a.priceRange.replace(/[^\d]/g, "")) -
            parseInt(b.priceRange.replace(/[^\d]/g, ""))
          );
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const toggleLike = (themeId: number) => {
    setLikedThemes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(themeId)) {
        newSet.delete(themeId);
      } else {
        newSet.add(themeId);
      }
      return newSet;
    });
  };

  const openLightbox = (theme: Theme, imageIndex = 0) => {
    setSelectedTheme(theme);
    setCurrentImageIndex(imageIndex);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!selectedTheme) return;

    const totalImages = selectedTheme.gallery.length;
    const newIndex =
      direction === "next"
        ? (currentImageIndex + 1) % totalImages
        : (currentImageIndex - 1 + totalImages) % totalImages;

    setCurrentImageIndex(newIndex);
  };

  const openWhatsApp = (theme?: Theme) => {
    const message = theme
      ? `Hi! I'm interested in the "${theme.title}" theme for my event. Could you please provide more details and pricing?`
      : "Hi! I'd like to know more about your theme and décor services.";

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

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pt-36 pb-16 px-4 text-center bg-gradient-to-b from-background via-background/95 to-background/50"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Themes & Décor
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transform your celebrations with our stunning collection of themes
              and décor designs, crafted to bring your vision to life.
            </p>
          </motion.div>
        </motion.section>

        {/* Filters Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="px-4 mb-12"
        >
          <div className="max-w-7xl mx-auto">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search themes, colors, or occasions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-card text-card-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-medium transition-all ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-card text-card-foreground hover:bg-accent border border-border"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {category.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Sort Options */}
            <div className="flex justify-center gap-4">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "popularity" | "price" | "name")
                }
                className="px-4 py-2 rounded-xl border border-border bg-card text-card-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="popularity">Sort by Popularity</option>
                <option value="price">Sort by Price</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>
        </motion.section>

        {/* Themes Grid */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="px-4 pb-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredThemes.map((theme, index) => (
                  <motion.div
                    key={theme.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-card border border-border rounded-3xl overflow-hidden"
                  >
                    {/* Main Image */}
                    <div className="relative aspect-square overflow-hidden cursor-pointer">
                      <img
                        src={theme.mainImage}
                        alt={theme.title}
                        onClick={() => openLightbox(theme)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        {/* Top Actions */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between">
                          {theme.featured && (
                            <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                              Featured
                            </span>
                          )}
                          <div className="flex gap-2 ml-auto">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLike(theme.id);
                              }}
                              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all backdrop-blur-sm"
                            >
                              <Heart
                                className={`w-5 h-5 ${likedThemes.has(theme.id) ? "fill-red-500 text-red-500" : ""}`}
                              />
                            </button>
                            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all backdrop-blur-sm">
                              <Share2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Bottom Info */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-white text-sm">
                              {theme.popularity}%
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => openLightbox(theme)}
                              className="flex-1 bg-white text-black px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-all"
                            >
                              <Eye className="w-4 h-4 inline mr-2" />
                              View Gallery
                            </button>
                            <button
                              onClick={() => openWhatsApp(theme)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-card-foreground">
                          {theme.title}
                        </h3>
                        <span className="text-primary font-semibold text-sm">
                          {theme.priceRange}
                        </span>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {theme.description}
                      </p>

                      {/* Color Palette */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs text-muted-foreground">
                          Colors:
                        </span>
                        <div className="flex gap-1">
                          {theme.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Occasions */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {theme.occasions.slice(0, 3).map((occasion) => (
                          <span
                            key={occasion}
                            className="px-2 py-1 bg-accent text-accent-foreground rounded-lg text-xs"
                          >
                            {occasion}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          onClick={() => setIsBookingModalOpen(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-xl font-medium text-sm hover:bg-primary/90 transition-all"
                        >
                          Book Now
                        </motion.button>
                        <motion.button
                          onClick={() => openLightbox(theme)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-accent text-accent-foreground px-4 py-3 rounded-xl font-medium text-sm hover:bg-accent/80 transition-all"
                        >
                          Gallery
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* No Results */}
            {filteredThemes.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  No themes found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Theme Gallery Modal */}
        <AnimatePresence>
          {selectedTheme && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedTheme(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-6xl max-h-[90vh] w-full bg-card rounded-3xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedTheme(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Navigation Buttons */}
                <button
                  onClick={() => navigateLightbox("prev")}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={() => navigateLightbox("next")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>

                <div className="grid lg:grid-cols-2 h-full">
                  {/* Image Gallery */}
                  <div className="relative aspect-square lg:aspect-auto">
                    <img
                      src={selectedTheme.gallery[currentImageIndex]}
                      alt={selectedTheme.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm backdrop-blur-sm">
                      {currentImageIndex + 1} / {selectedTheme.gallery.length}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-8 overflow-y-auto">
                    <h2 className="text-3xl font-bold text-card-foreground mb-2">
                      {selectedTheme.title}
                    </h2>
                    <p className="text-primary font-semibold text-lg mb-4">
                      {selectedTheme.priceRange}
                    </p>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {selectedTheme.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-card-foreground mb-3">
                        What's Included
                      </h3>
                      <ul className="space-y-2">
                        {selectedTheme.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-3 text-muted-foreground"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Color Palette */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-card-foreground mb-3">
                        Color Palette
                      </h3>
                      <div className="flex gap-3">
                        {selectedTheme.colors.map((color, index) => (
                          <div key={index} className="text-center">
                            <div
                              className="w-12 h-12 rounded-xl border-2 border-border shadow-sm mb-2"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-xs text-muted-foreground">
                              {color}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Occasions */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-card-foreground mb-3">
                        Perfect For
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTheme.occasions.map((occasion) => (
                          <span
                            key={occasion}
                            className="px-3 py-1 bg-accent text-accent-foreground rounded-lg text-sm"
                          >
                            {occasion}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <motion.button
                        onClick={() => {
                          setSelectedTheme(null);
                          setIsBookingModalOpen(true);
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-primary text-primary-foreground px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-3"
                      >
                        <Calendar className="w-5 h-5" />
                        Book This Theme
                      </motion.button>
                      <motion.button
                        onClick={() => openWhatsApp(selectedTheme)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-green-600 text-white px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-3"
                      >
                        <MessageCircle className="w-5 h-5" />
                        WhatsApp
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
                  <div className="flex gap-2 justify-center">
                    {selectedTheme.gallery.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index
                            ? "border-primary"
                            : "border-transparent"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${selectedTheme.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
