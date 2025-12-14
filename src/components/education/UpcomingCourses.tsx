import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Video, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Course {
  id: number;
  title: string;
  date: string;
  location: string;
  format: string;
  price: number;
  lecturer: string;
  category: string;
}

const upcomingCourses: Course[] = [
  {
    id: 1,
    title: "Цифровое планирование в ортодонтии",
    date: "20-21 января 2025",
    location: "Москва",
    format: "Практика",
    price: 45000,
    lecturer: "Д-р Иванов А.С.",
    category: "Ортодонтия",
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
  },
];

export function EducationUpcomingCourses() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Ближайшие курсы и события
          </h2>
          <Link
            to="/education/calendar"
            className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all"
          >
            Весь календарь <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingCourses.map((course) => (
            <div
              key={course.id}
              className="bg-card border border-border rounded-2xl overflow-hidden hover-lift group"
            >
              {/* Header */}
              <div className="gradient-education p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-education-foreground/80 text-sm">
                    <Calendar className="h-4 w-4" />
                    {course.date}
                  </div>
                  <span className="text-xs bg-education-foreground/20 text-education-foreground px-2 py-1 rounded-full">
                    {course.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-education-foreground line-clamp-2">
                  {course.title}
                </h3>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    {course.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Video className="h-4 w-4 flex-shrink-0" />
                    {course.format}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 flex-shrink-0" />
                    {course.lecturer}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xl font-bold text-primary">
                    {course.price.toLocaleString("ru-RU")} ₽
                  </span>
                  <Link to={`/education/course/${course.id}`}>
                    <Button size="sm" className="gradient-primary text-primary-foreground">
                      Подробнее
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
