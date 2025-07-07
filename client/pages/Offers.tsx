import { motion } from "framer-motion";
import { ArrowLeft, Gift, Percent, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import FloatingNav from "../components/FloatingNav";
import ContactModal from "../components/ContactModal";
import BookingFormModal from "../components/BookingFormModal";

const offers = [
  {
    id: 1,
    title: "Early Bird Special",
    subtitle: "Book 3 Months in Advance",
    discount: "25% OFF",
    description:
      "Save big when you plan ahead! Perfect for couples who want to secure their dream venue.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
    validUntil: "Valid until March 2025",
    minSpend: "₹2,00,000",
    category: "Wedding",
    features: [
      "Free decoration upgrade",
      "Complimentary photoshoot",
      "Priority venue selection",
    ],
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 2,
    title: "Weekend Warrior",
    subtitle: "Friday to Sunday Events",
    discount: "15% OFF",
    description:
      "Exclusive weekend package for busy professionals. Make your celebration memorable.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop",
    validUntil: "Valid for all weekends",
    minSpend: "₹1,50,000",
    category: "Corporate",
    features: [
      "Extended event hours",
      "Premium AV equipment",
      "Corporate branding",
    ],
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 3,
    title: "Birthday Bonanza",
    subtitle: "Special Birthday Package",
    discount: "30% OFF",
    description:
      "Make birthdays extra special with our comprehensive party package.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
    validUntil: "Valid throughout the year",
    minSpend: "₹50,000",
    category: "Birthday",
    features: [
      "Custom theme decoration",
      "Birthday cake included",
      "Entertainment activities",
    ],
    color: "from-purple-500 to-pink-600",
  },
];

export default function Offers() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Navigation */}
      <FloatingNav
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenBooking={() => setIsBookingModalOpen(true)}
      />

      <div>
        {/* Hero Section */}
        <section className="pt-36 pb-1 bg-gradient-to-br from-background to-muted/20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto mb-16"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
              >
                <ArrowLeft size={20} />
                <span>Back to Home</span>
              </Link>

              <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-6">
                Exclusive
                <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Offers & Packages
                </span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Take advantage of our special offers and make your dream event
                more affordable. Limited time deals for weddings, birthdays, and
                corporate events.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Offers Grid */}
        <section className="py-20 -mt-px">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {offers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border relative">
                    {/* Discount Badge */}
                    <div className="absolute top-6 right-6 z-10">
                      <div
                        className={`bg-gradient-to-r ${offer.color} text-white px-4 py-2 rounded-full font-bold text-lg`}
                      >
                        {offer.discount}
                      </div>
                    </div>

                    {/* Offer Image */}
                    <div className="relative h-64 overflow-hidden">
                      <motion.img
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-6 left-6 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {offer.category}
                      </div>

                      {/* Title Overlay */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {offer.title}
                        </h3>
                        <p className="text-white/80 font-signature">
                          {offer.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Offer Content */}
                    <div className="p-8">
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {offer.description}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">
                          What's Included
                        </h4>
                        <div className="space-y-2">
                          {offer.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Star
                                className="text-primary fill-current"
                                size={14}
                              />
                              <span className="text-muted-foreground text-sm">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Offer Details */}
                      <div className="bg-muted/30 rounded-xl p-4 mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="text-primary" size={16} />
                          <span className="text-sm font-medium text-foreground">
                            {offer.validUntil}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Percent className="text-primary" size={16} />
                          <span className="text-sm text-muted-foreground">
                            Minimum spend: {offer.minSpend}
                          </span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsBookingModalOpen(true)}
                        className={`w-full bg-gradient-to-r ${offer.color} text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                      >
                        Claim This Offer
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Don't Miss Out on These Limited Offers!
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Contact us today to learn more about our exclusive packages and
                secure your event date.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsContactModalOpen(true)}
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Contact Us Now
                </motion.button>
                <motion.a
                  href="tel:+918919836337"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-2xl font-semibold transition-all duration-300"
                >
                  Call +91 89198 36337
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

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
