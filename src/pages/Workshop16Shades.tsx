import { useEffect, useRef, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Users, Award, CheckCircle2, ChevronDown, Sparkles, Wine, MessageCircle, UtensilsCrossed, ArrowRight, Monitor, UserCheck, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseApplicationForm } from "@/components/forms/CourseApplicationForm";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";

/* ─── FAQ Item component ─── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#333] rounded-xl overflow-hidden hover:border-[#D4AF37]/30 transition-colors duration-300">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-6 text-left">
        <span className="font-semibold pr-4">{question}</span>
        <ChevronDown className={cn("h-5 w-5 flex-shrink-0 transition-transform duration-300", open && "rotate-180")} style={{ color: "#D4AF37" }} />
      </button>
      <div className={cn("overflow-hidden transition-all duration-300", open ? "max-h-40 pb-6 px-6" : "max-h-0")}>
        <p className="text-[#F5F5F5]/50 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
import { courses } from "@/data/courses";
import course18Banner from "@/assets/courses/course-18-banner.jpg";

/* ─── Scroll-reveal hook ─── */
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

/* ─── Animated counter ─── */
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
const course = courses.find(c => c.id === 18)!;

const GOLD = "#D4AF37";
const speakers = [
  {
    name: "Дмитрий Никоненко",
    photo: "/images/lecturers/dmitry-nikonenko.png",
    role: "Мастер-керамист",
    short: "Колоссальный опыт в мануальной практике, виртуозное владение кистью, глубокое понимание эстетики и морфологии зуба. Представитель классической школы, где результат создается гениальностью рук.",
    tag: "MANUAL",
  },
  {
    name: "Дмитрий Филинов",
    photo: "/images/lecturers/dmitry-filinov.png",
    role: "Цифровой дизайнер",
    short: "Невероятные навыки 3D-моделирования, эксперт в CAD/CAM системах. Специалист, который создает безупречно точные цифровые прототипы и каркасы, являющиеся идеальной основой для дальнейшей работы.",
    tag: "DIGITAL",
  },
  {
    name: "Шамиль Магомедов",
    photo: "/images/lecturers/shamil-magomedov.png",
    role: "Техник-универсал",
    short: "Руководитель отдела эстетики Артикон, ежедневно выполняющий огромный объем работ на высокотехнологичном производстве. Обладает уникальным опытом работы с самыми разными материалами и технологиями и доводит каждую работу до высочайшей эстетики.",
    tag: "COLORING",
  },
];

const timeline = [
  { time: "15:00", title: "Регистрация и Welcome Drink", speaker: "", desc: "Встреча гостей, знакомство с коллегами в неформальной обстановке. Хорошее начало дня — залог продуктивного обучения." },
  { time: "16:00", title: "Noritake — фронтальная эстетика", speaker: "Дмитрий Никоненко", desc: "Виниры на рефракторном материале. Мастер-класс по послойной технике нанесения: как «оживить» работу и добиться глубины, которую не даст ни один цифровой инструмент." },
  { time: "17:00", title: "Возможности «метасиликата»", speaker: "Шамиль Магомедов", desc: "Особенности фрезерованной стеклокерамики: техника обработки до кристаллизации и нюансы окрашивания диоксида циркония для достижения максимальной эстетики." },
  { time: "18:30", title: "Кофе-брейк", speaker: "", desc: "Перерыв, неформальное общение, возможность подойти к спикерам с вопросами." },
  { time: "19:00", title: "Цифровые инструменты планирования", speaker: "Дмитрий Филинов", desc: "Цифровые инструменты планирования и изготовления протяженных конструкций. Как создавать безупречные каркасы в CAD/CAM, которые станут идеальной основой для мануальной работы." },
  { time: "20:30", title: "Фуршет и вечеринка", speaker: "", desc: "Завершение программы. Угощения, напитки, живое общение в расслабленной атмосфере. Отличный способ закончить насыщенную пятницу в хорошей компании." },
];

const perks = [
  { icon: MessageCircle, title: "Живое общение", desc: "В перерывах и после основной части у вас будет возможность в непринужденной обстановке пообщаться со спикерами и коллегами, обсудить рабочие моменты и наладить новые профессиональные связи." },
  { icon: UtensilsCrossed, title: "Питание", desc: "Мы позаботились о том, чтобы день был насыщенным не только знаниями, но и впечатлениями. Вкусные угощения в течение дня — часть атмосферы, которую мы стараемся создать." },
  { icon: Wine, title: "Вечеринка", desc: "А вечером в пятницу мы устроим фуршет с угощениями и напитками, включая алкоголь. Это отличная возможность расслабиться после насыщенного дня, продолжить общение и просто хорошо провести время." },
];

const Workshop16Shades = () => {
  const heroReveal = useReveal();
  const formatReveal = useReveal();
  const speakersReveal = useReveal();
  const synergyReveal = useReveal();
  const timelineReveal = useReveal();
  const perksReveal = useReveal();
  const innovationsReveal = useReveal();
  const ctaReveal = useReveal();

  /* smooth scroll */
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /* parallax on hero */
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = () => {
      if (heroRef.current) {
        const y = window.scrollY;
        heroRef.current.style.transform = `translateY(${y * 0.35}px)`;
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
    <div className="w16s-page bg-[#1A1A1A] text-[#F5F5F5] min-h-screen overflow-hidden -mt-[116px] lg:-mt-[164px]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Helmet>
        <title>{course.metaTitle} | Учебный центр Артикон</title>
        <meta name="description" content={course.metaDescription} />
        <link rel="canonical" href="https://articon.pro/education/course/18" />
        <meta property="og:title" content="Шестнадцать оттенков белого — Воркшоп | Артикон" />
        <meta property="og:description" content={course.metaDescription} />
        <meta property="og:image" content={course18Banner} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax BG image */}
        <div ref={heroRef} className="absolute inset-0 will-change-transform">
          <img src={course18Banner} alt="Шестнадцать оттенков белого" className="w-full h-[120%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/70 via-[#1A1A1A]/50 to-[#1A1A1A]" />
        </div>

        {/* Animated light orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w16s-orb w16s-orb-1" />
          <div className="w16s-orb w16s-orb-2" />
          <div className="w16s-orb w16s-orb-3" />
        </div>

        {/* Content */}
        <div ref={heroReveal.ref} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className={cn(
            "transition-all duration-1000 ease-out",
            heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent" style={{ backgroundImage: `linear-gradient(to right, transparent, ${GOLD})` }} />
              <span className="text-sm tracking-[0.3em] uppercase" style={{ color: GOLD }}>Воркшоп</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent" style={{ backgroundImage: `linear-gradient(to left, transparent, ${GOLD})` }} />
            </div>
          </div>

          <h1 className={cn(
            "text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 transition-all duration-1000 delay-200 ease-out",
            heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <span className="w16s-text-reveal inline-block">Шестнадцать</span>
            <br />
            <span className="w16s-text-reveal inline-block" style={{ animationDelay: "0.3s" }}>оттенков</span>{" "}
            <span className="w16s-text-reveal inline-block" style={{ animationDelay: "0.5s", color: GOLD }}>белого</span>
          </h1>

          <p className={cn(
            "text-lg md:text-xl text-[#F5F5F5]/60 mb-4 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ease-out",
            heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            Практика от звездных мастеров по эстетике, которые научат вас стабильно попадать в оттенок и сдавать самые сложные работы с первого раза. Объединяем классическую школу и цифровые технологии, чтобы вы стали универсальным специалистом.
          </p>

          <div className={cn(
            "flex flex-wrap justify-center gap-6 text-sm text-[#F5F5F5]/50 mb-10 transition-all duration-1000 delay-700 ease-out",
            heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" style={{ color: GOLD }} />
              <span>10 апреля 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" style={{ color: GOLD }} />
              <span>Москва</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" style={{ color: GOLD }} />
              <span>15:00 — 20:30</span>
            </div>
          </div>

          <div className={cn(
            "flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-900 ease-out",
            heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="w16s-cta-glow">
              <CourseApplicationForm
                courseName={course.title}
                courseDate={course.date}
                buttonLabel="Забронировать место"
              />
            </div>
            <button onClick={() => scrollTo("w16s-format")} className="text-[#F5F5F5]/50 hover:text-[#F5F5F5] transition-colors text-sm flex items-center gap-2">
              Подробнее <ChevronDown className="h-4 w-4 animate-bounce" />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#F5F5F5]/30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent" style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${GOLD}40)` }} />
        </div>
      </section>

      {/* ═══════ FORMAT — Как проходит мероприятие? ═══════ */}
      <section id="w16s-format" className="py-24 lg:py-32 relative">
        <div className="container mx-auto px-4">
          <div ref={formatReveal.ref} className={cn(
            "max-w-4xl mx-auto transition-all duration-1000",
            formatReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <div className="text-center mb-12">
              <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: GOLD }}>Формат</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Как проходит мероприятие?</h2>
              <p className="text-xl md:text-2xl font-semibold" style={{ color: GOLD }}>В формате живых демонстраций на огромном экране.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Left card */}
              <div className="bg-[#222]/60 border border-[#333] rounded-2xl p-8 hover:border-[#D4AF37]/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center" style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30` }}>
                  <Monitor className="h-7 w-7" style={{ color: GOLD }} />
                </div>
                <p className="text-[#F5F5F5]/70 leading-relaxed">
                  Мы создали уникальный формат, который сочетает в себе наглядность масштабной презентации и камерность личного общения. Все техники и методики демонстрируются в режиме реального времени на большом экране, что позволяет рассмотреть каждую деталь с любого ракурса.
                </p>
              </div>

              {/* Right card */}
              <div className="bg-[#222]/60 border border-[#333] rounded-2xl p-8 hover:border-[#D4AF37]/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center" style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30` }}>
                  <UserCheck className="h-7 w-7" style={{ color: GOLD }} />
                </div>
                <p className="text-[#F5F5F5]/70 leading-relaxed">
                  Главное преимущество — вы не просто пассивный слушатель. После каждого выступления вы можете подойти к спикеру, задать вопросы и получить персональную обратную связь напрямую от мастера. Такой формат позволяет не просто посмотреть на демонстрацию, но и разобраться в нюансах, которые важны именно вам.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SPEAKERS ═══════ */}
      <section id="w16s-speakers" className="py-24 lg:py-32 relative">
        <div className="container mx-auto px-4">
          <div ref={speakersReveal.ref} className={cn(
            "text-center mb-6 transition-all duration-700",
            speakersReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: GOLD }}>Эксперты</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Спикеры: три кита современной стоматологии</h2>
            <p className="text-[#F5F5F5]/50 max-w-2xl mx-auto text-lg">
              Мы собрали команду из трех звездных техников, каждый из которых является признанным экспертом в своей области. Это уникальная возможность перенять опыт у лучших из лучших.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
            {speakers.map((s, i) => {
              const reveal = useReveal();
              return (
                <div
                  key={i}
                  ref={reveal.ref}
                  className={cn(
                    "group relative bg-[#222]/80 rounded-2xl overflow-hidden border border-[#333] transition-all duration-500 hover:border-[#D4AF37]/50 hover:shadow-[0_0_40px_-10px_#D4AF3740]",
                    reveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
                  )}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Tag */}
                  <div className="absolute top-4 right-4 z-10 text-[10px] tracking-[0.2em] font-bold px-3 py-1 rounded-full border" style={{ borderColor: `${GOLD}40`, color: GOLD, background: "#1A1A1A90" }}>
                    {s.tag}
                  </div>

                  {/* Photo */}
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={s.photo}
                      alt={s.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/30 to-transparent" />
                  </div>

                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold mb-1">{s.name}</h3>
                    <p className="text-sm mb-3" style={{ color: GOLD }}>{s.role}</p>
                    <p className="text-sm text-[#F5F5F5]/50 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-40 overflow-hidden">
                      {s.short}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ SYNERGY ═══════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div ref={synergyReveal.ref} className={cn(
            "transition-all duration-1000",
            synergyReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <div className="text-center mb-12">
              <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: GOLD }}>Уникальность</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Что делает этот воркшоп особенным?</h2>
              <p className="text-xl font-semibold" style={{ color: GOLD }}>Синергия опыта и инноваций.</p>
            </div>

            {/* Description text */}
            <div className="max-w-3xl mx-auto mb-12 space-y-6 text-[#F5F5F5]/60 leading-relaxed text-center">
              <p>
                На этом мероприятии мы не просто показываем отдельные методики. Мы создаем мост между поколениями и технологиями. Вы увидите, как классические подходы «старой школы» и многолетний мануальный опыт Дмитрия Никоненко обогащаются цифровыми возможностями Дмитрия Филинова.
              </p>
              <p>
                Мы сознательно расширили горизонты, чтобы показать, как симбиоз мануальной и цифровой практики позволяет достигать результатов, недоступных при использовании только одного подхода. Вы научитесь быть не просто «цифровиком» или «керамистом», а станете мастером, который виртуозно владеет всеми инструментами.
              </p>
            </div>

            {/* Split section */}
            <div className="grid lg:grid-cols-2 gap-0 max-w-6xl mx-auto rounded-3xl overflow-hidden border border-[#333]">
              {/* Left — Manual */}
              <div className="relative bg-[#1E1E1E] p-10 lg:p-14 flex flex-col justify-center min-h-[350px]">
                <div className="absolute top-6 left-6 text-[10px] tracking-[0.2em] font-bold px-3 py-1 rounded-full border border-[#555] text-[#888]">
                  MANUAL
                </div>
                <div className="text-6xl lg:text-8xl font-extrabold text-[#2A2A2A] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
                  01
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 relative z-10">Мануальное<br />мастерство</h3>
                <p className="text-[#F5F5F5]/50 relative z-10 leading-relaxed">
                  Послойная техника нанесения, работа с кистью и керамикой — классическое искусство, отточенное десятилетиями.
                </p>
              </div>

              {/* Right — Digital */}
              <div className="relative bg-[#161616] p-10 lg:p-14 flex flex-col justify-center min-h-[350px]">
                <div className="absolute top-6 right-6 text-[10px] tracking-[0.2em] font-bold px-3 py-1 rounded-full border" style={{ borderColor: `${GOLD}40`, color: GOLD }}>
                  DIGITAL
                </div>
                <div className="text-6xl lg:text-8xl font-extrabold text-[#222] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
                  02
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 relative z-10">Цифровая<br />точность</h3>
                <p className="text-[#F5F5F5]/50 relative z-10 leading-relaxed">
                  CAD/CAM планирование, фрезерованная стеклокерамика — технологии, которые задают новые стандарты.
                </p>
              </div>
            </div>

            {/* Center connector */}
            <div className="flex flex-col items-center -mt-1">
              <div className="w-px h-16" style={{ background: `linear-gradient(to bottom, ${GOLD}60, ${GOLD}00)` }} />
              <div className="px-8 py-4 rounded-2xl border text-center" style={{ borderColor: `${GOLD}30`, background: "#1A1A1A" }}>
                <Sparkles className="h-5 w-5 mx-auto mb-2" style={{ color: GOLD }} />
                <p className="text-lg font-bold">Синергия опыта и инноваций</p>
                <p className="text-sm text-[#F5F5F5]/40 mt-1">Два мира в одном воркшопе</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TIMELINE / PROGRAM ═══════ */}
      <section id="w16s-program" className="py-24 lg:py-32 relative">
        <div className="container mx-auto px-4">
          <div ref={timelineReveal.ref} className={cn(
            "text-center mb-6 transition-all duration-700",
            timelineReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: GOLD }}>Программа</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Программа курса</h2>
            <p className="text-[#F5F5F5]/50 max-w-2xl mx-auto text-lg">
              Симбиоз цифровой точности и мануального искусства для создания тотальных работ, которые не отличить от живых зубов.
            </p>
          </div>

          {/* Timeline */}
          <div ref={timelineLineRef} className="relative max-w-3xl mx-auto mt-12">
            {/* Animated line */}
            <div className="absolute left-[28px] md:left-[40px] top-0 bottom-0 w-px bg-[#333]">
              <div className="absolute top-0 left-0 w-full bg-gradient-to-b transition-all duration-100" style={{ height: "var(--line-progress, 0%)", backgroundImage: `linear-gradient(to bottom, ${GOLD}, ${GOLD}40)` }} />
            </div>

            <div className="space-y-12">
              {timeline.map((item, i) => {
                const reveal = useReveal(0.2);
                return (
                  <div
                    key={i}
                    ref={reveal.ref}
                    className={cn(
                      "relative pl-16 md:pl-24 transition-all duration-700",
                      reveal.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-30px]",
                    )}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    {/* Dot */}
                    <div className="absolute left-[22px] md:left-[34px] top-1 w-3 h-3 rounded-full border-2 transition-colors duration-500" style={{ borderColor: reveal.visible ? GOLD : "#555", background: reveal.visible ? GOLD : "transparent" }} />

                    {/* Time */}
                    <div className="text-sm font-bold tracking-wider mb-1" style={{ color: GOLD }}>{item.time}</div>

                    {/* Card */}
                    <div className="bg-[#222]/60 border border-[#333] rounded-xl p-6 hover:border-[#D4AF37]/30 transition-all duration-300">
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

      {/* ═══════ MORE THAN LEARNING ═══════ */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full blur-[200px]" style={{ background: `${GOLD}08` }} />
        </div>
        <div className="container mx-auto px-4">
          <div ref={perksReveal.ref} className={cn(
            "text-center mb-6 transition-all duration-700",
            perksReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: GOLD }}>Атмосфера</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Больше, чем просто обучение</h2>
            <p className="text-[#F5F5F5]/50 max-w-2xl mx-auto text-lg">
              Мы убеждены, что профессиональный рост невозможен без неформального общения и обмена опытом. Поэтому мы позаботились не только о насыщенной образовательной программе, но и о вашем комфорте.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
            {perks.map((p, i) => {
              const reveal = useReveal();
              return (
                <div
                  key={i}
                  ref={reveal.ref}
                  className={cn(
                    "text-center p-8 rounded-2xl border border-[#333] bg-[#222]/50 hover:border-[#D4AF37]/40 transition-all duration-500 group",
                    reveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  )}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30` }}>
                    <p.icon className="h-7 w-7" style={{ color: GOLD }} />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{p.title}</h3>
                  <p className="text-sm text-[#F5F5F5]/50 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ INNOVATIONS ═══════ */}
      <section className="py-24 lg:py-32 relative border-t border-[#2A2A2A]">
        <div className="container mx-auto px-4">
          <div ref={innovationsReveal.ref} className={cn(
            "max-w-4xl mx-auto text-center transition-all duration-1000",
            innovationsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30` }}>
              <Lightbulb className="h-7 w-7" style={{ color: GOLD }} />
            </div>
            <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: GOLD }}>Стенды</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Инновации, к которым можно прикоснуться</h2>
            <p className="text-[#F5F5F5]/60 leading-relaxed text-lg max-w-3xl mx-auto">
              На протяжении всего мероприятия в зале будут расположены стенды с инновационными материалами и оборудованием от ведущих мировых брендов. Вы сможете не просто посмотреть на них издалека, а подойти, потрогать, изучить и получить исчерпывающую консультацию от представителей компаний. Это ваш шанс быть в курсе последних новинок и найти решения для своей лаборатории.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ PRICING ═══════ */}
      <section className="py-24 lg:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="bg-[#222]/80 border border-[#333] rounded-3xl p-10 hover:border-[#D4AF37]/30 transition-all duration-500">
              <span className="text-sm tracking-[0.3em] uppercase mb-6 block" style={{ color: GOLD }}>Стоимость</span>
              <div className="text-5xl md:text-6xl font-extrabold mb-2">7 000 ₽</div>
              <p className="text-[#F5F5F5]/40 text-sm mb-8">Включено: мастер-классы, нетворкинг, фуршет</p>

              <div className="space-y-3 text-left mb-8">
                {course.includes.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-[#F5F5F5]/60">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: GOLD }} />
                    {item}
                  </div>
                ))}
              </div>

              <div className="w16s-cta-glow">
                <CourseApplicationForm
                  courseName={course.title}
                  courseDate={course.date}
                  buttonVariant="card"
                  buttonLabel="Забронировать место"
                />
              </div>

              <p className="text-xs text-[#F5F5F5]/30 mt-4">
                Для оплаты от юрлица: 8 (905) 717-20-61
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="py-24 lg:py-32 relative border-t border-[#2A2A2A]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Часто задаваемые вопросы</h2>
          <div className="space-y-4">
            {course.faq.map((item, i) => (
              <FaqItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full blur-[250px]" style={{ background: `${GOLD}0A` }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[200px]" style={{ background: `${GOLD}06` }} />
        </div>
        <div className="container mx-auto px-4 relative">
          <div ref={ctaReveal.ref} className={cn(
            "text-center max-w-2xl mx-auto transition-all duration-1000",
            ctaReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Готовы начать обучение?
            </h2>
            <p className="text-[#F5F5F5]/50 mb-10 text-lg">
              Запишитесь на курс сейчас или свяжитесь с нами для получения дополнительной информации.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="w16s-cta-glow">
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
          </div>
        </div>
      </section>

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
            <div className="font-extrabold text-xl" style={{ color: GOLD }}>7 000 ₽</div>
            <div className="text-xs text-[#F5F5F5]/40 truncate">Шестнадцать оттенков белого</div>
          </div>
          <CourseApplicationForm
            courseName={course.title}
            courseDate={course.date}
            buttonVariant="card"
            buttonLabel="Забронировать"
          />
        </div>
      </div>
      <div className="h-20 lg:hidden" />

      {/* ═══════ SCOPED STYLES ═══════ */}
      <style>{`
        .w16s-page {
          scroll-behavior: smooth;
        }

        /* Orbs */
        .w16s-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.15;
          animation: w16s-float 12s ease-in-out infinite;
        }
        .w16s-orb-1 {
          width: 400px; height: 400px;
          background: ${GOLD};
          top: 20%; left: 10%;
          animation-delay: 0s;
        }
        .w16s-orb-2 {
          width: 300px; height: 300px;
          background: #8B7355;
          bottom: 20%; right: 15%;
          animation-delay: -4s;
        }
        .w16s-orb-3 {
          width: 250px; height: 250px;
          background: #C4A265;
          top: 40%; right: 30%;
          animation-delay: -8s;
        }

        @keyframes w16s-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }

        /* Text reveal */
        .w16s-text-reveal {
          animation: w16s-reveal 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes w16s-reveal {
          to { opacity: 1; transform: translateY(0); }
        }

        /* CTA glow */
        .w16s-cta-glow button {
          background: ${GOLD} !important;
          color: #1A1A1A !important;
          border: none !important;
          font-weight: 700 !important;
          transition: box-shadow 0.3s ease, transform 0.3s ease !important;
        }
        .w16s-cta-glow button:hover {
          box-shadow: 0 0 30px ${GOLD}50, 0 0 60px ${GOLD}20 !important;
          transform: translateY(-2px) !important;
        }

        /* Override dialog trigger gradient-primary inside this page */
        .w16s-page .gradient-primary {
          background: ${GOLD} !important;
          color: #1A1A1A !important;
        }
      `}</style>
    </div>
    </Layout>
  );
};

export default Workshop16Shades;
