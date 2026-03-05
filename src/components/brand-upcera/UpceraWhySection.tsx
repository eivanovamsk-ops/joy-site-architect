import { FlaskConical, Shield, Cog, Layers } from "lucide-react";

const reasons = [
  {
    icon: FlaskConical,
    title: "Реальные производственные тесты",
    desc: "Все материалы и оборудование UPCERA проходят проверку в работе. Мы тестируем цирконий, режимы синтеризации и фрезеровки на практике.",
  },
  {
    icon: Shield,
    title: "Прочность до 1300 МПа без потери эстетики",
    desc: "Серии ST и Explore позволяют выполнять как жевательные, так и эстетические реставрации с предсказуемым результатом.",
  },
  {
    icon: Cog,
    title: "Совместимость с CAD/CAM системами",
    desc: "Диски D98 доступны для Open CAD/CAM, Zirkonzahn, Amann Girrbach, CEREC inLab.",
  },
  {
    icon: Layers,
    title: "Полный цифровой цикл",
    desc: "Комплектация лаборатории под ключ: от фрезерного станка до окрашивающих жидкостей.",
  },
];

export function UpceraWhySection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Почему лаборатории выбирают Articon и UPCERA
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мы поставляем не просто материалы, а выстраиваем стабильный цифровой процесс в лаборатории.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="bg-card border border-border/50 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <r.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-sm">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
