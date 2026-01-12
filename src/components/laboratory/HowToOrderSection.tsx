import { FileText, PhoneCall, Cog, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Отправьте заказ",
    description: "Заполните заказ-наряд и отправьте его нам вместе со сканами или слепками.",
  },
  {
    icon: PhoneCall,
    step: "02",
    title: "Мы примем заказ",
    description: "Наш менеджер свяжется с вами для уточнения деталей и подтверждения заказа.",
  },
  {
    icon: Cog,
    step: "03",
    title: "Изготовление",
    description: "Наши техники изготовят ваш заказ с соблюдением всех требований качества.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Доставка",
    description: "Доставим готовую работу курьером или транспортной компанией в любой регион.",
  },
];

export function LaboratoryHowToOrderSection() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Как сделать заказ
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-border">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                  </div>
                )}
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full gradient-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="gradient-primary text-primary-foreground">
            <a href="https://t.me/articon1" target="_blank" rel="noopener noreferrer">Вызвать курьера</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
