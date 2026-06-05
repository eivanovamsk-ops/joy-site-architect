import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar, MapPin, Video, Users, Award } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { courses, sectionTags, SectionTag } from "@/data/courses";

const sectionConfig: Record<string, {
  sectionTag: SectionTag;
  subsectionTag: SectionTag;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
}> = {
  "doctors-orthopedics": {
    sectionTag: "для врачей",
    subsectionTag: "ортопедия",
    title: "Ортопедия для врачей",
    description: "Практические курсы по ортопедической стоматологии: цифровые протоколы, навигационная хирургия, интраоральное сканирование",
    metaTitle: "Курсы по ортопедии для врачей | Учебный центр Артикон",
    metaDescription: "Курсы по ортопедической стоматологии для врачей: навигационная хирургия, цифровой ортопедический протокол, интраоральное сканирование. Москва, Артикон.",
  },
  "doctors-orthodontics": {
    sectionTag: "для врачей",
    subsectionTag: "ортодонтия",
    title: "Ортодонтия для врачей",
    description: "Курсы по ортодонтии: элайнеры, расширяющие аппараты, мини-имплантаты, конференции",
    metaTitle: "Курсы по ортодонтии для врачей | Учебный центр Артикон",
    metaDescription: "Курсы по ортодонтии для врачей: элайнеры Maestro 3D, непрямая фиксация брекетов, планирование SARPE/MARPE. Москва, Артикон.",
  },
  "technicians-cadcam": {
    sectionTag: "для техников",
    subsectionTag: "CAD/CAM",
    title: "CAD/CAM для техников",
    description: "Курсы по цифровым технологиям: моделирование, фрезерование, 3D-печать, окрашивание",
    metaTitle: "Курсы CAD/CAM для зубных техников | Учебный центр Артикон",
    metaDescription: "Курсы CAD/CAM для зубных техников: exocad, MillBox, фрезерование, 3D-печать, окрашивание циркония. Москва, Артикон.",
  },
  "technicians-orthodontics": {
    sectionTag: "для техников",
    subsectionTag: "ортодонтия",
    title: "Ортодонтия для техников",
    description: "Курсы по цифровой ортодонтии для зубных техников: моделирование аппаратов, элайнеры, ORTHO Skills",
    metaTitle: "Курсы по ортодонтии для зубных техников | Учебный центр Артикон",
    metaDescription: "Курсы по ортодонтии для зубных техников: моделирование аппаратов в EXOCAD, элайнеры, ORTHO Skills. Москва, Артикон.",
  },
};

const EducationSection = () => {
  const { section } = useParams<{ section: string }>();
  const config = section ? sectionConfig[section] : undefined;

  const filteredCourses = useMemo(() => {
    if (!config) return [];
    return courses
      .filter(course => 
        course.sectionTags?.includes(config.sectionTag) && 
        course.sectionTags?.includes(config.subsectionTag)
      )
      .sort((a, b) => {
        const isArchivedA = a.id === 23 || a.id === 19 || a.id === 25 || a.id === 11 || a.id === 21 || a.id === 10 || a.id === 22;
        const isArchivedB = b.id === 23 || b.id === 19 || b.id === 25 || b.id === 11 || b.id === 21 || b.id === 10 || b.id === 22;
        if (isArchivedA && !isArchivedB) return 1;
        if (!isArchivedA && isArchivedB) return -1;
        const isLastA = a.isComingSoon;
        const isLastB = b.isComingSoon;
        if (isLastA && !isLastB) return 1;
        if (!isLastA && isLastB) return -1;
        return a.dateStart.getTime() - b.dateStart.getTime();
      });
  }, [config]);

  if (!config) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Раздел не найден</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{config.metaTitle}</title>
        <meta name="description" content={config.metaDescription} />
        <link rel="canonical" href={`https://articon.pro/education/${section}`} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{config.title}</h1>
            <p className="text-muted-foreground text-lg">{config.description}</p>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Link
                  key={course.id + "-" + course.slug}
                  to={course.externalUrl || `/education/course/${course.id}`}
                  className={`bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all group block ${(course.id === 23 || course.id === 19 || course.id === 25 || course.id === 11 || course.id === 21 || course.id === 22) ? "opacity-70" : ""}`}
                >
                  {course.coverImage && (
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={course.coverImage}
                        alt={course.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <Badge className="bg-primary/90 text-primary-foreground text-xs">
                          {course.category}
                        </Badge>
                        {course.isAccredited && (
                          <Badge className="bg-green-600/90 text-white text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            НМО
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4" />
                      {(course.id === 23 || course.id === 19 || course.id === 25 || course.id === 11 || course.id === 21 || course.id === 22) ? (
                        <Badge variant="secondary" className="text-xs font-medium">УЖЕ ПРОШЕЛ</Badge>
                      ) : course.isComingSoon ? (
                        <Badge variant="secondary" className="text-xs font-medium">{course.comingSoonLabel || "Уже скоро"}</Badge>
                      ) : (
                        course.date
                      )}
                    </div>
                    {course.upcomingDates && course.upcomingDates.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2 ml-6">
                        {course.upcomingDates.map((ud, i) => (
                          <span key={i} className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                            {ud.date}
                          </span>
                        ))}
                      </div>
                    )}

                    <h3 className="text-lg font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>

                    {course.subtitle && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {course.subtitle}
                      </p>
                    )}

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="line-clamp-1">{course.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Video className="h-4 w-4 flex-shrink-0" />
                        {course.format}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div>
                        <span className="text-xl font-bold text-primary">
                          {course.price === 0 ? "Бесплатно" : `${course.price.toLocaleString("ru-RU")} ₽`}
                        </span>
                        {course.originalPrice && course.originalPrice > course.price && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            {course.originalPrice.toLocaleString("ru-RU")} ₽
                          </span>
                        )}
                      </div>
                      <Button size="sm" variant="outline">Подробнее</Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Курсы в этом разделе скоро появятся</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EducationSection;
