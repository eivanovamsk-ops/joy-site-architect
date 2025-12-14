import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, MessageCircle, ChevronDown, Menu, X } from "lucide-react";
import articonLogo from "@/assets/articon-logo.png";
import { categories } from "@/data/products";

// Top bar navigation items
const topNavItems = [
  { label: "Новости и блоги", href: "/blog" },
  { label: "О нас", href: "/about" },
  { label: "Связаться с нами", href: "/contacts" },
];

// Main navigation with dropdowns
const mainNavItems = [
  { label: "Магазин", href: "/shop" },
  { label: "Лаборатория", href: "/laboratory" },
  { label: "Учебный центр", href: "/education" },
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

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Blue Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-9">
            <div className="flex items-center gap-4">
              {topNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-xs hover:text-white/80 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <a
              href="tel:+74951234567"
              className="text-xs font-medium hover:text-white/80 transition-colors"
            >
              +7 (495) 123-45-67
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
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
            <div className="hidden lg:flex flex-1 max-w-md">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Поиск здесь..."
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

            {/* Contact & Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="https://t.me/articondental_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Чат-бот
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

      {/* Main Navigation with Dropdowns */}
      <div className="bg-background border-b border-border hidden lg:block">
        <div className="container mx-auto px-4">
          <nav className="flex items-center h-12">
            {/* Main nav items */}
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-semibold px-4 py-3 transition-colors ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Divider */}
            <div className="w-px h-6 bg-border mx-2" />

            {/* Shop categories with dropdowns */}
            {shopCategories.map((category) => {
              const hasSubcategories = category.subcategories && category.subcategories.length > 0;
              
              return (
                <div
                  key={category.href}
                  className="relative group"
                >
                  <Link
                    to={category.href}
                    className="flex items-center gap-1 text-sm px-3 py-3 text-foreground hover:text-primary whitespace-nowrap transition-colors"
                  >
                    {category.label}
                    {hasSubcategories && (
                      <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {hasSubcategories && (
                    <div className="absolute top-full left-0 pt-0 z-[100] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150">
                      <div className="bg-white border border-border shadow-xl py-2 min-w-[220px]">
                        {category.subcategories!.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
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
          </nav>
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

            {/* Mobile Nav Items */}
            <nav className="flex flex-col">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-3 text-base font-medium transition-colors ${
                    isActive(item.href) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Категории магазина</p>
                {shopCategories.map((category) => (
                  <div key={category.href}>
                    <button
                      onClick={() => setActiveSubmenu(activeSubmenu === category.label ? null : category.label)}
                      className="w-full flex items-center justify-between py-2 text-sm text-foreground"
                    >
                      {category.label}
                      {category.subcategories && category.subcategories.length > 0 && (
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            activeSubmenu === category.label ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                    
                    {activeSubmenu === category.label && category.subcategories && (
                      <div className="pl-4 pb-2">
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-1.5 text-sm text-muted-foreground hover:text-primary"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 mt-4 border-t border-border">
                {topNavItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-sm text-muted-foreground"
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
