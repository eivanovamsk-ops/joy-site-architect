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
    id: "asiga-max-uv",
    name: "3D-принтер Asiga MAX UV",
    category: "3d-print",
    subcategory: "3d-printers",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2023/06/asiga-max-uv-3d-printer.jpg",
    brand: "Asiga",
    inStock: true,
    isNew: true,
    description: `Минимальные габариты – максимальная производительность

Asiga MAX UV – универсальный, высокоточный, настольный 3D принтер для печати из фотополимерной смолы, линейки MAX, от компании Asiga. Светодиод мощностью 385 нм, уникальная система интеллектуального позиционирования SPS, возможность выбора фотополимерных смол под любой бюджет и задачи, собственное ПО Asiga Composer, обеспечивают широкое применение в сферах, где необходимо получить изделия с высокой точностью.

В стоматологии с его помощью можно производить: ортодонтические изделия, элайнеры, временные мосты, коронки, хирургические шаблоны, модели челюсти, индивидуальные ложки и выгораемые каркасы.

MAX – это линейка компактных 3D принтеров с возможностью автоматической калибровки мощности светового потока и интуитивно понятным интерфейсом программного обеспечения для легкого создания проектов.

Преимущества:
• Точный: Система интеллектуального позиционирования SPS, калибровка оси Z в 1 действие занимает меньше минуты
• Простой в управлении: Сенсорный экран отображает всю информацию по текущей задаче
• Универсальный: Открытая система материалов позволяет подобрать материал для любых задач
• Компактный: Габариты принтера составляют всего 260 х 380 х 370 мм
• Высокопроизводительный: Скорость печати составляет 40 мм/ч`,
    specifications: {
      "Система": "Интеллектуальное позиционирование SPS",
      "Дисплей": "Сенсорный",
      "Калибровка": "По оси Z в 1 действие",
      "ПО": "Asiga Composer",
      "Габариты": "260×380×370 мм",
      "Рабочее поле": "119×67×75 мм",
    },
    externalUrl: "https://articon.pro/product/3d-printer-asiga-max-uv/",
  },
  {
    id: "asiga-pro-4k",
    name: "3D принтер Asiga PRO 4K",
    category: "3d-print",
    subcategory: "3d-printers",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2023/06/asiga-pro-4k-3d-printer.jpg",
    brand: "Asiga",
    inStock: true,
    description: `Проверенная производительность

Точность, надежность и скорость для самых требовательных производственных приложений.

Особенности:
• Новейшая технология DLP Imaging в сочетании со специально разработанной оптикой для точного размещения пикселей
• Режим сверхбыстрой печати - доступный объем производства за минимальное время
• Запатентованные процессы наслоения - повторяемая точность с проверенными технологиями мониторинга процессов Asiga – SPS, внутренний радиометр, точное отверждение материала`,
    specifications: {
      "Технология": "DLP Imaging",
      "Режим печати": "Сверхбыстрая печать",
      "Мониторинг": "SPS, внутренний радиометр",
    },
    externalUrl: "https://articon.pro/product/3d-printer-asiga-pro-4k/",
  },
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
    id: "uniformation-gk3",
    name: "3D принтер Uniformation GK3",
    category: "3d-print",
    subcategory: "3d-printers",
    price: null,
    image: uniformationGk3UltraMain,
    gallery: [uniformationGk3Ultra1],
    brand: "UniFormation",
    inStock: true,
    description: `UniFormation GK3 – это компактный и мощный 3D принтер с фотополимерной технологией печати, оснащенный 9,6-дюймовой LCD-матрицей с ультравысоким разрешением 16K.

Особенности:
• Рабочая область: 211×118×240 мм
• HD-матрица с разрешением 15120×6230 px
• Источник света COB с линзами Френеля (405 нм)
• Разрешение по XY: 14×19 микрон
• Быстросъемные ванна и платформа
• Встроенная система нагрева смолы (за 35 минут до рабочей температуры)
• Автоматическая система подачи фотополимера
• Сенсорный экран с поворотом на 90°
• Встроенная камера для удаленного мониторинга`,
    specifications: {
      "Рабочая область": "211×118×240 мм",
      "Разрешение матрицы": "15120×6230 px (16K)",
      "Разрешение XY": "14×19 мкм",
      "Источник света": "COB 405 нм",
    },
    externalUrl: "https://articon.pro/product/uniformation-gk3/",
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
      "HDD": "200 ГБ (рекомендуется 256 ГБ SSD)",
      "GPU": "NVIDIA с OpenGL (8 ГБ)",
      "ОС": "Windows 10 PRO (64-bit)",
      "Дисплей": "1920×1080, 60 Hz",
      "Порты": "2× USB 3.0",
    },
    externalUrl: "https://articon.pro/product/frezernii-stanok-upcera-b52/",
  },
  {
    id: "coritec-150i",
    name: "Фрезерный станок CORiTEC 150i",
    category: "milling",
    subcategory: "machines",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2023/06/coritec-150i.jpg",
    brand: "imes-icore",
    inStock: true,
    description: `Гибкая и компактная система фрезерования.

Чрезвычайно устойчивая конструкция моноблочного литого корпуса позволяет производить точную обработку круглых заготовок и блоков.

Подходит для обработки:
• Оксид циркония / оксид алюминия
• PMMA / смолы / PEEK / композит / воск
• Стеклокерамика / гибридная керамика
• Спеченный металл`,
    specifications: {
      "Размеры": "422×556×644 мм",
      "Оси": "5",
      "Позиции инструмента": "10",
      "Шпиндель": "0,75 кВт, 100 000 об/мин",
      "Приводы": "Микрошаговые двигатели",
      "Сухая обработка": "Да",
      "Мокрая обработка": "Да",
    },
    externalUrl: "https://articon.pro/product/coritec-150i/",
  },
  {
    id: "coritec-350i",
    name: "Фрезерный станок CORiTEC 350i",
    category: "milling",
    subcategory: "machines",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2023/06/coritec-350i.jpg",
    brand: "imes-icore",
    inStock: true,
    description: `Автоматизированное решение "Все в одном".

Система обработки CORiTEC 350i – это инновационная концепция оборудования для любых требований современной обработки CAD/CAM.

Обработка всех материалов: кобальт-хром, титан, диоксид циркония, пластмассы, блоковые материалы.

CORiTEC 350i LOADER - автоматизированный магазин до 12 заготовок.`,
    specifications: {
      "Размеры": "758×790×857 мм (1058 мм с Loader)",
      "Оси": "5",
      "Позиции инструмента": "20",
      "Шпиндель": "1 кВт, 60 000 об/мин",
      "Приводы": "Сервоприводы AC",
      "Автоматическая смена": "До 12 дисков (Loader)",
    },
    externalUrl: "https://articon.pro/product/coritec-350i/",
  },

  // Фрезы
  {
    id: "freza-03mm-t33",
    name: "0,3 мм шаровая концевая фреза (коническая, алмазная), цирконий, ПММА, воск, агломерат, композит (T33, T43, T53)",
    category: "milling",
    subcategory: "cutters",
    price: 6348,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-03mm.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526016 0303",
    description: `T33 (Zr, PMMA, Wax), T43 (Sint), T53 (Comp) – шаровая фреза 0,3 мм (коническая, алмазная), 2-зубая.

Характеристики:
• Положение инструмента: T33, T43, T53
• Конструкция: Сферическая концевая фреза, коническая
• Диаметр: 0,3 мм
• Материал: ПММА, воск, оксид циркония
• Высота материала: до 25 мм
• Хвостовик: 3 мм`,
    specifications: {
      "Диаметр": "0,3 мм",
      "Конструкция": "Сферическая, коническая",
      "Хвостовик": "3 мм",
      "Высота материала": "до 25 мм",
    },
    externalUrl: "https://articon.pro/product/0-3-mm-ball-end-mill-conical-diamond-zr-pmma-wax-sinter-metal-composite-t33-t43-t53/",
  },
  {
    id: "freza-15mm-t5",
    name: "1,5 мм плоская концевая фреза, универсальная (T5, T10, T17)",
    category: "milling",
    subcategory: "cutters",
    price: 5011,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-15mm.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526001 1503",
    description: `T5/T10/T17 – 1,5 мм инструмент для фрезерования вала (универсальный).

Характеристики:
• Конструкция: Концевая фреза, двухлезвийная
• Диаметр: 1,5 мм
• Материал: Универсальный
• Высота материала: до 25 мм
• Вал: 3 мм`,
    specifications: {
      "Диаметр": "1,5 мм",
      "Конструкция": "Концевая, двухлезвийная",
      "Хвостовик": "3 мм",
      "Высота материала": "до 25 мм",
    },
    externalUrl: "https://articon.pro/product/0-3-mm-ball-end-mill-zr-pmma-wax-sinter-metal-composite-t33-t43-t53/",
  },
  {
    id: "freza-06mm-t15",
    name: "0,6 мм шаровая концевая фреза (коническая, алмазная), цирконий, ПММА, воск, металлокерамика, композит (T15, T42, T52)",
    category: "milling",
    subcategory: "cutters",
    price: 6348,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-06mm.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526016 0603",
    description: `T15 (Zr, PMMA, Wax), T42 (Sint), T52 (Comp) – шаровая фреза 0,6 мм (коническая, алмазная), 2 зубья.

Характеристики:
• Положение инструмента: T15, T42, T52
• Конструкция: Сферическая концевая фреза, коническая
• Диаметр: 0,6 мм
• Материал: ПММА, воск, оксид циркония
• Высота материала: до 25 мм
• Хвостовик: 3 мм`,
    specifications: {
      "Диаметр": "0,6 мм",
      "Конструкция": "Сферическая, коническая",
      "Хвостовик": "3 мм",
      "Высота материала": "до 25 мм",
    },
    externalUrl: "https://articon.pro/product/0-6-mm-ball-end-mill-conical-diamond-zr-pmma-wax-sinter-metal-composite-t15-t42-t52/",
  },
  {
    id: "freza-10mm-diamond-6mm",
    name: "1,0 мм шаровая концевая фреза (с алмазным покрытием), Zr, Sint, Comp (T14, T41, T51)",
    category: "milling",
    subcategory: "cutters",
    price: 10120,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-10mm-6mm.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526013 1006",
    description: `T14 (Zr), T41 (Sint), T51 (Comp) – шаровая фреза 1,0 мм (с алмазным покрытием), 2 зуба.

Характеристики:
• Положение инструмента: T14, T41, T51
• Конструкция: Сферическая концевая фреза
• Диаметр: 1,0 мм
• Материал: Оксид циркония
• Высота материала: до 25 мм
• Покрытие: Алмазное покрытие
• Хвостовик: 6 мм`,
    specifications: {
      "Диаметр": "1,0 мм",
      "Покрытие": "Алмазное",
      "Хвостовик": "6 мм",
      "Высота материала": "до 25 мм",
    },
    externalUrl: "https://articon.pro/product/1-0-mm-ball-end-mill-diamond-coated-zr-sint-comp-t14-t41-t51/",
  },
  {
    id: "freza-10mm-diamond-3mm",
    name: "1,0 мм шаровая концевая фреза (алмазное покрытие), цирконий, металлокерамика, композит (T14, T41, T51)",
    category: "milling",
    subcategory: "cutters",
    price: 7590,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-10mm-3mm.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526013 1003",
    description: `T14 (Zr), T41 (Sint), T51 (Comp) – шаровая фреза 1,0 мм (алмазная), 2-зубая.

Характеристики:
• Позиция инструмента: T14, T41, T51
• Конструкция: Ball end mill
• Диаметр: 1,0 мм
• Материал: Оксид циркония
• Высота материала: до 25 мм
• Покрытие: Алмазное покрытие
• Хвостовик: 3 мм`,
    specifications: {
      "Диаметр": "1,0 мм",
      "Покрытие": "Алмазное",
      "Хвостовик": "3 мм",
      "Высота материала": "до 25 мм",
    },
    externalUrl: "https://articon.pro/product/1-0-mm-ball-end-mill-diamond-coating-zr-sinter-metal-composite-t14-t41-t51/",
  },
  {
    id: "freza-10mm-zr-t12",
    name: "1,0 мм шаровая концевая фреза (алмазная), цирконий, ПММА, воск (T12, T14)",
    category: "milling",
    subcategory: "cutters",
    price: 6348,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-10mm-t12.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526016 1003",
    description: `T12 (ПММА, воск), T14 (Zr) – шаровая фреза 1,0 мм (алмазная), 2-зубая.

Характеристики:
• Положение инструмента: T12, T14
• Конструкция: Сферическая концевая фреза
• Диаметр: 1,0 мм
• Материал: PMMA, Wax, оксид циркония
• Хвостовик: 3 мм`,
    specifications: {
      "Диаметр": "1,0 мм",
      "Конструкция": "Сферическая",
      "Хвостовик": "3 мм",
    },
    externalUrl: "https://articon.pro/product/1-0-mm-ball-end-mill-diamond-zr-pmma-wax-t12-t14/",
  },
  {
    id: "freza-10mm-ti-cocr",
    name: "1,0 мм шаровая концевая фреза (короткая), Ti, CoCr (T4, T9)",
    category: "milling",
    subcategory: "cutters",
    price: 6613,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-10mm-ti.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526029 1006",
    description: `T4 (Ti), T9 (CoCr) – шаровая фреза 1,0 мм (короткая), 2-зубая.

Характеристики:
• Положение инструмента: T4, T9
• Конструкция: Сферическая концевая фреза
• Диаметр: 1,0 мм
• Материал: Кобальт-хром, Титан
• Высота материала: до 15 мм
• Вал: 6 мм`,
    specifications: {
      "Диаметр": "1,0 мм",
      "Материал": "Ti, CoCr",
      "Хвостовик": "6 мм",
      "Высота материала": "до 15 мм",
    },
    externalUrl: "https://articon.pro/product/1-0-mm-ball-end-mill-short-ti-cocr-t4-t9/",
  },
  {
    id: "freza-10mm-slide-6mm",
    name: "1,0 мм шаровая концевая фреза (скользящее покрытие), ПММА, воск, ПЭЭК (T12)",
    category: "milling",
    subcategory: "cutters",
    price: 5405,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-10mm-slide-6mm.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526004 1006",
    description: `T12 (PMMA, воск, PEEK) – шаровая фреза 1,0 мм (однолезвийная, с антискользящим покрытием).

Характеристики:
• Положение инструмента: T12
• Конструкция: Сферическая концевая фреза
• Диаметр: 1,0 мм
• Материал: ПММА, Воск
• Высота материала: до 25 мм
• Хвостовик: 6 мм`,
    specifications: {
      "Диаметр": "1,0 мм",
      "Покрытие": "Антискользящее",
      "Хвостовик": "6 мм",
      "Высота материала": "до 25 мм",
    },
    externalUrl: "https://articon.pro/product/1-0-mm-ball-end-mill-slide-coated-pmma-wax-peek-t12-2/",
  },
  {
    id: "freza-10mm-slide-3mm",
    name: "1,0 мм шаровая концевая фреза (скользящее покрытие), ПММА, воск, ПЭЭК (T12) - хвостовик 3мм",
    category: "milling",
    subcategory: "cutters",
    price: 4767,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-10mm-slide-3mm.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "530004 1003",
    description: `T12 (ПММА, воск, PEEK) – шаровая фреза 1,0 мм (с антискользящим покрытием), однозубая.

Характеристики:
• Положение инструмента: T12
• Конструкция: Сферическая концевая фреза, однолезвийная
• Диаметр: 1,0 мм
• Материал: Пластмассы, ПММА, Воск
• Высота материала: до 25 мм
• Хвостовик: 3 мм`,
    specifications: {
      "Диаметр": "1,0 мм",
      "Покрытие": "Антискользящее",
      "Хвостовик": "3 мм",
      "Высота материала": "до 25 мм",
    },
    externalUrl: "https://articon.pro/product/1-0-mm-ball-end-mill-slide-coated-pmma-wax-peek-t12/",
  },
  {
    id: "freza-10mm-zr-pmma-6mm",
    name: "1,0 мм шаровая концевая фреза, цирконий, ПММА, воск (T12, T14)",
    category: "milling",
    subcategory: "cutters",
    price: 6613,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-10mm-zr-pmma.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526019 1006",
    description: `T12 (ПММА, воск), T14 (Zr) – шаровая фреза 1,0 мм, 2 зуба.

Характеристики:
• Положение инструмента: T12, T14
• Конструкция: Сферическая концевая фреза
• Диаметр: 1,0 мм
• Материал: Пластмассы, ПММА, Воск
• Высота материала: до 25 мм
• Хвостовик: 6 мм`,
    specifications: {
      "Диаметр": "1,0 мм",
      "Хвостовик": "6 мм",
      "Высота материала": "до 25 мм",
    },
    externalUrl: "https://articon.pro/product/1-0-mm-ball-end-mill-zr-pmma-wax-t12-t14-2/",
  },
  {
    id: "freza-15mm-ti-cocr",
    name: "1,5 мм шаровая концевая фреза (короткая), Ti, CoCr (T3, T8)",
    category: "milling",
    subcategory: "cutters",
    price: 6613,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-15mm-ti.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526029 1506",
    description: `T3 (Ti), T8 (CoCr) – шаровая фреза 1,5 мм (короткая), два лезвия.

Характеристики:
• Положение инструмента: T3, T8
• Дизайн: Шарикорез, короткий
• Диаметр: 1,5 мм
• Вал: 6 мм`,
    specifications: {
      "Диаметр": "1,5 мм",
      "Материал": "Ti, CoCr",
      "Хвостовик": "6 мм",
    },
    externalUrl: "https://articon.pro/product/1-5-mm-ball-end-mill-short-ti-cocr-t3-t8/",
  },
  {
    id: "freza-15mm-toric-t64",
    name: "1,5 мм Торическая концевая фреза R0.08, (l = 15 мм), Ti, CoCr (T64)",
    category: "milling",
    subcategory: "cutters",
    price: 6210,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-15mm-toric.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526 028 1506",
    description: `T64 (Ti,CoCr) – тороидальная фреза 1,5 мм, (шейка = 15 мм), 2 зуба.

Характеристики:
• Положение инструмента: T64
• Хвостовик: 6 мм`,
    specifications: {
      "Диаметр": "1,5 мм",
      "Тип": "Торическая R0.08",
      "Шейка": "15 мм",
      "Хвостовик": "6 мм",
    },
    externalUrl: "https://articon.pro/product/1-5-mm-toric-r0-08-end-mill-l-15-mm-ti-cocr-t64/",
  },

  // Пылесосы
  {
    id: "vacuum-dry",
    name: "Пылесос для фрезерных станков сухой обработки",
    category: "milling",
    subcategory: "vacuums",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/01/Frame-285-19-300x300.jpg",
    brand: "Articon",
    inStock: true,
    description: `Компактная и портативная конструкция с сильным всасыванием до 24 м/с.

Особенности:
• Ультратихая работа: уровень шума ниже 65 дБ
• Бесщеточный двигатель: более 20 000 часов работы
• Фильтрация частиц размером 8 мкм
• Легко поддерживать и чистить`,
    specifications: {
      "Модель": "R412",
      "Напряжение": "220 В",
      "Ток": "1.6 А",
      "Мощность": "350 Вт (Max)",
      "Частота": "50 Гц",
      "Вес": "29.5 кг",
      "Размер": "42×40×60 см",
      "Подключение": "2 ед.",
    },
    externalUrl: "https://articon.pro/product/pylesos-dlya-stankov-sukhoy-obrabotki/",
  },

  // Компрессоры
  {
    id: "remeza-km50",
    name: "Remeza КМ-50.OLD20 безмасляный компрессор для 2 установок",
    category: "milling",
    subcategory: "compressors",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2023/06/remeza-km50.jpg",
    brand: "Remeza",
    inStock: true,
    description: `Remeza КМ-50.OLD20 безмасляный компрессор для 2 стоматологических установок, с ресивером 50 л, производительность 160 л/мин, без осушителя.

Поршневой безмасляный медицинский компрессор с прямым приводом предназначен для обеспечения сжатым воздухом стоматологического, медицинского, лабораторного оборудования и инструмента.

Особенности:
• Поршневой блок OLD с насосами "TwinCylinder"
• Ресивер с полимерным покрытием (защита от коррозии)
• Два манометра и регулятор давления
• Выходной разъем 1/4 дюйма
• Регистрационное удостоверение и Декларация о соответствии`,
    specifications: {
      "Производительность": "160 л/мин при 8 бар",
      "Объем ресивера": "50 л",
      "Макс. давление": "8 бар",
      "Мощность": "1,4 кВт",
      "Питание": "220/50 В/Гц",
      "Уровень шума": "66 дБ",
      "Установок": "2",
      "Вес": "48 кг",
      "Размеры": "475×465×845 мм",
      "Гарантия": "12 мес.",
    },
    externalUrl: "https://articon.pro/product/remeza-km-50old20/",
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
• Температура обжига до 1550°C
• 18 встроенных программ спекания с 5 стадиями`,
    specifications: {
      "Размеры": "42×46.5×80 см",
      "Вес нетто": "44 кг",
      "Напряжение": "220 В ±10%",
      "Мощность": "2.5 кВт",
      "Макс. температура": "1550 °C",
      "Уровень защиты": "IP21",
      "Скорость нагрева": "2–30 °C/мин",
    },
    externalUrl: "https://articon.pro/product/pech-dlya-sinterizatsii-upcera-gt1/",
  },
  {
    id: "nabertherm-01-17d",
    name: "Зуботехническая печь для синтеризации циркония NABERTHERM 01/17D",
    category: "furnaces",
    subcategory: "sintering",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2023/06/nabertherm-01-17d.jpg",
    brand: "Nabertherm",
    inStock: true,
    description: `Оптимальное соотношение цена/качество среди синтеризационных печей.

Nabertherm LHT 01/17D – настольная компактная муфельная печь для синтеризации циркония.

Преимущества:
• Максимальная температура нагрева 1650 °C
• Нагревательные элементы из дисилицида молибдена
• Безопасный волокнистый материал без RCF
• Корпус из нержавеющей стали
• NTLog Basic для записи данных
• Бесплатное приложение MyNabertherm`,
    specifications: {
      "Производитель": "Nabertherm",
      "Страна": "Германия",
      "Max t°": "1650 °C",
      "Разогрев до 1550°C": "35 мин",
      "Термопара": "Тип S",
      "Контроллер": "P580",
      "Программы": "50",
      "Сегменты": "40",
      "Max единиц": "30",
      "Внешние габариты": "385×425×525 мм",
      "Объём камеры": "1 л",
      "Мощность": "2.9 кВт",
      "Вес": "28 кг",
      "Гарантия": "12 месяцев",
    },
    externalUrl: "https://articon.pro/product/nabertherm-01-17d/",
  },
  {
    id: "nabertherm-lhtct-01-16",
    name: "Зуботехническая печь для синтеризации циркония NABERTHERM LHTCT 01/16",
    category: "furnaces",
    subcategory: "sintering",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2023/06/nabertherm-lhtct.jpg",
    brand: "Nabertherm",
    inStock: true,
    description: `Зуботехническая печь для спекания с нагревательными стержнями из карбида кремния.

Особенности:
• Максимальная температура 1550 °С
• Рабочая температура 1500 °C
• Однофазное подключение
• Изоляция из неканцерогенных волокнистых материалов
• Контроллер C450
• NTLog Basic для записи данных`,
    specifications: {
      "Max t°": "1550 °C",
      "Рабочая t°": "1500 °C",
      "Термопара": "Тип S",
      "Контроллер": "C450",
    },
    externalUrl: "https://articon.pro/product/nabertherm-lhtct-01-16/",
  },
  {
    id: "dekema-austromat-624",
    name: "Зуботехническая печь для обжига Dekema AUSTROMAT 624",
    category: "furnaces",
    subcategory: "firing",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2023/06/dekema-624.jpg",
    brand: "Dekema",
    inStock: true,
    description: `Печь для обжига стоматологической керамики.

AUSTROMAT 624 объединяет опыт Dekema с контролем высочайшего уровня.

Особенности:
• Сенсорный экран 7,5" с высоким разрешением
• 200 активных программ
• Возможность изменения программы во время работы
• Удаленное управление по сети`,
    specifications: {
      "Размер": "653×383×343 мм",
      "Вес": "17,5 кг",
      "Электропитание": "230 В / 50-60 Гц",
      "Мощность": "1,5 кВт",
      "Max t°": "1200 °С",
      "Дисплей": "7,5\" цветной сенсорный",
      "Программирование": "Easy Professional Classic",
      "Вакуумный насос": "Да",
      "DEKEMA AutoDry": "Да",
    },
    externalUrl: "https://articon.pro/product/dekema-austromat-624/",
  },
  {
    id: "dekema-austromat-654",
    name: "Зуботехническая печь для обжига и прессования – Dekema AUSTROMAT 654",
    category: "furnaces",
    subcategory: "firing",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2023/06/dekema-654.jpg",
    brand: "Dekema",
    inStock: true,
    description: `Комбинированная печь для обжига и прессования с закрытой камерой сгорания.

AUSTROMAT 654 press-i-dent оснащена инновационным электронно-механическим двигателем.

Особенности:
• Многоцветное штампование нескольких слитков
• Закрытая камера сгорания без холодных точек
• Однородное распределение температуры
• Сенсорный экран 7,5"`,
    specifications: {
      "Размер": "653×383×343 мм",
      "Вес": "22 кг",
      "Электропитание": "230 В / 50-60 Гц",
      "Мощность": "1,5 кВт",
      "Max t°": "1200 °C",
      "Дисплей": "7,5\" цветной сенсорный",
      "Программирование": "Easy Professional Press Classic",
      "Функциональность прессов": "Да",
      "MPTA": "Да",
    },
    externalUrl: "https://articon.pro/product/dekema-austromat-654/",
  },
  {
    id: "dekema-austromat-674",
    name: "Зуботехническая печь для синтеризации ZrO2 Dekema AUSTROMAT 674",
    category: "furnaces",
    subcategory: "sintering",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2023/06/dekema-674.jpg",
    brand: "Dekema",
    inStock: true,
    description: `DEKEMA AUSTROMAT 674 оснащен тремя нагревательными элементами из SiC (карбид кремния), обеспечивающими обжиг до 1530°С.

Особенности:
• Нагревательные элементы без обесцвечивания материала
• Закрытая камера обжига с безвибрационным подъемом
• Система AutoDry для высокотемпературных градиентов
• Рабочая платформа до 30 единиц (диаметр до 100 мм)`,
    specifications: {
      "Размеры": "780×383×343 мм",
      "Вес": "24 кг",
      "Напряжение": "230 В / 50-60 Гц",
      "Мощность": "2 кВт",
      "Max t°": "1530 °С",
      "Дисплей": "7,5\" цветной",
      "Программирование": "Classic",
      "DEKEMA AutoDry": "Да",
    },
    externalUrl: "https://articon.pro/product/dekema-austromat-674/",
  },

  // Циркониевые диски
  {
    id: "upcera-duo-a1-14mm",
    name: "UPCERA DUO циркониевые диски 98 x 14 мм, цвет A1",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 11040,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-duo-a1.jpg",
    brand: "Upcera",
    inStock: true,
    sku: "DUO ML A1 D98-14 F",
    description: `UPCERA DUO – сочетание прочности, эстетики, эффективности и универсальности.

Применение:
• Накладка/инкрустация
• Винир
• Коронка
• Монолитный мост из 3 блоков
• Многокомпонентный монолитный мост (≥4 единицы)
• Имплант
• Многоэлементный/несъемный зубной протез на имплантах`,
    specifications: {
      "Толщина": "14 мм",
      "Диаметр": "98 мм",
      "Цвет": "A1",
      "Плотность": "≥ 6.0 г/см³",
      "КТР (25-500°C)": "(10,5 ± 1,0) × 10⁻⁶K⁻¹",
      "Прочность на изгиб": "> 800-1200 MPa",
      "Прозрачность": "45-48%",
      "Температура спекания": "1480 °C",
      "ZrO2+HfO2": "86.3-94.2%",
      "Y2O3": "5.8-9.7%",
    },
    externalUrl: "https://articon.pro/product/upcera-duo-cirkonievyj-disk-98x14-a1/",
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
    image: "https://articon.pro/wp-content/uploads/2024/11/%D0%93%D0%BB%D0%B0%D0%B7%D1%83%D1%80%D1%8C-Upcera-Realism-%D0%B4%D0%BB%D1%8F-%D0%BA%D0%B5%D1%80%D0%B0%D0%BC%D0%B8%D0%BA%D0%B8-%D0%B8-%D1%86%D0%B8%D1%80%D0%BA%D0%BE%D0%BD%D0%B8%D1%8F--300x300.jpg",
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
    image: "https://articon.pro/wp-content/uploads/2024/11/%D0%A0%D0%B0%D0%B7%D0%B1%D0%B0%D0%B2%D0%B8%D1%82%D0%B5%D0%BB%D1%8C-Upcera-Realism-Glaze-Liquid-%D0%B4%D0%BB%D1%8F-%D0%BA%D0%B5%D1%80%D0%B0%D0%BC%D0%B8%D0%BA%D0%B8-%D0%B8-%D1%86%D0%B8%D1%80%D0%BA%D0%BE%D0%BD%D0%B8%D1%8F-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    description: "Профессиональный разбавитель для глазури Upcera Realism. Обеспечивает идеальную консистенцию для нанесения глазури.",
    externalUrl: "https://articon.pro/product/glaze-liquid-upcera/",
  },

  // Дополнительные циркониевые диски
  {
    id: "upcera-duo-a2-14mm",
    name: "UPCERA DUO циркониевые диски 98 x 14 мм, цвет A2",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 11040,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-duo-a2.jpg",
    brand: "Upcera",
    inStock: true,
    description: "UPCERA DUO – сочетание прочности, эстетики, эффективности и универсальности.",
    specifications: {
      "Толщина": "14 мм",
      "Диаметр": "98 мм",
      "Цвет": "A2",
    },
    externalUrl: "https://articon.pro/product/upcera-duo-cirkonievyj-disk-98x14-a2/",
  },
  {
    id: "upcera-duo-a3-14mm",
    name: "UPCERA DUO циркониевые диски 98 x 14 мм, цвет A3",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 11040,
    image: "https://articon.pro/wp-content/uploads/2024/06/upcera-duo-a3.jpg",
    brand: "Upcera",
    inStock: true,
    description: "UPCERA DUO — премиальный двухслойный циркониевый диск, сочетающий высокую прочность основы и естественную эстетику верхнего слоя. Идеален для изготовления монолитных коронок и мостовидных протезов с градиентом прозрачности. Прочность на изгиб более 1000 МПа обеспечивает долговечность реставраций. Совместим со всеми открытыми CAD/CAM системами диаметра 98 мм.",
    specifications: {
      "Толщина": "14 мм",
      "Диаметр": "98 мм",
      "Цвет": "A3",
    },
    externalUrl: "https://articon.pro/product/upcera-duo-cirkonievyj-disk-98x14-a3/",
  },
  {
    id: "upcera-st-white-98x14",
    name: "Upcera ST White циркониевый диск 98 x 14 мм",
    category: "zircon-discs",
    subcategory: "white",
    price: 4500,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-White-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    description: "Белый циркониевый диск Upcera ST White для изготовления каркасов коронок и мостовидных конструкций под керамическую облицовку. Высокая прочность на изгиб (более 1200 МПа) обеспечивает надёжность протяжённых конструкций. Оптимален для классической техники послойного нанесения керамики. Диаметр 98 мм — универсальный размер для большинства CAD/CAM фрезерных станков.",
    specifications: {
      "Толщина": "14 мм",
      "Диаметр": "98 мм",
      "Цвет": "Белый",
    },
    externalUrl: "https://articon.pro/product/upcera-st-white/",
  },
  {
    id: "upcera-st-color-a1-98x14",
    name: "Upcera ST Color циркониевый диск 98 x 14 мм, цвет A1",
    category: "zircon-discs",
    subcategory: "colored",
    price: 5290,
    image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg",
    brand: "Upcera",
    inStock: true,
    description: "Окрашенный циркониевый диск Upcera ST Color цвета A1 для изготовления эстетичных каркасов и монолитных реставраций. Предокрашенный материал сокращает время финишной обработки и обеспечивает равномерный оттенок по всей толщине диска. Высокая прочность для мостовидных конструкций. Совместим с открытыми CAD/CAM системами диаметра 98 мм. Производство UPCERA, Китай.",
    specifications: {
      "Толщина": "14 мм",
      "Диаметр": "98 мм",
      "Цвет": "A1",
    },
    externalUrl: "https://articon.pro/product/upcera-st-color-a1/",
  },
  // Фотополимеры HARZ Labs
  {
    id: "harz-dental-sand-a1-a2",
    name: "HARZ Labs Dental Sand A1-A2",
    description: "Фотополимерная смола для печати временных коронок и мостов. Цвет A1-A2. Биосовместимый материал класса IIa.",
    price: 8500,
    image: "https://articon.pro/wp-content/uploads/2024/01/harz-dental-sand.jpg",
    category: "3d-print",
    subcategory: "photopolymers",
    brand: "HARZ Labs",
    isNew: true,
    inStock: true,
    sku: "HARZ-SAND-A1A2",
    specifications: {
      "Объём": "1 кг",
      "Цвет": "A1-A2",
      "Длина волны": "385-405 нм",
      "Применение": "Временные коронки и мосты",
    },
    externalUrl: "https://articon.pro/product/harz-dental-sand/",
  },
  {
    id: "harz-dental-clear",
    name: "HARZ Labs Dental Clear",
    description: "Прозрачная фотополимерная смола для печати хирургических шаблонов и капп. Высокая точность и прозрачность.",
    price: 7900,
    image: "https://articon.pro/wp-content/uploads/2024/01/harz-dental-clear.jpg",
    category: "3d-print",
    subcategory: "photopolymers",
    brand: "HARZ Labs",
    inStock: true,
    sku: "HARZ-CLEAR-1KG",
    specifications: {
      "Объём": "1 кг",
      "Цвет": "Прозрачный",
      "Длина волны": "385-405 нм",
      "Применение": "Хирургические шаблоны, каппы",
    },
    externalUrl: "https://articon.pro/product/harz-dental-clear/",
  },
  {
    id: "harz-dental-model-beige",
    name: "HARZ Labs Dental Model Beige",
    description: "Фотополимерная смола для печати стоматологических моделей. Бежевый цвет, высокая детализация.",
    price: 6500,
    image: "https://articon.pro/wp-content/uploads/2024/01/harz-model-beige.jpg",
    category: "3d-print",
    subcategory: "photopolymers",
    brand: "HARZ Labs",
    inStock: true,
    sku: "HARZ-MODEL-BEIGE",
    specifications: {
      "Объём": "1 кг",
      "Цвет": "Бежевый",
      "Длина волны": "385-405 нм",
      "Применение": "Стоматологические модели",
    },
    externalUrl: "https://articon.pro/product/harz-model-beige/",
  },
  {
    id: "harz-dental-cast",
    name: "HARZ Labs Dental Cast",
    description: "Выжигаемая фотополимерная смола для литья. Минимальный зольный остаток, идеально для каркасов.",
    price: 9200,
    image: "https://articon.pro/wp-content/uploads/2024/01/harz-dental-cast.jpg",
    category: "3d-print",
    subcategory: "photopolymers",
    brand: "HARZ Labs",
    inStock: true,
    sku: "HARZ-CAST-1KG",
    specifications: {
      "Объём": "1 кг",
      "Цвет": "Красный",
      "Длина волны": "385-405 нм",
      "Применение": "Выжигаемые модели для литья",
    },
    externalUrl: "https://articon.pro/product/harz-dental-cast/",
  },
  {
    id: "harz-dental-pink-soft",
    name: "HARZ Labs Dental Pink Soft",
    description: "Гибкая розовая смола для печати десневых масок и мягких элементов протезов.",
    price: 8900,
    image: "https://articon.pro/wp-content/uploads/2024/01/harz-pink-soft.jpg",
    category: "3d-print",
    subcategory: "photopolymers",
    brand: "HARZ Labs",
    inStock: true,
    sku: "HARZ-PINK-SOFT",
    specifications: {
      "Объём": "1 кг",
      "Цвет": "Розовый",
      "Длина волны": "385-405 нм",
      "Применение": "Десневые маски, гибкие элементы",
    },
    externalUrl: "https://articon.pro/product/harz-pink-soft/",
  },
  // Фотополимеры TOPCORE
  {
    id: "topcore-composite-a1",
    name: "Фотополимер TOPCORE Composite A1",
    description: `Профессиональный фотополимер для 3D-печати временных реставраций цвета A1.

TOPCORE Composite A1 — это высококачественная фотополимерная смола, разработанная специально для изготовления временных коронок, мостов и других ортопедических конструкций. Материал обладает отличными эстетическими свойствами и точно воспроизводит оттенок A1 по шкале VITA.

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
  // Металлические диски CoCr
  {
    id: "cocr-disc-98-10",
    name: "Диск CoCr 98.5x10 мм",
    description: "Кобальт-хромовый диск для фрезерования каркасов коронок и мостовидных протезов. Высокая биосовместимость, отличные механические свойства.",
    price: 12500,
    image: "https://articon.pro/wp-content/uploads/2024/01/cocr-disc.jpg",
    category: "discs",
    subcategory: "metal",
    brand: "Mesa",
    inStock: true,
    sku: "COCR-98-10",
    specifications: {
      "Материал": "CoCr (кобальт-хром)",
      "Диаметр": "98.5 мм",
      "Толщина": "10 мм",
      "Применение": "Каркасы коронок и мостов",
    },
    externalUrl: "https://articon.pro/product/cocr-disc-98-10/",
  },
  {
    id: "cocr-disc-98-14",
    name: "Диск CoCr 98.5x14 мм",
    description: "Кобальт-хромовый диск увеличенной толщины для фрезерования объёмных конструкций и мостов большой протяжённости.",
    price: 16800,
    image: "https://articon.pro/wp-content/uploads/2024/01/cocr-disc-14.jpg",
    category: "discs",
    subcategory: "metal",
    brand: "Mesa",
    inStock: true,
    sku: "COCR-98-14",
    specifications: {
      "Материал": "CoCr (кобальт-хром)",
      "Диаметр": "98.5 мм",
      "Толщина": "14 мм",
      "Применение": "Мосты большой протяжённости",
    },
    externalUrl: "https://articon.pro/product/cocr-disc-98-14/",
  },
  {
    id: "cocr-disc-98-18",
    name: "Диск CoCr 98.5x18 мм",
    description: "Кобальт-хромовый диск максимальной толщины для сложных ортопедических конструкций.",
    price: 21500,
    image: "https://articon.pro/wp-content/uploads/2024/01/cocr-disc-18.jpg",
    category: "discs",
    subcategory: "metal",
    brand: "Mesa",
    inStock: true,
    sku: "COCR-98-18",
    specifications: {
      "Материал": "CoCr (кобальт-хром)",
      "Диаметр": "98.5 мм",
      "Толщина": "18 мм",
      "Применение": "Сложные ортопедические конструкции",
    },
    externalUrl: "https://articon.pro/product/cocr-disc-98-18/",
  },
  // Титановые диски
  {
    id: "titan-disc-98-10",
    name: "Диск Титан Grade 5 98.5x10 мм",
    description: "Титановый диск Grade 5 (Ti6Al4V) для фрезерования имплантологических конструкций. Высочайшая биосовместимость.",
    price: 18500,
    image: "https://articon.pro/wp-content/uploads/2024/01/titan-disc.jpg",
    category: "discs",
    subcategory: "metal",
    brand: "Mesa",
    isNew: true,
    inStock: true,
    sku: "TI-98-10",
    specifications: {
      "Материал": "Титан Grade 5 (Ti6Al4V)",
      "Диаметр": "98.5 мм",
      "Толщина": "10 мм",
      "Применение": "Имплантологические конструкции",
    },
    externalUrl: "https://articon.pro/product/titan-disc-98-10/",
  },
  {
    id: "titan-disc-98-14",
    name: "Диск Титан Grade 5 98.5x14 мм",
    description: "Титановый диск увеличенной толщины для изготовления балок и объёмных конструкций на имплантатах.",
    price: 24500,
    image: "https://articon.pro/wp-content/uploads/2024/01/titan-disc-14.jpg",
    category: "discs",
    subcategory: "metal",
    brand: "Mesa",
    inStock: true,
    sku: "TI-98-14",
    specifications: {
      "Материал": "Титан Grade 5 (Ti6Al4V)",
      "Диаметр": "98.5 мм",
      "Толщина": "14 мм",
      "Применение": "Балки на имплантатах",
    },
    externalUrl: "https://articon.pro/product/titan-disc-98-14/",
  },
  {
    id: "titan-disc-98-18",
    name: "Диск Титан Grade 5 98.5x18 мм",
    description: "Титановый диск максимальной толщины для сложных имплантологических работ.",
    price: 32000,
    image: "https://articon.pro/wp-content/uploads/2024/01/titan-disc-18.jpg",
    category: "discs",
    subcategory: "metal",
    brand: "Mesa",
    inStock: true,
    sku: "TI-98-18",
    specifications: {
      "Материал": "Титан Grade 5 (Ti6Al4V)",
      "Диаметр": "98.5 мм",
      "Толщина": "18 мм",
      "Применение": "Сложные имплантологические работы",
    },
    externalUrl: "https://articon.pro/product/titan-disc-98-18/",
  },
  {
    id: "titan-disc-pure-98-12",
    name: "Диск Титан Pure Grade 2 98.5x12 мм",
    description: "Чистый титан Grade 2 для изготовления абатментов и супраструктур. Максимальная биосовместимость.",
    price: 15800,
    image: "https://articon.pro/wp-content/uploads/2024/01/titan-pure.jpg",
    category: "discs",
    subcategory: "metal",
    brand: "Mesa",
    inStock: true,
    sku: "TI-PURE-98-12",
    specifications: {
      "Материал": "Титан Pure Grade 2",
      "Диаметр": "98.5 мм",
      "Толщина": "12 мм",
      "Применение": "Абатменты, супраструктуры",
    },
    externalUrl: "https://articon.pro/product/titan-pure-disc/",
  },

  // === Циркониевые диски Dental Direkt ===
  // DD Bio ZX² color
  {
    id: "dd-bio-zx2-color-98x14-c1",
    name: "Циркониевый диск DD Bio ZX² color - Dental Direkt – 98×14, C1",
    category: "zircon-discs",
    subcategory: "colored",
    price: 10185,
    image: "https://articon.pro/wp-content/uploads/2023/06/dd-bio-zx2-color.jpg",
    brand: "Dental Direkt",
    inStock: true,
    sku: "G 592.017.0",
    description: "DD Bio ZX² color — высокопрозрачная предокрашенная заготовка из диоксида циркония от Dental Direkt. Идеальна для изготовления монолитных коронок и мостов любого диапазона, виниров, индивидуальных абатментов. Прочность на изгиб 1150±150 МПа обеспечивает надёжность конструкций. Оттенок C1 для естественных светлых реставраций. Совместим с открытыми CAD/CAM системами.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "14 мм",
      "Цвет": "C1",
      "КТР": "~10.6 [10-6 K-1]",
      "Прочность на изгиб": "1150 ± 150 MPa",
    },
    externalUrl: "https://articon.pro/product/dental-direkt-98x14-c1/",
  },
  {
    id: "dd-bio-zx2-color-98x10-a1",
    name: "Циркониевый диск DD Bio ZX² color – Dental Direkt – 98×10, А1",
    category: "zircon-discs",
    subcategory: "colored",
    price: 8400,
    image: "https://articon.pro/wp-content/uploads/2023/06/dd-bio-zx2-color.jpg",
    brand: "Dental Direkt",
    inStock: true,
    sku: "G 590.012.0",
    description: "DD Bio ZX² color — высокопрозрачный предокрашенный циркониевый диск 98×10 мм от Dental Direkt, цвет A1. Оптимален для одиночных коронок и виниров с минимальной редукцией зуба. Прочность на изгиб более 1100 МПа. Естественная эстетика и долговечность. Немецкое качество.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "10 мм",
      "Цвет": "A1",
    },
    externalUrl: "https://articon.pro/product/dental-direkt-98x10-a1/",
  },
  {
    id: "dd-bio-zx2-color-98x10-a3",
    name: "Циркониевый диск DD Bio ZX² color – Dental Direkt – 98×10, А3",
    category: "zircon-discs",
    subcategory: "colored",
    price: 8400,
    image: "https://articon.pro/wp-content/uploads/2023/06/dd-bio-zx2-color.jpg",
    brand: "Dental Direkt",
    inStock: true,
    sku: "G 590.007.0",
    description: "Высокопрозрачная предокрашенная заготовка из циркония DD Bio ZX² color 98×10 мм, цвет A3.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "10 мм",
      "Цвет": "A3",
    },
    externalUrl: "https://articon.pro/product/dental-direkt-98x10-a3/",
  },
  {
    id: "dd-bio-zx2-color-98x10-a35",
    name: "Циркониевый диск DD Bio ZX² color – Dental Direkt – 98×10, А3.5",
    category: "zircon-discs",
    subcategory: "colored",
    price: 8400,
    image: "https://articon.pro/wp-content/uploads/2023/06/dd-bio-zx2-color.jpg",
    brand: "Dental Direkt",
    inStock: true,
    sku: "G 590.008.0",
    description: "Высокопрозрачная предокрашенная заготовка из циркония DD Bio ZX² color 98×10 мм, цвет A3.5.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "10 мм",
      "Цвет": "A3.5",
    },
    externalUrl: "https://articon.pro/product/dental-direkt-98x10-a35/",
  },
  {
    id: "dd-bio-zx2-color-98x14-b1",
    name: "Циркониевый диск DD Bio ZX² color – Dental Direkt – 98×14, B1",
    category: "zircon-discs",
    subcategory: "colored",
    price: 10185,
    image: "https://articon.pro/wp-content/uploads/2023/06/dd-bio-zx2-color.jpg",
    brand: "Dental Direkt",
    inStock: true,
    sku: "G 592.014.0",
    description: "Высокопрозрачная предокрашенная заготовка из циркония DD Bio ZX² color 98×14 мм, цвет B1.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "14 мм",
      "Цвет": "B1",
    },
    externalUrl: "https://articon.pro/product/dental-direkt-98x14-b1/",
  },
  {
    id: "dd-bio-zx2-color-98x14-b2",
    name: "Циркониевый диск DD Bio ZX² color – Dental Direkt – 98×14, B2",
    category: "zircon-discs",
    subcategory: "colored",
    price: 10185,
    image: "https://articon.pro/wp-content/uploads/2023/06/dd-bio-zx2-color.jpg",
    brand: "Dental Direkt",
    inStock: true,
    sku: "G 592.009.0",
    description: "Высокопрозрачная предокрашенная заготовка из циркония DD Bio ZX² color 98×14 мм, цвет B2.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "14 мм",
      "Цвет": "B2",
    },
    externalUrl: "https://articon.pro/product/dental-direkt-98x14-b2/",
  },

  // DD cube ONE белый
  {
    id: "dd-cube-one-98x10-white",
    name: "Циркониевый диск DD cube ONE – Dental Direkt – 98×10, white",
    category: "zircon-discs",
    subcategory: "white",
    price: 14595,
    image: "https://articon.pro/wp-content/uploads/2023/06/dd-cube-one-white.jpg",
    brand: "Dental Direkt",
    inStock: true,
    sku: "G 820",
    description: "Непрокрашенные высоко транслюцентные блок-заготовки белого цвета из кубического циркония DD cube ONE для высокоэстетичных монолитных коронок и мостов.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "10 мм",
      "Цвет": "White",
      "КТР": "~10.8 [10-6 K-1]",
      "Прочность на изгиб": "1200 ± 150 MPa",
    },
    externalUrl: "https://articon.pro/product/dental-direkt-98x10-white/",
  },

  // DD cube ONE ML (мультилеер)
  {
    id: "dd-cube-one-ml-98x14-a1",
    name: "Циркониевый диск Cube ONE ML – Dental Direkt – 98×14, A1",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 17955,
    image: "https://articon.pro/wp-content/uploads/2023/06/dd-cube-one-ml.jpg",
    brand: "Dental Direkt",
    inStock: true,
    sku: "G832007",
    description: "Многослойная заготовка из предокрашенного циркония DD cube ONE ML для высокоэстетичных монолитных коронок и виниров. Идеально для пациентов с бруксизмом.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "14 мм",
      "Цвет": "A1",
      "КТР": "~10.8 [10-6 K-1]",
      "Прочность на изгиб": "1200 ± 150 MPa",
    },
    externalUrl: "https://articon.pro/product/dental-direkt-98x14-a1/",
  },
  {
    id: "dd-cube-one-ml-98x14-a2",
    name: "Циркониевый диск Cube ONE ML – Dental Direkt – 98×14, A2",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 17955,
    image: "https://articon.pro/wp-content/uploads/2023/06/dd-cube-one-ml.jpg",
    brand: "Dental Direkt",
    inStock: true,
    sku: "G832001",
    description: "Многослойная заготовка из предокрашенного циркония DD cube ONE ML для высокоэстетичных монолитных коронок и виниров.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "14 мм",
      "Цвет": "A2",
    },
    externalUrl: "https://articon.pro/product/dental-direkt-98x14-a2/",
  },
  {
    id: "dd-cube-one-ml-98x14-a3",
    name: "Циркониевый диск Cube ONE ML – Dental Direkt – 98×14, A3",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 17955,
    image: "https://articon.pro/wp-content/uploads/2023/06/dd-cube-one-ml.jpg",
    brand: "Dental Direkt",
    inStock: true,
    sku: "G832002",
    description: "Многослойная заготовка из предокрашенного циркония DD cube ONE ML для высокоэстетичных монолитных коронок и виниров.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "14 мм",
      "Цвет": "A3",
    },
    externalUrl: "https://articon.pro/product/dental-direkt-98x14-a3/",
  },

  // DD cubeX² ML
  {
    id: "dd-cubex2-ml-98x14-b2",
    name: "Циркониевый диск cubeX² ML – Dental Direkt – 98×14, B2",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 17220,
    image: "https://articon.pro/wp-content/uploads/2023/06/dd-cubex2-ml.jpg",
    brand: "Dental Direkt",
    inStock: true,
    sku: "G 852.004",
    description: "DD cubeX² ML Super High Translucent – супертранслюцентная блок-заготовка для монолитных коронок и мостов до 3-х единиц.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "14 мм",
      "Цвет": "B2",
      "КТР": "~10.2 [10-6 K-1]",
      "Прочность на изгиб": "700 ± 100 MPa",
    },
    externalUrl: "https://articon.pro/product/dental-direkt-98x14-b2/",
  },
  {
    id: "dd-cubex2-ml-98x14-c2",
    name: "Циркониевый диск cubeX² ML – Dental Direkt – 98×14, C2",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 17220,
    image: "https://articon.pro/wp-content/uploads/2023/06/dd-cubex2-ml.jpg",
    brand: "Dental Direkt",
    inStock: true,
    sku: "G 852.005",
    description: "DD cubeX² ML Super High Translucent — супертранслюцентная блок-заготовка от Dental Direkt для монолитных коронок и мостов до 3-х единиц. Максимальная прозрачность для эстетичных реставраций передней группы зубов. Высокая прочность для надёжных результатов. Немецкое качество.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "14 мм",
      "Цвет": "C2",
    },
    externalUrl: "https://articon.pro/product/dental-direkt-98x14-c2/",
  },

  // === Циркониевые диски 4D plus ML (Honchon Smile) ===
  {
    id: "4d-plus-ml-98x12",
    name: "Диск циркониевый 4D plus ML – Honchon Smile – 98×12",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 7500,
    image: "https://articon.pro/wp-content/uploads/2024/01/4d-plus-ml.jpg",
    brand: "Honchon Smile",
    inStock: true,
    description: "4D plus ML — многослойный циркониевый блок от Honchon Smile с градиентной прозрачностью от 43% до 55%. Оптимальный баланс прочности (700–1200 МПа) и эстетики для изготовления монолитных коронок и мостов. Технология многослойности имитирует естественную структуру зуба: опаковая пришеечная зона, прозрачный режущий край. Совместим со всеми открытыми CAD/CAM системами.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "12 мм",
      "Прозрачность": "43-55%",
      "Прочность": "700-1200 MPa",
      "Цвета": "A1, A2, A3",
    },
    externalUrl: "https://articon.pro/product/4d-plus-ml-98x12/",
  },
  {
    id: "4d-plus-ml-98x14",
    name: "Диск циркониевый 4D plus ML – Honchon Smile – 98×14",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 7700,
    image: "https://articon.pro/wp-content/uploads/2024/01/4d-plus-ml.jpg",
    brand: "Honchon Smile",
    inStock: true,
    description: "4D plus ML многослойный циркониевый блок 98×14 мм от Honchon Smile. Градиентная прозрачность и высокая прочность для эстетичных монолитных реставраций. Доступен в цветах A1, A2, A3, A3.5, B1, BL1. Толщина 14 мм позволяет изготавливать полноанатомические коронки и небольшие мосты. Совместим с открытыми CAD/CAM системами.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "14 мм",
      "Цвета": "A1, A2, A3, A3.5, B1, BL1",
    },
    externalUrl: "https://articon.pro/product/4d-plus-ml-98x14/",
  },
  {
    id: "4d-plus-ml-98x16",
    name: "Диск циркониевый 4D plus ML – Honchon Smile – 98×16",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 8300,
    image: "https://articon.pro/wp-content/uploads/2024/01/4d-plus-ml.jpg",
    brand: "Honchon Smile",
    inStock: true,
    description: "4D plus ML многослойный циркониевый блок 98×16 мм от Honchon Smile. Увеличенная толщина для изготовления мостовидных протезов и реставраций с высокими клиническими требованиями. Градиентная прозрачность обеспечивает естественную эстетику. Высокая прочность для долговечных результатов.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "16 мм",
    },
    externalUrl: "https://articon.pro/product/4d-plus-ml-98x16/",
  },
  {
    id: "4d-plus-ml-98x18",
    name: "Диск циркониевый 4D plus ML – Honchon Smile – 98×18",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 8900,
    image: "https://articon.pro/wp-content/uploads/2024/01/4d-plus-ml.jpg",
    brand: "Honchon Smile",
    inStock: true,
    description: "4D plus ML многослойный циркониевый блок 98×18 мм от Honchon Smile. Оптимальная толщина для протяжённых мостовидных конструкций и сложных клинических случаев. Многослойная структура с естественным градиентом прозрачности. Совместим с открытыми CAD/CAM системами.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "18 мм",
    },
    externalUrl: "https://articon.pro/product/4d-plus-ml-98x18/",
  },
  {
    id: "4d-plus-ml-98x20",
    name: "Диск циркониевый 4D plus ML – Honchon Smile – 98×20",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 9500,
    image: "https://articon.pro/wp-content/uploads/2024/01/4d-plus-ml.jpg",
    brand: "Honchon Smile",
    inStock: true,
    description: "4D plus ML многослойный циркониевый блок 98×20 мм от Honchon Smile. Увеличенная толщина для изготовления полных мостов и реставраций большой протяжённости. Многослойная технология с градиентом прозрачности для естественного вида. Высокая прочность до 1200 МПа.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "20 мм",
    },
    externalUrl: "https://articon.pro/product/4d-plus-ml-98x20/",
  },
  {
    id: "4d-plus-ml-98x22",
    name: "Диск циркониевый 4D plus ML – Honchon Smile – 98×22",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 10100,
    image: "https://articon.pro/wp-content/uploads/2024/01/4d-plus-ml.jpg",
    brand: "Honchon Smile",
    inStock: true,
    description: "4D plus ML многослойный циркониевый блок 98×22 мм от Honchon Smile. Максимальная толщина для сложных ортопедических случаев и полноконтурных мостовидных конструкций. Многослойная структура обеспечивает естественный градиент оттенков и прозрачности.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "22 мм",
    },
    externalUrl: "https://articon.pro/product/4d-plus-ml-98x22/",
  },
  {
    id: "4d-plus-ml-98x25",
    name: "Диск циркониевый 4D plus ML – Honchon Smile – 98×25",
    category: "zircon-discs",
    subcategory: "multilayer",
    price: 10500,
    image: "https://articon.pro/wp-content/uploads/2024/01/4d-plus-ml.jpg",
    brand: "Honchon Smile",
    inStock: true,
    description: "4D plus ML многослойный циркониевый блок 98×25 мм от Honchon Smile — максимальная толщина в линейке. Предназначен для изготовления протяжённых мостовидных конструкций и сложных ортопедических случаев с высокими требованиями к прочности и эстетике.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "25 мм",
    },
    externalUrl: "https://articon.pro/product/4d-plus-ml-98x25/",
  },

  // === Диски пластиковые PMMA ===
  {
    id: "bio-splint-p-hi-98x15",
    name: "Диск пластиковый Bio splint P HI – Dental Direkt – 98×15",
    category: "cad-cam-discs",
    subcategory: "pmma",
    price: 2150,
    image: "https://articon.pro/wp-content/uploads/2023/06/bio-splint-pmma.jpg",
    brand: "Dental Direkt",
    inStock: true,
    description: "Диск PMMA Bio splint P HI от Dental Direkt — высокоударопрочный материал для CAD/CAM фрезерования. Идеален для изготовления шин, ночных капп, регуляторов прикуса и временных протезов. Прочность на изгиб 92 МПа обеспечивает долговечность изделий. Лёгкая обработка на стандартных фрезерных станках. Биосовместимый материал, сертифицирован для медицинского применения.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "15 мм",
      "Материал": "PMMA",
      "Прочность на изгиб": "92 MPa",
      "Плотность": "1,17 г/см³",
    },
    externalUrl: "https://articon.pro/product/dental-direkt-98-15/",
  },
  {
    id: "bio-splint-p-hi-98x20",
    name: "Диск пластиковый Bio splint P HI – Dental Direkt – 98×20",
    category: "cad-cam-discs",
    subcategory: "pmma",
    price: 2350,
    image: "https://articon.pro/wp-content/uploads/2023/06/bio-splint-pmma.jpg",
    brand: "Dental Direkt",
    inStock: true,
    description: "Диск PMMA Bio splint P HI 98×20 мм от Dental Direkt для изготовления шин и временных протезов. Увеличенная толщина позволяет создавать объёмные конструкции: ночные каппы, регуляторы прикуса, разгрузочные шины. Высокая ударопрочность и биосовместимость. Лёгкая обработка, совместим с открытыми CAD/CAM системами.",
    specifications: {
      "Диаметр": "98 мм",
      "Высота": "20 мм",
      "Материал": "PMMA",
    },
    externalUrl: "https://articon.pro/product/dental-direkt-98-20/",
  },

  // === Дисиликат лития UPCERA ===
  {
    id: "upcera-up-cad-ht",
    name: "Дисиликат лития UPCERA UP.CAD HT",
    category: "cad-cam-discs",
    subcategory: "blocks",
    price: 5348,
    image: "https://articon.pro/wp-content/uploads/2024/11/upcera-up-cad.jpg",
    brand: "Upcera",
    inStock: true,
    description: "UP.CAD HT — стоматологический материал на основе дисиликата лития от UPCERA для CAD/CAM обработки. Прочность до 400 МПа после кристаллизации. Высокая прозрачность (HT — High Translucency) для эстетичных реставраций передней группы зубов. Идеален для виниров, вкладок, накладок и коронок. Кристаллизация при 840-850°C обеспечивает естественный блеск и флюоресценцию.",
    specifications: {
      "Прочность": "400 MPa",
      "Плотность": "2.3-2.7 г/см³",
      "Твёрдость по Виккерсу": "5400±400 MPa",
      "Температура кристаллизации": "840-850 °C",
    },
    externalUrl: "https://articon.pro/product/up-cad-ht/",
  },
  {
    id: "upcera-up-cad-lt",
    name: "Дисиликат лития UP.CAD LT",
    category: "cad-cam-discs",
    subcategory: "blocks",
    price: 5348,
    image: "https://articon.pro/wp-content/uploads/2024/11/upcera-up-cad-lt.jpg",
    brand: "Upcera",
    inStock: true,
    description: "UP.CAD LT — блоки дисиликата лития низкой прозрачности (Low Translucency) от UPCERA для CAD/CAM фрезерования. Оптимальны для объёмных реставраций жевательных зубов, где требуется маскировка культи. Прочность до 400 МПа после кристаллизации. Естественный вид и долговечность реставраций.",
    externalUrl: "https://articon.pro/product/up-cad-lt/",
  },
  {
    id: "upcera-up-press-ht",
    name: "Дисиликат лития UP.Press HT",
    category: "cad-cam-discs",
    subcategory: "blocks",
    price: 7993,
    image: "https://articon.pro/wp-content/uploads/2024/11/upcera-up-press.jpg",
    brand: "Upcera",
    inStock: true,
    description: "UP.Press HT — пресс-керамика на основе дисиликата лития высокой прозрачности от UPCERA. Идеальна для изготовления виниров, вкладок, накладок и коронок передней группы зубов методом прессования. Естественная флюоресценция и опалесценция. Прочность и эстетика для долговечных реставраций.",
    externalUrl: "https://articon.pro/product/up-press-ht/",
  },
  {
    id: "upcera-up-press-lt",
    name: "Дисиликат лития UP.Press LT",
    category: "cad-cam-discs",
    subcategory: "blocks",
    price: 7993,
    image: "https://articon.pro/wp-content/uploads/2024/11/upcera-up-press-lt.jpg",
    brand: "Upcera",
    inStock: true,
    description: "UP.Press LT — пресс-керамика на основе дисиликата лития низкой прозрачности от UPCERA. Оптимальна для реставраций жевательных зубов и случаев с изменённым цветом культи. Технология прессования обеспечивает точное краевое прилегание. Высокая прочность для долговечных результатов.",
    externalUrl: "https://articon.pro/product/up-press-lt/",
  },

  // === Зуботехнические печи Dekema ===
  {
    id: "dekema-austromat-624",
    name: "Зуботехническая печь для обжига Dekema AUSTROMAT 624",
    category: "furnaces",
    subcategory: "firing",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2023/06/dekema-624.jpg",
    brand: "Dekema",
    inStock: true,
    description: "Зуботехническая печь DEKEMA AUSTROMAT 624 для обжига стоматологической керамики. Оснащена 7,5-дюймовым цветным сенсорным экраном и 200 программами обжига. Максимальная температура 1200°C для работы со всеми видами керамических масс. Компактные размеры для установки в любой лаборатории. Немецкое качество, надёжность и точность температурного контроля.",
    specifications: {
      "Размеры": "653×383×343 мм",
      "Вес": "17,5 кг",
      "Питание": "230 В / 50-60 Гц",
      "Мощность": "1,5 кВт",
      "Макс. температура": "1200 °C",
      "Экран": '7,5" цветной сенсорный',
    },
    externalUrl: "https://articon.pro/product/dekema-austromat-624/",
  },
  {
    id: "dekema-austromat-654",
    name: "Зуботехническая печь для обжига и прессования Dekema AUSTROMAT 654",
    category: "furnaces",
    subcategory: "firing",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2023/06/dekema-654.jpg",
    brand: "Dekema",
    inStock: true,
    description: "Комбинированная зуботехническая печь DEKEMA AUSTROMAT 654 press-i-dent для обжига и прессования керамики. Поддерживает работу с многоплунжерными кольцевыми системами. Максимальная температура 1200°C. Идеальна для лабораторий, работающих с прессованной керамикой и классическим послойным нанесением. Немецкое качество и надёжность.",
    specifications: {
      "Размеры": "653×383×343 мм",
      "Вес": "22 кг",
      "Питание": "230 В / 50-60 Гц",
      "Мощность": "1,5 кВт",
      "Макс. температура": "1200 °C",
    },
    externalUrl: "https://articon.pro/product/dekema-austromat-654/",
  },
  {
    id: "dekema-austromat-674",
    name: "Зуботехническая печь для синтеризации ZrO2 Dekema AUSTROMAT 674",
    category: "furnaces",
    subcategory: "sintering",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2023/06/dekema-674.jpg",
    brand: "Dekema",
    inStock: true,
    description: "Зуботехническая печь DEKEMA AUSTROMAT 674 для высокотемпературной синтеризации диоксида циркония. Три нагревательных элемента из карбида кремния (SiC) обеспечивают равномерный нагрев до 1530°C. Оптимальна для спекания многослойных и монолитных циркониевых реставраций. Точный контроль температуры, программируемые циклы обжига. Производство Германия.",
    specifications: {
      "Размеры": "780×383×343 мм",
      "Вес": "24 кг",
      "Питание": "230 В / 50-60 Гц",
      "Мощность": "2 кВт",
      "Макс. температура": "1530 °C",
    },
    externalUrl: "https://articon.pro/product/dekema-austromat-674/",
  },

  // === Фрезерные станки ===
  {
    id: "coritec-150i",
    name: "Фрезерный станок CORiTEC 150i",
    category: "milling",
    subcategory: "machines",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2023/06/coritec-150i.jpg",
    brand: "imes-icore",
    inStock: true,
    description: "CORiTEC 150i — компактный 5-осевой фрезерный станок от imes-icore для точной обработки круглых заготовок и блоков. Идеален для небольших зуботехнических лабораторий. Скорость шпинделя до 100 000 об/мин обеспечивает высокую производительность. 10 позиций инструмента для автоматической смены фрез. Обрабатывает цирконий, PMMA, воск и композитные материалы. Немецкое качество и надёжность.",
    specifications: {
      "Размеры": "422×556×644 мм",
      "Количество осей": "5",
      "Позиций инструмента": "10",
      "Скорость шпинделя": "100 000 об/мин",
      "Мощность шпинделя": "0,75 кВт",
    },
    externalUrl: "https://articon.pro/product/coritec-150i/",
  },
  {
    id: "coritec-350i",
    name: "Фрезерный станок CORiTEC 350i",
    category: "milling",
    subcategory: "machines",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2023/06/coritec-350i.jpg",
    brand: "imes-icore",
    inStock: true,
    description: "CORiTEC 350i — профессиональный 5-осевой фрезерный станок от imes-icore для обработки всех стоматологических материалов: CoCr, титана, диоксида циркония, PMMA и CAD/CAM блоков. 20 позиций инструмента, автоматическая смена заготовок с загрузчиком. Скорость шпинделя 60 000 об/мин, мощность 1 кВт. Идеальное решение для высокопроизводительных лабораторий. Производство Германия.",
    specifications: {
      "Размеры": "758×790×857 мм (базовая) / 1058×790×857 мм (Loader)",
      "Количество осей": "5",
      "Позиций инструмента": "20",
      "Скорость шпинделя": "60 000 об/мин",
      "Мощность шпинделя": "1 кВт",
    },
    externalUrl: "https://articon.pro/product/coritec-350i/",
  },

  // === Дополнительные фрезы imes-icore ===
  {
    id: "freza-t5-t10-shaft-6mm",
    name: "Фреза T5/T10 для станков Imes-Icore – shaft milling tool short, d1=1.5, d2=6.0",
    category: "milling",
    subcategory: "cutters",
    price: 6774,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-shaft.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526002 1506",
    description: "Фреза shaft milling tool short T5/T10 – плоская, короткая твердосплавная фреза цанга 6 мм для работы с CoCr и Ti.",
    specifications: {
      "Диаметр": "1,5 мм",
      "Хвостовик": "6 мм",
      "Материал обработки": "CoCr, Ti",
    },
    externalUrl: "https://articon.pro/product/coritec-cocr-ti-1-5-6-0/",
  },
  {
    id: "freza-t12-radius-3mm",
    name: "Фреза T12 для станков Imes-Icore – radius milling tool, d1=1.0, d2=3.0",
    category: "milling",
    subcategory: "cutters",
    price: 7592,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-t12.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "530004 1003",
    description: "Фреза T12 – сферическая, твердосплавная фреза цанга 3 мм для работы с PMMA, WAX и PEEK заготовками.",
    specifications: {
      "Диаметр": "1,0 мм",
      "Хвостовик": "3 мм",
      "Материал обработки": "PMMA, WAX, PEEK",
    },
    externalUrl: "https://articon.pro/product/coritec-1-0-6-0mm-diamantiert-zr-al/",
  },
  {
    id: "freza-t13-t40-t50-radius-6mm",
    name: "Фреза T13/T40/T50 для станков Imes-Icore – radius milling tool (diamond coated), d1=2.5, d2=6.0",
    category: "milling",
    subcategory: "cutters",
    price: 7592,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-t13.jpg",
    brand: "imes-icore",
    inStock: true,
    description: "Фреза T13/T40/T50 – сферическая фреза с алмазным напылением цанга 6 мм для Zr, SINT, COMP.",
    specifications: {
      "Диаметр": "2,5 мм",
      "Хвостовик": "6 мм",
      "Покрытие": "Алмазное",
    },
    externalUrl: "https://articon.pro/product/coritec-2-5-6-0mm-diamantiert-zr-a/",
  },
  {
    id: "freza-20mm-ti-cocr",
    name: "2,0 мм шаровая концевая фреза (короткая), Ti, CoCr (T2, T7)",
    category: "milling",
    subcategory: "cutters",
    price: 5290,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-20mm-ti.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526029 2006",
    description: "T2 (Ti), T7 (CoCr) – шаровая фреза 2,0 мм (короткая), 2-зубая.",
    specifications: {
      "Диаметр": "2,0 мм",
      "Хвостовик": "6 мм",
      "Высота материала": "до 15 мм",
    },
    externalUrl: "https://articon.pro/product/2-0-mm-ball-end-mill-short-ti-cocr-t2-t7/",
  },
  {
    id: "freza-25mm-diamond-6mm",
    name: "2,5 мм шаровая концевая фреза (с алмазным покрытием), Zr, Sint, Comp (T13, T40, T50)",
    category: "milling",
    subcategory: "cutters",
    price: 10120,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-25mm-diamond.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526013 2506",
    description: "T13 (Zr), T40 (Sint), T50 (Comp) – шаровая фреза 2,5 мм (с алмазным покрытием), 2 зуба.",
    specifications: {
      "Диаметр": "2,5 мм",
      "Хвостовик": "6 мм",
      "Покрытие": "Алмазное",
    },
    externalUrl: "https://articon.pro/product/2-5-mm-ball-end-mill-diamond-coated-zr-sint-comp-t13-t40-t50/",
  },
  {
    id: "freza-30mm-ti-cocr",
    name: "3,0 мм шаровая концевая фреза (короткая), Ti, CoCr (T1, T6)",
    category: "milling",
    subcategory: "cutters",
    price: 5290,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-30mm-ti.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526029 3006",
    description: "T1 (Ti), T6 (CoCr) – шаровая фреза 3,0 мм (короткая), 2-зубая.",
    specifications: {
      "Диаметр": "3,0 мм",
      "Хвостовик": "6 мм",
      "Высота материала": "до 15 мм",
    },
    externalUrl: "https://articon.pro/product/3-0-mm-ball-end-mill-short-ti-cocr-t1-t6/",
  },
  {
    id: "grinding-tool-10mm-t22",
    name: "Шлифовальный инструмент 1,0 мм (алмазный), стеклокерамика (T22)",
    category: "milling",
    subcategory: "cutters",
    price: 4767,
    image: "https://articon.pro/wp-content/uploads/2023/06/grinding-tool-10.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526005 1006",
    description: "Шаровой шлифовальный инструмент 1,0 мм (алмаз) для стеклокерамики, дисиликата лития, полевошпатовой керамики.",
    specifications: {
      "Диаметр": "1,0 мм",
      "Хвостовик": "6 мм",
      "Тип": "Алмазный шлифовальный штифт",
    },
    externalUrl: "https://articon.pro/product/1-0-mm-grinding-tool-diamond-glass-ceramics-t22/",
  },
  {
    id: "grinding-tool-25mm-t21-6mm",
    name: "Шлифовальный инструмент 2,5 мм (алмазный), стеклокерамика (T21)",
    category: "milling",
    subcategory: "cutters",
    price: 5656,
    image: "https://articon.pro/wp-content/uploads/2023/06/grinding-tool-25.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526005 2506",
    description: "T21 (GC) – шлифовальный инструмент 2,5 мм (алмаз) для стеклокерамики.",
    specifications: {
      "Диаметр": "2,5 мм",
      "Хвостовик": "6 мм",
    },
    externalUrl: "https://articon.pro/product/2-5-mm-grinding-tool-diamond-glass-ceramics-t21/",
  },
  {
    id: "grinding-tool-25mm-t21-3mm",
    name: "2,5 мм шлифовальный инструмент (алмазный), стеклокерамика (T21) - хвостовик 3мм",
    category: "milling",
    subcategory: "cutters",
    price: 4042,
    image: "https://articon.pro/wp-content/uploads/2023/06/grinding-tool-25-3mm.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526005 2503",
    description: "T21 (GC) – шлифовальный инструмент 2,5 мм (алмазный) с хвостовиком 3 мм.",
    specifications: {
      "Диаметр": "2,5 мм",
      "Хвостовик": "3 мм",
    },
    externalUrl: "https://articon.pro/product/2-5-mm-grinding-tool-diamond-glass-ceramics-t21-2/",
  },
  {
    id: "freza-25mm-slide-6mm",
    name: "2,5 мм шаровая концевая фреза (скользящее покрытие), ПММА, воск, ПЭЭК (T11)",
    category: "milling",
    subcategory: "cutters",
    price: 5405,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-25mm-slide.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526004 2506",
    description: "T11 (PMMA, воск, PEEK) – шаровая фреза 2,5 мм (однолезвийная, с антискользящим покрытием).",
    specifications: {
      "Диаметр": "2,5 мм",
      "Хвостовик": "6 мм",
      "Покрытие": "Антискользящее",
    },
    externalUrl: "https://articon.pro/product/2-5-mm-ball-end-mill-slide-coated-pmma-wax-peek-t11-2/",
  },
  {
    id: "freza-25mm-slide-3mm",
    name: "2,5 мм шаровая концевая фреза (скользящее покрытие), ПММА, воск, ПЭЭК (T11) - хвостовик 3мм",
    category: "milling",
    subcategory: "cutters",
    price: 4767,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-25mm-slide-3mm.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526004 2503",
    description: "T11 (PMMA, воск, PEEK) – шаровая фреза 2,5 мм (однолезвийная, с антискользящим покрытием), хвостовик 3 мм.",
    specifications: {
      "Диаметр": "2,5 мм",
      "Хвостовик": "3 мм",
    },
    externalUrl: "https://articon.pro/product/2-5-mm-ball-end-mill-slide-coated-pmma-wax-peek-t11/",
  },
  {
    id: "freza-25mm-diamond-3mm",
    name: "2,5 мм шаровая концевая фреза (алмазная), цирконий, ПММА, воск (T11, T13)",
    category: "milling",
    subcategory: "cutters",
    price: 6348,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-25mm-diamond-3mm.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526016 2503",
    description: "T11 (ПММА, воск), T13 (Zr) – шаровая фреза 2,5 мм (алмазная), 2-зубая.",
    specifications: {
      "Диаметр": "2,5 мм",
      "Хвостовик": "3 мм",
      "Материал": "PMMA, воск, ZrO2",
    },
    externalUrl: "https://articon.pro/product/2-5-mm-ball-end-mill-diamond-zr-pmma-wax-t11-t13/",
  },
  {
    id: "freza-15mm-shaft-3mm",
    name: "1,5 мм плоская концевая фреза, универсальная (T5, T10, T17)",
    category: "milling",
    subcategory: "cutters",
    price: 5011,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-15mm-shaft.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526001 1503",
    description: "T5/T10/T17 – 1,5 мм инструмент для фрезерования (универсальный), двухлезвийная фреза.",
    specifications: {
      "Диаметр": "1,5 мм",
      "Хвостовик": "3 мм",
      "Материал": "Универсальный",
    },
    externalUrl: "https://articon.pro/product/0-3-mm-ball-end-mill-zr-pmma-wax-sinter-metal-composite-t33-t43-t53/",
  },
  {
    id: "freza-t62-torus-6mm",
    name: "Фреза T62 для станков Imes-Icore – torus milling tool (r = 0.2 мм), d1=2.0, d2=6.0",
    category: "milling",
    subcategory: "cutters",
    price: 8015,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-t62.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526025 2006",
    description: "Фреза T62 – плоская, твердосплавная фреза со скругленными краями (скругление 0.2 мм) для CoCr и Ti.",
    specifications: {
      "Диаметр": "2,0 мм",
      "Хвостовик": "6 мм",
      "Радиус скругления": "0,2 мм",
      "Количество лезвий": "4",
    },
    externalUrl: "https://articon.pro/product/t62-imes-icore-torus-milling-tool/",
  },
  {
    id: "freza-t67-shaft-short",
    name: "Фреза T67 для станков Imes-Icore – shaft milling tool short, d1=2.0, d2=6.0",
    category: "milling",
    subcategory: "cutters",
    price: 7993,
    image: "https://articon.pro/wp-content/uploads/2023/06/freza-t67.jpg",
    brand: "imes-icore",
    inStock: true,
    sku: "526002 2006",
    description: "Фреза T67 – плоская, короткая, твердосплавная фреза для CoCr и Ti.",
    specifications: {
      "Диаметр": "2,0 мм",
      "Хвостовик": "6 мм",
      "Длина": "7 мм",
    },
    externalUrl: "https://articon.pro/product/t67-imes-icore-shaft-milling-tool-short/",
  },

  // === Upcera Explore Functional (большой ассортимент) ===
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
    description: "Upcera Explore Functional — многослойный циркониевый диск с градиентной прозрачностью от пришеечной зоны к режущему краю. Прозрачность 47%, прочность на изгиб более 1000 МПа. Идеален для изготовления виниров, вкладок, накладок, одиночных коронок и мостовидных протезов. Температура спекания 1480°C. Совместим со всеми открытыми CAD/CAM системами диаметра 98 мм.",
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
    description: "Upcera Explore Functional 98×12, цвет A2 — многослойный циркониевый диск с градиентной прозрачностью. Универсальный оттенок A2 подходит для большинства клинических случаев. Прочность более 1000 МПа для надёжных реставраций. Температура спекания 1480°C.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "12 мм",
      "Цвет": "A2",
    },
    externalUrl: "https://articon.pro/product/upcera-98-12-a2/",
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
    description: "Upcera Explore Functional 98×14, цвет A1 — многослойный циркониевый диск для изготовления эстетичных коронок и мостов. Толщина 14 мм для полноанатомических реставраций. Светлый оттенок A1 для передней группы зубов. Прочность более 1000 МПа.",
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
    description: "Upcera Explore Functional 98×14, цвет A2 — универсальный многослойный циркониевый диск для ежедневной работы. Оптимальный баланс прозрачности и прочности. Толщина 14 мм для коронок и небольших мостов.",
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
    description: "Upcera Explore Functional 98×14, цвет A3 — многослойный циркониевый диск для реставраций в тёплом оттенке. Градиентная прозрачность для естественного вида. Толщина 14 мм для полноанатомических конструкций.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "14 мм",
      "Цвет": "A3",
    },
    externalUrl: "https://articon.pro/product/upcera-98-14-a3/",
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
    description: "Upcera Explore Functional 98×16, цвет A1 — многослойный циркониевый диск увеличенной толщины. Подходит для мостовидных протезов и реставраций с высокими клиническими требованиями. Светлый оттенок A1 для эстетичных работ.",
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
    description: "Upcera Explore Functional 98×16, цвет A2 — универсальный многослойный циркониевый диск для мостовидных конструкций. Толщина 16 мм для протяжённых реставраций. Градиентная прозрачность для естественного вида.",
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
    description: "Upcera Explore Functional 98×18, цвет A1 — многослойный циркониевый диск для объёмных реставраций. Толщина 18 мм для протяжённых мостов и сложных случаев. Светлый оттенок A1, градиентная прозрачность.",
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
    description: "Upcera Explore Functional 98×18, цвет A2 — универсальный многослойный циркониевый диск для протяжённых конструкций. Толщина 18 мм обеспечивает запас материала для сложных случаев.",
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
    description: "Upcera Explore Functional 98×20, цвет A1 — многослойный циркониевый диск максимальной толщины для протяжённых мостовидных конструкций. Высокая прочность более 1000 МПа. Светлый оттенок A1.",
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
    description: "Upcera Explore Functional 98×20, цвет A2 — универсальный многослойный циркониевый диск для сложных ортопедических случаев. Толщина 20 мм для максимальной свободы проектирования.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "20 мм",
      "Цвет": "A2",
    },
    externalUrl: "https://articon.pro/product/upcera-98-20-a2/",
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
    description: "Upcera Explore Functional 98×22, цвет A1 — многослойный циркониевый диск максимальной толщины в линейке. Предназначен для полных мостов и сложных реконструкций. Градиентная прозрачность и высокая прочность.",
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
    description: "Upcera Explore Functional 98×22, цвет A2 — максимальная толщина для протяжённых мостовидных конструкций. Многослойная структура с градиентом прозрачности. Универсальный оттенок A2 для большинства клинических случаев.",
    specifications: {
      "Диаметр": "98 мм",
      "Толщина": "22 мм",
      "Цвет": "A2",
    },
    externalUrl: "https://articon.pro/product/upcera-98-22-a2/",
  },
];
