import { useState } from "react";
import BrandNavbar from "../components/BrandNavbar";
import MainNavbar from "../components/MainNavbar";
import HeroQuoteSection from "../components/HeroQuoteSection";
import CityCards from "../components/CityCards";
import EventSection from "../components/EventSection";
import ContactModal from "../components/ContactModal";
import BookingFormModal from "../components/BookingFormModal";
import Footer from "../components/Footer";

export default function Index() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <BrandNavbar />
      <MainNavbar
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenBooking={() => setIsBookingModalOpen(true)}
      />

      {/* Main Content */}
      <main>
        <section id="home">
          <HeroQuoteSection />
        </section>

        <section id="cities">
          <CityCards />
        </section>

        <section id="services">
          <EventSection />
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
    </div>
  );
}
