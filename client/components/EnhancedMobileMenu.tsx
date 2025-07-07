import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  X,
  Home,
  Calendar,
  Palette,
  MapPin,
  Gift,
  Camera,
  Phone,
  User,
  UserPlus,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
} from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";

interface EnhancedMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
  onOpenBooking: () => void;
}

const navItems = [
  { label: "Home", href: "#home", icon: Home, color: "text-blue-400" },
  {
    label: "Events We Plan",
    href: "#services",
    icon: Calendar,
    color: "text-purple-400",
  },
  {
    label: "Themes & Décor",
    href: "#themes",
    icon: Palette,
    color: "text-pink-400",
  },
  { label: "Venues", href: "#venues", icon: MapPin, color: "text-green-400" },
  { label: "Offers", href: "#offers", icon: Gift, color: "text-yellow-400" },
  { label: "Gallery", href: "#gallery", icon: Camera, color: "text-red-400" },
  { label: "Contact", href: "#contact", icon: Phone, color: "text-cyan-400" },
];

const socialLinks = [
  { platform: "Instagram", icon: Instagram, url: "#", color: "text-pink-400" },
  { platform: "Facebook", icon: Facebook, url: "#", color: "text-blue-400" },
  { platform: "Twitter", icon: Twitter, url: "#", color: "text-cyan-400" },
  { platform: "YouTube", icon: Youtube, url: "#", color: "text-red-400" },
];

const instagramPosts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=150&h=150&fit=crop",
    alt: "Wedding decoration",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=150&h=150&fit=crop",
    alt: "Birthday party",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=150&h=150&fit=crop",
    alt: "Corporate event",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=150&h=150&fit=crop",
    alt: "Engagement setup",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&h=150&fit=crop",
    alt: "Party decorations",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=150&h=150&fit=crop",
    alt: "Event setup",
  },
];

export default function EnhancedMobileMenu({
  isOpen,
  onClose,
  onOpenContact,
  onOpenBooking,
}: EnhancedMobileMenuProps) {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (href: string, label: string) => {
    setActiveSection(label.toLowerCase().replace(/\s+/g, ""));
    onClose();

    // Smooth scroll to section
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-gradient-to-br from-gray-900 via-gray-800 to-black z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-md border-b border-gray-700 z-10">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-3">
                  <AnimatedLogo size="sm" autoAnimate={false} />
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Arsh Events
                    </h2>
                    <p className="text-xs text-gray-400">
                      Legendary Celebrations
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X size={24} className="text-white" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Navigation
                </h3>
                <nav className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      onClick={() => handleNavClick(item.href, item.label)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      whileHover={{ x: 5 }}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${
                        activeSection ===
                        item.label.toLowerCase().replace(/\s+/g, "")
                          ? "bg-cinematic-gold/10 text-cinematic-gold"
                          : "text-white hover:bg-gray-800/50"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg bg-gray-800 group-hover:bg-gray-700 transition-colors ${item.color}`}
                      >
                        <item.icon size={18} />
                      </div>
                      <span className="font-medium">{item.label}</span>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{
                          scale:
                            activeSection ===
                            item.label.toLowerCase().replace(/\s+/g, "")
                              ? 1
                              : 0,
                        }}
                        className="ml-auto w-2 h-2 bg-cinematic-gold rounded-full"
                      />
                    </motion.button>
                  ))}
                </nav>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <motion.button
                  onClick={() => {
                    onOpenBooking();
                    onClose();
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-cinematic-purple to-cinematic-gold text-white py-4 rounded-xl font-semibold shadow-lg"
                >
                  Plan My Event
                </motion.button>

                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    <User size={18} />
                    <span className="text-sm font-medium">Login</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    <UserPlus size={18} />
                    <span className="text-sm font-medium">Sign Up</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Instagram Feed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Latest from Instagram
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {instagramPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="aspect-square rounded-lg overflow-hidden bg-gray-800 cursor-pointer relative group"
                    >
                      <img
                        src={post.image}
                        alt={post.alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Instagram size={20} className="text-white" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.platform}
                      href={social.url}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors ${social.color}`}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-4 border border-gray-700"
              >
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Get in Touch
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>📞 +91 98765 43210</p>
                  <p>📧 hello@arshevents.com</p>
                  <p>📍 Guntur, Hyderabad, Vijayawada</p>
                </div>
                <motion.button
                  onClick={() => {
                    onOpenContact();
                    onClose();
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-3 bg-cinematic-gold text-black py-2 rounded-lg font-medium"
                >
                  Contact Us
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
