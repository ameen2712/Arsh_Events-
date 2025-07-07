import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Sun, Moon } from "lucide-react";

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsHidden(latest > previous && latest > 150);
    setIsAtTop(latest < 50);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Cities", href: "#cities" },
    { label: "Themes", href: "#themes" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <>
      {/* Brand Navbar (Top Layer) */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 w-full z-50 flex justify-center"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-8 py-4 shadow-lg">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Sparkles className="text-white" size={20} />
            </div>

            {/* Brand Text */}
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                Arsh Events
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Legendary Moments
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation Navbar (Below Brand) */}
      <motion.div
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={isHidden ? "hidden" : "visible"}
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-20 w-full z-40 flex justify-center px-4 sm:px-6"
      >
        <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 sm:px-8 py-4 shadow-lg">
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-3 md:items-center md:gap-4">
            {/* Left - Contact Button */}
            <div className="flex justify-start">
              <button
                onClick={onOpenContact}
                className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full text-gray-700 dark:text-gray-300 transition-all duration-300 font-medium"
              >
                Contact
              </button>
            </div>

            {/* Center - Navigation Links */}
            <div className="flex items-center justify-center space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300 font-medium text-sm lg:text-base whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Right - Theme Toggle & Book Now */}
            <div className="flex items-center justify-end gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full text-gray-700 dark:text-gray-300 transition-all duration-300"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Book Now Button */}
              <button
                onClick={onOpenBooking}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 lg:px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg text-sm lg:text-base"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle Mobile */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full text-gray-700 dark:text-gray-300 transition-all duration-300"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                Menu
              </span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-gray-700 dark:text-gray-300 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="md:hidden fixed top-36 w-full z-30 flex justify-center px-4"
        >
          <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg">
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-white/10 rounded-lg transition-all duration-300 text-center font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Action Buttons */}
            <div className="pt-4 mt-4 border-t border-white/20 space-y-3">
              <button
                onClick={() => {
                  onOpenContact();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-lg text-gray-700 dark:text-gray-300 transition-all duration-300 font-medium"
              >
                Contact Us
              </button>

              <button
                onClick={() => {
                  onOpenBooking();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
