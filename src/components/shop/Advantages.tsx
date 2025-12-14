import { Truck, Headphones, BadgePercent, Shield } from "lucide-react";

const advantages = [
  {
    icon: Truck,
    title: "Доставка по всей России",
    description: "Отправка большинства заказов в тот же день",
  },
  {
    icon: Headphones,
    title: "Техническая поддержка",
    description: "Гарантия качества и полная поддержка 24/7",
  },
  {
    icon: BadgePercent,
    title: "Лучшая цена",
    description: "Конкурентные цены на все товары",
  },
  {
    icon: Shield,
    title: "Гарантия качества",
    description: "Продаём то, что используем сами",
  },
];

export function ShopAdvantages() {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div key={index} className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <Icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{advantage.title}</h3>
                  <p className="text-sm text-muted-foreground">
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
