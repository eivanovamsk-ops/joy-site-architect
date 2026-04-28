import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CoursePhotoSlide {
  src: string;
  caption?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

interface CoursePhotoSliderProps {
  slides: CoursePhotoSlide[];
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  interval?: number;
  sectionClassName?: string;
}

const positionClasses: Record<NonNullable<CoursePhotoSlide["position"]>, string> = {
  "top-left": "top-6 left-6 items-start text-left",
  "top-right": "top-6 right-6 items-end text-right",
  "bottom-left": "bottom-6 left-6 items-start text-left",
  "bottom-right": "bottom-6 right-6 items-end text-right",
};

export function CoursePhotoSlider({
  slides,
  title = "Фото с прошлых мероприятий",
  subtitle,
  autoPlay = true,
  interval = 5000,
  sectionClassName = "py-16 bg-background",
}: CoursePhotoSliderProps) {
  const [active, setActive] = useState(0);
  const total = slides.length;

  const goTo = useCallback((i: number) => setActive(((i % total) + total) % total), [total]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [autoPlay, interval, next]);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Camera className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
              {subtitle && (
                <p className="text-muted-foreground text-sm md:text-base mt-1">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-border shadow-lg bg-card">
            {/* Slides */}
            <div className="relative aspect-[16/9] w-full">
              {slides.map((slide, i) => (
                <article
                  key={i}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    i === active ? "opacity-100 z-10" : "opacity-0 z-0"
                  )}
                  aria-hidden={i !== active}
                >
                  <img
                    src={slide.src}
                    alt={slide.caption || `Фото ${i + 1}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 pointer-events-none" />
                  {slide.caption && (
                    <div
                      className={cn(
                        "absolute flex flex-col gap-1 max-w-[80%]",
                        positionClasses[slide.position || "bottom-left"]
                      )}
                    >
                      <h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
                        {slide.caption}
                      </h3>
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* Prev / Next */}
            <button
              type="button"
              onClick={prev}
              aria-label="Предыдущее фото"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Следующее фото"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
              {active + 1} / {total}
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Перейти к фото ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === active ? "w-8 bg-primary" : "w-2 bg-white/60 hover:bg-white/90"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
