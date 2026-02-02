import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { MobileCatalogDrawer } from "@/components/shop/MobileCatalogDrawer";
import { Helmet } from "react-helmet-async";
import { products } from "@/data/products";

const Photopolymers = () => {
  // Фильтруем фотополимеры из общего каталога
  const photopolymers = products.filter(
    (p) => p.category === "3d-print" && p.subcategory === "photopolymers"
  );

  // Группируем по бренду
  const topcoreProducts = photopolymers.filter((p) => p.brand === "TOPCORE");
  const harzLabsProducts = photopolymers.filter((p) => p.brand === "HARZ Labs");
  const otherProducts = photopolymers.filter(
    (p) => p.brand !== "TOPCORE" && p.brand !== "HARZ Labs"
  );

  return (
    <Layout>
      <Helmet>
        <title>Фотополимеры для 3D-печати | Артикон</title>
        <meta 
          name="description" 
          content="Фотополимеры для стоматологической 3D-печати: HARZ Labs, TOPCORE. Смолы для моделей, капп, временных коронок, хирургических шаблонов. Доставка по России." 
        />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Фотополимеры
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Профессиональные фотополимерные смолы для стоматологической 3D-печати. 
            Широкий выбор материалов для моделей, капп, временных реставраций и хирургических шаблонов.
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
            {/* TOPCORE Section */}
            {topcoreProducts.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">TOPCORE</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {topcoreProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* HARZ Labs Section */}
            {harzLabsProducts.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">HARZ Labs</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {harzLabsProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Other products */}
            {otherProducts.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Другие фотополимеры</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {otherProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Photopolymers;
