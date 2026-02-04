import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { MobileCatalogDrawer } from "@/components/shop/MobileCatalogDrawer";
import { Helmet } from "react-helmet-async";
import { products } from "@/data/products";

const ZirconiaDiscs = () => {
  // Фильтруем циркониевые диски из общего каталога (category: cad-cam-discs + zirconia subcategories)
  const zirconiaDiscs = products.filter(
    (p) => p.category === "cad-cam-discs" && 
           (p.subcategory === "zirconia-framework" || 
            p.subcategory === "zirconia-white" || 
            p.subcategory === "zirconia-multilayer")
  );

  // Группируем по подкатегориям
  const frameworkDiscs = zirconiaDiscs.filter((p) => p.subcategory === "zirconia-framework");
  const whiteDiscs = zirconiaDiscs.filter((p) => p.subcategory === "zirconia-white");
  const multilayerDiscs = zirconiaDiscs.filter((p) => p.subcategory === "zirconia-multilayer");

  return (
    <Layout>
      <Helmet>
        <title>Циркониевые диски для CAD/CAM | Артикон</title>
        <meta
          name="description"
          content="Циркониевые диски для CAD/CAM фрезерования: UPCERA ST Color, HT White. Каркасные, белые и мультислойные диски для зуботехнических лабораторий. Доставка по России."
        />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Циркониевые диски
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Профессиональные циркониевые диски для CAD/CAM фрезерования. 
            Каркасные, белые и мультислойные диски от ведущих производителей.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Drawer */}
          <MobileCatalogDrawer />

          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <CatalogSidebar />
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Каркасный (ST Color) Section */}
            {frameworkDiscs.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Каркасный</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {frameworkDiscs.map((product) => (
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
