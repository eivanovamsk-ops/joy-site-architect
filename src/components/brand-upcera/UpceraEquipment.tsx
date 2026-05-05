import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import upceraA52 from "@/assets/products/upcera-a52-1.jpg";
import upceraGt1 from "@/assets/products/upcera-gt1-pro-new.webp";
import upceraB52 from "@/assets/products/upcera-b52.png";

const equipment = [
  {
    image: upceraA52,
    name: "Фрезерный станок UPCERA A52",
    desc: "5-осевая система сухого фрезерования для циркония, PMMA, PEEK — до 12 инструментов, скорость до 80 000 об/мин, точность 0,01 мм.",
    specs: ["5 осей", "12 инструментов", "80 000 об/мин"],
    link: "/shop/product/upcera-a52",
  },
  {
    image: upceraGt1,
    name: "Печь для синтеризации UPCERA GT1 Pro",
    desc: "Интеллектуальная PID-система контроля температуры до 1500 °C. Функция памяти при отключении питания, нагревательные элементы MoSi₂.",
    specs: ["до 1500 °C", "PID-контроль", "MoSi₂ элементы"],
    link: "/shop/product/upcera-gt1-pro",
  },
  {
    image: upceraB52,
    name: "Фрезерный станок UPCERA B52",
    desc: "Компактный 5-осевой станок мокрого фрезерования для стеклокерамики, титана и CoCr. Промышленная точность в настольном формате.",
    specs: ["5 осей", "Мокрая фрезеровка", "Ti / CoCr"],
    link: "/shop/product/upcera-b52",
  },
];

export function UpceraEquipment() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Оборудование UPCERA для цифровой лаборатории
        </h2>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Фрезерные станки и печи для синтеризации, обеспечивающие полный производственный цикл.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {equipment.map((item) => (
            <div
              key={item.name}
              className="bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="aspect-[4/3] bg-muted/30 flex items-center justify-center p-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-foreground mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.specs.map((s) => (
                    <span key={s} className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to={item.link}>
                    Подробнее <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
