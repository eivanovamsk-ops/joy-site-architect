import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { MobileCatalogDrawer } from "@/components/shop/MobileCatalogDrawer";
import { Helmet } from "react-helmet-async";
import { products } from "@/data/products";

const Printers3D = () => {
  // Фильтруем товары из общего каталога
  const printers = products.filter(
    (p) => p.category === "3d-print" && p.subcategory === "3d-printers"
  );

  const consumables = products.filter(
    (p) => p.category === "3d-print" && p.subcategory === "consumables"
  );

  const photopolymers = products.filter(
    (p) => p.category === "3d-print" && p.subcategory === "photopolymers"
  );

  return (
    <Layout>
      <Helmet>
        <title>3D-печать: принтеры и фотополимеры | Артикон</title>
        <meta 
          name="description" 
          content="3D-принтеры и фотополимеры для стоматологии: Asiga, Uniformation, HeyGears, HARZ Labs, TOPCORE. Высокоточная печать моделей, капп, хирургических шаблонов." 
        />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            3D-печать
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Профессиональные 3D-принтеры и фотополимерные смолы для стоматологических клиник и лабораторий. 
            Высокоточная печать моделей, капп, хирургических шаблонов и временных реставраций.
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
            {/* Printers Section */}
            {printers.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">3D-принтеры</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {printers.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Consumables Section */}
            {consumables.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Расходные материалы</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {consumables.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Photopolymers Section */}
            {photopolymers.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Фотополимеры</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {photopolymers.map((product) => (
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

export default Printers3D;
