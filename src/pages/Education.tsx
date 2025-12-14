import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
  Users,
  Award,
  BookOpen,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import orthoLogo from "@/assets/ortho-logo.png";

const upcomingCourses = [
  {
    id: 1,
    title: "Цифровое планирование в ортодонтии",
    date: "20-21 января 2025",
    location: "Москва",
    format: "Практика",
    price: 45000,
    lecturer: "Д-р Иванов А.С.",
  },
  {
    id: 2,
    title: "Exocad: от новичка до профессионала",
    date: "5-7 февраля 2025",
    location: "Москва",
    format: "Практика",
    price: 65000,
    lecturer: "Петров В.А.",
  },
  {
    id: 3,
    title: "3D-моделирование в зуботехнике",
    date: "15 февраля 2025",
    location: "Онлайн",
    format: "Вебинар",
    price: 5000,
    lecturer: "Сидорова М.К.",
  },
];

const categories = [
  {
    title: "Для врачей",
    items: ["Ортопедия", "Ортодонтия", "Цифровое планирование", "Дентальный фотопротокол"],
  },
  {
    title: "Для техников",
    items: ["CAD/CAM (Exocad)", "3D-моделирование", "Цифровая ортодонтия"],
  },
];

const advantages = [
  {
    icon: Users,
    title: "Практикующие преподаватели",
    description:
      "Все преподаватели — специалисты, которые работают в лаборатории и применяют технологии, которым обучают",
  },
  {
    icon: Award,
    title: "Современное оборудование",
    description:
      "Обучение проходит на том же оборудовании, которое используется в нашей лаборатории",
  },
  {
    icon: BookOpen,
    title: "Практическая направленность",
    description:
      "Все курсы максимально практичны и основаны на реальных клинических кейсах",
  },
];

const stats = [
  { value: "2000+", label: "обученных специалистов" },
  { value: "10+", label: "лет опыта в обучении" },
  { value: "30+", label: "авторских курсов" },
];

const Education = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 gradient-education overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-background blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-education-foreground mb-6">
              ARTICON Учебный центр
            </h1>
            <p className="text-xl text-education-foreground/80 mb-4">
              в сфере цифровой стоматологии
            </p>
            <p className="text-lg text-education-foreground/70 mb-8 max-w-2xl">
              Для врачей и зубных техников, влюблённых в профессию. Обучаем
              цифровым протоколам, которые применяем ежедневно.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-background text-education hover:bg-background/90 px-8"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Календарь курсов
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-education-foreground/30 text-education-foreground hover:bg-education-foreground/10"
              >
                Подписаться на рассылку
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-background/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Courses */}
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
                className="bg-card border border-border rounded-2xl overflow-hidden hover-lift"
              >
                {/* Header */}
                <div className="gradient-education p-4">
                  <div className="flex items-center gap-2 text-education-foreground/80 text-sm mb-2">
                    <Calendar className="h-4 w-4" />
                    {course.date}
                  </div>
                  <h3 className="text-lg font-bold text-education-foreground">
                    {course.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {course.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Video className="h-4 w-4" />
                      {course.format}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {course.lecturer}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                      {course.price.toLocaleString("ru-RU")} ₽
                    </span>
                    <Button size="sm" className="gradient-primary text-primary-foreground">
                      Подробнее
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Направления обучения
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i}>
                      <Link
                        to="/education/calendar"
                        className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                      >
                        <ArrowRight className="h-4 w-4 text-primary" />
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Почему выбирают наш учебный центр?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-2xl gradient-education flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-education-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{advantage.title}</h3>
                  <p className="text-muted-foreground">{advantage.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ortho Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={orthoLogo}
                alt="Ortho by Articon"
                className="h-20 mb-6"
              />
              <h2 className="text-3xl font-bold mb-6">
                Цифровая ортодонтия от Articon
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Специализированное направление по производству элайнеров,
                ретейнеров и ортодонтических аппаратов с использованием
                передовых цифровых технологий.
              </p>
              <Button className="gradient-ortho text-ortho-foreground">
                Узнать подробнее
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl bg-ortho/10 flex items-center justify-center border border-ortho/20">
                <span className="text-ortho/40">Видео о направлении Ortho</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-education">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-education-foreground mb-4">
            Подпишитесь на рассылку
          </h2>
          <p className="text-education-foreground/80 mb-8 max-w-xl mx-auto">
            Получайте информацию о новых курсах, мастер-классах и специальных
            предложениях первыми
          </p>
          <Button size="lg" className="bg-background text-education hover:bg-background/90">
            Подписаться
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Education;
