import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import BundleRequestForm from "@/components/bundle/BundleRequestForm";
import { Link } from "react-router-dom";
import { CheckCircle2, Users, TrendingUp, Package, ChevronRight, Home, Wrench } from "lucide-react";
import upceraA52 from "@/assets/products/upcera-a52-bundle.png";
import upceraGT1 from "@/assets/products/upcera-gt1-pro-bundle.png";
import upceraR412 from "@/assets/products/upcera-r412-bundle.png";
import bundleBanner from "@/assets/products/upcera-bundle-banner.png";

const bundleItems = [
  {
    image: upceraA52,
    name: "Фрезеровочный станок UPCERA A52",
    description: "Высокоточная 5-осевая система сухого фрезерования для работы с диоксидом циркония, PMMA, PEEK, воском и другими материалами.",
    link: "/shop/product/upcera-a52",
  },
  {
    image: upceraGT1,
    name: "Печь UPCERA GT1 Pro",
    description: "Надёжная система синтеризации циркониевых конструкций с точным температурным контролем и стабильным результатом.",
    link: "/shop/product/upcera-gt1-pro",
  },
  {
    image: upceraR412,
    name: "Пылесос UPCERA R-412",
    description: "Чистота производственного процесса и защита оборудования от пыли при фрезеровании.",
    link: "/shop/product/upcera-r-412",
  },
];

const benefits = [
  "Экономия –8% по сравнению с покупкой оборудования по отдельности",
  "Полная технологическая совместимость всех устройств",
  "Единая сервисная поддержка",
  "Быстрый запуск цифрового производства",
  "Оптимальная настройка процессов «фрезеровка → синтеризация → чистота производства»",
];

const serviceAdvantages = [
  "Пусконаладка и запуск включены в стоимость",
  "Сертифицированные инженеры и техподдержка",
  "Удалённая помощь и сервис после покупки",
  "Лизинг — можно начать без больших вложений",
  "Материалы всегда в наличии под ваши задачи",
  "Работаем на оборудовании, которое продаём",
];

const audience = [
  "Владельцам стоматологических клиник",
  "Руководителям зуботехнических лабораторий",
  "Клиникам на этапе запуска",
  "Лабораториям, переходящим на цифровой протокол",
];

const results = [
  "Предсказуемое качество изделий",
  "Снижение количества переделок",
  "Оптимизация производственного цикла",
  "Повышение маржинальности лаборатории",
  "Быстрый возврат инвестиций за счёт комплексного подхода",
];

const BundleUpceraKit = () => {
  return (
    <Layout>
      <Helmet>
        <title>CAD/CAM-комплект UPCERA для цифровой лаборатории | Артикон</title>
        <meta
          name="description"
          content="CAD/CAM-комплект UPCERA: фрезерный станок A52, печь GT1 Pro, пылесос R-412 со скидкой –8%. Комплексное решение для цифровой зуботехнической лаборатории. Articon, Москва, доставка по России."
        />
        <link rel="canonical" href="https://articon.pro/shop/bundle/upcera-cadcam-kit" />
      </Helmet>

      <nav className="bg-secondary/50 border-b border-border" aria-label="Breadcrumb">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm flex-wrap">
            <li>
              <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Главная</span>
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">Магазин</Link>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              <Link to="/shop/catalog/sale" className="text-muted-foreground hover:text-primary transition-colors">Акции</Link>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              <span className="text-foreground font-medium">Комплект UPCERA</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-br from-[hsl(220,60%,95%)] to-[hsl(220,40%,98%)]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-0 py-8 md:py-12">
            <div className="flex flex-col justify-center">
              <Badge className="w-fit mb-4 bg-accent text-accent-foreground text-sm px-3 py-1">
                –8% при покупке комплектом
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                CAD/CAM-комплект UPCERA
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Комплексное решение для цифровой лаборатории
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mb-6">
                Запустите или модернизируйте цифровую зуботехническую лабораторию на базе оборудования UPCERA
                и получите комплект выгоднее на 8% по сравнению с покупкой каждого устройства отдельно.
              </p>
              <BundleRequestForm triggerClassName="w-fit bg-primary hover:bg-primary/90" />
            </div>
            <div className="flex items-center justify-center p-4">
              <img
                src={bundleBanner}
                alt="CAD/CAM-комплект UPCERA: A52, GT1 Pro, R-412"
                className="w-full max-w-lg object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Bundle items */}
        <h2 className="text-2xl font-bold mb-6 text-foreground">Что входит в комплект</h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {bundleItems.map((item) => (
            <Link key={item.name} to={item.link} className="bg-secondary rounded-xl p-5 text-center group hover:shadow-lg transition-all duration-200">
              <div className="aspect-square mb-4 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </Link>
          ))}
        </div>

        {/* Benefits & audience */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Почему выгодно приобретать комплектом</h2>
            </div>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-5">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Для кого подойдёт</h2>
            </div>
            <ul className="space-y-3">
              {audience.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Results */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Результат для бизнеса</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {results.map((r) => (
              <Badge key={r} variant="secondary" className="text-sm font-normal py-2 px-4">
                {r}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-secondary rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Готовы обсудить комплект?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Свяжитесь с нами, чтобы получить персональное предложение и узнать точную стоимость комплекта с учётом скидки –8%.
          </p>
          <BundleRequestForm triggerClassName="bg-primary hover:bg-primary/90" />
        </div>
      </div>
    </Layout>
  );
};

export default BundleUpceraKit;
