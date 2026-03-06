import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import upceraStColor from "@/assets/products/upcera-st-color.jpg";
import upceraExploreFunctional from "@/assets/products/upcera-explore-functional.jpg";
import upceraExploreEsthetic from "@/assets/products/upcera-explore-esthetic.jpg";
import upceraStMl from "@/assets/products/upcera-st-ml.jpg";

const series = [
  {
    image: upceraStColor,
    name: "ST Series — универсальный цирконий",
    strength: "1300 МПа",
    transparency: "43%",
    desc: "Высокопрочный цирконий для жевательной группы и мостовидных конструкций. Совместим с Open CAD/CAM, Zirkonzahn, AG, CEREC.",
    indications: "Коронки, мосты, каркасы, абатменты",
    link: "/shop/variant/upcera-st-color",
  },
  {
    image: upceraExploreFunctional,
    name: "Explore Functional — градиентная структура",
    strength: "1300 МПа",
    transparency: "до 45%",
    desc: "Градиентный цирконий с переходом от опакового дентина к прозрачному режущему краю. Баланс прочности и эстетики.",
    indications: "Полноанатомические коронки, мосты до 14 единиц",
    link: "/shop/variant/upcera-explore-functional",
  },
  {
    image: upceraExploreEsthetic,
    name: "Explore Esthetic — высокая эстетика",
    strength: "1000 МПа",
    transparency: "до 49%",
    desc: "Повышенная светопроницаемость для реставраций фронтальной зоны с естественным градиентом цвета.",
    indications: "Виниры, коронки фронтальной группы",
    link: "/shop/variant/upcera-explore-esthetic",
  },
  {
    image: upceraStMl,
    name: "ST Multilayer — многослойный",
    strength: "1100 МПа",
    transparency: "до 46%",
    desc: "Многослойная структура для полноанатомических реставраций без окрашивания. Эффект натурального зуба.",
    indications: "Полноанатомические реставрации",
    link: "/shop/variant/upcera-st-ml",
  },
];

export function UpceraZirconia() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Циркониевые диски UPCERA
        </h2>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Полный спектр циркония для любых клинических задач — от жевательной группы до высокоэстетических реставраций фронтальной зоны.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {series.map((s) => (
            <div
              key={s.name}
              className="bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-muted/20 flex items-center justify-center p-4">
                <img src={s.image} alt={s.name} className="w-full h-full object-contain" loading="lazy" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">{s.name}</h3>
                <div className="flex gap-2 mb-2">
                  <span className="text-xs bg-accent/15 text-accent-foreground px-2 py-0.5 rounded-full font-medium">
                    {s.strength}
                  </span>
                  <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                    {s.transparency}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">{s.desc}</p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Показания:</span> {s.indications}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild>
            <Link to="/shop/catalog/zirconia-discs">
              Смотреть все циркониевые диски <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
