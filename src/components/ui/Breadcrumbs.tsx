import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Home } from "lucide-react";

const routeNames: Record<string, string> = {
  "": "Главная",
  laboratory: "Лаборатория",
  shop: "Магазин",
  education: "Учебный центр",
  about: "О компании",
  contacts: "Контакты",
  catalog: "Каталог",
  calendar: "Календарь курсов",
  services: "Услуги и цены",
  documents: "Прайс-листы",
  technologies: "Технологии",
  gallery: "Галерея работ",
  "how-to-order": "Как сделать заказ",
  "track-order": "Отслеживание заказа",
  "price-lists": "Прайс-листы",
  "intraoral-scanners": "Интраоральные сканеры",
  "lab-scanners": "Лабораторные сканеры",
  "3d-printers": "3D-печать",
  printers: "3D-печать",
  photopolymers: "Фотополимеры",
  "milling-machines": "Фрезерные станки",
  "zirconia-discs": "Циркониевые диски",
  "metal-discs": "Металлические диски",
  "pmma-discs": "Диски PMMA",
  "press-ceramic": "Пресс-керамика",
  burs: "Фрезы",
  "cadcam-discs": "Диски CAD/CAM",
  "paints-glaze": "Краски и глазурь",
  furnaces: "Печи",
  compressors: "Компрессоры",
  vacuums: "Пылесосы",
  sale: "Акции",
  delivery: "Доставка и оплата",
  privacy: "Конфиденциальность",
  terms: "Согласие на обработку данных",
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show on home, product detail, or course detail pages
  if (pathnames.length === 0 || pathnames.includes("product") || pathnames.includes("course") || pathnames.includes("variant")) {
    return null;
  }

  // Build breadcrumb items for JSON-LD
  const breadcrumbItems = [
    { name: "Главная", url: "https://articon.pro/" },
    ...pathnames.map((value, index) => {
      const url = `https://articon.pro/${pathnames.slice(0, index + 1).join("/")}`;
      const name = routeNames[value] || value;
      return { name, url };
    }),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <nav className="bg-secondary/50 border-b border-border" aria-label="Breadcrumb">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm flex-wrap">
            <li>
              <Link
                to="/"
                className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Главная</span>
              </Link>
            </li>

            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;
              const name = routeNames[value] || value;

              return (
                <li key={to} className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                  {isLast ? (
                    <span className="text-foreground font-medium">{name}</span>
                  ) : (
                    <Link
                      to={to}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
