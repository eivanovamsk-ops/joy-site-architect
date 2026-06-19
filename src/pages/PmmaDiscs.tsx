import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { VariantProductCard } from "@/components/shop/VariantProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { MobileCatalogDrawer } from "@/components/shop/MobileCatalogDrawer";
import { Helmet } from "react-helmet-async";
import { products } from "@/data/products";
import { variantProducts } from "@/data/variantProducts";

const PmmaDiscs = () => {
  const pmmaDiscs = products.filter(
    (p) => p.category === "cad-cam-discs" && p.subcategory === "pmma-discs"
  );

  const pmmaVariants = variantProducts.filter(
    (p) => p.category === "cad-cam-discs" && p.subcategory === "pmma-discs"
  );
  const upceraVariants = pmmaVariants.filter((p) => p.brand === "Upcera");
  const limaVariants = pmmaVariants.filter((p) => p.brand === "Lima");
  const articonVariants = pmmaVariants.filter((p) => p.brand === "Articon");
  const stDentalVariants = pmmaVariants.filter((p) => p.brand === "ST Dental");
  const dentalDirektVariants = pmmaVariants.filter((p) => p.brand === "Dental Direkt");
  const dentalDirektProducts = pmmaDiscs.filter((p) => p.brand === "Dental Direkt");
  const otherProducts = pmmaDiscs.filter(
    (p) => p.brand !== "Dental Direkt"
  );

  return (
    <Layout>
      <Helmet>
        <title>Диски PMMA (ПММА) для CAD/CAM — купить | Артикон</title>
        <meta
          name="description"
          content="Купить диски PMMA (ПММА) для фрезерования временных протезов и коронок. Lima, Dental Direkt. Полиметилакрилат для CAD/CAM станков, диски для временных конструкций длительного ношения. Доставка по России."
        />
        <meta
          name="keywords"
          content="диски PMMA, диски ПММА, PMMA диски для фрезерования, купить PMMA диски, блоки PMMA стоматология, диски для временных коронок, полиметилакрилат CAD CAM, Lima PMMA, Dental Direkt PMMA"
        />
        <meta property="og:title" content="Диски PMMA (ПММА) для CAD/CAM — Артикон" />
        <meta property="og:description" content="Диски PMMA для фрезерования временных конструкций. Lima, Dental Direkt. Доставка по России." />
        <meta property="og:url" content="https://articon.pro/shop/catalog/pmma-discs" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://articon.pro/shop/catalog/pmma-discs" />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Диски пластик (PMMA)
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Профессиональные диски PMMA для CAD/CAM фрезерования.
            Блок-заготовки из полиметилакрилата для изготовления временных конструкций длительного ношения.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <MobileCatalogDrawer />

          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <CatalogSidebar />
          </div>

          <div className="flex-1">
            {/* Upcera Section */}
            {upceraVariants.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Upcera</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {upceraVariants.map((product) => (
                    <VariantProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Lima Section */}
            {limaVariants.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Lima</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {limaVariants.map((product) => (
                    <VariantProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Articon Section */}
            {articonVariants.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Articon</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {articonVariants.map((product) => (
                    <VariantProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* ST Dental Section */}
            {stDentalVariants.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">ST Dental</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {stDentalVariants.map((product) => (
                    <VariantProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Dental Direkt Section */}
            {dentalDirektProducts.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Dental Direkt</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {dentalDirektProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Other products */}
            {otherProducts.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Другие</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {otherProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {pmmaDiscs.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Товары в данной категории скоро появятся
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PmmaDiscs;
