import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Для врачей",
    description: "Практические курсы по современным протоколам лечения",
    items: [
      { name: "Ортопедия", count: 8 },
      { name: "Ортодонтия", count: 5 },
      { name: "Хирургия", count: 6 },
      { name: "Цифровое планирование", count: 4 },
      { name: "Дентальный фотопротокол", count: 3 },
    ],
  },
  {
    title: "Для техников",
    description: "Курсы по цифровым технологиям в зуботехнике",
    items: [
      { name: "CAD/CAM (Exocad)", count: 6 },
      { name: "3D-моделирование", count: 4 },
      { name: "Цифровая ортодонтия", count: 5 },
      { name: "3D-печать", count: 3 },
    ],
  },
];

export function EducationCategories() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Направления обучения
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Выберите направление обучения, которое соответствует вашим профессиональным целям
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-6 hover-lift"
            >
              <h3 className="text-xl font-bold mb-2">{category.title}</h3>
              <p className="text-sm text-muted-foreground mb-6">{category.description}</p>
              <ul className="space-y-3">
                {category.items.map((item, i) => (
                  <li key={i}>
                    <Link
                      to="/education/calendar"
                      className="flex items-center justify-between text-foreground hover:text-primary transition-colors group"
                    >
                      <span className="flex items-center gap-3">
                        <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        {item.name}
                      </span>
                      <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                        {item.count} курсов
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
