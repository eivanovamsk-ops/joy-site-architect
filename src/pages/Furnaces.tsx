import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { Helmet } from "react-helmet-async";
import { products } from "@/data/products";

const Furnaces = () => {
  // Фильтруем печи из общего каталога
  const sinteringFurnaces = products.filter(
    (p) => p.category === "furnaces" && p.subcategory === "sintering"
  );

  const firingFurnaces = products.filter(
    (p) => p.category === "furnaces" && p.subcategory === "firing"
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
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <CatalogSidebar />
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Sintering Furnaces Section */}
            {sinteringFurnaces.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Печи для синтеризации</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sinteringFurnaces.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Firing Furnaces Section */}
            {firingFurnaces.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Печи для обжига</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {firingFurnaces.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {sinteringFurnaces.length === 0 && firingFurnaces.length === 0 && (
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
