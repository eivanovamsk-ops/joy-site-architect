import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, MessageCircle, ChevronDown, Menu, X, Heart, ShoppingCart, User } from "lucide-react";
import articonLogo from "@/assets/articon-logo.png";

// Top gray bar navigation - main sections (no dropdowns)
const topBarSections = [
  { label: "Лаборатория", href: "/laboratory" },
  { label: "Магазин", href: "/shop" },
  { label: "Учебный центр", href: "/education" },
];

// Home page menu items
const homeMenuItems = [
  { label: "Услуги лаборатории", href: "/laboratory" },
  { label: "Магазин оборудования и расходных материалов", href: "/shop" },
  { label: "Учебный центр", href: "/education" },
];

// Laboratory menu items with submenus
const laboratoryMenuItems = [
  {
    label: "Услуги и цены",
    href: "/laboratory#services",
    subcategories: [
      { label: "Эстетика (безметалловая керамика)", href: "/laboratory?service=esthetics" },
      { label: "Ортодонтия (Ortho)", href: "/laboratory?service=orthodontics" },
      { label: "Хирургические шаблоны", href: "/laboratory?service=surgical" },
      { label: "Сплинты и депрограмматоры", href: "/laboratory?service=splints" },
      { label: "Съемное протезирование", href: "/laboratory?service=removable" },
    ],
  },
  { label: "Прайс-листы", href: "/laboratory#pricing" },
  { label: "Заказ-наряды", href: "/laboratory#orders" },
  { label: "Как сделать заказ", href: "/laboratory#how-to-order" },
  { label: "Контакты", href: "/contacts" },
];

// Shop menu items with full structure
const shopMenuItems = [
  { label: "Акции", href: "/shop?category=sales" },
  { 
    label: "3D-печать", 
    href: "/shop?category=3d-printing",
    subcategories: [
      { label: "3Д-принтеры", href: "/shop?category=3d-printers" },
      { label: "Фотополимеры", href: "/shop?category=photopolymers" },
      { label: "Комплектующие", href: "/shop?category=3d-parts" },
    ]
  },
  { 
    label: "3D-сканеры", 
    href: "/shop?category=scanners",
    subcategories: [
      { label: "Интраоральные", href: "/shop?category=intraoral-scanners" },
      { label: "Лабораторные", href: "/shop?category=lab-scanners" },
      { label: "Аксессуары", href: "/shop?category=scanner-accessories" },
    ]
  },
  { 
    label: "Фрезерные станки", 
    href: "/shop?category=milling",
    subcategories: [
      { label: "Станки", href: "/shop?category=milling-machines" },
      { label: "Компрессоры", href: "/shop?category=compressors" },
      { label: "Пылесосы", href: "/shop?category=vacuums" },
      { label: "Вытяжки", href: "/shop?category=extraction" },
      { label: "Фрезы", href: "/shop?category=milling-tools" },
    ]
  },
  { 
    label: "Циркониевые диски", 
    href: "/shop?category=zirconia",
    subcategories: [
      { label: "Белый", href: "/shop?category=zirconia-white" },
      { label: "Окрашенный", href: "/shop?category=zirconia-colored" },
      { label: "Мультилеер", href: "/shop?category=zirconia-multilayer" },
      { label: "Каркасный", href: "/shop?category=zirconia-frame" },
    ]
  },
  { 
    label: "Диски Cad/Cam", 
    href: "/shop?category=cadcam-discs",
    subcategories: [
      { label: "Титан", href: "/shop?category=titanium-discs" },
      { label: "ПММА", href: "/shop?category=pmma-discs" },
      { label: "Пресс-керамика", href: "/shop?category=press-ceramics" },
      { label: "Дисиликат лития", href: "/shop?category=lithium-disilicate" },
    ]
  },
  { 
    label: "Краски и глазурь", 
    href: "/shop?category=paints",
    subcategories: [
      { label: "Низкотемпературные", href: "/shop?category=low-temp-paints" },
      { label: "Глазурь", href: "/shop?category=glaze" },
    ]
  },
  { label: "Доставка и оплата", href: "/shop/delivery" },
];

// Education menu items with submenus
const educationMenuItems = [
  { label: "Календарь курсов", href: "/education/calendar" },
  {
    label: "Обучение для врачей",
    href: "/education?direction=doctors",
    subcategories: [
      { label: "Ортопедия", href: "/education?direction=doctors&course=orthopedics" },
      { label: "Ортодонтия", href: "/education?direction=doctors&course=orthodontics" },
      { label: "Цифровое планирование", href: "/education?direction=doctors&course=digital-planning" },
    ],
  },
  {
    label: "Обучение для техников",
    href: "/education?direction=technicians",
    subcategories: [
      { label: "CAD/CAM", href: "/education?direction=technicians&course=cadcam" },
      { label: "3D-моделирование", href: "/education?direction=technicians&course=3d-modeling" },
      { label: "Цифровая ортодонтия", href: "/education?direction=technicians&course=digital-ortho" },
    ],
  },
  { label: "Контакты", href: "/contacts" },
];

type MenuItem = {
  label: string;
  href: string;
  subcategories?: { label: string; href: string }[];
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isLaboratory = location.pathname.startsWith("/laboratory");
  const isShop = location.pathname.startsWith("/shop");
  const isEducation = location.pathname.startsWith("/education");

  // Get menu items based on current section
  const getMenuItems = (): MenuItem[] => {
    if (isLaboratory) return laboratoryMenuItems;
    if (isShop) return shopMenuItems;
    if (isEducation) return educationMenuItems;
    return homeMenuItems;
  };

  const currentMenuItems = getMenuItems();
  const showShopIcons = isShop;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Gray Bar - Darker, items aligned right */}
      <div className="bg-[#5a5a5a] border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end h-9 gap-1">
            <nav className="hidden lg:flex items-center">
              {topBarSections.map((section) => (
                <Link
                  key={section.href}
                  to={section.href}
                  className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
                >
                  {section.label}
                </Link>
              ))}
            </nav>

            {/* Chat-bot link */}
            <a
              href="https://t.me/articondental_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
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
          {/* Top row: Logo, Search, Shop icons (if on shop) */}
          <div className="flex items-center justify-between h-20 gap-6">
            {/* Logo - larger like articon.com (~50px height) */}
            <Link to="/" className="flex-shrink-0 pl-2">
              <img
                src={articonLogo}
                alt="Articon - Dental Digital Solutions"
                className="h-12 w-auto"
              />
            </Link>

            {/* Search Bar - narrower like articon.com (~260px width) */}
            <div className="hidden lg:flex items-center">
              <div className="relative" style={{ width: '260px' }}>
                <input
                  type="text"
                  placeholder="Search here..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-3 pr-10 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <button
                  className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-primary text-primary-foreground rounded-r hover:bg-primary/90 transition-colors"
                  aria-label="Поиск"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Shop icons (Favorites, Cart, Account) - only on shop page */}
            {showShopIcons && (
              <div className="hidden lg:flex items-center gap-4">
                <button className="p-2 text-foreground hover:text-primary transition-colors" aria-label="Избранное">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-2 text-foreground hover:text-primary transition-colors relative" aria-label="Корзина">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center">0</span>
                </button>
                <button className="p-2 text-foreground hover:text-primary transition-colors" aria-label="Личный кабинет">
                  <User className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Section-specific menu items - bold, with dropdowns */}
          <nav className="hidden lg:flex items-center gap-1 h-12 border-t border-border/50">
            {currentMenuItems.map((item) => {
              const hasSubmenu = item.subcategories && item.subcategories.length > 0;

              return (
                <div key={item.href} className="relative group">
                  <Link
                    to={item.href}
                    className="flex items-center gap-1 px-4 py-3 text-sm font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                    {hasSubmenu && (
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>

                  {/* Dropdown submenu */}
                  {hasSubmenu && (
                    <div className="absolute top-full left-0 pt-0 z-[100] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
                      <div className="bg-background border border-border shadow-xl py-2 min-w-[240px]">
                        {item.subcategories!.map((sub) => (
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

            {/* Mobile Top Sections */}
            <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-border">
              {topBarSections.map((section) => (
                <Link
                  key={section.href}
                  to={section.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-1.5 bg-muted rounded text-sm font-medium text-foreground"
                >
                  {section.label}
                </Link>
              ))}
              <a
                href="https://t.me/articondental_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded text-sm font-medium text-primary"
              >
                <MessageCircle className="h-4 w-4" />
                Чат-бот
              </a>
            </div>

            {/* Mobile Nav - Current Section Menu */}
            <nav className="flex flex-col">
              {currentMenuItems.map((item) => {
                const hasSubmenu = item.subcategories && item.subcategories.length > 0;

                return (
                  <div key={item.href}>
                    {hasSubmenu ? (
                      <button
                        onClick={() => setActiveSubmenu(activeSubmenu === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between py-3 text-base font-bold text-foreground"
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            activeSubmenu === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 text-base font-bold text-foreground"
                      >
                        {item.label}
                      </Link>
                    )}

                    {/* Mobile submenu */}
                    {activeSubmenu === item.label && hasSubmenu && (
                      <div className="pl-4 pb-2 border-l-2 border-primary/20 ml-2">
                        {item.subcategories!.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-2 text-sm text-muted-foreground hover:text-primary"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Shop icons in mobile */}
              {showShopIcons && (
                <div className="flex items-center gap-4 pt-4 mt-4 border-t border-border">
                  <button className="flex items-center gap-2 text-sm text-foreground">
                    <Heart className="h-5 w-5" />
                    Избранное
                  </button>
                  <button className="flex items-center gap-2 text-sm text-foreground">
                    <ShoppingCart className="h-5 w-5" />
                    Корзина
                  </button>
                  <button className="flex items-center gap-2 text-sm text-foreground">
                    <User className="h-5 w-5" />
                    Кабинет
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
