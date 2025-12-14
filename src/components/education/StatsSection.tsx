const stats = [
  { value: "2000+", label: "обученных специалистов" },
  { value: "10+", label: "лет опыта в обучении" },
  { value: "30+", label: "авторских курсов" },
];

export function EducationStatsSection() {
  return (
    <section className="py-12 bg-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="text-background/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
