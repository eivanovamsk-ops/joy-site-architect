import { Link } from "react-router-dom";
import { FlaskConical, ShoppingBag, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const directions = [
  {
    id: "shop",
    icon: ShoppingBag,
    title: "Оборудование и материалы",
    description:
      "Продаем только то, что используем сами. Проверенное оборудование, сканеры и материалы с полной технической поддержкой.",
    link: "/shop",
    buttonText: "Перейти в магазин",
    gradient: "gradient-accent",
    stats: [
      { value: "500+", label: "товаров" },
      { value: "15+", label: "брендов" },
    ],
  },
  {
    id: "education",
    icon: GraduationCap,
    title: "Практическое обучение",
    description:
      "Обучаем технологиям, которые применяем ежедневно. Курсы для врачей и техников от экспертов-практиков.",
    link: "/education",
    buttonText: "Перейти в учебный центр",
    gradient: "gradient-education",
    stats: [
      { value: "2000+", label: "выпускников" },
      { value: "30+", label: "курсов" },
    ],
  },
  {
    id: "laboratory",
    icon: FlaskConical,
    title: "Цифровая лаборатория",
    description:
      "Передовые протоколы, высокий сервис и гарантированное качество.",
    link: "/laboratory",
    buttonText: "Перейти в лабораторию",
    gradient: "gradient-lab",
    stats: [
      { value: "50K+", label: "работ в год" },
      { value: "170+", label: "специалистов" },
    ],
  },
];

export function DirectionsSection() {
  return (
    <section id="directions" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Направления{" "}
            <span className="text-gradient-primary">Артикон</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Артикон — это интегрированная платформа, созданная практикующими специалистами, для врачей и зубных техников. Мы объединили три ключевых направления, чтобы обеспечить вас всем необходимым для работы по современным цифровым протоколам.
          </p>
        </div>

        {/* Direction Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {directions.map((direction, index) => {
            const Icon = direction.icon;
            return (
              <div
                key={direction.id}
                className="group relative bg-card rounded-2xl border border-border overflow-hidden hover-lift flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Header */}
                <div className={`${direction.gradient} p-6 text-primary-foreground`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-background/20 flex items-center justify-center">
                      <Icon className="h-7 w-7" />
                    </div>
                    <ArrowRight className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{direction.title}</h3>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {direction.description}
                  </p>

                  {/* Stats and Button pushed to bottom */}
                  <div className="mt-auto">
                    {/* Stats */}
                    <div className="flex gap-6 mb-6">
                      {direction.stats.map((stat, i) => (
                        <div key={i}>
                          <div className="text-2xl font-bold text-primary">
                            {stat.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button
                      asChild
                      className="w-full gradient-primary text-primary-foreground"
                    >
                      <Link to={direction.link}>
                        {direction.buttonText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
