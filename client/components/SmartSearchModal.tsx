import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Search,
  X,
  MapPin,
  Calendar,
  Heart,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface SmartSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchSuggestion {
  id: string;
  type: "event" | "city" | "theme" | "venue";
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  popularity: number;
}

const searchData: SearchSuggestion[] = [
  {
    id: "1",
    type: "event",
    title: "Plan a Wedding in Hyderabad",
    subtitle: "Traditional & Destination",
    icon: <Heart className="text-pink-500" size={16} />,
    popularity: 95,
  },
  {
    id: "2",
    type: "event",
    title: "Birthday Party Themes",
    subtitle: "Kids & Adults",
    icon: <Sparkles className="text-purple-500" size={16} />,
    popularity: 88,
  },
  {
    id: "3",
    type: "city",
    title: "Events in Guntur",
    subtitle: "Premium venues available",
    icon: <MapPin className="text-blue-500" size={16} />,
    popularity: 82,
  },
  {
    id: "4",
    type: "theme",
    title: "Royal Palace Theme",
    subtitle: "Luxury wedding décor",
    icon: <Sparkles className="text-gold-500" size={16} />,
    popularity: 91,
  },
  {
    id: "5",
    type: "event",
    title: "Corporate Events",
    subtitle: "Team building & conferences",
    icon: <Calendar className="text-green-500" size={16} />,
    popularity: 76,
  },
  {
    id: "6",
    type: "theme",
    title: "Underwater Theme",
    subtitle: "Unique aquatic décor",
    icon: <Sparkles className="text-cyan-500" size={16} />,
    popularity: 69,
  },
  {
    id: "7",
    type: "city",
    title: "Vijayawada Venues",
    subtitle: "Banquet halls & resorts",
    icon: <MapPin className="text-orange-500" size={16} />,
    popularity: 85,
  },
  {
    id: "8",
    type: "event",
    title: "Engagement Ceremony",
    subtitle: "Ring ceremony planning",
    icon: <Heart className="text-rose-500" size={16} />,
    popularity: 79,
  },
];

export default function SmartSearchModal({
  isOpen,
  onClose,
}: SmartSearchModalProps) {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    SearchSuggestion[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fuzzy search function
  const fuzzyMatch = (text: string, query: string): number => {
    if (!query) return 0;
    const normalizedText = text.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    let score = 0;
    let queryIndex = 0;

    for (
      let i = 0;
      i < normalizedText.length && queryIndex < normalizedQuery.length;
      i++
    ) {
      if (normalizedText[i] === normalizedQuery[queryIndex]) {
        score += 2;
        queryIndex++;
      } else if (normalizedText.includes(normalizedQuery[queryIndex])) {
        score += 0.5;
      }
    }

    if (queryIndex === normalizedQuery.length) {
      score += 10; // Bonus for complete match
    }

    return score;
  };

  useEffect(() => {
    if (query.length > 0) {
      const suggestions = searchData
        .map((item) => ({
          ...item,
          score: fuzzyMatch(item.title + " " + item.subtitle, query),
        }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score || b.popularity - a.popularity)
        .slice(0, 6);

      setFilteredSuggestions(suggestions);
    } else {
      // Show popular suggestions when no query
      const popular = searchData
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 4);
      setFilteredSuggestions(popular);
    }
    setSelectedIndex(-1);
  }, [query]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(filteredSuggestions[selectedIndex]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.title);
    // Here you would implement the actual search action
    console.log("Selected:", suggestion);
    setTimeout(onClose, 500);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "event":
        return "bg-purple-100 text-purple-700";
      case "city":
        return "bg-blue-100 text-blue-700";
      case "theme":
        return "bg-yellow-100 text-yellow-700";
      case "venue":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for events, themes, venues, or cities..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-12 pr-4 py-4 text-lg border-0 outline-none bg-gray-50 rounded-xl focus:bg-gray-100 transition-colors"
                  />
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Suggestions */}
            <div className="max-h-96 overflow-y-auto">
              {query.length === 0 && (
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="text-cinematic-purple" size={16} />
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Popular Searches
                    </span>
                  </div>
                </div>
              )}

              <div className="p-2">
                {filteredSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedIndex === index
                        ? "bg-cinematic-purple/10 scale-[1.02]"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        {suggestion.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-semibold text-gray-900">
                            {suggestion.title}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(suggestion.type)}`}
                          >
                            {suggestion.type}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            {suggestion.subtitle}
                          </span>
                          <div className="flex items-center gap-1">
                            <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${suggestion.popularity}%` }}
                                transition={{
                                  delay: index * 0.1,
                                  duration: 0.5,
                                }}
                                className="h-full bg-gradient-to-r from-cinematic-purple to-cinematic-gold"
                              />
                            </div>
                            <span className="text-xs text-gray-500 ml-1">
                              {suggestion.popularity}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredSuggestions.length === 0 && query.length > 0 && (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-gray-400" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600">
                    Try searching for events, themes, venues, or cities
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Press ↑↓ to navigate, Enter to select, Esc to close</span>
                <span className="flex items-center gap-1">
                  Powered by{" "}
                  <Sparkles size={12} className="text-cinematic-purple" /> AI
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
