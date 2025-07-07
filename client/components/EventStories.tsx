import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Gift, Sparkles, Crown, Users, Calendar } from "lucide-react";
import { useRef } from "react";

interface EventType {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  bgGradient: string;
  icon: React.ReactNode;
  priceRange: string;
  features: string[];
  color: string;
  textColor: string;
}

const eventTypes: EventType[] = [
  {
    title: "Weddings",
    subtitle: "Where Two Hearts Become One",
    description:
      "Craft your perfect love story with cinematic elegance, from intimate ceremonies to grand celebrations that echo through generations.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&crop=center",
    bgGradient: "from-cinematic-gold/20 via-amber-50 to-cinematic-rose/20",
    icon: <Heart className="text-cinematic-gold" size={32} />,
    priceRange: "₹2.5L - ₹25L",
    features: [
      "Destination Planning",
      "Traditional Ceremonies",
      "Photography & Videography",
      "Catering & Hospitality",
    ],
    color: "cinematic-gold",
    textColor: "text-amber-900",
  },
  {
    title: "Birthdays",
    subtitle: "Celebrating Life's Special Moments",
    description:
      "Transform birthdays into magical experiences with playful themes, surprise elements, and joyful celebrations that create lasting memories.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop&crop=center",
    bgGradient: "from-cinematic-purple/20 via-purple-50 to-cinematic-blush/20",
    icon: <Gift className="text-cinematic-purple" size={32} />,
    priceRange: "₹15K - ₹2L",
    features: [
      "Theme Decorations",
      "Entertainment Shows",
      "Custom Cakes",
      "Fun Activities",
    ],
    color: "cinematic-purple",
    textColor: "text-purple-900",
  },
  {
    title: "Engagements",
    subtitle: "The Beginning of Forever",
    description:
      "Mark the start of your journey with intimate, romantic celebrations that capture the essence of your love and commitment.",
    image:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&h=600&fit=crop&crop=center",
    bgGradient: "from-cinematic-rose/20 via-rose-50 to-cinematic-blush/20",
    icon: <Sparkles className="text-cinematic-rose" size={32} />,
    priceRange: "₹50K - ₹5L",
    features: [
      "Romantic Setups",
      "Ring Ceremonies",
      "Intimate Dining",
      "Photo Sessions",
    ],
    color: "cinematic-rose",
    textColor: "text-rose-900",
  },
  {
    title: "Premium Events",
    subtitle: "Luxury Beyond Imagination",
    description:
      "Exclusive, bespoke celebrations for discerning clients who demand nothing but the extraordinary in every detail.",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop&crop=center",
    bgGradient: "from-cinematic-midnight/20 via-slate-50 to-cinematic-sky/20",
    icon: <Crown className="text-cinematic-midnight" size={32} />,
    priceRange: "₹10L+",
    features: [
      "VIP Experiences",
      "Celebrity Performances",
      "Luxury Transportation",
      "Premium Hospitality",
    ],
    color: "cinematic-midnight",
    textColor: "text-slate-900",
  },
];

export default function EventStories() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={containerRef} className="py-32 overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-cinematic-purple to-cinematic-gold mx-auto mb-6 rounded-full"
          />

          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Every Event,
            <span className="block text-shimmer">A Unique Story</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how we transform ordinary moments into extraordinary
            experiences across every celebration
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        <div
          className="flex gap-8 overflow-x-auto scroll-smooth pb-4"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {eventTypes.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-[90vw] md:w-[70vw] lg:w-[60vw] relative"
              style={{ scrollSnapAlign: "start" }}
            >
              <div
                className={`relative min-h-[80vh] rounded-3xl overflow-hidden bg-gradient-to-br ${event.bgGradient} shadow-cinematic`}
              >
                {/* Background Image with Parallax */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <div
                    className="w-full h-full bg-cover bg-center opacity-40"
                    style={{ backgroundImage: `url(${event.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-white/40" />
                </motion.div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-8 md:p-12">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="glass p-4 rounded-2xl"
                    >
                      {event.icon}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className={`glass px-6 py-2 rounded-full ${event.textColor} font-semibold`}
                    >
                      {event.priceRange}
                    </motion.div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 flex flex-col justify-center max-w-2xl">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mb-6"
                    >
                      <h3
                        className={`text-5xl md:text-6xl font-heading font-bold ${event.textColor} mb-4`}
                      >
                        {event.title}
                      </h3>
                      <p className="text-2xl font-signature text-gray-600 mb-6">
                        {event.subtitle}
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {event.description}
                      </p>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="grid grid-cols-2 gap-4 mb-8"
                    >
                      {event.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + idx * 0.1 }}
                          className="flex items-center gap-3 glass px-4 py-3 rounded-xl"
                        >
                          <div
                            className={`w-2 h-2 bg-${event.color} rounded-full`}
                          />
                          <span className="text-gray-700 font-medium">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        boxShadow: `0 20px 40px hsl(var(--${event.color}) / 0.3)`,
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`bg-gradient-to-r from-${event.color} to-cinematic-gold text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg`}
                    >
                      Explore {event.title} Packages
                    </motion.button>
                  </div>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex items-center justify-center gap-8 pt-8 border-t border-gray-300/50"
                  >
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Calendar size={16} className={event.textColor} />
                        <span
                          className={`text-2xl font-bold ${event.textColor}`}
                        >
                          {index === 0
                            ? "200+"
                            : index === 1
                              ? "500+"
                              : index === 2
                                ? "150+"
                                : "50+"}
                        </span>
                      </div>
                      <span className="text-gray-600 text-sm">Events</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Users size={16} className={event.textColor} />
                        <span
                          className={`text-2xl font-bold ${event.textColor}`}
                        >
                          {index === 0
                            ? "2K+"
                            : index === 1
                              ? "5K+"
                              : index === 2
                                ? "800+"
                                : "200+"}
                        </span>
                      </div>
                      <span className="text-gray-600 text-sm">
                        Happy Clients
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-12"
      >
        <p className="text-muted-foreground mb-4">
          Scroll to explore more stories
        </p>
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex items-center gap-2 text-cinematic-purple"
        >
          <span>→</span>
          <span>→</span>
          <span>→</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
