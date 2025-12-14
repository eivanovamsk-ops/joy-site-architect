import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, MessageCircle, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import articonLogo from "@/assets/articon-logo.png";
import { categories } from "@/data/products";

// Top bar navigation items
const topNavItems = [
  { label: "Главная", href: "/" },
  { label: "Лаборатория", href: "/laboratory" },
  { label: "Магазин", href: "/shop" },
  { label: "Учебный центр", href: "/education" },
];

// Laboratory submenu
const laboratoryMenu = [
  { label: "Виды конструкций", href: "/laboratory#constructions" },
  { label: "Как сделать заказ", href: "/laboratory#order" },
  { label: "Доставка", href: "/laboratory#delivery" },
  { label: "Прайс-лист", href: "/laboratory#price" },
  { label: "Контроль качества", href: "/laboratory#quality" },
];

interface ShopMenuItem {
  label: string;
  href: string;
  subcategories?: { label: string; href: string }[];
}

// Shop submenu with subcategories from products data
const shopMenu: ShopMenuItem[] = categories.map((cat) => ({
  label: cat.name,
  href: `/shop?category=${cat.id}`,
  subcategories: cat.subcategories?.map((sub) => ({
    label: sub.name,
    href: `/shop?category=${cat.id}&subcategory=${sub.id}`,
  })),
}));

// Education submenu
const educationMenu = [
  { label: "CAD/CAM технологии", href: "/education#cadcam" },
  { label: "3D-печать в стоматологии", href: "/education#3d-print" },
  { label: "Керамика и эстетика", href: "/education#ceramics" },
  { label: "Ортодонтия", href: "/education#orthodontics" },
  { label: "Имплантология", href: "/education#implants" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;
  const isHomePage = location.pathname === "/";
  const isLaboratoryPage = location.pathname === "/laboratory";
  const isShopPage = location.pathname === "/shop";
  const isEducationPage = location.pathname === "/education";

  const getCurrentSubmenu = (): { items: ShopMenuItem[]; hasDropdowns: boolean } | null => {
    if (isLaboratoryPage) return { items: laboratoryMenu as ShopMenuItem[], hasDropdowns: false };
    if (isShopPage) return { items: shopMenu, hasDropdowns: true };
    if (isEducationPage) return { items: educationMenu as ShopMenuItem[], hasDropdowns: false };
    return null;
  };

  const currentSubmenu = getCurrentSubmenu();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Gray Bar */}
      <div className="bg-[#f5f5f5] border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end h-8 gap-1">
            {topNavItems.map((item, index) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-xs px-3 py-1 transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://t.me/articondental_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-1 text-muted-foreground hover:text-primary transition-colors ml-2"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Чат-бот
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 lg:h-16 gap-6">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={articonLogo}
                alt="Articon - Dental Digital Solutions"
                className="h-8 lg:h-10 w-auto"
              />
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-[280px]">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Поиск по сайту..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-8 pl-3 pr-10 rounded border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <button
                  className="absolute right-0 top-0 h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground rounded-r hover:bg-primary/90 transition-colors"
                  aria-label="Поиск"
                >
                  <Search className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Contact Button */}
            <Link
              to="/contacts"
              className="hidden lg:block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Контакты
            </Link>

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

      {/* Secondary Navigation - Only on non-home pages */}
      {!isHomePage && currentSubmenu && (
        <div className="bg-background border-b border-border hidden lg:block">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-0 h-12 overflow-x-auto">
              {currentSubmenu.items.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    if (currentSubmenu.hasDropdowns && 'subcategories' in item && item.subcategories) {
                      setHoveredCategory(item.label);
                    }
                  }}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <Link
                    to={item.href}
                    className="flex items-center gap-1 text-sm font-semibold px-4 py-3 text-foreground hover:text-primary whitespace-nowrap transition-colors"
                  >
                    {item.label}
                    {currentSubmenu.hasDropdowns && 'subcategories' in item && item.subcategories && (
                      <ChevronDown className="h-3 w-3" />
                    )}
                  </Link>

                  {/* Dropdown for subcategories */}
                  {currentSubmenu.hasDropdowns && 'subcategories' in item && item.subcategories && hoveredCategory === item.label && (
                    <div className="absolute top-full left-0 bg-card border border-border rounded-md shadow-lg py-2 min-w-[180px] z-50 animate-fade-in">
                      {item.subcategories.map((sub) => (
                        <Link
                          key={sub.href}
                          to={sub.href}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}

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
              {topNavItems.map((item) => (
                <div key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => {
                      if (item.href === "/laboratory" || item.href === "/shop" || item.href === "/education") {
                        setActiveSubmenu(activeSubmenu === item.href ? null : item.href);
                      } else {
                        setIsMenuOpen(false);
                      }
                    }}
                    className={`flex items-center justify-between py-3 text-base font-medium transition-colors ${
                      isActive(item.href) ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {item.label}
                    {(item.href === "/laboratory" || item.href === "/shop" || item.href === "/education") && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          activeSubmenu === item.href ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Mobile Submenu */}
                  {activeSubmenu === item.href && (
                    <div className="pl-4 pb-2 animate-fade-in">
                      {item.href === "/laboratory" &&
                        laboratoryMenu.map((subItem) => (
                          <a
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-2 text-sm text-muted-foreground hover:text-primary"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      {item.href === "/shop" &&
                        shopMenu.map((subItem) => (
                          <a
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-2 text-sm text-muted-foreground hover:text-primary"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      {item.href === "/education" &&
                        educationMenu.map((subItem) => (
                          <a
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-2 text-sm text-muted-foreground hover:text-primary"
                          >
                            {subItem.label}
                          </a>
                        ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 mt-4 border-t border-border">
                <Link
                  to="/contacts"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-base font-medium text-foreground"
                >
                  Контакты
                </Link>
                <a
                  href="https://t.me/articondental_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2 text-base text-primary"
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
