import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Send, Clock, ArrowRight, GraduationCap, ShoppingBag, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/forms/ContactForm";

const sections = [
  {
    icon: FlaskConical,
    title: "Фрезерный центр",
    description: "Цифровая зуботехническая лаборатория",
    phone: "+7 (964) 500-00-60",
    phoneHref: "tel:+79645000060",
    email: "lab@articon.pro",
    telegram: { href: "https://t.me/+79645000060", label: "Написать" },
    link: "/laboratory/contacts",
  },
  {
    icon: ShoppingBag,
    title: "Магазин",
    description: "Оборудование и материалы",
    phone: "+7 (804) 700-77-02",
    phoneHref: "tel:+78047007702",
    email: "moscow@articon.pro",
    telegram: { href: "https://t.me/articon_zakaz", label: "Заказать" },
    link: "/shop/contacts",
  },
  {
    icon: GraduationCap,
    title: "Учебный центр",
    description: "Курсы и обучение для стоматологов",
    phone: "+7 (906) 045-75-37",
    phoneHref: "tel:+79060457537",
    email: null,
    telegram: { href: "https://t.me/articon_education", label: "@articon_education" },
    link: "/education/contacts",
  },
];

const GeneralContacts = () => {
  return (
    <Layout>
      <Helmet>
        <title>Контакты | Артикон — Цифровая стоматология</title>
        <meta name="description" content="Контакты компании Артикон: адрес, телефоны, email. Фрезерный центр, магазин оборудования и учебный центр в Москве." />
        <link rel="canonical" href="https://articon.pro/contacts" />
        <meta property="og:title" content="Контакты | Артикон" />
        <meta property="og:description" content="Свяжитесь с нами: телефон, email, Telegram. Москва, Варшавское шоссе." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://articon.pro/contacts" />
        <meta property="og:image" content="https://articon.pro/og-image.jpg" />
      </Helmet>

      {/* Hero */}
      <section className="py-16 lg:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h1>
            <p className="text-lg text-muted-foreground">
              Свяжитесь с нужным отделом Артикон — мы всегда на связи.
            </p>
          </div>
        </div>
      </section>

      {/* Address + Map */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Info cards */}
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Адрес</h3>
                  <p className="text-muted-foreground text-sm">
                    115230, г. Москва, Варшавское шоссе, д. 33, стр. 12
                  </p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Режим работы</h3>
                  <p className="text-muted-foreground text-sm">
                    Ежедневно с 9:00 до 21:00
                  </p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Телефон</h3>
                  <a href="tel:+79645000020" className="text-muted-foreground text-sm hover:text-primary transition-colors block">
                    +7 (964) 500-00-20
                  </a>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <Send className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Telegram-бот</h3>
                  <a
                    href="https://t.me/articondental_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline"
                  >
                    @articondental_bot
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-border h-[380px] lg:h-full lg:min-h-[380px]">
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
      <section className="py-12 lg:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Контакты отделов</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {sections.map((section) => (
              <div
                key={section.title}
                className="bg-card border border-border rounded-2xl p-6 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <section.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold">{section.title}</h3>
                    <p className="text-xs text-muted-foreground">{section.description}</p>
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <a href={section.phoneHref} className="text-sm hover:text-primary transition-colors">
                      {section.phone}
                    </a>
                  </div>
                  {section.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <a href={`mailto:${section.email}`} className="text-sm hover:text-primary transition-colors">
                        {section.email}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <a
                      href={section.telegram.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-primary transition-colors"
                    >
                      {section.telegram.label}
                    </a>
                  </div>
                </div>

                <Link
                  to={section.link}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Подробнее
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 lg:py-20 bg-background">
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

export default GeneralContacts;
