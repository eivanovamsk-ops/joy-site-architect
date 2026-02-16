import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Для врачей",
    description: "Практические курсы по современным протоколам лечения",
    items: [
      { name: "Ортопедия", href: "/education/calendar?category=Ортопедия" },
      { name: "Ортодонтия", href: "/education/calendar?category=Ортодонтия" },
    ],
  },
  {
    title: "Для техников",
    description: "Курсы по цифровым технологиям в зуботехнике",
    items: [
      { name: "CAD/CAM", href: "/education/calendar?category=CAD%2FCAM" },
      { name: "Ортодонтия", href: "/education/calendar?category=Ортодонтия" },
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
                      to={item.href}
                      className="flex items-center justify-between text-foreground hover:text-primary transition-colors group"
                    >
                      <span className="flex items-center gap-3">
                        <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        {item.name}
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
