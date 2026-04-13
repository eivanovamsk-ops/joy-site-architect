import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Monitor, Video, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/data/courses";

export function EducationUpcomingCourses() {
  // Sort courses by date and get upcoming ones (limit to 6)
  const upcomingCourses = courses
    .filter(course => course.id !== 23 && course.id !== 18 && course.dateStart >= new Date())
    .sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime())
    .slice(0, 6);

  // If no upcoming courses, show all courses sorted by date
  const displayCourses = upcomingCourses.length > 0 
    ? upcomingCourses 
    : courses.slice(0, 6);

  const regularCourses = displayCourses.slice(0, 6);

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
          {regularCourses.map((course) => (
            <div
              key={course.id}
              className="bg-card border border-border rounded-2xl overflow-hidden hover-lift group"
            >
              {/* Cover Image */}
              {course.coverImage && (
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-bold text-white line-clamp-2 drop-shadow-md">
                      {course.title}
                    </h3>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    {course.price === 0 && (
                      <span className="text-xs bg-green-500/90 text-white px-2 py-1 rounded-full font-medium">
                        Бесплатно
                      </span>
                    )}
                    {course.location === "Онлайн" && (
                      <span className="text-xs bg-primary/90 text-white px-2 py-1 rounded-full font-medium">
                        Онлайн
                      </span>
                    )}
                    <span className="text-xs bg-white/90 text-foreground px-2 py-1 rounded-full font-medium">
                      {course.category}
                    </span>
                  </div>
                </div>
              )}

              {/* Header (fallback without image) */}
              {!course.coverImage && (
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
              )}

              {/* Content */}
              <div className="p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    {course.date}
                  </div>
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

