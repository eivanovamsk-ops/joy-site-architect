export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number | null;
  oldPrice?: number | null;
  image: string;
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
      { id: "accessories", name: "Аксессуары для сканеров", href: "/shop/catalog/scanner-accessories" },
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
    image: "https://articon.pro/wp-content/uploads/2024/11/uniformation-gk3-ultra.jpg",
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
    image: "https://articon.pro/wp-content/uploads/2024/11/uniformation-gk3.jpg",
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
    description: "Этот лоток совместим со всеми 3D-принтерами Asiga серии Pro",
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
    description: "Встраиваемый лоток для печати объёмом 10 литров. Подходит к модели принтера Asiga MAX",
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
    description: "Встраиваемый лоток для печати объёмом 1 литр. Подходит к модели принтера Asiga MAX",
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
    description: "Встраиваемый лоток для печати объёмом 2 литра. Подходит к модели принтера Asiga MAX",
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
    description: "Встраиваемый лоток для печати объёмом 5 литров. Подходит к модели принтера Asiga MAX",
    externalUrl: "https://articon.pro/product/build-tray-asiga-5l-max/",
  },

  // 3Д-сканеры - Аксессуары
  {
    id: "antiglare-spray-helling",
    name: "Антибликовый спрей 3D – Helling – 400 мл",
    category: "3d-scanners",
    subcategory: "accessories",
    price: 2850,
    image: "https://articon.pro/wp-content/uploads/2023/06/helling-spray.jpg",
    brand: "Helling",
    inStock: true,
    sku: "3D - Helling - 400 мл",
    description: "Антибликовый спрей для лазерного сканирования 3-D Laserscanning Antiglare Spray от HELLING – средство для образования тонкого белого равномерного мелкодисперсного слоя для подавления бликов на сканируемой поверхности, используется для оптимизации лазерного сканирования.",
    externalUrl: "https://articon.pro/product/antiblikovyy-sprey-3-d-400-ml-helling/",
  },
  {
    id: "medit-screw-jig",
    name: "Шаблон Screw jig для сканера Medit T310/T510",
    category: "3d-scanners",
    subcategory: "accessories",
    price: 35000,
    image: "https://articon.pro/wp-content/uploads/2024/02/medit-screw-jig.jpg",
    brand: "Medit",
    inStock: true,
    description: "Screw jig – винтовой зажим, для винтовой фиксации модели.",
    externalUrl: "https://articon.pro/product/medit-screw-jig-t310-t510/",
  },
  {
    id: "mobile-stand-scanner",
    name: "Стойка мобильная для работы с интраоральным сканером с встроенным компьютером",
    category: "3d-scanners",
    subcategory: "accessories",
    price: 390000,
    image: "https://articon.pro/wp-content/uploads/2024/02/mobile-stand.jpg",
    brand: "Articon",
    inStock: true,
    description: `Мобильная стойка для работы с интраоральным сканером со встроенным компьютером.

Конфигурация компьютера:
• Операционная система: Windows 11
• Размер сенсорного экрана: 23,6 дюйма
• Процессор: Intel Core i7-12700 12-го поколения
• Видеокарта: RTX 3060
• Оперативная память: 32 ГБ DDR4
• Память: SSD емкостью 1 ТБ
• Разрешение: 1920×1080
• Аудио: Встроенные 2.0-канальные динамики`,
    specifications: {
      "ОС": "Windows 11",
      "Экран": "23,6\" сенсорный",
      "Процессор": "Intel Core i7-12700",
      "Видеокарта": "RTX 3060",
      "RAM": "32 ГБ DDR4",
      "SSD": "1 ТБ",
      "Разрешение": "1920×1080",
    },
    externalUrl: "https://articon.pro/product/stoyka-mobilnaya-dlya-raboty-s-intraoralnym-skanerom-s-vstroennym-kompyuterom/",
  },

  // 3Д-сканеры - Врачебные (интраоральные)
  {
    id: "runyes-3ds-v3",
    name: "Интраоральный сканер Runyes 3DS V3",
    category: "3d-scanners",
    subcategory: "clinical",
    price: 390000,
    image: "https://articon.pro/wp-content/uploads/2024/01/runyes-3ds-v3.png",
    brand: "Runyes",
    inStock: true,
    description: `Компактный интраоральный сканер от Runyes.

Портативное устройство:
• Размеры (Д x Ш x В): 240×49,5×30 мм
• Вес: 210 г
• Стандартный размер наконечника: 79×19,7×15,8 мм
• Мини размер наконечника: 80×16×11 мм
• Область сканирования (стандарт): 15×15 мм
• Область сканирования (мини): 12×12 мм
• Глубина резкости: 15 мм
• Автоклавируемый до 100 раз (121°C 16 мин или 134°C 4 мин)`,
    specifications: {
      "Размеры": "240×49,5×30 мм",
      "Вес": "210 г",
      "Область сканирования": "15×15 мм",
      "Глубина резкости": "15 мм",
      "Автоклавирование": "До 100 раз",
    },
    externalUrl: "https://articon.pro/product/runyes-3ds-v3/",
  },
  {
    id: "runyes-3ds-v5",
    name: "Интраоральный сканер Runyes 3DS V5",
    category: "3d-scanners",
    subcategory: "clinical",
    price: 450000,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-58-300x300.jpg",
    brand: "Runyes",
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
• Точность (коронка): 10 мкм
• Точность (полная дуга): 20 мкм
• Время сканирования одной дуги: 25 сек
• Время сканирования полной дуги с окклюзией: 60 сек
• Калибровка: не требуется
• Форматы экспорта: STL, OBJ, PLY`,
    specifications: {
      "Габариты": "243×40×32 мм",
      "Вес": "160 г",
      "Глубина резкости": "25 мм",
      "Точность": "10 мкм (коронка)",
      "Сканирование дуги": "25 сек",
      "Форматы": "STL, OBJ, PLY",
    },
    externalUrl: "https://articon.pro/product/runyes-3ds-v5/",
  },
  {
    id: "runyes-3ds-v6",
    name: "Интраоральный сканер Runyes 3DS V6",
    category: "3d-scanners",
    subcategory: "clinical",
    price: 600000,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-62-300x300.jpg",
    brand: "Runyes",
    inStock: true,
    isNew: true,
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
• Точность (коронка): 10 мкм
• Полная дуга: 20 мкм
• Время сканирования одной дуги: 25 сек
• Полная дуга с окклюзией: 60 сек
• Калибровка: не требуется
• Форматы вывода: STL, OBJ, PLY`,
    specifications: {
      "Размеры": "260×40×32 мм",
      "Вес": "230 г",
      "Глубина резкости": "25 мм",
      "Точность": "10 мкм",
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
];
