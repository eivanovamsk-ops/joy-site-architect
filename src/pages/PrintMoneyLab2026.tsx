import {
  Calendar,
  MapPin,
  ArrowRight,
  ArrowDownRight,
  TrendingUp,
  Calculator,
  Cpu,
  Zap,
  Factory,
  AlertTriangle,
  Printer,
  Banknote,
  FlaskConical,
  Users,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { CourseApplicationForm } from "@/components/forms/CourseApplicationForm";
import { courses } from "@/data/courses";
import course41Banner from "@/assets/courses/course-41-banner.jpg";

const course = courses.find((c) => c.id === 41)!;

const pillars = [
  { icon: Printer, word: "ПЕЧАТЬ", text: "3D-печать, материалы, полимеризация и металл" },
  { icon: Banknote, word: "ДЕНЬГИ", text: "Себестоимость, загрузка оборудования и прибыль" },
  { icon: FlaskConical, word: "ЛАБОРАТОРИЯ", text: "Как будет выглядеть цифровая лаборатория будущего" },
];

const blocks = [
  {
    icon: TrendingUp,
    tag: "Блок 1",
    title: "Рынок",
    subtitle: "Что происходит с цифровым производством в России",
    items: ["что растет", "что падает", "какие услуги становятся востребованными", "где сегодня деньги"],
    wide: true,
  },
  {
    icon: Calculator,
    tag: "Блок 2",
    title: "Экономика печати",
    subtitle: "Почему две лаборатории на одинаковом оборудовании получают разную прибыль",
    items: ["себестоимость модели", "себестоимость каппы", "себестоимость хирургического шаблона", "загрузка оборудования"],
    wide: true,
  },
  {
    icon: Cpu,
    tag: "Блок 3",
    title: "HeyGears",
    subtitle: "Автоматизация печати и закрытые экосистемы",
    items: [],
  },
  {
    icon: Zap,
    tag: "Блок 4",
    title: "Полимеризация",
    subtitle: "Почему одинаковая модель после печати получается разной",
    items: ["ошибки полимеризации", "механические свойства", "стабильность результата"],
  },
  {
    icon: Factory,
    tag: "Блок 5",
    title: "Металл",
    subtitle: "Металлическая печать. Что уже можно производить в России",
    items: [],
  },
  {
    icon: AlertTriangle,
    tag: "Блок 6",
    title: "Разбор провалов",
    subtitle: "Честный разговор без прикрас",
    items: ["«Что мы напечатали и пожалели»", "«Самые дорогие ошибки цифровой лаборатории»"],
  },
];

const PrintMoneyLab2026 = () => {
  return (
    <Layout>
      <div className="bg-[#05060e] text-white">
        {/* HERO */}
        <section className="relative min-h-[94vh] flex items-end overflow-hidden">
          <img
            src={course41Banner}
            alt="Конференция о цифровом производстве в стоматологии — 3D-печать"
            className="absolute inset-0 w-full h-full object-cover opacity-45"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05060e]/70 via-[#05060e]/55 to-[#05060e]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(34,211,238,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(217,70,239,0.10),transparent_55%)]" />

          <div className="container mx-auto px-4 relative z-10 pb-16 md:pb-24 pt-32">
            <div className="max-w-5xl">
              <div className="flex items-center gap-3 mb-8 text-xs tracking-[0.35em] uppercase text-cyan-300/80 font-mono">
                <span className="h-px w-10 bg-cyan-400/70" />
                Digital Dental Production · 2026
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.95] tracking-tight">
                ПЕЧАТЬ.
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent">
                  ДЕНЬГИ.
                </span>
                <br />
                ЛАБОРАТОРИЯ.
              </h1>
              <p className="mt-8 text-lg md:text-2xl text-white/85 max-w-3xl leading-relaxed">
                Главная конференция о цифровом производстве в стоматологии.
              </p>
              <p className="mt-3 text-base md:text-xl text-white/55 max-w-2xl leading-relaxed">
                От моделей до металла. От оборудования до бизнеса.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-6 text-white/85">
                <div className="flex items-center gap-2 text-base md:text-lg">
                  <Calendar className="h-5 w-5 text-cyan-300" />
                  <span className="font-medium">30 октября 2026</span>
                </div>
                <div className="flex items-center gap-2 text-base md:text-lg">
                  <MapPin className="h-5 w-5 text-cyan-300" />
                  <span className="font-medium">Москва</span>
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <CourseApplicationForm
                  courseName={course.title}
                  courseDate={course.date}
                  coursePrice={course.price}
                  buttonLabel="Зарегистрироваться"
                />
                <a
                  href="#program"
                  className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-md border border-white/15 text-white/85 hover:bg-white/5 transition-colors"
                >
                  Программа
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TICKER STRIP */}
        <section className="border-y border-white/10 bg-gradient-to-r from-cyan-500/10 via-transparent to-fuchsia-500/10 overflow-hidden">
          <div className="py-5 flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm md:text-base font-mono uppercase tracking-[0.25em] text-white/50">
            <span>3D-печать</span>
            <span className="text-cyan-300/80">материалы</span>
            <span>автоматизация</span>
            <span className="text-fuchsia-300/80">экономика</span>
            <span>металл</span>
            <span className="text-cyan-300/80">бизнес</span>
          </div>
        </section>

        {/* ABOUT */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.06),transparent_50%)]" />
          <div className="container mx-auto px-4 relative">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-6">
                <div className="text-xs tracking-[0.3em] uppercase text-cyan-300/80 mb-6 font-mono">
                  / 01 — о конференции
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                  Технологии, которые уже сегодня{" "}
                  <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                    меняют производство
                  </span>
                </h2>
                <p className="text-lg text-white/70 leading-relaxed mb-5">
                  Это конференция о технологиях, которые уже сегодня меняют производство: 3D-печать, материалы,
                  автоматизация процессов, новые производственные подходы и перспективные направления развития отрасли.
                </p>
                <p className="text-lg text-white/70 leading-relaxed">
                  Мы соберем экспертов, производителей и практиков, чтобы обсудить не только оборудование, но и главный
                  вопрос: <span className="text-white font-semibold">как будет выглядеть успешная цифровая лаборатория ближайшего будущего.</span>
                </p>
              </div>
              <div className="lg:col-span-6 grid gap-4">
                {pillars.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={i}
                      className="group flex items-center gap-6 p-6 md:p-8 border border-white/10 bg-gradient-to-r from-white/[0.04] to-transparent rounded-xl hover:border-cyan-400/40 transition-all"
                    >
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-500/15 to-fuchsia-500/15 border border-cyan-400/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-7 w-7 text-cyan-300" />
                      </div>
                      <div>
                        <div className="text-2xl md:text-3xl font-black tracking-tight">{p.word}</div>
                        <p className="text-white/60 mt-1">{p.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAM */}
        <section id="program" className="py-24 md:py-32 border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(217,70,239,0.06),transparent_45%)]" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mb-16">
              <div className="text-xs tracking-[0.3em] uppercase text-cyan-300/80 mb-6 font-mono">
                / 02 — программа
              </div>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">Шесть блоков. Ноль воды.</h2>
              <p className="text-xl text-white/60">
                Рынок, экономика, автоматизация, материалы, металл и честный разбор провалов.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {blocks.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={i}
                    className={`group relative p-8 md:p-10 border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent rounded-xl hover:border-fuchsia-400/40 transition-all ${
                      b.wide ? "md:col-span-2" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-7">
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-500/15 to-fuchsia-500/15 border border-white/15 flex items-center justify-center">
                        <Icon className="h-7 w-7 text-cyan-300 group-hover:text-fuchsia-300 transition-colors" />
                      </div>
                      <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/40">{b.tag}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">{b.title}</h3>
                    <p className="text-white/65 text-lg mb-6 leading-relaxed">{b.subtitle}</p>
                    {b.items.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {b.items.map((item, j) => (
                          <span
                            key={j}
                            className="px-3 py-1.5 text-sm border border-white/10 rounded-full text-white/75 font-mono bg-white/[0.03]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="py-28 md:py-36 border-t border-white/5 bg-gradient-to-b from-[#05060e] via-[#0a0716] to-[#05060e] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.07),transparent_55%)]" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-5xl mx-auto text-center">
              <ArrowDownRight className="h-10 w-10 text-fuchsia-400 mx-auto mb-10" />
              <blockquote className="text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight">
                От моделей до металла.{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                  От оборудования до бизнеса.
                </span>
              </blockquote>
              <p className="mt-10 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                Эксперты, производители и практики — в одном зале, в один день, об одном: как зарабатывать на цифровом
                производстве.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-sm font-mono uppercase tracking-[0.2em] mb-8">
                <Users className="h-4 w-4" />
                30 октября 2026 · Москва
              </div>
              <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6">
                Займите место на главной конференции года
              </h2>
              <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
                Для зубных техников, CAD/CAM-специалистов, операторов 3D-печати и руководителей лабораторий.
              </p>
              <div className="flex justify-center">
                <CourseApplicationForm
                  courseName={course.title}
                  courseDate={course.date}
                  coursePrice={course.price}
                  buttonLabel="Зарегистрироваться"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PrintMoneyLab2026;
