import { Shield, Target, Zap } from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "Надёжность",
    desc: "110+ стран присутствия, 120+ патентов, 50+ сертификатов. Глобальный масштаб и проверенное качество.",
  },
  {
    icon: Target,
    title: "Точность",
    desc: "Прочность до 1300 МПа, контролируемая усадка, полная совместимость с ведущими CAD/CAM системами.",
  },
  {
    icon: Zap,
    title: "Скорость",
    desc: "Фрезерование до 80 000 об/мин, высокоскоростная синтеризация — минимальное время производства.",
  },
];

export function UpceraWhyArticon() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Почему Articon выбирает UPCERA
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мы формируем продуктовую линейку на основе технологической стабильности,
            международного масштаба и предсказуемого результата в работе лаборатории.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {pillars.map((p) => (
            <div key={p.title} className="text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <p.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
