import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, MessageCircle, ChevronDown, Menu, X, Heart, ShoppingCart, User, Shield } from "lucide-react";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import articonLogo from "@/assets/articon-logo.png";

// Top gray bar navigation - main sections (no dropdowns)
const topBarSections = [{
  label: "Лаборатория",
  href: "/laboratory"
}, {
  label: "Магазин",
  href: "/shop"
}, {
  label: "Учебный центр",
  href: "/education"
}];

// Home page menu items
const homeMenuItems = [{
  label: "Услуги лаборатории",
  href: "/laboratory"
}, {
  label: "Магазин оборудования и расходных материалов",
  href: "/shop"
}, {
  label: "Учебный центр",
  href: "/education"
}, {
  label: "Контакты",
  href: "/contacts"
}];

// Laboratory menu items
const laboratoryMenuItems = [{
  label: "Услуги и цены",
  href: "/laboratory/services"
}, {
  label: "Прайс-листы и заказ-наряды",
  href: "/laboratory/documents"
}, {
  label: "Контакты",
  href: "/laboratory/contacts"
}];

// Shop menu items with full structure
const shopMenuItems = [{
  label: "Акции",
  href: "/shop/catalog/sale"
}, {
  label: "3D-печать",
  href: "/shop/catalog/printers",
  subcategories: [{
    label: "3Д-принтеры",
    href: "/shop/catalog/3d-printers"
  }, {
    label: "Фотополимеры",
    href: "/shop/catalog/photopolymers"
  }]
}, {
  label: "3D-сканеры",
  href: "/shop/catalog/intraoral-scanners",
  subcategories: [{
    label: "Интраоральные",
    href: "/shop/catalog/intraoral-scanners"
  }, {
    label: "Лабораторные",
    href: "/shop/catalog/lab-scanners"
  }]
}, {
  label: "Фрезерные станки",
  href: "/shop/catalog/milling-machines",
  subcategories: [{
    label: "Станки",
    href: "/shop/catalog/milling-machines"
  }, {
    label: "Печи",
    href: "/shop/catalog/furnaces"
  }, {
    label: "Компрессоры",
    href: "/shop/catalog/compressors"
  }, {
    label: "Пылесосы",
    href: "/shop/catalog/vacuums"
  }, {
    label: "Фрезы",
    href: "/shop/catalog/burs"
  }]
}, {
  label: "Диски CAD/CAM",
  href: "/shop/catalog/cadcam-discs",
  subcategories: [{
    label: "Циркониевые диски",
    href: "/shop/catalog/zirconia-discs"
  }, {
    label: "Диски металл (CoCr/Ti)",
    href: "/shop/catalog/metal-discs"
  }, {
    label: "Диски пластик (ПММА)",
    href: "/shop/catalog/pmma-discs"
  }, {
    label: "Пресс-керамика",
    href: "/shop/catalog/press-ceramic"
  }]
}, {
  label: "Краски и глазурь",
  href: "/shop/catalog/paints-glaze"
}, {
  label: "Доставка и оплата",
  href: "/shop/delivery"
}, {
  label: "Контакты",
  href: "/shop/contacts"
}];

// Education menu items with submenus - linking to section pages
const educationMenuItems = [{
  label: "Календарь курсов",
  href: "/education/calendar"
}, {
  label: "Обучение для врачей",
  href: "/education/doctors-orthopedics",
  subcategories: [{
    label: "Ортопедия",
    href: "/education/doctors-orthopedics"
  }, {
    label: "Ортодонтия",
    href: "/education/doctors-orthodontics"
  }]
}, {
  label: "Обучение для техников",
  href: "/education/technicians-cadcam",
  subcategories: [{
    label: "CAD/CAM",
    href: "/education/technicians-cadcam"
  }, {
    label: "Ортодонтия",
    href: "/education/technicians-orthodontics"
  }]
}, {
  label: "Вебинары",
  href: "/education/webinar/zircon-march-2026",
  subcategories: [{
    label: "Лайфхаки в работе с цирконом",
    href: "/education/webinar/zircon-march-2026"
  }, {
    label: "Брекет-системы",
    href: "/education/webinar/brackets-march-2026"
  }]
}, {
  label: "Контакты",
  href: "/education/contacts"
}];
type MenuItem = {
  label: string;
  href: string;
  subcategories?: {
    label: string;
    href: string;
  }[];
};
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const {
    user
  } = useAuth();
  const {
    totalItems
  } = useCart();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }
      try {
        const {
          data
        } = await supabase.rpc('is_admin');
        setIsAdmin(!!data);
      } catch {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, [user]);
  const isHome = location.pathname === "/";
  const isLaboratory = location.pathname.startsWith("/laboratory");
  const isShop = location.pathname.startsWith("/shop");
  const isEducation = location.pathname.startsWith("/education");

  // Track scroll position to hide main header on homepage
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ctrl+K shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Get menu items based on current section
  const getMenuItems = (): MenuItem[] => {
    if (isLaboratory) return laboratoryMenuItems;
    if (isShop) return shopMenuItems;
    if (isEducation) return educationMenuItems;
    return homeMenuItems;
  };
  const currentMenuItems = getMenuItems();
  const showShopIcons = isShop;

  // Hide main header on scroll for homepage (desktop only)
  const hideMainHeader = isHome && isScrolled;
  return <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Gray Bar - Darker, items aligned right */}
      <div className="bg-[#5a5a5a] border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end h-9 gap-1">
            <nav className="hidden lg:flex items-center">
              {topBarSections.map(section => <Link key={section.href} to={section.href} className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors">
                  {section.label}
                </Link>)}
            </nav>

            {/* Chat-bot link */}
            <a href="https://t.me/articondental_bot" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors">
              <MessageCircle className="h-4 w-4" />
              Чат-бот
            </a>
          </div>
        </div>
      </div>

      {/* Main Header with Logo and Search - hidden on scroll for homepage desktop */}
      <div className={`bg-background border-b border-border transition-all duration-300 ${hideMainHeader ? 'lg:max-h-0 lg:overflow-hidden lg:border-b-0' : 'lg:max-h-40'}`}>
        <div className="container mx-auto px-4">
          {/* Top row: Logo, Search, Shop icons (if on shop) */}
          <div className="flex items-center justify-between h-20 gap-6">
            {/* Logo - larger like articon.com (~50px height) */}
            <Link to="/" className="flex-shrink-0 pl-2">
              <img src={articonLogo} alt="Articon - Dental Digital Solutions" className="h-12 w-auto" />
            </Link>

            {/* Mobile Telegram Bot Button - centered */}

            {/* Search Bar - narrower like articon.com (~260px width) */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 h-10 px-4 rounded border border-border bg-background text-sm text-muted-foreground hover:border-primary/50 transition-colors"
                style={{ width: '260px' }}
              >
                <Search className="h-4 w-4" />
                <span>Поиск по сайту...</span>
              </button>
            </div>

            {/* Shop icons (Favorites, Cart, Account) - only on shop page */}
            {showShopIcons && <div className="hidden lg:flex items-center gap-4">
                <button className="p-2 text-foreground hover:text-primary transition-colors" aria-label="Избранное">
                  <Heart className="h-5 w-5" />
                </button>
                <Link to="/cart" className="p-2 text-foreground hover:text-primary transition-colors relative" aria-label="Корзина">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>}
                </Link>
                <Link to={user ? "/profile" : "/auth"} className="p-2 text-foreground hover:text-primary transition-colors" aria-label="Личный кабинет">
                  <User className="h-5 w-5" />
                </Link>
                {isAdmin && <Link to="/admin" className="p-2 text-primary hover:text-primary/80 transition-colors" aria-label="Админ-панель">
                    <Shield className="h-5 w-5" />
                  </Link>}
              </div>}

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Section-specific menu items - bold, with dropdowns */}
          <nav className="hidden lg:flex items-center gap-1 h-12 border-t border-border/50">
            {currentMenuItems.map(item => {
            const hasSubmenu = item.subcategories && item.subcategories.length > 0;
            return <div key={item.href} className="relative group">
                  <Link to={item.href} className="flex items-center gap-1 px-4 py-3 text-sm font-bold text-foreground hover:text-primary transition-colors">
                    {item.label}
                    {hasSubmenu && <ChevronDown className="h-3 w-3 ml-1 transition-transform group-hover:rotate-180" />}
                  </Link>

                  {/* Dropdown submenu - with pseudo-element bridge for hover */}
                  {hasSubmenu && <div className="absolute top-full left-0 z-[9999] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 before:content-[''] before:absolute before:top-[-10px] before:left-0 before:right-0 before:h-[10px]">
                      <div className="bg-background border border-border rounded-md shadow-lg py-2 min-w-[240px]">
                        {item.subcategories!.map(sub => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>}
                </div>;
          })}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <div className="lg:hidden bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <button
              onClick={() => { setSearchOpen(true); setIsMenuOpen(false); }}
              className="w-full flex items-center gap-3 h-10 px-4 rounded-md border border-border bg-background text-sm text-muted-foreground mb-4"
            >
              <Search className="h-4 w-4" />
              Поиск по сайту...
            </button>

            {/* Mobile Top Sections */}
            <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-border">
              {topBarSections.map(section => <Link key={section.href} to={section.href} onClick={() => setIsMenuOpen(false)} className="px-3 py-1.5 bg-muted rounded text-sm font-medium text-foreground">
                  {section.label}
                </Link>)}
              <a href="https://t.me/articondental_bot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded text-sm font-medium text-primary">
                <MessageCircle className="h-4 w-4" />
                Чат-бот
              </a>
            </div>

            {/* Mobile Nav - Current Section Menu */}
            <nav className="flex flex-col">
              {currentMenuItems.map(item => {
            const hasSubmenu = item.subcategories && item.subcategories.length > 0;
            return <div key={item.href}>
                    {hasSubmenu ? <button onClick={() => setActiveSubmenu(activeSubmenu === item.label ? null : item.label)} className="w-full flex items-center justify-between py-3 text-base font-bold text-foreground">
                        {item.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${activeSubmenu === item.label ? "rotate-180" : ""}`} />
                      </button> : <Link to={item.href} onClick={() => setIsMenuOpen(false)} className="block py-3 text-base font-bold text-foreground">
                        {item.label}
                      </Link>}

                    {/* Mobile submenu */}
                    {activeSubmenu === item.label && hasSubmenu && <div className="pl-4 pb-2 border-l-2 border-primary/20 ml-2">
                        {item.subcategories!.map(sub => <Link key={sub.href} to={sub.href} onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm text-muted-foreground hover:text-primary">
                            {sub.label}
                          </Link>)}
                      </div>}
                  </div>;
          })}

              {/* Shop icons in mobile */}
              {showShopIcons && <div className="flex items-center gap-4 pt-4 mt-4 border-t border-border">
                  <button className="flex items-center gap-2 text-sm text-foreground">
                    <Heart className="h-5 w-5" />
                    Избранное
                  </button>
                  <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-sm text-foreground">
                    <ShoppingCart className="h-5 w-5" />
                    Корзина {totalItems > 0 && `(${totalItems})`}
                  </Link>
                  <Link to={user ? "/profile" : "/auth"} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-sm text-foreground">
                    <User className="h-5 w-5" />
                    {user ? "Кабинет" : "Войти"}
                  </Link>
                </div>}
            </nav>
          </div>
        </div>}

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>;
}