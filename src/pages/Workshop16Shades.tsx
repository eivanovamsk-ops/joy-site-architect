import { useEffect, useRef, useState, useCallback } from "react";
import { X, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Users, Award, CheckCircle2, ChevronDown, Sparkles, Wine, MessageCircle, UtensilsCrossed, ArrowRight, Monitor, UserCheck, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseApplicationForm } from "@/components/forms/CourseApplicationForm";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { CourseContactBlock } from "@/components/education/CourseContactBlock";
import { courses } from "@/data/courses";
import upceraLogo from "@/assets/partners/upcera-logo.png";
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
        <p className="text-[#F5F5F5]/80 text-sm leading-relaxed">{answer}</p>
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
      <div className="relative w-[125px] md:w-[238px] rounded-xl overflow-hidden shadow-2xl border border-[#333] bg-[#1A1A1A]">
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



const perks = [
  { icon: MessageCircle, title: "Живое общение", desc: "В перерывах и после основной части у вас будет возможность в непринужденной обстановке пообщаться со спикерами и коллегами, обсудить рабочие моменты и наладить новые профессиональные связи.", image: "/images/courses/course-18-communication.jpg" },
  { icon: UtensilsCrossed, title: "Питание", desc: "Мы позаботились о том, чтобы день был насыщенным не только знаниями, но и впечатлениями. Вкусные угощения в течение дня — часть атмосферы, которую мы стараемся создать.", image: "/images/courses/course-18-food.jpg" },
  { icon: Wine, title: "Вечеринка", desc: "А вечером в пятницу мы устроим фуршет с угощениями и напитками, включая алкоголь. Это отличная возможность расслабиться после насыщенного дня, продолжить общение и просто хорошо провести время.", image: "/images/courses/course-18-party.png" },
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
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-[116px] lg:pt-[164px]">
        <div ref={heroRef} className="absolute inset-0 will-change-transform">
          <img src="/images/courses/course-18-hero.jpg" alt="Шестнадцать оттенков белого" className="w-full h-[120%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/85 to-[#1A1A1A]/50" />
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
            </div>

            <h1 className={cn(
              "text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 transition-all duration-1000 delay-200 ease-out",
              heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <span className="w16s-text-reveal inline-block">Воркшоп для</span>
              <br />
              <span className="w16s-text-reveal inline-block" style={{ animationDelay: "0.3s" }}>зубных</span>{" "}
              <span className="w16s-text-reveal inline-block" style={{ animationDelay: "0.5s", color: GOLD }}>техников</span>
            </h1>

            <p className={cn(
              "text-base md:text-lg text-white/90 mb-6 max-w-xl leading-relaxed transition-all duration-1000 delay-[400ms] ease-out",
              heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              4 часа живых демонстраций — чтобы ваши работы принимались с первого раза без переделок
            </p>

            <ul className={cn(
              "space-y-2 text-white font-medium text-sm md:text-base mb-8 transition-all duration-1000 delay-500 ease-out",
              heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <li>— Чёткий алгоритм работы</li>
              <li>— Разбор реальных кейсов и типичных ошибок</li>
              <li>— Нетворкинг, фуршет</li>
              <li>— Кавер группа + крутой розыгрыш</li>
            </ul>

            <div className={cn(
              "flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#F5F5F5]/90 mb-8 transition-all duration-1000 delay-[600ms] ease-out",
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
                  showTelegramField={false}
                />
              </div>
              <button onClick={() => scrollTo("w16s-format")} className="text-[#F5F5F5]/80 hover:text-[#F5F5F5] transition-colors text-sm flex items-center gap-2 mt-2">
                Подробнее <ChevronDown className="h-4 w-4 animate-bounce" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#F5F5F5]/90">
          <div className="w-px h-12 bg-gradient-to-b from-transparent" style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${GOLD}40)` }} />
        </div>
      </section>

      <section id="w16s-format" className="py-16 lg:py-20 relative">
        <div className="container mx-auto px-4">
          <div ref={formatReveal.ref} className={cn(
            "max-w-5xl mx-auto transition-all duration-1000",
            formatReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <div className="text-center mb-10">
              <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: GOLD }}>Формат</span>
              <h2 className="text-4xl md:text-5xl font-bold">Как проходит мероприятие?</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { text: "Демонстрация на большом экране", image: "/images/courses/course-18-format-demo.jpg" },
                { text: "Персональная обратная связь напрямую от мастера", image: "/images/courses/course-18-format-feedback.jpg" },
                { text: "Презентация новейших материалов и оборудования", image: "/images/courses/course-18-format-equipment.jpg" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <p className="text-lg font-medium mb-4 flex items-start gap-3">
                    <span className="flex-shrink-0" style={{ color: GOLD }}>•</span>
                    {item.text}
                  </p>
                  <div className="rounded-2xl overflow-hidden border border-[#333] mt-auto">
                    <img src={item.image} alt={item.text} className="w-full h-48 object-cover" loading="lazy" />
                  </div>
                </div>
              ))}
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
            <p className="text-[#F5F5F5]/80 max-w-2xl mx-auto text-lg">
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
                    "flex flex-col text-center p-8 rounded-2xl border border-[#333] bg-[#222]/50 hover:border-[#D4AF37]/40 transition-all duration-500 group",
                    reveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  )}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30` }}>
                    <p.icon className="h-7 w-7" style={{ color: GOLD }} />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{p.title}</h3>
                  <p className="text-sm text-[#F5F5F5] leading-relaxed mb-4 flex-1">{p.desc}</p>
                  <div className="rounded-xl overflow-hidden mt-auto">
                    <img src={p.image} alt={p.title} className="w-full h-40 object-cover" loading="lazy" />
                  </div>
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
            <p className="text-[#F5F5F5]/90 leading-relaxed text-lg max-w-3xl mx-auto">
              Для гостей будет развернута интерактивная выставка: стенды с новейшими разработками и оборудованием от топовых мировых брендов.
              <br /><br />
              Вы сможете подойти, изучить их вблизи и задать вопросы представителям компаний.
            </p>
            <div className="mt-10 max-w-4xl mx-auto rounded-2xl overflow-hidden">
              <img src="/images/courses/course-18-innovations.jpg" alt="Инновации, к которым можно прикоснуться" className="w-full h-auto object-cover" loading="lazy" />
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
                <p className="text-[#F5F5F5]/80 max-w-2xl mx-auto text-lg">
                  Профессиональная кавер-группа будет играть на протяжении всего мероприятия, создавая невероятную атмосферу и заряжая энергией весь вечер.
                </p>
              </div>
              <div className="flex gap-4 items-stretch">
                <div className="flex-1 rounded-2xl overflow-hidden border border-[#333] hover:border-[#D4AF37]/30 transition-all duration-500">
                  <img
                    src="/images/courses/course-18-band-4.jpg"
                    alt="Выступление вокалистки кавер-группы"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 rounded-2xl overflow-hidden border border-[#333] hover:border-[#D4AF37]/30 transition-all duration-500">
                  <img
                    src="/images/courses/course-18-band-1.jpg"
                    alt="Кавер-группа на мероприятии Артикон"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 rounded-2xl overflow-hidden border border-[#333] hover:border-[#D4AF37]/30 transition-all duration-500">
                  <img
                    src="/images/courses/course-18-band-3.jpg"
                    alt="Живое выступление кавер-группы"
                    className="w-full h-full object-cover"
                  />
                </div>
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
              <p className="text-white/90 text-sm mb-8">Включено: мастер-классы, нетворкинг, фуршет</p>

              <div className="space-y-3 text-left mb-8">
                {course.includes.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-[#F5F5F5]/90">
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
                  showTelegramField={false}
                />
              </div>

              <p className="text-xs text-[#F5F5F5]/90 mt-4">
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

            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto">
              {partners.map((partner, index) => {
                const content = (
                  <div className="rounded-2xl aspect-[3/2] flex items-center justify-center bg-white p-5">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} — логотип партнёра мероприятия`}
                      className="max-h-[80%] w-auto max-w-[85%] object-contain"
                      loading="lazy"
                    />
                  </div>
                );
                return (
                  <div
                    key={partner.name}
                    className="rounded-2xl overflow-hidden hover:ring-2 hover:ring-[#D4AF37]/40 transition-all duration-500"
                    style={{ transitionDelay: `${index * 120}ms` }}
                  >
                    {partner.url ? (
                      <a href={partner.url} target="_blank" rel="noreferrer" aria-label={`Перейти на сайт ${partner.name}`}>
                        {content}
                      </a>
                    ) : content}
                  </div>
                );
              })}
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
            <p className="text-[#F5F5F5]/80 mb-10 text-lg">
              Запишитесь на курс сейчас или свяжитесь с нами для получения дополнительной информации.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="w16s-cta-glow">
                <CourseApplicationForm
                  courseName={course.title}
                  courseDate={course.date}
                  buttonLabel="Забронировать место"
                  showTelegramField={false}
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

      <CourseContactBlock />

      <FloatingVideoWidget videos={["/videos/16-shades-preview.mp4"]} />

      <div className="border-t border-[#2A2A2A] py-8">
        <div className="container mx-auto px-4 text-center">
          <Link to="/education/calendar" className="text-sm text-white/90 hover:text-white/90 transition-colors inline-flex items-center gap-2">
            <ArrowRight className="h-4 w-4 rotate-180" /> Все курсы и мероприятия
          </Link>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#1A1A1A]/95 backdrop-blur-md border-t border-[#333] p-3 safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="min-w-0 text-left">
            <div className="font-extrabold text-2xl leading-none sm:text-xl" style={{ color: GOLD }}>7 000 ₽</div>
            <div className="text-xs text-white/90">Шестнадцать оттенков белого</div>
          </div>
          <div className="w-full sm:w-auto sm:min-w-[220px] sm:shrink-0">
            <CourseApplicationForm
              courseName={course.title}
              courseDate={course.date}
              buttonVariant="card"
              buttonLabel="Забронировать"
              showTelegramField={false}
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
