import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface MainNavbarProps {
  onOpenContact: () => void;
  onOpenBooking: () => void;
}

export default function MainNavbar({
  onOpenContact,
  onOpenBooking,
}: MainNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Cities", href: "#cities" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact", onClick: onOpenContact },
  ];

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="fixed top-20 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-luxury-silver/30"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={item.onClick}
                whileHover={{ y: -2 }}
                className="text-gray-700 hover:text-luxury-purple transition-all duration-300 font-brand font-medium relative group cursor-pointer"
              >
                {item.label}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-luxury-purple to-luxury-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.a>
            ))}
          </nav>

          {/* Book Now CTA */}
          <motion.button
            onClick={onOpenBooking}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-gradient-to-r from-luxury-purple to-luxury-gold text-white px-6 py-3 rounded-full font-brand font-semibold animate-pulse-glow hover:shadow-xl transition-all duration-300"
          >
            Book Now
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-luxury-purple hover:text-luxury-gold transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-luxury-silver/30"
          >
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    item.onClick?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-luxury-purple transition-colors font-brand font-medium cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  onOpenBooking();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-gradient-to-r from-luxury-purple to-luxury-gold text-white px-6 py-3 rounded-full font-brand font-semibold w-full"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
