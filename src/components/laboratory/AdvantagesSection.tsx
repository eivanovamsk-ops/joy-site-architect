import { Settings, Award, Users, Clock, Shield, Truck } from "lucide-react";

const advantages = [
  {
    icon: Settings,
    title: "Собственное производство полного цикла",
    description: "Обеспечиваем максимальную точность готовых конструкций. Применяем лучшие мировые методики.",
  },
  {
    icon: Award,
    title: "Современное высокоточное оборудование",
    description: "Наличие эксклюзивного инновационного оборудования от ведущих мировых производителей.",
  },
  {
    icon: Users,
    title: "Собственный отдел контроля качества",
    description: "Ориентируемся на совершенство и контролируем качество, используя только проверенные материалы.",
  },
  {
    icon: Clock,
    title: "Соблюдение сроков",
    description: "Точное выполнение заказов в оговорённые сроки благодаря оптимизированным процессам.",
  },
  {
    icon: Shield,
    title: "Гарантия качества",
    description: "Предоставляем гарантию на все виды выполненных работ. Бесплатные корректировки.",
  },
  {
    icon: Truck,
    title: "Доставка по России",
    description: "Бесплатный вызов курьера для забора слепков и доставка готовых работ по всей России.",
  },
];

export function LaboratoryAdvantagesSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Почему выбирают нашу лабораторию
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Мы гордимся качеством нашей работы и заботимся о каждом клиенте
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div key={index} className="flex gap-4 group">
                <div className="w-14 h-14 rounded-xl gradient-lab flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="h-7 w-7 text-lab-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {advantage.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
