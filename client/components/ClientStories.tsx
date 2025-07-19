import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ArrowRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useModalLenis } from "../hooks/useModalLenis";

interface ClientStory {
  id: string;
  title: string;
  clientName: string;
  location: string;
  eventType: string;
  description: string;
  fullStory: string;
  image: string;
  rating: number;
  eventDate: string;
  guestCount: number;
  highlights: string[];
}

const clientStories: ClientStory[] = [
  {
    id: "1",
    title: "A Magical Princess Party in Guntur",
    clientName: "Priya & Raj Sharma",
    location: "Guntur",
    eventType: "Birthday Celebration",
    description:
      "For Myra's 5th birthday, we brought her dream castle to life with unicorns, balloons, and enchanting décor that made every moment magical.",
    fullStory:
      "When little Myra told her parents she wanted to be a princess for her 5th birthday, we knew we had to create something truly special. We transformed the venue into an enchanted castle complete with towers, fairy lights, and flowing silk drapes in pastel pink and gold. Live unicorn performances, a treasure hunt, and a custom castle cake made this the most memorable birthday celebration. The look of pure joy on Myra's face when she walked into her fairy-tale party was priceless.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
    rating: 5,
    eventDate: "March 2024",
    guestCount: 45,
    highlights: [
      "🦄 Live unicorn show",
      "🎂 Custom castle cake",
      "🎈 500+ balloons",
      "✨ Fairy-tale décor",
    ],
  },
  {
    id: "2",
    title: "Elegant Haldi Ceremony in Hyderabad",
    clientName: "Anitha & Kiran Reddy",
    location: "Hyderabad",
    eventType: "Wedding Celebration",
    description:
      "The entire venue was bathed in marigold and sunshine as we created a traditional Haldi ceremony that honored heritage while embracing modern elegance.",
    fullStory:
      "Anitha and Kiran wanted their Haldi ceremony to be both traditional and Instagram-worthy. We draped the entire venue in fresh marigolds, created a stunning backdrop with yellow flowers and brass urns, and set up comfortable seating areas with colorful cushions. The highlight was the custom Haldi station where guests could participate in the ceremony while enjoying traditional snacks and fresh coconut water.",
    image:
      "https://images.unsplash.com/photo-1583009817279-09e9c6ecec6f?w=600&h=400&fit=crop",
    rating: 5,
    eventDate: "February 2024",
    guestCount: 120,
    highlights: [
      "🌸 Traditional marigold décor",
      "🎨 Henna artists",
      "🥁 Live dhol players",
      "📸 Candid photography",
    ],
  },
  {
    id: "3",
    title: "Corporate Gala in Vijayawada",
    clientName: "TechnoVision Solutions",
    location: "Vijayawada",
    eventType: "Corporate Event",
    description:
      "A night of excellence and celebration as TechnoVision marked their 10th anniversary with style, sophistication, and memorable experiences.",
    fullStory:
      "TechnoVision's 10th anniversary gala was a testament to their growth and success. We transformed the venue into a sophisticated space with modern lighting, elegant table settings, and a stage for award presentations. The evening featured a three-course gourmet dinner, live entertainment, and a recognition ceremony that celebrated the company's achievements and honored their dedicated employees.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop",
    rating: 5,
    eventDate: "January 2024",
    guestCount: 200,
    highlights: [
      "🎭 Live entertainment",
      "🍽️ Gourmet dining",
      "🏆 Award ceremony",
      "💼 Networking lounge",
    ],
  },
];

export default function ClientStories() {
  const [selectedStory, setSelectedStory] = useState<ClientStory | null>(null);

  // Initialize modal Lenis when story is selected
  useModalLenis(!!selectedStory, ".modal-scroll-container");

  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (selectedStory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedStory]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedStory) {
        setSelectedStory(null);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedStory]);

  return (
    <section className="py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Quote size={16} />
            Client Stories That Inspire Us
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Stories of <span className="text-shimmer">Pure Joy</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Every celebration has a story. Here are some of our favorite moments
            where dreams became reality and created memories for a lifetime.
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clientStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setSelectedStory(story)}
            >
              <div className="glass rounded-2xl overflow-hidden hover:shadow-cinematic transition-all duration-500 hover:-translate-y-2">
                {/* Story Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: story.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="text-yellow-400 fill-current"
                          size={14}
                        />
                      ))}
                    </div>
                    <span className="text-xs opacity-80">
                      {story.eventType}
                    </span>
                  </div>
                </div>

                {/* Story Content */}
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {story.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{story.clientName}</p>
                      <p className="text-xs text-muted-foreground">
                        {story.location}
                      </p>
                    </div>
                    <motion.div
                      className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm">Read More</span>
                      <ArrowRight size={16} />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Full Story Modal */}
      <AnimatePresence>
        {selectedStory && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
              onClick={() => setSelectedStory(null)}
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 300,
                  duration: 0.3,
                }}
                className="modal-scroll-container bg-card rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-cinematic"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Scrollable Content */}
                <div className="modal-inner overflow-y-auto h-full">
                  {/* Modal Header */}
                  <div className="relative h-64">
                    <img
                      src={selectedStory.image}
                      alt={selectedStory.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <motion.button
                      onClick={() => setSelectedStory(null)}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 z-10"
                      aria-label="Close modal"
                    >
                      <X size={20} />
                    </motion.button>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h2 className="text-3xl font-bold mb-2">
                        {selectedStory.title}
                      </h2>
                      <p className="text-white/80">
                        {selectedStory.clientName} • {selectedStory.location}
                      </p>
                    </div>
                  </div>

                  {/* Modal Content */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {selectedStory.guestCount}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Guests
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {selectedStory.eventDate}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Event Date
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          {Array.from({ length: selectedStory.rating }).map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="text-yellow-400 fill-current"
                                size={16}
                              />
                            ),
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Client Rating
                        </div>
                      </div>
                    </div>

                    <div className="prose prose-lg max-w-none">
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {selectedStory.fullStory}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-foreground mb-4">
                        Event Highlights
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {selectedStory.highlights.map((highlight, idx) => (
                          <div
                            key={idx}
                            className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-center text-sm font-medium"
                          >
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Mock Content for Testing Scroll */}
                    <div className="border-t pt-6">
                      <h4 className="text-lg font-semibold text-foreground mb-4">
                        Behind the Scenes
                      </h4>
                      <p className="text-muted-foreground mb-4">
                        Planning this event required weeks of preparation and
                        coordination with multiple vendors. Our team worked
                        tirelessly to ensure every detail was perfect, from the
                        initial concept to the final execution.
                      </p>
                      <p className="text-muted-foreground mb-4">
                        The client's vision was clear from our first meeting -
                        they wanted something magical and unforgettable. We
                        spent hours discussing themes, colors, and entertainment
                        options to create the perfect atmosphere.
                      </p>
                      <p className="text-muted-foreground">
                        The result exceeded everyone's expectations and created
                        memories that will last a lifetime. This is what we live
                        for - seeing the joy and wonder on our clients' faces
                        when their dreams come to life.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
