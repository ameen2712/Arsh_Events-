import { motion } from "framer-motion";
import { ArrowLeft, Play, Heart, Star, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useLenis } from "../hooks/useLenis";
import { useEffect } from "react";

const stories = [
  {
    id: "1",
    title: "A Magical Princess Party in Guntur",
    clientName: "Priya & Raj Sharma",
    location: "Guntur",
    eventType: "Birthday Celebration",
    description:
      "For Myra's 5th birthday, we brought her dream castle to life with unicorns, balloons, and enchanting décor that made every moment magical.",
    videoUrl: "https://player.vimeo.com/video/placeholder",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
    duration: "3:45",
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
    videoUrl: "https://player.vimeo.com/video/placeholder",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1583009817279-09e9c6ecec6f?w=800&h=600&fit=crop",
    duration: "5:20",
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
    videoUrl: "https://player.vimeo.com/video/placeholder",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
    duration: "4:15",
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

export default function WatchStories() {
  // Initialize Lenis for this page
  useLenis();

  useEffect(() => {
    // Set page title
    document.title = "Watch Our Stories | Premium Events";

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Watch inspiring stories from our premium events. See how we create magical moments for weddings, birthdays, and corporate celebrations.",
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Home
            </Link>
          </motion.div>

          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              <span className="text-shimmer">Our Stories</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the magic through the eyes of our clients. Every
              celebration tells a unique story of joy, love, and unforgettable
              moments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="glass rounded-2xl overflow-hidden hover:shadow-cinematic transition-all duration-500 hover:-translate-y-2">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={story.thumbnailUrl}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg"
                      >
                        <Play size={24} className="ml-1" />
                      </motion.button>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      {story.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                        {story.eventType}
                      </span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: story.rating }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                      {story.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {story.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {story.eventDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        {story.guestCount} guests
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm font-medium mb-2">
                        {story.clientName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {story.location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Ready to Create Your Story?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let us help you design an unforgettable celebration that becomes a
              cherished story for years to come.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors"
              >
                <Heart size={20} />
                Start Planning
              </Link>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 glass px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors"
              >
                View Gallery
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
