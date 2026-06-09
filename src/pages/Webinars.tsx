import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Monitor, ArrowRight } from "lucide-react";

const webinars = [
  {
    slug: "aligners-maestro-may-2026",
    title: "Элайнеры в Maestro 3D: первые шаги",
    description: "Пошаговый алгоритм для врачей-ортодонтов и зубных техников. Как начать планировать лечение на элайнерах в Maestro 3D Ortho Studio V6 без страха перед CAD-программами.",
    date: "29 мая 2026",
    time: "19:00 МСК",
    format: "Онлайн",
    badge: "Бесплатно",
    status: "upcoming" as const,
    image: "/images/webinar/cover-aligners.webp",
  },
  {
    slug: "printer-3d-july-2026",
    title: "Идеальная посадка без перепечаток",
    description: "Как выявить и устранить скрытые причины потери точности в DLP/LCD/MSLA-печати. Системный алгоритм диагностики 3D-принтера для зубных техников и операторов 3D-печати.",
    date: "18 июля 2026",
    time: "17:00 МСК",
    format: "Онлайн",
    badge: "Бесплатно",
    status: "upcoming" as const,
    image: "/__l5e/assets-v1/9edc8b02-5acc-4719-9ebb-2eae21df30d0/hg-printer-hero.jpg",
  },
  {
    slug: "brackets-march-2026",
    title: "Брекет-системы",
    description: "Современные подходы к работе с брекет-системами: от планирования до фиксации. Разбор реальных клинических кейсов.",
    date: "5 июня 2026",
    time: "17:00 МСК",
    format: "Онлайн",
    badge: "Уже прошёл",
    status: "past" as const,
    image: "/images/webinar/cover.webp",
  },
  {
    slug: "zircon-march-2026",
    title: "Лайфхаки в работе с цирконом",
    description: "Практические лайфхаки работы с диоксидом циркония: как избежать ошибок, добиться стабильного оттенка и сократить количество переделок.",
    date: "14 апреля 2026",
    time: "19:00 МСК",
    format: "Онлайн",
    badge: "Уже прошёл",
    status: "past" as const,
    image: "/images/webinar/cover-zircon-banner.webp",
  },
];

export default function Webinars() {
  return (
    <Layout>
      <Helmet>
        <title>Вебинары — Учебный центр Articon</title>
        <meta name="description" content="Бесплатные вебинары от учебного центра Articon для зубных техников и стоматологов." />
      </Helmet>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Вебинары</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Бесплатные онлайн-вебинары от экспертов Articon. Практика, разбор кейсов и ответы на вопросы в прямом эфире.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {webinars.map((w) => (
              <Link
                key={w.slug}
                to={`/education/webinar/${w.slug}`}
                className="group block rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={w.image}
                    alt={w.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="secondary" className="text-xs">{w.badge}</Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <Monitor className="h-3 w-3" />
                      {w.format}
                    </Badge>
                  </div>

                  <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {w.title}
                  </h2>

                  <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                    {w.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {w.date}
                      </span>
                      {w.time && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {w.time}
                        </span>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Подробнее <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}