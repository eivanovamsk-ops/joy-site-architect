import { GraduationCap, ShoppingBag, FlaskConical, Headphones, ArrowRight, ArrowDown, CheckCircle2, ShieldCheck, Users, HeartHandshake } from "lucide-react";
const ecosystemSteps = [{
  number: "1",
  title: "Знания",
  direction: "Учебный центр",
  description: "Обучение передовым цифровым протоколам от практикующих экспертов",
  icon: GraduationCap,
  color: "bg-blue-500",
  gradient: "from-blue-500 to-blue-600"
}, {
  number: "2",
  title: "Оснащение",
  direction: "Магазин оборудования",
  description: "Проверенное оборудование и материалы с полной техподдержкой",
  icon: ShoppingBag,
  color: "bg-orange-500",
  gradient: "from-orange-500 to-orange-600"
}, {
  number: "3",
  title: "Производство",
  direction: "Зуботехническая лаборатория",
  description: "Высокоточные работы по единым стандартам качества",
  icon: FlaskConical,
  color: "bg-teal-500",
  gradient: "from-teal-500 to-teal-600"
}, {
  number: "4",
  title: "Поддержка",
  direction: "Сервис 24/7",
  description: "Техническая помощь на каждом этапе вашей работы",
  icon: Headphones,
  color: "bg-primary",
  gradient: "from-primary to-blue-700"
}];
const advantages = [{
  icon: ShieldCheck,
  title: "Проверенные решения",
  description: "Продаём то, что используем сами"
}, {
  icon: Users,
  title: "Практический опыт",
  description: "Учим тому, что применяем ежедневно"
}, {
  icon: HeartHandshake,
  title: "Полный цикл",
  description: "От обучения до производства"
}, {
  icon: CheckCircle2,
  title: "Единый стандарт",
  description: "Гарантия совместимости и качества"
}];
const stats = [{
  value: ">15 лет",
  label: "на рынке"
}, {
  value: "Топ-3",
  label: "лабораторий РФ"
}, {
  value: "170+",
  label: "специалистов"
}, {
  value: "50K+",
  label: "работ в год"
}, {
  value: "2000+",
  label: "обученных"
}];
export function EcosystemSection() {
  return <section className="py-20 lg:py-28 bg-secondary" itemScope itemType="https://schema.org/Organization">
      <meta itemProp="name" content="Артикон" />
      <meta itemProp="description" content="Экосистема цифровой стоматологии: обучение, оборудование, производство и поддержка" />
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Экосистема{" "}
            <span className="text-gradient-primary">Артикон</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Бесшовный цикл поддержки для эффективной и предсказуемой работы в цифровой стоматологии
          </p>
        </div>

        {/* Advantages - Compact Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {advantages.map((item, index) => {
          const Icon = item.icon;
          return <div key={index} className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>;
        })}
        </div>

        {/* Ecosystem Cycle - Desktop */}
        <div className="hidden lg:block mb-16">
          <div className="relative bg-card rounded-3xl border border-border p-8">
            {/* Center label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-2 border-primary/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">360°</div>
                  <div className="text-xs text-muted-foreground">поддержка</div>
                </div>
              </div>
            </div>

            {/* Steps in a circle layout */}
            <div className="grid grid-cols-4 gap-6">
              {ecosystemSteps.map((step, index) => {
              const Icon = step.icon;
              return <div key={step.number} className="relative group">
                    <div className="bg-background rounded-2xl p-6 border border-border/50 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                      {/* Step Number Badge */}
                      <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                        {step.number}
                      </div>
                      
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-4 shadow-md`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-bold text-foreground mb-1">{step.title}</h3>
                      <p className="text-sm font-medium text-primary mb-2">{step.direction}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>

                    {/* Connecting Arrow */}
                    {index < ecosystemSteps.length - 1 && <div className="absolute top-1/2 -right-5 z-20">
                        <ArrowRight className="h-5 w-5 text-primary" />
                      </div>}
                  </div>;
            })}
            </div>

            {/* Cycle indicator */}
            <div className="flex justify-center mt-6">
              
            </div>
          </div>
        </div>

        {/* Ecosystem Cycle - Mobile/Tablet */}
        <div className="lg:hidden space-y-4 mb-12">
          {ecosystemSteps.map((step, index) => {
          const Icon = step.icon;
          return <div key={step.number} className="flex flex-col items-center">
                <div className="relative w-full max-w-md bg-card rounded-2xl p-5 border border-border">
                  {/* Step Number */}
                  <div className={`absolute -top-3 left-5 w-8 h-8 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                    {step.number}
                  </div>
                  
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                      <p className="text-sm font-medium text-primary mb-1">{step.direction}</p>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </div>
                
                {index < ecosystemSteps.length - 1 && <ArrowDown className="h-5 w-5 text-primary my-2" />}
              </div>;
        })}
          
          {/* Cycle indicator - Mobile */}
          <div className="flex justify-center pt-4">
            <div className="flex items-center gap-2 text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium">Непрерывный цикл</span>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-foreground rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {stats.map((stat, index) => <div key={index} className="text-center">
                <div className="text-xl md:text-2xl font-bold text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-background/70 text-xs md:text-sm">{stat.label}</div>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
}