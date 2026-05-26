import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Video, Users, Filter, X, Search, Award, Tag, Monitor } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { courses, getUniqueLecturers, sectionTags, SectionTag } from "@/data/courses";
import { cn } from "@/lib/utils";

const CourseCalendar = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все разделы");
  const [selectedLecturer, setSelectedLecturer] = useState("Все лекторы");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSectionTags, setSelectedSectionTags] = useState<SectionTag[]>([]);

  const uniqueLecturers = useMemo(() => getUniqueLecturers(), []);

  const toggleSectionTag = (tag: SectionTag) => {
    setSelectedSectionTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const calendarSections = [
    { label: "Все разделы", tags: [] as SectionTag[] },
    { label: "Ортопедия (врачи)", tags: ["для врачей", "ортопедия"] as SectionTag[] },
    { label: "Ортодонтия (врачи)", tags: ["для врачей", "ортодонтия"] as SectionTag[] },
    { label: "CAD/CAM (техники)", tags: ["для техников", "CAD/CAM"] as SectionTag[] },
    { label: "Ортодонтия (техники)", tags: ["для техников", "ортодонтия"] as SectionTag[] },
  ];

  const filteredCourses = useMemo(() => {
    const filtered = courses.filter((course) => {
      if (course.id === 13 || course.id === 23 || course.id === 25 || course.id === 10) return false;
      const selectedSection = calendarSections.find(s => s.label === selectedCategory);
      const matchesCategory =
        selectedCategory === "Все разделы" ||
        (selectedSection && selectedSection.tags.every(tag => course.sectionTags?.includes(tag)));
      const matchesDate =
        !selectedDate ||
        (course.dateStart.getMonth() === selectedDate.getMonth() &&
          course.dateStart.getFullYear() === selectedDate.getFullYear());
      const matchesSearch =
        !searchQuery ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLecturer =
        selectedLecturer === "Все лекторы" ||
        course.lecturers.some(l => l.name === selectedLecturer);
      const matchesSectionTags =
        selectedSectionTags.length === 0 ||
        selectedSectionTags.every(tag => course.sectionTags?.includes(tag));

      return matchesCategory && matchesDate && matchesSearch && matchesLecturer && matchesSectionTags;
    });

    // Sort: archived (id 19), isComingSoon courses and specific titles go to the end
    return filtered.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      const isArchivedA = a.id === 19 || a.id === 11 || a.id === 21;
      const isArchivedB = b.id === 19 || b.id === 11 || b.id === 21;
      if (isArchivedA && !isArchivedB) return 1;
      if (!isArchivedA && isArchivedB) return -1;
      const isLastA = a.isComingSoon || titleA.includes('менеджмент') || titleA.includes('сканирование по запросу') || titleA.includes('интраоральное сканирование');
      const isLastB = b.isComingSoon || titleB.includes('менеджмент') || titleB.includes('сканирование по запросу') || titleB.includes('интраоральное сканирование');
      
      if (isLastA && !isLastB) return 1;
      if (!isLastA && isLastB) return -1;
      // Within same group, sort by date
      return a.dateStart.getTime() - b.dateStart.getTime();
    });
  }, [selectedCategory, selectedDate, searchQuery, selectedLecturer, selectedSectionTags]);

  const clearFilters = () => {
    setSelectedCategory("Все разделы");
    setSelectedLecturer("Все лекторы");
    setSelectedDate(undefined);
    setSearchQuery("");
    setSelectedSectionTags([]);
  };

  const hasActiveFilters =
    selectedCategory !== "Все разделы" ||
    selectedLecturer !== "Все лекторы" ||
    selectedDate !== undefined ||
    searchQuery !== "" ||
    selectedSectionTags.length > 0;

  const courseDates = courses.map((c) => c.dateStart);

  const formatPrice = (price: number, originalPrice?: number) => {
    if (price === 0) return "Бесплатно";
    return (
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-primary">
          {price.toLocaleString("ru-RU")} ₽
        </span>
        {originalPrice && originalPrice > price && (
          <span className="text-sm text-muted-foreground line-through">
            {originalPrice.toLocaleString("ru-RU")} ₽
          </span>
        )}
      </div>
    );
  };

  return (
    <Layout>
      <Helmet>
        <title>Календарь курсов | Учебный центр Артикон</title>
        <meta name="description" content="Расписание курсов Артикон: CAD/CAM, ортодонтия, эстетика, 3D-печать. Практическое обучение от ведущих специалистов. Записывайтесь онлайн." />
        <link rel="canonical" href="https://articon.pro/education/calendar" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Календарь курсов
            </h1>
            <p className="text-muted-foreground text-lg">
              Выберите интересующий курс и запишитесь на обучение
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Поиск по названию курса..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base bg-card border-border"
            />
          </div>

          {/* Filters */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-primary" />
              <span className="font-semibold">Фильтры</span>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="ml-auto text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4 mr-1" />
                  Сбросить
                </Button>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Category/Section Filter */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Раздел
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {calendarSections.map((s) => (
                      <SelectItem key={s.label} value={s.label}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Lecturer Filter */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Лектор
                </label>
                <Select
                  value={selectedLecturer}
                  onValueChange={setSelectedLecturer}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="Все лекторы">Все лекторы</SelectItem>
                    {uniqueLecturers.map((lecturer) => (
                      <SelectItem key={lecturer} value={lecturer}>
                        {lecturer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Filter */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Месяц
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-background",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {selectedDate
                        ? format(selectedDate, "LLLL yyyy", { locale: ru })
                        : "Выберите месяц"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
                    <CalendarUI
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="pointer-events-auto"
                      modifiers={{
                        hasCourse: courseDates,
                      }}
                      modifiersStyles={{
                        hasCourse: {
                          fontWeight: "bold",
                          backgroundColor: "hsl(var(--primary) / 0.1)",
                          color: "hsl(var(--primary))",
                        },
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Section Tags */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">По разделам</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {sectionTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => toggleSectionTag(tag.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium border transition-all",
                      selectedSectionTags.includes(tag.id)
                        ? tag.color + " border-current"
                        : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
                    )}
                  >
                    #{tag.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Найдено курсов:{" "}
              <span className="font-semibold text-foreground">
                {filteredCourses.length}
              </span>
            </p>
          </div>

          {/* Course List */}
          {filteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all group"
                >
                  {/* Cover Image */}
                  {course.coverImage && (
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={course.coverImage}
                        alt={course.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 right-3 flex gap-1.5">
                        {course.price === 0 && (
                          <Badge className="bg-green-500/90 text-white text-xs">
                            Бесплатно
                          </Badge>
                        )}
                        {course.location === "Онлайн" && (
                          <Badge className="bg-primary/90 text-primary-foreground text-xs">
                            Онлайн
                          </Badge>
                        )}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <Badge className="bg-primary/90 text-primary-foreground text-xs">
                          {course.category}
                        </Badge>
                        <div className="flex gap-2">
                          {course.isAccredited && (
                            <Badge className="bg-green-600/90 text-white text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              НМО
                            </Badge>
                          )}
                          {course.soldOut ? (
                            <Badge className="bg-red-600/90 text-white text-xs">
                              Места закончились
                            </Badge>
                          ) : course.placesLeft && course.placesLeft < 10 && (
                            <Badge className="bg-orange-500/90 text-white text-xs">
                              Осталось {course.placesLeft} мест
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Header without image */}
                  {!course.coverImage && (
                    <div className="gradient-education p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-education-foreground/20 text-education-foreground text-xs">
                          {course.category}
                        </Badge>
                        {course.isAccredited && (
                          <Badge className="bg-green-600/90 text-white text-xs">
                            НМО
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4" />
                      {course.isComingSoon ? (
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
                      {course.lecturers.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4 flex-shrink-0" />
                          <span className="line-clamp-1">
                            {course.lecturers.length === 1 
                              ? course.lecturers[0].name 
                              : `${course.lecturers.length} лекторов`}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Section Tags */}
                    {course.sectionTags && course.sectionTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {course.sectionTags.slice(0, 3).map((tagId) => {
                          const tag = sectionTags.find(t => t.id === tagId);
                          if (!tag) return null;
                          return (
                            <span
                              key={tagId}
                              className={cn(
                                "px-2 py-0.5 rounded-full text-xs font-medium border",
                                tag.color
                              )}
                            >
                              #{tag.label}
                            </span>
                          );
                        })}
                        {course.sectionTags.length > 3 && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                            +{course.sectionTags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Lecturers avatars */}
                    {course.lecturers.length > 1 && (
                      <div className="flex -space-x-2 mb-4">
                        {course.lecturers.slice(0, 4).map((lecturer, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded-full border-2 border-card overflow-hidden bg-muted"
                            title={lecturer.name}
                          >
                            <img
                              src={lecturer.photo}
                              alt={lecturer.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        ))}
                        {course.lecturers.length > 4 && (
                          <div className="w-8 h-8 rounded-full border-2 border-card bg-muted flex items-center justify-center text-xs font-medium">
                            +{course.lecturers.length - 4}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      {formatPrice(course.price, course.originalPrice)}
                      <Link to={`/education/course/${course.id}`}>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          Подробнее
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* Past events (moved to end) */}
              {!hasActiveFilters && (
                <>
                  {/* Past event: Workshop 16 Shades - April 10 */}
                  <Link
                    to="/education/workshop/archive/16-shades-10-04-2026"
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all group relative opacity-70"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src="/images/courses/course-18-banner.webp"
                        alt="Шестнадцать оттенков белого"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 grayscale"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <Badge className="bg-accent text-accent-foreground text-xs font-semibold">
                          Воркшоп
                        </Badge>
                        <Badge className="bg-muted-foreground text-white text-xs">
                          УЖЕ ПРОШЕЛ
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        10 апреля 2026 | 15:00-20:00
                      </div>
                      <h3 className="text-lg font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        Шестнадцать оттенков белого
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        Воркшоп для зубных техников: мастер-классы по окрашиванию и нанесению
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          Москва, Megapolis Hall
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4 flex-shrink-0" />
                          Д. Филинов, Д. Никоненко, Ш. Магомедов
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-xl font-bold text-muted-foreground">Завершён</span>
                        <Button size="sm" variant="outline">
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </Link>

                  {/* Past event: Implant Protocol - April 8 */}
                  <Link
                    to="/education/course/23"
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all group relative opacity-70"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src="/images/courses/course-21-hero.webp"
                        alt="Новый протокол для протезирования на имплантатах"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 grayscale"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <Badge className="bg-accent text-accent-foreground text-xs font-semibold">
                          Бизнес-встреча
                        </Badge>
                        <Badge className="bg-muted-foreground text-white text-xs">
                          УЖЕ ПРОШЕЛ
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        8 апреля 2026 | 15:00-19:00
                      </div>
                      <h3 className="text-lg font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        Новый протокол для протезирования на имплантатах
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        Цифровой путь от сканирования до реализации конструкции
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          Москва, Megapolis Hall
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4 flex-shrink-0" />
                          Дамир Гуфранов, Артем Борисенко, Артем Алимбетов
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-xl font-bold text-muted-foreground">Завершён</span>
                        <Button size="sm" variant="outline">
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </Link>

                  {/* Past webinar: Zircon - March 26 */}
                  <Link
                    to="/education/webinar/zircon-march-2026"
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all group relative opacity-70"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src="/images/webinar/cover-zircon-banner.webp"
                        alt="Лайфхаки в работе с цирконом"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 grayscale"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <Badge className="bg-accent text-accent-foreground text-xs font-semibold">
                          Бесплатный вебинар
                        </Badge>
                        <Badge className="bg-muted-foreground text-white text-xs">
                          УЖЕ ПРОШЕЛ
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        14 апреля 2026 | 19:00
                      </div>
                      <h3 className="text-lg font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        Лайфхаки в работе с цирконом
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        Секреты окрашивания, обжига и стабильной эстетики
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
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-xl font-bold text-muted-foreground">Завершён</span>
                        <Button size="sm" variant="outline">
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </Link>

                  {/* Past webinar: Brackets - March 11 */}
                  <Link
                    to="/education/webinar/brackets-march-2026"
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all group relative opacity-70"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src="/images/webinar/cover.webp"
                        alt="Непрямая фиксация брекетов"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 grayscale"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <Badge className="bg-accent text-accent-foreground text-xs font-semibold">
                          Бесплатный вебинар
                        </Badge>
                        <Badge className="bg-muted-foreground text-white text-xs">
                          УЖЕ ПРОШЕЛ
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        11 марта 2026 | 17:00
                      </div>
                      <h3 className="text-lg font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        Непрямая фиксация брекетов: цифровой протокол
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        Онлайн-вебинар Зухры Чеккуевой — от КТ + скана до джигов в Maestro 3D
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Monitor className="h-4 w-4 flex-shrink-0" />
                          Онлайн
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4 flex-shrink-0" />
                          Зухра Чеккуева
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-xl font-bold text-muted-foreground">Завершён</span>
                        <Button size="sm" variant="outline">
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Курсы не найдены</h3>
              <p className="text-muted-foreground mb-4">
                Попробуйте изменить параметры фильтрации
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Сбросить фильтры
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CourseCalendar;
