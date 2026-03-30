import { useEffect, useRef, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Calendar, MapPin, Clock, CheckCircle2, ChevronDown, Users, Target, Zap, Award, HelpCircle, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseApplicationForm } from "@/components/forms/CourseApplicationForm";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { courses } from "@/data/courses";

const ACCENT = "#00A3FF"; // Tech-blue for implant/digital feel

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
const course = courses.find(c => c.id === 21)!;

const topics = [
  {
    title: "UltraFitScan — альтернатива фотограмметрии",
    desc: "Разберем реальный кейс, подчеркнём на что необходимо обратить внимание при работе с UltraFitScan. Последовательность действий влияет на точность скана.",
    icon: Target,
    image: null,
  },
  {
    title: "Ультрастом — решения с мультиюнитами",
    desc: "Когда цифра работает правильно — вы экономите время, получаете предсказуемый результат.",
    icon: Zap,
    image: "/images/courses/course-21-multiunit.png",
  },
  {
    title: "Угловое решение до 25°",
    desc: "Угловые решения в ортопедических конструкциях реализуются при помощи титановых оснований с помощью винта Dynamic и специальной отвёртки.",
    icon: Target,
    image: "/images/courses/course-21-angular-solution.png",
  },
  {
    title: "Реалгайд — диагностика и планирование",
    desc: "На этапе планирования выбираем высоту шейки мультиюнита, угла и направление шахты. Разработаны программы и функционал для удобной работы.",
    icon: Award,
    image: "/images/courses/course-21-exoplan.png",
  },
  {
    title: "Экзоплан — подбор в Экзокаде",
    desc: "Разработаны и реализованы детали для планирования и подбора в Экзокаде, которые обеспечивают комфортную работу ортопедов и хирургов.",
    icon: Users,
  },
];

const discussionItems = [
  "Прямое соединение к мультиюниту через ультравинт — надёжность и простота решения",
  "Широкий выбор мультиюнитов под разные клинические случаи",
  "Экзоплан — детали для планирования и подбора в Экзокаде",
  "Программа Дамира Гуфранова «Основы сканирования пациента с имплантатами»",
  "Гибкая настройка 3D-печати и подбор радиальных зазоров — как добиться точной посадки",
];

const speakers = [
  {
    name: "Дамир Гуфранов",
    photo: "https://static.wixstatic.com/media/526e65_8e171b39717a47d19266a2c8d463fb6c~mv2.png/v1/crop/x_0,y_27,w_1225,h_1225/fill/w_246,h_246,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/526e65_8e171b39717a47d19266a2c8d463fb6c~mv2.png",
  },
  {
    name: "Артем Борисенко",
    photo: "https://static.wixstatic.com/media/526e65_f93ac9ad527d46e9ac9b26c1a63acec8~mv2.png/v1/crop/x_0,y_27,w_1225,h_1225/fill/w_246,h_246,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/526e65_f93ac9ad527d46e9ac9b26c1a63acec8~mv2.png",
  },
  {
    name: "Артем Алимбетов",
    photo: "https://static.wixstatic.com/media/526e65_d7b547218c644037a57e912e814ca543~mv2.png/v1/crop/x_0,y_27,w_1225,h_1225/fill/w_246,h_246,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/526e65_d7b547218c644037a57e912e814ca543~mv2.png",
  },
];

const directions = [
  { label: "от МЦК Верхние Котлы", detail: "~590 метров — 6 минут ходьбы", url: "https://yandex.ru/maps/?um=constructor%3A442f99c6df6275987c5859cab9ee67bdc166a3cc90cacccb19fad26b76c17fa8&source=constructorLink" },
  { label: "Бесплатная городская парковка", detail: "Варшавское шоссе 37 — ~350 метров", url: "https://yandex.com/maps/?um=constructor%3A85626b6fae5edde3fd111cdd1e03c04bfc50a71c52f16a3cdf12bc203952f680&source=constructorLink" },
  { label: "от метро Нагатинская", detail: "~970 метров — 11 минут ходьбы", url: "https://yandex.ru/maps/?um=constructor%3Ae6e60cdef332cbf2a45c590280538cb70953e7dd0cb17aa60f1db1016e2fb1ec&source=constructorLink" },
];

const stats = [
  { value: 3, suffix: "", label: "Эксперта" },
  { value: 4, suffix: "ч", label: "Практики" },
  { value: 7000, suffix: "₽", label: "Стоимость" },
];

const ImplantProtocol = () => {
  const heroReveal = useReveal();
  const topicsReveal = useReveal();
  const discussReveal = useReveal();
  const speakersReveal = useReveal();
  const statsReveal = useReveal();
  const pricingReveal = useReveal();
  const directionsReveal = useReveal();

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

  return (
    <Layout>
      <div className="bg-[#1A1A1A] text-[#F5F5F5] min-h-screen overflow-hidden -mt-[116px] lg:-mt-[164px]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Helmet>
          <title>{course.metaTitle}</title>
          <meta name="description" content={course.metaDescription} />
          <link rel="canonical" href="https://articon.pro/education/course/21" />
        </Helmet>

        {/* ═══════ HERO ═══════ */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-[116px] lg:pt-[164px]">
          <div ref={heroRef} className="absolute inset-0 will-change-transform">
            <div className="absolute inset-0 bg-[#1A1A1A]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left — text */}
              <div ref={heroReveal.ref} className="text-left">
                <div className={cn("transition-all duration-1000 ease-out", heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${ACCENT})` }} />
                    <span className="text-sm tracking-[0.3em] uppercase" style={{ color: ACCENT }}>Бизнес-встреча</span>
                  </div>
                </div>

                <h1 className={cn(
                  "text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 transition-all duration-1000 delay-200 ease-out leading-tight",
                  heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  Новый <span style={{ color: ACCENT }}>протокол</span>
                  <br />
                  <span className="text-2xl md:text-4xl lg:text-5xl">для протезирования на имплантатах</span>
                </h1>

                <p className={cn(
                  "text-lg md:text-xl text-[#F5F5F5]/60 mb-6 max-w-xl leading-relaxed transition-all duration-1000 delay-500 ease-out",
                  heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  Разберём полный цифровой путь — от сканирования и планирования до точной реализации конструкции
                </p>

                <div className={cn(
                  "flex flex-wrap gap-3 text-sm mb-8 transition-all duration-1000 delay-700 ease-out",
                  heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  <div className="flex items-center gap-2.5 backdrop-blur-sm border rounded-full px-5 py-2.5" style={{ background: `${ACCENT}20`, borderColor: `${ACCENT}40` }}>
                    <Calendar className="h-4 w-4" style={{ color: ACCENT }} />
                    <span className="font-bold text-[#F5F5F5]">8 апреля 2026</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
                    <Clock className="h-4 w-4" style={{ color: ACCENT }} />
                    <span className="text-[#F5F5F5]/80">15:00 — 19:00</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
                    <MapPin className="h-4 w-4" style={{ color: ACCENT }} />
                    <span className="text-[#F5F5F5]/80">Москва, Megapolis Hall</span>
                  </div>
                </div>

                <div className={cn(
                  "flex flex-col sm:flex-row gap-4 items-start transition-all duration-1000 delay-900 ease-out",
                  heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  <CourseApplicationForm
                    courseName={course.title}
                    courseDate={course.date}
                    buttonLabel="Стать участником события"
                  />
                  <button onClick={() => scrollTo("ip-topics")} className="text-[#F5F5F5]/50 hover:text-[#F5F5F5] transition-colors text-sm flex items-center gap-2 py-3">
                    Подробнее <ChevronDown className="h-4 w-4 animate-bounce" />
                  </button>
                </div>
              </div>

              {/* Right — image with faded edges */}
              <div className="hidden lg:flex justify-end items-center relative">
                <div className="relative w-full max-w-2xl">
                  <img
                    src="/images/courses/course-21-hero.png"
                    alt="Rundeer V5 и UltraFitScan UF-B"
                    className="w-full object-contain scale-110"
                    style={{
                      maskImage: "radial-gradient(ellipse 75% 70% at center, black 40%, transparent 100%)",
                      WebkitMaskImage: "radial-gradient(ellipse 75% 70% at center, black 40%, transparent 100%)",
                    }}
                  />
                </div>
              </div>
            </div>
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

        {/* ═══════ TOPICS ═══════ */}
        <section id="ip-topics" className="py-24 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <div ref={topicsReveal.ref} className={cn(
              "max-w-5xl mx-auto transition-all duration-1000",
              topicsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <div className="text-center mb-16">
                <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Программа</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Что разберём на встрече</h2>
                <p className="text-xl text-[#F5F5F5]/50">Полный цифровой путь протезирования на имплантатах</p>
              </div>

              <div className="space-y-8">
                {topics.map((item, i) => {
                  const r = useReveal();
                  const hasImage = 'image' in item && item.image;
                  const isEven = i % 2 === 0;
                  return (
                    <div
                      key={i}
                      ref={r.ref}
                      className={cn(
                        "bg-[#222]/60 border border-[#333] rounded-2xl p-8 hover:border-[#00A3FF]/30 transition-all duration-500 group",
                        r.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                      )}
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <div className={cn("flex flex-col gap-6", hasImage && "md:flex-row md:items-center", hasImage && !isEven && "md:flex-row-reverse")}>
                        <div className={cn("flex-1", hasImage && "md:w-1/2")}>
                          <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}30` }}>
                            <item.icon className="h-7 w-7" style={{ color: ACCENT }} />
                          </div>
                          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-[#F5F5F5]/50 leading-relaxed">{item.desc}</p>
                        </div>
                        {hasImage && (
                          <div className={cn("md:w-1/2 flex flex-col gap-4", 'image2' in item && item.image2 ? "md:flex-row" : "")}>
                            <img src={item.image} alt={item.title} className="rounded-xl w-full object-contain max-h-[280px]" loading="lazy" />
                            {'image2' in item && item.image2 && (
                              <img src={(item as any).image2} alt={item.title} className="rounded-xl w-full md:w-1/2 object-contain max-h-[280px]" loading="lazy" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ WHAT ELSE ═══════ */}
        <section className="py-24 lg:py-32 relative border-t border-[#2A2A2A]">
          <div className="container mx-auto px-4">
            <div ref={discussReveal.ref} className={cn(
              "max-w-3xl mx-auto transition-all duration-1000",
              discussReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <div className="text-center mb-12">
                <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Дополнительно</span>
                <h2 className="text-3xl md:text-4xl font-bold">Что ещё обсудим</h2>
              </div>

              <div className="space-y-4">
                {discussionItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-[#222]/40 border border-[#333] rounded-xl p-5 hover:border-[#00A3FF]/20 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: `${ACCENT}20`, color: ACCENT }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <p className="text-[#F5F5F5]/70 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center mt-12">
                <CourseApplicationForm
                  courseName={course.title}
                  courseDate={course.date}
                  buttonLabel="Записаться на встречу"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ SPEAKERS ═══════ */}
        <section className="py-24 lg:py-32 relative border-t border-[#2A2A2A]">
          <div className="container mx-auto px-4">
            <div ref={speakersReveal.ref} className={cn(
              "max-w-4xl mx-auto transition-all duration-1000",
              speakersReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <div className="text-center mb-16">
                <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Эксперты</span>
                <h2 className="text-3xl md:text-4xl font-bold">Встречу ведут</h2>
              </div>

              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                {speakers.map((s, i) => (
                  <div key={i} className="text-center group">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 rounded-full overflow-hidden border-2 transition-colors duration-300" style={{ borderColor: `${ACCENT}30` }}>
                      <img
                        src={s.photo}
                        alt={s.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-bold text-lg">{s.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ PARTNERS ═══════ */}
        <section className="py-16 border-t border-[#2A2A2A]">
          <div className="container mx-auto px-4 text-center">
            <span className="text-sm tracking-[0.3em] uppercase mb-8 block" style={{ color: ACCENT }}>Партнёры</span>
            <div className="flex justify-center gap-8 items-center">
              <a href="https://ultrastom.shop/" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://static.wixstatic.com/media/526e65_9ac93c84ec4341c39da8d8560de6c5d7~mv2.png/v1/fill/w_293,h_102,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/526e65_9ac93c84ec4341c39da8d8560de6c5d7~mv2.png"
                  alt="Ультрастом"
                  className="h-12 md:h-16 object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>
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
              <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Стоимость участия</span>
              <div className="text-6xl md:text-7xl font-extrabold mb-4" style={{ color: ACCENT }}>
                7 000 ₽
              </div>
              <p className="text-[#F5F5F5]/50 mb-8">
                8 апреля 2026 | 15:00-19:00<br />
                Москва, конференц-зал MEGAPOLIS HALL
              </p>
              <CourseApplicationForm
                courseName={course.title}
                courseDate={course.date}
                buttonLabel="Зарегистрироваться"
              />
            </div>
          </div>
        </section>

        {/* ═══════ FAQ ═══════ */}
        <section className="py-24 lg:py-32 border-t border-[#2A2A2A]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>FAQ</span>
                <h2 className="text-3xl md:text-4xl font-bold">Остались вопросы?</h2>
              </div>
              <div className="space-y-3">
                {course.faq.map((f, i) => (
                  <FaqItem key={i} question={f.question} answer={f.answer} />
                ))}
              </div>
              <div className="text-center mt-8 text-[#F5F5F5]/50 text-sm">
                <p>Звоните: <a href="tel:+79057172061" className="hover:text-[#F5F5F5] transition-colors" style={{ color: ACCENT }}>8 (905) 717-20-61</a> или <a href="tel:+79060457537" className="hover:text-[#F5F5F5] transition-colors" style={{ color: ACCENT }}>8 (906) 045-75-37</a></p>
                <a href="https://wa.me/79057172061" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 hover:text-[#F5F5F5] transition-colors" style={{ color: ACCENT }}>
                  Написать в WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ DIRECTIONS ═══════ */}
        <section className="py-24 lg:py-32 border-t border-[#2A2A2A]">
          <div className="container mx-auto px-4">
            <div ref={directionsReveal.ref} className={cn(
              "max-w-4xl mx-auto transition-all duration-1000",
              directionsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <div className="text-center mb-12">
                <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Место проведения</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Как добраться</h2>
                <p className="text-[#F5F5F5]/50">Конференц-зал MEGAPOLIS HALL, Варшавское шоссе д33к12</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {directions.map((d, i) => (
                  <a
                    key={i}
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#222]/60 border border-[#333] rounded-2xl p-6 hover:border-[#00A3FF]/30 transition-all duration-300 group text-center"
                  >
                    <Navigation className="h-8 w-8 mx-auto mb-4 group-hover:scale-110 transition-transform" style={{ color: ACCENT }} />
                    <h3 className="font-bold mb-1">{d.label}</h3>
                    <p className="text-sm text-[#F5F5F5]/50">{d.detail}</p>
                    <span className="text-xs mt-3 inline-block" style={{ color: ACCENT }}>Открыть в Яндекс Картах →</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default ImplantProtocol;
