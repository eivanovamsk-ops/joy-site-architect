import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";

import { Phone, MapPin, Navigation, Car, DoorOpen, MessageCircle, Mail, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const EducationContacts = () => {
  const phones = [
    "+7 (906) 045-75-37",
    "+7 (909) 905-64-57",
  ];

  const directions = [
    {
      icon: Navigation,
      title: "От МЦК Верхние Котлы",
      distance: "~590 метров",
      time: "5 минут ходьбы",
      link: "https://clck.ru/3CyWTt",
    },
    {
      icon: Navigation,
      title: "От метро Нагатинская",
      distance: "~970 метров",
      time: "10 минут ходьбы",
      link: "https://clck.ru/3CyWfk",
    },
    {
      icon: Car,
      title: "Бесплатная городская парковка",
      subtitle: "Варшавское шоссе 37",
      distance: "~350 метров",
      time: "5 минут ходьбы",
      link: "https://clck.ru/3CyWaM",
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Контакты Учебного центра | Артикон</title>
        <meta name="description" content="Контакты Учебного центра Артикон: телефоны, Telegram, адрес в Москве (Варшавское шоссе 33с12). Как добраться от МЦК и метро." />
        <link rel="canonical" href="https://articon.pro/education/contacts" />
      </Helmet>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-12 text-center">
            Контакты Учебного центра
          </h1>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              {/* Phones */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Phone className="h-6 w-6 text-primary" />
                  Телефоны для связи
                </h2>
                <div className="space-y-4">
                  {phones.map((phone, index) => (
                    <a
                      key={index}
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      className="block text-xl font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>

                {/* Email */}
                <div className="mt-6 pt-6 border-t border-border">
                  <a
                    href="mailto:edu@articon.pro"
                    className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-5 w-5 text-primary" />
                    edu@articon.pro
                  </a>
                </div>

                {/* Telegram Button */}
                <div className="mt-6 pt-6 border-t border-border">
                  <a
                    href="https://t.me/articon_education"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full gap-2" size="lg">
                      <MessageCircle className="h-5 w-5" />
                      Написать в Telegram
                    </Button>
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  Адрес
                </h2>
                <p className="text-lg text-foreground">
                  Москва, Варшавское ш. 33с12
                </p>
              </div>

              {/* Entrance Info */}
              <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <DoorOpen className="h-6 w-6 text-primary" />
                  Вход
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Пожалуйста, обратите внимание, что вход в Учебный центр Артикон находится 
                  с левого торца здания в арку со внутренней стороны двора.
                </p>
                <p className="mt-3 text-lg font-semibold text-primary">
                  Вывеска МЕГАПОЛИС
                </p>
              </div>
            </div>

            {/* How to get there */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Как добраться
              </h2>

              <div className="space-y-4">
                {directions.map((direction, index) => (
                  <a
                    key={index}
                    href={direction.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <direction.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                          {direction.title}
                        </h3>
                        {direction.subtitle && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {direction.subtitle}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{direction.distance}</span>
                          <span>•</span>
                          <span>{direction.time}</span>
                        </div>
                      </div>
                      <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <Navigation className="h-5 w-5" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Map */}
              <div className="mt-8 rounded-2xl overflow-hidden border border-border h-[350px]">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=109957568237"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Артикон на карте"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          <div className="mt-16">
            <EducationLegalInfo variant="compact" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EducationContacts;
