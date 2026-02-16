import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, ExternalLink, FlaskConical, ShoppingBag, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/forms/ContactForm";

const sectionContacts = [
  {
    id: "laboratory",
    icon: FlaskConical,
    title: "Лаборатория",
    phone: "+7 (964) 500-00-20",
    phoneRaw: "+79645000020",
    email: "lab@articon.pro",
    telegram: { url: "https://t.me/articon1", label: "@articon1" },
    detailsLink: "/laboratory/contacts",
    extras: [
      { label: "Фрезерный центр", phone: "+7 (964) 500-00-60", phoneRaw: "+79645000060" },
      { label: "Ортодонтия", phone: "+7 (963) 996-51-78", phoneRaw: "+79639965178" },
    ],
  },
  {
    id: "shop",
    icon: ShoppingBag,
    title: "Магазин",
    phone: "+7 (964) 500-00-40",
    phoneRaw: "+79645000040",
    email: "moscow@articon.pro",
    telegram: { url: "https://t.me/articon_zakaz", label: "Заказ в Telegram" },
    detailsLink: "/shop/contacts",
  },
  {
    id: "education",
    icon: GraduationCap,
    title: "Учебный центр",
    phone: "+7 (906) 045-75-37",
    phoneRaw: "+79060457537",
    email: null,
    telegram: { url: "https://t.me/articon_education", label: "@articon_education" },
    detailsLink: "/education/contacts",
    extras: [
      { label: "Доп. телефон", phone: "+7 (905) 717-20-61", phoneRaw: "+79057172061" },
    ],
  },
];

const Contacts = () => {
  return (
    <Layout>
      <Helmet>
        <title>Контакты | Артикон — Цифровая стоматология</title>
        <meta name="description" content="Контакты Артикон: адрес, телефоны, email, Telegram. Лаборатория, магазин и учебный центр — все контакты на одной странице." />
        <link rel="canonical" href="https://articon.pro/contacts" />
        <meta property="og:title" content="Контакты | Артикон" />
        <meta property="og:description" content="Свяжитесь с нами: телефон, email, Telegram. Москва, Варшавское шоссе." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://articon.pro/contacts" />
        <meta property="og:image" content="https://articon.pro/og-image.jpg" />
      </Helmet>

      {/* Hero */}
      <section className="py-14 lg:py-18 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h1>
            <p className="text-lg text-muted-foreground">
              Все контакты компании Артикон на одной странице. Выберите нужный раздел или свяжитесь с нами напрямую.
            </p>
          </div>
        </div>
      </section>

      {/* Address + Map */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Address info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Наш адрес</h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">115230, г. Москва</p>
                    <p className="text-muted-foreground text-sm">Варшавское шоссе, д. 33, стр. 12</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">Режим работы</p>
                    <p className="text-muted-foreground text-sm">Ежедневно с 9:00 до 21:00</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">Общий e-mail</p>
                    <a href="mailto:lab@articon.pro" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                      lab@articon.pro
                    </a>
                  </div>
                </div>
              </div>

              {/* Telegram bot */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                <p className="font-semibold mb-1">Telegram-бот</p>
                <p className="text-muted-foreground text-sm mb-3">Быстрая связь и отслеживание заказов</p>
                <Button asChild size="sm" className="gradient-primary text-primary-foreground">
                  <a href="https://t.me/articondental_bot" target="_blank" rel="noopener noreferrer">
                    <Send className="mr-2 h-4 w-4" />
                    Открыть бот
                  </a>
                </Button>
              </div>
            </div>

            {/* Map */}
            <div className="aspect-square rounded-2xl overflow-hidden border border-border">
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

      {/* Section Contacts */}
      <section className="py-12 lg:py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Контакты по направлениям</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {sectionContacts.map((section) => (
              <div
                key={section.id}
                className="bg-card border border-border rounded-2xl p-6 flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <section.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold">{section.title}</h3>
                </div>

                {/* Main phone */}
                <div className="space-y-3 flex-1">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Телефон</p>
                    <a href={`tel:${section.phoneRaw}`} className="font-medium hover:text-primary transition-colors">
                      {section.phone}
                    </a>
                  </div>

                  {/* Extra phones */}
                  {section.extras?.map((extra, i) => (
                    <div key={i}>
                      <p className="text-xs text-muted-foreground mb-0.5">{extra.label}</p>
                      <a href={`tel:${extra.phoneRaw}`} className="font-medium text-sm hover:text-primary transition-colors">
                        {extra.phone}
                      </a>
                    </div>
                  ))}

                  {/* Email */}
                  {section.email && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">E-mail</p>
                      <a href={`mailto:${section.email}`} className="font-medium text-sm hover:text-primary transition-colors">
                        {section.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-5 pt-4 border-t border-border space-y-2">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href={section.telegram.url} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {section.telegram.label}
                    </a>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="w-full text-muted-foreground">
                    <Link to={section.detailsLink}>
                      <ExternalLink className="mr-2 h-3.5 w-3.5" />
                      Подробнее
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
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
              notifyEmail="lab@articon.pro"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacts;
