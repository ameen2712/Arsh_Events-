import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  Eye,
  Filter,
  Sparkles,
} from "lucide-react";

interface Theme {
  id: string;
  title: string;
  category: string;
  image: string;
  price: string;
  rating: number;
  description: string;
  features: string[];
  tag: string;
}

const themes: Theme[] = [
  {
    id: "royal-heritage",
    title: "Royal Heritage",
    category: "Wedding",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&crop=center",
    price: "₹5L+",
    rating: 4.9,
    description: "Majestic celebrations with traditional grandeur",
    features: ["Palace Decor", "Royal Cuisine", "Traditional Music"],
    tag: "Premium",
  },
  {
    id: "garden-romance",
    title: "Garden Romance",
    category: "Wedding",
    image:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&h=400&fit=crop&crop=center",
    price: "₹3L+",
    rating: 4.8,
    description: "Enchanting outdoor celebrations with natural beauty",
    features: ["Floral Arrangements", "Outdoor Setup", "Fairy Lights"],
    tag: "Popular",
  },
  {
    id: "unicorn-fantasy",
    title: "Unicorn Fantasy",
    category: "Birthday",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop&crop=center",
    price: "₹25K+",
    rating: 5.0,
    description: "Magical rainbow wonderland for little dreamers",
    features: ["Rainbow Decor", "Unicorn Props", "Magical Shows"],
    tag: "Trending",
  },
  {
    id: "space-adventure",
    title: "Space Adventure",
    category: "Birthday",
    image:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop&crop=center",
    price: "₹30K+",
    rating: 4.7,
    description: "Cosmic journey to the stars and beyond",
    features: ["Space Props", "LED Lighting", "Astronaut Costumes"],
    tag: "New",
  },
  {
    id: "elegant-engagement",
    title: "Elegant Engagement",
    category: "Engagement",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop&crop=center",
    price: "₹1L+",
    rating: 4.8,
    description: "Sophisticated celebrations for your special moment",
    features: ["Ring Ceremony", "Intimate Setup", "Photography"],
    tag: "Classic",
  },
  {
    id: "corporate-luxury",
    title: "Corporate Luxury",
    category: "Corporate",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop&crop=center",
    price: "₹2L+",
    rating: 4.9,
    description: "Professional events with executive excellence",
    features: ["Business Setup", "Networking", "Presentations"],
    tag: "Executive",
  },
];

const categories = ["All", "Wedding", "Birthday", "Engagement", "Corporate"];

export default function ThemesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredThemes =
    selectedCategory === "All"
      ? themes
      : themes.filter((theme) => theme.category === selectedCategory);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= filteredThemes.length ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? filteredThemes.length - 1 : prev - 1,
    );
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Premium":
        return "bg-cinematic-gold text-white";
      case "Popular":
        return "bg-cinematic-purple text-white";
      case "Trending":
        return "bg-cinematic-rose text-white";
      case "New":
        return "bg-cinematic-sky text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-cinematic-purple to-cinematic-gold mx-auto mb-6 rounded-full"
          />

          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Dream Themes
            <span className="block text-shimmer">Infinite Possibilities</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Explore our curated collection of themes designed to make every
            celebration uniquely yours
          </p>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <Filter size={16} className="text-cinematic-purple" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentIndex(0);
                }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-cinematic-purple to-cinematic-gold text-white shadow-glow"
                    : "glass text-muted-foreground hover:text-cinematic-purple"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 glass w-12 h-12 rounded-full flex items-center justify-center text-cinematic-purple hover:text-white hover:bg-cinematic-purple/20 transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 glass w-12 h-12 rounded-full flex items-center justify-center text-cinematic-purple hover:text-white hover:bg-cinematic-purple/20 transition-all duration-300"
          >
            <ChevronRight size={24} />
          </motion.button>

          {/* Carousel Container */}
          <div
            ref={carouselRef}
            className="overflow-hidden rounded-3xl"
            style={{ height: "70vh" }}
          >
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex h-full"
            >
              {filteredThemes.map((theme, index) => (
                <div
                  key={theme.id}
                  className="w-full flex-shrink-0 relative cursor-pointer"
                  onMouseEnter={() => setHoveredTheme(theme.id)}
                  onMouseLeave={() => setHoveredTheme(null)}
                >
                  {/* Background Image */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${theme.image})` }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cinematic-midnight/90 via-transparent to-cinematic-midnight/20" />

                  {/* Content */}
                  <div className="relative h-full flex items-end p-8 md:p-12">
                    <div className="max-w-2xl">
                      {/* Tag */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-4 mb-4"
                      >
                        <span
                          className={`px-4 py-1 rounded-full text-sm font-semibold ${getTagColor(theme.tag)}`}
                        >
                          {theme.tag}
                        </span>
                        <div className="flex items-center gap-1 glass px-3 py-1 rounded-full">
                          <Star
                            className="text-cinematic-gold fill-current"
                            size={14}
                          />
                          <span className="text-white text-sm font-semibold">
                            {theme.rating}
                          </span>
                        </div>
                      </motion.div>

                      {/* Title and Price */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-end justify-between mb-6"
                      >
                        <div>
                          <h3 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
                            {theme.title}
                          </h3>
                          <p className="text-cinematic-gold text-lg">
                            {theme.category}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/60 text-sm">Starting from</p>
                          <p className="text-3xl font-bold text-cinematic-gold">
                            {theme.price}
                          </p>
                        </div>
                      </motion.div>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/80 text-lg mb-6 max-w-xl"
                      >
                        {theme.description}
                      </motion.p>

                      {/* Features */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap gap-3 mb-8"
                      >
                        {theme.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="glass px-4 py-2 rounded-full text-white/80 text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </motion.div>

                      {/* CTA Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex gap-4"
                      >
                        <motion.button
                          whileHover={{
                            scale: 1.05,
                            y: -2,
                            boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)",
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-cinematic-purple to-cinematic-gold text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2"
                        >
                          <Eye size={18} />
                          Quick View
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="glass text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-white/20"
                        >
                          <Heart size={18} />
                          Save Theme
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <AnimatePresence>
                    {hoveredTheme === theme.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-cinematic-purple/30 to-transparent pointer-events-none"
                      />
                    )}
                  </AnimatePresence>

                  {/* Floating Sparkles on Hover */}
                  <AnimatePresence>
                    {hoveredTheme === theme.id && (
                      <>
                        {Array.from({ length: 6 }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                              y: [0, -50],
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{
                              duration: 2,
                              delay: i * 0.2,
                              repeat: Infinity,
                            }}
                            className="absolute pointer-events-none"
                            style={{
                              left: `${20 + Math.random() * 60}%`,
                              top: `${20 + Math.random() * 60}%`,
                            }}
                          >
                            <Sparkles
                              className="text-cinematic-gold"
                              size={16}
                            />
                          </motion.div>
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {filteredThemes.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-cinematic-purple to-cinematic-gold scale-125"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
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
            Create Your Custom Theme
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
