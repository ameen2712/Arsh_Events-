import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";

interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸", nativeName: "English" },
  { code: "ar", name: "Arabic", flag: "🇦🇪", nativeName: "عربي" },
  { code: "hi", name: "Hindi", flag: "🇮🇳", nativeName: "हिंदी" },
  { code: "te", name: "Telugu", flag: "🇮🇳", nativeName: "తెలుగు" },
];

export default function LanguageSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);

    // Here you would implement actual language switching logic
    console.log("Language switched to:", language.code);
  };

  return (
    <div className="relative">
      {/* Current Language Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 text-white transition-colors group"
      >
        {/* Animated Flag */}
        <motion.span
          animate={{
            rotate: isOpen ? [0, -10, 10, 0] : 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="text-lg"
        >
          {selectedLanguage.flag}
        </motion.span>

        {/* Language Code */}
        <span className="text-sm font-medium uppercase tracking-wide">
          {selectedLanguage.code}
        </span>

        {/* Dropdown Arrow */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={14} className="text-gray-300" />
        </motion.div>

        {/* Hover Glow Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-cinematic-purple/20 to-cinematic-gold/20 rounded-lg -z-10 blur-sm"
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full mt-2 right-0 bg-gray-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700 overflow-hidden z-20 min-w-48"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-700 bg-gray-700/50">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-cinematic-gold" />
                  <span className="text-sm font-semibold text-white">
                    Select Language
                  </span>
                </div>
              </div>

              {/* Language Options */}
              <div className="py-2">
                {languages.map((language, index) => (
                  <motion.button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: "rgba(255, 215, 0, 0.1)" }}
                    className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                      selectedLanguage.code === language.code
                        ? "bg-cinematic-gold/10 text-cinematic-gold"
                        : "text-white hover:text-cinematic-gold"
                    }`}
                  >
                    {/* Flag with Wave Animation */}
                    <motion.span
                      animate={{
                        rotate:
                          selectedLanguage.code === language.code
                            ? [0, -5, 5, 0]
                            : 0,
                      }}
                      transition={{
                        duration: 0.8,
                        repeat:
                          selectedLanguage.code === language.code
                            ? Infinity
                            : 0,
                        repeatDelay: 2,
                      }}
                      className="text-lg"
                    >
                      {language.flag}
                    </motion.span>

                    {/* Language Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{language.name}</span>
                        <span className="text-xs opacity-60 uppercase">
                          {language.code}
                        </span>
                      </div>
                      <span className="text-sm opacity-70">
                        {language.nativeName}
                      </span>
                    </div>

                    {/* Selection Indicator */}
                    {selectedLanguage.code === language.code && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-cinematic-gold rounded-full"
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-gray-700 bg-gray-700/30">
                <span className="text-xs text-gray-400">
                  More languages coming soon
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
