import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LaboratoryHeroSection() {
  return (
    <section className="relative py-20 lg:py-32 gradient-lab overflow-hidden">
      {/* Hexagonal pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <polygon points="24.8,22 37.3,29.2 37.3,43.6 24.8,50.8 12.3,43.6 12.3,29.2" fill="none" stroke="currentColor" strokeWidth="1" />
              <polygon points="0,0 12.5,7.2 12.5,21.6 0,28.8 -12.5,21.6 -12.5,7.2" fill="none" stroke="currentColor" strokeWidth="1" />
              <polygon points="50,0 62.5,7.2 62.5,21.6 50,28.8 37.5,21.6 37.5,7.2" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" className="text-white" />
        </svg>
      </div>
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-background blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-background blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-lab-foreground mb-6 uppercase tracking-tight">
            Цифровая зуботехническая лаборатория
          </h1>
          <p className="text-xl text-lab-foreground/80 mb-8 leading-relaxed">
            Передовые технологии CAD/CAM и квалифицированные специалисты.
            Более 15 лет на рынке мы делаем цифровую стоматологию эффективной,
            качественной и удобной.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 transition-transform duration-200 hover:scale-105 font-semibold"
            >
              <a href="https://t.me/articonrazvitie" target="_blank" rel="noopener noreferrer">
                Начать сотрудничество
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-background text-lab hover:bg-background/90 px-8 transition-transform duration-200 hover:scale-105"
            >
              <Link to="/laboratory/documents">Прайс-листы</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-lab-foreground/20 text-lab-foreground hover:bg-lab-foreground/30 px-8 transition-transform duration-200 hover:scale-105"
            >
              <a href="https://t.me/articon1" target="_blank" rel="noopener noreferrer">Вызвать курьера</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
