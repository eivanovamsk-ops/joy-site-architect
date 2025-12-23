import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Subcategory {
  id: string;
  name: string;
  href: string;
  subcategories?: { id: string; name: string; href: string }[];
}

interface Category {
  id: string;
  name: string;
  href: string;
  subcategories?: Subcategory[];
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
    subcategories: [
      { 
        id: "zirconia", 
        name: "Диски циркониевые", 
        href: "/shop/catalog/zirconia-discs",
        subcategories: [
          { id: "framework", name: "Каркасный", href: "/shop/catalog/zirconia-discs?type=framework" },
          { id: "white", name: "Белый", href: "/shop/catalog/zirconia-discs?type=white" },
          { id: "multilayer", name: "Мультилеер", href: "/shop/catalog/zirconia-discs?type=multilayer" },
          { id: "colored", name: "Окрашенный", href: "/shop/catalog/zirconia-discs?type=colored" },
        ],
      },
      { id: "pmma", name: "Диски PMMA", href: "/shop/catalog/zirconia-discs?material=PMMA" },
      { id: "plastic", name: "Диски пластиковые", href: "/shop/catalog/zirconia-discs?material=Пластик" },
    ],
  },
];

export const CatalogSidebar = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const currentPath = location.pathname;
  const currentSearch = location.search;
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["discs", "zirconia"]);

  const toggleExpand = (id: string) => {
    setExpandedCategories(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isActive = (href: string) => {
    const [path, query] = href.split("?");
    if (query) {
      return currentPath === path && currentSearch === `?${query}`;
    }
    return currentPath === href && !currentSearch;
  };

  const isCategoryActive = (category: Category | Subcategory): boolean => {
    if (isActive(category.href)) return true;
    if ('subcategories' in category && category.subcategories) {
      return category.subcategories.some((sub) => isCategoryActive(sub));
    }
    return false;
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
            <div className="flex items-center">
              <Link
                to={category.href}
                className={cn(
                  "flex-1 text-left px-3 py-2 rounded-md text-sm transition-colors",
                  isCategoryActive(category) && !category.subcategories?.some((sub) => isCategoryActive(sub))
                    ? "bg-primary text-primary-foreground"
                    : isCategoryActive(category)
                    ? "text-foreground font-medium"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {category.name}
              </Link>
              {category.subcategories && (
                <button 
                  onClick={() => toggleExpand(category.id)}
                  className="p-2 hover:bg-muted rounded-md transition-colors"
                >
                  {expandedCategories.includes(category.id) ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              )}
            </div>

            {category.subcategories && expandedCategories.includes(category.id) && (
              <div className="ml-3 mt-1 space-y-1 border-l border-border pl-2">
                {category.subcategories.map((sub) => (
                  <div key={sub.id}>
                    <div className="flex items-center">
                      <Link
                        to={sub.href}
                        className={cn(
                          "flex-1 text-left px-3 py-1.5 rounded-md text-sm transition-colors",
                          isActive(sub.href)
                            ? "bg-primary/80 text-primary-foreground"
                            : isCategoryActive(sub)
                            ? "text-foreground font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {sub.name}
                      </Link>
                      {sub.subcategories && (
                        <button 
                          onClick={() => toggleExpand(sub.id)}
                          className="p-1.5 hover:bg-muted rounded-md transition-colors"
                        >
                          {expandedCategories.includes(sub.id) ? (
                            <ChevronDown className="h-3 w-3 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-3 w-3 text-muted-foreground" />
                          )}
                        </button>
                      )}
                    </div>

                    {sub.subcategories && expandedCategories.includes(sub.id) && (
                      <div className="ml-3 mt-1 space-y-1 border-l border-border pl-2">
                        {sub.subcategories.map((subsub) => (
                          <Link
                            key={subsub.id}
                            to={subsub.href}
                            className={cn(
                              "block text-left px-3 py-1 rounded-md text-xs transition-colors",
                              isActive(subsub.href)
                                ? "bg-primary/70 text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            {subsub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
