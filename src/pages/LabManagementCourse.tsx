import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  Coins,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CourseApplicationForm } from "@/components/forms/CourseApplicationForm";
import { Layout } from "@/components/layout/Layout";
import { courses } from "@/data/courses";
import { CourseContactBlock } from "@/components/education/CourseContactBlock";

const course = courses.find((item) => item.id === 24)!;

const audience = [
  "Для владельцев",
  "Для управляющих",
  "Для зубных техников и врачей",
];

const stats = [
  { value: "1 день", label: "интенсивной работы" },
  { value: "20+", label: "инструментов и шаблонов" },
  { value: "15 лет", label: "опыта в готовых решениях" },
  { value: "50+", label: "лабораторий усилили показатели" },
];

const pains = [
  {
    icon: Workflow,
    title: "Нет системы управления",
    description:
      "Хаос в процессах, перегрузка руководителя и постоянное тушение пожаров вместо планомерного роста.",
  },
  {
    icon: Coins,
    title: "Низкая маржинальность",
    description:
      "Лаборатория работает «в ноль», потому что себестоимость и реальные точки прибыли не просчитаны.",
  },
  {
    icon: Users,
    title: "Текучка кадров",
    description:
      "Непонятные роли, слабая адаптация и постоянный поиск персонала тормозят развитие ЗТЛ.",
  },
  {
    icon: ShieldCheck,
    title: "Брак и рекламации",
    description:
      "Нет стандартов и системы контроля качества — клиники теряют доверие, а команда теряет темп.",
  },
];

const results = [
  {
    icon: Coins,
    title: "Финансовая прозрачность",
    description:
      "Контроль доходов и расходов, рост прибыли, понимание маржи и себестоимости по ключевым направлениям.",
  },
  {
    icon: Workflow,
    title: "Управляемые процессы",
    description:
      "Чёткие стандарты работы без авралов, понятные зоны ответственности и логика взаимодействия отделов.",
  },
  {
    icon: Users,
    title: "Сильная команда",
    description:
      "Мотивированный персонал, снижение текучки и понятная модель развития сотрудников внутри лаборатории.",
  },
  {
    icon: TrendingUp,
    title: "Рост клиентов и заказов",
    description:
      "Усиление коммуникации с клиниками, повторные заказы и более понятный вектор масштабирования ЗТЛ.",
  },
];

const problemSlides: {
  src: string;
  name: string;
  subtitle: string;
  intro?: string;
  points?: string[];
  paragraphs?: string[];
  outro?: string;
}[] = [
  {
    src: "/images/courses/course-24-review-piskunov.jpg",
    name: "Пискунов Антон",
    subtitle: "лаборатория в Санкт-Петербурге",
    intro: "Вопросы, которые беспокоят большинство руководителей ЗТЛ:",
    points: [
      "Контроль загрузки: как считать ёмкость техника?",
      "Как бороться с лавинообразной загрузкой и как в целом её контролировать?",
      "Роль и обязанности старшего техника",
      "Поиск и адаптация сотрудников",
      "Роль и обязанности администратора? Чек-лист? ЗП?",
      "Какие сейчас зарплаты сотрудников по рынку",
      "Должностные обязанности сотрудников (от администратора до техника)",
      "Мотивация сотрудников",
      "Маршрут входящей работы в лаборатории",
    ],
    outro: "Все вопросы разобраны, вектор развития задан, алгоритмы все прописаны! Теперь только вперёд 🚀",
  },
  {
    src: "/images/courses/course-24-review-akberov.jpg",
    name: "Юсиф Акберов",
    subtitle: "основатель сети стоматологических клиник Имплант52, Нижний Новгород",
    paragraphs: [
      "Юсиф Акберов — основатель сети стоматологических клиник Имплант52 в Нижнем Новгороде и человек, для которого развитие — не лозунг, а образ жизни.",
      "Сегодня он открывает зуботехническую лабораторию, чтобы полностью закрыть потребности своих клиник, поэтому приехал в Артикон на курс Кравченко Марии — Менеджмент ЗТЛ.",
      "Для нас особенно ценно, когда за знаниями приходят сильные управленцы и практикующие врачи, для которых обучение — инструмент роста.",
      "Рады быть полезными и делиться опытом.",
      "Учитывая, что помимо управления клиниками Юсиф помогает другим руководителям выстраивать эффективные бизнес-модели и повышать стандарты работы, во время встречи мы обсудили формат совместных образовательных программ — для крупных стоматологических проектов, где лечение и производство объединены в единую, выстроенную систему.",
    ],
    outro: "Продолжение точно следует.",
  },
  {
    src: "/images/courses/course-24-review-proskurin.jpg",
    name: "Максим и Юлия",
    subtitle: "г. Владивосток",
    paragraphs: [
      "Мы прошли обучение в компании «Артикон» и хотели бы поделиться своими впечатлениями. Это был индивидуальный курс «Менеджмент зуботехнической лаборатории. Организация успешной ЗТЛ».",
      "Курс был адаптирован под нужды именно нашей ЗТЛ, что позволило глубже понять ключевые аспекты организации работы лаборатории. Проработали управленческие компетенции, оптимизацию процессов и взаимодействия с клиентами.",
      "Структура курса отлично организована. Программа охватывает актуальные и востребованные навыки, что, безусловно, увеличит конкурентоспособность нашей ЗТЛ на рынке труда. Мы получили полезные инструменты, которые уже применяем в нашей работе.",
      "Так же хотелось бы подчеркнуть атмосферу на занятиях — индивидуальный подход создаёт очень комфортную и открытую обстановку, где легко обсуждать идеи и делиться мнением.",
      "Отдельно хотелось бы отметить качество преподавания. Мария — настоящий профессионал, обладающий глубокими знаниями и опытом в своей сфере. Обучение очень насыщенное и полезное — прошли не только теорию, но разобрали и практические кейсы.",
      "Выражаем благодарность за возможность задавать вопросы и тут же получать на них ответы не только в процессе обучения, но и после в режиме онлайн.",
    ],
    outro:
      "В целом, остались очень довольны опытом индивидуального обучения в «Артикон» и без сомнений будем рекомендовать компанию всем, кто хочет развиваться и улучшать свои профессиональные навыки.",
  },
  {
    src: "/images/courses/course-24-review-spb-team.jpg",
    name: "Команда управленцев",
    subtitle: "г. Санкт-Петербург",
    intro: "Ребята приехали на курс по менеджменту с задачами:",
    points: [
      "Увеличить средний чек",
      "Выстроить систему продвижения",
      "Прописать скрипты для администраторов",
      "Выстроить внутренние алгоритмы взаимодействия между отделами",
    ],
    outro: "Все проговорили, записали, взяли на контроль! Верим, что всё реально воплотить в жизнь 💪",
  },
  {
    src: "/images/courses/course-24-review-dento-lux.jpg",
    name: "Андрей и Дарья",
    subtitle: "лаборатория «Денто-Люкс»",
    paragraphs: [
      "В марте 2025 года Андрей и Дарья приехали на курс Менеджмент ЗТЛ с амбициозной целью — открыть собственную лабораторию под нужды клиники. И уже 15 августа состоялось официальное открытие «Денто-Люкс» 🥳",
      "Всего 7 месяцев — и идея стала реальностью! Это пример того, как энергия команды, грамотный менеджмент и правильные инвестиции в оборудование превращают мечту в бизнес.",
      "На открытии лаборатории компанию Артикон представила руководитель по развитию — Кравченко Мария, которая сопровождала проект и помогла подобрать оборудование под ключ.",
      "Мы гордимся тем, что стали частью вашего пути 💪",
    ],
    outro:
      "Желаем «Денто-Люкс» процветания, лёгкости в работе, удовольствия от процесса и уверенного финансового роста!",
  },
  {
    src: "/images/courses/course-24-review-spectrum.jpg",
    name: "Лаборатория «Спектрум»",
    subtitle: "г. Казань",
    paragraphs: [
      "В гостях у Артикон — зуботехническая лаборатория Спектрум (г. Казань). Команда приехала в составе директора и финансового директора, чтобы перенять опыт и выстроить грамотный алгоритм работы внутри ЗТЛ — с прицелом на масштабирование и автоматизацию процессов.",
      "Лаборатория Спектрум специализируется исключительно на ортодонтии, поэтому нам легко было говорить на одном языке — мы тоже когда-то проходили путь становления.",
      "Здорово, когда коллеги так серьёзно подходят к делу: всё прописано, дедлайны утверждены — курс задан! 🚀",
    ],
    outro: "Желаем успехов!",
  },
  {
    src: "/images/courses/course-24-review-martynenko.jpg",
    name: "Евгений",
    subtitle: "директор, врач-имплантолог, хирург и собственник клиники, г. Брянск",
    intro:
      "Нам посчастливилось познакомиться с потрясающими людьми. Один из них — Евгений: он совмещает сразу несколько ролей — директор, врач-имплантолог, хирург и собственник клиники в Брянске. А ещё — руководитель собственной ЗТЛ. 🔥 Цель обучения: выстроить чёткую, прозрачную и эффективную систему управления лабораторией. Что сделали на первом модуле:",
    points: [
      "Разобрали внутренние процессы лицом к лицу",
      "Наметили структуру должностных инструкций для каждого сотрудника",
      "Определили сильные стороны команды техников",
      "Выделили ключевые точки контроля, которые позволят держать качество и сроки на высшем уровне",
    ],
    outro: "Вектор задан 🚀",
  },
];

const modules = [
  {
    number: "01",
    title: "Структура управления зуботехнической лабораторией",
    goal: "Построить чёткую организационную структуру для контроля всех процессов.",
    result:
      "Вы получите готовую схему управления, адаптированную под вашу лабораторию.",
  },
  {
    number: "02",
    title: "Производственные участки и их взаимодействие",
    goal: "Оптимизировать логистику и коммуникацию внутри лаборатории.",
    result:
      "Минимизируете простои и увеличите пропускную способность производства.",
  },
  {
    number: "03",
    title: "Функциональные обязанности руководителей подразделений",
    goal: "Чётко распределить роли и ответственность в управленческой команде.",
    result:
      "Руководители будут работать как единая система, а не как разрозненные цеха.",
  },
  {
    number: "04",
    title: "Система контроля качества зуботехнических работ",
    goal: "Снизить процент брака и рекламаций от клиник.",
    result:
      "Получите работающую систему КК, которая сохраняет деньги и репутацию.",
  },
  {
    number: "05",
    title: "Набор, обучение и удержание персонала",
    goal: "Собрать стабильную и сильную производственную команду.",
    result:
      "У вас будет не «вечный кадровый голод», а понятная кадровая модель роста.",
  },
  {
    number: "06",
    title: "Коммуникация с клиниками",
    goal: "Улучшить взаимодействие с клиентами и увеличить число заказов.",
    result:
      "Клиники станут постоянными партнёрами, а не разовыми заказчиками.",
  },
  {
    number: "07",
    title: "Цифровизация ЗТЛ и оптимизация производства",
    goal: "Внедрить технологии для ускорения работы и снижения затрат.",
    result:
      "Сократите сроки изготовления, уменьшите ошибки и освободите ресурс для роста.",
  },
];

const toolkit = [
  "План изменений под вашу текущую модель лаборатории",
  "Шаблоны заказ-нарядов",
  "Должностные инструкции сотрудников",
  "Финансовые таблицы расчёта себестоимости",
  "Внутренние и внешние сроки производства",
  "Алгоритм ценообразования",
  "Регламенты внутреннего контроля качества",
  "Экскурсия по производственным процессам лаборатории",
];

const reasons = [
  "Обучение на базе действующей цифровой ЗТЛ",
  "Эксперты-практики, а не теоретики",
  "Инструменты, которые реально используются в производстве",
  "Системный подход к развитию бизнеса лаборатории",
  "Сообщество собственников и руководителей ЗТЛ",
];

const testimonials = [
  {
    name: "Максим и Юлия",
    city: "Владивосток",
    quote:
      "Курс был адаптирован под нужды именно нашей ЗТЛ. Мы получили полезные инструменты, которые уже применяем в работе, и по-новому посмотрели на процессы, команду и взаимодействие с клиентами.",
  },
  {
    name: "Артём",
    city: "Архангельск",
    quote:
      "Когда лаборатория растёт, базовых знаний по управлению уже не хватает. После обучения у нас появилась чёткая модель процессов, понимание ролей и конкретные решения для перехода на новый уровень.",
  },
  {
    name: "Сергей",
    city: "Дальний Восток",
    quote:
      "Интересно было увидеть внутреннюю кухню одной из крупнейших ЗТЛ страны. Материал подан просто и по делу, а ответы на вопросы мы получили не только на обучении, но и после него.",
  },
];

const routeLinks = [
  {
    title: "От МЦК Верхние Котлы",
    detail: "~590 метров — 6 минут ходьбы",
    href: "https://yandex.ru/maps/?um=constructor%3A442f99c6df6275987c5859cab9ee67bdc166a3cc90cacccb19fad26b76c17fa8&source=constructorLink",
  },
  {
    title: "Бесплатная городская парковка",
    detail: "Варшавское шоссе, 37 — ~350 метров",
    href: "https://yandex.com/maps/?um=constructor%3A85626b6fae5edde3fd111cdd1e03c04bfc50a71c52f16a3cdf12bc203952f680&source=constructorLink",
  },
  {
    title: "От метро Нагатинская",
    detail: "~970 метров — 11 минут ходьбы",
    href: "https://yandex.ru/maps/?um=constructor%3Ae6e60cdef332cbf2a45c590280538cb70953e7dd0cb17aa60f1db1016e2fb1ec&source=constructorLink",
  },
];

const formatPrice = (price: number) => `${new Intl.NumberFormat("ru-RU").format(price)} ₽`;

const LabManagementCourse = () => {
  const scrollToProgram = () => {
    document.getElementById("management-program")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToForm = () => {
    document.getElementById("management-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Layout>
      <div className="relative -mt-[116px] min-h-screen overflow-hidden bg-foreground text-background lg:-mt-[164px]">
        <div
          className="pointer-events-none absolute inset-0 opacity-100"
          style={{
            background:
              "radial-gradient(circle at 14% 18%, hsl(var(--primary) / 0.28), transparent 26%), radial-gradient(circle at 82% 16%, hsl(var(--accent) / 0.18), transparent 20%), radial-gradient(circle at 75% 55%, hsl(var(--primary) / 0.14), transparent 22%)",
          }}
        />

        <section className="relative overflow-hidden border-b border-background/10 pt-[148px] pb-20 lg:pt-[196px] lg:pb-28">
          <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-background/10 bg-background/5 px-4 py-2 text-sm font-medium text-background/80 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Индивидуальный курс
              </div>

              <div className="mb-5 inline-flex flex-wrap items-center gap-2 text-sm uppercase tracking-[0.28em] text-accent/90">
                <span>Порядок</span>
                <span>→</span>
                <span>Прибыль</span>
                <span>→</span>
                <span>Рост</span>
              </div>

              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">
                Менеджмент
                <span className="block text-accent">зуботехнической</span>
                <span className="block">лаборатории</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-background/72 sm:text-xl">
                За 1 день получите готовую модель управления зуботехнической лабораторией с реальными цифрами,
                рабочими регламентами и планом изменений под вашу текущую структуру.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {audience.map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-background/10 bg-background/5 px-4 py-2 text-sm text-background/78 backdrop-blur-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={scrollToForm}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Записаться на курс
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToProgram}
                  className="border-background/15 bg-background/5 text-background hover:bg-background/10 hover:text-background"
                >
                  Смотреть программу
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-background/10 bg-background/5 p-4 backdrop-blur-sm"
                  >
                    <div className="text-2xl font-semibold text-accent">{item.value}</div>
                    <div className="mt-1 text-sm leading-6 text-background/65">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-primary/30 blur-3xl" />
              <div className="absolute -right-4 bottom-4 h-28 w-28 rounded-full bg-accent/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-background/10 bg-background/5 p-3 shadow-2xl backdrop-blur-sm">
                <img
                  src={course.coverImage}
                  alt={course.title}
                  loading="eager"
                  className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
                />

                <div className="absolute inset-x-7 bottom-7 rounded-[1.5rem] border border-background/10 bg-foreground/80 p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.25em] text-background/45">Формат</div>
                      <div className="mt-2 text-lg font-semibold">Индивидуальный курс</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs uppercase tracking-[0.25em] text-background/45">Стоимость</div>
                      <div className="mt-2 text-2xl font-semibold text-accent">{formatPrice(course.price)}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-background/65">
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-accent" />
                      По запросу
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-accent" />
                      Москва, ARTICON
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-3xl">
              <div className="mb-3 text-sm uppercase tracking-[0.28em] text-accent/85">Диагностика бизнеса</div>
              <h2 className="text-3xl font-semibold tracking-tight text-background sm:text-4xl lg:text-5xl">
                Ваша лаборатория работает не на полную мощность?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-background/68 sm:text-lg">
                На курсе разберём ключевые узкие места, которые мешают владельцам и управляющим переводить ЗТЛ из
                режима постоянной перегрузки в управляемую систему с понятными цифрами.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {pains.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="hover-lift rounded-[1.75rem] border border-background/10 bg-background/5 p-6 backdrop-blur-sm"
                  >
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-background">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-background/65">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative bg-background py-20 text-foreground lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-3xl">
              <div className="mb-3 text-sm uppercase tracking-[0.28em] text-primary">Результат после курса</div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Что изменится в вашем бизнесе
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Вы уходите не с вдохновением, а с конкретной моделью управления: цифры, ответственность, контроль,
                клиенты и стратегия развития лаборатории.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {results.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-[1.75rem] border border-border bg-card p-6 shadow-sm">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>


        <section id="management-program" className="relative py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-4xl">
              <div className="mb-3 text-sm uppercase tracking-[0.28em] text-accent/85">7 ключевых тем</div>
              <h2 className="text-3xl font-semibold tracking-tight text-background sm:text-4xl lg:text-5xl">
                Проведём анализ важных направлений вашего бизнеса
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-background/68 sm:text-lg">
                Вместе разберём действующую или потенциальную модель ЗТЛ, найдём точки роста и соберём управленческий
                каркас, который можно внедрять сразу после курса.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {modules.map((item) => (
                <article
                  key={item.number}
                  className="rounded-[1.75rem] border border-background/10 bg-background/5 p-6 backdrop-blur-sm"
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="text-sm uppercase tracking-[0.32em] text-accent/85">Тема {item.number}</div>
                    <div className="rounded-full border border-background/10 bg-background/5 px-3 py-1 text-xs text-background/55">
                      Индивидуальная адаптация
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-background">{item.title}</h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-background/8 bg-foreground/35 p-4">
                      <div className="mb-2 text-xs uppercase tracking-[0.24em] text-accent/80">Цель</div>
                      <p className="text-sm leading-7 text-background/72">{item.goal}</p>
                    </div>
                    <div className="rounded-2xl border border-background/8 bg-foreground/35 p-4">
                      <div className="mb-2 text-xs uppercase tracking-[0.24em] text-accent/80">Результат</div>
                      <p className="text-sm leading-7 text-background/72">{item.result}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-background py-20 text-foreground lg:py-24">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <div className="mb-3 text-sm uppercase tracking-[0.28em] text-primary">После курса у вас останется</div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Более 20 реальных инструментов для управления ЗТЛ
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                Не абстрактные советы, а конкретные документы, таблицы и алгоритмы, которые можно применять в своей
                лаборатории уже на следующий день.
              </p>

              <div className="mt-8 rounded-[1.75rem] border border-primary/15 bg-primary/5 p-6">
                <div className="mb-2 text-sm uppercase tracking-[0.24em] text-primary">Бонус</div>
                <p className="text-lg font-semibold text-foreground">
                  Специальные условия на покупку оборудования в Articon Trade.
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Подберём не просто технику, а вложения, которые действительно усиливают производственную модель вашей
                  лаборатории.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {toolkit.map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm leading-7 text-foreground">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <article className="rounded-[2rem] border border-background/10 bg-background/5 p-8 backdrop-blur-sm lg:p-12">
              <div className="mb-6 text-sm uppercase tracking-[0.28em] text-accent/85">Курс ведёт</div>

              <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
                <img
                  src="/images/lecturers/kravchenko.webp"
                  alt="Мария Кравченко"
                  className="h-72 w-72 rounded-[2rem] object-cover border-2 border-accent/40 shadow-lg sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem]"
                />

                <div>
                  <h2 className="text-3xl font-semibold tracking-tight text-background sm:text-4xl lg:text-5xl">
                    Кравченко Мария
                  </h2>
                  <p className="mt-3 text-lg text-background/75 lg:text-xl">
                    Эксперт по развитию и масштабированию зуботехнических лабораторий.
                  </p>

                  <div className="mt-6 space-y-4 text-sm leading-7 text-background/68 sm:text-base">
                    <p>
                      Руководитель отдела развития и продвижения ЗТЛ «Артикон Дентал» — одной из крупнейших лабораторий
                      с объёмом производства 50 000+ высококачественных изделий ежегодно и 350+ партнёрами в РФ и СНГ.
                    </p>
                    <p>
                      16 лет в стоматологическом бизнесе. Практик, который ежедневно работает с реальными процессами,
                      цифрами и управлением масштабным производством.
                    </p>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-background/10 bg-foreground/35 p-4 text-center">
                      <div className="text-2xl font-semibold text-accent">16</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-background/50">лет в бизнесе</div>
                    </div>
                    <div className="rounded-2xl border border-background/10 bg-foreground/35 p-4 text-center">
                      <div className="text-2xl font-semibold text-accent">50 000+</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-background/50">изделий в год</div>
                    </div>
                    <div className="rounded-2xl border border-background/10 bg-foreground/35 p-4 text-center">
                      <div className="text-2xl font-semibold text-accent">350+</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-background/50">партнёров</div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="relative py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-3xl">
              <div className="mb-3 text-sm uppercase tracking-[0.28em] text-accent/85">Результаты</div>
              <h2 className="text-3xl font-semibold tracking-tight text-background sm:text-4xl lg:text-5xl">
                Какие проблемы решаем
              </h2>
            </div>

            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {problemSlides.map((slide, i) => (
                  <CarouselItem key={i} className="pl-4">
                    <article className="grid gap-0 overflow-hidden rounded-[2rem] border border-background/10 bg-background/5 backdrop-blur-sm lg:grid-cols-[minmax(0,420px)_1fr]">
                      <div className="aspect-[3/4] w-full overflow-hidden lg:aspect-auto lg:h-full">
                        <img
                          src={slide.src}
                          alt={`${slide.name} — ${slide.subtitle}`}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-6 lg:p-10">
                        <h3 className="text-2xl font-semibold text-background">{slide.name}</h3>
                        <p className="mt-1 text-sm text-background/55">{slide.subtitle}</p>
                        {slide.intro && (
                          <p className="mt-5 text-sm font-medium leading-7 text-background/80 sm:text-base">
                            {slide.intro}
                          </p>
                        )}
                        {slide.points && (
                          <ul className="mt-4 space-y-2.5">
                            {slide.points.map((point) => (
                              <li key={point} className="flex items-start gap-3">
                                <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                                <span className="text-sm leading-6 text-background/68">{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {slide.paragraphs && (
                          <div className="mt-5 space-y-4">
                            {slide.paragraphs.map((paragraph) => (
                              <p key={paragraph} className="text-sm leading-7 text-background/72 sm:text-base">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        )}
                        {slide.outro && (
                          <p className="mt-6 border-t border-background/10 pt-5 text-sm font-medium leading-7 text-background/80 sm:text-base">
                            {slide.outro}
                          </p>
                        )}
                      </div>
                    </article>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-8 flex justify-end gap-3">
                <CarouselPrevious className="static translate-y-0 border-background/20 bg-background/10 text-background hover:bg-background/20 hover:text-background" />
                <CarouselNext className="static translate-y-0 border-background/20 bg-background/10 text-background hover:bg-background/20 hover:text-background" />
              </div>
            </Carousel>
          </div>
        </section>

        <section className="relative py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 text-sm uppercase tracking-[0.28em] text-accent/85">Отзывы участников</div>
                <h2 className="text-3xl font-semibold tracking-tight text-background sm:text-4xl lg:text-5xl">
                  Что говорят руководители ЗТЛ
                </h2>
              </div>
            </div>

            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {testimonials.map((item) => (
                  <CarouselItem key={item.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <article className="flex h-full flex-col rounded-[1.75rem] border border-background/10 bg-background/5 p-6 backdrop-blur-sm">
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <p className="flex-1 text-sm leading-7 text-background/72">{item.quote}</p>
                      <div className="mt-6 border-t border-background/10 pt-4">
                        <div className="text-lg font-semibold text-background">{item.name}</div>
                        <div className="text-sm text-background/52">г. {item.city}</div>
                      </div>
                    </article>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-8 flex justify-end gap-3">
                <CarouselPrevious className="static translate-y-0 border-background/20 bg-background/10 text-background hover:bg-background/20 hover:text-background" />
                <CarouselNext className="static translate-y-0 border-background/20 bg-background/10 text-background hover:bg-background/20 hover:text-background" />
              </div>
            </Carousel>
          </div>
        </section>

        <section className="relative bg-background py-20 text-foreground lg:py-24">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="mb-3 text-sm uppercase tracking-[0.28em] text-primary">Почему выбирают нас</div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Articon Consulting — обучение для тех, кто строит бизнес
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                Курс построен на реальной модели действующей лаборатории. Вы видите не теорию, а решения, которые уже
                работают в производстве и помогают масштабировать ЗТЛ системно.
              </p>

              <div className="mt-8 grid gap-4">
                {reasons.map((item) => (
                  <div key={item} className="rounded-[1.5rem] border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm leading-7 text-foreground">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-sm uppercase tracking-[0.28em] text-primary">Как добраться</div>
              <div className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">MEGAPOLIS HALL</h3>
                    <a
                      href="https://yandex.ru/maps/?text=MEGAPOLIS%20HALL%20Москва%20Варшавское%20шоссе%2033к12"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-base text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                    >
                      Москва, Варшавское шоссе, д33к12
                    </a>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-border">
                  <iframe
                    title="Карта MEGAPOLIS HALL"
                    src="https://yandex.ru/map-widget/v1/?ll=37.628906%2C55.687389&mode=search&text=MEGAPOLIS%20HALL%20Варшавское%20шоссе%2033к12&z=16"
                    width="100%"
                    height="280"
                    frameBorder="0"
                    allowFullScreen
                    className="block"
                  />
                </div>

                <div className="mt-6 grid gap-4">
                  {routeLinks.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-[1.5rem] border border-border bg-background p-5 transition-colors hover:border-primary/30"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-lg font-semibold text-foreground">{item.title}</div>
                          <div className="mt-1 text-sm text-muted-foreground">{item.detail}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="management-form" className="relative py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="overflow-hidden rounded-[2.25rem] border border-background/10 bg-background/5 p-8 backdrop-blur-sm lg:p-10">
              <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-3xl">
                  <div className="mb-3 text-sm uppercase tracking-[0.28em] text-accent/85">Стоимость и запись</div>
                  <h2 className="text-3xl font-semibold tracking-tight text-background sm:text-4xl lg:text-5xl">
                    {formatPrice(course.price)} за индивидуальный курс
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-background/68 sm:text-lg">
                    Адаптируем программу под ваши цели, процессы и текущую модель лаборатории. После обучения у вас будет
                    понятный план внедрения и набор инструментов, которые можно использовать сразу.
                  </p>

                </div>

                <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-end">
                  <CourseApplicationForm
                    courseName={course.title}
                    courseDate={course.date}
                    coursePrice={course.price}
                    buttonLabel="Записаться на курс"
                  />
                  <button
                    type="button"
                    onClick={scrollToProgram}
                    className="inline-flex items-center gap-2 text-sm text-background/62 transition-colors hover:text-background"
                  >
                    Подробная программа
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CourseContactBlock />
      </div>
    </Layout>
  );
};

export default LabManagementCourse;
