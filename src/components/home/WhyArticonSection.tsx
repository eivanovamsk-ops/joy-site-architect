import { CheckCircle2, ShieldCheck, Users, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Проверенные решения",
    description:
      "Мы продаем то, что используем сами. Все оборудование и материалы проходят строгий отбор и ежедневное тестирование в нашей лаборатории.",
  },
  {
    icon: Users,
    title: "Актуальные знания",
    description:
      "Мы обучаем тем технологиям, которые применяем ежедневно. Вы учитесь у практикующих специалистов, а не у теоретиков.",
  },
  {
    icon: HeartHandshake,
    title: "Полный цикл поддержки",
    description:
      "С нами вы получаете полный цикл поддержки: от обучения и выбора оборудования до производства и технической помощи.",
  },
  {
    icon: CheckCircle2,
    title: "Единый стандарт качества",
    description:
      "Все наши направления работают по единым, высоким стандартам, гарантируя идеальную совместимость и предсказуемый результат.",
  },
];

const stats = [
  { value: ">10 лет", label: "На рынке цифровой стоматологии" },
  { value: "Топ-3", label: "Крупнейших лабораторий в стране" },
  { value: "170+", label: "Сотрудников в штате" },
  { value: ">50,000", label: "Выполненных работ за год" },
  { value: ">2,000", label: "Обученных специалистов" },
];

export function WhyArticonSection() {
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Наш опыт —{" "}
            <span className="text-gradient-primary">Ваше преимущество</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Наша миссия — сделать цифровую стоматологию доступной, эффективной и предсказуемой.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 border border-border hover-lift"
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                  <Icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="bg-foreground rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-background text-center mb-10">
            Артикон в цифрах
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-background/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
