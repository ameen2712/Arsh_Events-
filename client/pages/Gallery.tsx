import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Filter,
  Search,
  Grid3X3,
  List,
  Heart,
  Share2,
  Download,
  Play,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Crown,
  Gift,
  Building,
  Star,
} from "lucide-react";
import FloatingNav from "../components/FloatingNav";
import ContactModal from "../components/ContactModal";
import BookingFormModal from "../components/BookingFormModal";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  type: "image" | "video";
  url: string;
  thumbnailUrl: string;
  description: string;
  location: string;
  date: string;
  likes: number;
  tags: string[];
  featured: boolean;
}

const categories = [
  {
    id: "all",
    label: "All Events",
    icon: Grid3X3,
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "weddings",
    label: "Weddings",
    icon: Crown,
    color: "from-rose-500 to-pink-600",
  },
  {
    id: "birthdays",
    label: "Birthdays",
    icon: Gift,
    color: "from-orange-500 to-yellow-500",
  },
  {
    id: "corporate",
    label: "Corporate",
    icon: Building,
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "themes",
    label: "Themes & Décor",
    icon: Star,
    color: "from-emerald-500 to-teal-600",
  },
];

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Royal Wedding Ceremony",
    category: "weddings",
    type: "image",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
    description:
      "A magnificent royal wedding with traditional décor and elegant ceremonies.",
    location: "Hyderabad",
    date: "March 2024",
    likes: 256,
    tags: ["traditional", "royal", "mandap", "floral"],
    featured: true,
  },
  {
    id: 2,
    title: "Modern Corporate Gala",
    category: "corporate",
    type: "video",
    url: "https://videos.pexels.com/video-files/3196036/3196036-uhd_2560_1440_25fps.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop",
    description:
      "Contemporary corporate event with premium lighting and stage design.",
    location: "Vijayawada",
    date: "February 2024",
    likes: 142,
    tags: ["modern", "corporate", "lighting", "stage"],
    featured: false,
  },
  {
    id: 3,
    title: "Garden Birthday Paradise",
    category: "birthdays",
    type: "image",
    url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=800&fit=crop",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
    description:
      "Colorful outdoor birthday celebration with balloon arches and garden themes.",
    location: "Guntur",
    date: "January 2024",
    likes: 89,
    tags: ["outdoor", "colorful", "balloons", "garden"],
    featured: true,
  },
  {
    id: 4,
    title: "Vintage Theme Décor",
    category: "themes",
    type: "image",
    url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=800&fit=crop",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop",
    description:
      "Rustic vintage décor with warm lighting and antique elements.",
    location: "Hyderabad",
    date: "December 2023",
    likes: 178,
    tags: ["vintage", "rustic", "antique", "warm"],
    featured: false,
  },
  {
    id: 5,
    title: "Engagement Ceremony Highlights",
    category: "weddings",
    type: "video",
    url: "https://videos.pexels.com/video-files/8969434/8969434-uhd_2560_1440_25fps.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop",
    description:
      "Beautiful engagement ceremony with floral arrangements and traditional music.",
    location: "Vijayawada",
    date: "November 2023",
    likes: 234,
    tags: ["engagement", "floral", "traditional", "music"],
    featured: true,
  },
  {
    id: 6,
    title: "Tech Conference Setup",
    category: "corporate",
    type: "image",
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=800&fit=crop",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop",
    description:
      "Professional tech conference with modern AV setup and branded elements.",
    location: "Hyderabad",
    date: "October 2023",
    likes: 95,
    tags: ["tech", "professional", "modern", "branded"],
    featured: false,
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const toggleLike = (itemId: number) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    const index = filteredItems.findIndex((i) => i.id === item.id);
    setCurrentImageIndex(index);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!selectedItem) return;

    const newIndex =
      direction === "next"
        ? (currentImageIndex + 1) % filteredItems.length
        : (currentImageIndex - 1 + filteredItems.length) % filteredItems.length;

    setCurrentImageIndex(newIndex);
    setSelectedItem(filteredItems[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;

      if (e.key === "Escape") setSelectedItem(null);
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "ArrowRight") navigateLightbox("next");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, currentImageIndex]);

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
          className="pt-36 pb-16 px-4 text-center bg-gradient-to-b from-background to-background/50"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Our Gallery
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Step into our world of magnificent celebrations and discover the
              artistry behind each unforgettable moment we create.
            </p>
          </motion.div>
        </motion.section>

        {/* Filters and Search */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="px-4 mb-12"
        >
          <div className="max-w-7xl mx-auto">
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search events, themes, or locations..."
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

            {/* View Mode Toggle */}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setViewMode("masonry")}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === "masonry"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-card-foreground hover:bg-accent"
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-card-foreground hover:bg-accent"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.section>

        {/* Gallery Grid */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="px-4 pb-20"
        >
          <div className="max-w-7xl mx-auto">
            <div
              className={`grid gap-6 ${
                viewMode === "masonry"
                  ? "md:grid-cols-3 lg:grid-cols-4"
                  : "md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.1 }}
                    className={`group relative overflow-hidden rounded-2xl bg-card cursor-pointer ${
                      viewMode === "masonry" && index % 3 === 1
                        ? "md:row-span-2"
                        : ""
                    }`}
                    onClick={() => openLightbox(item)}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-300 mb-3">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                            {item.location}
                          </span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLike(item.id);
                              }}
                              className="hover:scale-110 transition-transform"
                            >
                              <Heart
                                className={`w-5 h-5 ${likedItems.has(item.id) ? "fill-red-500 text-red-500" : ""}`}
                              />
                            </button>
                            <span className="text-sm">{item.likes}</span>
                          </div>
                        </div>
                      </div>

                      {/* Play button for videos */}
                      {item.type === "video" && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      )}

                      {/* Featured Badge */}
                      {item.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Zoom Icon */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-5xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
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

                {/* Content */}
                <div className="bg-card rounded-2xl overflow-hidden">
                  <div className="aspect-video">
                    {selectedItem.type === "image" ? (
                      <img
                        src={selectedItem.url}
                        alt={selectedItem.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={selectedItem.url}
                        controls
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-card-foreground mb-2">
                          {selectedItem.title}
                        </h2>
                        <p className="text-muted-foreground">
                          {selectedItem.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                          <Share2 className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">
                          {selectedItem.location}
                        </span>
                        <span className="text-muted-foreground">
                          {selectedItem.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart
                          className={`w-5 h-5 ${likedItems.has(selectedItem.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                        />
                        <span className="text-muted-foreground">
                          {selectedItem.likes}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {selectedItem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
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
