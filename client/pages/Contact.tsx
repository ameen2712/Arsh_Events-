import { motion } from "framer-motion";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  Calendar,
  Heart,
  CheckCircle,
  Star,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import FloatingNav from "../components/FloatingNav";
import ContactModal from "../components/ContactModal";
import BookingFormModal from "../components/BookingFormModal";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  message: string;
}

const initialForm: ContactForm = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  message: "",
};

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    subtitle: "Speak with our event planners",
    value: "+91 89198 36337",
    action: "tel:+918919836337",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Mail,
    title: "Email Us",
    subtitle: "Get detailed proposals",
    value: "hello@arshevents.com",
    action: "mailto:hello@arshevents.com",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    subtitle: "Our planning studios",
    value: "Hyderabad • Guntur • Vijayawada",
    action: "#",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: Clock,
    title: "Working Hours",
    subtitle: "Always here for you",
    value: "24/7 Available",
    action: "#",
    color: "from-orange-500 to-red-600",
  },
];

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    url: "https://instagram.com/arshevents",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: Facebook,
    label: "Facebook",
    url: "https://facebook.com/arshevents",
    color: "from-blue-600 to-blue-700",
  },
  {
    icon: Twitter,
    label: "Twitter",
    url: "https://twitter.com/arshevents",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Youtube,
    label: "YouTube",
    url: "https://youtube.com/arshevents",
    color: "from-red-500 to-red-600",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    url: "https://linkedin.com/company/arshevents",
    color: "from-blue-700 to-blue-800",
  },
];

const eventTypes = [
  "Wedding Ceremony",
  "Birthday Celebration",
  "Corporate Event",
  "Engagement Party",
  "Anniversary",
  "Baby Shower",
  "Other",
];

const testimonials = [
  {
    name: "Priya & Rajesh",
    event: "Wedding",
    rating: 5,
    text: "Arsh Events made our dream wedding come true! Every detail was perfect.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Vikram Industries",
    event: "Corporate Gala",
    rating: 5,
    text: "Professional service and flawless execution. Highly recommended!",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Anita Sharma",
    event: "Birthday Party",
    rating: 5,
    text: "My daughter's birthday was magical thanks to the amazing team at Arsh Events.",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b3e4?w=150&h=150&fit=crop&crop=face",
  },
];

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setForm(initialForm);

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const openWhatsApp = () => {
    const message =
      encodeURIComponent(`Hi! I'm interested in planning an event. Here are my details:
Name: ${form.name || "Not provided"}
Event Type: ${form.eventType || "Not specified"}
Date: ${form.eventDate || "Not specified"}
Message: ${form.message || "Please contact me for more details"}`);

    window.open(`https://wa.me/918919836337?text=${message}`, "_blank");
  };

  return (
    <>
      <FloatingNav
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenBooking={() => setIsBookingModalOpen(true)}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pt-36 pb-16 px-4 text-center bg-gradient-to-b from-background to-background/50"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Let's Create Magic
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ready to bring your dream event to life? Connect with our expert
              team and let's start planning something extraordinary together.
            </p>
          </motion.div>
        </motion.section>

        {/* Contact Methods */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="px-4 mb-20"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group relative"
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-300"
                      style={{
                        backgroundImage: `linear-gradient(135deg, var(--primary), var(--primary-foreground))`,
                      }}
                    />

                    <div className="relative bg-card border border-border rounded-2xl p-6 text-center h-full">
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-card-foreground mb-2">
                        {info.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {info.subtitle}
                      </p>

                      {info.action === "#" ? (
                        <p className="text-primary font-medium">{info.value}</p>
                      ) : (
                        <a
                          href={info.action}
                          className="text-primary font-medium hover:underline transition-all"
                        >
                          {info.value}
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Contact Form & Map */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="px-4 mb-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card border border-border rounded-3xl p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-card-foreground mb-4">
                    Send Us a Message
                  </h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24
                    hours with a detailed proposal.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <User className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        required
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        required
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <Phone className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="relative">
                      <Heart className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                      <select
                        name="eventType"
                        value={form.eventType}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
                      >
                        <option value="">Select Event Type</option>
                        {eventTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="relative">
                    <Calendar className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                    <input
                      type="date"
                      name="eventDate"
                      value={form.eventDate}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your dream event..."
                      rows={4}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-3 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={openWhatsApp}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-green-600 text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-3 hover:bg-green-700 transition-all"
                    >
                      <MessageSquare className="w-5 h-5" />
                      WhatsApp
                    </motion.button>
                  </div>

                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-xl"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Message sent successfully! We'll get back to you soon.
                    </motion.div>
                  )}
                </form>
              </div>

              {/* Map & Testimonials */}
              <div className="space-y-8">
                {/* Map */}
                <div className="bg-card border border-border rounded-3xl overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-card-foreground mb-2">
                        Our Locations
                      </h3>
                      <p className="text-muted-foreground">
                        Hyderabad • Guntur • Vijayawada
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Testimonials */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    What Our Clients Say
                  </h3>
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 * index }}
                      className="bg-card border border-border rounded-2xl p-6"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-card-foreground">
                              {testimonial.name}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              • {testimonial.event}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.text}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Social Media */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="px-4 pb-20"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Follow Our Journey
            </h2>
            <p className="text-muted-foreground mb-8">
              Stay connected with us on social media for the latest updates,
              behind-the-scenes content, and inspiration.
            </p>

            <div className="flex justify-center gap-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all`}
                  >
                    <Icon className="w-7 h-7" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.section>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      <BookingFormModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
