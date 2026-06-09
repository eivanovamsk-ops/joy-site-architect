import { useEffect, useRef, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import {
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ScanLine,
  Layers,
  AlertTriangle,
  Wrench,
  FileCheck2,
  Activity,
  Anchor,
  Workflow,
  Cpu,
  Award,
  Navigation,
  Wallet,
} from "lucide-react";
import { CourseApplicationForm } from "@/components/forms/CourseApplicationForm";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { courses } from "@/data/courses";
import { CourseContactBlock } from "@/components/education/CourseContactBlock";
import heroImg from "@/assets/courses/course-39-hero.jpg";

const ACCENT = "#22D3A8";       // bright emerald
const ACCENT2 = "#22D3EE";      // cyan
const COURSE_ID = 39;

function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] hover:border-[#22D3A8]/40 transition-colors duration-300">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-6 text-left">
        <span className="font-semibold pr-4 text-white">{question}</span>
        <ChevronDown className={cn("h-5 w-5 flex-shrink-0 transition-transform duration-300", open && "rotate-180")} style={{ color: ACCENT }} />
      </button>
      <div className={cn("overflow-hidden transition-all duration-300", open ? "max-h-72 pb-6 px-6" : "max-h-0")}>
        <p className="text-white/60 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

function Counter({ end, suffix = "", duration = 1600 }: { end: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useReveal();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = end / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= end) {
        setVal(end);
        clearInterval(id);
      } else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [visible, end, duration]);
  return (
    <span ref={ref}>
      {val.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}

const course = courses.find((c) => c.id === COURSE_ID)!;

const blocks = [
  { icon: Sparkles, title: "Старт без страха", desc: "Почему сканер кажется сложным, какие ошибки нормальны и как быстро выстроить понятный протокол. Как выбрать сканер под свои задачи." },
  { icon: ScanLine, title: "Цифровой оттиск", desc: "Что видит сканер, артефакты, форматы STL / PLY / OBJ. Подготовка поля: изоляция, ретракция, гемостаз, граница препарирования." },
  { icon: Layers, title: "Базовый протокол", desc: "Зубной ряд, антагонист, регистрация прикуса, техника и скорость сканирования, положение руки, ведение цифрового приёма." },
  { icon: AlertTriangle, title: "Ошибки новичка", desc: "Слюна, кровь, нарушение дистанции, ошибки прикуса, пустоты в скане — причины и способы исправления." },
  { icon: Wrench, title: "Hands-on практика", desc: "Каждый участник делает скан стандартного кейса, проверяет результат по чек-листу и сам исправляет найденные ошибки." },
  { icon: FileCheck2, title: "Можно ли отправлять скан?", desc: "Критерии качества: граница, контакты, прикус, артефакты. Какие файлы и фото отправить технику, что написать в комментарии." },
  { icon: Activity, title: "Сложные клинические условия", desc: "Кровоточивость, поддесневой уступ, глубокая граница, культевые вкладки. Когда лучше отложить скан." },
  { icon: Anchor, title: "Имплантаты и скан-маркеры", desc: "Выбор маркера, посадка, глубокий имплантат, узкое межзубное пространство. Загрузка библиотек скан-маркеров." },
  { icon: Workflow, title: "All-on-4 / All-on-6", desc: "Пошаговый разбор цифрового и комбинированного протокола: полная дуга, мульти-юниты, отсутствие референсов, трансфер-чек." },
  { icon: Cpu, title: "ИИ и полезные инструменты", desc: "BiteFinder, SmileCloud, UltraFitScan. Где ИИ уже встроен в рабочий процесс и когда нельзя доверять алгоритму." },
];

const outcomes = [
  "Уверенно выполнять ортопедический цифровой протокол",
  "Распознавать критические ошибки скана прямо в кресле",
  "Правильно использовать скан-маркеры и трансфер-чек",
  "Понимать, когда нужно отложить скан и почему",
  "Передавать лаборатории полный набор данных без пересъёмок",
];

const handouts = [
  "Протокол All-on-Х: пошаговая карта этапов",
  "Чек-лист сложных ситуаций: кровь, слюна, потеря трекинга, глубокая позиция имплантата",
  "Чек-лист «Можно ли отправлять скан в лабораторию?»",
];

const stats = [
  { value: 10, suffix: "", label: "Тематических блоков" },
  { value: 1, suffix: " день", label: "Полная иммерсия" },
  { value: 5000, suffix: " ₽", label: "Стоимость участия" },
];

const directions = [
  { label: "от МЦК Верхние Котлы", detail: "~590 метров — 6 минут ходьбы", url: "https://yandex.ru/maps/?um=constructor%3A442f99c6df6275987c5859cab9ee67bdc166a3cc90cacccb19fad26b76c17fa8&source=constructorLink" },
  { label: "Бесплатная городская парковка", detail: "Варшавское шоссе 37 — ~350 метров", url: "https://yandex.com/maps/?um=constructor%3A85626b6fae5edde3fd111cdd1e03c04bfc50a71c52f16a3cdf12bc203952f680&source=constructorLink" },
  { label: "от метро Нагатинская", detail: "~970 метров — 11 минут ходьбы", url: "https://yandex.ru/maps/?um=constructor%3Ae6e60cdef332cbf2a45c590280538cb70953e7dd0cb17aa60f1db1016e2fb1ec&source=constructorLink" },
];

const DigitalScanOrthopedics = () => {
  const heroReveal = useReveal();
  const statsReveal = useReveal();
  const blocksReveal = useReveal();
  const outcomesReveal = useReveal();
  const lecturerReveal = useReveal();
  const handoutsReveal = useReveal();
  const pricingReveal = useReveal();
  const directionsReveal = useReveal();

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const lecturer = course.lecturers[0];
  const initials = lecturer.name.split(" ").slice(0, 2).map((s) => s[0]).join("");

  return (
    <Layout>
      <div className="bg-[#070B14] text-white min-h-screen overflow-hidden -mt-[116px] lg:-mt-[164px]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Helmet>
          <title>{course.metaTitle}</title>
          <meta name="description" content={course.metaDescription} />
          <link rel="canonical" href={`https://articon.pro/education/course/${COURSE_ID}`} />
        </Helmet>

        {/* ───── HERO ───── */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-[116px] lg:pt-[164px]">
          {/* glow background */}
          <div className="absolute inset-0">
            <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[120px] opacity-40" style={{ background: ACCENT }} />
            <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30" style={{ background: ACCENT2 }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#070B14_75%)]" />
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
              <div ref={heroReveal.ref}>
                <div className={cn("transition-all duration-1000", heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border" style={{ background: `${ACCENT}15`, borderColor: `${ACCENT}40` }}>
                    <Sparkles className="h-4 w-4" style={{ color: ACCENT }} />
                    <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: ACCENT }}>
                      Новый практический семинар
                    </span>
                  </div>
                </div>

                <h1
                  className={cn(
                    "text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.02] transition-all duration-1000 delay-150",
                    heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  )}
                >
                  Скан{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})` }}
                  >
                    без переделок
                  </span>
                </h1>

                <p
                  className={cn(
                    "text-xl md:text-2xl text-white/70 mb-3 max-w-xl leading-snug font-light transition-all duration-1000 delay-300",
                    heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  )}
                >
                  Цифровой оттиск в ортопедии и имплантации
                </p>
                <p
                  className={cn(
                    "text-base md:text-lg text-white/50 mb-8 max-w-xl transition-all duration-1000 delay-500",
                    heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  )}
                >
                  Практический семинар для стоматологов-ортопедов, которые только начинают работать с интраоральным сканером.
                  Получите точный цифровой оттиск с первого раза и передайте лаборатории данные так, чтобы конструкция села без переделок.
                </p>

                <div
                  className={cn(
                    "flex flex-wrap gap-3 text-sm mb-8 transition-all duration-1000 delay-700",
                    heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  )}
                >
                  <div className="flex items-center gap-2 backdrop-blur-sm border rounded-full px-4 py-2" style={{ background: `${ACCENT}18`, borderColor: `${ACCENT}45` }}>
                    <Calendar className="h-4 w-4" style={{ color: ACCENT }} />
                    <span className="font-bold">22 июля 2026</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                    <Clock className="h-4 w-4" style={{ color: ACCENT2 }} />
                    <span className="text-white/80">11:00 — 17:00</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                    <MapPin className="h-4 w-4" style={{ color: ACCENT2 }} />
                    <span className="text-white/80">Москва, Варшавское ш., 33с12</span>
                  </div>
                </div>

                <div
                  className={cn(
                    "flex flex-col sm:flex-row gap-4 items-start transition-all duration-1000 delay-1000",
                    heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  )}
                >
                  <CourseApplicationForm courseName={course.title} courseDate={course.date} buttonLabel="Записаться за 5 000 ₽" />
                  <button
                    onClick={() => scrollTo("program")}
                    className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2 py-3"
                  >
                    Программа семинара <ChevronDown className="h-4 w-4 animate-bounce" />
                  </button>
                </div>
              </div>

              {/* Hero image */}
              <div className="hidden lg:flex relative items-center justify-end">
                <div
                  className="absolute inset-0 rounded-[40px] blur-3xl opacity-50"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${ACCENT}, transparent 65%)` }}
                />
                <div className="relative w-full max-w-xl rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
                  <img src={heroImg} alt="Интраоральный сканер" className="w-full h-auto object-cover" width={1280} height={960} />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#070B14] via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                    <div className="px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md" style={{ background: `${ACCENT}25`, borderColor: `${ACCENT}50`, color: ACCENT }}>
                      Цифровой протокол
                    </div>
                    <div className="px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md bg-white/10 border-white/20 text-white">
                      Hands-on
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── STATS ───── */}
        <section className="py-16 relative border-y border-white/5 bg-white/[0.015]">
          <div className="container mx-auto px-4">
            <div
              ref={statsReveal.ref}
              className={cn(
                "grid grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-1000",
                statsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
            >
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div
                    className="text-4xl md:text-6xl font-black mb-2 bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})` }}
                  >
                    <Counter end={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs md:text-sm text-white/50 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── OUTCOMES ───── */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <div
              ref={outcomesReveal.ref}
              className={cn(
                "max-w-5xl mx-auto transition-all duration-1000",
                outcomesReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
            >
              <div className="text-center mb-12">
                <span className="text-xs tracking-[0.3em] uppercase mb-4 block font-semibold" style={{ color: ACCENT }}>
                  После семинара вы сможете
                </span>
                <h2 className="text-3xl md:text-5xl font-bold">
                  Точный скан{" "}
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})` }}>
                    с первого раза
                  </span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {outcomes.map((o, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#22D3A8]/40 transition-colors"
                  >
                    <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                    <p className="text-white/85 leading-relaxed">{o}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── PROGRAM BLOCKS ───── */}
        <section id="program" className="py-24 relative border-t border-white/5">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-10" style={{ background: ACCENT }} />
          </div>
          <div className="container mx-auto px-4 relative">
            <div
              ref={blocksReveal.ref}
              className={cn(
                "transition-all duration-1000",
                blocksReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
            >
              <div className="text-center mb-16">
                <span className="text-xs tracking-[0.3em] uppercase mb-4 block font-semibold" style={{ color: ACCENT }}>
                  10 блоков
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Что будем разбирать</h2>
                <p className="text-lg text-white/55 max-w-2xl mx-auto">
                  От базового цифрового оттиска и работы с мягкими тканями до All-on-Х и роли искусственного интеллекта в кресле врача
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
                {blocks.map((b, i) => (
                  <div
                    key={i}
                    className="group relative p-7 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] hover:border-[#22D3A8]/50 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div
                      className="absolute top-4 right-5 text-5xl font-black opacity-10 group-hover:opacity-25 transition-opacity"
                      style={{ color: ACCENT }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                      style={{ background: `${ACCENT}18`, border: `1px solid ${ACCENT}40` }}
                    >
                      <b.icon className="h-6 w-6" style={{ color: ACCENT }} />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-white">{b.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── LECTURER ───── */}
        <section className="py-24 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div
              ref={lecturerReveal.ref}
              className={cn(
                "max-w-4xl mx-auto transition-all duration-1000",
                lecturerReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
            >
              <div className="text-center mb-12">
                <span className="text-xs tracking-[0.3em] uppercase mb-4 block font-semibold" style={{ color: ACCENT }}>
                  Лектор
                </span>
                <h2 className="text-3xl md:text-4xl font-bold">Ведёт семинар</h2>
              </div>

              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 md:p-10">
                <div
                  className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-30"
                  style={{ background: ACCENT }}
                />
                <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div
                    className="flex-shrink-0 w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden flex items-center justify-center text-5xl font-black border-2"
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT}30, ${ACCENT2}30)`,
                      borderColor: `${ACCENT}60`,
                      color: ACCENT,
                    }}
                  >
                    {lecturer.photo ? (
                      <img
                        src={lecturer.photo}
                        alt={lecturer.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{lecturer.name}</h3>
                    <p className="text-base mb-4" style={{ color: ACCENT }}>
                      {lecturer.position}
                    </p>
                    <p className="text-white/65 leading-relaxed mb-5">{lecturer.bio}</p>
                    {lecturer.achievements && (
                      <ul className="space-y-2">
                        {lecturer.achievements.map((a, i) => (
                          <li key={i} className="flex items-start gap-2 text-white/75 text-sm">
                            <Award className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: ACCENT2 }} />
                            {a}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── HANDOUTS ───── */}
        <section className="py-24 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div
              ref={handoutsReveal.ref}
              className={cn(
                "max-w-4xl mx-auto transition-all duration-1000",
                handoutsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
            >
              <div className="text-center mb-12">
                <span className="text-xs tracking-[0.3em] uppercase mb-4 block font-semibold" style={{ color: ACCENT }}>
                  Заберёте с собой
                </span>
                <h2 className="text-3xl md:text-4xl font-bold">Раздаточные материалы</h2>
              </div>
              <div className="space-y-3">
                {handouts.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#22D3EE]/40 transition-colors"
                  >
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold"
                      style={{ background: `${ACCENT2}20`, color: ACCENT2 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <p className="text-white/80 leading-relaxed flex-1">{h}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── PRICING / CTA ───── */}
        <section className="py-24 border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[160px] opacity-25" style={{ background: ACCENT }} />
          </div>
          <div className="container mx-auto px-4 relative">
            <div
              ref={pricingReveal.ref}
              className={cn(
                "max-w-2xl mx-auto text-center transition-all duration-1000",
                pricingReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border" style={{ background: `${ACCENT}15`, borderColor: `${ACCENT}40` }}>
                <Wallet className="h-4 w-4" style={{ color: ACCENT }} />
                <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: ACCENT }}>
                  Стоимость участия
                </span>
              </div>
              <div
                className="text-7xl md:text-8xl font-black mb-4 bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})` }}
              >
                5 000 ₽
              </div>
              <p className="text-white/55 mb-8 text-lg">
                22 июля 2026 · 11:00 — 17:00
                <br />
                Москва, Варшавское шоссе, д. 33с12
              </p>
              <div className="flex justify-center">
                <CourseApplicationForm courseName={course.title} courseDate={course.date} buttonLabel="Забронировать место" />
              </div>
              <p className="text-xs text-white/40 mt-5">Количество мест на hands-on ограничено</p>
            </div>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section className="py-24 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs tracking-[0.3em] uppercase mb-4 block font-semibold" style={{ color: ACCENT }}>
                  FAQ
                </span>
                <h2 className="text-3xl md:text-4xl font-bold">Частые вопросы</h2>
              </div>
              <div className="space-y-3">
                {course.faq.map((f, i) => (
                  <FaqItem key={i} question={f.question} answer={f.answer} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── DIRECTIONS ───── */}
        <section className="py-24 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div
              ref={directionsReveal.ref}
              className={cn(
                "max-w-5xl mx-auto transition-all duration-1000",
                directionsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
            >
              <div className="text-center mb-12">
                <span className="text-xs tracking-[0.3em] uppercase mb-4 block font-semibold" style={{ color: ACCENT }}>
                  Место проведения
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Как добраться</h2>
                <p className="text-white/55">Учебный центр Артикон, Варшавское шоссе, д. 33с12</p>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {directions.map((d, i) => (
                  <a
                    key={i}
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#22D3A8]/50 transition-all duration-300 group text-center"
                  >
                    <Navigation className="h-8 w-8 mx-auto mb-4 group-hover:scale-110 transition-transform" style={{ color: ACCENT }} />
                    <h3 className="font-bold mb-1 text-white">{d.label}</h3>
                    <p className="text-sm text-white/55">{d.detail}</p>
                    <span className="text-xs mt-3 inline-block" style={{ color: ACCENT2 }}>
                      Открыть в Яндекс Картах →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CourseContactBlock />
      </div>
    </Layout>
  );
};

export default DigitalScanOrthopedics;
