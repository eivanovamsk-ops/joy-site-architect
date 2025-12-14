import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const galleryItems = [
  { id: 1, title: "Виниры E.max", category: "Эстетика" },
  { id: 2, title: "Циркониевые коронки", category: "Эстетика" },
  { id: 3, title: "Элайнеры", category: "Ортодонтия" },
  { id: 4, title: "Хирургический шаблон", category: "Хирургия" },
  { id: 5, title: "Балочная конструкция", category: "Имплантация" },
  { id: 6, title: "Полный съёмный протез", category: "Съёмное" },
];

export function LaboratoryGalleryPreview() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Галерея работ
            </h2>
            <p className="text-muted-foreground">
              Примеры выполненных работ нашей лаборатории
            </p>
          </div>
          <Link to="/laboratory/gallery" className="hidden md:block">
            <Button variant="outline">
              Вся галерея
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="aspect-square rounded-2xl bg-secondary border border-border overflow-hidden group cursor-pointer hover-lift"
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                <span className="text-xs text-primary mb-2">{item.category}</span>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link to="/laboratory/gallery">
            <Button variant="outline">
              Смотреть всю галерею
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
