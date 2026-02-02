import { ArrowRight, Truck, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function ShopHeroBanner() {
  return (
    <section className="relative py-16 lg:py-24 gradient-accent overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-foreground mb-6">
              CAD/CAM оборудование и материалы для зуботехнических лабораторий
            </h1>
            <p className="text-xl text-accent-foreground/80 mb-8">
              3D-принтеры, сканеры, фрезерные станки, циркониевые диски и расходные материалы от ведущих мировых производителей. Доставка по России, гарантия, техподдержка.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                <Link to="/shop/catalog/3d-printers">
                  Каталог оборудования
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10">
                <Link to="/contacts">
                  Получить консультацию
                </Link>
              </Button>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 text-accent-foreground/80">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                <span className="text-sm">Доставка по РФ</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">Гарантия 12 мес.</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="h-5 w-5" />
                <span className="text-sm">Техподдержка 24/7</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-full aspect-square rounded-3xl bg-accent-foreground/10 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-accent-foreground mb-4">200+</div>
                <div className="text-xl text-accent-foreground/80">товаров в каталоге</div>
                <div className="mt-6 text-accent-foreground/60">
                  Asiga • Medit • Upcera • imes-icore • Nabertherm • Dental Direkt
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
