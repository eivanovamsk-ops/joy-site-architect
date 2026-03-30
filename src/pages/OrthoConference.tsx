import { useEffect, useRef, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, CheckCircle2, ChevronDown, ArrowRight, Users, Target, Zap, Award, HelpCircle, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseApplicationForm } from "@/components/forms/CourseApplicationForm";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { courses } from "@/data/courses";
import course19Banner from "@/assets/courses/course-19-banner.png";

const ACCENT = "#FF6B35"; // Vibrant orange for ortho energy

/* ─── Floating Video Widget ─── */
function FloatingVideoWidget({ videos }: { videos: string[] }) {
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const handlePlay = () => {
    setPlaying(true);
    setTimeout(() => videoRef.current?.play(), 50);
  };

  const handleNext = () => {
    setCurrentIndex((i) => (i + 1) % videos.length);
    setPlaying(false);
  };

  return (
    <div className={cn(
      "fixed bottom-20 lg:bottom-6 right-4 z-50 transition-all duration-500",
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <div className="relative w-[110px] md:w-[140px] rounded-lg overflow-hidden shadow-2xl border border-[#333] bg-[#1A1A1A]">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-1 right-1 z-10 bg-black/60 hover:bg-black/80 rounded-full p-0.5 transition-colors"
        >
          <X className="h-2.5 w-2.5 text-white" />
        </button>

        {!playing ? (
          <div className="relative cursor-pointer group" onClick={handlePlay}>
            <video src={videos[currentIndex]} className="w-full" preload="metadata" muted playsInline />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                <Play className="h-3 w-3 text-white fill-white" />
              </div>
            </div>
            <div className="absolute bottom-2 left-2 right-8">
              <span className="text-[10px] text-white/70 uppercase tracking-wider">Промо конференции</span>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={videos[currentIndex]}
            className="w-full"
            controls
            playsInline
            onEnded={handleNext}
          />
        )}
      </div>
    </div>
  );
}

/* ─── useReveal ─── */
function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── FAQ Item ─── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#333] rounded-xl overflow-hidden hover:border-[#FF6B35]/30 transition-colors duration-300">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-6 text-left">
        <span className="font-semibold pr-4">{question}</span>
        <ChevronDown className={cn("h-5 w-5 flex-shrink-0 transition-transform duration-300", open && "rotate-180")} style={{ color: ACCENT }} />
      </button>
      <div className={cn("overflow-hidden transition-all duration-300", open ? "max-h-60 pb-6 px-6" : "max-h-0")}>
        <p className="text-[#F5F5F5]/50 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

/* ─── Animated Counter ─── */
function Counter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useReveal();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = end / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [visible, end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Data ─── */
const course = courses.find(c => c.id === 19)!;

const cities = [
  { name: "Казань", date: "15 апреля 2026", emoji: "🕌" },
];

const whyItems = [
  { icon: Target, title: "Готовые протоколы", desc: "Не теория, а готовые к применению алгоритмы от экспертов, которые ежедневно доказывают их эффективность" },
  { icon: Zap, title: "Цифровые технологии", desc: "Планирование на элайнерах, биомеханика сложных движений, виртуальный сетап — всё, что нужно современному ортодонту" },
  { icon: Users, title: "Топ-спикеры", desc: "4 практикующих эксперта с сотнями клинических кейсов и международным признанием" },
  { icon: Award, title: "Сертификат", desc: "Сертификат участника конференции, подтверждающий повышение квалификации" },
];

const programItems = [
  {
    time: "9:30",
    title: "Начало регистрации",
    speaker: "",
    desc: "Регистрация участников, приветственный кофе."
  },
  {
    time: "10:00",
    title: "Элайнеры в действии: биомеханика сложных движений и лечение пациентов с патологией ВНЧС",
    speaker: "Зухра Чеккуева",
    desc: "Биомеханика сложных зубоальвеолярных перемещений, особенности лечения пациентов с дисфункцией ВНЧС, клинические протоколы и разбор кейсов."
  },
  {
    time: "11:00",
    title: "Мягкая сила и жёсткая геометрия: как объединить элайнеры и металл в одном плане лечения",
    speaker: "Анастасия Маркова",
    desc: "Планирование лечения на элайнерах с применением различной дополнительной аппаратуры. Как избежать ошибок на этапе планирования, расставить приоритеты и использовать виртуальный сет-ап на 100%."
  },
  {
    time: "12:15",
    title: "Кофе-брейк",
    speaker: "",
    desc: "Перерыв, неформальное общение, возможность подойти к спикерам с вопросами."
  },
  {
    time: "12:30",
    title: "Планирование ортодонтических аппаратов на скелетной опоре",
    speaker: "Екатерина Гизоева",
    desc: "Выбор места установки, клинические протоколы, разбор реальных кейсов."
  },
  {
    time: "14:00",
    title: "Обед",
    speaker: "",
    desc: "Перерыв на обед."
  },
  {
    time: "14:45",
    title: "Планирование ортодонтических аппаратов на скелетной опоре",
    speaker: "Максим Исаев & Екатерина Гизоева",
    desc: "Совместный разбор клинических кейсов и протоколов."
  },
  {
    time: "16:00",
    title: "Фуршет",
    speaker: "",
    desc: "Подведение итогов, вручение сертификатов, нетворкинг."
  },
];

const stats = [
  { value: 4, suffix: "", label: "Топ-спикера" },
  { value: 200, suffix: "+", label: "Клинических кейсов" },
  { value: 1, suffix: "", label: "День — максимум знаний" },
];

const OrthoConference = () => {
  const heroReveal = useReveal();
  const whyReveal = useReveal();
  const citiesReveal = useReveal();
  const programReveal = useReveal();
  const speakersReveal = useReveal();
  const statsReveal = useReveal();
  const pricingReveal = useReveal();
  const ctaReveal = useReveal();

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /* parallax on hero */
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* timeline line animation */
  const timelineLineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = () => {
      const el = timelineLineRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (rect.height + vh * 0.4)));
      el.style.setProperty("--line-progress", `${progress * 100}%`);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <Layout>
      <div className="oc-page bg-[#1A1A1A] text-[#F5F5F5] min-h-screen overflow-hidden -mt-[116px] lg:-mt-[164px]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Helmet>
          <title>{course.metaTitle} | Учебный центр Артикон</title>
          <meta name="description" content={course.metaDescription} />
          <link rel="canonical" href="https://articon.pro/education/course/19" />
          <meta property="og:title" content="Точка опоры — Ортодонтическая конференция | Артикон" />
          <meta property="og:description" content={course.metaDescription} />
          <meta property="og:image" content={course19Banner} />
          <meta property="og:type" content="article" />
        </Helmet>

        {/* ═══════ HERO ═══════ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[116px] lg:pt-[164px]">
          <div ref={heroRef} className="absolute inset-0 will-change-transform">
            <img src={course19Banner} alt="Точка опоры" className="w-full h-[120%] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/70 via-[#1A1A1A]/50 to-[#1A1A1A]" />
          </div>

          {/* Animated orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="oc-orb oc-orb-1" />
            <div className="oc-orb oc-orb-2" />
            <div className="oc-orb oc-orb-3" />
          </div>

          <div ref={heroReveal.ref} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <div className={cn("transition-all duration-1000 ease-out", heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${ACCENT})` }} />
                <span className="text-sm tracking-[0.3em] uppercase" style={{ color: ACCENT }}>Конференция</span>
                <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${ACCENT})` }} />
              </div>
            </div>

            <h1 className={cn(
              "text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 transition-all duration-1000 delay-200 ease-out",
              heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <span className="oc-text-reveal inline-block">Точка</span>{" "}
              <span className="oc-text-reveal inline-block" style={{ animationDelay: "0.3s", color: ACCENT }}>опоры</span>
            </h1>

            <p className={cn(
              "text-lg md:text-xl text-[#F5F5F5]/60 mb-4 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ease-out",
              heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              Ортодонтическая конференция: стратегия, планирование и цифровые технологии для безупречного результата. Найдите свою точку опоры в сложных клинических кейсах.
            </p>

            <div className={cn(
              "flex flex-wrap justify-center gap-4 text-sm mb-10 transition-all duration-1000 delay-700 ease-out",
              heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <div className="flex items-center gap-2.5 bg-[#FF6B35]/20 backdrop-blur-sm border border-[#FF6B35]/40 rounded-full px-5 py-2.5">
                <Calendar className="h-4 w-4" style={{ color: ACCENT }} />
                <span className="font-bold text-[#F5F5F5]">15 апреля 2026</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
                <MapPin className="h-4 w-4" style={{ color: ACCENT }} />
                <span className="text-[#F5F5F5]/80">Казань</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
                <Clock className="h-4 w-4" style={{ color: ACCENT }} />
                <span className="text-[#F5F5F5]/80">10:00 — 16:00</span>
              </div>
            </div>

            <div className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-900 ease-out",
              heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <div className="oc-cta-glow">
                <CourseApplicationForm
                  courseName={course.title}
                  courseDate={course.date}
                  buttonLabel="Забронировать место"
                  
                />
              </div>
              <button onClick={() => scrollTo("oc-why")} className="text-[#F5F5F5]/50 hover:text-[#F5F5F5] transition-colors text-sm flex items-center gap-2">
                Подробнее <ChevronDown className="h-4 w-4 animate-bounce" />
              </button>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#F5F5F5]/30">
            <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, transparent, ${ACCENT}40)` }} />
          </div>
        </section>

        {/* ═══════ STATS ═══════ */}
        <section className="py-16 relative border-b border-[#2A2A2A]">
          <div className="container mx-auto px-4">
            <div ref={statsReveal.ref} className={cn(
              "grid grid-cols-3 gap-8 max-w-3xl mx-auto transition-all duration-1000",
              statsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-extrabold mb-2" style={{ color: ACCENT }}>
                    <Counter end={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-sm text-[#F5F5F5]/40">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ WHY ATTEND ═══════ */}
        <section id="oc-why" className="py-24 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <div ref={whyReveal.ref} className={cn(
              "max-w-5xl mx-auto transition-all duration-1000",
              whyReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <div className="text-center mb-16">
                <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Почему стоит прийти</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Концентрат практических знаний</h2>
                <p className="text-xl font-semibold" style={{ color: ACCENT }}>Не теория — а готовые протоколы</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {whyItems.map((item, i) => {
                  const r = useReveal();
                  return (
                    <div
                      key={i}
                      ref={r.ref}
                      className={cn(
                        "bg-[#222]/60 border border-[#333] rounded-2xl p-8 hover:border-[#FF6B35]/30 transition-all duration-500 group",
                        r.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                      )}
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}30` }}>
                        <item.icon className="h-7 w-7" style={{ color: ACCENT }} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-[#F5F5F5]/50 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* CTA after why */}
              <div className="text-center mt-12">
                <div className="oc-cta-glow inline-block">
                  <CourseApplicationForm
                    courseName={course.title}
                    courseDate={course.date}
                    buttonLabel="Записаться на конференцию"
                    
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ CITIES ═══════ */}
        {/* ═══════ CITY INFO ═══════ */}
        <section className="py-24 lg:py-32 relative border-t border-[#2A2A2A]">
          <div className="container mx-auto px-4">
            <div ref={citiesReveal.ref} className={cn(
              "max-w-lg mx-auto text-center transition-all duration-1000",
              citiesReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <div className="text-center mb-12">
                <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>География</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Казань</h2>
                <p className="text-[#F5F5F5]/50 text-lg">15 апреля 2026</p>
              </div>

              <div className="oc-cta-glow">
                <CourseApplicationForm
                  courseName={course.title}
                  courseDate="15 апреля 2026"
                  buttonLabel="Записаться на конференцию"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ SPEAKERS ═══════ */}
        <section id="oc-speakers" className="py-24 lg:py-32 relative border-t border-[#2A2A2A]">
          <div className="container mx-auto px-4">
            <div ref={speakersReveal.ref} className={cn(
              "text-center mb-6 transition-all duration-700",
              speakersReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Эксперты</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Спикеры конференции</h2>
              <p className="text-[#F5F5F5]/50 max-w-2xl mx-auto text-lg">
                Практикующие эксперты с международным признанием и сотнями клинических кейсов
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-12">
              {course.lecturers.map((lecturer, i) => {
                const reveal = useReveal();
                return (
                  <div
                    key={i}
                    ref={reveal.ref}
                    className={cn(
                      "group relative bg-[#222]/80 rounded-2xl overflow-hidden border border-[#333] transition-all duration-500 hover:border-[#FF6B35]/50 hover:shadow-[0_0_40px_-10px_#FF6B3540]",
                      reveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    )}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    {/* Photo */}
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={lecturer.photo}
                        alt={lecturer.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/20 to-transparent" />
                    </div>

                    {/* Info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-lg font-bold mb-1">{lecturer.name}</h3>
                      <p className="text-xs mb-2" style={{ color: ACCENT }}>{lecturer.position}</p>
                      <p className="text-xs text-[#F5F5F5]/50 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-32 overflow-hidden">
                        {lecturer.bio}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA after speakers */}
            <div className="text-center mt-12">
              <div className="oc-cta-glow inline-block">
                <CourseApplicationForm
                  courseName={course.title}
                  courseDate={course.date}
                  buttonLabel="Записаться на конференцию"
                  
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ PROGRAM ═══════ */}
        <section id="oc-program" className="py-24 lg:py-32 relative border-t border-[#2A2A2A]">
          <div className="container mx-auto px-4">
            <div ref={programReveal.ref} className={cn(
              "text-center mb-6 transition-all duration-700",
              programReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Программа</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Программа конференции</h2>
              <p className="text-[#F5F5F5]/50 max-w-2xl mx-auto text-lg">От цифровой модели к идеальной окклюзии — полный цикл за один день</p>
            </div>

            <div ref={timelineLineRef} className="relative max-w-3xl mx-auto mt-12">
              {/* Animated line */}
              <div className="absolute left-[28px] md:left-[40px] top-0 bottom-0 w-px bg-[#333]">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-b transition-all duration-100" style={{ height: "var(--line-progress, 0%)", backgroundImage: `linear-gradient(to bottom, ${ACCENT}, ${ACCENT}40)` }} />
              </div>

              <div className="space-y-12">
                {programItems.map((item, i) => {
                  const r = useReveal(0.2);
                  return (
                    <div
                      key={i}
                      ref={r.ref}
                      className={cn(
                        "relative pl-16 md:pl-24 transition-all duration-700",
                        r.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-30px]"
                      )}
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      {/* Dot */}
                      <div className="absolute left-[22px] md:left-[34px] top-1 w-3 h-3 rounded-full border-2 transition-colors duration-500" style={{ borderColor: r.visible ? ACCENT : "#555", background: r.visible ? ACCENT : "transparent" }} />

                      {/* Time */}
                      <div className="text-sm font-bold tracking-wider mb-1" style={{ color: ACCENT }}>{item.time}</div>

                      {/* Card */}
                      <div className="bg-[#222]/60 border border-[#333] rounded-xl p-6 hover:border-[#FF6B35]/30 transition-all duration-300">
                        <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                        {item.speaker && <p className="text-sm text-[#F5F5F5]/40 mb-2">{item.speaker}</p>}
                        <p className="text-[#F5F5F5]/60 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ WHAT YOU'LL LEARN ═══════ */}
        <section className="py-24 lg:py-32 relative border-t border-[#2A2A2A]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full blur-[200px]" style={{ background: `${ACCENT}08` }} />
          </div>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Навыки</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Чему вы научитесь</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {course.skills.map((skill, i) => {
                  const r = useReveal();
                  return (
                    <div
                      key={i}
                      ref={r.ref}
                      className={cn(
                        "flex items-start gap-4 bg-[#222]/60 border border-[#333] rounded-xl p-5 hover:border-[#FF6B35]/30 transition-all duration-500",
                        r.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      )}
                      style={{ transitionDelay: `${i * 80}ms` }}
                    >
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                      <span className="text-[#F5F5F5]/70 text-sm leading-relaxed">{skill}</span>
                    </div>
                  );
                })}
              </div>

              {/* CTA after skills */}
              <div className="text-center mt-12">
                <div className="oc-cta-glow inline-block">
                  <CourseApplicationForm
                    courseName={course.title}
                    courseDate={course.date}
                    buttonLabel="Записаться на конференцию"
                    
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ PRICING ═══════ */}
        <section className="py-24 lg:py-32 relative border-t border-[#2A2A2A]">
          <div className="container mx-auto px-4">
            <div ref={pricingReveal.ref} className={cn(
              "max-w-lg mx-auto text-center transition-all duration-1000",
              pricingReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <div className="bg-[#222]/80 border border-[#333] rounded-3xl p-10 hover:border-[#FF6B35]/30 transition-all duration-500 relative overflow-hidden">
                {/* Sale badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: ACCENT, color: "#1A1A1A" }}>
                  СКИДКА 67%
                </div>

                <span className="text-sm tracking-[0.3em] uppercase mb-6 block" style={{ color: ACCENT }}>Стоимость</span>

                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-2xl text-[#F5F5F5]/30 line-through">15 000 ₽</span>
                  <span className="text-5xl md:text-6xl font-extrabold">5 000 ₽</span>
                </div>
                <p className="text-[#F5F5F5]/40 text-sm mb-8">Конференция • 1 день • Казань</p>

                <div className="space-y-3 text-left mb-8">
                  {course.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-[#F5F5F5]/60">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="oc-cta-glow">
                  <CourseApplicationForm
                    courseName={course.title}
                    courseDate={course.date}
                    buttonVariant="card"
                    buttonLabel="Забронировать место"
                    
                  />
                </div>

                <p className="text-xs text-[#F5F5F5]/30 mt-4">
                  Для оплаты от юрлица пришлите нам свои реквизиты.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ TARGET AUDIENCE ═══════ */}
        <section className="py-24 lg:py-32 relative border-t border-[#2A2A2A]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Для кого</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-12">Кому будет полезно</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {course.targetAudience.map((item, i) => (
                  <div key={i} className="bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-full px-6 py-3 text-sm font-medium" style={{ color: ACCENT }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ FAQ ═══════ */}
        <section className="py-24 lg:py-32 relative border-t border-[#2A2A2A]">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <HelpCircle className="h-8 w-8 mx-auto mb-4" style={{ color: ACCENT }} />
              <h2 className="text-3xl font-bold">Часто задаваемые вопросы</h2>
            </div>
            <div className="space-y-4">
              {course.faq.map((item, i) => (
                <FaqItem key={i} question={item.question} answer={item.answer} />
              ))}
            </div>

            {/* CTA after FAQ */}
            <div className="text-center mt-12">
              <p className="text-[#F5F5F5]/40 mb-4">Остались вопросы?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="oc-cta-glow">
                  <CourseApplicationForm
                    courseName={course.title}
                    courseDate={course.date}
                    buttonLabel="Записаться на конференцию"
                    
                  />
                </div>
                <a href="https://t.me/articon_education" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-[#555] text-[#F5F5F5] hover:bg-[#F5F5F5]/10 hover:border-[#888]">
                    Написать в Telegram
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ FINAL CTA ═══════ */}
        <section className="py-24 lg:py-32 relative overflow-hidden border-t border-[#2A2A2A]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full blur-[250px]" style={{ background: `${ACCENT}0A` }} />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[200px]" style={{ background: `${ACCENT}06` }} />
          </div>
          <div className="container mx-auto px-4 relative">
            <div ref={ctaReveal.ref} className={cn(
              "text-center max-w-2xl mx-auto transition-all duration-1000",
              ctaReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Найдите свою точку опоры
              </h2>
              <p className="text-[#F5F5F5]/50 mb-10 text-lg">
                Запишитесь на конференцию и получите готовые протоколы и алгоритмы от ведущих экспертов в ортодонтии.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="oc-cta-glow">
                  <CourseApplicationForm
                    courseName={course.title}
                    courseDate={course.date}
                    buttonLabel="Забронировать место"
                    
                  />
                </div>
                <a href="https://t.me/articon_education" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-[#555] text-[#F5F5F5] hover:bg-[#F5F5F5]/10 hover:border-[#888]">
                    Задать вопрос
                  </Button>
                </a>
              </div>

              <div className="mt-10 text-[#F5F5F5]/40 text-sm">
                <p>Остались вопросы? Звоните!</p>
                <div className="flex flex-wrap justify-center gap-4 mt-2">
                  <a href="tel:+79032500181" className="hover:text-[#F5F5F5] transition-colors">8 (903) 250-01-81</a>
                  <a href="tel:+79060457537" className="hover:text-[#F5F5F5] transition-colors">8 (906) 045-75-37</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ FLOATING VIDEO WIDGET ═══════ */}
        <FloatingVideoWidget videos={["/videos/ortho-conference-promo.mp4"]} />

        {/* ═══════ BACK LINK ═══════ */}
        <div className="border-t border-[#2A2A2A] py-8">
          <div className="container mx-auto px-4 text-center">
            <Link to="/education/calendar" className="text-sm text-[#F5F5F5]/40 hover:text-[#F5F5F5]/70 transition-colors inline-flex items-center gap-2">
              <ArrowRight className="h-4 w-4 rotate-180" /> Все курсы и мероприятия
            </Link>
          </div>
        </div>

        {/* ═══════ MOBILE STICKY CTA ═══════ */}
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#1A1A1A]/95 backdrop-blur-md border-t border-[#333] p-3 safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-lg text-[#F5F5F5]/30 line-through">15 000 ₽</span>
                <span className="font-extrabold text-xl" style={{ color: ACCENT }}>5 000 ₽</span>
              </div>
              <div className="text-xs text-[#F5F5F5]/40 truncate">Точка опоры • Казань</div>
            </div>
            <CourseApplicationForm
              courseName={course.title}
              courseDate={course.date}
              buttonVariant="card"
              buttonLabel="Записаться"
              
            />
          </div>
        </div>
        <div className="h-20 lg:hidden" />

        {/* ═══════ SCOPED STYLES ═══════ */}
        <style>{`
          .oc-page { scroll-behavior: smooth; }

          .oc-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(120px);
            opacity: 0.15;
            animation: oc-float 12s ease-in-out infinite;
          }
          .oc-orb-1 {
            width: 400px; height: 400px;
            background: ${ACCENT};
            top: 20%; left: 10%;
          }
          .oc-orb-2 {
            width: 300px; height: 300px;
            background: #E55A2B;
            bottom: 20%; right: 15%;
            animation-delay: -4s;
          }
          .oc-orb-3 {
            width: 250px; height: 250px;
            background: #FF8F5E;
            top: 40%; right: 30%;
            animation-delay: -8s;
          }

          @keyframes oc-float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -20px) scale(1.05); }
            66% { transform: translate(-20px, 15px) scale(0.95); }
          }

          .oc-text-reveal {
            animation: oc-reveal 0.8s ease-out forwards;
            opacity: 0;
            transform: translateY(20px);
          }
          @keyframes oc-reveal {
            to { opacity: 1; transform: translateY(0); }
          }

          .oc-cta-glow button {
            background: ${ACCENT} !important;
            color: #1A1A1A !important;
            border: none !important;
            font-weight: 700 !important;
            transition: box-shadow 0.3s ease, transform 0.3s ease !important;
          }
          .oc-cta-glow button:hover {
            box-shadow: 0 0 30px ${ACCENT}50, 0 0 60px ${ACCENT}20 !important;
            transform: translateY(-2px) !important;
          }

          .oc-page .gradient-primary {
            background: ${ACCENT} !important;
            color: #1A1A1A !important;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default OrthoConference;
