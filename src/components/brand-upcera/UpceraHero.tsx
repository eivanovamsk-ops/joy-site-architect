import { Button } from "@/components/ui/button";
import { MessageCircle, Download } from "lucide-react";
import heroImage from "@/assets/brands/upcera-hero.jpg";

const stats = [
  { value: "110+", label: "стран присутствия" },
  { value: "120+", label: "патентов" },
  { value: "1300", label: "МПа прочность" },
  { value: "50+", label: "сертификатов" },
];

export function UpceraHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(218,55%,15%)] to-[hsl(218,45%,25%)]">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-primary-foreground/60 text-sm uppercase tracking-widest mb-3">
              Официальный поставщик — Articon
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight mb-5">
              Комплексные CAD/CAM-решения{" "}
              <span className="text-accent">UPCERA</span>{" "}
              для цифровой лаборатории
            </h1>
            <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              Фрезерные станки, печи синтеризации, циркониевые диски, литий-дисиликат
              и расходные материалы — полный цифровой цикл с технической поддержкой.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <a href="https://t.me/articon_zakaz" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Получить консультацию
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <a href="https://t.me/articon_zakaz" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-5 w-5" />
                  Скачать каталог 2025
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl md:text-3xl font-bold text-accent">{s.value}</div>
                  <div className="text-xs text-primary-foreground/60 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <img
              src={heroImage}
              alt="CAD/CAM оборудование и материалы UPCERA"
              className="w-full max-w-lg rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
