import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { MobileCatalogDrawer } from "@/components/shop/MobileCatalogDrawer";
import { Helmet } from "react-helmet-async";
import { products } from "@/data/products";

const PaintsGlaze = () => {
  // Фильтруем краски и глазурь из общего каталога
  const paintsProducts = products.filter(
    (p) => p.category === "paints-glazes"
  );

  // Группируем по подкатегориям
  const paints = paintsProducts.filter((p) => p.subcategory === "paints");
  const glazes = paintsProducts.filter((p) => p.subcategory === "glaze");
  const otherProducts = paintsProducts.filter(
    (p) => p.subcategory !== "paints" && p.subcategory !== "glaze"
  );

  return (
    <Layout>
      <Helmet>
        <title>Краски и глазурь для керамики и циркония | Артикон</title>
        <meta
          name="description"
          content="Профессиональные краски и глазури для окрашивания керамики и циркония. Upcera Realism - наборы красок и глазурей для стоматологических реставраций."
        />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Краски и глазурь
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Профессиональные краски и глазури для окрашивания керамики и циркония. 
            Широкий выбор материалов для создания эстетичных стоматологических реставраций.
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
            {/* Paints Section */}
            {paints.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Краски</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paints.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Glazes Section */}
            {glazes.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Глазурь</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {glazes.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Other products */}
            {otherProducts.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Расходные материалы</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {otherProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {paintsProducts.length === 0 && (
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

export default PaintsGlaze;
