import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { MobileCatalogDrawer } from "@/components/shop/MobileCatalogDrawer";
import { Helmet } from "react-helmet-async";
import { products } from "@/data/products";

const MetalDiscs = () => {
  // Фильтруем металлические диски из общего каталога
  const metalDiscs = products.filter(
    (p) => p.category === "discs" && p.subcategory === "metal"
  );

  // Группируем по бренду
  const cocrProducts = metalDiscs.filter((p) => 
    p.name.toLowerCase().includes("cocr") || p.name.toLowerCase().includes("кобальт")
  );
  const titaniumProducts = metalDiscs.filter((p) => 
    p.name.toLowerCase().includes("titan") || p.name.toLowerCase().includes("титан")
  );
  const otherProducts = metalDiscs.filter((p) => 
    !cocrProducts.includes(p) && !titaniumProducts.includes(p)
  );

  return (
    <Layout>
      <Helmet>
        <title>Металлические диски CoCr/Ti для CAD/CAM | Артикон</title>
        <meta 
          name="description" 
          content="Металлические диски для фрезерования: кобальт-хром (CoCr), титан (Ti). Диски для изготовления каркасов коронок и мостов. Доставка по России." 
        />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Металлические диски (CoCr/Ti)
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Профессиональные металлические диски для CAD/CAM фрезерования. 
            Кобальт-хромовые и титановые заготовки для изготовления каркасов зубных протезов.
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
            {/* CoCr Section */}
            {cocrProducts.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Кобальт-хром (CoCr)</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {cocrProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Titanium Section */}
            {titaniumProducts.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Титан (Ti)</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {titaniumProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Other products or all if no categorization */}
            {(otherProducts.length > 0 || (cocrProducts.length === 0 && titaniumProducts.length === 0)) && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">
                    {cocrProducts.length === 0 && titaniumProducts.length === 0 
                      ? "Все металлические диски" 
                      : "Другие металлические диски"}
                  </h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {(otherProducts.length > 0 ? otherProducts : metalDiscs).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {metalDiscs.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Товары в данной категории скоро появятся
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MetalDiscs;
