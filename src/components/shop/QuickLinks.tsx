import { Link } from "react-router-dom";

import catSale from "@/assets/categories/cat-sale.jpg";
import catLabScanners from "@/assets/categories/cat-lab-scanners.jpg";
import catIntraoralScanners from "@/assets/categories/cat-intraoral-scanners.jpg";
import cat3dPrinters from "@/assets/categories/cat-3d-printers.jpg";
import catPhotopolymers from "@/assets/categories/cat-photopolymers.jpg";
import catMillingMachines from "@/assets/categories/cat-milling-machines.jpg";
import catBurs from "@/assets/categories/cat-burs.jpg";
import catZirconiaDiscs from "@/assets/categories/cat-zirconia-discs.jpg";
import catCadcamDiscs from "@/assets/categories/cat-cadcam-discs.jpg";
import catPaintsGlaze from "@/assets/categories/cat-paints-glaze.jpg";

const categories = [
  { name: "SALE", image: catSale, color: "destructive", slug: "sale" },
  { name: "Лабораторные 3D-сканеры", image: catLabScanners, slug: "lab-scanners" },
  { name: "Интраоральные 3D-сканеры", image: catIntraoralScanners, slug: "intraoral-scanners" },
  { name: "3D-принтеры", image: cat3dPrinters, slug: "3d-printers" },
  { name: "Фотополимеры", image: catPhotopolymers, slug: "photopolymers" },
  { name: "Фрезерные станки", image: catMillingMachines, slug: "milling-machines" },
  { name: "Фрезы", image: catBurs, slug: "burs" },
  { name: "Циркониевые диски", image: catZirconiaDiscs, slug: "zirconia-discs" },
  { name: "Диски CAD/CAM", image: catCadcamDiscs, slug: "cadcam-discs" },
  { name: "Краски и глазурь", image: catPaintsGlaze, slug: "paints-glaze" },
];

export function ShopQuickLinks() {
  return (
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Категории товаров</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/shop/catalog/${category.slug}`}
              className={`relative overflow-hidden rounded-xl group hover-lift ${
                category.color === "destructive"
                  ? "ring-2 ring-destructive"
                  : ""
              }`}
            >
              <div className="aspect-square relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <span
                    className={`text-sm font-semibold leading-tight ${
                      category.color === "destructive"
                        ? "text-red-400"
                        : "text-white"
                    }`}
                  >
                    {category.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
