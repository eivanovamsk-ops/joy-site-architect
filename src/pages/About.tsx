import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Award, Users, Target, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import articonLogo from "@/assets/articon-logo.png";

const milestones = [
  { year: "2008", event: "Основание зуботехнической лаборатории" },
  { year: "2012", event: "Запуск учебного центра для специалистов" },
  { year: "2015", event: "Открытие магазина оборудования" },
  { year: "2018", event: "Внедрение полного цикла CAD/CAM производства" },
  { year: "2020", event: "Запуск направления Ortho — цифровая ортодонтия" },
  { year: "2023", event: "Вхождение в топ-3 лабораторий России" },
];

const values = [
  {
    icon: Target,
    title: "Качество",
    description: "Мы не идём на компромиссы в качестве. Каждая работа проходит строгий контроль.",
  },
  {
    icon: Heart,
    title: "Забота",
    description: "Мы ценим каждого клиента и строим долгосрочные партнёрские отношения.",
  },
  {
    icon: Award,
    title: "Экспертиза",
    description: "Наша команда — признанные эксперты в области цифровой стоматологии.",
  },
  {
    icon: Users,
    title: "Командная работа",
    description: "Более 170 специалистов работают слаженно для достижения лучших результатов.",
  },
];

const About = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://articon.pro",
    "name": "Артикон",
    "alternateName": "Articon",
    "description": "Экосистема цифровых решений для стоматологии: зуботехническая лаборатория, магазин оборудования и учебный центр. Топ-3 лабораторий России с 15+ годами опыта.",
    "url": "https://articon.pro",
    "logo": "https://articon.pro/articon-logo.png",
    "telephone": "+7 (495) 123-45-67",
    "email": "info@articon.pro",
    "foundingDate": "2008",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "170"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Москва",
      "addressCountry": "RU"
    },
    "sameAs": [
      "https://t.me/articon_pro",
      "https://vk.com/articon_pro"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Россия"
    },
    "knowsAbout": [
      "CAD/CAM стоматология",
      "Зуботехническое производство",
      "Цифровая ортодонтия",
      "Циркониевые конструкции",
      "Стоматологическое оборудование"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Услуги и продукция Артикон",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Зуботехническая лаборатория",
          "url": "https://articon.pro/laboratory"
        },
        {
          "@type": "OfferCatalog",
          "name": "Магазин оборудования",
          "url": "https://articon.pro/shop"
        },
        {
          "@type": "OfferCatalog",
          "name": "Учебный центр",
          "url": "https://articon.pro/education"
        }
      ]
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>О компании Артикон — Цифровые решения для стоматологии с 2008 года</title>
        <meta 
          name="description" 
          content="Артикон — экосистема цифровых решений для стоматологии. Зуботехническая лаборатория топ-3 России, магазин оборудования, учебный центр. 15+ лет опыта, 170+ специалистов, 50 000+ работ в год." 
        />
        <meta 
          name="keywords" 
          content="Артикон, зуботехническая лаборатория, CAD/CAM стоматология, стоматологическое оборудование, курсы для стоматологов, цифровая стоматология Москва, Россия" 
        />
        <link rel="canonical" href="https://articon.pro/about" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="О компании Артикон — Цифровые решения для стоматологии" />
        <meta property="og:description" content="Экосистема цифровых решений для стоматологии: лаборатория, магазин, обучение. 15+ лет опыта, топ-3 лабораторий России." />
        <meta property="og:url" content="https://articon.pro/about" />
        <meta property="og:site_name" content="Артикон" />
        <meta property="og:locale" content="ru_RU" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="О компании Артикон" />
        <meta name="twitter:description" content="Экосистема цифровых решений для стоматологии: лаборатория, магазин, обучение." />
        
        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="py-20 lg:py-32 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                О компании <span className="text-gradient-primary">Артикон</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Артикон — это экосистема цифровых решений для стоматологии,
                объединяющая зуботехническую лабораторию полного цикла, магазин
                профессионального оборудования и учебный центр для специалистов.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Мы продаём то, что используем сами. Мы обучаем тем технологиям,
                которые применяем ежедневно. С нами вы получаете полный цикл
                поддержки: от обучения до производства.
              </p>
              <Button asChild className="gradient-primary text-primary-foreground">
                <Link to="/contacts">
                  Связаться с нами
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-center">
                <img
                  src={articonLogo}
                  alt="Логотип компании Артикон — цифровые решения для стоматологии"
                  className="w-2/3 opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { value: ">15 лет", label: "на рынке" },
              { value: "Топ-3", label: "лабораторий России" },
              { value: "170+", label: "сотрудников" },
              { value: "50K+", label: "работ в год" },
              { value: "2000+", label: "обученных" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-background/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Наша миссия
            </h2>
            <div className="bg-secondary rounded-3xl p-8 md:p-12">
              <p className="text-xl md:text-2xl text-center leading-relaxed text-foreground/80">
                "Делать цифровую стоматологию доступной, качественной и удобной
                для каждого специалиста в России. Мы верим, что передовые
                технологии должны быть в руках каждого стоматолога и зубного
                техника."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Наши ценности
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-card border border-border rounded-2xl p-6 hover-lift">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Наша история
          </h2>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-4" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-lg font-medium">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-6">
            Станьте частью экосистемы Артикон
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-background text-primary hover:bg-background/90"
            >
              <Link to="/contacts">Связаться с нами</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/laboratory">Узнать о лаборатории</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
