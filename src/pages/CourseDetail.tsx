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
  FileText,
  CheckCircle2
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Course {
  id: number;
  title: string;
  date: string;
  location: string;
  format: string;
  price: number;
  lecturer: string;
  category: string;
  duration: string;
  description: string;
  program: string[];
  includes: string[];
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
    category: "Ортодонтия",
    duration: "2 дня (16 часов)",
    description: "Комплексный курс по цифровому планированию ортодонтического лечения. Вы научитесь работать с современными программами для планирования перемещения зубов, создавать виртуальные сетапы и проводить анализ клинических случаев.",
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
    category: "CAD/CAM",
    duration: "3 дня (24 часа)",
    description: "Интенсивный курс по работе в программе Exocad. Курс охватывает все аспекты работы: от базового моделирования до сложных ортопедических конструкций. Подходит как для начинающих, так и для практикующих специалистов.",
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
    ]
  },
  {
    id: 3,
    title: "3D-моделирование в зуботехнике",
    date: "15 февраля 2025",
    location: "Онлайн",
    format: "Вебинар",
    price: 5000,
    lecturer: "Сидорова М.К.",
    category: "3D-моделирование",
    duration: "4 часа",
    description: "Вводный вебинар по основам 3D-моделирования для зубных техников. Познакомитесь с современными технологиями и программами, узнаете о перспективах цифрового производства в стоматологии.",
    program: [
      "Обзор CAD/CAM технологий",
      "Популярные программы для моделирования",
      "Демонстрация рабочего процесса",
      "Ответы на вопросы"
    ],
    includes: [
      "Запись вебинара",
      "Электронный сертификат"
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
    category: "Хирургия",
    duration: "1 день (8 часов)",
    description: "Практический курс для хирургов-имплантологов. Рассмотрим протоколы одномоментной имплантации, критерии отбора пациентов и техники немедленной нагрузки.",
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
    category: "Фотография",
    duration: "1 день (8 часов)",
    description: "Научитесь делать качественные дентальные фотографии для документации, планирования лечения и коммуникации с лабораторией. Разберем настройки камеры, освещение и обработку снимков.",
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
    category: "Диагностика",
    duration: "3 часа",
    description: "Вебинар посвящен работе с конусно-лучевой компьютерной томографией. Научитесь анализировать КЛКТ снимки, определять патологии и использовать данные для планирования лечения.",
    program: [
      "Принципы КЛКТ",
      "Анатомия на КЛКТ",
      "Диагностика патологий",
      "Планирование имплантации"
    ],
    includes: [
      "Запись вебинара",
      "Электронный сертификат"
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

      <div className="container mx-auto px-4 py-8">
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
                  Практикующий специалист с многолетним опытом работы в области {course.category.toLowerCase()}. 
                  Проводит обучение для врачей и зубных техников по всей России.
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
                    {course.location}, ул. Примерная, д. 1, офис 100
                  </p>
                  <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="bg-primary/10 rounded-2xl p-8 text-center mb-12">
          <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Остались вопросы?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Свяжитесь с нами для получения дополнительной информации о курсе или помощи с регистрацией.
          </p>
          <Button variant="outline">Связаться с нами</Button>
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
                      {relCourse.date}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">
                        {formatPrice(relCourse.price)}
                      </span>
                      <span className="text-sm text-muted-foreground">{relCourse.format}</span>
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
