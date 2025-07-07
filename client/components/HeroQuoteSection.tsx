import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function HeroQuoteSection() {
  const sparkles = Array.from({ length: 12 }, (_, i) => i);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-luxury-blush/20 via-white to-luxury-peach/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {sparkles.map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Sparkles
              className="text-luxury-gold/30 animate-sparkle"
              size={16 + Math.random() * 16}
            />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-gray-800 leading-tight mb-8"
          >
            Because every moment{" "}
            <span className="bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent">
              matters
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-xl md:text-2xl lg:text-3xl font-body text-gray-600 mb-12 italic"
          >
            We craft dreams into unforgettable celebrations
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-luxury-purple to-luxury-gold text-white px-8 py-4 rounded-full font-brand font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
            >
              Start Planning Your Dream Event
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-luxury-purple text-luxury-purple px-8 py-4 rounded-full font-brand font-semibold text-lg hover:bg-luxury-purple hover:text-white transition-all duration-300"
            >
              View Our Portfolio
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-luxury-purple rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="w-1 h-3 bg-luxury-purple rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
