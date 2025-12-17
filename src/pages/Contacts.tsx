import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const departments = [
  {
    name: "Администрация",
    phone: "+7 964 500-00-20",
    telegram: "https://t.me/articon1",
  },
  {
    name: "Фрезерный центр",
    phone: "+7 (964) 500-00-60",
    telegram: "https://t.me/+79645000060",
  },
  {
    name: "Ортодонтия",
    phone: "+7 (963) 996-51-78",
    telegram: "https://t.me/articon3",
  },
];

const Contacts = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Контакты</h1>
            <p className="text-lg text-muted-foreground">
              Свяжитесь с нами любым удобным способом. Мы всегда готовы ответить
              на ваши вопросы и помочь с выбором.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Как с нами связаться</h2>

              {/* Address, Email, Working Hours */}
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Адрес</h3>
                    <p className="text-muted-foreground text-sm">
                      Москва, Варшавское шоссе, д. 33с12
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:lab@articon.pro" className="text-muted-foreground text-sm hover:text-primary">
                      lab@articon.pro
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
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
              </div>

              {/* Departments */}
              <h3 className="text-xl font-bold mb-4">Наши отделы</h3>
              <div className="space-y-4 mb-8">
                {departments.map((dept, index) => (
                  <div key={index} className="bg-secondary/50 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                        <Phone className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{dept.name}</h4>
                        <a href={`tel:${dept.phone.replace(/[\s()-]/g, '')}`} className="text-muted-foreground text-sm hover:text-primary">
                          {dept.phone}
                        </a>
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <a href={dept.telegram} target="_blank" rel="noopener noreferrer">
                        <Send className="mr-2 h-4 w-4" />
                        Написать в Telegram
                      </a>
                    </Button>
                  </div>
                ))}
              </div>

              {/* Telegram Bot CTA */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                <h3 className="font-semibold mb-2">Быстрая связь через Telegram-бот</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Используйте нашего Telegram-бота для быстрой связи и отслеживания заказов
                </p>
                <Button
                  asChild
                  className="gradient-primary text-primary-foreground"
                >
                  <a
                    href="https://t.me/articondental_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Открыть Telegram-бот
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Напишите нам</h2>

              <form
                className="space-y-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Имя *
                    </label>
                    <Input placeholder="Ваше имя" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Телефон *
                    </label>
                    <Input type="tel" placeholder="+7 (___) ___-__-__" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input type="email" placeholder="email@example.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Тема обращения
                  </label>
                  <Input placeholder="Выберите тему или введите свою" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Сообщение *
                  </label>
                  <Textarea
                    placeholder="Опишите ваш вопрос или запрос..."
                    rows={5}
                    required
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    className="mt-1"
                    required
                  />
                  <label htmlFor="consent" className="text-sm text-muted-foreground">
                    Я согласен с{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      политикой конфиденциальности
                    </Link>{" "}
                    и даю согласие на обработку персональных данных
                  </label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gradient-primary text-primary-foreground"
                >
                  Отправить сообщение
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-96 bg-secondary">
        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-primary/30" />
            <p>Карта будет здесь</p>
            <p className="text-sm">Москва, Варшавское шоссе, д. 33с12</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacts;
