// Breadcrumb mapping for product pages
// Maps category + subcategory to proper breadcrumb trail

interface BreadcrumbItem {
  label: string;
  href: string;
}

const categoryMap: Record<string, BreadcrumbItem> = {
  "3d-print": { label: "3Д-печать", href: "/shop/catalog/printers" },
  "3d-scanners": { label: "3Д-сканеры", href: "/shop/catalog/intraoral-scanners" },
  "cad-cam-discs": { label: "Диски CAD/CAM", href: "/shop/catalog/cadcam-discs" },
  "milling": { label: "Фрезерные станки", href: "/shop/catalog/milling-machines" },
  "paints-glazes": { label: "Краски и глазурь", href: "/shop/catalog/paints-glaze" },
};

const subcategoryMap: Record<string, BreadcrumbItem> = {
  // 3D-печать
  "3d-printers": { label: "3D-принтеры", href: "/shop/catalog/printers" },
  "curing-chambers": { label: "Камеры для полимеризации", href: "/shop/catalog/curing-chambers" },
  "photopolymers": { label: "Фотополимеры", href: "/shop/catalog/photopolymers" },
  // 3D-сканеры
  "clinical": { label: "Интраоральные сканеры", href: "/shop/catalog/intraoral-scanners" },
  "laboratory": { label: "Лабораторные сканеры", href: "/shop/catalog/lab-scanners" },
  // Диски CAD/CAM
  "zirconia-framework": { label: "Циркониевые диски", href: "/shop/catalog/zirconia-discs" },
  "zirconia-white": { label: "Циркониевые диски", href: "/shop/catalog/zirconia-discs" },
  "zirconia-multilayer": { label: "Циркониевые диски", href: "/shop/catalog/zirconia-discs" },
  "press-ceramic": { label: "Пресс-керамика", href: "/shop/catalog/press-ceramic" },
  "metal-discs": { label: "Диски металл", href: "/shop/catalog/metal-discs" },
  "pmma-discs": { label: "Диски ПММА", href: "/shop/catalog/pmma-discs" },
  // Фрезерное оборудование
  "machines": { label: "Станки", href: "/shop/catalog/milling-machines" },
  "furnaces": { label: "Печи", href: "/shop/catalog/furnaces" },
  "compressors": { label: "Компрессоры", href: "/shop/catalog/compressors" },
  "vacuums": { label: "Пылесосы", href: "/shop/catalog/vacuums" },
  "cutters": { label: "Фрезы", href: "/shop/catalog/burs" },
};

export function getProductBreadcrumbs(
  category: string,
  subcategory?: string
): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [{ label: "Магазин", href: "/shop" }];

  const cat = categoryMap[category];
  if (cat) {
    crumbs.push(cat);
  }

  if (subcategory) {
    const sub = subcategoryMap[subcategory];
    // Only add subcategory if it's different from the category link
    if (sub && sub.href !== cat?.href) {
      crumbs.push(sub);
    }
  }

  return crumbs;
}
