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

  const curingChambers = products.filter(
    (p) => p.category === "3d-print" && p.subcategory === "curing-chambers"
  );

  const photopolymers = products.filter(
    (p) => p.category === "3d-print" && p.subcategory === "photopolymers"
  );

  return (
    <Layout>
      <Helmet>
        <title>3D-принтеры для стоматологии — купить | Артикон</title>
        <meta
          name="description"
          content="Купить 3D-принтер для стоматологии: Asiga, Uniformation GK3, HeyGears A2D. Высокоточная 3D-печать моделей, элайнеров, хирургических шаблонов и временных коронок. Фотополимеры HARZ Labs, TOPCORE. Доставка по России."
        />
        <meta
          name="keywords"
          content="3D принтер стоматологический, купить 3D принтер для стоматологии, 3D принтер для зубных моделей, Asiga 3D принтер, HeyGears стоматологический принтер, Uniformation GK3, 3D печать в стоматологии, фотополимеры для 3D печати, принтер для элайнеров"
        />
        <meta property="og:title" content="3D-принтеры для стоматологии — Артикон" />
        <meta property="og:description" content="Asiga, Uniformation GK3, HeyGears A2D — высокоточная 3D-печать моделей, капп и шаблонов. Фотополимеры HARZ Labs, TOPCORE. Доставка по России." />
        <meta property="og:url" content="https://articon.pro/shop/catalog/3d-printers" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://articon.pro/shop/catalog/3d-printers" />
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
