import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Heart,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
    { icon: <Facebook size={20} />, href: "#", label: "Facebook" },
    { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
  ];

  const quickLinks = [
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Cities", href: "#cities" },
    { label: "Gallery", href: "#gallery" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  const services = [
    "Birthday Celebrations",
    "Wedding Ceremonies",
    "Corporate Events",
    "Engagement Parties",
    "Anniversary Celebrations",
    "Baby Showers",
  ];

  return (
    <footer className="relative bg-card border-t border-border overflow-hidden">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">
                  A
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-heading font-bold text-foreground">
                  Arsh Events
                </h3>
                <p className="text-xs text-primary font-signature">
                  Legendary Celebrations
                </p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Creating magical moments and unforgettable celebrations across
              Andhra Pradesh. Where dreams meet reality in perfect harmony.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-primary/10 hover:bg-primary text-muted-foreground hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-heading font-bold mb-6 text-luxury-gold">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-luxury-peach transition-colors duration-200 font-body"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-heading font-bold mb-6 text-luxury-gold">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-gray-300 font-body">{service}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-heading font-bold mb-6 text-luxury-gold">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-luxury-peach mt-1" size={18} />
                <div>
                  <p className="text-gray-300 font-body">
                    Guntur, Vijayawada, Hyderabad
                  </p>
                  <p className="text-gray-400 text-sm">Andhra Pradesh, India</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-luxury-peach" size={18} />
                <span className="text-gray-300 font-body">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-luxury-peach" size={18} />
                <span className="text-gray-300 font-body">
                  hello@arshevents.com
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="font-brand font-semibold mb-3">
                Subscribe to Our Newsletter
              </h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-luxury-gold text-luxury-midnight px-4 py-2 rounded-lg font-brand font-semibold hover:bg-luxury-peach transition-colors duration-200"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="text-center md:text-left">
            <p className="text-gray-400 font-body">
              © 2024 Arsh Events. All rights reserved. Crafted with ❤️ for your
              special moments.
            </p>
            <motion.a
              href="https://www.linkedin.com/in/ameen-ahammad-mohammad-252418192/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-block mt-2 text-cinematic-gold hover:text-yellow-300 transition-colors duration-300 text-sm relative group"
            >
              Made by Ameen 💼
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cinematic-gold to-yellow-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.a>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-luxury-peach transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-luxury-peach transition-colors duration-200 text-sm"
            >
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-luxury-purple to-luxury-gold text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-40"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
}
