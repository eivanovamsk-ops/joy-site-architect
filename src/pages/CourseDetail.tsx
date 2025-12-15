import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  MapPin,
  Clock,
  Users,
  Award,
  ChevronRight,
  Share2,
  CheckCircle2,
  Target,
  GraduationCap,
  UserCheck,
  Lightbulb,
  HelpCircle
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CourseEnrollmentForm } from "@/components/education/CourseEnrollmentForm";

interface Course {
  id: number;
  title: string;
  date: string;
  location: string;
  format: string;
  price: number;
  lecturer: string;
  lecturerBio: string;
  category: string;
  duration: string;
  description: string;
  goal: string;
  targetAudience: string[];
  skills: string[];
  program: string[];
  includes: string[];
  faq: { question: string; answer: string }[];
}

const courses: Course[] = [
  {
    id: 1,
    title: "Всё сложится! Алгоритмы подготовки и ведения хирургических пациентов",
    date: "20-21 декабря 2024",
    location: "Москва, Варшавское шоссе, д33с12",
    format: "Практика",
    price: 0,
    lecturer: "Команда экспертов",
    lecturerBio: "Ведущие специалисты в области ортодонтии и хирургии с многолетним опытом работы с комплексными случаями.",
    category: "Ортодонтия",
    duration: "2 дня (16 часов)",
    description: "Курс для врачей-ортодонтов по хирургической подготовке пациентов. Изучите алгоритмы ведения сложных случаев.",
    goal: "Освоить протоколы взаимодействия в команде ортодонт-хирург при планировании и лечении хирургических пациентов.",
    targetAudience: [
      "Врачи-ортодонты",
      "Хирурги-стоматологи",
      "Челюстно-лицевые хирурги"
    ],
    skills: [
      "Планирование хирургической подготовки",
      "Ведение пациентов до и после операции",
      "Коммуникация в междисциплинарной команде",
      "Анализ сложных клинических случаев"
    ],
    program: [
      "Принципы планирования хирургических случаев",
      "Диагностика и показания к хирургии",
      "Подготовка к ортогнатической операции",
      "Ортодонтическое лечение после хирургии",
      "Разбор клинических случаев",
      "Практические упражнения"
    ],
    includes: [
      "Учебные материалы",
      "Сертификат об обучении",
      "Кофе-брейки и обеды"
    ],
    faq: [
      {
        question: "Какой уровень подготовки требуется?",
        answer: "Курс рассчитан на практикующих специалистов с базовым опытом в ортодонтии или хирургии."
      },
      {
        question: "Выдается ли сертификат?",
        answer: "Да, по окончании курса выдается сертификат установленного образца."
      },
      {
        question: "Как записаться на курс?",
        answer: "Заполните форму записи на сайте или свяжитесь с нами по телефону."
      }
    ]
  },
  {
    id: 2,
    title: "ORTHO Skills",
    date: "15 декабря 2025",
    location: "Москва, Варшавское шоссе, д33с12",
    format: "Практика",
    price: 0,
    lecturer: "Команда тренеров Артикон",
    lecturerBio: "Квалифицированные специалисты производства Артикон с многолетним опытом в цифровой ортодонтии.",
    category: "Ортодонтия",
    duration: "5 дней (40 часов)",
    description: "Полный цикл производства ортодонтических конструкций за 5 дней. От сканирования до готовых аппаратов.",
    goal: "Освоить полный производственный цикл цифровой ортодонтии: сканирование, моделирование, печать и изготовление аппаратов.",
    targetAudience: [
      "Зубные техники ортодонтического направления",
      "Врачи-ортодонты, желающие освоить цифровые технологии",
      "Специалисты, внедряющие цифровой workflow"
    ],
    skills: [
      "Сканирование ортодонтических моделей",
      "Моделирование ортодонтических аппаратов",
      "3D-печать моделей и направляющих",
      "Изготовление элайнеров и капп",
      "Производство несъемных ортодонтических аппаратов"
    ],
    program: [
      "День 1: Основы цифрового сканирования",
      "День 2: Моделирование элайнеров",
      "День 3: Ретейнеры и каппы",
      "День 4: Несъемные аппараты",
      "День 5: Финишная обработка и практика"
    ],
    includes: [
      "Все учебные материалы",
      "Сертификат об обучении",
      "Кофе-брейки и обеды",
      "Практика на оборудовании"
    ],
    faq: [
      {
        question: "Нужен ли опыт в CAD/CAM?",
        answer: "Базовые навыки желательны, но курс подходит и для начинающих."
      },
      {
        question: "Какое оборудование используется?",
        answer: "Современные сканеры Medit, 3D-принтеры и программное обеспечение для ортодонтии."
      },
      {
        question: "Сколько человек в группе?",
        answer: "Группы небольшие для максимального внимания каждому участнику."
      }
    ]
  },
  {
    id: 3,
    title: "CAD/CAM SCHOOL",
    date: "19 января 2026",
    location: "Москва, Варшавское шоссе, д33с12",
    format: "Практика",
    price: 70000,
    lecturer: "Команда тренеров Артикон",
    lecturerBio: "Григорий Сулима (тренер SUM3D, MillBox), Ислам Гашимов (тренер exocad и Medit), Шамиль Магомедов (тренер Contrast Dental Direkt, MIYO).",
    category: "CAD/CAM",
    duration: "6 дней (48 часов)",
    description: "Недельное погружение в полный цикл CAD/CAM на действующем производстве. Мировой опыт индустрии для ваших профессиональных достижений.",
    goal: "Освоить все этапы цифрового производства зуботехнических конструкций — от сканирования до финишной обработки.",
    targetAudience: [
      "Зубные техники, начинающие работу с цифровыми технологиями",
      "Специалисты лабораторий, внедряющих CAD/CAM",
      "Владельцы и руководители зуботехнических лабораторий"
    ],
    skills: [
      "Сканирование работ на культях, имплантатах, под культевые вкладки",
      "Моделирование в exocad: коронки, мосты, винтовая фиксация",
      "Работа с ПО MillBox: размещение работ, расстановка коннекторов",
      "Фрезерование на оборудовании imes-icore",
      "3D-печать и постобработка",
      "Индивидуализация: окрашивание, жидкая керамика, глазурь"
    ],
    program: [
      "День 1: Сканирование — работы на культях, имплантатах",
      "День 2: Моделирование в exocad — одиночные коронки",
      "День 3: Моделирование — мостовидные протезы на винтовой фиксации",
      "День 4: Фрезерование — работа с MillBox",
      "День 5: 3D-печать и синтеризация",
      "День 6: Обработка и индивидуализация"
    ],
    includes: [
      "Все учебные материалы и методички",
      "Сертификат об обучении (возможность получить баллы НМО)",
      "Кофе-брейки и обеды каждый день",
      "Практика на реальном производстве"
    ],
    faq: [
      {
        question: "Где проходит обучение?",
        answer: "На производстве Артикон — самой цифровой лаборатории России. Адрес: Москва, Варшавское шоссе, д. 33к12."
      },
      {
        question: "Можно ли получить баллы НМО?",
        answer: "Да, курс аккредитован. Сообщите менеджеру Артикон при регистрации."
      },
      {
        question: "Сколько человек в группе?",
        answer: "Количество мест ограничено для обеспечения максимального внимания каждому участнику."
      }
    ]
  },
  {
    id: 4,
    title: "Цифровое моделирование сплинтов и работа в виртуальном артикуляторе",
    date: "29 января 2026",
    location: "Москва, Варшавское шоссе, д33с12",
    format: "Практика",
    price: 0,
    lecturer: "Тренеры Артикон",
    lecturerBio: "Опытные специалисты по цифровому моделированию и работе с виртуальными артикуляторами.",
    category: "3D-моделирование",
    duration: "1 день (8 часов)",
    description: "Теория и практика работы с виртуальным артикулятором. Освойте цифровое моделирование окклюзионных сплинтов.",
    goal: "Научиться моделировать сплинты в цифровой среде с использованием виртуального артикулятора.",
    targetAudience: [
      "Зубные техники",
      "Врачи-стоматологи ортопеды",
      "Специалисты по гнатологии"
    ],
    skills: [
      "Работа с виртуальным артикулятором",
      "Моделирование окклюзионных сплинтов",
      "Настройка параметров артикуляции",
      "Анализ окклюзии в цифровой среде"
    ],
    program: [
      "Основы виртуальной артикуляции",
      "Типы сплинтов и показания",
      "Практика моделирования",
      "Работа с клиническими случаями"
    ],
    includes: [
      "Учебные материалы",
      "Сертификат об обучении",
      "Кофе-брейк"
    ],
    faq: [
      {
        question: "Нужен ли опыт в CAD-моделировании?",
        answer: "Базовые навыки работы в CAD-программах желательны."
      },
      {
        question: "Какое ПО используется?",
        answer: "exocad с модулем виртуального артикулятора."
      },
      {
        question: "Выдается ли сертификат?",
        answer: "Да, по окончании курса выдается сертификат."
      }
    ]
  },
  {
    id: 5,
    title: "Цифровое моделирование расширяющих несъёмных аппаратов",
    date: "2 февраля 2026",
    location: "Москва, Варшавское шоссе, д33с12",
    format: "Практика",
    price: 0,
    lecturer: "Тренеры Артикон",
    lecturerBio: "Специалисты по цифровому моделированию ортодонтических аппаратов.",
    category: "Ортодонтия",
    duration: "1 день (8 часов)",
    description: "Моделирование ортодонтических расширяющих аппаратов в цифровой среде.",
    goal: "Освоить цифровое моделирование несъемных расширяющих ортодонтических аппаратов.",
    targetAudience: [
      "Зубные техники ортодонтического направления",
      "Врачи-ортодонты",
      "Специалисты CAD/CAM лабораторий"
    ],
    skills: [
      "Моделирование расширяющих аппаратов",
      "Работа с ортодонтическими модулями",
      "Подготовка файлов к производству"
    ],
    program: [
      "Типы расширяющих аппаратов",
      "Цифровое моделирование в специализированном ПО",
      "Практика на реальных случаях",
      "Подготовка к производству"
    ],
    includes: [
      "Учебные материалы",
      "Сертификат",
      "Кофе-брейк"
    ],
    faq: [
      {
        question: "Какой уровень подготовки требуется?",
        answer: "Базовые навыки работы в CAD-программах."
      },
      {
        question: "Какое ПО используется?",
        answer: "Специализированное ПО для ортодонтии."
      },
      {
        question: "Можно ли посетить несколько курсов подряд?",
        answer: "Да, курсы можно комбинировать."
      }
    ]
  },
  {
    id: 6,
    title: "Цифровое планирование ортодонтических мини-имплантатов и моделирование аппаратов с кортикальной опорой",
    date: "3 февраля 2026",
    location: "Москва, Варшавское шоссе, д33с12",
    format: "Практика",
    price: 0,
    lecturer: "Тренеры Артикон",
    lecturerBio: "Эксперты в области цифрового планирования и ортодонтической имплантации.",
    category: "Ортодонтия",
    duration: "1 день (8 часов)",
    description: "Планирование мини-имплантатов для ортодонтического лечения и моделирование аппаратов на скелетной опоре.",
    goal: "Освоить цифровое планирование установки ортодонтических мини-имплантатов и моделирование аппаратов с кортикальной опорой.",
    targetAudience: [
      "Врачи-ортодонты",
      "Хирурги-стоматологи",
      "Зубные техники"
    ],
    skills: [
      "Планирование позиции мини-имплантатов",
      "Моделирование хирургических шаблонов",
      "Создание аппаратов с кортикальной опорой"
    ],
    program: [
      "Показания к мини-имплантатам",
      "Цифровое планирование позиции",
      "Моделирование шаблонов",
      "Практика на клинических случаях"
    ],
    includes: [
      "Учебные материалы",
      "Сертификат",
      "Кофе-брейк"
    ],
    faq: [
      {
        question: "Нужен ли хирургический опыт?",
        answer: "Курс ориентирован на планирование, хирургический опыт не обязателен."
      },
      {
        question: "Какое ПО используется?",
        answer: "Blue Sky Plan и специализированное ПО для планирования."
      },
      {
        question: "Выдается ли сертификат?",
        answer: "Да, сертификат выдается по окончании курса."
      }
    ]
  },
  {
    id: 7,
    title: "Планирование ортодонтических аппаратов на скелетной опоре (SARPE, MARPE)",
    date: "4 февраля 2026",
    location: "Москва, Варшавское шоссе, д33с12",
    format: "Практика",
    price: 0,
    lecturer: "Тренеры Артикон",
    lecturerBio: "Специалисты по комплексному планированию ортодонтического лечения с хирургическим компонентом.",
    category: "Ортодонтия",
    duration: "1 день (8 часов)",
    description: "Протоколы взаимодействия в команде ортодонт-хирург-техник при работе с аппаратами SARPE и MARPE.",
    goal: "Освоить планирование и изготовление аппаратов на скелетной опоре для расширения верхней челюсти.",
    targetAudience: [
      "Врачи-ортодонты",
      "Хирурги-стоматологи",
      "Зубные техники"
    ],
    skills: [
      "Планирование SARPE/MARPE",
      "Моделирование аппаратов",
      "Командная работа врач-техник"
    ],
    program: [
      "Показания к SARPE и MARPE",
      "Диагностика и планирование",
      "Моделирование аппаратов",
      "Клинические случаи"
    ],
    includes: [
      "Учебные материалы",
      "Сертификат",
      "Кофе-брейк"
    ],
    faq: [
      {
        question: "В чем разница между SARPE и MARPE?",
        answer: "SARPE — хирургически ассистированное расширение, MARPE — минимально инвазивное. На курсе рассматриваются оба метода."
      },
      {
        question: "Нужен ли опыт работы с подобными аппаратами?",
        answer: "Нет, курс подходит для начинающих осваивать данное направление."
      },
      {
        question: "Выдается ли сертификат?",
        answer: "Да, по окончании курса выдается сертификат."
      }
    ]
  },
  {
    id: 8,
    title: "Цифровой Ортопедический Протокол",
    date: "11 февраля 2026",
    location: "Москва, Варшавское шоссе, д33с12",
    format: "Практика",
    price: 0,
    lecturer: "Тренеры Артикон",
    lecturerBio: "Ведущие специалисты в области цифровой ортопедии с опытом работы на современном оборудовании.",
    category: "Ортопедия",
    duration: "1 день (8 часов)",
    description: "Применение интраорального сканера в практике врача ортопеда: от одиночных коронок до тотальных реставраций.",
    goal: "Освоить полный цифровой протокол работы врача-ортопеда с использованием интраорального сканера.",
    targetAudience: [
      "Врачи-стоматологи ортопеды",
      "Врачи общей практики",
      "Зубные техники"
    ],
    skills: [
      "Интраоральное сканирование",
      "Работа с цифровыми оттисками",
      "Коммуникация с лабораторией",
      "Протокол тотальных реставраций"
    ],
    program: [
      "Основы интраорального сканирования",
      "Сканирование одиночных реставраций",
      "Работа с имплантатами",
      "Тотальные реставрации"
    ],
    includes: [
      "Учебные материалы",
      "Сертификат",
      "Кофе-брейк"
    ],
    faq: [
      {
        question: "Какие сканеры используются?",
        answer: "Medit, 3Shape и другие современные сканеры."
      },
      {
        question: "Подходит ли курс для начинающих?",
        answer: "Да, курс подходит для врачей любого уровня."
      },
      {
        question: "Будет ли практика?",
        answer: "Да, курс включает практические занятия."
      }
    ]
  },
  {
    id: 9,
    title: "Цвет и форма: основа эстетической реставрации",
    date: "25 февраля 2026",
    location: "Москва, Варшавское шоссе, д33с12",
    format: "Практика",
    price: 0,
    lecturer: "Тренеры Артикон",
    lecturerBio: "Мастера окрашивания и индивидуализации зуботехнических конструкций.",
    category: "Эстетика",
    duration: "1 день (8 часов)",
    description: "Базовый курс по окрашиванию полноанатомических конструкций. Освойте искусство воспроизведения естественного цвета зубов.",
    goal: "Освоить техники окрашивания и индивидуализации циркониевых реставраций для достижения естественной эстетики.",
    targetAudience: [
      "Зубные техники",
      "Специалисты CAD/CAM лабораторий",
      "Техники, работающие с цирконием"
    ],
    skills: [
      "Понимание теории цвета в стоматологии",
      "Техника нанесения красителей",
      "Работа с жидкой керамикой",
      "Глазурование конструкций"
    ],
    program: [
      "Теория цвета и оптика зуба",
      "Материалы для окрашивания",
      "Техники нанесения",
      "Практика на моделях"
    ],
    includes: [
      "Учебные материалы",
      "Материалы для практики",
      "Сертификат",
      "Кофе-брейк"
    ],
    faq: [
      {
        question: "Нужен ли опыт работы с цирконием?",
        answer: "Базовый опыт желателен, но курс подходит и для начинающих."
      },
      {
        question: "Какие материалы используются?",
        answer: "Краски MIYO, Ivoclar и другие профессиональные материалы."
      },
      {
        question: "Смогу ли я забрать свои работы?",
        answer: "Да, работы, выполненные на практике, можно забрать с собой."
      }
    ]
  },
  {
    id: 10,
    title: "MillBox & SUM: Полный цикл фрезерования в стоматологии",
    date: "27 февраля 2026",
    location: "Москва, Варшавское шоссе, д33с12",
    format: "Практика",
    price: 0,
    lecturer: "Григорий Сулима",
    lecturerBio: "Официальный тренер SUM3D и MillBox с многолетним опытом работы на производстве Артикон.",
    category: "CAD/CAM",
    duration: "1 день (8 часов)",
    description: "От проекта до готовой конструкции. Полный цикл фрезерования зуботехнических изделий.",
    goal: "Освоить работу с программным обеспечением MillBox и SUM3D для подготовки работ к фрезерованию.",
    targetAudience: [
      "Зубные техники",
      "Операторы фрезерных станков",
      "Специалисты CAD/CAM лабораторий"
    ],
    skills: [
      "Работа в программе MillBox",
      "Размещение работ в диске",
      "Настройка стратегий фрезерования",
      "Оптимизация производственного процесса"
    ],
    program: [
      "Интерфейс MillBox и SUM3D",
      "Импорт и размещение работ",
      "Настройка коннекторов",
      "Практика на реальных задачах"
    ],
    includes: [
      "Учебные материалы",
      "Сертификат",
      "Кофе-брейк"
    ],
    faq: [
      {
        question: "Какое оборудование используется?",
        answer: "Фрезерные станки imes-icore и VHF."
      },
      {
        question: "Нужен ли опыт работы с CAM-системами?",
        answer: "Нет, курс начинается с основ."
      },
      {
        question: "Получу ли я доступ к ПО после курса?",
        answer: "Мы предоставим информацию о получении демо-версий."
      }
    ]
  },
  {
    id: 11,
    title: "ПЕЧАТЬ НА 3D ПРИНТЕРЕ ЗА 100 000 VS 1 000 000",
    date: "28 февраля 2026",
    location: "Москва, Варшавское шоссе, д33с12",
    format: "Open Day",
    price: 0,
    lecturer: "Команда Артикон",
    lecturerBio: "Специалисты по 3D-печати с опытом работы на различном оборудовании.",
    category: "3D-моделирование",
    duration: "1 день",
    description: "Open Day в Артикон. Сравнение 3D-принтеров разных ценовых категорий на практике.",
    goal: "Понять различия между бюджетными и премиальными 3D-принтерами и выбрать оптимальное решение.",
    targetAudience: [
      "Владельцы зуботехнических лабораторий",
      "Зубные техники",
      "Все, кто планирует покупку 3D-принтера"
    ],
    skills: [
      "Сравнительный анализ оборудования",
      "Оценка качества печати",
      "Расчет экономической эффективности"
    ],
    program: [
      "Обзор рынка 3D-принтеров",
      "Демонстрация печати на разном оборудовании",
      "Сравнение результатов",
      "Ответы на вопросы"
    ],
    includes: [
      "Участие бесплатное",
      "Кофе-брейк"
    ],
    faq: [
      {
        question: "Мероприятие бесплатное?",
        answer: "Да, Open Day проводится бесплатно."
      },
      {
        question: "Нужна ли регистрация?",
        answer: "Да, количество мест ограничено, требуется предварительная регистрация."
      },
      {
        question: "Можно ли принести свои файлы для печати?",
        answer: "Да, мы можем напечатать ваши файлы для демонстрации."
      }
    ]
  },
  {
    id: 12,
    title: "Элайнеры | Maestro 3D V6 в практике врача-ортодонта и зубного техника",
    date: "3 марта 2026",
    location: "Москва, Варшавское шоссе, д33с12",
    format: "Практика",
    price: 0,
    lecturer: "Тренеры Артикон",
    lecturerBio: "Сертифицированные специалисты по работе с программой Maestro 3D.",
    category: "Ортодонтия",
    duration: "1 день (8 часов)",
    description: "Практический курс по работе с элайнерами в программе Maestro 3D V6.",
    goal: "Освоить планирование и производство элайнеров с использованием программы Maestro 3D V6.",
    targetAudience: [
      "Врачи-ортодонты",
      "Зубные техники",
      "Специалисты, работающие с элайнерами"
    ],
    skills: [
      "Работа в Maestro 3D V6",
      "Планирование перемещения зубов",
      "Создание виртуального сетапа",
      "Подготовка к производству элайнеров"
    ],
    program: [
      "Интерфейс Maestro 3D V6",
      "Сегментация и выставление осей",
      "Планирование перемещений",
      "Практика на клинических случаях"
    ],
    includes: [
      "Учебные материалы",
      "Сертификат",
      "Кофе-брейк"
    ],
    faq: [
      {
        question: "Какая версия Maestro используется?",
        answer: "Новейшая версия Maestro 3D V6."
      },
      {
        question: "Нужен ли опыт работы с элайнерами?",
        answer: "Курс подходит и для начинающих."
      },
      {
        question: "Получу ли я демо-версию программы?",
        answer: "Информация о получении демо-версии предоставляется на курсе."
      }
    ]
  },
  {
    id: 13,
    title: "ORTHO Skills",
    date: "16 марта 2026",
    location: "Москва, Варшавское шоссе, д33с12",
    format: "Практика",
    price: 0,
    lecturer: "Команда тренеров Артикон",
    lecturerBio: "Квалифицированные специалисты производства Артикон с многолетним опытом в цифровой ортодонтии.",
    category: "Ортодонтия",
    duration: "5 дней (40 часов)",
    description: "Полный цикл производства ортодонтических конструкций за 5 дней.",
    goal: "Освоить полный производственный цикл цифровой ортодонтии.",
    targetAudience: [
      "Зубные техники ортодонтического направления",
      "Врачи-ортодонты",
      "Специалисты, внедряющие цифровой workflow"
    ],
    skills: [
      "Сканирование ортодонтических моделей",
      "Моделирование аппаратов",
      "3D-печать",
      "Производство элайнеров"
    ],
    program: [
      "День 1: Сканирование",
      "День 2: Элайнеры",
      "День 3: Ретейнеры",
      "День 4: Несъемные аппараты",
      "День 5: Практика"
    ],
    includes: [
      "Все учебные материалы",
      "Сертификат",
      "Кофе-брейки и обеды"
    ],
    faq: [
      {
        question: "Это повторение курса в декабре?",
        answer: "Да, это тот же курс в другие даты."
      },
      {
        question: "Можно ли посетить отдельные дни?",
        answer: "Курс рассчитан на полное прохождение."
      },
      {
        question: "Есть ли скидки при групповом участии?",
        answer: "Да, свяжитесь с нами для уточнения условий."
      }
    ]
  },
  {
    id: 14,
    title: "Непрямая фиксация брекетов",
    date: "25 марта 2026",
    location: "Москва, Варшавское шоссе, д33с12",
    format: "Практика",
    price: 0,
    lecturer: "Тренеры Артикон",
    lecturerBio: "Специалисты по цифровым технологиям в ортодонтии.",
    category: "Ортодонтия",
    duration: "1 день (8 часов)",
    description: "Теория и практика непрямой фиксации брекетов с использованием цифровых технологий.",
    goal: "Освоить методику непрямой фиксации брекетов с применением 3D-печатных капп.",
    targetAudience: [
      "Врачи-ортодонты",
      "Зубные техники",
      "Ассистенты ортодонта"
    ],
    skills: [
      "Планирование позиционирования брекетов",
      "Изготовление переносных капп",
      "Техника непрямой фиксации"
    ],
    program: [
      "Преимущества непрямой фиксации",
      "Цифровое планирование",
      "Изготовление капп",
      "Практика фиксации"
    ],
    includes: [
      "Учебные материалы",
      "Сертификат",
      "Кофе-брейк"
    ],
    faq: [
      {
        question: "Какие системы брекетов рассматриваются?",
        answer: "Методика универсальна и подходит для большинства систем."
      },
      {
        question: "Нужен ли опыт работы с брекетами?",
        answer: "Да, рекомендуется базовый опыт в ортодонтии."
      },
      {
        question: "Будет ли практика на пациентах?",
        answer: "Нет, практика проводится на моделях."
      }
    ]
  },
  {
    id: 15,
    title: "CAD/CAM PRO",
    date: "30 марта 2026",
    location: "Москва, Варшавское шоссе, д33с12",
    format: "Практика",
    price: 0,
    lecturer: "Команда тренеров Артикон",
    lecturerBio: "Ведущие специалисты производства Артикон с многолетним опытом в CAD/CAM.",
    category: "CAD/CAM",
    duration: "3 дня (24 часа)",
    description: "Интенсивный курс по полному циклу CAD/CAM производства за 3 дня.",
    goal: "Освоить ключевые этапы цифрового производства в сжатые сроки.",
    targetAudience: [
      "Зубные техники",
      "Специалисты, внедряющие CAD/CAM",
      "Руководители лабораторий"
    ],
    skills: [
      "Сканирование и моделирование",
      "Фрезерование",
      "Финишная обработка"
    ],
    program: [
      "День 1: Сканирование и моделирование",
      "День 2: CAM и фрезерование",
      "День 3: Обработка и практика"
    ],
    includes: [
      "Учебные материалы",
      "Сертификат",
      "Кофе-брейки и обеды"
    ],
    faq: [
      {
        question: "Чем отличается от CAD/CAM SCHOOL?",
        answer: "Это сокращенная версия курса, охватывающая основные темы за 3 дня вместо 6."
      },
      {
        question: "Подходит ли для начинающих?",
        answer: "Да, но темп интенсивный."
      },
      {
        question: "Есть ли баллы НМО?",
        answer: "Уточняйте при регистрации."
      }
    ]
  },
  {
    id: 16,
    title: "Менеджмент зуботехнической лаборатории",
    date: "По запросу",
    location: "Онлайн",
    format: "Онлайн-курс",
    price: 0,
    lecturer: "Бизнес-тренеры Артикон",
    lecturerBio: "Специалисты по управлению и развитию зуботехнических лабораторий.",
    category: "Менеджмент",
    duration: "Индивидуально",
    description: "Организация успешной зуботехнической лаборатории. Бизнес-процессы, маркетинг, финансы.",
    goal: "Научиться эффективно управлять зуботехнической лабораторией и развивать бизнес.",
    targetAudience: [
      "Владельцы лабораторий",
      "Руководители производства",
      "Начинающие предприниматели"
    ],
    skills: [
      "Организация бизнес-процессов",
      "Финансовое планирование",
      "Маркетинг и продажи",
      "Управление персоналом"
    ],
    program: [
      "Анализ рынка и позиционирование",
      "Бизнес-планирование",
      "Операционное управление",
      "Развитие и масштабирование"
    ],
    includes: [
      "Онлайн-материалы",
      "Консультации",
      "Сертификат"
    ],
    faq: [
      {
        question: "Как проходит обучение?",
        answer: "Онлайн, в удобном для вас темпе с консультациями."
      },
      {
        question: "Есть ли индивидуальный подход?",
        answer: "Да, программа адаптируется под ваши задачи."
      },
      {
        question: "Какова стоимость?",
        answer: "Стоимость определяется индивидуально. Свяжитесь с нами."
      }
    ]
  },
  {
    id: 17,
    title: "Интраоральное сканирование Runyes 3DS V5",
    date: "По запросу",
    location: "Москва, Варшавское шоссе, д33с12",
    format: "Практика",
    price: 0,
    lecturer: "Тренеры Артикон",
    lecturerBio: "Сертифицированные специалисты по работе со сканерами Runyes.",
    category: "Диагностика",
    duration: "По согласованию",
    description: "Практический курс по интраоральному сканированию на оборудовании Runyes 3DS V5.",
    goal: "Освоить работу с интраоральным сканером Runyes 3DS V5 для повседневной клинической практики.",
    targetAudience: [
      "Врачи-стоматологи",
      "Ассистенты",
      "Покупатели сканеров Runyes"
    ],
    skills: [
      "Техника сканирования",
      "Работа с программным обеспечением",
      "Экспорт данных в лабораторию"
    ],
    program: [
      "Знакомство со сканером",
      "Техника сканирования",
      "Программное обеспечение",
      "Практика"
    ],
    includes: [
      "Обучение при покупке сканера",
      "Учебные материалы"
    ],
    faq: [
      {
        question: "Курс только для покупателей сканера?",
        answer: "Приоритет у покупателей, но возможно обучение и других специалистов."
      },
      {
        question: "Какова продолжительность?",
        answer: "Определяется индивидуально, обычно 2-4 часа."
      },
      {
        question: "Входит ли в стоимость сканера?",
        answer: "Да, базовое обучение включено при покупке."
      }
    ]
  }
];

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === Number(id));

  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Курс не найден</h1>
          <Link to="/education">
            <Button>Вернуться к курсам</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  const relatedCourses = courses
    .filter((c) => c.category === course.category && c.id !== course.id)
    .slice(0, 3);

  return (
    <Layout>
      {/* Breadcrumbs */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Главная
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/education" className="hover:text-foreground transition-colors">
              Учебный центр
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{course.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="gradient-education py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Badge className="bg-education-foreground/20 text-education-foreground mb-4">
                {course.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-education-foreground mb-4">
                {course.title}
              </h1>
              <p className="text-education-foreground/80 text-lg mb-6">
                {course.description}
              </p>
              
              <div className="flex flex-wrap gap-4 text-education-foreground/90">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{course.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{course.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{course.lecturer}</span>
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">
                {formatPrice(course.price)}
              </div>
              <div className="text-muted-foreground mb-6">
                {course.format}
              </div>
              
              <Button size="lg" className="w-full bg-primary hover:bg-primary/90 mb-3">
                Записаться на курс
              </Button>
              <Button size="lg" variant="outline" className="w-full mb-6">
                <Share2 className="h-4 w-4 mr-2" />
                Поделиться
              </Button>

              <div className="border-t border-border pt-4">
                <div className="text-sm font-medium mb-3">Включено в стоимость:</div>
                <ul className="space-y-2">
                  {course.includes.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Goal */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Цель курса</h2>
              <p className="text-muted-foreground text-lg">{course.goal}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Target Audience & Skills */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* For Whom */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-secondary-foreground" />
              </div>
              <h2 className="text-xl font-bold">Для кого этот курс</h2>
            </div>
            <ul className="space-y-4">
              {course.targetAudience.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What You'll Learn */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-accent-foreground" />
              </div>
              <h2 className="text-xl font-bold">Чему вы научитесь</h2>
            </div>
            <ul className="space-y-4">
              {course.skills.map((skill, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Lightbulb className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        {/* Tabs */}
        <Tabs defaultValue="program" className="mb-12">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 mb-6">
            <TabsTrigger 
              value="program"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Программа курса
            </TabsTrigger>
            <TabsTrigger 
              value="lecturer"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Преподаватель
            </TabsTrigger>
            <TabsTrigger 
              value="location"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Место проведения
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="program">
            <div className="grid md:grid-cols-2 gap-4">
              {course.program.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="pt-1">{item}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="lecturer">
            <div className="flex items-start gap-6 p-6 bg-muted/30 rounded-xl">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                <Users className="h-10 w-10 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{course.lecturer}</h3>
                <p className="text-muted-foreground mb-4">
                  {course.lecturerBio}
                </p>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-sm">Сертифицированный тренер</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="location">
            <div className="p-6 bg-muted/30 rounded-xl">
              {course.location === "Онлайн" ? (
                <div>
                  <h3 className="text-xl font-bold mb-2">Онлайн-формат</h3>
                  <p className="text-muted-foreground">
                    Вебинар проводится на платформе Zoom. Ссылка для подключения будет отправлена 
                    на email за день до начала. После оплаты вы получите подтверждение регистрации.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold mb-2">Учебный центр Articon</h3>
                  <p className="text-muted-foreground mb-4">
                    {course.location}, Варшавское шоссе, д. 33к12
                  </p>
                  <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <HelpCircle className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Часто задаваемые вопросы</h2>
          </div>
          <Accordion type="single" collapsible className="bg-card border border-border rounded-xl">
            {course.faq.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30">
                  <span className="text-left font-medium">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="bg-primary/10 rounded-2xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">Готовы начать обучение?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Запишитесь на курс сейчас или свяжитесь с нами для получения дополнительной информации.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CourseEnrollmentForm 
              courseName={course.title}
              courseDate={course.date}
              coursePrice={course.price}
            />
            <Button size="lg" variant="outline">
              Задать вопрос
            </Button>
          </div>
        </div>

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Похожие курсы</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedCourses.map((relCourse) => (
                <Link
                  key={relCourse.id}
                  to={`/education/course/${relCourse.id}`}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="gradient-education p-4">
                    <Badge className="bg-education-foreground/20 text-education-foreground text-xs mb-2">
                      {relCourse.category}
                    </Badge>
                    <h3 className="font-bold text-education-foreground line-clamp-2">
                      {relCourse.title}
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{relCourse.date}</span>
                    </div>
                    <div className="font-bold text-primary">
                      {formatPrice(relCourse.price)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CourseDetail;
