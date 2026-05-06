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

import bannerCadcamKit from "@/assets/banners/shop-upcera-cadcam.webp";
import bannerShining from "@/assets/banners/shop-shining-3d.webp";
import bannerRundeerV6 from "@/assets/banners/shop-rundeer-v6.webp";
import bannerGT1Pro from "@/assets/banners/shop-upcera-gt1-pro.webp";
import bannerR412 from "@/assets/banners/shop-upcera-r412.webp";
import bannerA52 from "@/assets/banners/shop-upcera-a52.webp";
import bannerAevra from "@/assets/banners/shop-aevra-discs.webp";
import bannerHeygearsA2D from "@/assets/banners/shop-heygears-a2d.webp";

const banners = [
  { image: bannerCadcamKit, alt: "CAD/CAM-комплект UPCERA — комплексное решение со скидкой 8%", href: "/shop/bundle/upcera-cadcam-kit" },
  { image: bannerA52, alt: "5-осевой фрезерный станок UPCERA A52", href: "/shop/product/upcera-a52" },
  
  { image: bannerAevra, alt: "Циркониевые диски Aevra — прозрачность до 50%", href: "/shop/catalog/zirconia-discs" },
  { image: bannerHeygearsA2D, alt: "3D-принтер HeyGears UltraCraft A2D HD — точность ±26,8 мкм", href: "/shop/catalog/3d-printers" },
  { image: bannerRundeerV6, alt: "Интраоральный сканер Rundeer 3DS V6 — точность <10 мкм", href: "/shop/product/rundeer-3ds-v6" },
  { image: bannerShining, alt: "Лабораторный сканер SHINING 3D AutoScan-DS-EX Pro(H)", href: "/shop/catalog/lab-scanners" },
  { image: bannerR412, alt: "Пылесос UPCERA R-412 для фрезерных станков сухой обработки", href: "/shop/catalog/vacuums" },
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
