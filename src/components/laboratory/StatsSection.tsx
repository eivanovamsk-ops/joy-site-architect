const stats = [
  { category: "Хирургия", value: "6,569", label: "работ" },
  { category: "Ортопедия", value: "24,233", label: "работы" },
  { category: "Ортодонтия", value: "9,879", label: "работ" },
  { category: "Сплинты", value: "4,080", label: "работ" },
  { category: "Съёмное", value: "3,807", label: "работ" },
];

const keyStats = [
  { value: "170+", label: "сотрудников" },
  { value: "350", label: "рабочих мест" },
  { value: ">15", label: "лет опыта" },
  { value: "500+", label: "единиц оборудования" },
];

export function LaboratoryStatsSection() {
  return (
    <>
      {/* Work Stats 2024 */}
      <section className="py-12 bg-foreground">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-background/50 text-sm uppercase tracking-widest mb-8">
            Статистика за 2024 год
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-background/50 mb-1">{stat.category}</div>
                <div className="text-2xl md:text-3xl font-bold text-accent">
                  {stat.value}
                </div>
                <div className="text-background/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Одна из крупнейших лабораторий в России
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Современная цифровая лаборатория с полным циклом производства
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {keyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
