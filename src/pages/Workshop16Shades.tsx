import { useEffect, useRef, useState, useCallback } from "react";
import { X, Play } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Users, Award, CheckCircle2, ChevronDown, Sparkles, Wine, MessageCircle, UtensilsCrossed, ArrowRight, Monitor, UserCheck, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseApplicationForm } from "@/components/forms/CourseApplicationForm";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { courses } from "@/data/courses";
import course18Banner from "@/assets/courses/course-18-banner.jpg";
import binocularsPrize from "@/assets/courses/course-18-prize-binoculars.png";
import pantherPrize from "@/assets/courses/course-18-prize-panther.png";
import brushesPrize from "@/assets/courses/course-18-prize-brushes.png";
import eonLogo from "@/assets/partners/eon-logo.png";
import heygearsLogo from "@/assets/partners/heygears-logo.png";

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
      <div className="relative w-[147px] md:w-[280px] rounded-xl overflow-hidden shadow-2xl border border-[#333] bg-[#1A1A1A]">
        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black/80 rounded-full p-1 transition-colors"
        >
          <X className="h-3.5 w-3.5 text-white" />
        </button>

        {!playing ? (
          <div className="relative cursor-pointer group" onClick={handlePlay}>
            <video src={videos[currentIndex]} className="w-full" preload="metadata" muted playsInline />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <Play className="h-6 w-6 text-white fill-white" />
              </div>
            </div>
            <div className="absolute bottom-2 left-2 right-8">
              <span className="text-[10px] text-white/70 uppercase tracking-wider">Видео с прошлых мероприятий</span>
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

        {videos.length > 1 && (
          <div className="flex justify-center gap-1.5 py-1.5 bg-[#111]">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrentIndex(i); setPlaying(false); }}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  i === currentIndex ? "bg-[#D4AF37]" : "bg-white/30 hover:bg-white/50"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

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

const partners = [
  {
    name: "EON",
    logo: eonLogo,
  },
  {
    name: "HeyGears",
    logo: heygearsLogo,
  },
];

const prizes = [
  {
    place: "🏆 1 место",
    title: "Бинокуляр UPCERA DFL",
    description: "Стоимостью 165 000 ₽",
    image: binocularsPrize,
  },
  {
    place: "🥈 2 место",
    title: "Dental Direkt Panther Starter Kit",
    description: "Набор для обработки циркона",
    image: pantherPrize,
  },
  {
    place: "🥉 3 место",
    title: "LeBrush Lab Harmony",
    description: "Набор кистей",
    image: brushesPrize,
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
  const partnersReveal = useReveal();
  const prizesReveal = useReveal();
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
      <section className="relative min-h-screen flex items-center overflow-hidden pt-[116px] lg:pt-[164px]">
        <div ref={heroRef} className="absolute inset-0 will-change-transform">
          <img src="/images/courses/course-18-hero.jpg" alt="Шестнадцать оттенков белого" className="w-full h-[120%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/90 via-[#1A1A1A]/70 to-[#1A1A1A]/30" />
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w16s-orb w16s-orb-1" />
          <div className="w16s-orb w16s-orb-2" />
          <div className="w16s-orb w16s-orb-3" />
        </div>

        <div ref={heroReveal.ref} className="relative z-10 px-4 container mx-auto">
          <div className="max-w-2xl">
            <div className={cn(
              "transition-all duration-1000 ease-out",
              heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <span className="text-sm tracking-[0.3em] uppercase mb-4 inline-block" style={{ color: GOLD }}>Воркшоп для зубных техников</span>
            </div>

            <h1 className={cn(
              "text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 transition-all duration-1000 delay-200 ease-out",
              heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <span className="w16s-text-reveal inline-block">«Шестнадцать</span>
              <br />
              <span className="w16s-text-reveal inline-block" style={{ animationDelay: "0.3s" }}>оттенков</span>{" "}
              <span className="w16s-text-reveal inline-block" style={{ animationDelay: "0.5s", color: GOLD }}>белого»</span>
            </h1>

            <p className={cn(
              "text-base md:text-lg text-[#F5F5F5]/70 mb-6 max-w-xl leading-relaxed transition-all duration-1000 delay-[400ms] ease-out",
              heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              4 часа живых демонстраций. Мост между классикой и цифрой, чтобы сдать сложные работы с первого раза без переделок.
            </p>

            <ul className={cn(
              "space-y-2 text-[#F5F5F5]/80 text-sm md:text-base mb-8 transition-all duration-1000 delay-500 ease-out",
              heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <li>— Чёткий алгоритм работы</li>
              <li>— Разбор реальных кейсов и типичных ошибок</li>
              <li>— Нетворкинг, фуршет</li>
              <li>— Кавер группа + крутой розыгрыш</li>
            </ul>

            <div className={cn(
              "flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#F5F5F5]/60 mb-8 transition-all duration-1000 delay-[600ms] ease-out",
              heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" style={{ color: GOLD }} />
                <span>Москва</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" style={{ color: GOLD }} />
                <span>10 апреля</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" style={{ color: GOLD }} />
                <span>15:00–22:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" style={{ color: GOLD }} />
                <span>Всего 200 мест</span>
              </div>
            </div>

            <div className={cn(
              "flex flex-col sm:flex-row gap-4 items-start transition-all duration-1000 delay-700 ease-out",
              heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <div className="w16s-cta-glow">
                <CourseApplicationForm
                  courseName={course.title}
                  courseDate={course.date}
                  buttonLabel="Забронировать место"
                />
              </div>
              <button onClick={() => scrollTo("w16s-format")} className="text-[#F5F5F5]/50 hover:text-[#F5F5F5] transition-colors text-sm flex items-center gap-2 mt-2">
                Подробнее <ChevronDown className="h-4 w-4 animate-bounce" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#F5F5F5]/30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent" style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${GOLD}40)` }} />
        </div>
      </section>

      <section id="w16s-format" className="py-16 lg:py-20 relative">
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
              <div className="bg-[#222]/60 border border-[#333] rounded-2xl p-8 hover:border-[#D4AF37]/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center" style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30` }}>
                  <Monitor className="h-7 w-7" style={{ color: GOLD }} />
                </div>
                <p className="text-[#F5F5F5]/70 leading-relaxed">
                  Мы создали уникальный формат, который сочетает в себе наглядность масштабной презентации и камерность личного общения. Все техники и методики демонстрируются в режиме реального времени на большом экране, что позволяет рассмотреть каждую деталь с любого ракурса.
                </p>
              </div>

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

      <section id="w16s-speakers" className="py-16 lg:py-20 relative">
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
                    "group bg-[#222]/80 rounded-2xl overflow-hidden border border-[#333] transition-all duration-500 hover:border-[#D4AF37]/50 hover:shadow-[0_0_40px_-10px_#D4AF3740] flex flex-col",
                    reveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
                  )}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden flex-shrink-0">
                    <div className="absolute top-4 right-4 z-10 text-[10px] tracking-[0.2em] font-bold px-3 py-1 rounded-full border" style={{ borderColor: `${GOLD}40`, color: GOLD, background: "#1A1A1A90" }}>
                      {s.tag}
                    </div>
                    <img
                      src={s.photo}
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{s.name}</h3>
                    <p className="text-sm mb-3" style={{ color: GOLD }}>{s.role}</p>
                    <p className="text-sm text-[#F5F5F5]/70 leading-relaxed">
                      {s.short}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div ref={synergyReveal.ref} className={cn(
            "transition-all duration-1000",
            synergyReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <div className="text-center mb-12">
              <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: GOLD }}>Уникальность</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Что делает этот воркшоп особенным?</h2>
            </div>

            <div className="max-w-3xl mx-auto mb-12 space-y-6 text-[#F5F5F5]/60 leading-relaxed text-center">
              <p>
                Классические подходы «старой школы» высокой эстетики и более чем 30-летний мануальный опыт Дмитрия Никоненко + цифровые возможности Cad/Cam и новинки Exocad 2026 от Дмитрия Филинова.
              </p>
              <p>
                Вы станете мастером, который виртуозно владеет всеми инструментами.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-0 max-w-6xl mx-auto rounded-3xl overflow-hidden border border-[#333]">
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

          </div>
        </div>
      </section>

      <section id="w16s-program" className="py-16 lg:py-20 relative">
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

          <div ref={timelineLineRef} className="relative max-w-3xl mx-auto mt-12">
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
                    <div className="absolute left-[22px] md:left-[34px] top-1 w-3 h-3 rounded-full border-2 transition-colors duration-500" style={{ borderColor: reveal.visible ? GOLD : "#555", background: reveal.visible ? GOLD : "transparent" }} />

                    <div className="text-sm font-bold tracking-wider mb-1" style={{ color: GOLD }}>{item.time}</div>

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

      <section className="py-16 lg:py-20 relative">
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
                  <p className="text-sm text-[#F5F5F5] leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 relative border-t border-[#2A2A2A]">
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
            <div className="mt-10 max-w-4xl mx-auto rounded-2xl overflow-hidden">
              <img src="/images/courses/course-18-innovations.jpg" alt="Инновации, к которым можно прикоснуться" className="w-full h-auto object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 relative border-t border-[#2A2A2A] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 h-[280px] w-[280px] -translate-x-1/2 rounded-full blur-[140px]" style={{ background: `${GOLD}12` }} />
        </div>
        <div className="container mx-auto px-4 relative">
          <div ref={prizesReveal.ref} className={cn(
            "max-w-6xl mx-auto transition-all duration-1000",
            prizesReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <div className="text-center mb-12">
              <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: GOLD }}>Розыгрыш призов</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Подарки для участников мероприятия</h2>
              <p className="text-[#F5F5F5]/50 max-w-3xl mx-auto text-lg">
                Среди участников мероприятия мы разыграем ценные призы от партнёров — профессиональные инструменты и аксессуары для ежедневной практики.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
              {prizes.map((prize, index) => (
                <div
                  key={prize.title}
                  className="group rounded-3xl border border-[#333] bg-[#222]/70 overflow-hidden transition-all duration-500 hover:border-[#D4AF37]/40 hover:shadow-[0_0_40px_-10px_#D4AF3740]"
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <div className="bg-white px-6 py-8 md:px-8 md:py-10 min-h-[260px] flex items-center justify-center">
                    <div className="flex h-[180px] md:h-[200px] w-full items-center justify-center">
                      <img
                        src={prize.image}
                        alt={prize.title}
                        className="h-full w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="text-sm font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: GOLD }}>
                      {prize.place}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{prize.title}</h3>
                    <p className="text-[#F5F5F5]/60 leading-relaxed">{prize.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 relative border-t border-[#2A2A2A]">
        <div className="container mx-auto px-4">
          {(() => { const reveal = useReveal(); return (
            <div ref={reveal.ref} className={cn(
              "max-w-5xl mx-auto transition-all duration-1000",
              reveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <div className="text-center mb-12">
                <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: GOLD }}>Развлечения</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Живое выступление кавер-группы</h2>
                <p className="text-[#F5F5F5]/50 max-w-2xl mx-auto text-lg">
                  Профессиональная кавер-группа будет играть на протяжении всего мероприятия, создавая невероятную атмосферу и заряжая энергией весь вечер.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden border border-[#333] hover:border-[#D4AF37]/30 transition-all duration-500">
                <img
                  src="/images/courses/course-18-band.jpg"
                  alt="Живое выступление кавер-группы на мероприятии Артикон"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          ); })()}
        </div>
      </section>

      <section className="py-16 lg:py-20 relative">
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
                Для оплаты от юрлица пришлите нам свои реквизиты.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 relative border-t border-[#2A2A2A]">
        <div className="container mx-auto px-4">
          <div ref={partnersReveal.ref} className={cn(
            "max-w-5xl mx-auto transition-all duration-1000",
            partnersReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <div className="text-center mb-12">
              <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: GOLD }}>Партнёры</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Партнёры мероприятия</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {partners.map((partner, index) => (
                <div
                  key={partner.name}
                  className="bg-[#222]/60 border border-[#333] rounded-3xl px-6 py-8 md:px-10 md:py-10 hover:border-[#D4AF37]/30 transition-all duration-500"
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <div className="rounded-2xl min-h-[170px] md:min-h-[200px] flex items-center justify-center border border-white/10 bg-white p-6 md:p-8">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} — логотип партнёра мероприятия`}
                      className="max-h-20 md:max-h-24 w-auto max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 relative border-t border-[#2A2A2A]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Часто задаваемые вопросы</h2>
          <div className="space-y-4">
            {course.faq.map((item, i) => (
              <FaqItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 relative overflow-hidden">
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

      <FloatingVideoWidget videos={["/videos/workshop-18-past-1.mp4", "/videos/workshop-18-past-2.mp4"]} />

      <div className="border-t border-[#2A2A2A] py-8">
        <div className="container mx-auto px-4 text-center">
          <Link to="/education/calendar" className="text-sm text-[#F5F5F5]/40 hover:text-[#F5F5F5]/70 transition-colors inline-flex items-center gap-2">
            <ArrowRight className="h-4 w-4 rotate-180" /> Все курсы и мероприятия
          </Link>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#1A1A1A]/95 backdrop-blur-md border-t border-[#333] p-3 safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="min-w-0 text-left">
            <div className="font-extrabold text-2xl leading-none sm:text-xl" style={{ color: GOLD }}>7 000 ₽</div>
            <div className="text-xs text-[#F5F5F5]/40">Шестнадцать оттенков белого</div>
          </div>
          <div className="w-full sm:w-auto sm:min-w-[220px] sm:shrink-0">
            <CourseApplicationForm
              courseName={course.title}
              courseDate={course.date}
              buttonVariant="card"
              buttonLabel="Забронировать"
            />
          </div>
        </div>
      </div>
      <div className="h-24 lg:hidden" />

      <style>{`
        .w16s-page {
          scroll-behavior: smooth;
        }

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

        .w16s-text-reveal {
          animation: w16s-reveal 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes w16s-reveal {
          to { opacity: 1; transform: translateY(0); }
        }

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
