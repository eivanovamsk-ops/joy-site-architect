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
    title: "Цифровое планирование в ортодонтии",
    date: "20-21 января 2025",
    location: "Москва",
    format: "Практика",
    price: 45000,
    lecturer: "Д-р Иванов А.С.",
    lecturerBio: "Врач-ортодонт высшей категории с 15-летним стажем. Сертифицированный тренер по цифровым технологиям в ортодонтии. Автор более 20 научных публикаций.",
    category: "Ортодонтия",
    duration: "2 дня (16 часов)",
    description: "Комплексный курс по цифровому планированию ортодонтического лечения. Вы научитесь работать с современными программами для планирования перемещения зубов, создавать виртуальные сетапы и проводить анализ клинических случаев.",
    goal: "Освоить полный цикл цифрового планирования ортодонтического лечения: от сканирования до создания виртуального сетапа и выбора оптимальной тактики лечения.",
    targetAudience: [
      "Врачи-ортодонты, желающие освоить цифровые технологии",
      "Специалисты, работающие с элайнерами",
      "Зубные техники ортодонтического направления"
    ],
    skills: [
      "Работа с интраоральным сканером",
      "Создание виртуальных сетапов",
      "Планирование перемещения зубов",
      "Анализ клинических случаев в цифровом формате",
      "Коммуникация с лабораторией через цифровые платформы"
    ],
    program: [
      "Введение в цифровую ортодонтию",
      "Работа с интраоральным сканером",
      "Анализ моделей в программе",
      "Создание виртуального сетапа",
      "Планирование элайнеров",
      "Практическая работа с клиническими случаями"
    ],
    includes: [
      "Учебные материалы",
      "Сертификат об обучении",
      "Кофе-брейки и обеды",
      "Доступ к записям лекций"
    ],
    faq: [
      {
        question: "Нужен ли опыт работы с цифровыми технологиями?",
        answer: "Нет, курс подходит для начинающих. Мы начинаем с основ и постепенно переходим к более сложным темам."
      },
      {
        question: "Какое оборудование будет использоваться?",
        answer: "На курсе используются сканеры Medit и 3Shape, а также программное обеспечение для планирования ортодонтического лечения."
      },
      {
        question: "Выдается ли сертификат?",
        answer: "Да, по окончании курса выдается сертификат установленного образца с указанием количества часов обучения."
      }
    ]
  },
  {
    id: 2,
    title: "Exocad: от новичка до профессионала",
    date: "5-7 февраля 2025",
    location: "Москва",
    format: "Практика",
    price: 65000,
    lecturer: "Петров В.А.",
    lecturerBio: "Зубной техник с 12-летним опытом работы в CAD/CAM. Официальный тренер exocad. Специализируется на сложных ортопедических конструкциях.",
    category: "CAD/CAM",
    duration: "3 дня (24 часа)",
    description: "Интенсивный курс по работе в программе Exocad. Курс охватывает все аспекты работы: от базового моделирования до сложных ортопедических конструкций.",
    goal: "Научиться самостоятельно моделировать любые виды протетических конструкций в программе Exocad на профессиональном уровне.",
    targetAudience: [
      "Начинающие зубные техники",
      "Техники, переходящие на цифровые технологии",
      "Практикующие специалисты, желающие повысить квалификацию"
    ],
    skills: [
      "Полное владение интерфейсом Exocad",
      "Моделирование одиночных коронок всех видов",
      "Создание мостовидных протезов любой протяженности",
      "Работа с имплантатными абатментами",
      "Моделирование съемных конструкций"
    ],
    program: [
      "Интерфейс и основы работы в Exocad",
      "Моделирование одиночных коронок",
      "Создание мостовидных протезов",
      "Работа с имплантами",
      "Съемное протезирование в Exocad",
      "Сложные клинические случаи"
    ],
    includes: [
      "Учебные материалы и методички",
      "Сертификат об обучении",
      "Кофе-брейки и обеды",
      "Поддержка после курса"
    ],
    faq: [
      {
        question: "Подойдет ли курс, если я никогда не работал в CAD-программах?",
        answer: "Да, курс разработан с учетом разного уровня подготовки. Первый день полностью посвящен основам работы в программе."
      },
      {
        question: "Смогу ли я практиковаться после курса?",
        answer: "Мы предоставляем доступ к демо-версии программы и учебным материалам для самостоятельной практики."
      },
      {
        question: "Есть ли поддержка после обучения?",
        answer: "Да, все участники получают доступ к закрытому чату с преподавателем для консультаций в течение месяца после курса."
      }
    ]
  },
  {
    id: 3,
    title: "CAD/CAM School: полный цикл цифрового производства",
    date: "19-24 января 2025",
    location: "Москва",
    format: "Практика",
    price: 70000,
    lecturer: "Команда тренеров Артикон",
    lecturerBio: "Квалифицированные зубные техники производства Артикон: Григорий Сулима (тренер SUM3D, MillBox), Ислам Гашимов (тренер exocad и Medit), Шамиль Магомедов (тренер Contrast Dental Direkt, MIYO).",
    category: "CAD/CAM",
    duration: "6 дней (48 часов)",
    description: "Недельное погружение в полный цикл CAD/CAM на действующем производстве. Мировой опыт индустрии для ваших профессиональных достижений. Практика на передовом оборудовании под руководством специалистов крупнейшей цифровой лаборатории России.",
    goal: "Освоить все этапы цифрового производства зуботехнических конструкций — от сканирования до финишной обработки — и уверенно применять полученные навыки в работе.",
    targetAudience: [
      "Зубные техники, начинающие работу с цифровыми технологиями",
      "Специалисты лабораторий, внедряющих CAD/CAM",
      "Владельцы и руководители зуботехнических лабораторий",
      "Техники, желающие освоить полный производственный цикл"
    ],
    skills: [
      "Сканирование работ на культях, имплантатах, под культевые вкладки",
      "Моделирование в exocad: коронки, мосты, винтовая фиксация",
      "Работа с ПО MillBox: размещение работ, расстановка коннекторов",
      "Фрезерование на оборудовании imes-icore",
      "3D-печать: подготовка файлов, печать моделей, постобработка",
      "Синтеризация циркония: выбор программ для разных конструкций",
      "Индивидуализация: окрашивание, жидкая керамика, глазурь"
    ],
    program: [
      "День 1: Сканирование — работы на культях, имплантатах, диагностические модели",
      "День 2: Моделирование в exocad — одиночные коронки, построение моделей для 3D-печати",
      "День 3: Моделирование — мостовидные протезы на винтовой фиксации",
      "День 4: Фрезерование — работа с MillBox, размещение в диске, фрезеровка",
      "День 5: 3D-печать и синтеризация — печать моделей, работа с печами",
      "День 6: Обработка и индивидуализация — окрашивание, финишная обработка"
    ],
    includes: [
      "Все учебные материалы и методички",
      "Сертификат об обучении (возможность получить баллы НМО)",
      "Кофе-брейки и обеды каждый день",
      "Практика на реальном производстве",
      "Поддержка от преподавателей после курса"
    ],
    faq: [
      {
        question: "Сколько человек в группе?",
        answer: "Количество мест в потоке ограничено для обеспечения максимального внимания каждому участнику и возможности практики на оборудовании."
      },
      {
        question: "Где проходит обучение?",
        answer: "Обучение проходит на производстве Артикон — самой цифровой лаборатории России, работающей на рынке с 2010 года. Адрес: Москва, Варшавское шоссе, д. 33к12."
      },
      {
        question: "Можно ли получить баллы НМО?",
        answer: "Да, курс аккредитован. Чтобы получить баллы НМО, сообщите менеджеру Артикон при регистрации."
      }
    ]
  },
  {
    id: 4,
    title: "Одномоментная имплантация и немедленная нагрузка",
    date: "12 марта 2025",
    location: "Москва",
    format: "Практика",
    price: 35000,
    lecturer: "Козлов Д.Н.",
    lecturerBio: "Хирург-имплантолог, челюстно-лицевой хирург. Более 3000 установленных имплантатов. Специализируется на немедленной нагрузке и сложных клинических случаях.",
    category: "Хирургия",
    duration: "1 день (8 часов)",
    description: "Практический курс для хирургов-имплантологов по протоколам одномоментной имплантации и техникам немедленной нагрузки.",
    goal: "Освоить современные протоколы одномоментной имплантации с немедленной нагрузкой и научиться правильно отбирать пациентов для данных методик.",
    targetAudience: [
      "Хирурги-имплантологи",
      "Стоматологи-хирурги, осваивающие имплантацию",
      "Челюстно-лицевые хирурги"
    ],
    skills: [
      "Оценка показаний и противопоказаний",
      "Планирование хирургического вмешательства",
      "Техника одномоментной имплантации",
      "Протоколы немедленной нагрузки",
      "Изготовление временных конструкций"
    ],
    program: [
      "Показания и противопоказания",
      "Планирование хирургического вмешательства",
      "Выбор имплантационной системы",
      "Техника операции",
      "Изготовление временных конструкций",
      "Разбор клинических случаев"
    ],
    includes: [
      "Учебные материалы",
      "Сертификат",
      "Обед"
    ],
    faq: [
      {
        question: "Будет ли практика на пациентах?",
        answer: "Курс включает демонстрацию операции и работу на моделях. Практика на пациентах не предусмотрена."
      },
      {
        question: "Какие имплантационные системы рассматриваются?",
        answer: "Мы рассматриваем общие принципы, применимые к большинству систем, с акцентом на Straumann и Nobel Biocare."
      },
      {
        question: "Нужен ли опыт в имплантации?",
        answer: "Рекомендуется базовый опыт установки имплантатов. Курс ориентирован на практикующих специалистов."
      }
    ]
  },
  {
    id: 5,
    title: "Дентальный фотопротокол",
    date: "20 марта 2025",
    location: "Москва",
    format: "Практика",
    price: 25000,
    lecturer: "Смирнова Е.В.",
    lecturerBio: "Стоматолог-ортопед, специалист по дентальной фотографии. Автор курсов по фотопротоколу. Более 500 обученных специалистов.",
    category: "Фотография",
    duration: "1 день (8 часов)",
    description: "Научитесь делать качественные дентальные фотографии для документации, планирования лечения и коммуникации с лабораторией.",
    goal: "Освоить технику дентальной фотографии для создания качественной документации и эффективной коммуникации с лабораторией.",
    targetAudience: [
      "Врачи-стоматологи всех специальностей",
      "Ассистенты стоматолога",
      "Зубные техники"
    ],
    skills: [
      "Настройка камеры и вспышки для дентальной съемки",
      "Выполнение стандартных ракурсов",
      "Работа с ретракторами и зеркалами",
      "Базовая обработка фотографий"
    ],
    program: [
      "Выбор оборудования",
      "Настройки камеры и вспышки",
      "Стандартные ракурсы",
      "Работа с ретракторами и зеркалами",
      "Практика съемки",
      "Базовая обработка фотографий"
    ],
    includes: [
      "Методические материалы",
      "Сертификат",
      "Кофе-брейк"
    ],
    faq: [
      {
        question: "Нужно ли приносить свою камеру?",
        answer: "Желательно, но не обязательно. На курсе есть камеры для практики. Если у вас есть своя камера — приносите, мы поможем её настроить."
      },
      {
        question: "Какую камеру вы рекомендуете для начинающих?",
        answer: "Мы рассмотрим разные варианты на курсе — от бюджетных до профессиональных. Дадим конкретные рекомендации по вашему бюджету."
      },
      {
        question: "Подойдет ли смартфон для дентальной фотографии?",
        answer: "Для базовой документации — да, с определенными ограничениями. На курсе мы также рассмотрим возможности мобильной фотографии."
      }
    ]
  },
  {
    id: 6,
    title: "Диагностические возможности КЛКТ",
    date: "5 апреля 2025",
    location: "Онлайн",
    format: "Вебинар",
    price: 5000,
    lecturer: "Белов А.И.",
    lecturerBio: "Рентгенолог, специалист по КТ-диагностике в стоматологии. Опыт анализа более 10 000 КЛКТ-исследований.",
    category: "Диагностика",
    duration: "3 часа",
    description: "Вебинар посвящен работе с конусно-лучевой компьютерной томографией. Научитесь анализировать снимки и использовать данные для планирования.",
    goal: "Научиться самостоятельно анализировать КЛКТ-снимки для диагностики и планирования стоматологического лечения.",
    targetAudience: [
      "Врачи-стоматологи всех специальностей",
      "Хирурги-имплантологи",
      "Ортодонты"
    ],
    skills: [
      "Анализ анатомических структур на КЛКТ",
      "Диагностика патологий челюстно-лицевой области",
      "Планирование имплантации по КЛКТ",
      "Измерения и разметка в программах просмотра"
    ],
    program: [
      "Принципы КЛКТ",
      "Анатомия на КЛКТ",
      "Диагностика патологий",
      "Планирование имплантации"
    ],
    includes: [
      "Запись вебинара",
      "Электронный сертификат"
    ],
    faq: [
      {
        question: "Какая программа нужна для просмотра КЛКТ?",
        answer: "Мы рассмотрим работу в бесплатных программах, которые вы сможете использовать в своей практике."
      },
      {
        question: "Будет ли запись вебинара?",
        answer: "Да, все зарегистрированные участники получат доступ к записи вебинара на 30 дней."
      },
      {
        question: "Нужны ли специальные знания для участия?",
        answer: "Базовые знания анатомии челюстно-лицевой области. Вебинар подходит для специалистов любого уровня."
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
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Записаться на курс
            </Button>
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
