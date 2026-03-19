import { useState, useCallback, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  Calendar, Clock, Monitor, CheckCircle2, Loader2,
  ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Sparkles, Target, Palette, Wrench, X, ZoomIn, Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Floating Video Widget ─── */
function FloatingVideoWidget({ video }: { video: string }) {
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
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

  return (
    <div className={cn(
      "fixed bottom-20 lg:bottom-6 right-4 z-50 transition-all duration-500",
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <div className="relative w-[80px] md:w-[280px] rounded-xl overflow-hidden shadow-2xl border border-border bg-card">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black/80 rounded-full p-1 transition-colors"
        >
          <X className="h-3.5 w-3.5 text-white" />
        </button>

        {!playing ? (
          <div className="relative cursor-pointer group" onClick={handlePlay}>
            <video src={video} className="w-full" preload="metadata" muted playsInline poster="/images/webinar/cover-zircon.jpg" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 md:p-3">
                <Play className="h-3 w-3 md:h-6 md:w-6 text-white fill-white" />
              </div>
            </div>
            <div className="absolute bottom-1 left-1 right-4 md:bottom-2 md:left-2 md:right-8">
              <span className="text-[7px] md:text-[10px] text-white/70 uppercase tracking-wider hidden md:block">Смотреть превью</span>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={video}
            className="w-full"
            controls
            playsInline
          />
        )}
      </div>
    </div>
  );
}

const caseImages = [
  { src: "/images/webinar/zircon-case-1.jpg", alt: "Работа из циркония — мостовидный протез на имплантах" },
  { src: "/images/webinar/zircon-case-2.jpg", alt: "Работа из циркония — окклюзионный вид коронок" },
  { src: "/images/webinar/zircon-case-3.jpg", alt: "Работа из циркония — боковая группа зубов" },
  { src: "/images/webinar/zircon-case-4.jpg", alt: "Работа из циркония — фронтальная группа" },
  { src: "/images/webinar/zircon-case-5.jpg", alt: "Работа из циркония — коронки с розовой керамикой" },
];

function CasesSlider() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const go = useCallback((dir: number) => {
    setActive((p) => (p + dir + caseImages.length) % caseImages.length);
  }, []);

  return (
    <>
      <div className="relative group">
        {/* Main strip — shows 3 images with center focus */}
        <div className="flex items-center justify-center gap-4 md:gap-6 px-4">
          {caseImages.map((img, i) => {
            const offset = (i - active + caseImages.length) % caseImages.length;
            const centered = offset === 0;
            const adjacent = offset === 1 || offset === caseImages.length - 1;
            if (!centered && !adjacent) return null;

            return (
              <div
                key={i}
                onClick={() => centered ? setLightbox(true) : setActive(i)}
                className={`relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer ${
                  centered
                    ? "w-full max-w-3xl aspect-[16/10] shadow-2xl ring-2 ring-accent/20"
                    : "hidden md:block w-64 lg:w-80 aspect-[16/10] opacity-50 hover:opacity-75 scale-90"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
                {centered && (
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-70 transition-opacity drop-shadow-lg" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Arrows */}
        <button
          onClick={() => go(-1)}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-background transition-colors z-10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-background transition-colors z-10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {caseImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === active ? "bg-accent w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={lightbox} onOpenChange={setLightbox}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none [&>button]:hidden">
          <div className="relative w-full h-[90vh] flex items-center justify-center">
            <img
              src={caseImages[active].src}
              alt={caseImages[active].alt}
              className="max-w-full max-h-full object-contain"
            />
            <button onClick={() => setLightbox(false)} className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors">
              <X className="h-6 w-6 text-white" />
            </button>
            {caseImages.length > 1 && (
              <>
                <button onClick={() => go(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors">
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button onClick={() => go(1)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors">
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

const programTopics = [
  { icon: "🔬", title: "Секреты окрашивания", desc: "Как добиться стабильного оттенка и естественной глубины при работе с цирконом" },
  { icon: "🔥", title: "Нюансы обжига", desc: "Какие параметры влияют на итоговый результат и как их контролировать" },
  { icon: "⚠️", title: "Типичные ошибки", desc: "Разбор распространённых проблем и способы их предотвращения" },
  { icon: "✨", title: "Стабильная эстетика", desc: "Практические приёмы для предсказуемого результата" },
  { icon: "⚙️", title: "Оптимизация процесса", desc: "Как сократить количество переделок и повысить эффективность работы" },
  { icon: "❓", title: "Ответы на вопросы", desc: "Живое общение со спикером по вашим рабочим ситуациям" },
];

const audiences = [
  { icon: Wrench, title: "Зубным техникам", desc: "Работающим с цирконием и стремящимся повысить качество эстетических работ." },
  { icon: Target, title: "CAD/CAM специалистам", desc: "Желающим оптимизировать рабочий процесс и минимизировать количество переделок." },
  { icon: Palette, title: "Керамистам", desc: "Которые хотят добиться стабильного и предсказуемого результата при окрашивании." },
];

const learningPoints = [
  "Как правильно работать с цирконом, чтобы избежать распространённых ошибок",
  "Какие нюансы материала влияют на итоговую эстетику",
  "Как добиться стабильного оттенка и естественной глубины",
  "Какие практические приёмы помогают сократить количество переделок",
  "Как оптимизировать рабочий процесс в лаборатории",
];

const mentors = [
  "Магомедов Шамиль",
  "Мариано Маурици",
  "Хирохито Миязава",
  "Арам Абгарян",
  "Масахико Акасака",
];

export default function WebinarZirconMarch2026() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", specialization: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const scrollToReg = () => document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Введите имя";
    if (!form.phone.trim()) errs.phone = "Введите телефон";
    if (!form.email.trim()) errs.email = "Введите Email";
    if (!form.email.trim()) errs.email = "Введите Email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Некорректный Email";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setIsLoading(true);

    try {
      const applicationId = crypto.randomUUID();
      const { error } = await supabase.from("course_applications").insert({
        id: applicationId,
        user_id: user?.id || null,
        name: form.name,
        email: form.email || null,
        phone: form.phone,
        telegram: "",
        specialization: form.specialization || null,
        course_name: "Вебинар: Лайфхаки в работе с цирконом — 26 марта 2026",
        course_date: "2026-03-26",
      } as any);
      if (error) throw error;

      try {
        await supabase.functions.invoke("send-email-unisender", {
          body: {
            type: "course_application",
            courseApplicationId: applicationId,
          },
        });
      } catch {}

      setIsSubmitted(true);
    } catch {
      toast({ variant: "destructive", title: "Ошибка", description: "Попробуйте позже" });
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (f: string, v: string) => {
    setForm(p => ({ ...p, [f]: v }));
    if (errors[f]) setErrors(p => { const n = { ...p }; delete n[f]; return n; });
  };

  return (
    <Layout>
      <Helmet>
        <title>Зуботехническая лаборатория Артикон | Курс для зубных техников и керамистов</title>
        <meta name="description" content="Бесплатный онлайн-вебинар: лайфхаки работы с цирконом на примере Upcera Functional. Секреты окрашивания, обжига и эстетики. 26 марта, 16:00. Регистрация." />
        <meta property="og:title" content="Вебинар: Лайфхаки в работе с цирконом — 26 марта | Articon" />
        <meta property="og:description" content="Бесплатный онлайн-вебинар: лайфхаки работы с цирконом на примере Upcera Functional. Секреты окрашивания, обжига и эстетики. 26 марта, 16:00." />
        <meta property="og:image" content="https://joy-site-architect.lovable.app/images/webinar/cover-zircon-banner.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://joy-site-architect.lovable.app/images/webinar/cover-zircon-banner.png" />
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/webinar/cover-zircon-banner.png"
            alt="Вебинар: Лайфхаки в работе с цирконом — Артикон"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl text-left">
            <div className="flex flex-wrap items-start gap-3 mb-8">
              <Badge className="bg-accent/20 text-accent border-accent/30 text-sm px-4 py-1.5 font-semibold">
                <Monitor className="w-4 h-4 mr-1.5" /> ОНЛАЙН
              </Badge>
              <Badge className="bg-[hsl(155,60%,40%)]/20 text-[hsl(155,80%,65%)] border-[hsl(155,60%,40%)]/30 text-sm px-4 py-1.5 font-semibold">
                🎉 БЕСПЛАТНО
              </Badge>
            </div>

            <h1 className="text-sm md:text-base text-accent/80 uppercase tracking-widest font-semibold mb-4">
              Вебинар для зубных техников
            </h1>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Лайфхаки в работе{" "}
              <span className="bg-gradient-to-r from-accent via-[hsl(40,90%,65%)] to-accent bg-clip-text text-transparent">
                с цирконом
              </span>
            </h2>

            <p className="text-lg md:text-xl text-white/60 mb-2 font-medium">
              на примере Upcera Functional
            </p>

            <p className="text-base md:text-lg text-white/50 mb-10 max-w-2xl leading-relaxed">
              Как получать стабильный результат при работе с цирконом и&nbsp;избегать типичных ошибок при фрезеровке, окрашивании и&nbsp;финальной эстетике
            </p>

            <div className="flex flex-wrap items-start gap-6 mb-10">
              <div className="flex items-center gap-2 text-white/90">
                <Calendar className="w-5 h-5 text-accent" />
                <span className="font-semibold">26 марта 2026</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Clock className="w-5 h-5 text-accent" />
                <span className="font-semibold">16:00</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Monitor className="w-5 h-5 text-accent" />
                <span className="font-semibold">Онлайн</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button
                onClick={scrollToReg}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6 rounded-xl font-bold shadow-[0_0_40px_hsl(42,82%,52%,0.3)] animate-pulse-soft"
              >
                Зарегистрироваться бесплатно
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-lg px-10 py-6 rounded-xl font-bold backdrop-blur-sm"
              >
                <a href="https://max.ru/u/f9LHodD0cOLbvY06_im8-az-CFsFCzoIyQqfpQeg6Gvg3TenyDo9K2g83po" target="_blank" rel="noopener noreferrer">
                  Связаться с менеджером
                </a>
              </Button>
            </div>
          </div>
        </div>

        <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">О чём этот вебинар?</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Даже опытные техники регулярно сталкиваются с проблемами:
            </p>

            {/* Infographic cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Palette className="h-6 w-6 text-accent" />
                </div>
                <p className="text-foreground font-medium">Оттенок получается не таким</p>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-accent" />
                </div>
                <p className="text-foreground font-medium">Работа выглядит «плоско»</p>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Wrench className="h-6 w-6 text-accent" />
                </div>
                <p className="text-foreground font-medium">Возникает необходимость корректировок или переделок</p>
              </div>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              На вебинаре вы разберёте практические лайфхаки работы с цирконием на примере материала 
              <strong className="text-foreground"> Upcera Functional</strong> и узнаете, как добиться более предсказуемого 
              результата уже на этапе планирования и производства.
            </p>
          </div>

          {/* Learning points */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-6 text-center">Вы узнаете:</h3>
            <div className="space-y-3">
              {learningPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                  <Sparkles className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-foreground">{point}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-center mt-8 italic">
              Это не теоретическая лекция, а разбор реальных рабочих ситуаций, 
              основанных на ежедневной практике зуботехнической лаборатории.
            </p>
          </div>
        </div>
      </section>

      {/* CASES GALLERY */}
      <section className="py-20 bg-secondary overflow-hidden">
        <div className="container mx-auto px-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Примеры работ</h2>
          <p className="text-muted-foreground text-center">Работы, выполненные с использованием Upcera Functional</p>
        </div>
        <CasesSlider />
      </section>

      {/* AUDIENCE */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Кому будет полезен вебинар?</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Практические знания для специалистов, работающих с цирконием
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {audiences.map((a) => (
              <div key={a.title} className="group p-8 rounded-2xl border border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <a.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">{a.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKER */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="shrink-0">
              <div className="w-52 h-52 rounded-2xl overflow-hidden border-4 border-accent/30 shadow-2xl bg-muted">
                <img src="/images/lecturers/viktoria-nikulina.png" alt="Виктория Никулина" className="w-full h-full object-cover object-top" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Спикер вебинара</p>
              <h2 className="text-3xl font-bold mb-3">Виктория Никулина</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Ведущий специалист отдела функциональной эстетики. 
                Керамист со стажем более <strong className="text-foreground">5 лет</strong>. 
                Работает в зуботехнической лаборатории Articon, где ежемесячно выполняется более 200 работ.
              </p>
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Проходила обучение у ведущих техников мира:</p>
                <div className="flex flex-wrap gap-2">
                  {mentors.map((m) => (
                    <Badge key={m} variant="secondary" className="text-xs">{m}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Программа вебинара</h2>
          <p className="text-muted-foreground text-center mb-12">26 марта в 16:00 разберём:</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {programTopics.map((t, i) => (
              <div key={i} className="flex gap-5 p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow">
                <span className="text-3xl shrink-0">{t.icon}</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">{t.title}</h3>
                  <p className="text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMAT */}
      <section className="py-16 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Формат вебинара</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-card border border-border">
                <Sparkles className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="font-medium">Практический разбор</p>
                <p className="text-sm text-muted-foreground mt-1">работы с цирконом Upcera Functional</p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <Target className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="font-medium">Реальные кейсы</p>
                <p className="text-sm text-muted-foreground mt-1">из лабораторной практики</p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <Monitor className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="font-medium">Ответы на вопросы</p>
                <p className="text-sm text-muted-foreground mt-1">участников в прямом эфире</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REGISTRATION FORM */}
      <section id="registration" className="py-20 bg-gradient-to-br from-[hsl(30,20%,8%)] via-[hsl(35,30%,12%)] to-[hsl(40,25%,10%)]">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Присоединяйтесь к вебинару</h2>
              <p className="text-xl text-accent font-semibold">26 марта в 16:00 · Онлайн · Бесплатно</p>
            </div>

            {isSubmitted ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 text-center border border-white/10">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Спасибо за регистрацию!</h3>
                <p className="text-white/70">На почту вам придет ссылка на чат в Телеграм. Добавляйтесь и до встречи 26 марта! (Если письма нет, пожалуйста, проверьте папку &quot;спам&quot;)</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="w-name" className="text-white/90">Имя *</Label>
                  <Input id="w-name" value={form.name} onChange={e => updateField("name", e.target.value)} placeholder="Иван" className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 ${errors.name ? "border-destructive" : ""}`} />
                  {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="w-phone" className="text-white/90">Телефон *</Label>
                  <Input id="w-phone" type="tel" value={form.phone} onChange={e => updateField("phone", e.target.value)} placeholder="+7 (999) 123-45-67" className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 ${errors.phone ? "border-destructive" : ""}`} />
                  {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="w-email" className="text-white/90">Email *</Label>
                  <Input id="w-email" type="email" value={form.email} onChange={e => updateField("email", e.target.value)} placeholder="your@email.com" className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 ${errors.email ? "border-destructive" : ""}`} />
                  {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="w-spec" className="text-white/90">Специализация</Label>
                  <Input id="w-spec" value={form.specialization} onChange={e => updateField("specialization", e.target.value)} placeholder="Зубной техник" className="bg-white/10 border-white/20 text-white placeholder:text-white/40" />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6 font-bold rounded-xl shadow-[0_0_30px_hsl(42,82%,52%,0.3)]">
                  {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  Зарегистрироваться бесплатно
                </Button>
                <p className="text-xs text-white/40 text-center">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a href="/privacy" className="underline hover:text-white/60">политикой обработки данных</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Floating Video Widget */}
      <FloatingVideoWidget video="/videos/zircon-webinar-preview.mp4" />
    </Layout>
  );
}
