import { useState, useEffect } from "react";
import FloatingNav from "../components/FloatingNav";
import HeroSection from "../components/HeroSection";
import CityCards from "../components/CityCards";
import ContactModal from "../components/ContactModal";
import BookingFormModal from "../components/BookingFormModal";
import Footer from "../components/Footer";
import PageLoadAnimation from "../components/PageLoadAnimation";
import ScrollProgressGlow from "../components/ScrollProgressGlow";
import FloatingActionButton from "../components/FloatingActionButton";
import DynamicBackground from "../components/DynamicBackground";
import { BackgroundSparkles } from "../components/DecorativeDividers";
import ClientStories from "../components/ClientStories";
import { useLenis } from "../hooks/useLenis";

export default function Index() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(() => {
    // Only show loader on first visit in this session
    return !sessionStorage.getItem("hasVisited");
  });
  const [isLoaded, setIsLoaded] = useState(() => {
    // If already visited, mark as loaded immediately
    return !!sessionStorage.getItem("hasVisited");
  });

  // Initialize Lenis for smooth scrolling
  const { stop, start } = useLenis();

  // Handle modal scroll behavior
  useEffect(() => {
    if (isContactModalOpen || isBookingModalOpen) {
      // Stop Lenis when modal is open
      stop();
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Start Lenis when modal is closed
      start();
      // Restore body scroll
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isContactModalOpen, isBookingModalOpen, stop, start]);

  return (
    <>
      {/* Page Load Animation */}
      <PageLoadAnimation
        onComplete={() => {
          setIsLoading(false);
          setIsLoaded(true);
          sessionStorage.setItem("hasVisited", "true");
        }}
        showLoader={isLoading}
      />

      {isLoaded && (
        <div className="min-h-screen bg-background relative overflow-x-hidden">
          {/* Scroll Progress Glow */}
          <ScrollProgressGlow />

          {/* Dynamic Background Pattern */}
          <DynamicBackground pattern="geometric" intensity="medium" />

          {/* Background Sparkles */}
          <BackgroundSparkles />

          {/* Floating Navigation */}
          <FloatingNav
            onOpenContact={() => setIsContactModalOpen(true)}
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />

          {/* Floating Action Button */}
          <FloatingActionButton
            onBooking={() => setIsBookingModalOpen(true)}
            onContact={() => setIsContactModalOpen(true)}
          />

          {/* Main Content */}
          <main>
            {/* Hero Section */}
            <section id="home" className="relative">
              <HeroSection />
            </section>

            {/* Cities Section */}
            <section id="cities" className="relative" data-context="default">
              <CityCards />
            </section>

            {/* Client Stories Section */}
            <section
              id="testimonials"
              className="relative"
              data-context="corporate"
            >
              <ClientStories />
            </section>
          </main>

          {/* Footer */}
          <Footer />

          {/* Modals */}
          <ContactModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
          />
          <BookingFormModal
            isOpen={isBookingModalOpen}
            onClose={() => setIsBookingModalOpen(false)}
          />

          {/* Background Elements */}
          <div className="fixed inset-0 pointer-events-none z-0">
            {/* Floating Orbs */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`absolute w-64 h-64 rounded-full bg-gradient-to-br from-cinematic-purple/5 to-cinematic-gold/5 blur-3xl animate-float${i % 3 === 0 ? "" : i % 3 === 1 ? "-delayed" : ""}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 2}s`,
                  animationDuration: `${8 + i * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
