import exocadErStoreLogo from "@/assets/partners/exocad-er-store-white.png";

export function EducationDigitalPartnersSection() {
  return (
    <section className="bg-foreground py-20 text-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-background/10 bg-background/5 p-8 shadow-card backdrop-blur-sm md:p-12">
          <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-background/60">
                Партнерство
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Наши партнеры по цифровым решениям
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-background/72 md:text-lg">
                Готовые компьютерные решения для стоматологических клиник и зуботехнических лабораторий
              </p>
            </div>

            <a
              href="https://vk.com/exo_store"
              target="_blank"
              rel="noreferrer"
              aria-label="Перейти к EXOCAD'ER STORE во ВКонтакте"
              className="group flex min-h-[220px] items-center justify-center rounded-[1.75rem] border border-background/10 bg-background/8 p-6 transition-transform duration-300 hover:-translate-y-1 hover:bg-background/12"
            >
              <img
                src={exocadErStoreLogo}
                alt="EXOCAD'ER STORE"
                className="h-auto max-h-40 w-full max-w-[420px] object-contain"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
