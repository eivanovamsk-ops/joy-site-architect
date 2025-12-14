import { Cpu, Printer, Cog, Flame } from "lucide-react";

const technologies = [
  {
    icon: Cpu,
    title: "CAD/CAM",
    description: "Цифровое проектирование и изготовление протезов с микронной точностью. Используем Exocad, 3Shape и другие ведущие системы.",
  },
  {
    icon: Printer,
    title: "3D-печать",
    description: "Изготовление моделей, хирургических шаблонов, временных конструкций на современных DLP и SLA принтерах.",
  },
  {
    icon: Cog,
    title: "SLM печать металлом",
    description: "Селективное лазерное спекание для изготовления прецизионных металлических каркасов протезов.",
  },
  {
    icon: Flame,
    title: "Фрезерование",
    description: "5-осевые фрезерные станки для изготовления коронок и мостов из циркония, керамики, PMMA, титана.",
  },
];

export function LaboratoryTechnologiesSection() {
  return (
    <section className="py-20 bg-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-background text-center mb-4">
          Технологии
        </h2>
        <p className="text-background/60 text-center mb-16 max-w-2xl mx-auto">
          Мы используем самое современное оборудование для достижения максимальной точности
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-background mb-3">
                  {tech.title}
                </h3>
                <p className="text-background/60 text-sm leading-relaxed">
                  {tech.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
