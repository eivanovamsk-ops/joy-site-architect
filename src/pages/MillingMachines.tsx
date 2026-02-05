import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { MobileCatalogDrawer } from "@/components/shop/MobileCatalogDrawer";
import { Helmet } from "react-helmet-async";
import { products } from "@/data/products";

const MillingMachines = () => {
  // Фильтруем фрезерные станки из общего каталога
  const millingMachines = products.filter(
    (p) => p.category === "milling" && p.subcategory === "machines"
  );

  // Печи
  const furnaces = products.filter(
    (p) => p.category === "milling" && p.subcategory === "furnaces"
  );

  // Компрессоры
  const compressors = products.filter(
    (p) => p.category === "milling" && p.subcategory === "compressors"
  );

  // Пылесосы
  const vacuums = products.filter(
    (p) => p.category === "milling" && p.subcategory === "vacuums"
  );

  return (
    <Layout>
      <Helmet>
        <title>Фрезерные станки CAD/CAM | Артикон</title>
        <meta 
          name="description" 
          content="Фрезерные станки CAD/CAM для зуботехнических лабораторий: UPCERA. Профессиональное оборудование для фрезерования циркония, PMMA, воска. Печи, компрессоры, пылесосы. Доставка по России." 
        />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Фрезерные станки и оборудование
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Профессиональные CAD/CAM фрезерные станки для зуботехнических лабораторий. 
            Высокоточное оборудование для обработки циркония, титана, PMMA и других материалов.
            Печи для синтеризации, компрессоры и пылесосы.
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
            {/* Milling Machines Section */}
            {millingMachines.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-foreground">Станки</h2>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {millingMachines.length} товаров
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {millingMachines.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Furnaces Section */}
            {furnaces.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-foreground">Печи для синтеризации</h2>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {furnaces.length} товаров
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {furnaces.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Compressors Section */}
            {compressors.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-foreground">Компрессоры</h2>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {compressors.length} товаров
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {compressors.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Vacuums Section */}
            {vacuums.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-foreground">Пылесосы</h2>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {vacuums.length} товаров
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {vacuums.map((product) => (
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

export default MillingMachines;
