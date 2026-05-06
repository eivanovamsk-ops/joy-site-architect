import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Send, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import articonLogo from "@/assets/articon-logo.webp";

const footerLinks = {
  navigation: [{
    label: "Лаборатория",
    href: "/laboratory"
  }, {
    label: "Магазин",
    href: "/shop"
  }, {
    label: "Учебный центр",
    href: "/education"
  }, {
    label: "Контакты",
    href: "/contacts"
  }],
  services: [{
    label: "Прайс-листы",
    href: "/laboratory/documents"
  }, {
    label: "Каталог товаров",
    href: "/shop/catalog"
  }, {
    label: "Календарь курсов",
    href: "/education/calendar"
  }]
};

export function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast({ variant: "destructive", title: "Введите корректный email" });
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("subscribe-unisender", {
        body: { email: email.trim() },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setIsSubscribed(true);
      setEmail("");
      toast({ title: "Вы подписаны!", description: "Спасибо за подписку на рассылку" });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Ошибка подписки", description: "Попробуйте позже" });
    } finally {
      setIsLoading(false);
    }
  };

  return <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <img src={articonLogo} alt="Articon" className="h-8 w-auto brightness-0 invert" loading="lazy" />
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
                <a href="tel:+78047007702" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors">
                  <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">+7 (804) 700-77-02</span>
                </a>
              </li>
              <li>
                <a href="mailto:moscow@articon.pro" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors">
                  <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">moscow@articon.pro</span>
                </a>
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
            {isSubscribed ? (
              <div className="flex items-center gap-2 text-accent">
                <Check className="h-5 w-5" />
                <span className="text-sm">Вы подписаны!</span>
              </div>
            ) : (
              <form className="flex gap-2" onSubmit={handleSubscribe}>
                <Input
                  type="email"
                  placeholder="Ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50 flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" className="gradient-accent flex-shrink-0" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            )}
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
