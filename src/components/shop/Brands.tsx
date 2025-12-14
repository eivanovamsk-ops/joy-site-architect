const brands = [
  "Runyes",
  "Medit",
  "Asiga",
  "Upcera",
  "HeyGears",
  "CORiTEC",
  "imes-icore",
  "TopCore",
  "Uniformation",
  "Shining 3D",
];

export function ShopBrands() {
  return (
    <section className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-muted-foreground text-sm uppercase tracking-widest mb-8">
          Наши партнёры и бренды
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="text-lg font-semibold text-muted-foreground/60 hover:text-foreground transition-colors cursor-pointer"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
