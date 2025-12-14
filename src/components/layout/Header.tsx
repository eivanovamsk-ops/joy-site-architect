import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, MessageCircle, ChevronDown, Menu, X } from "lucide-react";
import articonLogo from "@/assets/articon-logo.png";
import { categories } from "@/data/products";

// Top gray bar navigation - main sections
const mainSections = [
  { label: "Лаборатория", href: "/laboratory" },
  { 
    label: "Магазин", 
    href: "/shop",
    hasDropdown: true,
  },
  { 
    label: "Учебный центр", 
    href: "/education",
    hasDropdown: true,
  },
];

// Shop categories with subcategories from products data
const shopCategories = categories.map((cat) => ({
  label: cat.name,
  href: `/shop?category=${cat.id}`,
  subcategories: cat.subcategories?.map((sub) => ({
    label: sub.name,
    href: `/shop?category=${cat.id}&subcategory=${sub.id}`,
  })),
}));

// Education categories
const educationCategories = [
  {
    label: "Для врачей",
    href: "/education?direction=doctors",
    subcategories: [
      { label: "Ортопедия", href: "/education?direction=doctors&course=orthopedics" },
      { label: "Ортодонтия", href: "/education?direction=doctors&course=orthodontics" },
      { label: "Хирургия", href: "/education?direction=doctors&course=surgery" },
      { label: "Цифровое планирование", href: "/education?direction=doctors&course=digital-planning" },
      { label: "Дентальный фотопротокол", href: "/education?direction=doctors&course=photo-protocol" },
    ],
  },
  {
    label: "Для техников",
    href: "/education?direction=technicians",
    subcategories: [
      { label: "CAD/CAM (Exocad)", href: "/education?direction=technicians&course=cadcam" },
      { label: "3D-моделирование", href: "/education?direction=technicians&course=3d-modeling" },
      { label: "Цифровая ортодонтия", href: "/education?direction=technicians&course=digital-ortho" },
      { label: "3D-печать", href: "/education?direction=technicians&course=3d-printing" },
    ],
  },
];

// Secondary nav items
const secondaryNavItems = [
  { label: "Новости и блоги", href: "/blog" },
  { label: "О нас", href: "/about" },
  { label: "Связаться с нами", href: "/contacts" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Gray Bar - Main Sections */}
      <div className="bg-muted border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10">
            <nav className="hidden lg:flex items-center">
              {mainSections.map((section) => {
                const isShop = section.label === "Магазин";
                const isEducation = section.label === "Учебный центр";
                const dropdownItems = isShop ? shopCategories : isEducation ? educationCategories : null;

                return (
                  <div key={section.href} className="relative group">
                    <Link
                      to={section.href}
                      className={`flex items-center gap-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                        isActive(section.href)
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      }`}
                    >
                      {section.label}
                      {section.hasDropdown && (
                        <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                      )}
                    </Link>

                    {/* Dropdown for Shop and Education */}
                    {dropdownItems && (
                      <div className="absolute top-full left-0 pt-0 z-[100] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
                        <div className="bg-background border border-border shadow-xl py-2 min-w-[220px]">
                          {dropdownItems.map((category) => {
                            const hasSubcategories = category.subcategories && category.subcategories.length > 0;
                            
                            return (
                              <div key={category.href} className="relative group/item">
                                <Link
                                  to={category.href}
                                  className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                                >
                                  {category.label}
                                  {hasSubcategories && (
                                    <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
                                  )}
                                </Link>

                                {/* Nested dropdown for subcategories */}
                                {hasSubcategories && (
                                  <div className="absolute top-0 left-full pl-0 z-[110] invisible opacity-0 group-hover/item:visible group-hover/item:opacity-100 transition-all duration-200">
                                    <div className="bg-background border border-border shadow-xl py-2 min-w-[200px]">
                                      {category.subcategories!.map((sub) => (
                                        <Link
                                          key={sub.href}
                                          to={sub.href}
                                          className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                                        >
                                          {sub.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Chat-bot link */}
            <a
              href="https://t.me/articondental_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Чат-бот
            </a>
          </div>
        </div>
      </div>

      {/* Main Header with Logo and Search */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-6">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={articonLogo}
                alt="Articon - Dental Digital Solutions"
                className="h-10 w-auto"
              />
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-lg">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Поиск по сайту..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-4 pr-12 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <button
                  className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-primary text-primary-foreground rounded-r hover:bg-primary/90 transition-colors"
                  aria-label="Поиск"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Secondary Navigation - Desktop */}
            <div className="hidden lg:flex items-center gap-6">
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="tel:+74951234567"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                +7 (495) 123-45-67
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Поиск по сайту"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-4 pr-12 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button
                className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-primary text-primary-foreground rounded-r-md"
                aria-label="Поиск"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile Nav - Main Sections */}
            <nav className="flex flex-col">
              {mainSections.map((section) => {
                const isShop = section.label === "Магазин";
                const isEducation = section.label === "Учебный центр";
                const dropdownItems = isShop ? shopCategories : isEducation ? educationCategories : null;
                const hasSubmenu = !!dropdownItems;

                return (
                  <div key={section.href}>
                    {hasSubmenu ? (
                      <button
                        onClick={() => setActiveSubmenu(activeSubmenu === section.label ? null : section.label)}
                        className={`w-full flex items-center justify-between py-3 text-base font-medium transition-colors ${
                          isActive(section.href) ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {section.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            activeSubmenu === section.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        to={section.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block py-3 text-base font-medium transition-colors ${
                          isActive(section.href) ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {section.label}
                      </Link>
                    )}

                    {/* Mobile submenu */}
                    {activeSubmenu === section.label && dropdownItems && (
                      <div className="pl-4 pb-2 border-l-2 border-primary/20 ml-2">
                        {dropdownItems.map((category) => (
                          <Link
                            key={category.href}
                            to={category.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-2 text-sm text-muted-foreground hover:text-primary"
                          >
                            {category.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 mt-4 border-t border-border">
                {secondaryNavItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-sm text-muted-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href="https://t.me/articondental_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2 text-sm text-primary"
                >
                  <MessageCircle className="h-4 w-4" />
                  Чат-бот
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
