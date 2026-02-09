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
    </section>
  );
}
