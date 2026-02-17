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
  {
    image: bannerRundeer,
    alt: "Сканеры Rundeer — Плати частями через Яндекс Сплит",
    href: "/shop/product/rundeer-3ds-v5",
  },
  {
    image: bannerUpcera,
    alt: "Диски Upcera Explore Esthetic",
    href: "/shop/catalog/zirconia-discs",
  },
  {
    image: bannerHeygears,
    alt: "3D-принтер HeyGears — Инновации и точность",
    href: "/shop/catalog/3d-printers",
  },
];

export function BannerSlider() {
  return (
    <section className="py-6 md:py-10">
      <div className="container mx-auto px-4">
        <Carousel
          opts={{ align: "center", loop: true }}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
          className="w-full max-w-3xl mx-auto"
        >
          <CarouselContent>
            {banners.map((banner, i) => (
              <CarouselItem key={i}>
                <Link to={banner.href} className="block">
                  <div className="aspect-square overflow-hidden rounded-2xl">
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
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
      </div>
    </section>
  );
}
