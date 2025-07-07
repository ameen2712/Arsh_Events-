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
import { Link } from "react-router-dom";

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
  const [isDarkMode, setIsDarkMode] = useState(true);
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
    { label: "Home", href: "/", isRoute: true },
    { label: "Events We Plan", href: "/services", isRoute: true },
    { label: "Themes & Décor", href: "/themes", isRoute: true },
    { label: "Venues", href: "/venues", isRoute: true },
    { label: "Offers", href: "/offers", isRoute: true },
    { label: "Gallery", href: "#gallery", isRoute: false },
    { label: "Contact Us", href: "#contact", isRoute: false },
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
            className="fixed top-0 w-full bg-background border-b border-border z-50"
          >
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between h-16 text-sm">
                {/* Left side spacer */}
                <div className="w-24"></div>

                {/* Center - Brand Logo (clickable for theme toggle) */}
                <motion.div
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <AnimatedLogo size="md" />
                  <div>
                    <h1
                      className="text-2xl font-bold text-foreground"
                      style={{ fontFamily: "Cinzel Decorative, serif" }}
                    >
                      Arsh Events
                    </h1>
                    <p className="text-xs text-primary font-signature">
                      Legendary Celebrations
                    </p>
                  </div>
                </motion.div>

                {/* Right side - Actions */}
                <div className="flex items-center gap-4">
                  {/* Dark Mode Toggle */}
                  <motion.button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-muted-foreground hover:text-primary transition-colors p-1 hidden md:block"
                  >
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                  </motion.button>

                  {/* Mobile Menu Toggle */}
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </ContextAwareNav>
      </NavbarEntranceAnimation>

      {/* Second Tier Navbar - Charcoal #1F2937 with Gold Pattern */}
      <motion.div
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={isHidden ? "hidden" : "visible"}
        initial={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
        className="fixed top-16 w-full bg-card z-40 border-b border-border"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='hsl(var(--primary))' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center h-16">
            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) =>
                item.isRoute ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="group relative text-card-foreground hover:text-primary transition-all duration-300 font-medium flex items-center gap-1"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <span>{item.label}</span>

                    {/* Primary color underline on hover */}
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-primary/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-2 -my-1" />
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group relative text-card-foreground hover:text-primary transition-all duration-300 font-medium flex items-center gap-1"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <span>{item.label}</span>

                    {/* Primary color underline on hover */}
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-primary/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-2 -my-1" />
                  </a>
                ),
              )}
            </nav>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Mobile Menu */}
      <EnhancedMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenContact={onOpenContact}
        onOpenBooking={onOpenBooking}
      />

      {/* Spacer to prevent content overlap - 144px total (64px + 80px) */}
      <div className="h-36" />
    </>
  );
}
