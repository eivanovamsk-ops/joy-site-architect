import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Banner {
  id: number;
  tag: string;
  title: string;
  description: string;
  cta: string;
}

const banners: Banner[] = [
  {
    id: 1,
    tag: "CYBER WEEK DEAL!",
    title: "Скидка 10% на все 3D-принтеры Asiga",
    description: "Используйте код CyberWeek10 при оформлении заказа",
    cta: "Купить сейчас",
  },
];

export function ShopHeroBanner() {
  const banner = banners[0];
  
  return (
    <section className="relative py-16 lg:py-24 gradient-accent overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block px-4 py-2 rounded-full bg-accent-foreground/20 text-accent-foreground text-sm font-medium mb-6">
              {banner.tag}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-foreground mb-6">
              {banner.title}
            </h1>
            <p className="text-xl text-accent-foreground/80 mb-8">
              {banner.description}
            </p>
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
              {banner.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="hidden lg:block">
            <div className="w-full aspect-square rounded-3xl bg-accent-foreground/10 flex items-center justify-center">
              <span className="text-accent-foreground/40 text-lg">
                Изображение продукта
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
