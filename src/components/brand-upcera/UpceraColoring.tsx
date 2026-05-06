import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import upceraRealismColors from "@/assets/products/upcera-realism-colors.webp";
import upceraUpcadHt from "@/assets/products/upcera-upcad-ht.webp";

export function UpceraColoring() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">
          Дисиликат лития и система окрашивания
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* UP.CAD */}
          <div className="bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-[16/10] bg-muted/20 flex items-center justify-center p-6">
              <img
                src={upceraUpcadHt}
                alt="Дисиликат лития UP.CAD UPCERA"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-foreground mb-2">Дисиликат лития UP.CAD</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Блоки литий-дисиликатной стеклокерамики для фрезерования виниров, вкладок, накладок и одиночных коронок.
                Высокая эстетика и прочность до 530 МПа. Доступны в оттенках HT и LT.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/shop/catalog/press-ceramic">
                  Подробнее <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Coloring system */}
          <div className="bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-[16/10] bg-muted/20 flex items-center justify-center p-6">
              <img
                src={upceraRealismColors}
                alt="Окрашивающие жидкости Realism UPCERA"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-foreground mb-2">Система окрашивания Realism</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                16 оттенков VITA, флаконы 50 мл. Окрашивающие жидкости и глазурь для точной цветопередачи циркониевых реставраций.
                Стабильный результат при повторном нанесении.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/shop/catalog/paints-glaze">
                  Подробнее <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
