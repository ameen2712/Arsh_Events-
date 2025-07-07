import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Play, Sparkles, Heart, Star } from "lucide-react";
import { useRef } from "react";

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export default function HeroSection({ onOpenBooking }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40"
    >
      {/* Background Video/Image with Parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-br from-cinematic-midnight/90 via-cinematic-purple/70 to-cinematic-gold/60"
        />

        {/* Hero Background Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop&crop=center')",
          }}
        />

        {/* Animated Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinematic-midnight/80 via-transparent to-cinematic-midnight/40" />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -100],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute rounded-full bg-gradient-to-r from-cinematic-purple to-cinematic-gold"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white leading-tight mb-8"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          We don't just <span className="text-shimmer">plan events</span>
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-4xl md:text-6xl lg:text-7xl text-cinematic-gold"
          >
            we design{" "}
            <span className="relative">
              legendary
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cinematic-purple to-cinematic-gold rounded-full"
              />
            </span>{" "}
            moments
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Where dreams transform into cinematic celebrations across{" "}
          <span className="text-cinematic-gold">Guntur</span>,{" "}
          <span className="text-cinematic-gold">Vijayawada</span>, and{" "}
          <span className="text-cinematic-gold">Hyderabad</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.button
            onClick={onOpenBooking}
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden bg-gradient-to-r from-cinematic-purple to-cinematic-gold text-white px-12 py-4 rounded-full font-semibold text-lg"
          >
            <motion.div className="absolute inset-0 bg-gradient-to-r from-cinematic-gold to-cinematic-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-3">
              <Sparkles size={20} />
              Explore Our Magic
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group glass px-8 py-4 rounded-full text-white font-semibold text-lg flex items-center gap-3 hover:bg-white/20 transition-all duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
            >
              <Play size={16} className="ml-1" />
            </motion.div>
            Watch Our Story
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-white/20"
        >
          {[
            { number: "500+", label: "Dream Events", icon: Heart },
            { number: "3", label: "Cities", icon: Sparkles },
            { number: "98%", label: "Happy Couples", icon: Star },
            { number: "5★", label: "Average Rating", icon: Star },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-2">
                <stat.icon className="text-cinematic-gold mr-2" size={20} />
                <span className="text-3xl font-bold text-white">
                  {stat.number}
                </span>
              </div>
              <span className="text-white/60 text-sm">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-sm font-medium tracking-wider">
            Discover More
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center pt-2"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              className="w-1 h-3 bg-gradient-to-b from-cinematic-purple to-cinematic-gold rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
