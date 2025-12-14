import { ArrowRight, GraduationCap, ShoppingBag, FlaskConical, CheckCircle2 } from "lucide-react";

export function EcosystemSection() {
  return (
    <section className="py-20 lg:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Экосистема Артикон:{" "}
              <span className="text-gradient-primary">как это работает?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Артикон — это не просто три отдельных компании. Это единая
              экосистема, где каждый элемент дополняет друг друга, создавая
              целостное решение для наших клиентов.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Проходите обучение в нашем учебном центре",
                "Покупаете оборудование, которое мы используем сами",
                "Заказываете работы в нашей лаборатории",
                "Получаете полную техническую поддержку",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-primary font-semibold text-lg">
              Это и есть полный цикл поддержки от Артикон.
            </p>
          </div>

          {/* Visual Diagram */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Central Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full gradient-primary flex items-center justify-center shadow-glow z-10">
                <span className="text-primary-foreground font-bold text-lg text-center">
                  АРТИКОН
                </span>
              </div>

              {/* Connection Lines */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 400"
              >
                <defs>
                  <linearGradient id="line1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(190, 80%, 30%)" />
                    <stop offset="100%" stopColor="hsl(207, 90%, 40%)" />
                  </linearGradient>
                  <linearGradient id="line2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(30, 100%, 50%)" />
                    <stop offset="100%" stopColor="hsl(207, 90%, 40%)" />
                  </linearGradient>
                  <linearGradient id="line3" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(200, 80%, 50%)" />
                    <stop offset="100%" stopColor="hsl(207, 90%, 40%)" />
                  </linearGradient>
                </defs>
                {/* Lab */}
                <line x1="200" y1="200" x2="200" y2="50" stroke="url(#line1)" strokeWidth="3" strokeDasharray="8,4" />
                {/* Shop */}
                <line x1="200" y1="200" x2="330" y2="300" stroke="url(#line2)" strokeWidth="3" strokeDasharray="8,4" />
                {/* Education */}
                <line x1="200" y1="200" x2="70" y2="300" stroke="url(#line3)" strokeWidth="3" strokeDasharray="8,4" />
              </svg>

              {/* Lab Node */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                <div className="w-20 h-20 rounded-2xl gradient-lab flex items-center justify-center shadow-lg animate-float">
                  <FlaskConical className="h-8 w-8 text-lab-foreground" />
                </div>
                <p className="text-center text-sm font-medium mt-2">Лаборатория</p>
              </div>

              {/* Shop Node */}
              <div className="absolute bottom-4 right-0 translate-x-4">
                <div className="w-20 h-20 rounded-2xl gradient-accent flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: "1s" }}>
                  <ShoppingBag className="h-8 w-8 text-accent-foreground" />
                </div>
                <p className="text-center text-sm font-medium mt-2">Магазин</p>
              </div>

              {/* Education Node */}
              <div className="absolute bottom-4 left-0 -translate-x-4">
                <div className="w-20 h-20 rounded-2xl gradient-education flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: "2s" }}>
                  <GraduationCap className="h-8 w-8 text-education-foreground" />
                </div>
                <p className="text-center text-sm font-medium mt-2">Обучение</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
