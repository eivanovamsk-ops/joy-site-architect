import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Функциональная эстетика",
    description: "Виниры, коронки из диоксида циркония, керамики E.max. Безметалловые реставрации высочайшего качества.",
    price: "от 5,500 ₽",
    items: ["Виниры керамические", "Коронки цельноциркониевые", "Коронки E.max", "Мосты из циркония"],
  },
  {
    title: "Ortho (Цифровая ортодонтия)",
    description: "Элайнеры, ретейнеры, ортодонтические аппараты. Полный цикл цифрового ортодонтического лечения.",
    price: "от 3,000 ₽",
    items: ["Элайнеры", "Ретейнеры", "Ортодонтические аппараты", "Трейнеры"],
  },
  {
    title: "Хирургические шаблоны",
    description: "3D-планирование и изготовление навигационных хирургических шаблонов для точной установки имплантов.",
    price: "от 4,500 ₽",
    items: ["Навигационные шаблоны", "Планирование имплантации", "Временные конструкции"],
  },
  {
    title: "Сплинты и депрограмматоры",
    description: "Лечение дисфункции ВНЧС, окклюзионные шины, ночные капы для защиты зубов.",
    price: "от 6,000 ₽",
    items: ["Окклюзионные шины", "Депрограмматоры", "Ночные капы", "Спортивные капы"],
  },
  {
    title: "Съёмное протезирование",
    description: "Полные и частичные съёмные протезы с использованием современных материалов.",
    price: "от 8,000 ₽",
    items: ["Полные съёмные протезы", "Частичные протезы", "Иммедиат-протезы"],
  },
  {
    title: "Балочные конструкции",
    description: "Протезирование на имплантах с балочной фиксацией для максимальной надёжности.",
    price: "от 25,000 ₽",
    items: ["Балки на имплантах", "Съёмные протезы на балках", "Телескопические конструкции"],
  },
];

export function LaboratoryServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Топ направления
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
              className="bg-card border border-border rounded-2xl p-6 hover-lift group"
            >
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {service.description}
              </p>
              <ul className="space-y-1 mb-4">
                {service.items.slice(0, 3).map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-primary font-semibold">{service.price}</span>
                <Button variant="ghost" size="sm" className="text-primary">
                  Подробнее <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/laboratory/services">
            <Button size="lg" className="gradient-primary text-primary-foreground">
              Все услуги и цены
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
