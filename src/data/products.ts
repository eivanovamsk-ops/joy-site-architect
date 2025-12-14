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
  subcategories?: { id: string; name: string }[];
}

export const categories: Category[] = [
  {
    id: "3d-printing",
    name: "3Д печать",
    subcategories: [
      { id: "3d-printers", name: "3Д принтеры" },
      { id: "consumables", name: "Расходные материалы" },
      { id: "photopolymers", name: "Фотополимеры" },
    ],
  },
  {
    id: "3d-scanners",
    name: "3Д сканеры",
    subcategories: [
      { id: "medical", name: "Врачебные" },
      { id: "technical", name: "Технические" },
      { id: "accessories", name: "Аксессуары для сканеров" },
    ],
  },
  {
    id: "milling-machines",
    name: "Фрезерные станки",
  },
  {
    id: "cutters",
    name: "Фрезы",
  },
  {
    id: "zirconia-discs",
    name: "Циркониевые диски",
    subcategories: [
      { id: "framework", name: "Каркасный" },
      { id: "white", name: "Белый" },
      { id: "multilayer", name: "Мультилеер" },
      { id: "colored", name: "Окрашенный" },
    ],
  },
  {
    id: "cad-cam",
    name: "CAD CAM",
    subcategories: [
      { id: "metal-discs", name: "Диски металл (CoCr/Ti)" },
      { id: "plastic-discs", name: "Диски пластик (PMMA)" },
      { id: "zirconia-discs-zro2", name: "Циркониевые диски (ZrO2)" },
      { id: "blocks", name: "Блоки" },
      { id: "paints-glaze", name: "Краски и глазурь" },
      { id: "press-ceramics", name: "Пресс-керамика" },
    ],
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Зуботехническая печь для синтеризации циркония UPCERA GT1 Pro",
    category: "cad-cam",
    subcategory: "paints-glaze",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/06/Frame-811546-6-300x300.png",
    brand: "Upcera",
    inStock: true,
    isNew: true,
  },
  {
    id: "2",
    name: "Интраоральный сканер Runyes 3DS V6",
    category: "3d-scanners",
    subcategory: "medical",
    price: 600000,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-62-300x300.jpg",
    brand: "Runyes",
    inStock: true,
    isNew: true,
  },
  {
    id: "3",
    name: "Интраоральный сканер Runyes 3DS V5",
    category: "3d-scanners",
    subcategory: "medical",
    price: 450000,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-58-300x300.jpg",
    brand: "Runyes",
    inStock: true,
  },
  {
    id: "4",
    name: "Фотополимер HARZ Labs Dental Tray V2 (1кг)",
    category: "3d-printing",
    subcategory: "photopolymers",
    price: 9900,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-51-300x300.jpg",
    brand: "HARZ Labs",
    inStock: true,
  },
  {
    id: "5",
    name: "Фотополимер HARZ Labs Dental Cast Cherry (1кг)",
    category: "3d-printing",
    subcategory: "photopolymers",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-44-300x300.jpg",
    brand: "HARZ Labs",
    inStock: true,
  },
  {
    id: "6",
    name: "Фотополимер HARZ Labs Dental Sand A1-A2 (1кг)",
    category: "3d-printing",
    subcategory: "photopolymers",
    price: 17900,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-41-300x300.jpg",
    brand: "HARZ Labs",
    inStock: true,
  },
  {
    id: "7",
    name: "Фотополимер HARZ Labs Dental Yellow Clear PRO (1кг)",
    category: "3d-printing",
    subcategory: "photopolymers",
    price: 13900,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-36-300x300.jpg",
    brand: "HARZ Labs",
    inStock: true,
  },
  {
    id: "8",
    name: "Фотополимер HARZ Labs Dental Model Light Grey (1 кг)",
    category: "3d-printing",
    subcategory: "photopolymers",
    price: 9700,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-35-300x300.jpg",
    brand: "HARZ Labs",
    inStock: true,
  },
  {
    id: "9",
    name: "Набор красок Upcera Realism (20 цветов)",
    category: "cad-cam",
    subcategory: "paints-glaze",
    price: 74980,
    image: "https://articon.pro/wp-content/uploads/2025/01/Frame-285-20-300x300.jpg",
    brand: "Upcera",
    inStock: true,
  },
  {
    id: "10",
    name: "Пылесос для фрезерных станков сухой обработки",
    category: "milling-machines",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/01/Frame-285-19-300x300.jpg",
    brand: "Articon",
    inStock: true,
  },
  {
    id: "11",
    name: "Фрезерный станок CAD CAM Upcera A52",
    category: "milling-machines",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/04/Group-432-800x800.png",
    brand: "Upcera",
    inStock: true,
    isNew: true,
  },
  {
    id: "12",
    name: "Интраоральный сканер Runyes 3DS V3",
    category: "3d-scanners",
    subcategory: "medical",
    price: 350000,
    image: "https://articon.pro/wp-content/uploads/2024/01/runyes-3ds-v3.png",
    brand: "Runyes",
    inStock: true,
  },
  {
    id: "13",
    name: "3D принтер UniFormation GKtwo",
    category: "3d-printing",
    subcategory: "3d-printers",
    price: 185000,
    image: "https://articon.pro/wp-content/uploads/2025/02/Frame-811544-1.jpg",
    brand: "UniFormation",
    inStock: true,
    isNew: true,
  },
  {
    id: "14",
    name: "Циркониевый диск Dental Direkt DD Bio ZX2 98x14мм",
    category: "zirconia-discs",
    subcategory: "multilayer",
    price: 8500,
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=300&h=300&fit=crop",
    brand: "Dental Direkt",
    inStock: true,
  },
  {
    id: "15",
    name: "Циркониевый диск Upcera Explore Esthetic 98x18мм A2",
    category: "zirconia-discs",
    subcategory: "colored",
    price: 7200,
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=300&h=300&fit=crop",
    brand: "Upcera",
    inStock: true,
  },
  {
    id: "16",
    name: "PMMA диск Yamahachi 98x20мм A3",
    category: "cad-cam",
    subcategory: "plastic-discs",
    price: 3200,
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=300&h=300&fit=crop",
    brand: "Yamahachi",
    inStock: true,
  },
  {
    id: "17",
    name: "Фреза для циркония VHF 2.0мм",
    category: "cutters",
    price: 4500,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&h=300&fit=crop",
    brand: "VHF",
    inStock: true,
  },
  {
    id: "18",
    name: "Фреза для PMMA Roland 1.0мм",
    category: "cutters",
    price: 2800,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&h=300&fit=crop",
    brand: "Roland",
    inStock: true,
  },
  {
    id: "19",
    name: "Лабораторный сканер Medit T710",
    category: "3d-scanners",
    subcategory: "technical",
    price: 850000,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=300&fit=crop",
    brand: "Medit",
    inStock: true,
  },
  {
    id: "20",
    name: "Спрей для сканирования Helling 3D",
    category: "3d-scanners",
    subcategory: "accessories",
    price: 1200,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=300&fit=crop",
    brand: "Helling",
    inStock: true,
  },
];
