export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number | null;
  image: string;
  brand: string;
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

export interface Category {
  id: string;
  name: string;
  subcategories?: { id: string; name: string; href?: string }[];
}

export const categories: Category[] = [
  {
    id: "3d-print",
    name: "3Д-печать",
    subcategories: [
      { id: "3d-printers", name: "3Д-принтеры", href: "/shop/catalog/3d-printers" },
      { id: "photopolymers", name: "Фотополимеры", href: "/shop/catalog/photopolymers" },
    ],
  },
  {
    id: "3d-scanners",
    name: "3Д-сканеры",
    subcategories: [
      { id: "clinical", name: "Клинические", href: "/shop/catalog/intraoral-scanners" },
      { id: "laboratory", name: "Лабораторные", href: "/shop/catalog/lab-scanners" },
    ],
  },
  {
    id: "milling",
    name: "Фрезерные станки",
    subcategories: [
      { id: "machines", name: "Станки" },
      { id: "compressors", name: "Компрессоры" },
      { id: "vacuums", name: "Пылесосы" },
      { id: "cutters", name: "Фрезы" },
    ],
  },
  {
    id: "zircon-discs",
    name: "Диски циркон",
    subcategories: [
      { id: "white", name: "Белый" },
      { id: "colored", name: "Окрашенный" },
      { id: "multilayer", name: "Мультилеер" },
    ],
  },
  {
    id: "cad-cam-discs",
    name: "Диски Cad Cam",
    subcategories: [
      { id: "titanium", name: "Титан" },
      { id: "pmma", name: "ПММА" },
      { id: "composite", name: "Композит" },
    ],
  },
  {
    id: "paints-glazes",
    name: "Краски и глазурь",
    subcategories: [
      { id: "low-temp", name: "Низкотемпературные" },
      { id: "glaze", name: "Глазурь" },
    ],
  },
  {
    id: "furnaces",
    name: "Печи",
  },
];

export const products: Product[] = [
  // 3Д-печать - 3Д-принтеры
  {
    id: "1",
    name: "3D-принтер UltraCraft A2D HD HeyGears",
    category: "3d-print",
    subcategory: "3d-printers",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/02/Frame-811544-1.jpg",
    brand: "HeyGears",
    inStock: true,
    isNew: true,
  },
  {
    id: "2",
    name: "3D принтер UniFormation GK3 Ultra",
    category: "3d-print",
    subcategory: "3d-printers",
    price: 285000,
    image: "https://articon.pro/wp-content/uploads/2025/02/Frame-811544-1.jpg",
    brand: "UniFormation",
    inStock: true,
    isNew: true,
  },
  {
    id: "3",
    name: "Полимеризационная камера UniFormation Cure 3 Ultra",
    category: "3d-print",
    subcategory: "3d-printers",
    price: 45000,
    image: "https://articon.pro/wp-content/uploads/2025/02/Frame-811544-1.jpg",
    brand: "UniFormation",
    inStock: true,
  },
  {
    id: "4",
    name: "3D принтер UniFormation GKtwo",
    category: "3d-print",
    subcategory: "3d-printers",
    price: 185000,
    image: "https://articon.pro/wp-content/uploads/2025/02/Frame-811544-1.jpg",
    brand: "UniFormation",
    inStock: true,
  },
  // 3Д-печать - Фотополимеры
  {
    id: "5",
    name: "Фотополимер TOPCORE Model Pro",
    category: "3d-print",
    subcategory: "photopolymers",
    price: 8500,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-51-300x300.jpg",
    brand: "TOPCORE",
    inStock: true,
  },
  {
    id: "6",
    name: "Фотополимер HARZ Labs Dental Tray V2 (1кг)",
    category: "3d-print",
    subcategory: "photopolymers",
    price: 9900,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-51-300x300.jpg",
    brand: "HARZ Labs",
    inStock: true,
  },
  {
    id: "7",
    name: "Фотополимер HARZ Labs Dental Cast Cherry (1кг)",
    category: "3d-print",
    subcategory: "photopolymers",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-44-300x300.jpg",
    brand: "HARZ Labs",
    inStock: true,
  },
  {
    id: "8",
    name: "Фотополимер HARZ Labs Dental Sand A1-A2 (1кг)",
    category: "3d-print",
    subcategory: "photopolymers",
    price: 17900,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-41-300x300.jpg",
    brand: "HARZ Labs",
    inStock: true,
  },
  // 3Д-сканеры - Клинические
  {
    id: "9",
    name: "Интраоральный сканер Runyes 3DS V6",
    category: "3d-scanners",
    subcategory: "clinical",
    price: 600000,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-62-300x300.jpg",
    brand: "Runyes",
    inStock: true,
    isNew: true,
  },
  {
    id: "10",
    name: "Интраоральный сканер Runyes 3DS V5",
    category: "3d-scanners",
    subcategory: "clinical",
    price: 450000,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-58-300x300.jpg",
    brand: "Runyes",
    inStock: true,
  },
  {
    id: "11",
    name: "Интраоральный сканер Runyes 3DS V3",
    category: "3d-scanners",
    subcategory: "clinical",
    price: 350000,
    image: "https://articon.pro/wp-content/uploads/2024/01/runyes-3ds-v3.png",
    brand: "Runyes",
    inStock: true,
  },
  // 3Д-сканеры - Лабораторные
  {
    id: "12",
    name: "Лабораторный 3D сканер Medit T310",
    category: "3d-scanners",
    subcategory: "laboratory",
    price: 655000,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=300&fit=crop",
    brand: "Medit",
    inStock: true,
    isSale: true,
  },
  {
    id: "13",
    name: "Лабораторный сканер Medit T710",
    category: "3d-scanners",
    subcategory: "laboratory",
    price: 850000,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=300&fit=crop",
    brand: "Medit",
    inStock: true,
  },
  // Фрезерные станки - Станки
  {
    id: "14",
    name: "Фрезерный станок CAD CAM Upcera A52",
    category: "milling",
    subcategory: "machines",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/04/Group-432-800x800.png",
    brand: "Upcera",
    inStock: true,
    isNew: true,
  },
  {
    id: "15",
    name: "Фрезерный станок VHF K5+",
    category: "milling",
    subcategory: "machines",
    price: 2500000,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&h=300&fit=crop",
    brand: "VHF",
    inStock: true,
  },
  // Фрезерные станки - Пылесосы
  {
    id: "16",
    name: "Пылесос для фрезерных станков сухой обработки",
    category: "milling",
    subcategory: "vacuums",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/01/Frame-285-19-300x300.jpg",
    brand: "Articon",
    inStock: true,
  },
  // Фрезерные станки - Фрезы
  {
    id: "17",
    name: "Фреза для циркония VHF 2.0мм",
    category: "milling",
    subcategory: "cutters",
    price: 4500,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&h=300&fit=crop",
    brand: "VHF",
    inStock: true,
  },
  {
    id: "18",
    name: "Фреза для PMMA Roland 1.0мм",
    category: "milling",
    subcategory: "cutters",
    price: 2800,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&h=300&fit=crop",
    brand: "Roland",
    inStock: true,
  },
  // Диски циркон - Белый
  {
    id: "19",
    name: "Циркониевый диск Upcera White 98x14мм",
    category: "zircon-discs",
    subcategory: "white",
    price: 5500,
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=300&h=300&fit=crop",
    brand: "Upcera",
    inStock: true,
  },
  // Диски циркон - Окрашенный
  {
    id: "20",
    name: "Циркониевый диск Upcera Explore Esthetic 98x18мм A2",
    category: "zircon-discs",
    subcategory: "colored",
    price: 7200,
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=300&h=300&fit=crop",
    brand: "Upcera",
    inStock: true,
  },
  // Диски циркон - Мультилеер
  {
    id: "21",
    name: "Циркониевый диск Dental Direkt DD Bio ZX2 98x14мм",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 8500,
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=300&h=300&fit=crop",
    brand: "Dental Direkt",
    inStock: true,
  },
  // Диски Cad Cam - Титан
  {
    id: "22",
    name: "Титановый диск CoCr 98x12мм",
    category: "cad-cam-discs",
    subcategory: "titanium",
    price: 12500,
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=300&h=300&fit=crop",
    brand: "Dental Direkt",
    inStock: true,
  },
  // Диски Cad Cam - ПММА
  {
    id: "23",
    name: "PMMA диск Yamahachi 98x20мм A3",
    category: "cad-cam-discs",
    subcategory: "pmma",
    price: 3200,
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=300&h=300&fit=crop",
    brand: "Yamahachi",
    inStock: true,
  },
  // Диски Cad Cam - Композит
  {
    id: "24",
    name: "Композитный диск Shofu 98x18мм",
    category: "cad-cam-discs",
    subcategory: "composite",
    price: 4800,
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=300&h=300&fit=crop",
    brand: "Shofu",
    inStock: true,
  },
  // Краски и глазурь - Низкотемпературные
  {
    id: "25",
    name: "Набор красок Upcera Realism (20 цветов)",
    category: "paints-glazes",
    subcategory: "low-temp",
    price: 74980,
    image: "https://articon.pro/wp-content/uploads/2025/01/Frame-285-20-300x300.jpg",
    brand: "Upcera",
    inStock: true,
  },
  // Краски и глазурь - Глазурь
  {
    id: "26",
    name: "Глазурь Ivoclar IPS e.max Ceram",
    category: "paints-glazes",
    subcategory: "glaze",
    price: 8900,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=300&fit=crop",
    brand: "Ivoclar",
    inStock: true,
  },
  // Печи
  {
    id: "27",
    name: "Зуботехническая печь для синтеризации циркония UPCERA GT1 Pro",
    category: "furnaces",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/06/Frame-811546-6-300x300.png",
    brand: "Upcera",
    inStock: true,
    isNew: true,
  },
  {
    id: "28",
    name: "Печь для обжига керамики Programat P510",
    category: "furnaces",
    price: 650000,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&h=300&fit=crop",
    brand: "Ivoclar",
    inStock: true,
  },
];
