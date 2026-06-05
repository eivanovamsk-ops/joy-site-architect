import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, MapPin, CheckCircle2, ChevronDown, ArrowRight, Users, Target, Zap, Award, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseApplicationForm } from "@/components/forms/CourseApplicationForm";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { courses } from "@/data/courses";

const ACCENT = "#00A3FF";

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

const course = courses.find(c => c.id === 38)!;

const whyItems = [
  { icon: Target, title: "Цифра + биомеханика", desc: "Уникальная коллаборация ортодонтии и цифровой гнатологии — разбор кейсов с разных сторон" },
  { icon: Zap, title: "Digital-кейсы", desc: "Реальные клинические случаи с полным цифровым воркфлоу: от диагностики до результата" },
  { icon: Users, title: "Нетворкинг", desc: "Знакомства с лидерами индустрии, обмен контактами и поиск партнёров для сложных случаев" },
  { icon: Award, title: "Сертификат", desc: "Сертификат участника конференции, подтверждающий повышение квалификации" },
];

const DigitalOrthoConference2027 = () => {
  const heroReveal = useReveal();
  const whyReveal = useReveal();
  const pricingReveal = useReveal();
  const ctaReveal = useReveal();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Layout>
      <div className="doc-page bg-[#0A0E1A] text-[#F5F5F5] min-h-screen overflow-hidden -mt-[116px] lg:-mt-[164px]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Helmet>
          <title>V Конференция «Цифровая ортодонтия» 2027 | Учебный центр Артикон</title>
          <meta name="description" content="Ежегодная встреча ортодонтического сообщества. 3 июня 2027, Москва, MEGAPOLIS HALL. Программа и спикеры на согласовании." />
          <link rel="canonical" href="https://articon.pro/education/course/38" />
        </Helmet>

        {/* ═══════ HERO (без баннера) ═══════ */}
        <section className="relative flex items-end overflow-hidden pt-[116px] lg:pt-[164px] pb-12" style={{ minHeight: 'max(500px, 55vh)' }}>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E1A] via-[#0E1530] to-[#0A0E1A]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,163,255,0.15),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,163,255,0.1),transparent_60%)]" />
          </div>

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
                  <span className="text-sm tracking-[0.3em] uppercase" style={{ color: ACCENT }}>V Конференция</span>
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
                  <span className="font-bold text-[#F5F5F5]">3 июня 2027</span>
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
        </section>

        {/* ═══════ WHY ATTEND ═══════ */}
        <section id="doc-why" className="py-24 lg:py-32 relative border-t border-[#1A2035]">
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
                {whyItems.map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#111827]/60 border border-[#1E293B] rounded-2xl p-8 hover:border-[#00A3FF]/30 transition-all duration-500 group"
                  >
                    <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}30` }}>
                      <item.icon className="h-7 w-7" style={{ color: ACCENT }} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-[#F5F5F5]/50 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
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

        {/* ═══════ PROGRAM & SPEAKERS — На согласовании ═══════ */}
        <section className="py-24 lg:py-32 relative border-t border-[#1A2035]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Анонс</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Программа и спикеры конференции на согласовании
              </h2>
              <p className="text-[#F5F5F5]/50 text-lg leading-relaxed mb-10">
                Мы формируем состав спикеров и программу V конференции «Цифровая ортодонтия». Подпишитесь на нашу рассылку и следите за новостями — детали появятся ближе к мероприятию.
              </p>
              <div className="doc-cta-glow inline-block">
                <CourseApplicationForm
                  courseName={course.title}
                  courseDate={course.date}
                  coursePrice={course.price}
                  buttonLabel="Оставить заявку"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ WHAT YOU'LL LEARN ═══════ */}
        <section className="py-24 lg:py-32 relative border-t border-[#1A2035]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: ACCENT }}>Навыки</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Чему вы научитесь</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {course.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-[#111827]/60 border border-[#1E293B] rounded-xl p-5 hover:border-[#00A3FF]/30 transition-all duration-500"
                  >
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                    <span className="text-[#F5F5F5]/70 text-sm leading-relaxed">{skill}</span>
                  </div>
                ))}
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
          </div>
        </section>

        {/* ═══════ FINAL CTA ═══════ */}
        <section className="py-24 lg:py-32 relative overflow-hidden border-t border-[#1A2035]">
          <div className="container mx-auto px-4 relative">
            <div ref={ctaReveal.ref} className={cn(
              "text-center max-w-2xl mx-auto transition-all duration-1000",
              ctaReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Все на своих местах
              </h2>
              <p className="text-[#F5F5F5]/50 mb-10 text-lg">
                Запишитесь на конференцию и получите доступ к передовым методикам цифровой ортодонтии.
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
            </div>
          </div>
        </section>

        <div className="border-t border-[#1A2035] py-8">
          <div className="container mx-auto px-4 text-center">
            <Link to="/education/calendar" className="text-sm text-[#F5F5F5]/40 hover:text-[#F5F5F5]/70 transition-colors inline-flex items-center gap-2">
              <ArrowRight className="h-4 w-4 rotate-180" /> Все курсы и мероприятия
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DigitalOrthoConference2027;
