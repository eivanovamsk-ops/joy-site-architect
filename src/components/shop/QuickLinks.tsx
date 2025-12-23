import { Link } from "react-router-dom";
import { 
  BadgePercent, 
  Scan, 
  ScanLine, 
  Printer, 
  FlaskConical, 
  Cog, 
  Disc, 
  Palette,
  CircleDot
} from "lucide-react";

const categories = [
  { name: "SALE", icon: BadgePercent, color: "destructive", slug: "sale" },
  { name: "Лабораторные 3D-сканеры", icon: Scan, slug: "lab-scanners" },
  { name: "Интраоральные 3D-сканеры", icon: ScanLine, slug: "intraoral-scanners" },
  { name: "3D-принтеры", icon: Printer, slug: "3d-printers" },
  { name: "Фотополимеры", icon: FlaskConical, slug: "photopolymers" },
  { name: "Фрезерные станки", icon: Cog, slug: "milling-machines" },
  { name: "Фрезы", icon: CircleDot, slug: "burs" },
  { name: "Циркониевые диски", icon: Disc, slug: "zirconia-discs" },
  { name: "Диски CAD/CAM", icon: Disc, slug: "cadcam-discs" },
  { name: "Краски и глазурь", icon: Palette, slug: "paints-glaze" },
];

export function ShopQuickLinks() {
  return (
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Категории товаров</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={index}
                to={`/shop/catalog/${category.slug}`}
                className={`bg-card border rounded-xl p-4 text-center hover-lift group ${
                  category.color === "destructive" 
                    ? "border-destructive bg-destructive/5" 
                    : "border-border"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${
                  category.color === "destructive"
                    ? "bg-destructive/10"
                    : "bg-primary/10 group-hover:bg-primary/20"
                } transition-colors`}>
                  <Icon className={`h-6 w-6 ${
                    category.color === "destructive" 
                      ? "text-destructive" 
                      : "text-primary"
                  }`} />
                </div>
                <div className={`text-sm font-medium ${
                  category.color === "destructive" 
                    ? "text-destructive" 
                    : "text-foreground group-hover:text-primary"
                } transition-colors`}>
                  {category.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
