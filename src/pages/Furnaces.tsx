import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { MobileCatalogDrawer } from "@/components/shop/MobileCatalogDrawer";
import { Helmet } from "react-helmet-async";
import { products } from "@/data/products";

const Furnaces = () => {
  // Фильтруем печи из общего каталога
  const furnaceProducts = products.filter(
    (p) => p.category === "milling" && p.subcategory === "furnaces"
  );

  return (
    <Layout>
      <Helmet>
        <title>Зуботехнические печи | Артикон</title>
        <meta
          name="description"
          content="Зуботехнические печи для синтеризации циркония и обжига керамики. Профессиональное оборудование Upcera, Nabertherm, Dekema для зуботехнических лабораторий."
        />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Зуботехнические печи
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Профессиональные печи для синтеризации циркония и обжига керамики. 
            Высокоточное оборудование от ведущих мировых производителей.
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
            {furnaceProducts.length > 0 ? (
              <section>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-foreground">Все печи</h2>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {furnaceProducts.length} товаров
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {furnaceProducts.map((product) => (
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

export default Furnaces;
