import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Send, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/forms/ContactForm";

const departments = [
{
  name: "Администрация",
  phone: "+7 964 500-00-20",
  telegram: "https://t.me/articon1",
  telegramLabel: "@articon1"
},
{
  name: "Фрезерный центр",
  phone: "+7 (964) 500-00-60",
  telegram: "https://t.me/+79645000060",
  telegramLabel: "Написать"
},
{
  name: "Ортодонтия",
  phone: "+7 (963) 996-51-78",
  telegram: "https://t.me/articon3",
  telegramLabel: "@articon3"
},
{
  name: "Отдел сотрудничества",
  phone: "+7 967 211-37-56",
  telegram: "https://t.me/articonrazvitie",
  telegramLabel: "@articonrazvitie"
}];


const quickLinks = [
{ label: "Лаборатория — контакты", href: "/laboratory/contacts" },
{ label: "Магазин — контакты", href: "/shop/contacts" },
{ label: "Учебный центр — контакты", href: "/education/contacts" }];


const Contacts = () => {
  return (
    <Layout>
      <Helmet>
        <title>Контакты | Артикон — Цифровая стоматология</title>
        <meta name="description" content="Контакты Артикон: адрес, телефоны, email, Telegram. Свяжитесь с нами для заказа оборудования, услуг лаборатории или записи на обучение." />
        <link rel="canonical" href="https://articon.pro/contacts" />
        <meta property="og:title" content="Контакты | Артикон" />
        <meta property="og:description" content="Свяжитесь с нами: телефон, email, Telegram. Москва, Варшавское шоссе." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://articon.pro/contacts" />
        <meta property="og:image" content="https://articon.pro/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://articon.pro/og-image.jpg" />
      </Helmet>
      <section className="py-16 lg:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Свяжитесь с нами любым удобным способом. Мы всегда готовы ответить
              на ваши вопросы и помочь с выбором.
            </p>
            {/* Quick contact cards */}
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+79645000040"
                className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">

                <Phone className="h-4 w-4" />
                +7 (964) 500-00-40
              </a>
              <a
                href="mailto:lab@articon.pro"
                className="inline-flex items-center gap-2 px-5 py-3 bg-card border border-border rounded-xl font-semibold text-sm hover:border-primary/50 transition-colors">

                <Mail className="h-4 w-4" />
                lab@articon.pro
              </a>
              <a
                href="https://t.me/articondental_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-card border border-border rounded-xl font-semibold text-sm hover:border-primary/50 transition-colors">

                <Send className="h-4 w-4" />
                Telegram-бот
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-6">
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
                <Mail className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex items-center">
                <a
                  href="mailto:lab@articon.pro"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  lab@articon.pro
                </a>


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments + Form */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Departments */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Наши отделы</h2>
              <div className="space-y-3">
                {departments.map((dept, index) =>
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                        <Phone className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{dept.name}</h4>
                        <a
                        href={`tel:${dept.phone.replace(/[\s()-]/g, "")}`}
                        className="text-muted-foreground text-sm hover:text-primary transition-colors">

                          {dept.phone}
                        </a>
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <a
                      href={dept.telegram}
                      target="_blank"
                      rel="noopener noreferrer">

                        <Send className="mr-2 h-4 w-4" />
                        Telegram
                      </a>
                    </Button>
                  </div>
                )}
              </div>

              {/* Quick links to section contacts */}
              <div className="mt-8 bg-secondary/50 rounded-2xl p-6">
                <h3 className="font-semibold mb-3">Контакты отделов</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  У каждого направления есть своя страница контактов с подробной информацией
                </p>
                <div className="flex flex-col gap-2">
                  {quickLinks.map((link) =>
                  <Link
                    key={link.href}
                    to={link.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">

                      <ExternalLink className="h-3.5 w-3.5" />
                      {link.label}
                    </Link>
                  )}
                </div>
              </div>

              {/* Telegram Bot CTA */}
              <div className="mt-6 bg-primary/5 border border-primary/20 rounded-2xl p-6">
                <h3 className="font-semibold mb-2">
                  Быстрая связь через Telegram-бот
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Используйте нашего Telegram-бота для быстрой связи и
                  отслеживания заказов
                </p>
                <Button
                  asChild
                  className="gradient-primary text-primary-foreground">

                  <a
                    href="https://t.me/articondental_bot"
                    target="_blank"
                    rel="noopener noreferrer">

                    <Send className="mr-2 h-4 w-4" />
                    Открыть Telegram-бот
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Напишите нам</h2>
              <ContactForm
                title="Отправить сообщение"
                description="Заполните форму и мы свяжемся с вами в ближайшее время" />

            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[450px] bg-secondary">
        <iframe
          src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=109957568237"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Артикон на карте"
          loading="lazy"
          className="w-full h-full" />

      </section>
    </Layout>);

};

export default Contacts;