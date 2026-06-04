import { Calendar, MapPin, ArrowRight, Flame, Thermometer, Brush, FlaskConical, Layers, Users, Building2, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { CourseApplicationForm } from "@/components/forms/CourseApplicationForm";
import { courses } from "@/data/courses";
import course37Banner from "@/assets/courses/course-37-banner.jpg";
import speakerYuriyPonyk from "@/assets/speakers/yuriy-ponyk.jpg";
import speakerShamilMagomedov from "@/assets/speakers/shamil-magomedov.jpg";
import speakerVruyrEriknazyan from "@/assets/speakers/vruyr-eriknazyan.jpg";
import upceraPartnerLogo from "@/assets/partners/upcera-logo.png";

const course = courses.find((c) => c.id === 37)!;

const benefits = [
  "Поймёте, почему один и тот же диоксид циркония даёт разный результат в разных лабораториях",
  "Увидите, как режимы спекания влияют на цвет, прозрачность и эстетику",
  "Получите рабочие настройки и подходы от действующих лабораторий",
  "Разберёте ошибки, которые приводят к серости, переделкам и нестабильному цвету",
  "Увидите реальные результаты тестов, а не рекламные образцы",
  "Сравните результаты вживую: разные температуры, режимы и варианты окрашивания",
  "Поймёте, как сократить месяцы собственных тестов и быстрее адаптировать новые материалы",
  "Увидите, как другие лаборатории принимают технологические решения",
];

const zones = [
  {
    icon: Thermometer,
    title: "Как температура влияет на результат",
    items: ["1450°", "1500°", "1530°", "перегрев", "недоспекание"],
  },
  {
    icon: Brush,
    title: "Влияние окрашивания",
    items: ["разные техники", "разная концентрация", "ошибки", "переокрашивание"],
  },
  {
    icon: FlaskConical,
    title: "Эволюция тестов",
    items: ["первые попытки", "промежуточные результаты", "финальный результат"],
  },
  {
    icon: Layers,
    title: "Разные материалы — разное поведение",
    items: ["прозрачность", "цвет", "край", "реакция на спекание"],
  },
];

const speakers = [
  {
    name: "Вруйр Эрикназян",
    role: "Руководитель лаборатории",
    photo: speakerVruyrEriknazyan,
    topics: [
      "Как раскрыть потенциал материала, а не бороться с ним",
      "Температура решает всё?",
      "Финальный цвет начинается не с красок",
      "Сколько на самом деле стоит стабильный результат",
    ],
    description:
      "Независимое тестирование нового диоксида циркония в реальной работе лаборатории. Что проверял, что сравнивал, где были сложности и какие выводы удалось сделать после месяцев тестирования.",
  },
  {
    name: "Юрий Понык",
    role: "Приглашенный эксперт",
    photo: speakerYuriyPonyk,
    topics: [
      "Независимая оценка тестов",
    ],
    description:
      "Что проверял, что сравнивал, где были сложности и какие выводы удалось сделать после месяцев тестирования.",
  },
  {
    name: "Шамиль Магомедов",
    role: "Зубной техник",
    photo: speakerShamilMagomedov,
    topics: ["Живая демонстрация рабочих техник"],
  },
];

const audience = [
  { icon: Users, label: "Зубные техники" },
  { icon: Sparkles, label: "CAD/CAM специалисты" },
  { icon: Building2, label: "Руководители лабораторий" },
  { icon: FlaskConical, label: "Лаборатории, работающие с диоксидом циркония" },
  { icon: CheckCircle2, label: "Те, кому важен стабильный результат" },
];

const timeline = [
  { time: "Блок 1", title: "Почему один материал — разный результат", note: "выступление 20–30 мин + обсуждение" },
  { time: "Блок 2", title: "Температура и режимы спекания", note: "выступление 20–30 мин + обсуждение" },
  { time: "Блок 3", title: "Цвет, окрашивание и красители", note: "выступление 20–30 мин + обсуждение" },
  { time: "Блок 4", title: "Независимое тестирование материала", note: "выступление 20–30 мин + обсуждение" },
  { time: "Демо", title: "Живые технологические зоны", note: "сравнение результатов вживую" },
  { time: "Финал", title: "Открытый разговор и выводы", note: "вопросы, дискуссия, обмен опытом" },
];

const ZirconiaEvent2026 = () => {
  return (
    <Layout>
      <div className="bg-[#0a0a0c] text-white">
        {/* HERO */}
        <section className="relative min-h-[92vh] flex items-end overflow-hidden">
          <img
            src={course37Banner}
            alt="Спекание диоксида циркония"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/70 via-[#0a0a0c]/60 to-[#0a0a0c]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0c_85%)]" />

          <div className="container mx-auto px-4 relative z-10 pb-16 md:pb-24 pt-32">
            <div className="max-w-5xl">
              <div className="flex items-center gap-3 mb-8 text-xs tracking-[0.3em] uppercase text-white/60">
                <span className="h-px w-10 bg-amber-500/60" />
                Закрытое профессиональное событие
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.95] tracking-tight">
                ДЕЛО НЕ
                <br />
                <span className="text-amber-400">В ДИСКЕ</span>
              </h1>
              <p className="mt-8 text-lg md:text-2xl text-white/80 max-w-3xl leading-relaxed">
                Открытый разбор: спекание, цвет, настройки и реальные тесты лабораторий.
              </p>
              <p className="mt-4 text-base md:text-lg text-white/55 max-w-2xl leading-relaxed">
                Что на самом деле влияет на стабильный результат при работе с диоксидом циркония?
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2 text-base md:text-lg">
                  <Calendar className="h-5 w-5 text-amber-400" />
                  <span className="font-medium">24 июня 2026, 15:00–19:00</span>
                </div>
                <div className="flex items-center gap-2 text-base md:text-lg">
                  <MapPin className="h-5 w-5 text-amber-400" />
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
                <a href="#program" className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-md border border-white/15 text-white/80 hover:bg-white/5 transition-colors">
                  Программа
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <p className="mt-8 text-sm text-white/45 max-w-2xl leading-relaxed">
                Реальный опыт тестирования, настройки и внедрения новой системы — без рекламных презентаций и теории ради теории.
              </p>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-24 md:py-32 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <div className="text-xs tracking-[0.3em] uppercase text-amber-400/80 mb-6">
                  / 01 — что вы получите
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Что вы получите на мероприятии
                </h2>
              </div>
              <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-white/5">
                {benefits.map((b, i) => (
                  <div key={i} className="bg-[#0a0a0c] p-7 hover:bg-white/[0.02] transition-colors">
                    <div className="text-xs text-amber-400/70 font-mono mb-3">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <p className="text-base md:text-lg text-white/85 leading-relaxed">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="py-28 md:py-40 bg-gradient-to-b from-[#0a0a0c] via-[#100c08] to-[#0a0a0c] border-y border-amber-500/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.08),transparent_50%)]" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-5xl">
              <Flame className="h-10 w-10 text-amber-400 mb-10" />
              <blockquote className="text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight">
                «Мы уже потратили месяцы на тесты и ошибки.
                <span className="text-amber-400"> Вы получите готовые выводы.»</span>
              </blockquote>
              <div className="mt-14 max-w-2xl text-white/65 text-lg leading-relaxed space-y-3">
                <p>Действующие руководители лабораторий покажут:</p>
                <ul className="space-y-2 text-white/80">
                  <li>— что не получалось в начале</li>
                  <li>— как меняли настройки</li>
                  <li>— что влияло на результат</li>
                  <li>— какие режимы дали стабильность</li>
                  <li>— и к каким выводам пришли спустя месяцы тестирования</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* DEMO ZONES */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-16">
              <div className="text-xs tracking-[0.3em] uppercase text-amber-400/80 mb-6">
                / 02 — живые зоны
              </div>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Демонстрационные технологические зоны
              </h2>
              <p className="text-xl text-white/60">Не презентация. Живое сравнение результатов.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {zones.map((z, i) => {
                const Icon = z.icon;
                return (
                  <div
                    key={i}
                    className="group relative p-10 border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-amber-500/40 transition-all"
                  >
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-14 h-14 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                        <Icon className="h-7 w-7 text-amber-400" />
                      </div>
                      <span className="text-xs font-mono text-white/30">ZONE 0{i + 1}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">{z.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {z.items.map((item, j) => (
                        <span
                          key={j}
                          className="px-3 py-1.5 text-sm border border-white/10 rounded-full text-white/70 font-mono"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SPEAKERS */}
        <section className="py-24 md:py-32 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-16">
              <div className="text-xs tracking-[0.3em] uppercase text-amber-400/80 mb-6">
                / 03 — спикеры и приглашенные эксперты
              </div>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                Действующие специалисты рынка
              </h2>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {speakers.map((s, i) => (
                <div key={i} className="group">
                  <div className="aspect-[4/5] bg-gradient-to-br from-white/[0.06] to-white/[0.01] border border-white/10 mb-6 flex items-end p-8 relative overflow-hidden">
                    {(s as any).photo && (
                      <img
                        src={(s as any).photo}
                        alt={s.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    )}
                    {(s as any).photo && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    )}
                    <div className="absolute top-6 right-6 text-xs font-mono text-amber-400/80 z-10">
                      0{i + 1}
                    </div>
                    {!(s as any).photo && (
                      <div className="text-5xl md:text-6xl font-black text-white/10 tracking-tight leading-none">
                        {s.name.split(" ").map((p) => p[0]).join("")}
                      </div>
                    )}
                  </div>
                  <div className="text-xs tracking-[0.2em] uppercase text-amber-400/70 mb-2">{s.role}</div>
                  <h3 className="text-2xl font-bold mb-4">{s.name}</h3>
                  <ul className="space-y-2 mb-3">
                    {s.topics.map((t, j) => (
                      <li key={j} className="text-white/70 leading-relaxed flex gap-3">
                        <span className="text-amber-400/60 mt-2 h-px w-3 flex-shrink-0 bg-amber-400/60" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                  {s.description && (
                    <p className="text-sm text-white/50 leading-relaxed">{s.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROGRAM TIMELINE */}
        <section id="program" className="py-24 md:py-32 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-16">
              <div className="text-xs tracking-[0.3em] uppercase text-amber-400/80 mb-6">
                / 04 — программа
              </div>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Открытый профессиональный разговор
              </h2>
              <p className="text-xl text-white/60">
                Формат: 20–30 минут выступление, обсуждение и вопросы после каждого блока.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {timeline.map((t, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[100px_1fr] md:grid-cols-[180px_1fr] gap-6 md:gap-10 py-8 border-t border-white/10 last:border-b group hover:bg-white/[0.02] transition-colors"
                >
                  <div>
                    <div className="text-xs font-mono text-amber-400 tracking-widest uppercase mb-1">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="text-base md:text-lg font-bold text-white/90">{t.time}</div>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2 leading-snug group-hover:text-amber-100 transition-colors">
                      {t.title}
                    </h3>
                    <p className="text-sm text-white/45 font-mono uppercase tracking-wider">{t.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AUDIENCE */}
        <section className="py-24 md:py-32 border-t border-white/5 bg-white/[0.015]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-16">
              <div className="text-xs tracking-[0.3em] uppercase text-amber-400/80 mb-6">
                / 05 — для кого
              </div>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">Для кого мероприятие</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/5">
              {audience.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className="bg-[#0a0a0c] p-8 hover:bg-white/[0.03] transition-colors">
                    <Icon className="h-7 w-7 text-amber-400 mb-6" />
                    <p className="text-white/85 leading-snug">{a.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 md:py-44 relative overflow-hidden border-t border-amber-500/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.12),transparent_60%)]" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-5xl mx-auto text-center">
              <Flame className="h-12 w-12 text-amber-400 mx-auto mb-10" />
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-12">
                Всё, что обычно приходится выяснять
                <br className="hidden md:block" />{" "}
                <span className="text-amber-400">через собственные ошибки</span>
                <br className="hidden md:block" />
                {" "}и месяцы тестов —<br className="hidden md:block" /> разберём за один вечер.
              </h2>

              <div className="flex justify-center mb-8">
                <CourseApplicationForm
                  courseName={course.title}
                  courseDate={course.date}
                  coursePrice={course.price}
                  buttonLabel="Зарегистрироваться"
                />
              </div>

              <div className="flex items-center justify-center gap-6 text-white/60 flex-wrap">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-amber-400" />
                  <span>24 июня 2026, 15:00–19:00</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>Количество мест ограничено</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-white p-8 md:p-12 shadow-sm">
              <p className="text-center text-xs md:text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground mb-6">
                Наш технологический партнёр
              </p>
              <div className="flex items-center justify-center">
                <img
                  src={upceraPartnerLogo}
                  alt="Upcera — технологический партнёр"
                  className="h-20 md:h-28 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ZirconiaEvent2026;
