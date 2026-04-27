import { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight as ChevronRightIcon, ZoomIn, Camera, Aperture } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, CheckCircle2, ChevronDown, ArrowRight, BookOpen, Lightbulb, HelpCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseApplicationForm } from "@/components/forms/CourseApplicationForm";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { courses } from "@/data/courses";
import { CourseContactBlock } from "@/components/education/CourseContactBlock";
import course20Banner from "@/assets/courses/course-20-banner.jpg";


const ACCENT = "#00BCD4"; // Teal/cyan — photography-inspired

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
    <div className="border border-[#333] rounded-xl overflow-hidden hover:border-[#00BCD4]/30 transition-colors duration-300">
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

/* ─── Photo Gallery with Lightbox ─── */
function PhotoGallery({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const reveal = useReveal();

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
      else if (e.key === 'ArrowRight') goTo(activeIndex + 1);
      else if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, activeIndex, goTo]);

  return (
    <>
      <div ref={reveal.ref} className={cn(
        "transition-all duration-1000",
        reveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}>
        <div className="text-center mb-12">
          <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Галерея</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Обучение в деталях</h2>
          <p className="text-[#F5F5F5]/50 max-w-2xl mx-auto text-lg">От теории до практических работ — каждый участник получает навыки под руководством опытного преподавателя</p>
        </div>

        {/* Main Image */}
        <div
          className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#222] cursor-zoom-in group mb-4 border border-[#333]"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={images[activeIndex]}
            alt={`Фото с курса ${activeIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 right-4 bg-[#1A1A1A]/80 backdrop-blur-sm rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="h-5 w-5 text-[#F5F5F5]" />
          </div>
          <div className="absolute bottom-4 left-4 bg-[#1A1A1A]/80 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-medium text-[#F5F5F5] opacity-0 group-hover:opacity-100 transition-opacity">
            {activeIndex + 1} / {images.length}
          </div>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goTo(activeIndex - 1); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#1A1A1A]/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#1A1A1A] transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="h-5 w-5 text-[#F5F5F5]" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goTo(activeIndex + 1); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#1A1A1A]/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#1A1A1A] transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRightIcon className="h-5 w-5 text-[#F5F5F5]" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "flex-shrink-0 w-20 h-14 md:w-28 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300",
                i === activeIndex
                  ? "border-[#00BCD4] ring-2 ring-[#00BCD4]/30 scale-105"
                  : "border-[#333] hover:border-[#00BCD4]/50 opacity-60 hover:opacity-100"
              )}
            >
              <img src={img} alt={`Миниатюра ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
          <img
            src={images[activeIndex]}
            alt={`Фото ${activeIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-colors">
            <X className="h-6 w-6 text-white" />
          </button>
          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); goTo(activeIndex - 1); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors">
                <ChevronLeft className="h-7 w-7 text-white" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); goTo(activeIndex + 1); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors">
                <ChevronRightIcon className="h-7 w-7 text-white" />
              </button>
            </>
          )}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                className={cn("w-2.5 h-2.5 rounded-full transition-all", i === activeIndex ? "bg-white w-7" : "bg-white/40 hover:bg-white/60")}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Data ─── */
const course = courses.find(c => c.id === 20)!;

const whyItems = [
  { icon: "📋", title: "Документирование", desc: "Точная фиксация клинических случаев до/после лечения" },
  { icon: "🤝", title: "Доверие пациентов", desc: "Наглядная визуализация плана лечения повышает доверие" },
  { icon: "⚖️", title: "Юридическая защита", desc: "Фото как часть медицинской документации — ваша страховка" },
  { icon: "📱", title: "Маркетинг клиники", desc: "Профессиональные фото для соцсетей и сайта привлекают пациентов" },
];

const programItems = [
  {
    num: "01",
    title: "Техническая база",
    topics: ["Как выбрать камеру, объектив и вспышку для дентальной съёмки", "Настройки оборудования для разных видов съёмки"],
  },
  {
    num: "02",
    title: "Стандарты фотопротокола",
    topics: [
      "Универсальный документальный внутриклинический фотопротокол — портрет, улыбка, дентальная съёмка",
      "Ортопедический и ортодонтический фотопротоколы",
      "Фотопротокол гнатолога (модели в артикуляторе, окклюзограммы, бруксчеккеры, сплинты)",
      "Фотопротокол гигиениста (отбеливание)",
    ],
  },
  {
    num: "03",
    title: "Постобработка и архивация",
    topics: ["Постобработка фото в Lightroom и Photoshop", "Программы для создания архива фото пациентов"],
  },
  {
    num: "04",
    title: "Юридические аспекты",
    topics: ["Использование фотоматериалов в медицинской документации", "Согласие пациента на съёмку — как оформить правильно"],
  },
];

const formatItems = [
  { icon: "🕙", title: "10:00–20:00", desc: "Интенсивный однодневный курс" },
  { icon: "📸", title: "Теория + практика", desc: "Сразу отрабатываем навыки на своих камерах" },
  { icon: "👩‍⚕️", title: "Обратная связь", desc: "Каждый участник получит практику с ответами на вопросы" },
  { icon: "💻", title: "Раздаточные материалы", desc: "Шаблоны настроек, образцы документов" },
];

const faq = [
  { question: "Нужно ли приносить свою камеру?", answer: "Для практической отработки рекомендуется принести камеру, макрообъектив и вспышку. Если пока нет оборудования — вы сможете попрактиковаться на предоставленном." },
  { question: "Как долго длится курс?", answer: "Курс проходит с 10:00 до 20:00 — интенсивный однодневный формат с перерывами на кофе-брейк." },
  { question: "Где проходит обучение?", answer: "Учебный центр ARTICON, Москва, Варшавское шоссе 33с12. Удобно добраться от МЦК Верхние Котлы (6 минут пешком)." },
  { question: "Подойдёт ли курс, если я совсем не умею фотографировать?", answer: "Да, курс рассчитан на любой уровень подготовки. Мы начинаем с основ выбора оборудования и постепенно переходим к протоколам и постобработке." },
  { question: "Можно ли оплатить от организации?", answer: "Да, для оплаты от юрлица пришлите нам свои реквизиты, и мы подготовим счёт." },
];

const galleryImages = [
  "/images/courses/course-20-gallery-1.jpg",
  "/images/courses/course-20-gallery-2.jpg",
  "/images/courses/course-20-gallery-3.jpg",
  "/images/courses/course-20-gallery-4.jpg",
  "/images/courses/course-20-gallery-5.jpg",
  "/images/courses/course-20-gallery-6.jpg",
  "/images/courses/course-20-gallery-7.jpg",
];

const DentalPhotoProtocol = () => {
  const heroReveal = useReveal();
  const whyReveal = useReveal();
  const programReveal = useReveal();
  const formatReveal = useReveal();
  const speakerReveal = useReveal();
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
      <div className="dpp-page bg-[#1A1A1A] text-[#F5F5F5] min-h-screen overflow-hidden -mt-[116px] lg:-mt-[164px]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Helmet>
          <title>Курс «Дентальный фотопротокол» | Учебный центр Артикон</title>
          <meta name="description" content="Авторский курс Оксаны Кузнецовой по дентальной фотографии для стоматологов. Осень 2026, Москва. От съёмки до постобработки за 1 день." />
          <link rel="canonical" href="https://articon.pro/education/course/20" />
          <meta property="og:title" content="Дентальный фотопротокол — Курс | Артикон" />
          <meta property="og:description" content="Авторский курс по дентальной фотографии. 23 апреля 2026, Москва. Теория + практика." />
          <meta property="og:image" content={course20Banner} />
          <meta property="og:type" content="article" />
        </Helmet>

        {/* ═══════ HERO ═══════ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[116px] lg:pt-[164px]">
          <div ref={heroRef} className="absolute inset-0 will-change-transform">
            <img src={course20Banner} alt="Дентальный фотопротокол" className="w-full h-[120%] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/60 via-[#1A1A1A]/40 to-[#1A1A1A]" />
          </div>

          {/* Animated orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="dpp-orb dpp-orb-1" />
            <div className="dpp-orb dpp-orb-2" />
          </div>

          <div ref={heroReveal.ref} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <div className={cn("transition-all duration-1000 ease-out", heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${ACCENT})` }} />
                <span className="text-sm tracking-[0.3em] uppercase" style={{ color: ACCENT }}>Авторский курс</span>
                <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${ACCENT})` }} />
              </div>
            </div>

            <h1 className={cn(
              "text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 transition-all duration-1000 delay-200 ease-out",
              heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <span className="dpp-text-reveal inline-block">Дентальный</span>
              <br />
              <span className="dpp-text-reveal inline-block" style={{ animationDelay: "0.3s", color: ACCENT }}>фотопротокол</span>
            </h1>

            <p className={cn(
              "text-lg md:text-xl text-[#F5F5F5]/60 mb-4 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ease-out",
              heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              От съёмки до постобработки — освойте полный цикл работы с дентальной фотографией за один интенсивный день
            </p>

            <div className={cn(
              "flex flex-wrap justify-center gap-4 text-sm mb-10 transition-all duration-1000 delay-700 ease-out",
              heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <div className="flex items-center gap-2.5 bg-[#00BCD4]/20 backdrop-blur-sm border border-[#00BCD4]/40 rounded-full px-5 py-2.5">
                <Calendar className="h-4 w-4" style={{ color: ACCENT }} />
                <span className="font-bold text-[#F5F5F5]">23 апреля 2026</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
                <MapPin className="h-4 w-4" style={{ color: ACCENT }} />
                <span className="text-[#F5F5F5]/80">Москва</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
                <Clock className="h-4 w-4" style={{ color: ACCENT }} />
                <span className="text-[#F5F5F5]/80">10:00 — 20:00</span>
              </div>
            </div>

            <div className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-900 ease-out",
              heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <div className="dpp-cta-glow">
                <CourseApplicationForm courseName={course.title} courseDate={course.date} buttonLabel="Записаться на курс" />
              </div>
              <button onClick={() => scrollTo("dpp-why")} className="text-[#F5F5F5]/50 hover:text-[#F5F5F5] transition-colors text-sm flex items-center gap-2">
                Подробнее <ChevronDown className="h-4 w-4 animate-bounce" />
              </button>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#F5F5F5]/30">
            <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, transparent, ${ACCENT}40)` }} />
          </div>
        </section>

        {/* ═══════ WHY DENTAL PHOTO ═══════ */}
        <section id="dpp-why" className="py-24 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <div ref={whyReveal.ref} className={cn(
              "max-w-5xl mx-auto transition-all duration-1000",
              whyReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <div className="text-center mb-16">
                <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Зачем</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Почему дентальная фотография</h2>
                <p className="text-2xl md:text-3xl font-semibold" style={{ color: ACCENT }}>must-have для современного стоматолога?</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {whyItems.map((item, i) => {
                  const r = useReveal();
                  return (
                    <div
                      key={i}
                      ref={r.ref}
                      className={cn(
                        "bg-[#222]/60 border border-[#333] rounded-2xl p-8 hover:border-[#00BCD4]/30 transition-all duration-500 group",
                        r.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                      )}
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <div className="text-3xl mb-4">{item.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-[#F5F5F5]/50 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ PROGRAM ═══════ */}
        <section id="dpp-program" className="py-24 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <div ref={programReveal.ref} className={cn(
              "text-center mb-6 transition-all duration-700",
              programReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Программа</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">От съёмки до постобработки</h2>
              <p className="text-[#F5F5F5]/50 max-w-2xl mx-auto text-lg">Полный цикл работы с дентальной фотографией за один интенсивный день</p>
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

                      {/* Num */}
                      <div className="text-sm font-bold tracking-wider mb-1" style={{ color: ACCENT }}>{item.num}</div>

                      {/* Card */}
                      <div className="bg-[#222]/60 border border-[#333] rounded-xl p-6 hover:border-[#00BCD4]/30 transition-all duration-300">
                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                        <ul className="space-y-2">
                          {item.topics.map((topic, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-[#F5F5F5]/60">
                              <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Note */}
            <div className="max-w-3xl mx-auto mt-12 p-6 bg-[#00BCD4]/10 border border-[#00BCD4]/20 rounded-xl text-center">
              <Aperture className="h-6 w-6 mx-auto mb-3" style={{ color: ACCENT }} />
              <p className="text-[#F5F5F5]/70 text-sm leading-relaxed">
                Для практической отработки рекомендуется принести камеру, макрообъектив и вспышку
              </p>
            </div>
          </div>
        </section>

        {/* ═══════ GALLERY ═══════ */}
        <section className="py-24 lg:py-32 relative border-t border-[#2A2A2A]">
          <div className="container mx-auto px-4 max-w-6xl">
            <PhotoGallery images={galleryImages} />
          </div>
        </section>

        {/* ═══════ FORMAT ═══════ */}
        <section className="py-24 lg:py-32 relative border-t border-[#2A2A2A]">
          <div className="container mx-auto px-4">
            <div ref={formatReveal.ref} className={cn(
              "max-w-5xl mx-auto transition-all duration-1000",
              formatReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <div className="text-center mb-12">
                <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Формат</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Формат обучения</h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {formatItems.map((item, i) => (
                  <div key={i} className="text-center p-6 rounded-2xl border border-[#333] bg-[#222]/50 hover:border-[#00BCD4]/40 transition-all duration-500 group">
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h3 className="font-bold mb-2" style={{ color: ACCENT }}>{item.title}</h3>
                    <p className="text-sm text-[#F5F5F5]/50">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ SPEAKER ═══════ */}
        <section className="py-24 lg:py-32 relative border-t border-[#2A2A2A]">
          <div className="container mx-auto px-4">
            <div ref={speakerReveal.ref} className={cn(
              "max-w-4xl mx-auto transition-all duration-1000",
              speakerReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <div className="text-center mb-12">
                <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Преподаватель</span>
                <h2 className="text-4xl md:text-5xl font-bold">Курс ведёт</h2>
              </div>

              <div className="grid md:grid-cols-[320px_1fr] gap-10 items-center">
                {/* Photo */}
                <div className="relative mx-auto">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-[#333] group-hover:border-[#00BCD4]/30">
                    <img
                      src={course.lecturers[0].photo}
                      alt={course.lecturers[0].name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 px-4 py-2 rounded-xl border text-sm font-bold" style={{ borderColor: `${ACCENT}40`, color: ACCENT, background: "#1A1A1A" }}>
                    <Award className="h-4 w-4 inline mr-1.5" />RSSA
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-3xl font-bold mb-2">{course.lecturers[0].name}</h3>
                  <p className="text-lg mb-4" style={{ color: ACCENT }}>{course.lecturers[0].position}</p>
                  <p className="text-[#F5F5F5]/60 leading-relaxed">{course.lecturers[0].bio}</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ═══════ PRICING ═══════ */}
        <section className="py-24 lg:py-32 relative border-t border-[#2A2A2A]">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <div className="bg-[#222]/80 border border-[#333] rounded-3xl p-10 hover:border-[#00BCD4]/30 transition-all duration-500">
                <span className="text-sm tracking-[0.3em] uppercase mb-6 block" style={{ color: ACCENT }}>Стоимость</span>

                <div className="flex items-center justify-center gap-2 mb-2">
                  <Aperture className="h-8 w-8" style={{ color: ACCENT }} />
                  <span className="text-5xl md:text-6xl font-extrabold">25 000 ₽</span>
                </div>
                <p className="text-[#F5F5F5]/40 text-sm mb-8">Теория + Практика • 1 день</p>

                <div className="space-y-3 text-left mb-8">
                  {course.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-[#F5F5F5]/60">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="dpp-cta-glow">
                  <CourseApplicationForm courseName={course.title} courseDate={course.date} buttonVariant="card" buttonLabel="Записаться на курс" />
                </div>

                <p className="text-xs text-[#F5F5F5]/30 mt-4">
                  Для оплаты от юрлица пришлите нам свои реквизиты.
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
              {faq.map((item, i) => (
                <FaqItem key={i} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ LOCATION ═══════ */}
        <section className="py-24 lg:py-32 relative border-t border-[#2A2A2A]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Место проведения</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Учебный центр ARTICON</h2>
              <p className="text-[#F5F5F5]/50 text-lg mb-2">Москва, Варшавское шоссе 33с12</p>
              <p className="text-[#F5F5F5]/50 mb-8">23 апреля 2026 / 10:00–20:00</p>

              <div className="grid sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
                <a href="https://yandex.ru/maps/?um=constructor%3A442f99c6df6275987c5859cab9ee67bdc166a3cc90cacccb19fad26b76c17fa8&source=constructorLink" target="_blank" rel="noopener noreferrer" className="bg-[#222]/60 border border-[#333] rounded-xl p-4 hover:border-[#00BCD4]/30 transition-colors text-center">
                  <p className="text-sm font-bold mb-1" style={{ color: ACCENT }}>МЦК Верхние Котлы</p>
                  <p className="text-xs text-[#F5F5F5]/40">~6 минут пешком</p>
                </a>
                <a href="https://yandex.com/maps/?um=constructor%3A85626b6fae5edde3fd111cdd1e03c04bfc50a71c52f16a3cdf12bc203952f680&source=constructorLink" target="_blank" rel="noopener noreferrer" className="bg-[#222]/60 border border-[#333] rounded-xl p-4 hover:border-[#00BCD4]/30 transition-colors text-center">
                  <p className="text-sm font-bold mb-1" style={{ color: ACCENT }}>Бесплатная парковка</p>
                  <p className="text-xs text-[#F5F5F5]/40">Варшавское ш. 37, ~5 мин</p>
                </a>
                <a href="https://yandex.ru/maps/?um=constructor%3Ae6e60cdef332cbf2a45c590280538cb70953e7dd0cb17aa60f1db1016e2fb1ec&source=constructorLink" target="_blank" rel="noopener noreferrer" className="bg-[#222]/60 border border-[#333] rounded-xl p-4 hover:border-[#00BCD4]/30 transition-colors text-center">
                  <p className="text-sm font-bold mb-1" style={{ color: ACCENT }}>м. Нагатинская</p>
                  <p className="text-xs text-[#F5F5F5]/40">~11 минут пешком</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ FINAL CTA ═══════ */}
        <section className="py-24 lg:py-32 relative overflow-hidden border-t border-[#2A2A2A]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full blur-[250px]" style={{ background: `${ACCENT}0A` }} />
          </div>
          <div className="container mx-auto px-4 relative">
            <div ref={ctaReveal.ref} className={cn(
              "text-center max-w-2xl mx-auto transition-all duration-1000",
              ctaReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Всего за 1 день — готовая система работы с дентальной фотографией
              </h2>
              <p className="text-[#F5F5F5]/50 mb-10 text-lg">
                Запишитесь на курс сейчас и получите навыки, которые будут работать на вас каждый день.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="dpp-cta-glow">
                  <CourseApplicationForm courseName={course.title} courseDate={course.date} buttonLabel="Записаться на курс" />
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
                  <a href="tel:+79099056457" className="hover:text-[#F5F5F5] transition-colors">+7 (909) 905-64-57</a>
                  <a href="tel:+79060457537" className="hover:text-[#F5F5F5] transition-colors">8 (906) 045-75-37</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CourseContactBlock />

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
              <div className="font-extrabold text-xl" style={{ color: ACCENT }}>25 000 ₽</div>
              <div className="text-xs text-[#F5F5F5]/40 truncate">Дентальный фотопротокол</div>
            </div>
            <CourseApplicationForm courseName={course.title} courseDate={course.date} buttonVariant="card" buttonLabel="Записаться" />
          </div>
        </div>
        <div className="h-20 lg:hidden" />

        {/* ═══════ SCOPED STYLES ═══════ */}
        <style>{`
          .dpp-page { scroll-behavior: smooth; }

          .dpp-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(120px);
            opacity: 0.12;
            animation: dpp-float 12s ease-in-out infinite;
          }
          .dpp-orb-1 {
            width: 400px; height: 400px;
            background: ${ACCENT};
            top: 20%; left: 10%;
          }
          .dpp-orb-2 {
            width: 300px; height: 300px;
            background: #0097A7;
            bottom: 20%; right: 15%;
            animation-delay: -4s;
          }

          @keyframes dpp-float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -20px) scale(1.05); }
            66% { transform: translate(-20px, 15px) scale(0.95); }
          }

          .dpp-text-reveal {
            animation: dpp-reveal 0.8s ease-out forwards;
            opacity: 0;
            transform: translateY(20px);
          }
          @keyframes dpp-reveal {
            to { opacity: 1; transform: translateY(0); }
          }

          .dpp-cta-glow button {
            background: ${ACCENT} !important;
            color: #1A1A1A !important;
            border: none !important;
            font-weight: 700 !important;
            transition: box-shadow 0.3s ease, transform 0.3s ease !important;
          }
          .dpp-cta-glow button:hover {
            box-shadow: 0 0 30px ${ACCENT}50, 0 0 60px ${ACCENT}20 !important;
            transform: translateY(-2px) !important;
          }

          .dpp-page .gradient-primary {
            background: ${ACCENT} !important;
            color: #1A1A1A !important;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default DentalPhotoProtocol;
