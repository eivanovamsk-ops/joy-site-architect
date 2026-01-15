import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { Helmet } from "react-helmet-async";
import { products } from "@/data/products";

const ZirconiaDiscs = () => {
  // Фильтруем циркониевые диски из общего каталога
  const zirconiaDiscs = products.filter(
    (p) => p.category === "zircon-discs"
  );

  // Группируем по подкатегориям
  const multilayerDiscs = zirconiaDiscs.filter((p) => p.subcategory === "multilayer");
  const whiteDiscs = zirconiaDiscs.filter((p) => p.subcategory === "white");
  const coloredDiscs = zirconiaDiscs.filter((p) => p.subcategory === "colored");
  const otherDiscs = zirconiaDiscs.filter(
    (p) => !["multilayer", "white", "colored"].includes(p.subcategory || "")
  );

  return (
    <Layout>
      <Helmet>
        <title>Циркониевые диски для CAD/CAM | Артикон</title>
        <meta
          name="description"
          content="Циркониевые диски для CAD/CAM фрезерования: UPCERA, Dental Direkt. Мультислойные, белые и окрашенные диски для зуботехнических лабораторий. Доставка по России."
        />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Циркониевые диски
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Профессиональные циркониевые диски для CAD/CAM фрезерования. 
            Мультислойные, белые и окрашенные диски от ведущих производителей.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <CatalogSidebar />
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Multilayer Section */}
            {multilayerDiscs.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Мультилеер</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {multilayerDiscs.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* White Section */}
            {whiteDiscs.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Белый</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {whiteDiscs.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Colored Section */}
            {coloredDiscs.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Окрашенный</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {coloredDiscs.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Other discs */}
            {otherDiscs.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Другие диски</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {otherDiscs.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {zirconiaDiscs.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                Товары в данной категории временно недоступны
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ZirconiaDiscs;
