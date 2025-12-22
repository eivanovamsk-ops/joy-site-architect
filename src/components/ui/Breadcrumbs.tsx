import { Link, useLocation } from "react-router-dom";
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
  technologies: "Технологии",
  gallery: "Галерея работ",
  "how-to-order": "Как сделать заказ",
  "track-order": "Отслеживание заказа",
  "price-lists": "Прайс-листы",
  "intraoral-scanners": "Интраоральные сканеры",
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) {
    return null; // Don't show breadcrumbs on home page
  }

  return (
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
  );
}
