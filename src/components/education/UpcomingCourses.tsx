import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Monitor, Video, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/data/courses";

export function EducationUpcomingCourses() {
  // Sort courses by date and get upcoming ones (limit to 6)
  const upcomingCourses = courses
    .filter(course => course.dateStart >= new Date())
    .sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime())
    .slice(0, 6);

  // If no upcoming courses, show all courses sorted by date
  const displayCourses = upcomingCourses.length > 0 
    ? upcomingCourses 
    : courses.slice(0, 6);

  const regularCourses = displayCourses.slice(0, 5);

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
          <Link
            to="/education/webinar/zircon-march-2026"
            className="bg-card border-2 border-accent/40 rounded-2xl overflow-hidden hover-lift group"
          >
            <div className="relative h-full flex flex-col">
              <div className="relative h-52 overflow-hidden">
                <img
                  src="/images/webinar/cover-zircon-banner.png"
                  alt="Баннер вебинара Лайфхаки в работе с цирконом"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
                  <Badge className="bg-accent text-accent-foreground text-xs font-semibold">
                    Бесплатный вебинар
                  </Badge>
                  <Badge className="bg-destructive text-destructive-foreground text-xs">
                    LIVE
                  </Badge>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  26 марта 2026 | 16:00
                </div>

                <h3 className="text-lg font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                  Лайфхаки в работе с цирконом
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  Практические приемы окрашивания, обжига и стабильной эстетики.
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Monitor className="h-4 w-4 flex-shrink-0" />
                    Онлайн
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 flex-shrink-0" />
                    Виктория Никулина
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xl font-bold text-primary">Бесплатно</span>
                  <Button size="sm" className="gradient-primary text-primary-foreground">
                    Подробнее
                  </Button>
                </div>
              </div>
            </div>
          </Link>

          {regularCourses.map((course) => (
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
                  {course.upcomingDates && course.upcomingDates.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {course.upcomingDates.map((ud, i) => (
                        <span key={i} className="text-xs bg-education-foreground/10 text-education-foreground/70 rounded-full px-2 py-0.5">
                          {ud.date}
                        </span>
                      ))}
                    </div>
                  )}
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
                    {course.lecturers[0]?.name || "Эксперты Артикон"}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    {course.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {course.originalPrice.toLocaleString("ru-RU")} ₽
                      </span>
                    )}
                    <span className="text-xl font-bold text-primary">
                      {course.price.toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
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

