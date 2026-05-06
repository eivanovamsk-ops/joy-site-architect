import { useEffect, useRef, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, CheckCircle2, ChevronDown, ArrowRight, Users, Target, Zap, Award, HelpCircle, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseApplicationForm } from "@/components/forms/CourseApplicationForm";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { courses } from "@/data/courses";
import { CourseContactBlock } from "@/components/education/CourseContactBlock";
import course22Banner from "@/assets/courses/course-22-banner.webp";
import revylineLogo from "@/assets/partners/revyline-logo.webp";
import obkLogo from "@/assets/partners/obk-logo.webp";
import eonAlignerLogo from "@/assets/partners/eon-aligner-logo.svg";
import protectLogo from "@/assets/partners/protect-logo.webp";
import greendentLogo from "@/assets/partners/greendent-logo-new.webp";
import denteduLogo from "@/assets/partners/dentedu-logo.png";
import course22Photo1 from "@/assets/courses/course-22-gallery/photo-1.webp";
import course22Photo2 from "@/assets/courses/course-22-gallery/photo-2.webp";
import course22Photo3 from "@/assets/courses/course-22-gallery/photo-3.webp";
import course22Photo4 from "@/assets/courses/course-22-gallery/photo-4.webp";
import course22Photo5 from "@/assets/courses/course-22-gallery/photo-5.webp";
import course22Photo6 from "@/assets/courses/course-22-gallery/photo-6.webp";
import course22Photo7 from "@/assets/courses/course-22-gallery/photo-7.webp";
import course22Photo8 from "@/assets/courses/course-22-gallery/photo-8.webp";
import course22Photo9 from "@/assets/courses/course-22-gallery/photo-9.webp";
import course22Photo10 from "@/assets/courses/course-22-gallery/photo-10.webp";

const gallerySlides = [
  { src: course22Photo1 },
  { src: course22Photo2 },
  { src: course22Photo3 },
  { src: course22Photo4 },
  { src: course22Photo5 },
  { src: course22Photo6 },
  { src: course22Photo7 },
  { src: course22Photo8 },
  { src: course22Photo9 },
  { src: course22Photo10 },
];

const ACCENT = "#00A3FF"; // Blue accent for digital orthodontics

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
    <div className="border border-[#333] rounded-xl overflow-hidden hover:border-[#00A3FF]/30 transition-colors duration-300">
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
const course = courses.find(c => c.id === 22)!;

const whyItems = [
  { icon: Target, title: "Цифра + биомеханика", desc: "Уникальная коллаборация ортодонтии и цифровой гнатологии — разбор кейсов с разных сторон" },
  { icon: Zap, title: "Digital-кейсы", desc: "Реальные клинические случаи с полным цифровым воркфлоу: от диагностики до результата" },
  { icon: Users, title: "Нетворкинг", desc: "Знакомства с лидерами индустрии, обмен контактами и поиск партнёров для сложных случаев" },
  { icon: Award, title: "Сертификат", desc: "Сертификат участника конференции, подтверждающий повышение квалификации" },
];

const programItems = [
  { time: "11:00", title: "Welcome Drink", speaker: "", desc: "Встреча участников, приветственные напитки." },
  { time: "12:00", title: "Аппарат Carriere Motion: Революционный подход к коррекции аномалий прикуса 2 класса", speaker: "Зухра Чеккуева", desc: "Революционный подход к коррекции аномалий прикуса 2 класса с помощью аппарата Carriere Motion." },
  { time: "13:00", title: "Биомеханика ВНЧС: цифровая гнатология, малоинвазивная хирургия и аппаратная механотерапия", speaker: "Дмитрий Шипика", desc: "Цифровая гнатология, малоинвазивная хирургия и аппаратная механотерапия." },
  { time: "14:00", title: "Коррекция десневой улыбки, биомеханика интрузии с дистализацией, пирамидальные микроимплантаты", speaker: "Ильяр Нуртдинов", desc: "Коррекция десневой улыбки, биомеханика интрузии с дистализацией, пирамидальные микроимплантаты." },
  { time: "15:00", title: "Кофе-брейк", speaker: "", desc: "Перерыв, неформальное общение со спикерами." },
  { time: "15:40", title: "Экскурсия по производству", speaker: "", desc: "Экскурсия по производству Артикон." },
  { time: "16:00", title: "Планирование ортодонтических аппаратов на скелетной опоре (SARPE, MARPE)", speaker: "Екатерина Гизоева", desc: "Планирование ортодонтических аппаратов на скелетной опоре." },
  { time: "17:00", title: "Фуршет и живая музыка", speaker: "", desc: "Подведение итогов, вручение сертификатов, фуршет и живая музыка." },
];

const stats = [
  { value: 4, suffix: "+", label: "Топ-спикера" },
  { value: 4, suffix: "", label: "Конференция" },
  { value: 1, suffix: "", label: "День — максимум знаний" },
];

const DigitalOrthoConference = () => {
  const heroReveal = useReveal();
  const whyReveal = useReveal();
  const programReveal = useReveal();
  const speakersReveal = useReveal();
  const statsReveal = useReveal();
  const pricingReveal = useReveal();
  const ctaReveal = useReveal();
  const [activeGallerySlide, setActiveGallerySlide] = useState(0);

  const goToGallerySlide = useCallback((index: number) => {
    setActiveGallerySlide(((index % gallerySlides.length) + gallerySlides.length) % gallerySlides.length);
  }, []);

  const nextGallerySlide = useCallback(() => {
    goToGallerySlide(activeGallerySlide + 1);
  }, [activeGallerySlide, goToGallerySlide]);

  const prevGallerySlide = useCallback(() => {
    goToGallerySlide(activeGallerySlide - 1);
  }, [activeGallerySlide, goToGallerySlide]);

  useEffect(() => {
    const timer = window.setInterval(nextGallerySlide, 5000);
    return () => window.clearInterval(timer);
  }, [nextGallerySlide]);

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
      <div className="doc-page bg-[#0A0E1A] text-[#F5F5F5] min-h-screen overflow-hidden -mt-[116px] lg:-mt-[164px]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Helmet>
          <title>IV Конференция «Цифровая ортодонтия» 2026 | Учебный центр Артикон</title>
          <meta name="description" content="Ежегодная встреча ортодонтического сообщества. 3 июня 2026, Москва, MEGAPOLIS HALL. Доклады, digital-кейсы, нетворкинг." />
          <link rel="canonical" href="https://articon.pro/education/course/22" />
          <meta property="og:title" content="IV Конференция «Цифровая ортодонтия» 2026 | Артикон" />
          <meta property="og:description" content="Ежегодная встреча ортодонтического сообщества. 3 июня 2026, Москва." />
          <meta property="og:type" content="article" />
        </Helmet>

        {/* ═══════ HERO ═══════ */}
        <section className="relative min-h-screen flex items-center overflow-hidden pt-[116px] lg:pt-[164px]">
          <div ref={heroRef} className="absolute inset-0 will-change-transform">
            <img src={course22Banner} alt="IV Конференция Цифровая ортодонтия" className="w-full h-full object-cover object-bottom" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E1A]/90 via-[#0A0E1A]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A]/40 via-transparent to-[#0A0E1A]" />
          </div>

          {/* Animated orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="doc-orb doc-orb-1" />
            <div className="doc-orb doc-orb-2" />
            <div className="doc-orb doc-orb-3" />
          </div>

          <div ref={heroReveal.ref} className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="max-w-3xl">
              <div className={cn("transition-all duration-1000 ease-out", heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${ACCENT})` }} />
                  <span className="text-sm tracking-[0.3em] uppercase" style={{ color: ACCENT }}>IV Конференция</span>
                  <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${ACCENT})` }} />
                </div>
              </div>

              <h1 className={cn(
                "text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4 transition-all duration-1000 delay-200 ease-out",
                heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                <span className="doc-text-reveal block">Цифровая</span>
                <span className="doc-text-reveal block" style={{ animationDelay: "0.3s", color: ACCENT }}>ортодонтия</span>
              </h1>

              <p className={cn(
                "text-2xl md:text-3xl font-bold text-[#F5F5F5]/70 mb-2 transition-all duration-1000 delay-300 ease-out",
                heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                Все на своих местах
              </p>

              <p className={cn(
                "text-lg md:text-xl text-[#F5F5F5]/50 mb-4 max-w-2xl leading-relaxed transition-all duration-1000 delay-500 ease-out",
                heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                Ежегодная конференция, где рождаются новые стандарты лечения. Живые дискуссии, разбор сложных кейсов и нетворкинг с лидерами индустрии.
              </p>

              <div className={cn(
                "flex flex-wrap gap-4 text-sm mb-10 transition-all duration-1000 delay-700 ease-out",
                heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                <div className="flex items-center gap-2.5 bg-[#00A3FF]/20 backdrop-blur-sm border border-[#00A3FF]/40 rounded-full px-5 py-2.5">
                  <Calendar className="h-4 w-4" style={{ color: ACCENT }} />
                  <span className="font-bold text-[#F5F5F5]">3 июня 2026</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
                  <MapPin className="h-4 w-4" style={{ color: ACCENT }} />
                  <span className="text-[#F5F5F5]/80">Москва, MEGAPOLIS HALL</span>
                </div>
              </div>

              <div className={cn(
                "flex flex-col sm:flex-row gap-4 items-start transition-all duration-1000 delay-900 ease-out",
                heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                <div className="doc-cta-glow">
                  <CourseApplicationForm
                    courseName={course.title}
                    courseDate={course.date}
                    coursePrice={course.price}
                    buttonLabel="Забронировать место"
                  />
                </div>
                <button onClick={() => scrollTo("doc-why")} className="text-[#F5F5F5]/50 hover:text-[#F5F5F5] transition-colors text-sm flex items-center gap-2">
                  Подробнее <ChevronDown className="h-4 w-4 animate-bounce" />
                </button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#F5F5F5]/30">
            <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, transparent, ${ACCENT}40)` }} />
          </div>
        </section>

        {/* ═══════ STATS ═══════ */}
        <section className="py-16 relative border-b border-[#1A2035]">
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
        <section id="doc-why" className="py-24 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <div ref={whyReveal.ref} className={cn(
              "max-w-5xl mx-auto transition-all duration-1000",
              whyReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <div className="text-center mb-16">
                <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Почему стоит прийти</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Ортодонтия нового уровня</h2>
                <p className="text-xl font-semibold" style={{ color: ACCENT }}>Цифра, биомеханика и комплексный подход</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {whyItems.map((item, i) => {
                  const r = useReveal();
                  return (
                    <div
                      key={i}
                      ref={r.ref}
                      className={cn(
                        "bg-[#111827]/60 border border-[#1E293B] rounded-2xl p-8 hover:border-[#00A3FF]/30 transition-all duration-500 group",
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

              <div className="text-center mt-12">
                <div className="doc-cta-glow inline-block">
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

        {/* ═══════ SPEAKERS ═══════ */}
        <section id="doc-speakers" className="py-24 lg:py-32 relative border-t border-[#1A2035]">
          <div className="container mx-auto px-4">
            <div ref={speakersReveal.ref} className={cn(
              "text-center mb-6 transition-all duration-700",
              speakersReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Эксперты</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Спикеры конференции</h2>
              <p className="text-[#F5F5F5]/50 max-w-2xl mx-auto text-lg">
                {course.guestSpeakerNote}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12">
              {course.lecturers.map((lecturer, i) => {
                const reveal = useReveal();
                return (
                  <div
                    key={i}
                    ref={reveal.ref}
                    className={cn(
                      "group relative bg-[#111827]/80 rounded-2xl overflow-hidden border border-[#1E293B] transition-all duration-500 hover:border-[#00A3FF]/50 hover:shadow-[0_0_40px_-10px_#00A3FF40]",
                      reveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    )}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={lecturer.photo}
                        alt={lecturer.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/20 to-transparent" />
                    </div>
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

            <div className="text-center mt-12">
              <div className="doc-cta-glow inline-block">
                <CourseApplicationForm
                  courseName={course.title}
                  courseDate={course.date}
                  coursePrice={course.price}
                  buttonLabel="Записаться на конференцию"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ PROGRAM ═══════ */}
        <section id="doc-program" className="py-24 lg:py-32 relative border-t border-[#1A2035]">
          <div className="container mx-auto px-4">
            <div ref={programReveal.ref} className={cn(
              "text-center mb-6 transition-all duration-700",
              programReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Программа</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Программа конференции</h2>
              <p className="text-[#F5F5F5]/50 max-w-2xl mx-auto text-lg">Полный день практических знаний, разбора кейсов и живых дискуссий</p>
            </div>

            <div ref={timelineLineRef} className="relative max-w-3xl mx-auto mt-12">
              <div className="absolute left-[28px] md:left-[40px] top-0 bottom-0 w-px bg-[#1E293B]">
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
                      <div className="absolute left-[22px] md:left-[34px] top-1 w-3 h-3 rounded-full border-2 transition-colors duration-500" style={{ borderColor: r.visible ? ACCENT : "#555", background: r.visible ? ACCENT : "transparent" }} />
                      <div className="text-sm font-bold tracking-wider mb-1" style={{ color: ACCENT }}>{item.time}</div>
                      <div className="bg-[#111827]/60 border border-[#1E293B] rounded-xl p-6 hover:border-[#00A3FF]/30 transition-all duration-300">
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
        <section className="py-24 lg:py-32 relative border-t border-[#1A2035]">
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
                        "flex items-start gap-4 bg-[#111827]/60 border border-[#1E293B] rounded-xl p-5 hover:border-[#00A3FF]/30 transition-all duration-500",
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

              <div className="text-center mt-12">
                <div className="doc-cta-glow inline-block">
                  <CourseApplicationForm
                    courseName={course.title}
                    courseDate={course.date}
                    coursePrice={course.price}
                    buttonLabel="Записаться на конференцию"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ PRICING ═══════ */}
        <section className="py-24 lg:py-32 relative border-t border-[#1A2035]">
          <div className="container mx-auto px-4">
            <div ref={pricingReveal.ref} className={cn(
              "max-w-lg mx-auto text-center transition-all duration-1000",
              pricingReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <div className="bg-[#111827]/80 border border-[#1E293B] rounded-3xl p-10 hover:border-[#00A3FF]/30 transition-all duration-500 relative overflow-hidden">
                <span className="text-sm tracking-[0.3em] uppercase mb-6 block" style={{ color: ACCENT }}>Стоимость</span>

                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-5xl md:text-6xl font-extrabold">{course.price.toLocaleString("ru-RU")} ₽</span>
                </div>
                <p className="text-[#F5F5F5]/40 text-sm mb-8">Конференция • 1 день • Москва</p>

                <div className="space-y-3 text-left mb-8">
                  {course.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-[#F5F5F5]/60">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="doc-cta-glow">
                  <CourseApplicationForm
                    courseName={course.title}
                    courseDate={course.date}
                    coursePrice={course.price}
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

        {/* ═══════ PHOTO GALLERY ═══════ */}
        <section className="py-20 lg:py-28 relative border-t border-[#1A2035]" id="conference-gallery">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="relative overflow-hidden rounded-3xl border border-[#1E293B] bg-[#111827]/80 shadow-2xl">
                <div className="relative aspect-[16/9] w-full">
                  {gallerySlides.map((slide, i) => (
                    <article
                      key={slide.src}
                      className={cn(
                        "absolute inset-0 transition-opacity duration-700",
                        i === activeGallerySlide ? "opacity-100 z-10" : "opacity-0 z-0"
                      )}
                      aria-hidden={i !== activeGallerySlide}
                    >
                      <img
                        src={slide.src}
                        alt={`Фото ${i + 1}`}
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </article>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={prevGallerySlide}
                  aria-label="Предыдущее фото"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#0A0E1A]/60 hover:bg-[#0A0E1A]/80 border border-[#F5F5F5]/15 backdrop-blur-sm flex items-center justify-center text-[#F5F5F5] transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={nextGallerySlide}
                  aria-label="Следующее фото"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#0A0E1A]/60 hover:bg-[#0A0E1A]/80 border border-[#F5F5F5]/15 backdrop-blur-sm flex items-center justify-center text-[#F5F5F5] transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-[#0A0E1A]/70 backdrop-blur-sm text-[#F5F5F5] text-xs font-bold border border-[#F5F5F5]/10">
                  {activeGallerySlide + 1} / {gallerySlides.length}
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                  {gallerySlides.map((slide, i) => (
                    <button
                      key={slide.src}
                      type="button"
                      onClick={() => goToGallerySlide(i)}
                      aria-label={`Перейти к фото ${i + 1}`}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        i === activeGallerySlide ? "w-8 bg-[#00A3FF]" : "w-2 bg-[#F5F5F5]/50 hover:bg-[#F5F5F5]/80"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ TARGET AUDIENCE ═══════ */}
        <section className="py-24 lg:py-32 relative border-t border-[#1A2035]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Для кого</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-12">Кому будет полезно</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {course.targetAudience.map((item, i) => (
                  <div key={i} className="bg-[#00A3FF]/10 border border-[#00A3FF]/20 rounded-full px-6 py-3 text-sm font-medium" style={{ color: ACCENT }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ FAQ ═══════ */}
        <section className="py-24 lg:py-32 relative border-t border-[#1A2035]">
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

            <div className="text-center mt-12">
              <p className="text-[#F5F5F5]/40 mb-4">Остались вопросы?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="doc-cta-glow">
                  <CourseApplicationForm
                    courseName={course.title}
                    courseDate={course.date}
                    coursePrice={course.price}
                    buttonLabel="Записаться на конференцию"
                  />
                </div>
                <a href="https://t.me/articon_education" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-[#334155] text-[#F5F5F5] hover:bg-[#F5F5F5]/10 hover:border-[#64748B]">
                    Написать в Telegram
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <CourseContactBlock />

        {/* ═══════ PARTNERS ═══════ */}
        <section className="py-20 border-t border-[#1A2035]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: `${ACCENT}99` }}>Партнеры</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5]">Партнеры конференции</h2>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 max-w-4xl mx-auto">
              {[
                { name: "EON Aligner", logo: eonAlignerLogo },
                { name: "Protect", logo: protectLogo },
                { name: "Green Dent", logo: greendentLogo },
                { name: "Revyline", logo: revylineLogo },
                { name: "OBK", logo: obkLogo },
              ].map((partner) => (
                <div
                  key={partner.name}
                  className="flex items-center justify-center rounded-2xl border border-[#1E293B] bg-[#0F1629] p-6 hover:border-[#334155] transition-colors h-28 w-52"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-16 max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ FINAL CTA ═══════ */}
        <section className="py-24 lg:py-32 relative overflow-hidden border-t border-[#1A2035]">
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
                Все на своих местах
              </h2>
              <p className="text-[#F5F5F5]/50 mb-10 text-lg">
                Запишитесь на конференцию и получите доступ к передовым методикам цифровой ортодонтии от ведущих экспертов.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="doc-cta-glow">
                  <CourseApplicationForm
                    courseName={course.title}
                    courseDate={course.date}
                    coursePrice={course.price}
                    buttonLabel="Забронировать место"
                  />
                </div>
                <a href="https://t.me/articon_education" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-[#334155] text-[#F5F5F5] hover:bg-[#F5F5F5]/10 hover:border-[#64748B]">
                    Задать вопрос
                  </Button>
                </a>
              </div>

              <div className="mt-10 text-[#F5F5F5]/40 text-sm">
                <p>Остались вопросы? Звоните!</p>
                <div className="flex flex-wrap justify-center gap-4 mt-2">
                  <a href="tel:+79099056457" className="hover:text-[#F5F5F5] transition-colors">+7 (909) 905-64-57</a>
                  <a href="tel:+79060457537" className="hover:text-[#F5F5F5] transition-colors">8 (906) 045-75-37</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ ПАРТНЁРЫ КОНФЕРЕНЦИИ ═══════ */}
        <section className="py-16 border-t border-[#1A2035]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#F5F5F5] mb-10">
              ПАРТНЁРЫ КОНФЕРЕНЦИИ
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              {[
                { src: revylineLogo, alt: "Revyline" },
                { src: obkLogo, alt: "OBK" },
                { src: eonAlignerLogo, alt: "Eon Aligner" },
                { src: protectLogo, alt: "Protect" },
                { src: greendentLogo, alt: "GreenDent" },
              ].map((p, i) => (
                <div key={i} className="bg-white rounded-xl p-4 flex items-center justify-center" style={{ minWidth: 120, minHeight: 70 }}>
                  <img src={p.src} alt={p.alt} className="max-h-12 max-w-[140px] object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ BACK LINK ═══════ */}
        <div className="border-t border-[#1A2035] py-8">
          <div className="container mx-auto px-4 text-center">
            <Link to="/education/calendar" className="text-sm text-[#F5F5F5]/40 hover:text-[#F5F5F5]/70 transition-colors inline-flex items-center gap-2">
              <ArrowRight className="h-4 w-4 rotate-180" /> Все курсы и мероприятия
            </Link>
          </div>
        </div>

        {/* ═══════ MOBILE STICKY CTA ═══════ */}
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0A0E1A]/95 backdrop-blur-md border-t border-[#1E293B] px-3 py-2.5 safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 min-w-0 max-w-[40%]">
              <span className="font-extrabold text-base sm:text-lg whitespace-nowrap leading-tight block" style={{ color: ACCENT }}>{course.price.toLocaleString("ru-RU")} ₽</span>
              <div className="text-[10px] text-[#F5F5F5]/40 truncate hidden sm:block">Цифровая ортодонтия</div>
            </div>
            <div className="flex-1 min-w-0">
              <CourseApplicationForm
                courseName={course.title}
                courseDate={course.date}
                coursePrice={course.price}
                buttonVariant="card"
                buttonLabel="Записаться"
              />
            </div>
          </div>
        </div>
        <div className="h-20 lg:hidden" />

        {/* ═══════ SCOPED STYLES ═══════ */}
        <style>{`
          .doc-page { scroll-behavior: smooth; }

          .doc-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(120px);
            opacity: 0.12;
            animation: doc-float 12s ease-in-out infinite;
          }
          .doc-orb-1 {
            width: 400px; height: 400px;
            background: ${ACCENT};
            top: 20%; left: 10%;
          }
          .doc-orb-2 {
            width: 300px; height: 300px;
            background: #0066CC;
            bottom: 20%; right: 15%;
            animation-delay: -4s;
          }
          .doc-orb-3 {
            width: 250px; height: 250px;
            background: #66CCFF;
            top: 40%; right: 30%;
            animation-delay: -8s;
          }

          @keyframes doc-float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -20px) scale(1.05); }
            66% { transform: translate(-20px, 15px) scale(0.95); }
          }

          .doc-text-reveal {
            animation: doc-reveal 0.8s ease-out forwards;
            opacity: 0;
            transform: translateY(20px);
          }
          @keyframes doc-reveal {
            to { opacity: 1; transform: translateY(0); }
          }

          .doc-cta-glow button {
            background: ${ACCENT} !important;
            color: #0A0E1A !important;
            border: none !important;
            font-weight: 700 !important;
            transition: box-shadow 0.3s ease, transform 0.3s ease !important;
          }
          .doc-cta-glow button:hover {
            box-shadow: 0 0 30px ${ACCENT}50, 0 0 60px ${ACCENT}20 !important;
            transform: translateY(-2px) !important;
          }

          .doc-page .gradient-primary {
            background: ${ACCENT} !important;
            color: #0A0E1A !important;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default DigitalOrthoConference;
