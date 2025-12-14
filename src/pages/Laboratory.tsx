import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Settings, Clock, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "50K+", label: "работ в год" },
  { value: "170+", label: "сотрудников" },
  { value: "15+", label: "лет опыта" },
  { value: "500+", label: "единиц оборудования" },
];

const services = [
  {
    title: "Функциональная эстетика",
    description: "Виниры, коронки из диоксида циркония, керамики E.max",
    price: "от 5,500 ₽",
  },
  {
    title: "Цифровая ортодонтия",
    description: "Элайнеры, ретейнеры, ортодонтические аппараты",
    price: "от 3,000 ₽",
  },
  {
    title: "Хирургические шаблоны",
    description: "3D-планирование и изготовление навигационных шаблонов",
    price: "от 4,500 ₽",
  },
  {
    title: "Сплинты и депрограмматоры",
    description: "Лечение дисфункции ВНЧС, окклюзионные шины",
    price: "от 6,000 ₽",
  },
  {
    title: "Съёмное протезирование",
    description: "Полные и частичные съёмные протезы",
    price: "от 8,000 ₽",
  },
  {
    title: "Балочные конструкции",
    description: "Протезирование на имплантах с балочной фиксацией",
    price: "от 25,000 ₽",
  },
];

const advantages = [
  {
    icon: Settings,
    title: "Собственное производство",
    description: "Полный цикл изготовления с максимальной точностью",
  },
  {
    icon: Award,
    title: "Контроль качества",
    description: "Строгий контроль на каждом этапе производства",
  },
  {
    icon: Users,
    title: "Опытная команда",
    description: "Более 170 квалифицированных специалистов",
  },
  {
    icon: Clock,
    title: "Соблюдение сроков",
    description: "Точное выполнение заказов в оговорённые сроки",
  },
  {
    icon: Shield,
    title: "Гарантия качества",
    description: "Гарантия на все виды выполненных работ",
  },
  {
    icon: Truck,
    title: "Доставка по России",
    description: "Бесплатный вызов курьера и доставка готовых работ",
  },
];

const Laboratory = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 gradient-lab overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-background blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-background blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-lab-foreground mb-6">
              Цифровая зуботехническая лаборатория
            </h1>
            <p className="text-xl text-lab-foreground/80 mb-8 leading-relaxed">
              Передовые технологии CAD/CAM и квалифицированные специалисты.
              Более 15 лет мы делаем цифровую стоматологию эффективной,
              качественной и удобной.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-background text-lab hover:bg-background/90 px-8"
              >
                Прайс-листы
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-lab-foreground/30 text-lab-foreground hover:bg-lab-foreground/10"
              >
                Вызвать курьера
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-background/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Наши услуги
            </h2>
            <p className="text-lg text-muted-foreground">
              Полный спектр зуботехнических работ с использованием
              современных цифровых технологий
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 hover-lift"
              >
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold">{service.price}</span>
                  <Button variant="ghost" size="sm" className="text-primary">
                    Подробнее <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Почему выбирают нашу лабораторию
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-lab flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-lab-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{advantage.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-lab">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-lab-foreground mb-6">
            Готовы сделать заказ?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-background text-lab hover:bg-background/90">
              Прайс-листы
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-lab-foreground/30 text-lab-foreground hover:bg-lab-foreground/10"
            >
              Связаться с нами
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Laboratory;
