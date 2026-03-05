import { Package, CheckCircle2, Users, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import upceraA52 from "@/assets/products/upcera-a52-bundle.png";
import upceraGT1 from "@/assets/products/upcera-gt1-pro-bundle.png";
import upceraR412 from "@/assets/products/upcera-r412-bundle.png";
import bundleBanner from "@/assets/products/upcera-bundle-banner.png";

const bundleItems = [
  {
    image: upceraA52,
    name: "Фрезеровочный станок UPCERA A52",
    description: "Высокоточная 5-осевая система сухого фрезерования для работы с диоксидом циркония, PMMA, PEEK, воском и другими материалами.",
  },
  {
    image: upceraGT1,
    name: "Печь UPCERA GT1 Pro",
    description: "Надёжная система синтеризации циркониевых конструкций с точным температурным контролем и стабильным результатом.",
  },
  {
    image: upceraR412,
    name: "Пылесос UPCERA R-412",
    description: "Чистота производственного процесса и защита оборудования от пыли при фрезеровании.",
  },
];

const benefits = [
  "Экономия –8% по сравнению с покупкой оборудования по отдельности",
  "Полная технологическая совместимость всех устройств",
  "Единая сервисная поддержка",
  "Быстрый запуск цифрового производства",
  "Оптимальная настройка процессов «фрезеровка → синтеризация → чистота производства»",
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

export function BundleSection() {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <Package className="h-6 w-6 text-primary" />
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Комплекты</h2>
      </div>

      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm">
        {/* Hero banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[hsl(220,60%,95%)] to-[hsl(220,40%,98%)]">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <Badge className="w-fit mb-4 bg-accent text-accent-foreground text-sm px-3 py-1">
                –8% при покупке комплектом
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                CAD/CAM-комплект UPCERA
              </h3>
              <p className="text-lg text-muted-foreground mb-2">
                для цифровой лаборатории
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                Запустите или модернизируйте цифровую зуботехническую лабораторию на базе оборудования UPCERA
                и получите комплект выгоднее на 8% по сравнению с покупкой каждого устройства отдельно.
              </p>
            </div>
            <div className="flex items-center justify-center p-4">
              <img
                src={bundleBanner}
                alt="CAD/CAM-комплект UPCERA: A52, GT1 Pro, R-412"
                className="w-full max-w-md object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Bundle items */}
        <div className="p-6 md:p-10">
          <h4 className="font-semibold text-lg mb-5 text-foreground">Что входит в комплект:</h4>
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {bundleItems.map((item) => (
              <div key={item.name} className="bg-secondary rounded-xl p-4 text-center">
                <div className="aspect-square mb-3 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h5 className="font-semibold text-sm mb-1">{item.name}</h5>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Benefits & audience grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-foreground">Почему выгодно приобретать комплектом</h4>
              </div>
              <ul className="space-y-2">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-foreground">Для кого подойдёт</h4>
              </div>
              <ul className="space-y-2">
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
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h4 className="font-semibold text-foreground">Результат для бизнеса</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {results.map((r) => (
                <Badge key={r} variant="secondary" className="text-xs font-normal py-1.5 px-3">
                  {r}
                </Badge>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={() => window.open("https://t.me/articondental_bot", "_blank")}
            >
              Запросить стоимость комплекта
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
