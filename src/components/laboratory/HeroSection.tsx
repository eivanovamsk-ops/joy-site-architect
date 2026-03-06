import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import laboratoryHeroBanner from "@/assets/laboratory-hero-banner.jpg";

export function LaboratoryHeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={laboratoryHeroBanner}
          alt="Цифровая зуботехническая лаборатория Артикон"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-tight">
            Цифровая зуботехническая лаборатория
          </h1>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
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
              className="bg-white/20 text-white hover:bg-white/30 px-8 transition-transform duration-200 hover:scale-105"
            >
              <a href="https://t.me/articon1" target="_blank" rel="noopener noreferrer">Вызвать курьера</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
