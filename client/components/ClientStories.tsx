import { motion } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";
import { useState } from "react";

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
      "Anitha and Kiran wanted their Haldi ceremony to reflect their deep roots in Telugu tradition while incorporating contemporary elements. We designed a stunning mandap using thousands of fresh marigolds, turmeric-yellow silk drapes, and traditional brass elements. The courtyard was adorned with hanging jasmine installations, and we created designated spaces for different rituals. Traditional dhol players and dancers added authentic energy while professional photographers captured every golden moment. The ceremony concluded with a shower of flower petals, creating memories that will last a lifetime.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
    rating: 5,
    eventDate: "February 2024",
    guestCount: 200,
    highlights: [
      "🌼 5000+ marigolds",
      "🥁 Traditional dhol",
      "📸 Professional photography",
      "🌺 Jasmine installations",
    ],
  },
  {
    id: "3",
    title: "Corporate Gala in Vijayawada",
    clientName: "TechNova Solutions",
    location: "Vijayawada",
    eventType: "Corporate Event",
    description:
      "Luxury meets innovation: For TechNova's annual celebration, we created a sophisticated evening with live jazz, gold décor, and cutting-edge light projections.",
    fullStory:
      "TechNova Solutions wanted their annual corporate gala to reflect their position as industry leaders while celebrating their team's achievements. We transformed the riverside venue with sophisticated gold and black décor, featuring geometric patterns and modern art installations. A live jazz quartet set the mood while interactive light projections displayed the company's journey and milestones. The evening included award ceremonies, team recognitions, and networking spaces with premium catering. The event perfectly balanced corporate professionalism with celebratory elegance, leaving a lasting impression on all 300 attendees.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop",
    rating: 5,
    eventDate: "January 2024",
    guestCount: 300,
    highlights: [
      "🎷 Live jazz quartet",
      "💡 Light projections",
      "🏆 Award ceremony",
      "🍾 Premium catering",
    ],
  },
];

export default function ClientStories() {
  const [selectedStory, setSelectedStory] = useState<ClientStory | null>(null);

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
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto mb-6 rounded-full"
          />

          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-foreground">
            Client Stories
            <span className="block text-primary">That Inspire Us</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every celebration tells a unique story. Here are some of our
            favorite moments from recent events that showcase the magic we
            create together.
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {clientStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setSelectedStory(story)}
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                {/* Story Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Event Type Badge */}
                  <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {story.eventType}
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full">
                    <Star className="text-yellow-400 fill-current" size={14} />
                    <span className="text-sm font-medium">{story.rating}</span>
                  </div>

                  {/* Quote Icon */}
                  <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full">
                    <Quote className="text-primary" size={16} />
                  </div>
                </div>

                {/* Story Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                    {story.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span>{story.clientName}</span>
                    <span>•</span>
                    <span>{story.location}</span>
                    <span>•</span>
                    <span>{story.eventDate}</span>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {story.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {story.highlights.slice(0, 2).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Read More */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {story.guestCount} guests
                    </span>
                    <div className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                      <span>Read Full Story</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready to Create Your Own Story?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's turn your vision into an unforgettable celebration that you
              and your guests will treasure forever.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Planning Your Event
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Full Story Modal */}
      {selectedStory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedStory(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="bg-card rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-64">
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                ✕
              </button>
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
                  <div className="text-sm text-muted-foreground">Guests</div>
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
