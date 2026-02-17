import { ArrowRight, Truck, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import bannerRundeer from "@/assets/banners/banner-rundeer-split.jpg";
import bannerUpcera from "@/assets/banners/banner-upcera-explore.jpg";
import bannerHeygears from "@/assets/banners/banner-heygears.jpg";

const banners = [
  { image: bannerRundeer, alt: "Сканеры Rundeer — Плати частями", href: "/shop/product/rundeer-3ds-v6" },
  { image: bannerUpcera, alt: "Диски Upcera Explore Esthetic", href: "/shop/catalog/zirconia-discs" },
  { image: bannerHeygears, alt: "3D-принтер HeyGears", href: "/shop/catalog/3d-printers" },
];

export function ShopHeroBanner() {
  return (
    <section className="relative py-16 lg:py-24 gradient-accent overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-foreground mb-6">
              CAD/CAM оборудование и материалы для клиник и лабораторий
            </h1>
            <p className="text-xl text-accent-foreground/80 mb-8">
              3D-принтеры, сканеры, фрезерные станки, циркониевые диски и расходные материалы от ведущих мировых производителей. Доставка по России, гарантия, техподдержка.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                <Link to="/shop/catalog/3d-printers">
                  Каталог оборудования
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
                <a href="https://t.me/articon_zakaz" target="_blank" rel="noopener noreferrer">
                  Получить консультацию
                </a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 text-accent-foreground/80">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                <span className="text-sm">Доставка по РФ</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">Гарантия 12 мес.</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="h-5 w-5" />
                <span className="text-sm">Техподдержка 24/7</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <Carousel
              opts={{ align: "center", loop: true }}
              plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
              className="w-full"
            >
              <CarouselContent>
                {banners.map((banner, i) => (
                  <CarouselItem key={i}>
                    <Link to={banner.href} className="block">
                      <div className="aspect-square overflow-hidden rounded-3xl">
                        <img
                          src={banner.image}
                          alt={banner.alt}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading={i === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4" />
              <CarouselNext className="-right-4" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
