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
  const brandOrder = [
    "Upcera",
    "Lima",
    "Articon",
    "ST Dental",
    "Dental Direkt",
    "Honchon Smile",
    "Audental",
  ];

  const allPmmaItems = [
    ...pmmaDiscs.map((p) => ({ type: "product" as const, data: p })),
    ...pmmaVariants.map((p) => ({ type: "variant" as const, data: p })),
  ].sort((a, b) => {
    const aInStock = a.type === "product" ? a.data.inStock : !a.data.outOfStock;
    const bInStock = b.type === "product" ? b.data.inStock : !b.data.outOfStock;
    if (aInStock !== bInStock) return Number(bInStock) - Number(aInStock);

    const aBrand = a.data.brand ?? "";
    const bBrand = b.data.brand ?? "";
    const aIndex = brandOrder.indexOf(aBrand);
    const bIndex = brandOrder.indexOf(bBrand);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return aBrand.localeCompare(bBrand);
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

      <h1 className="sr-only">Диски пластик (PMMA)</h1>
      <div className="container mx-auto px-4 pt-6">
        <section
          aria-label="Антикризисная цена на PMMA Mono & Multilayer — от 700 ₽"
          className="overflow-hidden rounded-lg border border-border bg-card shadow-md"
        >
          <div className="grid min-h-28 gap-4 px-5 py-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-8 lg:min-h-36 lg:px-10">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-destructive text-sm font-bold uppercase text-destructive-foreground shadow-card sm:h-20 sm:w-20">
              Акция
            </div>
            <div>
              <p className="text-sm font-semibold uppercase text-muted-foreground">PMMA Mono & Multilayer</p>
              <p className="mt-1 text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl">
                Антикризисная цена
              </p>
            </div>
            <div className="justify-self-start rounded-md bg-accent px-4 py-2 text-xl font-bold text-accent-foreground shadow-soft sm:justify-self-end sm:text-2xl">
              от 700 ₽
            </div>
          </div>
        </section>
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
                    <ProductCard key={item.data.id} product={item.data} showPromo />
                  ) : (
                    <VariantProductCard key={item.data.id} product={item.data} showPromo />
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
