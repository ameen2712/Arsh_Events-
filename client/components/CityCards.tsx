import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";

interface City {
  name: string;
  description: string;
  image: string;
  events: string[];
  rating: number;
}

const cities: City[] = [
  {
    name: "Guntur",
    description:
      "Experience traditional elegance with modern luxury in the heart of Andhra Pradesh",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&h=300&fit=crop&crop=center",
    events: ["Royal Weddings", "Birthday Celebrations", "Corporate Events"],
    rating: 4.9,
  },
  {
    name: "Vijayawada",
    description:
      "Where Krishna River meets extraordinary celebrations in style",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop&crop=center",
    events: ["Destination Weddings", "Themed Parties", "Cultural Events"],
    rating: 4.8,
  },
  {
    name: "Hyderabad",
    description: "Metropolitan magnificence for your most cherished moments",
    image:
      "https://images.unsplash.com/photo-1566219497843-c7917bb28295?w=500&h=300&fit=crop&crop=center",
    events: ["Luxury Weddings", "Grand Celebrations", "VIP Events"],
    rating: 5.0,
  },
];

export default function CityCards() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-luxury-silver/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-800 mb-6">
            We Create Magic In{" "}
            <span className="bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent">
              These Cities
            </span>
          </h2>
          <p className="text-xl text-gray-600 font-body max-w-3xl mx-auto">
            From intimate gatherings to grand celebrations, we bring your vision
            to life across Andhra Pradesh's most beautiful locations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                rotateX: 5,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* City Pin Icon */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2"
                >
                  <MapPin className="text-luxury-purple" size={20} />
                </motion.div>

                {/* Rating */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <Star className="text-luxury-gold fill-current" size={16} />
                  <span className="text-sm font-semibold">{city.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-heading font-bold text-gray-800 mb-3">
                  {city.name}
                </h3>
                <p className="text-gray-600 font-body mb-4 line-clamp-2">
                  {city.description}
                </p>

                {/* Events List */}
                <div className="mb-6">
                  <h4 className="text-sm font-brand font-semibold text-luxury-purple mb-2">
                    Specialty Events:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {city.events.map((event) => (
                      <span
                        key={event}
                        className="bg-luxury-blush/30 text-luxury-purple text-xs px-3 py-1 rounded-full font-medium"
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-luxury-purple to-luxury-gold text-white py-3 rounded-lg font-brand font-semibold hover:shadow-lg transition-all duration-300"
                >
                  View Events in {city.name}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
