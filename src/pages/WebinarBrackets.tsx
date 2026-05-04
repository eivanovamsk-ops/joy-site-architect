import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { CourseContactBlock } from "@/components/education/CourseContactBlock";
import {
  Calendar, Clock, Monitor, Gift, CheckCircle2, Loader2,
  Stethoscope, GraduationCap, Wrench, ArrowRight, ChevronDown,
} from "lucide-react";

const caseImages = [
  { src: "/images/webinar/case-1.webp", alt: "Кейс до/после — боковая проекция" },
  { src: "/images/webinar/case-2.webp", alt: "Кейс до/после — фронтальная проекция" },
  { src: "/images/webinar/case-3.webp", alt: "Кейс до/после — верхняя челюсть" },
  { src: "/images/webinar/case-4.webp", alt: "Кейс до/после — нижняя челюсть" },
  { src: "/images/webinar/case-5.webp", alt: "Фиксация брекет-системы" },
  { src: "/images/webinar/case-6.webp", alt: "Элайнер на зубах" },
  { src: "/images/webinar/case-7.webp", alt: "Нанесение композита" },
  { src: "/images/webinar/case-8.webp", alt: "Непрямая фиксация — джиг" },
  { src: "/images/webinar/case-9.webp", alt: "Брекеты с эластиками" },
  { src: "/images/webinar/case-10.webp", alt: "3D-модель черепа с брекетами — фронтальная" },
  { src: "/images/webinar/case-11.webp", alt: "3D-модель черепа с брекетами — боковая" },
  { src: "/images/webinar/case-12.webp", alt: "3D-модель — верхняя челюсть с брекетами" },
  { src: "/images/webinar/case-13.webp", alt: "3D-модель — нижняя челюсть с брекетами" },
  { src: "/images/webinar/case-14.webp", alt: "Джиги для непрямой фиксации на модели" },
  { src: "/images/webinar/case-15.webp", alt: "Прозрачные капы с брекетами — верхняя и нижняя челюсть" },
];

const programTopics = [
  { icon: "🔬", title: "Цифровая диагностика", desc: "Зачем объединять КТ и сканы и как это делать правильно" },
  { icon: "🖥️", title: "Открытый показ", desc: "Виртуальное позиционирование брекетов в Maestro 3D" },
  { icon: "🚀", title: "Точка входа", desc: "С чего начать, если вы хотите внедрить непрямую фиксацию в свою практику" },
  { icon: "❓", title: "Ответы на вопросы", desc: "Сможете спросить эксперта о своих сложностях" },
];

const audiences = [
  { icon: Stethoscope, title: "Ординаторам", desc: "Чтобы начать карьеру с правильных инструментов и говорить с коллегами на языке 3D-диагностики." },
  { icon: GraduationCap, title: "Действующим ортодонтам", desc: "Систематизировать знания о цифровых протоколах и интегрировать КТ в позиционирование брекетов." },
  { icon: Wrench, title: "Зубным техникам", desc: "Монетизировать навыки 3D-моделирования в самой востребованной нише — ортодонтии." },
];

export default function WebinarBrackets() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", telegram: "", email: "", specialization: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const scrollToReg = () => document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Введите имя";
    if (!form.phone.trim()) errs.phone = "Введите телефон";
    if (!form.telegram.trim()) errs.telegram = "Введите Telegram";
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
        telegram: form.telegram,
        specialization: form.specialization || null,
        course_name: "Вебинар: Непрямая фиксация брекетов — 5 июня 2026",
        course_date: "2026-06-05",
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
        <title>Вебинар: Непрямая фиксация брекетов — 5 июня | Articon</title>
        <meta name="description" content="Бесплатный онлайн-вебинар по непрямой фиксации брекетов. Разберем топ-5 проблем при позиционировании. 5 июня, 17:00. Регистрация." />
      </Helmet>

      {/* Past event banner */}

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-[hsl(222,30%,7%)] via-[hsl(218,55%,12%)] to-[hsl(270,40%,15%)]">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[hsl(270,60%,40%)]/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ortho/10 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <Badge className="bg-ortho/20 text-[hsl(155,80%,65%)] border-ortho/30 text-sm px-4 py-1.5 font-semibold">
                <Monitor className="w-4 h-4 mr-1.5" /> ОНЛАЙН
              </Badge>
              <Badge className="bg-accent/20 text-accent border-accent/30 text-sm px-4 py-1.5 font-semibold">
                🎉 БЕСПЛАТНО
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Непрямая фиксация{" "}
              <span className="bg-gradient-to-r from-accent via-[hsl(50,90%,65%)] to-accent bg-clip-text text-transparent">
                брекетов
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              С чего начать? Разберем топ-5 проблем при позиционировании и&nbsp;как их решает работа с КТ и Maestro 3D
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
              <div className="flex items-center gap-2 text-white/90">
                <Calendar className="w-5 h-5 text-accent" />
                <span className="font-semibold">5 июня 2026</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Clock className="w-5 h-5 text-accent" />
                <span className="font-semibold">17:00 — 18:00</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Monitor className="w-5 h-5 text-accent" />
                <span className="font-semibold">Онлайн</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
                <a href="https://t.me/articon_education" target="_blank" rel="noopener noreferrer">
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

      {/* ABOUT / AUDIENCE */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Кому подойдет этот вебинар?</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Разберем цифровые протоколы без воды — с конкретикой, кейсами и ответами на вопросы
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {audiences.map((a) => (
              <div key={a.title} className="group p-8 rounded-2xl border border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl gradient-ortho flex items-center justify-center mb-5">
                  <a.icon className="h-7 w-7 text-ortho-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{a.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKER */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="shrink-0">
              <div className="w-52 h-52 rounded-2xl overflow-hidden border-4 border-accent/30 shadow-2xl">
                <img src="/images/webinar/speaker.webp" alt="Зухра Чеккуева" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Спикер вебинара</p>
              <h2 className="text-3xl font-bold mb-3">Зухра Чеккуева</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Практикующий ортодонт, эксперт цифрового протокола. За&nbsp;плечами Зухры более <strong className="text-foreground">2000 смоделированных сетапов</strong> и&nbsp;сертификации ведущих мировых брендов. Она знает о цифровой ортодонтии ВСЁ и&nbsp;готова поделиться базой.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Программа вебинара</h2>
          <p className="text-muted-foreground text-center mb-12">5 июня разберем:</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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

      {/* CASE GALLERY */}
      <section className="py-20 bg-[hsl(222,30%,7%)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Клинические кейсы</h2>
          <p className="text-white/60 text-center mb-12">Реальные результаты цифровой ортодонтии</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {caseImages.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-white/10 hover:border-accent/40 transition-colors group">
                <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BONUS */}
      <section className="py-16 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Gift className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">🎁 Бонус для участников</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Все зарегистрировавшиеся получат чек-лист<br />
              <strong className="text-foreground">«5 критических ошибок при планировании непрямой фиксации»</strong>
            </p>
            <Button onClick={scrollToReg} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
              Получить бонус и зарегистрироваться
            </Button>
          </div>
        </div>
      </section>

      {/* REGISTRATION FORM */}
      <section id="registration" className="py-20 bg-gradient-to-br from-[hsl(222,30%,7%)] via-[hsl(218,55%,12%)] to-[hsl(270,40%,15%)]">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Присоединяйтесь к вебинару</h2>
              <p className="text-xl text-accent font-semibold">5 июня в 17:00 · Онлайн · Бесплатно</p>
            </div>

            {isSubmitted ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 text-center border border-white/10">
                <div className="w-16 h-16 bg-ortho/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-[hsl(155,80%,65%)]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Вы зарегистрированы!</h3>
                <p className="text-white/70">Мы пришлём ссылку на вебинар в Telegram. До встречи 5 июня!</p>
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
                  <Label htmlFor="w-tg" className="text-white/90">Telegram *</Label>
                  <Input id="w-tg" value={form.telegram} onChange={e => updateField("telegram", e.target.value)} placeholder="@username" className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 ${errors.telegram ? "border-destructive" : ""}`} />
                  {errors.telegram && <p className="text-xs text-red-400">{errors.telegram}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="w-email" className="text-white/90">Email</Label>
                  <Input id="w-email" type="email" value={form.email} onChange={e => updateField("email", e.target.value)} placeholder="your@email.com" className="bg-white/10 border-white/20 text-white placeholder:text-white/40" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="w-spec" className="text-white/90">Специализация</Label>
                  <Input id="w-spec" value={form.specialization} onChange={e => updateField("specialization", e.target.value)} placeholder="Ортодонт" className="bg-white/10 border-white/20 text-white placeholder:text-white/40" />
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

      <CourseContactBlock />
    </Layout>
  );
}
