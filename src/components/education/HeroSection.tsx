import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import educationHeroBanner from "@/assets/education-hero-banner.webp";
import course37Banner from "@/assets/courses/course-37-banner.jpg";

export function EducationHeroSection() {
  return (
    <section className="relative overflow-hidden">
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 6000, stopOnInteraction: true })]}
        className="w-full"
      >
        <CarouselContent>
          {/* Slide 1 — Анонс ближайшего крупного события */}
          <CarouselItem>
            <div className="relative py-20 lg:py-32 overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src={course37Banner}
                  alt="ДЕЛО НЕ В ДИСКЕ — закрытый разбор по диоксиду циркония"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
              </div>
              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl">
                  <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-4 px-3 py-1 border border-primary/40 rounded-full bg-primary/10">
                    Ближайшее закрытое событие
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 uppercase leading-tight">
                    ДЕЛО НЕ В ДИСКЕ
                  </h1>
                  <p className="text-lg md:text-xl text-white/85 mb-6 max-w-2xl">
                    Закрытый разбор по диоксиду циркония: спекание, цвет,
                    настройки и реальные тесты лабораторий.
                  </p>
                  <div className="flex flex-wrap gap-4 text-white/80 mb-8 text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      24 июня 2026
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Москва
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold">3 000 ₽</span>
                    </div>
                  </div>
                  <Link to="/education/course/37">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 gap-2"
                    >
                      Узнать подробнее <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Slide 2 — Имиджевый */}
          <CarouselItem>
            <div className="relative py-20 lg:py-32 overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src={educationHeroBanner}
                  alt="Цифровая стоматология — учебный центр Артикон"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
              </div>
              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase">
                    ARTICON Учебный центр
                  </h2>
                  <p className="text-xl text-white/85 mb-4">
                    в сфере цифровой стоматологии
                  </p>
                  <p className="text-lg text-white/70 mb-8 max-w-2xl">
                    Для врачей и зубных техников, влюблённых в профессию.
                    Обучаем цифровым протоколам, которые применяем ежедневно.
                  </p>
                  <a
                    href="https://t.me/articon_education"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      className="bg-background text-foreground hover:bg-background/90 px-8"
                    >
                      Связаться с куратором
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
}
