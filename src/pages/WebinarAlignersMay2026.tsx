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
  Calendar, Clock, Monitor, CheckCircle2, Loader2,
  Stethoscope, GraduationCap, Wrench, ArrowRight, ChevronDown,
  Sparkles, Target, Lightbulb, AlertTriangle, MessageCircle,
} from "lucide-react";

const audiences = [
  {
    icon: Stethoscope,
    title: "Врачи-ортодонты",
    desc: "Вы хотите отказаться от сторонних лабораторий, снизить себестоимость лечения и полностью контролировать процесс перемещения зубов, но не знаете, с какой программы начать.",
  },
  {
    icon: Wrench,
    title: "Зубные техники",
    desc: "Вы стремитесь расширить спектр услуг, освоить перспективное направление моделирования элайнеров и увеличить свой доход.",
  },
  {
    icon: GraduationCap,
    title: "Новички в цифре",
    desc: "У вас нет опыта работы в CAD-программах, и вы боитесь, что 3D-моделирование — это слишком сложно и требует долгих лет обучения.",
  },
];

const programBlocks = [
  {
    icon: Sparkles,
    title: "Блок 1. Введение в цифровую ортодонтию",
    desc: "Актуальные тренды рынка и почему спрос на лечение элайнерами растёт. Как цифровой протокол помогает оптимизировать клинику и почему самостоятельное планирование — ключ к предсказуемому результату.",
  },
  {
    icon: Monitor,
    title: "Блок 2. Знакомство с Maestro 3D Ortho Studio V6",
    desc: "Развеиваем миф о сложности 3D-моделирования. Обзор интуитивного интерфейса, базовые этапы работы — от загрузки сканов до сегментации зубов. Распределение ролей между врачом и техником.",
  },
  {
    icon: Target,
    title: "Блок 3. Практический кейс — «Магия» перемещения зубов",
    desc: "Разбор реального клинического случая в прямом эфире. Основы биомеханики на элайнерах, расстановка аттачментов на резцах и клыках, совмещение сканов с КЛКТ для предсказуемого планирования.",
  },
  {
    icon: AlertTriangle,
    title: "Блок 4. Как избежать типичных ошибок новичков",
    desc: "Топ-3 критических ошибок: игнорирование round tripping, неверная форма аттачментов, отсутствие гиперкоррекции. Базовый чек-лист для проверки любого смоделированного сетапа.",
  },
  {
    icon: MessageCircle,
    title: "Блок 5. Сессия вопросов и ответов",
    desc: "Живое общение со спикером. Любые профессиональные вопросы в чате: от технических требований к компьютеру до нюансов приобретения лицензии Maestro 3D.",
  },
];

const heroBullets = [
  "Разбор реального клинического кейса в прямом эфире",
  "Понятный интерфейс Maestro 3D V6 без сложной терминологии",
  "Секреты биомеханики и правильной расстановки аттачментов",
];

const results = [
  "Чёткое понимание процесса создания элайнеров — от сканирования до печати",
  "Уверенность в работе со сложными интерфейсами CAD-программ",
  "Готовый алгоритм первых шагов в Maestro 3D Ortho Studio V6",
  "Базовый чек-лист для проверки смоделированного сетапа",
];

export default function WebinarAlignersMay2026() {
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
    if (!form.email.trim()) errs.email = "Введите email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = "Некорректный email";
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
        course_name: "Вебинар: Элайнеры в Maestro 3D — 29 мая 2026",
        course_date: "2026-05-29",
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
        <title>Бесплатный вебинар: Элайнеры в Maestro 3D для ортодонтов</title>
        <meta name="description" content="Узнайте, как начать планировать лечение на элайнерах в Maestro 3D V6. Бесплатный вебинар для врачей-ортодонтов и зубных техников. Регистрируйтесь!" />
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-[hsl(222,30%,7%)] via-[hsl(218,55%,12%)] to-[hsl(270,40%,15%)]">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[hsl(270,60%,40%)]/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ortho/10 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <Badge className="bg-ortho/20 text-[hsl(155,80%,65%)] border-ortho/30 text-sm px-4 py-1.5 font-semibold">
                <Monitor className="w-4 h-4 mr-1.5" /> ОНЛАЙН
              </Badge>
              <Badge className="bg-accent/20 text-accent border-accent/30 text-sm px-4 py-1.5 font-semibold">
                🎉 БЕСПЛАТНО
              </Badge>
            </div>

            <p className="text-sm md:text-base font-semibold text-accent uppercase tracking-wider mb-5">
              Бесплатный онлайн-вебинар Артикон
            </p>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Первые шаги в цифровой ортодонтии: как начать планировать лечение на{" "}
              <span className="bg-gradient-to-r from-accent via-[hsl(50,90%,65%)] to-accent bg-clip-text text-transparent">
                элайнерах в Maestro 3D
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Пошаговый алгоритм для врачей-ортодонтов и зубных техников. Избавьтесь от страха перед CAD-программами и научитесь создавать эффективные сетапы самостоятельно.
            </p>

            <ul className="text-left max-w-2xl mx-auto space-y-2 mb-10">
              {heroBullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-white/85">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
              <div className="flex items-center gap-2 text-white/90">
                <Calendar className="w-5 h-5 text-accent" />
                <span className="font-semibold">29 мая 2026</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Clock className="w-5 h-5 text-accent" />
                <span className="font-semibold">19:00 МСК</span>
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
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6 rounded-xl font-bold shadow-[0_0_40px_hsl(42,82%,52%,0.3)]"
              >
                Занять место на вебинаре бесплатно
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

      {/* AUDIENCE */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Кому будет максимально полезен этот эфир?</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Вебинар создан для специалистов, которые хотят идти в ногу со временем и внедрить современные цифровые протоколы в свою ежедневную практику.
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

      {/* PROGRAM */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Что вы узнаете за 1 час прямого эфира?</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Насыщенная программа без «воды»: теория сразу подкрепляется практической демонстрацией в Maestro 3D Ortho Studio V6.
          </p>

          <div className="max-w-4xl mx-auto space-y-5">
            {programBlocks.map((b, i) => (
              <div key={i} className="flex gap-5 p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center">
                  <b.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1.5">{b.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              onClick={scrollToReg}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6 rounded-xl font-bold"
            >
              Хочу узнать все секреты Maestro 3D
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* SPEAKER */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="shrink-0">
              <div className="w-52 h-52 rounded-2xl overflow-hidden border-4 border-accent/30 shadow-2xl">
                <img src="/images/webinar/speaker.png" alt="Зухра Чеккуева — практикующий ортодонт" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Спикер вебинара</p>
              <h2 className="text-3xl font-bold mb-2">Зухра Чеккуева</h2>
              <p className="text-base text-muted-foreground italic mb-4">
                Практикующий врач-ортодонт, эксперт в области цифрового моделирования элайнеров.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                В портфолио — более <strong className="text-foreground">2000 успешно смоделированных сетапов</strong>. Работала с продукцией ведущих мировых компаний: Flexiligner, Ormco и Spark. В практике использует исключительно цифровой протокол лечения пациентов.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Lightbulb className="w-12 h-12 text-accent mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Результаты участия в вебинаре</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                После эфира вы получите чёткое понимание процесса создания элайнеров — от сканирования до печати — и убедитесь, что Maestro 3D V6 доступна для освоения каждому специалисту.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {results.map((r) => (
                <div key={r} className="flex items-start gap-3 p-5 rounded-xl border border-border bg-card">
                  <CheckCircle2 className="h-6 w-6 text-ortho shrink-0 mt-0.5" />
                  <span className="text-foreground leading-relaxed">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REGISTRATION FORM */}
      <section id="registration" className="py-20 bg-gradient-to-br from-[hsl(222,30%,7%)] via-[hsl(218,55%,12%)] to-[hsl(270,40%,15%)]">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Сделайте первый шаг к независимости в ортодонтии</h2>
              <p className="text-xl text-accent font-semibold mt-3">29 мая в 19:00 · Онлайн · Бесплатно</p>
            </div>

            {isSubmitted ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 text-center border border-white/10">
                <div className="w-16 h-16 bg-ortho/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-[hsl(155,80%,65%)]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Вы зарегистрированы!</h3>
                <p className="text-white/70">Мы пришлём ссылку на вебинар на вашу почту. До встречи 29 мая!</p>
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
                  <Label htmlFor="w-tg" className="text-white/90">Telegram</Label>
                  <Input id="w-tg" value={form.telegram} onChange={e => updateField("telegram", e.target.value)} placeholder="@username" className="bg-white/10 border-white/20 text-white placeholder:text-white/40" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="w-spec" className="text-white/90">Специализация</Label>
                  <Input id="w-spec" value={form.specialization} onChange={e => updateField("specialization", e.target.value)} placeholder="Ортодонт" className="bg-white/10 border-white/20 text-white placeholder:text-white/40" />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6 font-bold rounded-xl shadow-[0_0_30px_hsl(42,82%,52%,0.3)]">
                  {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  Зарегистрироваться
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
