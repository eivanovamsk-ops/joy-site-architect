// Rundeer V5 images
import rundeerV5Main from "@/assets/products/rundeer-v5.png";
import rundeerV5_1 from "@/assets/products/rundeer-v5-1.png";
import rundeerV5_2 from "@/assets/products/rundeer-v5-2.png";
import rundeerV5_3 from "@/assets/products/rundeer-v5-3.png";
import rundeerV5_4 from "@/assets/products/rundeer-v5-4.png";
import rundeerV5_5 from "@/assets/products/rundeer-v5-5.png";
import rundeerV5_6 from "@/assets/products/rundeer-v5-6.png";
import rundeerV5_7 from "@/assets/products/rundeer-v5-7.png";
import rundeerV5_8 from "@/assets/products/rundeer-v5-8.png";
import rundeerV5_9 from "@/assets/products/rundeer-v5-9.png";

// Rundeer V6 images
import rundeerV6Main from "@/assets/products/rundeer-v6.png";
import rundeerV6_1 from "@/assets/products/rundeer-v6-1.png";
import rundeerV6_2 from "@/assets/products/rundeer-v6-2.png";
import rundeerV6_3 from "@/assets/products/rundeer-v6-3.png";
import rundeerV6_4 from "@/assets/products/rundeer-v6-4.png";
import rundeerV6_5 from "@/assets/products/rundeer-v6-5.png";
import rundeerV6_6 from "@/assets/products/rundeer-v6-6.png";

// Uniformation GK3 Ultra images
import uniformationGk3UltraMain from "@/assets/products/uniformation-gk3-ultra.jpg";
import uniformationGk3Ultra1 from "@/assets/products/uniformation-gk3-ultra-1.jpg";

// Uniformation GK3 Ultra (actual Ultra model) images
import gk3UltraMain from "@/assets/products/gk3-ultra-main.jpg";
import gk3Ultra1 from "@/assets/products/gk3-ultra-1.jpg";

// TOPCORE images
import topcoreCompositeA1 from "@/assets/products/topcore-composite-a1.png";
import topcoreCompositeA2 from "@/assets/products/topcore-composite-a2.png";
import topcoreCompositeA3 from "@/assets/products/topcore-composite-a3.png";
import topcoreCompositeBleach from "@/assets/products/topcore-composite-bleach.png";
import topcoreModel from "@/assets/products/topcore-model.png";
import topcoreModelPro from "@/assets/products/topcore-model-pro.png";
import topcorePink from "@/assets/products/topcore-pink.png";
import topcorePinkBase from "@/assets/products/topcore-pink-base.png";
import topcoreSg from "@/assets/products/topcore-sg.png";

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number | null;
  oldPrice?: number | null;
  image: string;
  gallery?: string[];
  brand: string;
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  sku?: string;
  description?: string;
  specifications?: Record<string, string>;
  externalUrl?: string;
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
      { id: "consumables", name: "Расходные материалы", href: "/shop/catalog/consumables" },
    ],
  },
  {
    id: "3d-scanners",
    name: "3Д-сканеры",
    subcategories: [
      { id: "clinical", name: "Врачебные (интраоральные)", href: "/shop/catalog/intraoral-scanners" },
      { id: "laboratory", name: "Лабораторные", href: "/shop/catalog/lab-scanners" },
      { id: "accessories", name: "Аксессуары", href: "/shop/catalog/scanner-accessories" },
    ],
  },
  {
    id: "milling",
    name: "Фрезерное оборудование",
    subcategories: [
      { id: "machines", name: "Фрезерные станки", href: "/shop/catalog/milling-machines" },
      { id: "cutters", name: "Фрезы", href: "/shop/catalog/burs" },
      { id: "vacuums", name: "Пылесосы" },
      { id: "compressors", name: "Компрессоры" },
    ],
  },
  {
    id: "furnaces",
    name: "Зуботехнические печи",
    subcategories: [
      { id: "sintering", name: "Печи для синтеризации", href: "/shop/catalog/furnaces" },
      { id: "firing", name: "Печи для обжига" },
    ],
  },
  {
    id: "zircon-discs",
    name: "Циркониевые диски",
    subcategories: [
      { id: "framework", name: "Каркасный" },
      { id: "multilayer", name: "Мультилеер" },
      { id: "white", name: "Белый" },
      { id: "colored", name: "Окрашенный" },
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
];

export const products: Product[] = [
  // 3Д-принтеры
  {
    id: "ultracraft-a2d-hd",
    name: "3D-принтер UltraCraft A2D HD от HeyGears",
    category: "3d-print",
    subcategory: "3d-printers",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/02/Frame-811544-1.jpg",
    brand: "HeyGears",
    inStock: true,
    isNew: true,
    description: `UltraCraft A2D HD от HeyGears — это идеальное решение для стоматологических лабораторий, стремящихся к высокой точности, автоматизации и эффективности в производстве.

Ключевые особенности:
• Разрешение XY: ±26,8 мкм (при использовании 4K DLP XPR Pixel Technology)
• Разрешение по Z: ±37,5 мкм
• Объем печати: 206 × 116 × 110 мм
• Источник света: LED-проекция с длиной волны 385 нм
• Технология печати: DLP с интегрированными микрозеркалами (более 4 миллионов)

Производительность:
• Скорость печати: до 5 полных моделей за 20 минут
• Повторяемость: 95% многосерийной печати с отклонением не более ±5%
• Точность реконструкции данных: более 96%

Умные функции:
• Однократное удаление деталей и легкое удаление поддержек
• Автоматическое распознавание материалов и стратегий печати
• Поддержка OTA-обновлений
• Облачная платформа HeyGears Cloud для удалённого мониторинга`,
    specifications: {
      "Разрешение XY": "±26,8 мкм",
      "Разрешение Z": "±37,5 мкм",
      "Объем печати": "206×116×110 мм",
      "Источник света": "LED 385 нм",
      "Скорость печати": "5 моделей за 20 мин",
    },
    externalUrl: "https://articon.pro/product/3d-printer-ultracraft-a2d-hd-heygears/",
  },
  {
    id: "uniformation-gk3-ultra",
    name: "3D принтер Uniformation GK3 Ultra",
    category: "3d-print",
    subcategory: "3d-printers",
    price: 285000,
    image: gk3UltraMain,
    gallery: [gk3Ultra1],
    brand: "UniFormation",
    inStock: true,
    isNew: true,
    description: `Высокая точность и эффективность печати

Uniformation GK3 Ultra использует передовую технологию Masked SLA (M-SLA) LCD Screen Curing, обеспечивая исключительную детализацию и точность при создании 3D-моделей.

Особенности:
• 5-дюймовый сенсорный дисплей для интуитивного управления
• Большой 13,5-дюймовый 16K экран (302,4 × 161,98 мм)
• Поддержка слайсеров: UniFormation Slicer, Chitubox, Lychee
• Подключение: USB-накопитель, Wi-Fi, Ethernet
• Объем печати: 300 × 160 × 300 мм
• XY-разрешение: 15120 × 6230 пикселей
• Бак на 1,2 кг, ванночка 1100 мл
• Нагрев смолы: 25–30°C
• Габариты: 455 × 400 × 575 мм
• Вес: 30 кг
• Мощность: 200W`,
    specifications: {
      "Объем печати": "300×160×300 мм",
      "Дисплей": "13,5\" 16K",
      "XY-разрешение": "15120×6230 пикселей",
      "Подключение": "USB, Wi-Fi, Ethernet",
      "Габариты": "455×400×575 мм",
      "Вес": "30 кг",
    },
    externalUrl: "https://articon.pro/product/uniformation-gk3-ultra/",
  },
  {
    id: "cure-3-ultra",
    name: "Полимеризационная камера Uniformation Cure 3 Ultra",
    category: "3d-print",
    subcategory: "3d-printers",
    price: 45000,
    image: "https://articon.pro/wp-content/uploads/2024/11/cure-3-ultra.jpg",
    brand: "UniFormation",
    inStock: true,
    description: `Cure 3 Ultra поддерживает модели до 362 × 200 мм, что позволяет обрабатывать крупные детали или одновременно засвечивать несколько моделей.

Особенности:
• Четыре мощных УФ-светодиода по периметру
• 360° прозрачный поворотный стол для равномерного засвечивания
• Время обработки: 3-30 минут
• Система подогрева: таймер 0-15 минут
• Съёмный магнитный угольный фильтр снижает запахи смолы`,
    specifications: {
      "Габариты устройства": "399×437×305 мм",
      "Размер рабочей зоны": "362×200 мм",
      "Время засветки": "3-30 мин",
      "Время сушки": "5-15 мин",
      "Мощность засветки": "80 Вт",
      "Мощность сушки": "300 Вт",
      "Вес": "15,1 кг",
    },
    externalUrl: "https://articon.pro/product/cure-3-ultra/",
  },
  {
    id: "ultrasonic-w230",
    name: "Ультразвуковая ванна UltraSonic Resin Cleaner W230",
    category: "3d-print",
    subcategory: "3d-printers",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/11/ultrasonic-w230.jpg",
    brand: "UniFormation",
    inStock: true,
    description: `Ультразвуковая ванна для промывки моделей, напечатанных на 3D-принтере.

Особенности:
• Ультразвук частотой 40 кГц для очистки мельчайших уголков
• Вместимость 7 литров
• Съёмная корзина с мелкой сеткой
• Кран для слива загрязнённого спирта
• Плотно закрывающаяся крышка
• Алюминиевый корпус с ручками для переноски`,
    specifications: {
      "Объём камеры": "6.5 л",
      "Внутренние размеры": "228×128×200 мм",
      "Мощность": "48 Вт",
      "Габариты": "382×202×330 мм",
      "Вес": "8,5 кг",
    },
    externalUrl: "https://articon.pro/product/ultrasonic-resin-cleaner-w230/",
  },

  // Расходные материалы для 3D-печати
  {
    id: "asiga-pro-4k-tray",
    name: "Встраиваемый лоток для принтера Asiga Pro 4k",
    category: "3d-print",
    subcategory: "consumables",
    price: 21500,
    image: "https://articon.pro/wp-content/uploads/2023/06/asiga-pro-tray.jpg",
    brand: "Asiga",
    inStock: true,
    description: "Оригинальный встраиваемый лоток (Build Tray) для 3D-принтеров Asiga серии Pro 4K. Обеспечивает надёжную фиксацию и равномерное распределение фотополимерной смолы в процессе печати. Изготовлен из высококачественных материалов, устойчив к УФ-излучению. Лёгкая установка и извлечение готовых моделей. Рекомендуется для профессиональных зуботехнических лабораторий.",
    externalUrl: "https://articon.pro/product/asiga-pro-4k-build-trays/",
  },
  {
    id: "asiga-max-tray-10l",
    name: "Лоток встраиваемый Build Tray – Asiga – 10L – MAX",
    category: "3d-print",
    subcategory: "consumables",
    price: 30700,
    oldPrice: 39000,
    image: "https://articon.pro/wp-content/uploads/2023/06/asiga-max-tray.jpg",
    brand: "Asiga",
    inStock: true,
    isSale: true,
    sku: "PN/02502",
    description: "Встраиваемый лоток Build Tray объёмом 10 литров для 3D-принтера Asiga MAX. Идеален для крупносерийного производства стоматологических моделей, элайнеров и хирургических шаблонов. Прозрачный материал обеспечивает равномерное засвечивание фотополимера. Произведено в Австралии с соблюдением высочайших стандартов качества. Совместим со всеми фотополимерными смолами линейки Asiga.",
    specifications: {
      "Производитель": "Asiga",
      "Страна производства": "Австралия",
      "Номер ID": "00-0004201",
      "Группа товара": "Принадлежности для 3D принтеров",
      "Цвет": "Прозрачный",
      "Вес": "335 г",
    },
    externalUrl: "https://articon.pro/product/build-tray-asiga-10l-max/",
  },
  {
    id: "asiga-max-tray-1l",
    name: "Лоток встраиваемый Build Tray – Asiga – 1L – MAX",
    category: "3d-print",
    subcategory: "consumables",
    price: 9500,
    oldPrice: 15400,
    image: "https://articon.pro/wp-content/uploads/2023/06/asiga-max-tray-1l.jpg",
    brand: "Asiga",
    inStock: true,
    isSale: true,
    sku: "PN/02499",
    description: "Компактный встраиваемый лоток Build Tray объёмом 1 литр для 3D-принтера Asiga MAX. Оптимальное решение для печати небольших партий изделий: временных коронок, индивидуальных ложек, ортодонтических моделей. Экономичный расход фотополимера. Прозрачная конструкция для контроля уровня смолы. Австралийское качество, официальная гарантия.",
    specifications: {
      "Производитель": "Asiga",
      "Страна производства": "Австралия",
      "Цвет": "Прозрачный",
      "Вес": "335 г",
    },
    externalUrl: "https://articon.pro/product/build-tray-asiga-1l-max/",
  },
  {
    id: "asiga-max-tray-2l",
    name: "Лоток встраиваемый Build Tray – Asiga – 2L – MAX",
    category: "3d-print",
    subcategory: "consumables",
    price: 13600,
    oldPrice: 23800,
    image: "https://articon.pro/wp-content/uploads/2023/06/asiga-max-tray-2l.jpg",
    brand: "Asiga",
    inStock: true,
    isSale: true,
    sku: "PN/02500",
    description: "Встраиваемый лоток Build Tray объёмом 2 литра для 3D-принтера Asiga MAX. Универсальный выбор для ежедневной работы зуботехнической лаборатории. Подходит для печати моделей челюстей, хирургических шаблонов, временных протезов. Прозрачный материал, устойчивый к УФ-излучению. Легкоочищаемая поверхность.",
    externalUrl: "https://articon.pro/product/build-tray-asiga-2l-max/",
  },
  {
    id: "asiga-max-tray-5l",
    name: "Лоток встраиваемый Build Tray – Asiga – 5L – MAX",
    category: "3d-print",
    subcategory: "consumables",
    price: 18700,
    oldPrice: 28500,
    image: "https://articon.pro/wp-content/uploads/2023/06/asiga-max-tray-5l.jpg",
    brand: "Asiga",
    inStock: true,
    isSale: true,
    sku: "PN/02501",
    description: "Встраиваемый лоток Build Tray объёмом 5 литров для 3D-принтера Asiga MAX. Оптимален для средних объёмов производства. Позволяет печатать несколько полноразмерных моделей одновременно. Прозрачная конструкция обеспечивает контроль уровня и качества фотополимера. Произведено в Австралии, официальная гарантия производителя.",
    externalUrl: "https://articon.pro/product/build-tray-asiga-5l-max/",
  },

  // Фотополимеры HARZ Labs
  {
    id: "harz-dental-cast-cherry",
    name: "Фотополимер HARZ Labs Dental Cast Cherry (1кг)",
    category: "3d-print",
    subcategory: "photopolymers",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/01/harz-dental-cast.jpg",
    brand: "HARZ Labs",
    inStock: true,
    description: "Выжигаемая смола HARZ Labs отлично подходит для прямой отливки металлических и прессовки керамических коронок и мостов. Практически нулевое содержание золы (менее 0,1%) и термопластичные свойства делают смолу пригодной для прямого литья. Смола была разработана для быстрого выгорания при высокой температуре, чтобы снизить время производства. Для получения наилучшего качества литья, мы рекомендуем использовать формомассы на основе фосфатов, которые могут работать с пластиками при высокой температуре. Слабовыраженный запах и отсутствие вредных мономеров позволяет работать с ним даже в небольшой лаборатории. Сертифицирован для медицинского применения.",
    specifications: {
      "Объём": "1 кг",
      "Цвет": "Cherry (вишневый)",
      "Зольный остаток": "< 0,1%",
      "Применение": "Литьё коронок и мостов",
    },
    externalUrl: "https://articon.pro/product/harz-labs-dental-cast-cherry/",
  },
  {
    id: "harz-dental-model-light-grey",
    name: "Фотополимер HARZ Labs Dental Model Light Grey (1 кг)",
    category: "3d-print",
    subcategory: "photopolymers",
    price: 9700,
    image: "https://articon.pro/wp-content/uploads/2024/01/harz-model-beige.jpg",
    brand: "HARZ Labs",
    inStock: true,
    description: "Фотополимер Dental Model Light Grey предназначен для печати разборных, рабочих и диагностических стоматологических моделей светло-серого цвета. Материал прост в использовании: точно печатается в широком диапазоне настроек и имеет низкую усадку. Высокая точность и матовая поверхность позволяют распознавать мелкие детали и использовать данный фотополимер для самых точных работ. Напечатанные модели стабильны во времени и устойчивы к высоким температурам во время термоформования элайнеров. Слабовыраженный запах и отсутствие вредных мономеров позволяет работать с ним даже в небольшой лаборатории.",
    specifications: {
      "Объём": "1 кг",
      "Цвет": "Светло-серый",
      "Применение": "Стоматологические модели",
    },
    externalUrl: "https://articon.pro/product/harz-labs-dental-model-light-grey/",
  },
  {
    id: "harz-dental-sand-a1-a2",
    name: "Фотополимер HARZ Labs Dental Sand A1-A2 (1кг)",
    category: "3d-print",
    subcategory: "photopolymers",
    price: 17900,
    image: "https://articon.pro/wp-content/uploads/2024/01/harz-dental-sand.jpg",
    brand: "HARZ Labs",
    inStock: true,
    description: "Фотополимер Dental Sand представляет собой PMMA-подобную смолу с керамическим микро-наполнением, изготовленную из биосовместимого сырья. Доступные оттенки А1-А2 и А3. Обладает высокой твердостью и прочностью на изгиб, устойчив к механическим и химическим воздействиям. Рекомендуется для печати временных коронок и мостов. Слабовыраженный запах и отсутствие вредных мономеров позволяет работать с ним даже в небольшой лаборатории. Сертифицирован для медицинского применения.",
    specifications: {
      "Объём": "1 кг",
      "Цвет": "A1-A2",
      "Применение": "Временные коронки и мосты",
    },
    externalUrl: "https://articon.pro/product/harz-labs-dental-sand-a1-a2/",
  },
  {
    id: "harz-dental-tray-v2",
    name: "Фотополимер HARZ Labs Dental Tray V2 (1кг)",
    category: "3d-print",
    subcategory: "photopolymers",
    price: 9900,
    image: "https://articon.pro/wp-content/uploads/2024/01/harz-dental-clear.jpg",
    brand: "HARZ Labs",
    inStock: true,
    description: "Фотополимер Dental Tray создан для изготовления индивидуальных ложек для получения точного функционального оттиска. Напечатанная ложка – прочная и стабильная во времени, что обеспечивает длительное хранение слепка. Возможность печати слоем до 200 мкм позволяет сократить время изготовления. Слабый запах и отсутствие вредных мономеров позволяет работать с ним даже в небольшой лаборатории.",
    specifications: {
      "Объём": "1 кг",
      "Толщина слоя": "до 200 мкм",
      "Применение": "Индивидуальные ложки",
    },
    externalUrl: "https://articon.pro/product/harz-labs-dental-tray-v2/",
  },
  {
    id: "harz-dental-yellow-clear-pro",
    name: "Фотополимер HARZ Labs Dental Yellow Clear PRO (1кг)",
    category: "3d-print",
    subcategory: "photopolymers",
    price: 13900,
    image: "https://articon.pro/wp-content/uploads/2024/01/harz-dental-clear.jpg",
    brand: "HARZ Labs",
    inStock: true,
    description: "Dental Yellow Clear Pro представляет собой твердую PMMA-подобную смолу, изготовленную из биосовместимого сырья. Обладает высокой твердостью по Шору D и высокой прочностью на разрыв, устойчив к механическим воздействиям. Предназначен для печати автоклавируемых хирургических шаблонов. Слабовыраженный запах и отсутствие вредных мономеров позволяет работать с ним даже в небольшой лаборатории. Сертифицирован для медицинского применения.",
    specifications: {
      "Объём": "1 кг",
      "Цвет": "Жёлтый прозрачный",
      "Применение": "Хирургические шаблоны",
      "Автоклавируемость": "Да",
    },
    externalUrl: "https://articon.pro/product/harzlabs-dental-yellow-clear-pro/",
  },

  // 3Д-сканеры - Аксессуары
  {
    id: "antiglare-spray-helling",
    name: "Антибликовый спрей 3D – Helling – 400 мл",
    category: "3d-scanners",
    subcategory: "accessories",
    price: 2850,
    image: "https://articon.pro/wp-content/uploads/2023/06/antiglare-spray.jpg",
    brand: "Helling",
    inStock: true,
    sku: "3D - Helling - 400 мл",
    description: "Антибликовый спрей для лазерного сканирования 3-D Laserscanning Antiglare Spray от HELLING – средство для образования тонкого белого равномерного мелкодисперсного слоя для подавления бликов на сканируемой поверхности, используется для оптимизации лазерного сканирования.",
    specifications: {
      "Объём": "400 мл",
      "Производитель": "Helling",
      "Применение": "Подавление бликов при сканировании",
    },
    externalUrl: "https://articon.pro/product/antiblikovyy-sprey-3-d-400-ml-helling/",
  },

  // 3Д-сканеры - Врачебные (интраоральные)
  {
    id: "rundeer-3ds-v5",
    name: "Интраоральный сканер Rundeer 3DS V5",
    category: "3d-scanners",
    subcategory: "clinical",
    price: 365000,
    image: rundeerV5Main,
    gallery: [
      rundeerV5_1,
      rundeerV5_2,
      rundeerV5_3,
      rundeerV5_4,
      rundeerV5_5,
      rundeerV5_6,
      rundeerV5_7,
      rundeerV5_8,
      rundeerV5_9,
    ],
    brand: "Rundeer",
    inStock: true,
    description: `Зона сканирования 25 мм обеспечивает захват каждой детали для качественного лечения.

Технические характеристики:
• Габариты: 243×40×32 мм
• Вес: 160 г (включая аккумулятор)
• Размер стандартной насадки: 115×20.5×18 мм
• Размер мини-насадки: 115×17×13.5 мм
• Поле зрения стандартной насадки: 16×14 мм
• Поле зрения мини-насадки: 12×10 мм
• Скорость: 20 FPS
• Глубина резкости: 25 мм
• Точность (коронка): < 10 мкм
• Точность (полная дуга): < 20 мкм
• Время сканирования одной дуги: 25 сек
• Время сканирования полной дуги с окклюзией: 60 сек
• Калибровка: не требуется
• Форматы экспорта: STL, OBJ, PLY`,
    specifications: {
      "Габариты": "243×40×32 мм",
      "Вес": "160 г",
      "Глубина резкости": "25 мм",
      "Точность": "< 10 мкм (коронка)",
      "Сканирование дуги": "25 сек",
      "Форматы": "STL, OBJ, PLY",
    },
    externalUrl: "https://articon.pro/product/runyes-3ds-v5/",
  },
  {
    id: "rundeer-3ds-v6",
    name: "Интраоральный сканер Rundeer 3DS V6",
    category: "3d-scanners",
    subcategory: "clinical",
    price: 500000,
    image: rundeerV6Main,
    gallery: [
      rundeerV6_1,
      rundeerV6_2,
      rundeerV6_3,
      rundeerV6_4,
      rundeerV6_5,
      rundeerV6_6,
    ],
    brand: "Rundeer",
    inStock: true,
    isNew: false,
    description: `Два способа зарядки. Стерилизация до 100 раз. Проводной или беспроводной режим.

Технические характеристики:
• Размеры: 260×40×32 мм
• Вес: 230 г (включая аккумулятор)
• Стандартный наконечник: 115×20.5×18 мм
• Мини-наконечник: 115×17×13.5 мм
• Поле зрения (стандарт): 16×14 мм
• Поле зрения (минимальное): 12×10 мм
• Скорость: 20 FPS
• Глубина резкости: 25 мм
• Точность (коронка): < 10 мкм
• Точность (полная дуга): < 20 мкм
• Время сканирования одной дуги: 25 сек
• Полная дуга с окклюзией: 60 сек
• Калибровка: не требуется
• Форматы вывода: STL, OBJ, PLY`,
    specifications: {
      "Размеры": "260×40×32 мм",
      "Вес": "230 г",
      "Глубина резкости": "25 мм",
      "Точность": "< 10 мкм (коронка)",
      "Режимы": "Проводной/беспроводной",
      "Форматы": "STL, OBJ, PLY",
    },
    externalUrl: "https://articon.pro/product/runyes-3ds-v6/",
  },

  // 3Д-сканеры - Лабораторные
  {
    id: "medit-t310",
    name: "Medit T310 Лабораторный 3D сканер",
    category: "3d-scanners",
    subcategory: "laboratory",
    price: 655000,
    oldPrice: 690000,
    image: "https://articon.pro/wp-content/uploads/2024/02/medit-t310.jpg",
    brand: "Medit",
    inStock: true,
    isSale: true,
    sku: "Medit T310 Лабораторный 3D сканер",
    description: `Высокоточный и высокоскоростной настольный лабораторный сканер с современным дизайном.

Особенности:
• Супербыстрое сканирование: время сканирования полной дуги 18 сек
• Высокое разрешение изображения: позволяет выбрать HD режим
• Регулировка высоты положения модели
• Точность сканирования: 9 мкм (по стандарту ISO 12836)
• Две 5Мп камеры для высокой детализации
• Открытая система: экспорт/импорт STL файлов
• Автоматическая коррекция области сканирования
• Сканирование артикулятора с KAS jig или AM jig`,
    specifications: {
      "Время сканирования": "18 сек (полная дуга)",
      "Точность": "9 мкм (ISO 12836)",
      "Камеры": "2× 5Мп",
      "Система": "Открытая (STL)",
    },
    externalUrl: "https://articon.pro/product/medit-t310-scanner/",
  },
  {
    id: "medit-t510",
    name: "Medit T510 Лабораторный 3D сканер",
    category: "3d-scanners",
    subcategory: "laboratory",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/02/medit-t510.jpg",
    brand: "Medit",
    inStock: true,
    description: `Высокоскоростной и высокоточный сканер для лаборатории, усовершенствованной T-Серии, с расширенной комплектацией.

Особенности:
• Супербыстрое сканирование: полная дуга за 12 секунд
• Высокая точность: 7 мкм по стандарту ISO 12836
• Две 5Мп камеры для высокой детализации
• Открытая система для экспорта/импорта STL файлов
• Автоматическая коррекция области сканирования
• Интеграция с интраоральными сканерами Medit
• Сканирование артикулятора (KAS jig, AM jig, Screw jig)`,
    specifications: {
      "Время сканирования": "12 сек (полная дуга)",
      "Точность": "7 мкм (ISO 12836)",
      "Камеры": "2× 5Мп",
      "Система": "Открытая (STL)",
    },
    externalUrl: "https://articon.pro/product/medit-510-scanner/",
  },
  {
    id: "medit-t710",
    name: "Medit T710 Лабораторный 3D сканер",
    category: "3d-scanners",
    subcategory: "laboratory",
    price: 850000,
    image: "https://articon.pro/wp-content/uploads/2024/02/medit-t710.jpg",
    brand: "Medit",
    inStock: true,
    description: `Самый быстрый и точный лабораторный сканер T-серии. 4 камеры для максимальной детализации без слепых зон.

Особенности:
• Супербыстрое сканирование: полная дуга за 8 секунд
• Четыре 5Мп камеры для максимальной детализации
• Точность: 4 мкм
• Функция Metal Scan (сканирование металла без спрея)
• Автоматическая регулировка области сканирования
• Интеграция с интраоральными сканерами Medit
• В комплекте: KAS jig, AM jig, Screw jig`,
    specifications: {
      "Время сканирования": "8 сек (полная дуга)",
      "Точность": "4 мкм",
      "Камеры": "4× 5Мп",
      "Metal Scan": "Да",
      "Система": "Открытая (STL)",
    },
    externalUrl: "https://articon.pro/product/medit-710-scanner/",
  },

  // Фрезерные станки
  {
    id: "upcera-a52",
    name: "Фрезерный Станок CAD CAM Upcera A52",
    category: "milling",
    subcategory: "machines",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/04/Group-432-800x800.png",
    brand: "Upcera",
    inStock: true,
    isNew: true,
    description: `5-осевой фрезерный станок для сухого фрезерования. Высокая надежность благодаря высококачественным комплектующим.

Особенности:
• Автоматический выбор и смена инструмента
• Простой и элегантный пользовательский интерфейс
• Большой сенсорный экран
• Встроенный компьютер
• Защита от выключения питания и низкого давления воздуха
• Непрерывная обработка 24/7
• Корпус из литой стали и авиационного алюминиевого сплава`,
    specifications: {
      "Скорость шпинделя": "80 000 об/мин",
      "Охлаждение": "Воздушное",
      "Скорость обработки": "Циркон, PMMA - 12 мин/ед, Wax - 4 мин/ед",
      "Инструменты": "12 шт",
      "Точность": "< 0.01 мм",
      "Материалы": "ZrO2, PMMA, PEEK, Resin, Wax",
      "Угол вращения": "A: ±360°, B: +35°/-125°",
      "ПО": "MILLBOX и др.",
      "Габариты": "55×49×74 см",
      "Вес": "110 кг",
    },
    externalUrl: "https://articon.pro/product/cad-cam-upcera-a52/",
  },
  {
    id: "upcera-a52dw",
    name: "Фрезерный станок UPCERA A52DW",
    category: "milling",
    subcategory: "machines",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/04/upcera-a52dw.jpg",
    brand: "Upcera",
    inStock: true,
    description: `5-осевой фрезерный станок с автоматическим переключением между сухой и влажной обработкой.

Ключевые особенности:
• 5-осевая обработка
• Автоматическое переключение сухой/влажной обработки
• Встроенный компьютер с 12″ сенсорным экраном
• Интегрированное многофункциональное крепление
• Мощный шпиндель до 80 000 об/мин
• Высокая точность <0.01 мм
• Встроенный резервуар воды`,
    specifications: {
      "Тип": "5-осевой",
      "Угол поворота": "A: ±360°, B: ±95°/-35°",
      "Питание": "1 кВт",
      "Напряжение": "220V 50Hz / 110V 60Hz",
      "Шпиндель": "80 000 об/мин",
      "Точность": "<0.01 мм",
      "Инструменты": "12",
      "Материалы": "Цирконий, стеклокерамика, Ti, PEEK, PMMA, воск",
    },
    externalUrl: "https://articon.pro/product/upcera-a52dw/",
  },
  {
    id: "upcera-b52",
    name: "Фрезерный станок UPCERA B52",
    category: "milling",
    subcategory: "machines",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/04/upcera-b52.jpg",
    brand: "Upcera",
    inStock: true,
    description: `Upcera B52 — высокопроизводительный 5-осевой станок для обработки Ti-балок, Premilled-абатментов и мостовидных конструкций из CoCr.

Ключевые особенности:
• 12-дюймовый сенсорный экран
• Централизованная камера
• Обработка плотных и жёстких материалов
• Высокая стабильность и точность
• Непрерывная работа 24/7
• Защита от сбоев электроснабжения`,
    specifications: {
      "CPU": "Intel Core i7-8700 или выше",
      "RAM": "минимум 16 ГБ (рекомендуется 32 ГБ)",
      "Жёсткий диск": "минимум 500 ГБ SSD",
      "Дисплей": "1920×1080 или выше",
      "ПО": "WIN 10/11 64bit",
    },
    externalUrl: "https://articon.pro/product/upcera-b52/",
  },

  // Зуботехнические печи
  {
    id: "upcera-gt1-pro",
    name: "Зуботехническая печь для синтеризации циркония UPCERA GT1 Pro",
    category: "furnaces",
    subcategory: "sintering",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/06/Frame-811546-6-300x300.png",
    brand: "Upcera",
    inStock: true,
    isNew: true,
    description: `UPCERA GT1 Pro – высокоточная печь для синтеризации циркония с равномерным нагревом.

Основные преимущества:
• Интеллектуальная PID-система регулирования температуры
• Функция запоминания при отключении питания
• Энергоэффективные теплоизоляционные материалы
• Функция предварительной сушки`,
    specifications: {
      "Номинальная мощность": "2,5 кВт",
      "Макс. температура": "1550 °C",
      "Уровень защиты": "IP21",
      "Ток": "11,5 А",
      "Встроенные программы": "До 200",
      "Скорость нагрева": "1–50 °C/мин",
      "Напряжение": "230 В / 50 Гц",
      "Вес": "47 кг",
      "Размеры": "42×46,5×80 см",
    },
    externalUrl: "https://articon.pro/product/gt1-pro-upcera/",
  },
  {
    id: "upcera-gt1",
    name: "Зуботехническая печь для синтеризации циркония GT 1",
    category: "furnaces",
    subcategory: "sintering",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2023/06/upcera-gt1.jpg",
    brand: "Upcera",
    inStock: true,
    description: `GT1 – печь быстрого спекания с нагревательным элементом из карбида кремния (SiC).

Особенности:
• ЖК-дисплей с мониторингом в реальном времени
• Двухслойный корпус с воздушным охлаждением
• Простой и интуитивно понятный интерфейс`,
    specifications: {
      "Макс. температура": "1550 °C",
      "Нагревательный элемент": "Карбид кремния (SiC)",
    },
    externalUrl: "https://articon.pro/product/upcera-gt1/",
  },

  // Краски и глазурь
  {
    id: "glaze-upcera-realism",
    name: "Глазурь Upcera Realism для керамики и циркония",
    category: "paints-glazes",
    subcategory: "glaze",
    price: 3853,
    image: "https://articon.pro/wp-content/uploads/2024/11/Frame-285-17-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    description: "Профессиональная глазурь Upcera Realism для финишной обработки керамики и циркония. Обеспечивает идеальный блеск и естественный вид реставраций.",
    externalUrl: "https://articon.pro/product/glaze-upcera-realism/",
  },
  {
    id: "paint-set-upcera-20",
    name: "Набор красок Upcera Realism (20 цветов)",
    category: "paints-glazes",
    subcategory: "paints",
    price: 74980,
    image: "https://articon.pro/wp-content/uploads/2025/01/Frame-285-20-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    description: "Профессиональный набор красок Upcera Realism из 20 цветов для создания эстетичных стоматологических реставраций. Подходит для керамики и циркония.",
    externalUrl: "https://articon.pro/product/paint-set-upcera-20/",
  },
  {
    id: "paint-set-upcera-7",
    name: "Набор красок Upcera Realism (7 цветов)",
    category: "paints-glazes",
    subcategory: "paints",
    price: 26105,
    image: "https://articon.pro/wp-content/uploads/2024/11/glaze-upcera-7.jpg",
    brand: "Upcera",
    inStock: true,
    description: "Базовый набор красок Upcera Realism из 7 цветов для создания эстетичных стоматологических реставраций.",
    externalUrl: "https://articon.pro/product/paint-set-upcera-7/",
  },
  {
    id: "glaze-liquid-upcera",
    name: "Разбавитель Upcera Realism Glaze Liquid для керамики и циркония",
    category: "paints-glazes",
    subcategory: "glaze",
    price: 3680,
    image: "https://articon.pro/wp-content/uploads/2024/11/glaze-liquid-upcera.jpg",
    brand: "Upcera",
    inStock: true,
    description: "Профессиональный разбавитель для глазури Upcera Realism. Обеспечивает идеальную консистенцию для нанесения глазури.",
    externalUrl: "https://articon.pro/product/glaze-liquid-upcera/",
  },

  // === Циркониевые диски Upcera ST Color (Каркасные) ===
  {
    id: "upcera-st-color-98x10-a1",
    name: "Upcera ST Color циркониевые диски, 98 x 10 мм, цвет A1",
    category: "zircon-discs",
    subcategory: "framework",
    price: 4025,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A1 98-10",
    description: "Циркониевые диски Upcera ST-Color – идеальное решение для изготовления полноанатомических коронок и мостовидных протезов любой длины. Высокая прозрачность 43% и прочность 1300 МПа.",
    specifications: {
      "Толщина": "10 мм",
      "Диаметр": "98 мм",
      "Цвет": "A1",
      "Прозрачность": "43%",
      "Прочность на изгиб": "> 1300 МПа",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98x10-a1/",
  },
  {
    id: "upcera-st-color-98x10-a2",
    name: "Upcera ST Color циркониевые диски, 98 x 10 мм, цвет A2",
    category: "zircon-discs",
    subcategory: "framework",
    price: 4025,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A2 98-10",
    description: "Циркониевые диски Upcera ST-Color – идеальное решение для изготовления полноанатомических коронок и мостовидных протезов любой длины. Высокая прозрачность 43% и прочность 1300 МПа.",
    specifications: {
      "Толщина": "10 мм",
      "Диаметр": "98 мм",
      "Цвет": "A2",
      "Прозрачность": "43%",
      "Прочность на изгиб": "> 1300 МПа",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98-x-10-a2/",
  },
  {
    id: "upcera-st-color-98x10-a35",
    name: "Upcera ST Color циркониевые диски, 98 x 10 мм, цвет A3,5",
    category: "zircon-discs",
    subcategory: "framework",
    price: 4025,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A3.5 98-10",
    description: "Циркониевые диски Upcera ST-Color – идеальное решение для изготовления полноанатомических коронок и мостовидных протезов любой длины.",
    specifications: {
      "Толщина": "10 мм",
      "Диаметр": "98 мм",
      "Цвет": "A3,5",
      "Прозрачность": "43%",
      "Прочность на изгиб": "> 1300 МПа",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98-x-10-a3-5/",
  },
  {
    id: "upcera-st-color-98x12-a2",
    name: "Upcera ST Color циркониевые диски, 98 x 12 мм, цвет A2",
    category: "zircon-discs",
    subcategory: "framework",
    price: 4715,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A2 98-12",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "12 мм",
      "Диаметр": "98 мм",
      "Цвет": "A2",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98-x-12-a2/",
  },
  {
    id: "upcera-st-color-98x12-a3",
    name: "Upcera ST Color циркониевые диски, 98 x 12 мм, цвет A3",
    category: "zircon-discs",
    subcategory: "framework",
    price: 4715,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A3 98-12",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "12 мм",
      "Диаметр": "98 мм",
      "Цвет": "A3",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98-x-12-a3/",
  },
  {
    id: "upcera-st-color-98x12-a35",
    name: "Upcera ST Color циркониевые диски, 98 x 12 мм, цвет A3,5",
    category: "zircon-discs",
    subcategory: "framework",
    price: 4715,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A3.5 98-12",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "12 мм",
      "Диаметр": "98 мм",
      "Цвет": "A3,5",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98-x-12-a3-5/",
  },
  {
    id: "upcera-st-color-98x14-a1",
    name: "Upcera ST Color циркониевые диски, 98 x 14 мм, цвет A1",
    category: "zircon-discs",
    subcategory: "framework",
    price: 5290,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A1 98-14",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "14 мм",
      "Диаметр": "98 мм",
      "Цвет": "A1",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98-x-14-a1/",
  },
  {
    id: "upcera-st-color-98x14-a2",
    name: "Upcera ST Color циркониевые диски, 98 x 14 мм, цвет A2",
    category: "zircon-discs",
    subcategory: "framework",
    price: 5290,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A2 98-14",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "14 мм",
      "Диаметр": "98 мм",
      "Цвет": "A2",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98-x-14-a2/",
  },
  {
    id: "upcera-st-color-98x14-a3",
    name: "Upcera ST Color циркониевые диски, 98 x 14 мм, цвет A3",
    category: "zircon-discs",
    subcategory: "framework",
    price: 5290,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A3 98-14",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "14 мм",
      "Диаметр": "98 мм",
      "Цвет": "A3",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98-x-14-a3/",
  },
  {
    id: "upcera-st-color-98x14-a35",
    name: "Upcera ST Color циркониевые диски, 98 x 14 мм, цвет A3,5",
    category: "zircon-discs",
    subcategory: "framework",
    price: 5290,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A3.5 98-14",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "14 мм",
      "Диаметр": "98 мм",
      "Цвет": "A3,5",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98-x-14-a3-5/",
  },
  {
    id: "upcera-st-color-98x16-a1",
    name: "Upcera ST Color циркониевые диски, 98 x 16 мм, цвет A1",
    category: "zircon-discs",
    subcategory: "framework",
    price: 5980,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A1 98-16",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "16 мм",
      "Диаметр": "98 мм",
      "Цвет": "A1",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98-x-16-a1/",
  },
  {
    id: "upcera-st-color-98x16-a2",
    name: "Upcera ST Color циркониевые диски, 98 x 16 мм, цвет A2",
    category: "zircon-discs",
    subcategory: "framework",
    price: 5980,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A2 98-16",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "16 мм",
      "Диаметр": "98 мм",
      "Цвет": "A2",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98-x-16-a2/",
  },
  {
    id: "upcera-st-color-98x18-a1",
    name: "Upcera ST Color циркониевые диски, 98 x 18 мм, цвет A1",
    category: "zircon-discs",
    subcategory: "framework",
    price: 7268,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A1 98-18",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "18 мм",
      "Диаметр": "98 мм",
      "Цвет": "A1",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98x18-a1/",
  },
  {
    id: "upcera-st-color-98x18-a2",
    name: "Upcera ST Color циркониевые диски, 98 x 18 мм, цвет A2",
    category: "zircon-discs",
    subcategory: "framework",
    price: 7268,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A2 98-18",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "18 мм",
      "Диаметр": "98 мм",
      "Цвет": "A2",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98x18-a2/",
  },
  {
    id: "upcera-st-color-98x18-a3",
    name: "Upcera ST Color циркониевые диски, 98 x 18 мм, цвет A3",
    category: "zircon-discs",
    subcategory: "framework",
    price: 6320,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A3 98-18",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "18 мм",
      "Диаметр": "98 мм",
      "Цвет": "A3",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98x18-a3/",
  },
  {
    id: "upcera-st-color-98x18-a35",
    name: "Upcera ST Color циркониевые диски, 98 x 18 мм, цвет A3,5",
    category: "zircon-discs",
    subcategory: "framework",
    price: 6320,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A3,5 98-18",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "18 мм",
      "Диаметр": "98 мм",
      "Цвет": "A3,5",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98x18-a3-5/",
  },
  {
    id: "upcera-st-color-98x20-a1",
    name: "Upcera ST Color циркониевые диски, 98 x 20 мм, цвет A1",
    category: "zircon-discs",
    subcategory: "framework",
    price: 7500,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A1 98-20",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "20 мм",
      "Диаметр": "98 мм",
      "Цвет": "A1",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98x20-a1/",
  },
  {
    id: "upcera-st-color-98x20-a2",
    name: "Upcera ST Color циркониевые диски, 98 x 20 мм, цвет A2",
    category: "zircon-discs",
    subcategory: "framework",
    price: 7500,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A2 98-20",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "20 мм",
      "Диаметр": "98 мм",
      "Цвет": "A2",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98x20-a2/",
  },
  {
    id: "upcera-st-color-98x20-a3",
    name: "Upcera ST Color циркониевые диски, 98 x 20 мм, цвет A3",
    category: "zircon-discs",
    subcategory: "framework",
    price: 7500,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A3 98-20",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "20 мм",
      "Диаметр": "98 мм",
      "Цвет": "A3",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98x20-a3/",
  },
  {
    id: "upcera-st-color-98x20-a35",
    name: "Upcera ST Color циркониевые диски, 98 x 20 мм, цвет A3,5",
    category: "zircon-discs",
    subcategory: "framework",
    price: 7500,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A3,5 98-20",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "20 мм",
      "Диаметр": "98 мм",
      "Цвет": "A3,5",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98x20-a3-5/",
  },
  {
    id: "upcera-st-color-98x22-a1",
    name: "Upcera ST Color циркониевые диски, 98 x 22 мм, цвет A1",
    category: "zircon-discs",
    subcategory: "framework",
    price: 8050,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A1 98-22",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "22 мм",
      "Диаметр": "98 мм",
      "Цвет": "A1",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98x22-a1/",
  },
  {
    id: "upcera-st-color-98x22-a2",
    name: "Upcera ST Color циркониевые диски, 98 x 22 мм, цвет A2",
    category: "zircon-discs",
    subcategory: "framework",
    price: 8050,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A2 98-22",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "22 мм",
      "Диаметр": "98 мм",
      "Цвет": "A2",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98x22-a2/",
  },
  {
    id: "upcera-st-color-98x22-a3",
    name: "Upcera ST Color циркониевые диски, 98 x 22 мм, цвет A3",
    category: "zircon-discs",
    subcategory: "framework",
    price: 8050,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A3 98-22",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "22 мм",
      "Диаметр": "98 мм",
      "Цвет": "A3",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98x22-a3/",
  },
  {
    id: "upcera-st-color-98x22-a35",
    name: "Upcera ST Color циркониевые диски, 98 x 22 мм, цвет A3,5",
    category: "zircon-discs",
    subcategory: "framework",
    price: 8050,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "ST Color A3,5 98-22",
    description: "Циркониевые диски Upcera ST-Color для полноанатомических коронок и мостовидных протезов.",
    specifications: {
      "Толщина": "22 мм",
      "Диаметр": "98 мм",
      "Цвет": "A3,5",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-98x22-a3-5/",
  },

  // === Циркониевые диски Upcera Explore Functional (Мультилеер) ===
  {
    id: "upcera-explore-98x12-a1",
    name: "Upcera Explore Functional циркониевые диски, 98×12, цвет A1",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 8395,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore ML A1 D98-12 F",
    description: "Upcera Explore Functional — многослойный циркониевый диск с градиентной прозрачностью. Прозрачность 47%, прочность на изгиб более 1000 МПа. Идеален для виниров, вкладок, накладок, одиночных коронок и мостовидных протезов.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "12 мм",
      "Цвет": "A1",
      "Прозрачность": "47%",
      "Прочность на изгиб": "> 1000 MPa",
      "Температура спекания": "1480 °C",
    },
    externalUrl: "https://articon.pro/product/upcera-98-12-a1/",
  },
  {
    id: "upcera-explore-98x12-a2",
    name: "Upcera Explore Functional циркониевые диски, 98×12, цвет A2",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 8395,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore ML A2 D98-12 F",
    description: "Upcera Explore Functional — многослойный циркониевый диск с градиентной прозрачностью.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "12 мм",
      "Цвет": "A2",
    },
    externalUrl: "https://articon.pro/product/upcera-98-12-a2/",
  },
  {
    id: "upcera-explore-98x12-a3",
    name: "Upcera Explore Functional циркониевые диски, 98×12, цвет A3",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 8395,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore ML A3 D98-12 F",
    description: "Upcera Explore Functional — многослойный циркониевый диск с градиентной прозрачностью.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "12 мм",
      "Цвет": "A3",
    },
    externalUrl: "https://articon.pro/product/upcera-98-12-a3/",
  },
  {
    id: "upcera-explore-98x14-a1",
    name: "Upcera Explore Functional циркониевые диски, 98×14, цвет A1",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 9200,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore ML A1 D98-14 F",
    description: "Upcera Explore Functional — многослойный циркониевый диск для эстетичных коронок и мостов.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "14 мм",
      "Цвет": "A1",
    },
    externalUrl: "https://articon.pro/product/upcera-98-14-a1/",
  },
  {
    id: "upcera-explore-98x14-a2",
    name: "Upcera Explore Functional циркониевые диски, 98×14, цвет A2",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 9200,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore Functional A2 98-14",
    description: "Upcera Explore Functional — многослойный циркониевый диск для эстетичных коронок и мостов.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "14 мм",
      "Цвет": "A2",
    },
    externalUrl: "https://articon.pro/product/upcera-98-14-a2/",
  },
  {
    id: "upcera-explore-98x14-a3",
    name: "Upcera Explore Functional циркониевые диски, 98×14, цвет A3",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 9200,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore Functional A3 98-14",
    description: "Upcera Explore Functional — многослойный циркониевый диск для эстетичных коронок и мостов.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "14 мм",
      "Цвет": "A3",
    },
    externalUrl: "https://articon.pro/product/upcera-98-14-a3/",
  },
  {
    id: "upcera-explore-98x14-a35",
    name: "Upcera Explore Functional циркониевые диски, 98×14, цвет A3,5",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 9200,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore Functional A3.5 98-14",
    description: "Upcera Explore Functional — многослойный циркониевый диск для эстетичных коронок и мостов.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "14 мм",
      "Цвет": "A3,5",
    },
    externalUrl: "https://articon.pro/product/upcera-98-14-a3-5/",
  },
  {
    id: "upcera-explore-98x16-a1",
    name: "Upcera Explore Functional циркониевые диски, 98×16, цвет A1",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 10120,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore Functional A1 98-16",
    description: "Upcera Explore Functional — многослойный циркониевый диск увеличенной толщины для мостов.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "16 мм",
      "Цвет": "A1",
    },
    externalUrl: "https://articon.pro/product/upcera-98-16-a1/",
  },
  {
    id: "upcera-explore-98x16-a2",
    name: "Upcera Explore Functional циркониевые диски, 98×16, цвет A2",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 10120,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore Functional A2 98-16",
    description: "Upcera Explore Functional — многослойный циркониевый диск увеличенной толщины для мостов.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "16 мм",
      "Цвет": "A2",
    },
    externalUrl: "https://articon.pro/product/upcera-98-16-a2/",
  },
  {
    id: "upcera-explore-98x18-a1",
    name: "Upcera Explore Functional циркониевые диски, 98×18, цвет A1",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 10695,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore Functional A1 98-18",
    description: "Upcera Explore Functional — многослойный циркониевый диск для протяжённых мостовидных конструкций.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "18 мм",
      "Цвет": "A1",
    },
    externalUrl: "https://articon.pro/product/upcera-98-18-a1/",
  },
  {
    id: "upcera-explore-98x18-a2",
    name: "Upcera Explore Functional циркониевые диски, 98×18, цвет A2",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 10695,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore Functional A2 98-18",
    description: "Upcera Explore Functional — многослойный циркониевый диск для протяжённых мостовидных конструкций.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "18 мм",
      "Цвет": "A2",
    },
    externalUrl: "https://articon.pro/product/upcera-98-18-a2/",
  },
  {
    id: "upcera-explore-98x20-a1",
    name: "Upcera Explore Functional циркониевые диски, 98×20, цвет A1",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 11385,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore Functional A1 98-20",
    description: "Upcera Explore Functional — многослойный циркониевый диск для полных мостов и реставраций большой протяжённости.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "20 мм",
      "Цвет": "A1",
    },
    externalUrl: "https://articon.pro/product/upcera-98-20-a1/",
  },
  {
    id: "upcera-explore-98x20-a2",
    name: "Upcera Explore Functional циркониевые диски, 98×20, цвет A2",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 11385,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore Functional A2 98-20",
    description: "Upcera Explore Functional — многослойный циркониевый диск для полных мостов и реставраций большой протяжённости.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "20 мм",
      "Цвет": "A2",
    },
    externalUrl: "https://articon.pro/product/upcera-98-20-a2/",
  },
  {
    id: "upcera-explore-98x20-a3",
    name: "Upcera Explore Functional циркониевые диски, 98×20, цвет A3",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 11385,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore Functional A3 98-20",
    description: "Upcera Explore Functional — многослойный циркониевый диск для полных мостов и реставраций большой протяжённости.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "20 мм",
      "Цвет": "A3",
    },
    externalUrl: "https://articon.pro/product/upcera-98-20-a3/",
  },
  {
    id: "upcera-explore-98x20-a35",
    name: "Upcera Explore Functional циркониевые диски, 98×20, цвет A3,5",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 11385,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore Functional A3.5 98-20",
    description: "Upcera Explore Functional — многослойный циркониевый диск для полных мостов и реставраций большой протяжённости.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "20 мм",
      "Цвет": "A3,5",
    },
    externalUrl: "https://articon.pro/product/upcera-98-20-a3-5/",
  },
  {
    id: "upcera-explore-98x20-b1",
    name: "Upcera Explore Functional циркониевые диски, 98×20, цвет B1",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 11385,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore ML B1 D98-20 F",
    description: "Upcera Explore Functional — многослойный циркониевый диск для полных мостов и реставраций большой протяжённости.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "20 мм",
      "Цвет": "B1",
    },
    externalUrl: "https://articon.pro/product/upcera-98-20-b1/",
  },
  {
    id: "upcera-explore-98x20-bl2",
    name: "Upcera Explore Functional циркониевые диски, 98×20, цвет BL2",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 11385,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore ML BL2 D98-20 F",
    description: "Upcera Explore Functional — многослойный циркониевый диск для полных мостов и реставраций большой протяжённости.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "20 мм",
      "Цвет": "BL2",
    },
    externalUrl: "https://articon.pro/product/upcera-98-20-bl2/",
  },
  {
    id: "upcera-explore-98x20-bl3",
    name: "Upcera Explore Functional циркониевые диски, 98×20, цвет BL3",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 11385,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore ML BL3 D98-20 F",
    description: "Upcera Explore Functional — многослойный циркониевый диск для полных мостов и реставраций большой протяжённости.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "20 мм",
      "Цвет": "BL3",
    },
    externalUrl: "https://articon.pro/product/upcera-98-20-bl3/",
  },
  {
    id: "upcera-explore-98x20-bl4",
    name: "Upcera Explore Functional циркониевые диски, 98×20, цвет BL4",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 11385,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore ML BL4 D98-20 F",
    description: "Upcera Explore Functional — многослойный циркониевый диск для полных мостов и реставраций большой протяжённости.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "20 мм",
      "Цвет": "BL4",
    },
    externalUrl: "https://articon.pro/product/upcera-98-20-bl4/",
  },
  {
    id: "upcera-explore-98x22-a1",
    name: "Upcera Explore Functional циркониевые диски, 98×22, цвет A1",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 12075,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore ML A1 D98-22 F",
    description: "Upcera Explore Functional — многослойный циркониевый диск максимальной толщины для сложных ортопедических случаев.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "22 мм",
      "Цвет": "A1",
    },
    externalUrl: "https://articon.pro/product/upcera-98-22-a1/",
  },
  {
    id: "upcera-explore-98x22-a2",
    name: "Upcera Explore Functional циркониевые диски, 98×22, цвет A2",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 12075,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore ML A2 D98-22 F",
    description: "Upcera Explore Functional — многослойный циркониевый диск максимальной толщины для сложных ортопедических случаев.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "22 мм",
      "Цвет": "A2",
    },
    externalUrl: "https://articon.pro/product/upcera-98-22-a2/",
  },
  {
    id: "upcera-explore-98x22-a3",
    name: "Upcera Explore Functional циркониевые диски, 98×22, цвет A3",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 12075,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore ML A3 D98-22 F",
    description: "Upcera Explore Functional — многослойный циркониевый диск максимальной толщины для сложных ортопедических случаев.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "22 мм",
      "Цвет": "A3",
    },
    externalUrl: "https://articon.pro/product/upcera-98-22-a3/",
  },
  {
    id: "upcera-explore-98x22-a35",
    name: "Upcera Explore Functional циркониевые диски, 98×22, цвет A3,5",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 12075,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-explore.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "Explore ML A3,5 D98-22 F",
    description: "Upcera Explore Functional — многослойный циркониевый диск максимальной толщины для сложных ортопедических случаев.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "22 мм",
      "Цвет": "A3,5",
    },
    externalUrl: "https://articon.pro/product/upcera-98-22-a3-5/",
  },

  // Фотополимеры TOPCORE
  {
    id: "topcore-composite-a1",
    name: "Фотополимер TOPCORE Composite A1",
    description: `Профессиональный фотополимер для 3D-печати временных реставраций цвета A1.

TOPCORE Composite A1 — это высококачественная фотополимерная смола, разработанная специально для изготовления временных коронок, мостов и других ортопедических конструкций.

Особенности:
• Высокая точность печати и детализация
• Естественный оттенок A1 для эстетичных временных реставраций
• Отличная биосовместимость
• Оптимальная прочность для временного ношения
• Совместимость с большинством LCD/DLP 3D-принтеров`,
    price: 11300,
    image: topcoreCompositeA1,
    category: "3d-print",
    subcategory: "photopolymers",
    brand: "TOPCORE",
    inStock: true,
    sku: "TOPCORE Composite A1",
    specifications: {
      "Объём": "250 г",
      "Цвет": "A1 (по шкале VITA)",
      "Длина волны": "385-405 нм",
      "Применение": "Временные коронки и мосты",
      "Совместимость": "LCD/DLP 3D-принтеры",
    },
    externalUrl: "https://articon.pro/product/fotopolimer-topcore-composite-a1/",
  },
  {
    id: "topcore-composite-a2",
    name: "Фотополимер TOPCORE Composite A2",
    description: `Профессиональный фотополимер для 3D-печати временных реставраций цвета A2.

TOPCORE Composite A2 — это высококачественная фотополимерная смола, разработанная специально для изготовления временных коронок, мостов и других ортопедических конструкций.`,
    price: 11300,
    image: topcoreCompositeA2,
    category: "3d-print",
    subcategory: "photopolymers",
    brand: "TOPCORE",
    inStock: true,
    sku: "TOPCORE Composite A2",
    specifications: {
      "Объём": "250 г",
      "Цвет": "A2 (по шкале VITA)",
      "Длина волны": "385-405 нм",
      "Применение": "Временные коронки и мосты",
    },
    externalUrl: "https://articon.pro/product/fotopolimer-topcore-composite-a2/",
  },
  {
    id: "topcore-composite-a3",
    name: "Фотополимер TOPCORE Composite A3",
    description: `Профессиональный фотополимер для 3D-печати временных реставраций цвета A3.

TOPCORE Composite A3 — это высококачественная фотополимерная смола для изготовления временных коронок, мостов и других ортопедических конструкций.`,
    price: 11300,
    image: topcoreCompositeA3,
    category: "3d-print",
    subcategory: "photopolymers",
    brand: "TOPCORE",
    inStock: true,
    sku: "TOPCORE Composite A3",
    specifications: {
      "Объём": "250 г",
      "Цвет": "A3 (по шкале VITA)",
      "Длина волны": "385-405 нм",
      "Применение": "Временные коронки и мосты",
    },
    externalUrl: "https://articon.pro/product/fotopolimer-topcore-composite-a3/",
  },
  {
    id: "topcore-composite-bleach",
    name: "Фотополимер TOPCORE Composite Bleach",
    description: `Профессиональный фотополимер для 3D-печати временных реставраций оттенка Bleach.

TOPCORE Composite Bleach — светлый оттенок идеально подходит для случаев, когда требуется максимально белоснежная эстетика временных реставраций.`,
    price: 11300,
    image: topcoreCompositeBleach,
    category: "3d-print",
    subcategory: "photopolymers",
    brand: "TOPCORE",
    inStock: true,
    sku: "TOPCORE Composite Bleach",
    specifications: {
      "Объём": "250 г",
      "Цвет": "Bleach",
      "Длина волны": "385-405 нм",
      "Применение": "Временные коронки и мосты",
    },
    externalUrl: "https://articon.pro/product/fotopolimer-topcore-composite-bleach/",
  },
  {
    id: "topcore-model",
    name: "Фотополимер TOPCORE Model",
    description: "Профессиональный фотополимер для 3D-печати стоматологических моделей. Высокая точность и стабильность размеров.",
    price: 9500,
    image: topcoreModel,
    category: "3d-print",
    subcategory: "photopolymers",
    brand: "TOPCORE",
    inStock: true,
    sku: "TOPCORE Model",
    specifications: {
      "Объём": "1 кг",
      "Цвет": "Бежевый",
      "Длина волны": "385-405 нм",
      "Применение": "Стоматологические модели",
    },
    externalUrl: "https://articon.pro/product/fotopolimer-topcore-model/",
  },
  {
    id: "topcore-model-pro",
    name: "Фотополимер TOPCORE Model Pro",
    description: "Профессиональный фотополимер повышенной прочности для 3D-печати стоматологических моделей. Устойчив к термоформованию элайнеров.",
    price: 12000,
    image: topcoreModelPro,
    category: "3d-print",
    subcategory: "photopolymers",
    brand: "TOPCORE",
    inStock: true,
    sku: "TOPCORE Model Pro",
    specifications: {
      "Объём": "1 кг",
      "Цвет": "Бежевый",
      "Длина волны": "385-405 нм",
      "Применение": "Стоматологические модели, термоформование",
    },
    externalUrl: "https://articon.pro/product/fotopolimer-topcore-model-pro/",
  },
  {
    id: "topcore-pink",
    name: "Фотополимер TOPCORE Pink",
    description: "Розовый фотополимер для 3D-печати десневых масок и элементов протезов. Гибкий материал с естественным розовым оттенком.",
    price: 10500,
    image: topcorePink,
    category: "3d-print",
    subcategory: "photopolymers",
    brand: "TOPCORE",
    inStock: true,
    sku: "TOPCORE Pink",
    specifications: {
      "Объём": "1 кг",
      "Цвет": "Розовый",
      "Длина волны": "385-405 нм",
      "Применение": "Десневые маски, протезы",
    },
    externalUrl: "https://articon.pro/product/fotopolimer-topcore-pink/",
  },
  {
    id: "topcore-pink-base",
    name: "Фотополимер TOPCORE Pink Base",
    description: "Фотополимер для 3D-печати базисов съёмных протезов. Прочный материал с естественным розовым оттенком десны.",
    price: 15000,
    image: topcorePinkBase,
    category: "3d-print",
    subcategory: "photopolymers",
    brand: "TOPCORE",
    inStock: true,
    sku: "TOPCORE Pink Base",
    specifications: {
      "Объём": "1 кг",
      "Цвет": "Розовый (база)",
      "Длина волны": "385-405 нм",
      "Применение": "Базисы съёмных протезов",
    },
    externalUrl: "https://articon.pro/product/fotopolimer-topcore-pink-base/",
  },
  {
    id: "topcore-sg",
    name: "Фотополимер TOPCORE SG (Surgical Guide)",
    description: "Биосовместимый фотополимер для 3D-печати хирургических шаблонов. Прозрачный материал класса I для медицинского применения.",
    price: 14000,
    image: topcoreSg,
    category: "3d-print",
    subcategory: "photopolymers",
    brand: "TOPCORE",
    inStock: true,
    sku: "TOPCORE SG",
    specifications: {
      "Объём": "1 кг",
      "Цвет": "Прозрачный",
      "Длина волны": "385-405 нм",
      "Применение": "Хирургические шаблоны",
      "Класс": "Медицинский класс I",
    },
    externalUrl: "https://articon.pro/product/fotopolimer-topcore-sg/",
  },

  // Фрезы для CAD/CAM станков - UPCERA
  {
    id: "burs-upcera-a51-a52-pmma",
    name: "Фрезы для станков UPCERA A51/A52 PMMA",
    category: "milling",
    subcategory: "cutters",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-burs.jpg",
    brand: "UPCERA",
    inStock: true,
    description: "Профессиональные фрезы для обработки ПММА на фрезерных станках UPCERA A51 и A52. Высокая точность и долговечность.",
    specifications: {
      "Совместимость": "UPCERA A51, A52",
      "Материал обработки": "ПММА",
    },
    externalUrl: "http://www.vpttool.com/products/Upcera/109.html",
  },
  {
    id: "burs-upcera-a52w-glassceramic",
    name: "Фрезы для станков UPCERA A52W стеклокерамика",
    category: "milling",
    subcategory: "cutters",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-burs.jpg",
    brand: "UPCERA",
    inStock: true,
    description: "Алмазные фрезы для обработки стеклокерамики на фрезерном станке UPCERA A52W. Оптимальная геометрия для работы с хрупкими материалами.",
    specifications: {
      "Совместимость": "UPCERA A52W",
      "Материал обработки": "Стеклокерамика",
    },
    externalUrl: "http://www.vpttool.com/products/Upcera/108.html",
  },
  {
    id: "burs-upcera-a52w-metal",
    name: "Фрезы для станков UPCERA A52W металл",
    category: "milling",
    subcategory: "cutters",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-burs.jpg",
    brand: "UPCERA",
    inStock: true,
    description: "Твердосплавные фрезы для обработки металлов (титан, CoCr) на фрезерном станке UPCERA A52W.",
    specifications: {
      "Совместимость": "UPCERA A52W",
      "Материал обработки": "Металл (титан, CoCr)",
    },
    externalUrl: "http://www.vpttool.com/products/Upcera/107.html",
  },
  {
    id: "burs-upcera-a52-zircon",
    name: "Фрезы для станков UPCERA A52 циркон",
    category: "milling",
    subcategory: "cutters",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-burs.jpg",
    brand: "UPCERA",
    inStock: true,
    description: "Фрезы для обработки циркониевых заготовок на фрезерном станке UPCERA A52. Точная обработка с минимальным износом.",
    specifications: {
      "Совместимость": "UPCERA A52",
      "Материал обработки": "Циркон",
    },
    externalUrl: "http://www.vpttool.com/products/Upcera/52.html",
  },
  {
    id: "burs-upcera-b41-b42-glassceramic",
    name: "Фрезы для станков UPCERA B41/B42 стеклокерамика",
    category: "milling",
    subcategory: "cutters",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-burs.jpg",
    brand: "UPCERA",
    inStock: true,
    description: "Алмазные фрезы для обработки стеклокерамики на фрезерных станках UPCERA B41 и B42.",
    specifications: {
      "Совместимость": "UPCERA B41, B42",
      "Материал обработки": "Стеклокерамика",
    },
    externalUrl: "http://www.vpttool.com/products/Upcera/51.html",
  },
  {
    id: "burs-upcera-b51-b52-metal",
    name: "Фрезы для станков UPCERA B51/B52 металл",
    category: "milling",
    subcategory: "cutters",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-burs.jpg",
    brand: "UPCERA",
    inStock: true,
    description: "Твердосплавные фрезы для обработки металлов на фрезерных станках UPCERA B51 и B52.",
    specifications: {
      "Совместимость": "UPCERA B51, B52",
      "Материал обработки": "Металл",
    },
    externalUrl: "http://www.vpttool.com/products/Upcera/50.html",
  },

  // Фрезы для CAD/CAM станков - Imes icore
  {
    id: "burs-imes-150i-250i-pmma",
    name: "Фрезы для станков Imes icore 150i/250i - ПММА",
    category: "milling",
    subcategory: "cutters",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/06/imes-icore-burs.jpg",
    brand: "Imes icore",
    inStock: true,
    description: "Профессиональные фрезы для обработки ПММА на фрезерных станках Imes icore 150i и 250i.",
    specifications: {
      "Совместимость": "Imes icore 150i, 250i",
      "Материал обработки": "ПММА",
    },
    externalUrl: "http://www.vpttool.com/products/Imes/122.html",
  },
  {
    id: "burs-imes-350i-metal",
    name: "Фрезы для станков Imes icore 350i - металл",
    category: "milling",
    subcategory: "cutters",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/06/imes-icore-burs.jpg",
    brand: "Imes icore",
    inStock: true,
    description: "Твердосплавные фрезы для обработки металлов (титан, CoCr) на фрезерном станке Imes icore 350i.",
    specifications: {
      "Совместимость": "Imes icore 350i",
      "Материал обработки": "Металл (титан, CoCr)",
    },
    externalUrl: "http://www.vpttool.com/products/Imes/72.html",
  },
  {
    id: "burs-imes-350i-zircon",
    name: "Фрезы для станков Imes icore 350i - циркон",
    category: "milling",
    subcategory: "cutters",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/06/imes-icore-burs.jpg",
    brand: "Imes icore",
    inStock: true,
    description: "Фрезы для обработки циркониевых заготовок на фрезерном станке Imes icore 350i.",
    specifications: {
      "Совместимость": "Imes icore 350i",
      "Материал обработки": "Циркон",
    },
    externalUrl: "http://www.vpttool.com/products/Imes/71.html",
  },
  {
    id: "burs-imes-150i-250i-zircon",
    name: "Фрезы для станков Imes icore 150i/250i - циркон",
    category: "milling",
    subcategory: "cutters",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/06/imes-icore-burs.jpg",
    brand: "Imes icore",
    inStock: true,
    description: "Фрезы для обработки циркониевых заготовок на фрезерных станках Imes icore 150i и 250i.",
    specifications: {
      "Совместимость": "Imes icore 150i, 250i",
      "Материал обработки": "Циркон",
    },
    externalUrl: "http://www.vpttool.com/products/Imes/70.html",
  },
  {
    id: "burs-imes-350i-650i-glassceramic",
    name: "Фрезы для станков Imes icore 350i/650i - стеклокерамика",
    category: "milling",
    subcategory: "cutters",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/06/imes-icore-burs.jpg",
    brand: "Imes icore",
    inStock: true,
    description: "Алмазные фрезы для обработки стеклокерамики на фрезерных станках Imes icore 350i и 650i.",
    specifications: {
      "Совместимость": "Imes icore 350i, 650i",
      "Материал обработки": "Стеклокерамика",
    },
    externalUrl: "http://www.vpttool.com/products/Imes/69.html",
  },
  {
    id: "burs-imes-150i-250i-glassceramic",
    name: "Фрезы для станков Imes icore 150i/250i - стеклокерамика",
    category: "milling",
    subcategory: "cutters",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/06/imes-icore-burs.jpg",
    brand: "Imes icore",
    inStock: true,
    description: "Алмазные фрезы для обработки стеклокерамики на фрезерных станках Imes icore 150i и 250i.",
    specifications: {
      "Совместимость": "Imes icore 150i, 250i",
      "Материал обработки": "Стеклокерамика",
    },
    externalUrl: "http://www.vpttool.com/products/Imes/68.html",
  },
];
