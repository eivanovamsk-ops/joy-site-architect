import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { MapPin, Phone, Mail, Clock, Send, GraduationCap, FlaskConical, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/forms/ContactForm";

const Contacts = () => {
  return (
    <Layout>
      <Helmet>
        <title>Контакты | Артикон — Цифровая стоматология</title>
        <meta name="description" content="Контакты Артикон: адрес, телефоны, email, Telegram. Свяжитесь с нами для заказа оборудования, услуг лаборатории или записи на обучение." />
        <link rel="canonical" href="https://articon.pro/contacts" />
      </Helmet>

      {/* Hero */}
      <section className="py-16 lg:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h1>
            <p className="text-lg text-muted-foreground">
              Свяжитесь с нами любым удобным способом
            </p>
          </div>
        </div>
      </section>

      {/* Address + Map */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-1">Адрес</h2>
                  <p className="text-muted-foreground">
                    115230, г. Москва, Варшавское шоссе, д. 33, стр. 12
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-1">Режим работы</h2>
                  <p className="text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-1">Общий телефон</h2>
                  <a href="tel:+78047007702" className="text-foreground font-semibold hover:text-primary transition-colors">
                    +7 (804) 700-77-02
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-1">Email</h2>
                  <a href="mailto:moscow@articon.pro" className="text-foreground font-semibold hover:text-primary transition-colors">
                    moscow@articon.pro
                  </a>
                </div>
              </div>

              <Button asChild className="gradient-primary text-primary-foreground">
                <a href="https://t.me/articondental_bot" target="_blank" rel="noopener noreferrer">
                  <Send className="mr-2 h-4 w-4" />
                  Telegram-бот
                </a>
              </Button>
            </div>

            {/* Map - compact square */}
            <div className="rounded-2xl overflow-hidden border border-border aspect-square max-w-[400px]">
              <iframe
                src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=109957568237"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Артикон на карте"
                loading="lazy"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Three department blocks */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Контакты отделов</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Laboratory */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                <FlaskConical className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-4">Лаборатория</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Администрация</p>
                  <a href="tel:+79645000020" className="font-semibold hover:text-primary transition-colors">+7 964 500-00-20</a>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Фрезерный центр</p>
                  <a href="tel:+79645000060" className="font-semibold hover:text-primary transition-colors">+7 (964) 500-00-60</a>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Ортодонтия</p>
                  <a href="tel:+79639965178" className="font-semibold hover:text-primary transition-colors">+7 (963) 996-51-78</a>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Отдел сотрудничества</p>
                  <a href="tel:+79672113756" className="font-semibold hover:text-primary transition-colors">+7 967 211-37-56</a>
                </div>
                <div className="pt-2">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href="https://t.me/articon1" target="_blank" rel="noopener noreferrer">
                      <Send className="mr-2 h-4 w-4" />
                      Telegram
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Shop */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold mb-4">Магазин</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Телефон</p>
                  <a href="tel:+78047007702" className="font-semibold hover:text-primary transition-colors">+7 (804) 700-77-02</a>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Email</p>
                  <a href="mailto:moscow@articon.pro" className="font-semibold hover:text-primary transition-colors">moscow@articon.pro</a>
                </div>
                <div className="pt-2">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href="https://t.me/articon_zakaz" target="_blank" rel="noopener noreferrer">
                      <Send className="mr-2 h-4 w-4" />
                      Telegram заказы
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold mb-4">Учебный центр</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Телефон</p>
                  <a href="tel:+79060457537" className="font-semibold hover:text-primary transition-colors">+7 (906) 045-75-37</a>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Телефон (доп.)</p>
                  <a href="tel:+79057172061" className="font-semibold hover:text-primary transition-colors">+7 (905) 717-20-61</a>
                </div>
                <div className="pt-2">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href="https://t.me/articon_education" target="_blank" rel="noopener noreferrer">
                      <Send className="mr-2 h-4 w-4" />
                      Telegram
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Напишите нам</h2>
            <ContactForm
              title="Отправить сообщение"
              description="Заполните форму и мы свяжемся с вами в ближайшее время"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacts;
