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

  // Все товары категории без разделения на подкатегории

  return (
    <Layout>
      <Helmet>
        <title>Краски и глазурь для циркония и керамики — купить | Артикон</title>
        <meta
          name="description"
          content="Купить краски и глазурь для окрашивания циркония и керамики: Upcera Realism. Наборы красок для зубных реставраций, глазурь для циркониевых коронок. Доставка по России."
        />
        <meta
          name="keywords"
          content="краски для циркония, глазурь для циркония, краски для керамики, купить краски для зубных реставраций, Upcera Realism краски, глазурь для коронок, жидкость для окраски циркония, краски для зубных техников"
        />
        <meta property="og:title" content="Краски и глазурь для циркония — Артикон" />
        <meta property="og:description" content="Upcera Realism — краски и глазурь для профессионального окрашивания циркониевых и керамических реставраций. Доставка по России." />
        <meta property="og:url" content="https://articon.pro/shop/catalog/paints-glaze" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://articon.pro/shop/catalog/paints-glaze" />
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
            {paintsProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paintsProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
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

export default PaintsGlaze;
