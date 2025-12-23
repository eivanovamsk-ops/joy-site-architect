import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  href: string;
  subcategories?: { id: string; name: string; href: string }[];
}

const catalogCategories: Category[] = [
  {
    id: "3d-printing",
    name: "3Д-печать",
    href: "/shop/catalog/printers",
    subcategories: [
      { id: "printers", name: "3D-принтеры", href: "/shop/catalog/printers" },
      { id: "photopolymers", name: "Фотополимеры", href: "/shop/catalog/photopolymers" },
    ],
  },
  {
    id: "3d-scanners",
    name: "3Д-сканеры",
    href: "/shop/catalog/intraoral-scanners",
    subcategories: [
      { id: "intraoral", name: "Интраоральные сканеры", href: "/shop/catalog/intraoral-scanners" },
      { id: "laboratory", name: "Лабораторные сканеры", href: "/shop/catalog/lab-scanners" },
    ],
  },
  {
    id: "milling",
    name: "Фрезерные станки",
    href: "/shop/catalog/milling-machines",
    subcategories: [
      { id: "machines", name: "Станки", href: "/shop/catalog/milling-machines" },
      { id: "burs", name: "Фрезы", href: "/shop/catalog/burs" },
    ],
  },
  {
    id: "discs",
    name: "Диски CAD/CAM",
    href: "/shop/catalog/zirconia-discs",
  },
];

export const CatalogSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (href: string) => currentPath === href;
  const isCategoryActive = (category: Category) => {
    if (isActive(category.href)) return true;
    return category.subcategories?.some((sub) => isActive(sub.href)) || false;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 sticky top-24">
      <h3 className="font-semibold text-foreground mb-4 text-lg">Категории</h3>

      <div className="space-y-1">
        <Link
          to="/shop"
          className={cn(
            "w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between",
            currentPath === "/shop"
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-muted"
          )}
        >
          <span>Все товары</span>
        </Link>

        {catalogCategories.map((category) => (
          <div key={category.id}>
            <Link
              to={category.href}
              className={cn(
                "w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between",
                isCategoryActive(category) && !category.subcategories?.some((sub) => isActive(sub.href))
                  ? "bg-primary text-primary-foreground"
                  : isCategoryActive(category)
                  ? "text-foreground font-medium"
                  : "text-foreground hover:bg-muted"
              )}
            >
              <span>{category.name}</span>
              {category.subcategories && (
                <ChevronRight className="h-4 w-4" />
              )}
            </Link>

            {category.subcategories && (
              <div className="ml-4 mt-1 space-y-1">
                {category.subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    to={sub.href}
                    className={cn(
                      "w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors block",
                      isActive(sub.href)
                        ? "bg-primary/80 text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
