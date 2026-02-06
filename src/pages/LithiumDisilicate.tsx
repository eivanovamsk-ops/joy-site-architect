import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { MobileCatalogDrawer } from "@/components/shop/MobileCatalogDrawer";
import { Helmet } from "react-helmet-async";
import { products } from "@/data/products";

const LithiumDisilicate = () => {
  const lithiumProducts = products.filter(
    (p) => p.category === "cad-cam-discs" && p.subcategory === "lithium-disilicate"
  );

  return (
    <Layout>
      <Helmet>
        <title>Дисиликат лития для CAD/CAM | Артикон</title>
        <meta
          name="description"
          content="Блоки из дисиликата лития UPCERA UP.CAD для CAD/CAM систем. Высокая эстетика и прочность до 400 МПа. Доставка по России."
        />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Дисиликат лития
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Блоки из дисиликата лития для CAD/CAM систем. Естественная эстетика, 
            высокая прочность и быстрая обработка для передних и жевательных зубов.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <MobileCatalogDrawer />

          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <CatalogSidebar />
          </div>

          <div className="flex-1">
            {lithiumProducts.length > 0 ? (
              <section>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-foreground">Блоки UPCERA UP.CAD</h2>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {lithiumProducts.length} товаров
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {lithiumProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ) : (
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

export default LithiumDisilicate;
