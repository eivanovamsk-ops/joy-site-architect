import { Link } from "react-router-dom";
import { ArrowDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToDirections = () => {
    const element = document.getElementById("directions");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Animated Network Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(207, 90%, 40%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(30, 100%, 50%)" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <g stroke="url(#lineGradient)" strokeWidth="1" fill="none">
          <path d="M0,200 Q400,100 800,200 T1600,200" className="animate-pulse-slow" />
          <path d="M0,400 Q300,300 600,400 T1200,400 T1800,400" className="animate-pulse-slow" style={{ animationDelay: "1s" }} />
          <path d="M0,600 Q500,500 1000,600 T2000,600" className="animate-pulse-slow" style={{ animationDelay: "2s" }} />
        </g>
        {/* Nodes */}
        <circle cx="200" cy="200" r="6" fill="hsl(207, 90%, 40%)" className="animate-pulse-slow" />
        <circle cx="800" cy="200" r="8" fill="hsl(30, 100%, 50%)" className="animate-pulse-slow" style={{ animationDelay: "0.5s" }} />
        <circle cx="500" cy="400" r="6" fill="hsl(207, 90%, 40%)" className="animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <circle cx="1100" cy="400" r="7" fill="hsl(30, 100%, 50%)" className="animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        <circle cx="700" cy="600" r="5" fill="hsl(207, 90%, 40%)" className="animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Лидер цифровой стоматологии в России
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 animate-fade-in-up">
            <span className="text-foreground">АРТИКОН:</span>{" "}
            <span className="text-gradient-primary">Экосистема</span>
            <br />
            <span className="text-foreground">цифровых решений</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            От обучения и оборудования до полного цикла производства в
            зуботехнической лаборатории. Мы продаём то, что используем сами.
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
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg"
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
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToDirections}
          className="w-10 h-10 rounded-full border-2 border-primary/30 flex items-center justify-center text-primary/50 hover:border-primary hover:text-primary transition-colors"
          aria-label="Прокрутить вниз"
        >
          <ArrowDown className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
