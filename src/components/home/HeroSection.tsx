import { Link } from "react-router-dom";
import { ArrowDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToDirections = () => {
    const element = document.getElementById("directions");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          src="https://rutube.ru/play/embed/abc59a98aaef177d07cc69f0c4166a06?autoplay=1&mute=1&loop=1&controls=0"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/20 text-background text-sm font-medium mb-8 animate-fade-in backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Ваш надежный партнер в цифровой стоматологии
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 animate-fade-in-up text-background">
            <span>АРТИКОН:</span>{" "}
            <span className="text-accent">Цифровые решения</span>
            <br />
            <span>для стоматологии</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Полный цикл поддержки: от обучения и оборудования до производства в зуботехнической лаборатории.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              onClick={scrollToDirections}
              className="gradient-primary text-primary-foreground px-8 py-6 text-lg hover-lift"
            >
              Узнать больше
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-background text-background hover:bg-background hover:text-foreground px-8 py-6 text-lg"
            >
              <a
                href="https://t.me/articondental_bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Telegram-бот
              </a>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            {[
              { value: "15+", label: "лет на рынке" },
              { value: "170+", label: "сотрудников" },
              { value: "50K+", label: "работ в год" },
              { value: "2000+", label: "обученных" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-background/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToDirections}
          className="w-10 h-10 rounded-full border-2 border-background/30 flex items-center justify-center text-background/50 hover:border-background hover:text-background transition-colors"
          aria-label="Прокрутить вниз"
        >
          <ArrowDown className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
