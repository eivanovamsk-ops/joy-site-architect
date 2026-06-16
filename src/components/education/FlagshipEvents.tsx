import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight, Sparkles, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courses, type Course } from "@/data/courses";

export const FLAGSHIP_EVENT_IDS = [21, 22, 37, 41, 42, 43];

function FlagshipCard({ course, archive = false }: { course: Course; archive?: boolean }) {
  const isClosed = /закрыт/i.test(course.format);
  const label = isClosed ? "ЗАКРЫТОЕ СОБЫТИЕ" : "КОНФЕРЕНЦИЯ";

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-card hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.35)]">
      <div className="grid md:grid-cols-2 min-h-[320px]">
        {/* Image */}
        <div className="relative h-56 md:h-full overflow-hidden">
          {course.coverImage ? (
            <img
              src={course.coverImage}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full gradient-primary" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase bg-primary text-primary-foreground shadow-lg">
              <Sparkles className="h-3 w-3" />
              {label}
            </span>
          </div>
          {archive && (
            <div className="absolute bottom-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/15 backdrop-blur text-white border border-white/20">
                Архив
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            {course.subtitle && (
              <p className="text-muted-foreground mb-5 line-clamp-3">
                {course.subtitle}
              </p>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                {course.date}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {course.location}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            {!archive ? (
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-muted-foreground">от</span>
                <span className="text-2xl font-bold text-primary">
                  {course.price.toLocaleString("ru-RU")} ₽
                </span>
              </div>
            ) : (
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Фото и видео отчёт
              </span>
            )}
            <Link to={`/education/course/${course.id}`}>
              <Button className="gap-2 gradient-primary text-primary-foreground">
                {archive ? "Итоги и фотоотчёт" : "Подробнее"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function FlagshipEvents() {
  const upcoming = courses
    .filter((c) => [37, 41].includes(c.id))
    .sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());

  const past = courses
    .filter((c) => [21, 22, 42, 43].includes(c.id))
    .sort((a, b) => b.dateStart.getTime() - a.dateStart.getTime());

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
            Флагманские проекты
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Флагманские события и конференции
          </h2>
          <p className="text-muted-foreground text-lg">
            Главные встречи отрасли — закрытые разборы, конференции и
            бизнес-события Артикон.
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-8 bg-muted/50">
            <TabsTrigger value="upcoming" className="px-6">
              Предстоящие
            </TabsTrigger>
            <TabsTrigger value="past" className="px-6">
              Прошедшие
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-0">
            <div className="grid gap-6 lg:gap-8">
              {upcoming.map((c) => (
                <FlagshipCard key={c.id} course={c} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-0">
            <div className="grid gap-6 lg:gap-8">
              {past.map((c) => (
                <FlagshipCard key={c.id} course={c} archive />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
