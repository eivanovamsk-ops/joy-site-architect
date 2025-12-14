export interface Course {
  id: number;
  title: string;
  date: string;
  dateStart: Date;
  location: string;
  format: string;
  price: number;
  lecturer: string;
  category: string;
  description?: string;
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Цифровое планирование в ортодонтии",
    date: "20-21 января 2025",
    dateStart: new Date(2025, 0, 20),
    location: "Москва",
    format: "Практика",
    price: 45000,
    lecturer: "Д-р Иванов А.С.",
    category: "Ортодонтия",
    description: "Комплексный курс по цифровому планированию ортодонтического лечения",
  },
  {
    id: 2,
    title: "Exocad: от новичка до профессионала",
    date: "5-7 февраля 2025",
    dateStart: new Date(2025, 1, 5),
    location: "Москва",
    format: "Практика",
    price: 65000,
    lecturer: "Петров В.А.",
    category: "CAD/CAM",
    description: "Полный курс работы в программе Exocad для зубных техников",
  },
  {
    id: 3,
    title: "3D-моделирование в зуботехнике",
    date: "15 февраля 2025",
    dateStart: new Date(2025, 1, 15),
    location: "Онлайн",
    format: "Вебинар",
    price: 5000,
    lecturer: "Сидорова М.К.",
    category: "3D-моделирование",
    description: "Основы 3D-моделирования для начинающих техников",
  },
  {
    id: 4,
    title: "Одномоментная имплантация и немедленная нагрузка",
    date: "12 марта 2025",
    dateStart: new Date(2025, 2, 12),
    location: "Москва",
    format: "Практика",
    price: 35000,
    lecturer: "Козлов Д.Н.",
    category: "Хирургия",
    description: "Практический курс по имплантологии",
  },
  {
    id: 5,
    title: "Дентальный фотопротокол",
    date: "20 марта 2025",
    dateStart: new Date(2025, 2, 20),
    location: "Москва",
    format: "Практика",
    price: 25000,
    lecturer: "Смирнова Е.В.",
    category: "Фотография",
    description: "Профессиональная дентальная фотография",
  },
  {
    id: 6,
    title: "Диагностические возможности КЛКТ",
    date: "5 апреля 2025",
    dateStart: new Date(2025, 3, 5),
    location: "Онлайн",
    format: "Вебинар",
    price: 5000,
    lecturer: "Белов А.И.",
    category: "Диагностика",
    description: "Обзор возможностей конусно-лучевой компьютерной томографии",
  },
  {
    id: 7,
    title: "Цифровая ортодонтия: элайнеры",
    date: "18 апреля 2025",
    dateStart: new Date(2025, 3, 18),
    location: "Москва",
    format: "Практика",
    price: 55000,
    lecturer: "Д-р Иванов А.С.",
    category: "Ортодонтия",
    description: "Планирование и производство элайнеров",
  },
  {
    id: 8,
    title: "Ортопедические реставрации на имплантатах",
    date: "25 апреля 2025",
    dateStart: new Date(2025, 3, 25),
    location: "Москва",
    format: "Практика",
    price: 40000,
    lecturer: "Морозов И.П.",
    category: "Ортопедия",
    description: "Протезирование на имплантатах: от планирования до реализации",
  },
  {
    id: 9,
    title: "Работа с цирконием: особенности фрезерования",
    date: "10 мая 2025",
    dateStart: new Date(2025, 4, 10),
    location: "Москва",
    format: "Практика",
    price: 30000,
    lecturer: "Петров В.А.",
    category: "CAD/CAM",
    description: "Технология работы с циркониевыми материалами",
  },
  {
    id: 10,
    title: "Эстетика в стоматологии",
    date: "22 мая 2025",
    dateStart: new Date(2025, 4, 22),
    location: "Москва",
    format: "Практика",
    price: 45000,
    lecturer: "Смирнова Е.В.",
    category: "Эстетика",
    description: "Современные подходы к эстетической реставрации",
  },
];

export const courseCategories = [
  "Все категории",
  "Ортодонтия",
  "CAD/CAM",
  "3D-моделирование",
  "Хирургия",
  "Фотография",
  "Диагностика",
  "Ортопедия",
  "Эстетика",
];

export const courseFormats = ["Все форматы", "Практика", "Вебинар"];
