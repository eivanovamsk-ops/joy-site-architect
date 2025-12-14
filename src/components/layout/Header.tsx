import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import articonLogo from "@/assets/articon-logo.png";

const navItems = [
  { label: "Лаборатория", href: "/laboratory" },
  { label: "Магазин", href: "/shop" },
  { label: "Учебный центр", href: "/education" },
  { label: "О компании", href: "/about" },
  { label: "Контакты", href: "/contacts" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={articonLogo}
              alt="Articon - Dental Digital Solutions"
              className="h-8 lg:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-foreground/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <a
                href="https://t.me/articondental_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Telegram
              </a>
            </Button>
            <Button size="sm" className="gradient-primary text-primary-foreground">
              Связаться
            </Button>
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border py-4 animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium py-2 transition-colors ${
                    isActive(item.href)
                      ? "text-primary"
                      : "text-foreground/80"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-primary text-primary"
                >
                  <a
                    href="https://t.me/articondental_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Telegram-бот
                  </a>
                </Button>
                <Button className="w-full gradient-primary">
                  Связаться с нами
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
