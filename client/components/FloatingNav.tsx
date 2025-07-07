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
      {/* Smart Search Modal */}
      <SmartSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Top Tier Navbar - Deep Black */}
      <NavbarEntranceAnimation delay={0}>
        <ContextAwareNav>
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
                  <AnimatedLogo size="sm" />
                  <span className="text-white font-bold ml-2">Arsh Events</span>
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center gap-4 ml-auto">
                  {/* Search Icon with Magnetic Effect */}
                  <motion.button
                    ref={searchButtonMagnetic.ref}
                    style={{
                      x: searchButtonMagnetic.x,
                      y: searchButtonMagnetic.y,
                    }}
                    onClick={() => setIsSearchOpen(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-300 hover:text-cinematic-gold transition-colors p-1 relative group"
                  >
                    <Search size={16} />
                    <div className="absolute inset-0 bg-cinematic-gold/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-1" />
                  </motion.button>

                  <NavDivider />

                  {/* Dark Mode Toggle */}
                  <motion.button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-300 hover:text-cinematic-gold transition-colors p-1"
                  >
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                  </motion.button>

                  <NavDivider />

                  {/* Login / Sign-up */}
                  <div className="hidden sm:flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <User size={16} />
                      <span>LOGIN</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <UserPlus size={16} />
                      <span>SIGN-UP</span>
                    </motion.button>
                  </div>

                  <NavDivider className="hidden md:block" />

                  {/* Language Switcher */}
                  <div className="hidden md:block">
                    <LanguageSwitcher />
                  </div>

                  {/* Mobile Menu Toggle */}
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="md:hidden text-gray-300 hover:text-white transition-colors p-1"
                  >
                    {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </ContextAwareNav>
      </NavbarEntranceAnimation>

      {/* Second Tier Navbar - Charcoal Grey with Dynamic Pattern */}
      <NavbarEntranceAnimation delay={0.1}>
        <ContextAwareNav>
          <motion.div
            variants={{
              visible: { y: 0, opacity: 1 },
              hidden: { y: -100, opacity: 0 },
            }}
            animate={isHidden ? "hidden" : "visible"}
            initial={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
            className="fixed top-12 w-full bg-gray-800 z-40 border-b border-gray-700"
          >
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between h-16">
                {/* Logo with Enhanced Animation */}
                <div className="flex items-center">
                  <div className="flex items-center gap-3">
                    <AnimatedLogo size="md" onHover={true} />
                    <div>
                      <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-2xl font-bold text-white relative"
                        style={{ fontFamily: "Cinzel Decorative, serif" }}
                      >
                        Arsh Events
                        <motion.div
                          animate={{
                            scaleX: [0, 1, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 5,
                            ease: "easeInOut",
                          }}
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cinematic-gold to-cinematic-rose origin-left"
                        />
                      </motion.h1>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-xs text-cinematic-gold font-signature"
                      >
                        Legendary Celebrations
                      </motion.p>
                    </div>
                  </div>
                </div>

                {/* Desktop Navigation with Enhanced Effects */}
                <nav className="hidden md:flex items-center space-x-1">
                  {navItems.map((item, index) => (
                    <NavItemEntrance key={item.label} index={index}>
                      {item.hasDropdown ? (
                        <EnhancedDropdown
                          trigger={
                            <motion.div
                              whileHover={{ y: -2 }}
                              className="group relative text-white hover:text-cinematic-gold transition-all duration-300 font-medium flex items-center gap-1 px-4 py-2 rounded-lg"
                            >
                              <span>{item.label}</span>
                              <ChevronDown size={14} />
                              <div className="absolute inset-0 bg-cinematic-gold/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                          }
                          items={
                            item.label === "Themes & Décor"
                              ? themeItems
                              : item.label === "Events We Plan"
                                ? eventPlanItems
                                : venueItems
                          }
                          onSelect={(selected) =>
                            console.log("Selected:", selected)
                          }
                        />
                      ) : (
                        <motion.a
                          href={item.href}
                          whileHover={{ y: -2 }}
                          className="group relative text-white hover:text-cinematic-gold transition-all duration-300 font-medium flex items-center gap-1 px-4 py-2 rounded-lg"
                        >
                          <span>{item.label}</span>
                          <div className="absolute inset-0 bg-cinematic-gold/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.a>
                      )}

                      {/* Decorative divider between nav items */}
                      {index < navItems.length - 1 && <NavDivider />}
                    </NavItemEntrance>
                  ))}
                </nav>
              </div>
            </div>

            {/* Decorative divider at bottom */}
            <div className="container mx-auto px-4 sm:px-6">
              <DecorativeDivider type="line" size="sm" />
            </div>
          </motion.div>
        </ContextAwareNav>
      </NavbarEntranceAnimation>

      {/* Third Tier - Enhanced Booking Bar with Glassmorphism */}
      <NavbarEntranceAnimation delay={0.2}>
        <motion.div
          variants={{
            visible: { y: 0, opacity: 1 },
            hidden: { y: -100, opacity: 0 },
          }}
          animate={isHidden ? "hidden" : "visible"}
          initial={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
          className="fixed top-28 w-full z-30"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <GlassDropdown className="mx-auto max-w-4xl">
              <div className="flex items-center justify-center h-14 gap-4 px-6">
                {/* City Selector with Glass Effect */}
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="glass text-white border border-white/20 rounded-xl px-4 py-2 pr-8 appearance-none cursor-pointer hover:bg-white/10 transition-all duration-300 min-w-40 backdrop-blur-md"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <option disabled className="bg-gray-800">
                      Select Your City
                    </option>
                    {cities.map((city) => (
                      <option key={city} value={city} className="bg-gray-800">
                        {city}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 pointer-events-none"
                    size={16}
                  />
                </div>

                {/* Event Type Selector with Glass Effect */}
                <div className="relative">
                  <select
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className="glass text-white border border-white/20 rounded-xl px-4 py-2 pr-8 appearance-none cursor-pointer hover:bg-white/10 transition-all duration-300 min-w-40 backdrop-blur-md"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <option disabled className="bg-gray-800">
                      Select Event Type
                    </option>
                    {eventTypes.map((event) => (
                      <option key={event} value={event} className="bg-gray-800">
                        {event}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 pointer-events-none"
                    size={16}
                  />
                </div>

                {/* Enhanced Book Now Button with Magnetic Effect */}
                <motion.button
                  ref={bookingButtonMagnetic.ref}
                  style={{
                    x: bookingButtonMagnetic.x,
                    y: bookingButtonMagnetic.y,
                  }}
                  onClick={onOpenBooking}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 8px 30px rgba(236, 72, 153, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cinematic-purple via-pink-500 to-cinematic-gold text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg relative overflow-hidden group"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 3,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                  />
                  <span className="relative z-10">✨ Book Now</span>
                </motion.button>
              </div>
            </GlassDropdown>
          </div>

          {/* Curved transition to hero */}
          <div className="relative">
            <svg
              viewBox="0 0 1200 120"
              className="w-full h-8 text-gray-800/50"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0,50 Q600,120 1200,50 L1200,120 L0,120 Z"
                fill="currentColor"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </motion.div>
      </NavbarEntranceAnimation>

      {/* Enhanced Mobile Menu */}
      <EnhancedMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenContact={onOpenContact}
        onOpenBooking={onOpenBooking}
      />

      {/* Spacer to prevent content overlap */}
      <div className="h-42" />
    </>
  );
}
