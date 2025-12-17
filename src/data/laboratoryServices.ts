export interface LaboratoryService {
  id: string;
  name: string;
  price: number;
  pricePrefix?: string;
  description?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  services: LaboratoryService[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "esthetics",
    name: "Эстетика (безметалловая керамика)",
    slug: "esthetics",
    services: [
      { id: "e1", name: "Винир из керамики E.max", price: 8500, pricePrefix: "от" },
      { id: "e2", name: "Коронка цельноциркониевая (ZrO2) по технологии CAD/CAM", price: 5500, pricePrefix: "от" },
      { id: "e3", name: "Коронка из керамики E.max", price: 9000, pricePrefix: "от" },
      { id: "e4", name: "Коронка циркониевая с керамической облицовкой", price: 10500, pricePrefix: "от" },
      { id: "e5", name: "Полукоронка / накладка E.max", price: 8500, pricePrefix: "от" },
      { id: "e6", name: "Вкладка E.max", price: 7500, pricePrefix: "от" },
      { id: "e7", name: "Циркониевый абатмент индивидуальный", price: 6000, pricePrefix: "от" },
      { id: "e8", name: "Коронка на имплантат цельноциркониевая", price: 7500, pricePrefix: "от" },
    ],
  },
  {
    id: "metal-ceramic",
    name: "Металлокерамика и цельнолитые",
    slug: "metal-ceramic",
    services: [
      { id: "m1", name: "Коронка металлокерамическая", price: 5500, pricePrefix: "от" },
      { id: "m2", name: "Коронка металлокерамическая на имплантат", price: 7000, pricePrefix: "от" },
      { id: "m3", name: "Коронка цельнолитая", price: 3500, pricePrefix: "от" },
      { id: "m4", name: "Культевая вкладка (КХС)", price: 2500, pricePrefix: "от" },
      { id: "m5", name: "Культевая вкладка разборная", price: 3500, pricePrefix: "от" },
      { id: "m6", name: "Мостовидный протез (за ед.)", price: 5500, pricePrefix: "от" },
    ],
  },
  {
    id: "orthodontics",
    name: "Ортодонтия",
    slug: "orthodontics",
    services: [
      { id: "o1", name: "Элайнер (1 каппа)", price: 2500, pricePrefix: "от" },
      { id: "o2", name: "Сет-ап модели", price: 8000, pricePrefix: "от" },
      { id: "o3", name: "Ретейнер съемный", price: 3500, pricePrefix: "от" },
      { id: "o4", name: "Позиционер", price: 12000, pricePrefix: "от" },
      { id: "o5", name: "Пластинка ортодонтическая", price: 6000, pricePrefix: "от" },
      { id: "o6", name: "Аппарат Гербста", price: 18000, pricePrefix: "от" },
      { id: "o7", name: "Трейнер", price: 5000, pricePrefix: "от" },
    ],
  },
  {
    id: "surgery",
    name: "Хирургия и цифровое планирование",
    slug: "surgery",
    services: [
      { id: "s1", name: "Хирургический шаблон (1-3 имплантата)", price: 8000, pricePrefix: "от" },
      { id: "s2", name: "Хирургический шаблон (4-6 имплантатов)", price: 12000, pricePrefix: "от" },
      { id: "s3", name: "Хирургический шаблон (от 7 имплантатов)", price: 15000, pricePrefix: "от" },
      { id: "s4", name: "Цифровое планирование имплантации", price: 5000, pricePrefix: "от" },
      { id: "s5", name: "Навигационный шаблон All-on-4", price: 18000, pricePrefix: "от" },
      { id: "s6", name: "3D-печать модели челюсти", price: 3000, pricePrefix: "от" },
    ],
  },
  {
    id: "splints",
    name: "Сплинты и депрограмматоры",
    slug: "splints",
    services: [
      { id: "sp1", name: "Окклюзионная шина (сплинт)", price: 8000, pricePrefix: "от" },
      { id: "sp2", name: "Мичиганская шина", price: 12000, pricePrefix: "от" },
      { id: "sp3", name: "Депрограмматор Койса", price: 6000, pricePrefix: "от" },
      { id: "sp4", name: "NTI-депрограмматор", price: 5000, pricePrefix: "от" },
      { id: "sp5", name: "Спортивная каппа", price: 4000, pricePrefix: "от" },
      { id: "sp6", name: "Каппа для отбеливания", price: 3000, pricePrefix: "от" },
    ],
  },
  {
    id: "removable",
    name: "Съемное протезирование",
    slug: "removable",
    services: [
      { id: "r1", name: "Полный съемный протез", price: 18000, pricePrefix: "от" },
      { id: "r2", name: "Частичный съемный протез", price: 15000, pricePrefix: "от" },
      { id: "r3", name: "Съемный протез на аттачменах", price: 25000, pricePrefix: "от" },
      { id: "r4", name: "Иммедиат-протез", price: 12000, pricePrefix: "от" },
      { id: "r5", name: "Перебазировка протеза", price: 5000, pricePrefix: "от" },
      { id: "r6", name: "Ремонт съемного протеза", price: 3000, pricePrefix: "от" },
    ],
  },
  {
    id: "clasp",
    name: "Бюгельное протезирование",
    slug: "clasp",
    services: [
      { id: "c1", name: "Бюгельный протез простой", price: 25000, pricePrefix: "от" },
      { id: "c2", name: "Бюгельный протез с замковыми креплениями", price: 35000, pricePrefix: "от" },
      { id: "c3", name: "Бюгельный протез на телескопических коронках", price: 45000, pricePrefix: "от" },
      { id: "c4", name: "Бюгельный протез шинирующий", price: 30000, pricePrefix: "от" },
      { id: "c5", name: "Каркас бюгельный (КХС)", price: 15000, pricePrefix: "от" },
    ],
  },
  {
    id: "bar",
    name: "Балочные конструкции",
    slug: "bar",
    services: [
      { id: "b1", name: "Балочная конструкция на 2 имплантата", price: 35000, pricePrefix: "от" },
      { id: "b2", name: "Балочная конструкция на 4 имплантата", price: 55000, pricePrefix: "от" },
      { id: "b3", name: "Балочная конструкция на 6 имплантатов", price: 75000, pricePrefix: "от" },
      { id: "b4", name: "Съемный протез на балке", price: 40000, pricePrefix: "от" },
      { id: "b5", name: "Титановая балка фрезерованная", price: 45000, pricePrefix: "от" },
    ],
  },
  {
    id: "inlays",
    name: "Вкладки и временные коронки",
    slug: "inlays",
    services: [
      { id: "i1", name: "Вкладка керамическая inlay", price: 6000, pricePrefix: "от" },
      { id: "i2", name: "Вкладка керамическая onlay", price: 7000, pricePrefix: "от" },
      { id: "i3", name: "Вкладка керамическая overlay", price: 7500, pricePrefix: "от" },
      { id: "i4", name: "Временная коронка (ПММА)", price: 2000, pricePrefix: "от" },
      { id: "i5", name: "Временная коронка фрезерованная", price: 3500, pricePrefix: "от" },
      { id: "i6", name: "Временный мост (за ед.)", price: 2500, pricePrefix: "от" },
    ],
  },
];

export const priceListDownloads = [
  {
    id: "orthopedic-standard",
    name: "Ортопедический стандарт",
    url: "https://www.articondental.ru/_files/ugd/526e65_712057c4739349c2936e7224195b7e77.pdf",
  },
  {
    id: "orthodontic",
    name: "Ортодонтический",
    url: "https://www.articondental.ru/_files/ugd/526e65_32dd5ace765f4538b47fe49537c69f0b.pdf",
  },
  {
    id: "orthopedic-master",
    name: "Ортопедический мастер",
    url: "https://www.articondental.ru/_files/ugd/526e65_28d6676ad3f94f9aa4410a704bf321df.pdf",
  },
  {
    id: "milling-stl",
    name: "Фрезерный центр (с STL)",
    url: "https://www.articondental.ru/_files/ugd/99c926_24fc31edc50d47a08580af9d1e7019c8.pdf",
  },
  {
    id: "surgical-templates",
    name: "Хирургические шаблоны",
    url: "https://www.articondental.ru/_files/ugd/526e65_6418d39f455a4471ae13f635fa34ebee.pdf",
  },
];
