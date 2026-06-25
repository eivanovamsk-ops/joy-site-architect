import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { sendCourseApplicationEmails, submitCourseApplication } from "@/lib/courseApplications";
import { CourseContactBlock } from "@/components/education/CourseContactBlock";
import {
  Calendar, Clock, Monitor, CheckCircle2, Loader2,
  Wrench, ArrowRight, ChevronDown, Lightbulb,
  Layers, Cpu, ScanLine, Sliders, Settings2, AlertTriangle,
  FlaskConical, ListChecks, Users, Building2,
} from "lucide-react";

const printerHeroImage = "/images/webinar/heygears-a20-hero.jpg";

const audiences = [
  { icon: Wrench, title: "Зубные техники" },
  { icon: Cpu, title: "Операторы 3D-печати" },
  { icon: ScanLine, title: "CAD/CAM-специалисты" },
  { icon: Building2, title: "Руководители и владельцы лабораторий" },
  { icon: Users, title: "Все, кто работает с фотополимерной печатью" },
];

const programBlocks = [
  { icon: AlertTriangle, title: "Почему принтер начинает терять точность", desc: "Разберём основные причины нестабильной посадки изделий и покажем, почему источник проблемы редко находится только в одном параметре." },
  { icon: Layers, title: "Как оптика влияет на качество и точность печати", desc: "Поговорим о равномерности засветки, состоянии LCD-матрицы, чистоте оптической системы и их влиянии на итоговую геометрию изделий." },
  { icon: ScanLine, title: "Как быстро проверить состояние экрана", desc: "Покажем простой способ диагностики LCD-экрана, который позволяет выявить потенциальные проблемы ещё до начала печати." },
  { icon: Settings2, title: "Какие механические факторы влияют на результат", desc: "Разберём влияние геометрии платформы, состояния оси Z, люфтов и микроперекосов на точность печати и стабильность первого слоя." },
  { icon: Sliders, title: "Как правильно выполнять калибровку платформы", desc: "Объясним, почему эффективная калибровка — это не механический прижим платформы к плёнке, а поиск корректной рабочей плоскости." },
  { icon: AlertTriangle, title: "Какие ошибки чаще всего приводят к браку", desc: "Рассмотрим распространённые ошибки настройки и обслуживания оборудования, которые незаметно ухудшают качество печати и увеличивают процент перепечаток." },
  { icon: FlaskConical, title: "Как свойства материала влияют на посадку изделий", desc: "Разберём влияние усадки, вязкости, температуры и условий эксплуатации смолы на стабильность результата." },
  { icon: ListChecks, title: "Как выстроить системный алгоритм диагностики", desc: "Вы получите понятную последовательность проверки оборудования, которая поможет быстрее находить источник проблемы и сократить количество пробных запусков." },
];

const heroBullets = [
  "Системный алгоритм диагностики DLP/LCD/MSLA-принтера",
  "Простой способ проверки LCD-экрана до начала печати",
  "Реальные причины брака — без хаотичных экспериментов с экспозицией",
];

const results = [
  "Быстрее находить причины неточной посадки изделий",
  "Понимать, где именно теряется точность печати",
  "Исключить распространённые ошибки калибровки и обслуживания",
  "Снизить количество брака и повторных печатей",
  "Получать более стабильный и предсказуемый результат",
];

export default function WebinarPrinter3DJuly2026() {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
      const courseName = "Вебинар: Идеальная посадка без перепечаток — 18 июня 2026";
      const courseDate = "2026-06-18";
      const payload = {
        userId: user?.id || null,
        name: form.name,
        email: form.email,
        phone: form.phone,
        telegram: form.telegram,
        specialization: form.specialization || null,
        courseName,
        courseDate,
      };
      const { applicationId, inserted } = await submitCourseApplication(payload);
      if (inserted) sendCourseApplicationEmails({ ...payload, applicationId });

      navigate("/education/webinar/printer-3d-june-2026/thank-you", {
        state: {
          webinarName: "Вебинар: Идеальная посадка без перепечаток",
          webinarDate: "18 июня",
        },
      });
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
        <title>Вебинар: Идеальная посадка изделий без перепечаток — 18 июня 2026</title>
        <meta name="description" content="Бесплатный онлайн-вебинар 18 июня 2026 для специалистов 3D-печати. Системная диагностика DLP/LCD/MSLA-принтера: оптика, механика, калибровка, материалы. Зарегистрируйтесь!" />
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[hsl(222,40%,6%)] via-[hsl(200,60%,10%)] to-[hsl(180,70%,12%)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-80 h-80 bg-cyan-400/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-[28rem] h-[28rem] bg-emerald-400/20 rounded-full blur-[140px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[160px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge className="bg-white/10 text-white border-white/20 text-sm px-4 py-1.5 font-semibold">
                  ⏱ Вебинар уже прошёл
                </Badge>
                <Badge className="bg-white/10 text-white border-white/20 text-sm px-4 py-1.5 font-semibold">
                  Онлайн-вебинар
                </Badge>
              </div>

              <p className="text-sm md:text-base font-semibold text-cyan-300 uppercase tracking-wider mb-4">
                Учебный центр Артикон
              </p>

              <h1 className="text-3xl md:text-5xl lg:text-[3.4rem] font-bold text-white mb-6 leading-[1.1]">
                Идеальная посадка{" "}
                <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-300 bg-clip-text text-transparent">
                  без перепечаток
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                Как выявить и устранить скрытые причины потери точности в DLP/LCD/MSLA-печати — системный алгоритм диагностики 3D-принтера для стоматологии.
              </p>

              <ul className="space-y-2.5 mb-8">
                {heroBullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-white/90">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-5 mb-8">
                <div className="flex items-center gap-2 text-white/90"><Calendar className="w-5 h-5 text-cyan-300" /><span className="font-semibold">18 июня 2026</span></div>
                <div className="flex items-center gap-2 text-white/90"><Clock className="w-5 h-5 text-cyan-300" /><span className="font-semibold">17:00 МСК</span></div>
                <div className="flex items-center gap-2 text-white/90"><Monitor className="w-5 h-5 text-cyan-300" /><span className="font-semibold">Онлайн</span></div>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button
                  onClick={scrollToReg}
                  size="lg"
                  className="bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-900 text-lg px-10 py-6 rounded-xl font-bold shadow-[0_0_40px_rgba(52,211,153,0.4)]"
                >
                  Занять место бесплатно
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-10 bg-gradient-to-tr from-emerald-400/25 via-cyan-400/20 to-sky-500/20 rounded-full blur-3xl" />
              <div className="relative aspect-[1568/1003] w-full overflow-hidden rounded-3xl bg-white/5 drop-shadow-[0_40px_80px_rgba(34,211,238,0.35)]">
                <img
                  src={printerHeroImage}
                  alt="3D-принтер для стоматологии"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* INTRO */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-5">Каждая перепечатка — это потерянное время, материалы и сроки</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Но проблема не всегда в смоле, профиле печати или CAD-модели. Если изделия периодически не садятся, появляются перекосы, отрывы или нестабильный результат на одной и той же настройке — причина чаще всего скрыта в самой системе печати.
            </p>
            <p className="text-lg text-foreground font-semibold mt-5 leading-relaxed">
              На вебинаре разберём, как последовательно диагностировать DLP/LCD/MSLA-принтер и находить реальные причины потери точности — без бесконечных экспериментов с экспозицией и случайных изменений настроек.
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAM */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Что вы узнаете на вебинаре</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            8 практических блоков: от диагностики оптики и LCD до системного алгоритма проверки оборудования.
          </p>

          <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {programBlocks.map((b, i) => (
              <div key={i} className="group p-6 rounded-2xl border border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/15 to-cyan-500/15 flex items-center justify-center">
                    <b.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1.5">{b.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{b.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={scrollToReg}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white text-lg px-10 py-6 rounded-xl font-bold"
            >
              Зарегистрироваться бесплатно
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Для кого этот вебинар</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Особенно полезен тем, кто сталкивается с нестабильной посадкой изделий, перекосами по платформе, отрывами моделей и регулярными перепечатками.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {audiences.map((a) => (
                <div key={a.title} className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-emerald-400/40 transition-colors">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/15 to-cyan-500/15 flex items-center justify-center">
                    <a.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="font-semibold">{a.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Lightbulb className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">После вебинара вы сможете</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {results.map((r) => (
                <div key={r} className="flex items-start gap-3 p-5 rounded-xl border border-border bg-card">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-foreground leading-relaxed">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REGISTRATION FORM */}
      <section id="registration" className="py-20 bg-gradient-to-br from-[hsl(222,40%,6%)] via-[hsl(200,60%,10%)] to-[hsl(180,70%,12%)]">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Регистрация на вебинар</h2>
              <p className="text-xl text-cyan-300 font-semibold mt-3">18 июня в 17:00 · Онлайн · Бесплатно</p>
              <p className="text-white/60 mt-3 text-sm">Количество мест ограничено. Получите практический алгоритм диагностики 3D-принтера.</p>
            </div>

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
                <Input id="w-spec" value={form.specialization} onChange={e => updateField("specialization", e.target.value)} placeholder="Зубной техник / оператор 3D-печати" className="bg-white/10 border-white/20 text-white placeholder:text-white/40" />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-900 text-lg py-6 font-bold rounded-xl shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Зарегистрироваться
              </Button>
              <p className="text-xs text-white/40 text-center">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a href="/privacy" className="underline hover:text-white/60">политикой обработки данных</a>
              </p>
            </form>
          </div>
        </div>
      </section>

      <CourseContactBlock />
    </Layout>
  );
}
