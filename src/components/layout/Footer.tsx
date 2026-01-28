import { Link } from "react-router-dom";
import { MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import articonLogo from "@/assets/articon-logo.png";
const footerLinks = {
  company: [{
    label: "Контакты",
    href: "/contacts"
  }],
  navigation: [{
    label: "Лаборатория",
    href: "/laboratory"
  }, {
    label: "Магазин",
    href: "/shop"
  }, {
    label: "Учебный центр",
    href: "/education"
  }],
  services: [{
    label: "Прайс-листы",
    href: "/laboratory/prices"
  }, {
    label: "Каталог товаров",
    href: "/shop/catalog"
  }, {
    label: "Календарь курсов",
    href: "/education/calendar"
  }]
};
export function Footer() {
  return <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <img src={articonLogo} alt="Articon" className="h-8 w-auto brightness-0 invert" />
            <p className="text-background/70 text-sm leading-relaxed">
              ООО «Артикон Трейд»
            </p>
            <p className="text-background/50 text-xs leading-relaxed">
              ИНН 7725752561 | ОГРН 1127746237607
            </p>
            <div className="flex gap-3">
              <a href="https://vk.com/articondental" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="ВКонтакте">
                <span className="text-sm font-bold">VK</span>
              </a>
              <a href="https://t.me/articon" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Telegram">
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Навигация</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map(link => <li key={link.href}>
                  <Link to={link.href} className="text-background/70 hover:text-background transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>)}
              {footerLinks.company.map(link => <li key={link.href}>
                  
                </li>)}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">
                  115230, г. Москва, Варшавское шоссе, д. 33, стр. 12
                </span>
              </li>
              <li>
                <a href="https://t.me/articondental_bot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors">
                  <Send className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Telegram-бот</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Будьте в курсе</h4>
            <p className="text-background/70 text-sm mb-4">
              Подпишитесь на рассылку и получайте новости о курсах и акциях.
            </p>
            <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
              <Input type="email" placeholder="Ваш email" className="bg-background/10 border-background/20 text-background placeholder:text-background/50 flex-1" />
              <Button type="submit" size="icon" className="gradient-accent flex-shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © 2025 Артикон. Все права защищены.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-background/50 hover:text-background text-sm transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="text-background/50 hover:text-background text-sm transition-colors">
              Согласие на обработку данных
            </Link>
          </div>
        </div>
      </div>
    </footer>;
}