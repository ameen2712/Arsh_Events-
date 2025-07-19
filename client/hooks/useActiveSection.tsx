import { useState, useEffect } from "react";
import { throttle } from "@/lib/scroll-utils";

interface Section {
  id: string;
  element: Element;
}

export const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sections: Section[] = sectionIds
      .map((id) => {
        const element = document.getElementById(id);
        return element ? { id, element } : null;
      })
      .filter(Boolean) as Section[];

    const handleScroll = throttle(() => {
      const scrollPosition = window.scrollY + 200; // Offset for header

      // Find the section that's currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const rect = section.element.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;

        if (scrollPosition >= sectionTop) {
          setActiveSection(section.id);
          break;
        }
      }

      // Handle edge case for top of page
      if (window.scrollY < 100) {
        setActiveSection(sectionIds[0] || "");
      }
    }, 100);

    handleScroll(); // Set initial active section
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds]);

  return activeSection;
};
