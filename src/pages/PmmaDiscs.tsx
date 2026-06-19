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
  const allPmmaItems = [
    ...pmmaDiscs.map((p) => ({ type: "product" as const, data: p })),
    ...pmmaVariants.map((p) => ({ type: "variant" as const, data: p })),
  ].sort((a, b) => {
    const aInStock = a.type === "product" ? a.data.inStock : !a.data.outOfStock;
    const bInStock = b.type === "product" ? b.data.inStock : !b.data.outOfStock;
    return Number(bInStock) - Number(aInStock);
  });

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
            {allPmmaItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {allPmmaItems.map((item) =>
                  item.type === "product" ? (
                    <ProductCard key={item.data.id} product={item.data} />
                  ) : (
                    <VariantProductCard key={item.data.id} product={item.data} />
                  )
                )}
              </div>
            ) : (
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
