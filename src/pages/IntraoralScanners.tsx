import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { MobileCatalogDrawer } from "@/components/shop/MobileCatalogDrawer";
import { Helmet } from "react-helmet-async";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const IntraoralScanners = () => {
  // Фильтруем товары из общего каталога
  const intraoralScanners = products.filter(
    (p) => p.category === "3d-scanners" && p.subcategory === "clinical"
  );

  return (
    <Layout>
      <Helmet>
        <title>Интраоральные сканеры | Артикон</title>
        <meta 
          name="description" 
          content="Интраоральные 3D сканеры для стоматологии. Runyes 3DS, Medit T310, T510, T710. Высокое качество сканирования, удобство использования. Доставка по России." 
        />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Интраоральные 3D-сканеры
              </h1>
              <p className="text-muted-foreground max-w-3xl">
                Интраоральные сканеры для клинического применения — точная цифровая диагностика 
                и планирование лечения. Лабораторные сканеры для высокоточного сканирования 
                моделей и оттисков.
              </p>
            </div>
            <Button
              asChild
              className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <a href="https://t.me/proscanertut" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                Нужна консультация специалиста
              </a>
            </Button>
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
            {/* Intraoral Scanners Section */}
            {intraoralScanners.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Клинические (интраоральные)</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {intraoralScanners.map((product) => (
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

export default IntraoralScanners;
