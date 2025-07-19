import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { scrollToSection } from "@/lib/scroll-utils";

interface BreadcrumbItem {
  label: string;
  path?: string;
  sectionId?: string;
  isActive?: boolean;
}

interface BreadcrumbNavProps {
  items?: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
  activeSection?: string;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  items = [],
  className = "",
  showHome = true,
  activeSection,
}) => {
  const location = useLocation();

  // Generate breadcrumbs based on current route if items not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items.length > 0) return items;

    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    if (showHome) {
      breadcrumbs.push({
        label: "Home",
        path: "/",
        isActive: location.pathname === "/",
      });
    }

    // Add current page based on path
    pathSegments.forEach((segment, index) => {
      const path = "/" + pathSegments.slice(0, index + 1).join("/");
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);

      breadcrumbs.push({
        label: label.replace("-", " "),
        path,
        isActive: path === location.pathname,
      });
    });

    // Add section breadcrumb for home page
    if (location.pathname === "/" && activeSection) {
      const sectionLabels: Record<string, string> = {
        home: "Home",
        cities: "Our Cities",
        testimonials: "Client Stories",
      };

      if (sectionLabels[activeSection]) {
        breadcrumbs.push({
          label: sectionLabels[activeSection],
          sectionId: activeSection,
          isActive: true,
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleItemClick = (item: BreadcrumbItem) => {
    if (item.sectionId) {
      scrollToSection(item.sectionId);
    }
  };

  return (
    <nav
      className={`flex items-center gap-2 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-2 list-none">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {/* Breadcrumb Item */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`transition-all duration-200 ${
                  item.isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.path ? (
                  <Link
                    to={item.path}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-muted/50"
                    aria-current={item.isActive ? "page" : undefined}
                  >
                    {index === 0 && showHome && (
                      <Home size={14} className="opacity-70" />
                    )}
                    {item.label}
                  </Link>
                ) : item.sectionId ? (
                  <button
                    onClick={() => handleItemClick(item)}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-muted/50"
                    aria-current={item.isActive ? "location" : undefined}
                  >
                    {item.label}
                  </button>
                ) : (
                  <span className="flex items-center gap-1.5 px-2 py-1">
                    {index === 0 && showHome && (
                      <Home size={14} className="opacity-70" />
                    )}
                    {item.label}
                  </span>
                )}
              </motion.div>

              {/* Separator */}
              {!isLast && (
                <ChevronRight
                  size={14}
                  className="text-muted-foreground/60 flex-shrink-0"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

interface SectionBreadcrumbProps {
  sections: { id: string; title: string }[];
  activeSection: string;
  className?: string;
}

export const SectionBreadcrumb: React.FC<SectionBreadcrumbProps> = ({
  sections,
  activeSection,
  className = "",
}) => {
  const breadcrumbItems: BreadcrumbItem[] = sections.map((section) => ({
    label: section.title,
    sectionId: section.id,
    isActive: section.id === activeSection,
  }));

  return (
    <BreadcrumbNav
      items={breadcrumbItems}
      className={className}
      showHome={false}
    />
  );
};

export default BreadcrumbNav;
