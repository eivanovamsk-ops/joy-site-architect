import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import upceraA52 from "@/assets/products/upcera-a52-1.jpg";

export function UpceraShopBanner() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <Link to="/brands/upcera" className="block group">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[hsl(218,55%,18%)] to-[hsl(218,45%,28%)] p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <p className="text-accent text-xs uppercase tracking-widest mb-2 font-medium">
                  Официальный поставщик
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-primary-foreground mb-2">
                  UPCERA — CAD/CAM-решения для цифровой лаборатории
                </h3>
                <p className="text-primary-foreground/70 text-sm mb-4 max-w-lg">
                  Фрезерные станки, циркониевые диски, печи синтеризации и расходные материалы. 110+ стран, 120+ патентов.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 group-hover:border-accent group-hover:text-accent transition-colors"
                >
                  Узнать о бренде <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <div className="hidden md:block w-48 h-48 flex-shrink-0">
                <img
                  src={upceraA52}
                  alt="UPCERA оборудование"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
