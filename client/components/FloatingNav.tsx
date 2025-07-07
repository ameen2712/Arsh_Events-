import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

interface FloatingNavProps {
  onOpenContact: () => void;
  onOpenBooking: () => void;
}

export default function FloatingNav({
  onOpenContact,
  onOpenBooking,
}: FloatingNavProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsHidden(latest > previous && latest > 150);
    setIsAtTop(latest < 50);
  });

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Cities", href: "#cities" },
    { label: "Themes", href: "#themes" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={isHidden ? "hidden" : "visible"}
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-6"
      >
        <div
          className={`glass rounded-2xl transition-all duration-500 ${
            isAtTop ? "bg-white/5 py-4" : "bg-white/10 py-4"
          } shadow-cinematic`}
        >
          <div className="flex items-center justify-between px-8">
            {/* Brand Logo Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4"
            >
              {/* Animated Logo */}
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-cinematic-purple to-cinematic-gold p-0.5"
                >
                  <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                    <Sparkles className="text-cinematic-purple" size={24} />
                  </div>
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-cinematic-purple/20 blur-md"
                />
              </div>

              {/* Brand Text */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-3xl font-signature font-bold text-shimmer"
                >
                  Arsh Events
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xs text-muted-foreground tracking-wider hidden md:block"
                >
                  Legendary Moments
                </motion.p>
              </div>
            </motion.div>

            {/* Desktop Navigation Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, staggerChildren: 0.1 }}
              className="hidden lg:flex items-center gap-8"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  href={item.href}
                  className="relative group"
                >
                  <span className="text-foreground/80 hover:text-cinematic-purple transition-all duration-300 font-medium text-lg">
                    {item.label}
                  </span>
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cinematic-purple to-cinematic-gold rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-cinematic-purple/5 rounded-lg -z-10 -mx-2 -my-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="hidden md:flex items-center gap-4"
            >
              <motion.button
                onClick={onOpenContact}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="glass px-6 py-3 rounded-full text-foreground/80 hover:text-cinematic-purple transition-all duration-300 font-medium"
              >
                Contact
              </motion.button>

              <motion.button
                onClick={onOpenBooking}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-gradient-to-r from-cinematic-purple to-cinematic-gold text-white px-8 py-3 rounded-full font-semibold"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cinematic-gold to-cinematic-purple opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative">Let's Create Magic</span>
              </motion.button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden glass p-3 rounded-full"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          scale: isMobileMenuOpen ? 1 : 0.95,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden fixed top-40 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-sm px-6"
      >
        <div className="glass rounded-2xl p-6 space-y-4">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : -20,
              }}
              transition={{ delay: index * 0.1 }}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 px-4 rounded-lg text-foreground/80 hover:text-cinematic-purple hover:bg-cinematic-purple/5 transition-all duration-300"
            >
              {item.label}
            </motion.a>
          ))}

          <div className="pt-4 space-y-3">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : 20,
              }}
              transition={{ delay: 0.3 }}
              onClick={() => {
                onOpenContact();
                setIsMobileMenuOpen(false);
              }}
              className="w-full glass py-3 rounded-lg text-foreground/80 hover:text-cinematic-purple transition-all duration-300"
            >
              Contact Us
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : 20,
              }}
              transition={{ delay: 0.4 }}
              onClick={() => {
                onOpenBooking();
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-cinematic-purple to-cinematic-gold text-white py-3 rounded-lg font-semibold"
            >
              Let's Create Magic
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
