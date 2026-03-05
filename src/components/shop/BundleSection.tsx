import { Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import bundleBanner from "@/assets/products/upcera-bundle-banner.png";

export function BundleSection() {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Package className="h-5 w-5 text-primary" />
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Комплекты</h2>
      </div>

      <Link to="/shop/bundle/upcera-cadcam-kit" className="block">
        <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="relative overflow-hidden bg-gradient-to-br from-[hsl(220,60%,95%)] to-[hsl(220,40%,98%)]">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <Badge className="w-fit mb-4 bg-accent text-accent-foreground text-sm px-3 py-1">
                  –8% при покупке комплектом
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  CAD/CAM-комплект UPCERA
                </h3>
                <p className="text-lg text-muted-foreground mb-2">
                  для цифровой лаборатории
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                  Запустите или модернизируйте цифровую зуботехническую лабораторию на базе оборудования UPCERA
                  и получите комплект выгоднее на 8% по сравнению с покупкой каждого устройства отдельно.
                </p>
                <span className="mt-4 text-primary font-medium text-sm">Подробнее →</span>
              </div>
              <div className="flex items-center justify-center p-4">
                <img
                  src={bundleBanner}
                  alt="CAD/CAM-комплект UPCERA: A52, GT1 Pro, R-412"
                  className="w-full max-w-md object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
