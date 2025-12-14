import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EducationHeroSection() {
  return (
    <section className="relative py-20 lg:py-32 gradient-education overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-background blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-education-foreground mb-6 uppercase">
            ARTICON Учебный центр
          </h1>
          <p className="text-xl text-education-foreground/80 mb-4">
            в сфере цифровой стоматологии
          </p>
          <p className="text-lg text-education-foreground/70 mb-8 max-w-2xl">
            Для врачей и зубных техников, влюблённых в профессию. Обучаем
            цифровым протоколам, которые применяем ежедневно.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-background text-education hover:bg-background/90 px-8"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Календарь курсов
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-education-foreground/30 text-education-foreground hover:bg-education-foreground/10"
            >
              Подписаться на рассылку
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
