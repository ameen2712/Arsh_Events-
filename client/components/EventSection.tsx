import { motion } from "framer-motion";
import { Heart, Gift, Camera, Sparkles } from "lucide-react";

interface EventTheme {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  price: string;
}

const birthdayThemes: EventTheme[] = [
  {
    title: "Unicorn Fantasy",
    description: "Magical rainbow wonderland with enchanting decorations",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop&crop=center",
    icon: <Sparkles className="text-luxury-peach" size={24} />,
    price: "From ₹15,000",
  },
  {
    title: "Space Adventure",
    description: "Cosmic journey with planets, stars, and astronaut themes",
    image:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop&crop=center",
    icon: <Gift className="text-luxury-purple" size={24} />,
    price: "From ₹18,000",
  },
  {
    title: "Princess Palace",
    description: "Royal celebration fit for little kings and queens",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop&crop=center",
    icon: <Heart className="text-luxury-blush" size={24} />,
    price: "From ₹20,000",
  },
];

const marriageThemes: EventTheme[] = [
  {
    title: "Royal Heritage",
    description: "Traditional elegance with golden accents and royal decor",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&crop=center",
    icon: <Heart className="text-luxury-gold" size={24} />,
    price: "From ₹2,50,000",
  },
  {
    title: "Garden Romance",
    description: "Enchanting outdoor celebration with floral arrangements",
    image:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop&crop=center",
    icon: <Sparkles className="text-luxury-peach" size={24} />,
    price: "From ₹3,00,000",
  },
  {
    title: "Palace Grandeur",
    description: "Majestic celebration in palatial settings with luxury",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop&crop=center",
    icon: <Camera className="text-luxury-purple" size={24} />,
    price: "From ₹5,00,000",
  },
];

interface EventGridProps {
  title: string;
  subtitle: string;
  themes: EventTheme[];
  bgColor: string;
}

function EventGrid({ title, subtitle, themes, bgColor }: EventGridProps) {
  return (
    <div className={`py-20 ${bgColor}`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-800 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 font-body max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <motion.img
                  src={theme.image}
                  alt={theme.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Icon Overlay */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  {theme.icon}
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-4 right-4 bg-luxury-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {theme.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-gray-800 mb-3">
                  {theme.title}
                </h3>
                <p className="text-gray-600 font-body mb-6 line-clamp-2">
                  {theme.description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-luxury-purple to-luxury-gold text-white py-3 rounded-lg font-brand font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Explore Theme
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EventSection() {
  return (
    <section className="relative">
      {/* Birthday Events */}
      <EventGrid
        title="Birthday Celebrations"
        subtitle="Create magical moments that your little ones will treasure forever with our enchanting birthday themes"
        themes={birthdayThemes}
        bgColor="bg-gradient-to-br from-luxury-peach/10 to-luxury-blush/10"
      />

      {/* Marriage Events */}
      <EventGrid
        title="Wedding Celebrations"
        subtitle="Begin your journey of love with ceremonies that reflect the grandeur and beauty of your special bond"
        themes={marriageThemes}
        bgColor="bg-gradient-to-br from-luxury-gold/10 to-luxury-purple/10"
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="absolute"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
          >
            <Sparkles
              className="text-luxury-gold/20"
              size={12 + Math.random() * 8}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
