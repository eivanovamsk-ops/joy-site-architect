import { Users, Award, BookOpen, Monitor } from "lucide-react";

const advantages = [
  {
    icon: Users,
    title: "Практикующие преподаватели",
    description:
      "Все преподаватели — специалисты, которые работают в лаборатории и применяют технологии, которым обучают",
  },
  {
    icon: Award,
    title: "Современное оборудование",
    description:
      "Обучение проходит на том же оборудовании, которое используется в нашей лаборатории",
  },
  {
    icon: BookOpen,
    title: "Практическая направленность",
    description:
      "Все курсы максимально практичны и основаны на реальных клинических кейсах",
  },
];

const formats = [
  {
    icon: Users,
    title: "Оффлайн-курсы",
    description: "Практические курсы в нашем учебном центре в Москве с hands-on практикой",
  },
  {
    icon: Monitor,
    title: "Онлайн-обучение",
    description: "Вебинары и онлайн-курсы для тех, кто не может приехать очно",
  },
];

export function EducationAdvantages() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Почему выбирают наш учебный центр?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 rounded-2xl gradient-education flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="h-8 w-8 text-education-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{advantage.title}</h3>
                <p className="text-muted-foreground">{advantage.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {formats.map((format, index) => {
            const Icon = format.icon;
            return (
              <div
                key={index}
                className="bg-secondary rounded-2xl p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">{format.title}</h3>
                  <p className="text-sm text-muted-foreground">{format.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
