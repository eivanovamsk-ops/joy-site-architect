import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Video, Users, Filter, X } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
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

import { courses, courseCategories, courseFormats } from "@/data/courses";
import { cn } from "@/lib/utils";

const CourseCalendar = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все категории");
  const [selectedFormat, setSelectedFormat] = useState("Все форматы");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        selectedCategory === "Все категории" ||
        course.category === selectedCategory;
      const matchesFormat =
        selectedFormat === "Все форматы" || course.format === selectedFormat;
      const matchesDate =
        !selectedDate ||
        (course.dateStart.getMonth() === selectedDate.getMonth() &&
          course.dateStart.getFullYear() === selectedDate.getFullYear());

      return matchesCategory && matchesFormat && matchesDate;
    });
  }, [selectedCategory, selectedFormat, selectedDate]);

  const clearFilters = () => {
    setSelectedCategory("Все категории");
    setSelectedFormat("Все форматы");
    setSelectedDate(undefined);
  };

  const hasActiveFilters =
    selectedCategory !== "Все категории" ||
    selectedFormat !== "Все форматы" ||
    selectedDate !== undefined;

  // Get dates with courses for calendar highlighting
  const courseDates = courses.map((c) => c.dateStart);

  return (
    <Layout>
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
              {/* Category Filter */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Категория
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {courseCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Format Filter */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Формат
                </label>
                <Select
                  value={selectedFormat}
                  onValueChange={setSelectedFormat}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {courseFormats.map((fmt) => (
                      <SelectItem key={fmt} value={fmt}>
                        {fmt}
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
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {selectedDate
                        ? format(selectedDate, "LLLL yyyy", { locale: ru })
                        : "Выберите месяц"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
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
                        <Button
                          size="sm"
                          className="gradient-primary text-primary-foreground"
                        >
                          Подробнее
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
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
