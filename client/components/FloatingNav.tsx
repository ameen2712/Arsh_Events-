import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Search,
  User,
  UserPlus,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
import SmartSearchModal from "./SmartSearchModal";
import LanguageSwitcher from "./LanguageSwitcher";
import { DecorativeDivider, NavDivider } from "./DecorativeDividers";
import { useMagneticHover } from "../hooks/useMagneticHover";
import ContextAwareNav from "./ContextAwareNav";
import { EnhancedDropdown, themePreviewData } from "./LivePreviewTooltip";
import { GlassDropdown } from "./EnhancedGlass";
import EnhancedMobileMenu from "./EnhancedMobileMenu";
import { NavbarEntranceAnimation, NavItemEntrance } from "./PageLoadAnimation";

interface FloatingNavProps {
  onOpenContact: () => void;
  onOpenBooking: () => void;
}

export default function FloatingNav({
  onOpenContact,
  onOpenBooking,
}: FloatingNavProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Select Your City");
  const [selectedEvent, setSelectedEvent] = useState("Select Event Type");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { scrollY } = useScroll();

  // Magnetic hover effects
  const bookingButtonMagnetic = useMagneticHover({ strength: 0.3 });
  const searchButtonMagnetic = useMagneticHover({ strength: 0.2 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsHidden(latest > previous && latest > 150);
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
    { label: "Events We Plan", href: "#services", hasDropdown: true },
    { label: "Themes & Décor", href: "#themes", hasDropdown: true },
    { label: "Venues", href: "#venues", hasDropdown: true },
    { label: "Offers", href: "#offers" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact Us", href: "#contact" },
  ];

  const cities = ["Guntur", "Hyderabad", "Vijayawada"];
  const eventTypes = ["Birthday", "Marriage", "Corporate", "Engagement"];

  const themeItems = [
    { id: "luxury", label: "Luxury Royal", previewKey: "luxury" },
    { id: "vintage", label: "Vintage Rustic", previewKey: "vintage" },
    { id: "modern", label: "Contemporary Modern", previewKey: "modern" },
    { id: "garden", label: "Garden Paradise", previewKey: "garden" },
    { id: "beach", label: "Coastal Elegance", previewKey: "beach" },
  ];

  const eventPlanItems = [
    { id: "wedding", label: "Wedding Ceremonies" },
    { id: "corporate", label: "Corporate Events" },
    { id: "birthday", label: "Birthday Celebrations" },
    { id: "engagement", label: "Engagement Parties" },
    { id: "anniversary", label: "Anniversary Celebrations" },
  ];

  const venueItems = [
    { id: "hotels", label: "Luxury Hotels" },
    { id: "banquet", label: "Banquet Halls" },
    { id: "outdoor", label: "Outdoor Venues" },
    { id: "beach", label: "Beachfront Locations" },
    { id: "heritage", label: "Heritage Properties" },
  ];

  return (
    <>
      {/* Top Tier Navbar - Deep Black */}
      <motion.div
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={isHidden ? "hidden" : "visible"}
        initial={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 w-full bg-black z-50 border-b border-gray-800"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-12 text-sm">
            {/* Left side - Logo for mobile */}
            <div className="flex items-center md:hidden">
              <span className="text-white font-bold">Arsh Events</span>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-4 ml-auto">
              {/* Search Icon */}
              <button className="text-gray-300 hover:text-white transition-colors p-1">
                <Search size={16} />
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="text-gray-300 hover:text-white transition-colors p-1"
              >
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Login / Sign-up */}
              <div className="hidden sm:flex items-center gap-3">
                <button className="text-gray-300 hover:text-white transition-colors flex items-center gap-1">
                  <User size={16} />
                  <span>LOGIN</span>
                </button>
                <button className="text-gray-300 hover:text-white transition-colors flex items-center gap-1">
                  <UserPlus size={16} />
                  <span>SIGN-UP</span>
                </button>
              </div>

              {/* Country Selector */}
              <div className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer">
                <span className="text-lg">🇮🇳</span>
                <span className="text-xs">UAE</span>
                <ChevronDown size={14} />
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-300 hover:text-white transition-colors p-1"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Second Tier Navbar - Charcoal Grey with Pattern */}
      <motion.div
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={isHidden ? "hidden" : "visible"}
        initial={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
        className="fixed top-12 w-full bg-gray-800 z-40 border-b border-gray-700"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                  <span className="text-black font-black text-lg">A</span>
                </div>
                <div>
                  <h1
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "Cinzel Decorative, serif" }}
                  >
                    Arsh Events
                  </h1>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative text-white hover:text-yellow-400 transition-all duration-300 font-medium flex items-center gap-1"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && <ChevronDown size={14} />}

                  {/* Hover Effect */}
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-yellow-400/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-2 -my-1" />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </motion.div>

      {/* Third Tier - Event Booking Bar */}
      <motion.div
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={isHidden ? "hidden" : "visible"}
        initial={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
        className="fixed top-28 w-full bg-gray-700/95 backdrop-blur-sm z-30 border-b border-gray-600"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center h-14 gap-4">
            {/* City Selector */}
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-gray-600 text-white border border-gray-500 rounded-lg px-4 py-2 pr-8 appearance-none cursor-pointer hover:bg-gray-500 transition-colors min-w-40"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <option disabled>Select Your City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 pointer-events-none"
                size={16}
              />
            </div>

            {/* Event Type Selector */}
            <div className="relative">
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="bg-gray-600 text-white border border-gray-500 rounded-lg px-4 py-2 pr-8 appearance-none cursor-pointer hover:bg-gray-500 transition-colors min-w-40"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <option disabled>Select Event Type</option>
                {eventTypes.map((event) => (
                  <option key={event} value={event}>
                    {event}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 pointer-events-none"
                size={16}
              />
            </div>

            {/* Book Now Button */}
            <motion.button
              onClick={onOpenBooking}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed right-0 top-0 h-full w-80 bg-gray-900 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Mobile Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 px-4 text-white hover:text-yellow-400 hover:bg-gray-800 rounded-lg transition-all duration-300"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="mt-8 pt-8 border-t border-gray-700 space-y-4">
                <button className="w-full text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300">
                  Login
                </button>
                <button className="w-full text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300">
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    onOpenContact();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-semibold"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Spacer to prevent content overlap */}
      <div className="h-42" />
    </>
  );
}
