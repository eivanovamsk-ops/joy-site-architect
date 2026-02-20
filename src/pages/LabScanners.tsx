import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { MobileCatalogDrawer } from "@/components/shop/MobileCatalogDrawer";
import { Helmet } from "react-helmet-async";
import { products } from "@/data/products";

const LabScanners = () => {
  // Фильтруем лабораторные сканеры из общего каталога
  const laboratoryScanners = products.filter(
    (p) => p.category === "3d-scanners" && p.subcategory === "laboratory"
  );

  return (
    <Layout>
      <Helmet>
        <title>Лабораторные 3D-сканеры — купить | Артикон</title>
        <meta
          name="description"
          content="Купить лабораторный 3D-сканер для зуботехнической лаборатории: Medit T310, T510, T710. Высокоточное сканирование гипсовых моделей, оттисков и артикуляторов. Цены, доставка по России."
        />
        <meta
          name="keywords"
          content="лабораторный сканер, лабораторный 3D сканер, купить лабораторный сканер, сканер для зуботехнической лаборатории, Medit T310, Medit T510, Medit T710, сканер для моделей, сканер оттисков"
        />
        <meta property="og:title" content="Лабораторные 3D-сканеры — Артикон" />
        <meta property="og:description" content="Лабораторные сканеры Medit T310, T510, T710. Точное сканирование моделей и оттисков. Доставка по России." />
        <meta property="og:url" content="https://articon.pro/shop/catalog/lab-scanners" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://articon.pro/shop/catalog/lab-scanners" />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Лабораторные 3D-сканеры
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              Лабораторные сканеры Medit для высокоточного сканирования моделей, оттисков 
              и артикуляторов. Идеальное решение для зуботехнических лабораторий.
            </p>
          </div>
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
            {laboratoryScanners.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Сканеры Medit</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {laboratoryScanners.map((product) => (
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

export default LabScanners;
