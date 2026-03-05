import { FlaskConical, ShieldCheck, BookOpen, Truck } from "lucide-react";

const points = [
  {
    icon: ShieldCheck,
    title: "Работаем только с теми брендами, за которые готовы отвечать",
    description: "Мы не расширяем ассортимент ради количества — в портфеле только те материалы, которые проходят реальную проверку.",
  },
  {
    icon: FlaskConical,
    title: "Каждый продукт проходит тестирование в нашей собственной лаборатории",
    description: 'Мы не продаём "по каталогу". Мы работаем на этих материалах сами.',
  },
  {
    icon: BookOpen,
    title: "Передаём практическую экспертизу, а не просто характеристики",
    description: "Режимы, нюансы синтера, поведение в потоке, сложные кейсы — делимся тем, что проверено в работе.",
  },
  {
    icon: Truck,
    title: "Обеспечиваем стабильные поставки и профессиональный сервис",
    description: "Документы, сроки, поддержка — всё выстроено так, чтобы лаборатория работала без пауз.",
  },
];

export function WhyArticon() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Преимущества работы с Articon
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {points.map((point, i) => {
            const Icon = point.icon;
            return (
              <div
                key={i}
                className="flex items-start gap-4 bg-secondary rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{point.title}</h3>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
