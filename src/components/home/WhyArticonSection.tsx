import { CheckCircle2, ShieldCheck, Users, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Продаём то, что используем сами",
    description:
      "Всё оборудование и материалы в нашем магазине проходят проверку в нашей собственной лаборатории. Мы рекомендуем только то, в чём уверены.",
  },
  {
    icon: Users,
    title: "Обучаем тому, что применяем ежедневно",
    description:
      "Наши преподаватели — практикующие специалисты, которые работают в лаборатории и используют те же технологии, которым обучают.",
  },
  {
    icon: HeartHandshake,
    title: "Полный цикл поддержки",
    description:
      "От выбора оборудования и обучения до производства зубных протезов — мы сопровождаем вас на всех этапах работы.",
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
            Почему выбирают{" "}
            <span className="text-gradient-primary">Артикон?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Уникальное сочетание опыта, технологий и экспертизы, которое делает
            нас надёжным партнёром для стоматологических клиник и лабораторий.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
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
