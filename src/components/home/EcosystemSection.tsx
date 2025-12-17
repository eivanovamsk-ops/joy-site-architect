import { GraduationCap, ScanLine, FlaskConical, Headphones, ArrowRight, ArrowDown } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Знания",
    direction: "Учебный центр",
    description: "Обучение передовым цифровым протоколам.",
    icon: GraduationCap,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    number: "2",
    title: "Оснащение",
    direction: "Магазин оборудования",
    description: "Покупка проверенного оборудования, которое мы используем сами.",
    icon: ScanLine,
    gradient: "from-orange-500 to-orange-600",
  },
  {
    number: "3",
    title: "Производство",
    direction: "Зуботехническая лаборатория",
    description: "Заказ высокоточных работ в одной из крупнейших лабораторий страны.",
    icon: FlaskConical,
    gradient: "from-teal-500 to-teal-600",
  },
  {
    number: "4",
    title: "Поддержка",
    direction: "Сервис",
    description: "Полный цикл технической поддержки на каждом этапе.",
    icon: Headphones,
    gradient: "from-primary to-blue-700",
  },
];

export function EcosystemSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Экосистема Артикон:{" "}
            <span className="text-gradient-primary">Ваш путь к цифровому успеху</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Артикон — это бесшовный цикл поддержки. Мы обеспечиваем вас всем необходимым, 
            чтобы вы могли работать эффективно и предсказуемо.
          </p>
        </div>

        {/* Infographic - Desktop (horizontal cycle) */}
        <div className="hidden lg:flex items-center justify-center gap-4 mb-16">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              {/* Step Card */}
              <div className="relative group">
                <div className="w-64 bg-background rounded-2xl p-6 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Step Number */}
                  <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-4 shadow-md`}>
                    <step.icon className="h-7 w-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm font-medium text-primary mb-2">{step.direction}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
              
              {/* Arrow between cards */}
              {index < steps.length - 1 && (
                <ArrowRight className="h-6 w-6 text-primary mx-2 flex-shrink-0" />
              )}
              
              {/* Closing arrow from last to first */}
              {index === steps.length - 1 && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-primary">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
                  <span className="text-sm font-medium">Цикл повторяется</span>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Cycle indicator - Desktop */}
        <div className="hidden lg:flex justify-center mb-16">
          <div className="flex items-center gap-2 text-primary bg-primary/5 px-6 py-3 rounded-full border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium">Непрерывный цикл поддержки</span>
          </div>
        </div>

        {/* Infographic - Mobile/Tablet (vertical list) */}
        <div className="lg:hidden space-y-4 mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center">
              {/* Step Card */}
              <div className="relative w-full max-w-md bg-background rounded-2xl p-6 shadow-lg border border-border/50">
                {/* Step Number */}
                <div className={`absolute -top-3 left-6 w-8 h-8 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                  {step.number}
                </div>
                
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm font-medium text-primary mb-1">{step.direction}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Arrow between cards */}
              {index < steps.length - 1 && (
                <ArrowDown className="h-6 w-6 text-primary my-2" />
              )}
            </div>
          ))}
          
          {/* Cycle indicator - Mobile */}
          <div className="flex justify-center pt-4">
            <div className="flex items-center gap-2 text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium">Непрерывный цикл</span>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl px-8 py-6 border border-primary/20">
            <p className="text-lg md:text-xl font-semibold text-foreground">
              <span className="text-primary">Результат:</span> Вы получаете полный цикл поддержки, 
              который гарантирует качество и предсказуемость вашей работы.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
