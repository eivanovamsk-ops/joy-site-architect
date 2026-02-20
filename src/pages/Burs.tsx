import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { MobileCatalogDrawer } from "@/components/shop/MobileCatalogDrawer";
import { Helmet } from "react-helmet-async";
import { products } from "@/data/products";

const Burs = () => {
  // Фильтруем фрезы из общего каталога (subcategory: "cutters" в products.ts)
  const bursProducts = products.filter(
    (p) => p.category === "milling" && p.subcategory === "cutters"
  );

  return (
    <Layout>
      <Helmet>
        <title>Фрезы для CAD/CAM станков — купить | Артикон</title>
        <meta
          name="description"
          content="Купить фрезы для CAD/CAM станков: imes-icore, UPCERA. Алмазные, торические и шаровые концевые фрезы для обработки циркония, титана, PMMA, PEEK, воска. Фрезы для зуботехнических лабораторий. Доставка по России."
        />
        <meta
          name="keywords"
          content="фрезы для CAD CAM, фрезы для зуботехнической лаборатории, фрезы для циркония, купить фрезы стоматологические, фрезы imes-icore, фрезы UPCERA, алмазные фрезы CAD CAM, торические фрезы, фрезы для PMMA"
        />
        <meta property="og:title" content="Фрезы для CAD/CAM станков — Артикон" />
        <meta property="og:description" content="Фрезы imes-icore и UPCERA для обработки циркония, титана, PMMA. Доставка по России." />
        <meta property="og:url" content="https://articon.pro/shop/catalog/burs" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://articon.pro/shop/catalog/burs" />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Фрезы для CAD/CAM станков
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Профессиональные фрезы для CAD/CAM станков imes-icore. 
            Алмазные, торические, шаровые концевые фрезы для обработки циркония, титана, PMMA, PEEK, воска и других материалов.
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
            {bursProducts.length > 0 ? (
              <section>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-foreground">Все фрезы</h2>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {bursProducts.length} товаров
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {bursProducts.map((product) => (
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

export default Burs;
