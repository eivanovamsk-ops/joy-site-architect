import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { VariantProductCard } from "@/components/shop/VariantProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { MobileCatalogDrawer } from "@/components/shop/MobileCatalogDrawer";
import { Helmet } from "react-helmet-async";
import { products } from "@/data/products";
import { variantProducts } from "@/data/variantProducts";

const CadcamDiscs = () => {
  const cadcamProducts = products.filter((p) => p.category === "cad-cam-discs");
  const cadcamVariants = variantProducts.filter((p) => p.category === "cad-cam-discs");

  // Group by subcategory
  const zirconiaVariants = cadcamVariants.filter((p) =>
    p.subcategory?.startsWith("zirconia")
  );
  const metalProducts = cadcamProducts.filter((p) => p.subcategory === "metal-discs");
  const pmmaProducts = cadcamProducts.filter((p) => p.subcategory === "pmma-discs");
  const pressProducts = cadcamProducts.filter((p) => p.subcategory === "press-ceramic");

  const sections = [
    { title: "Циркониевые диски", items: zirconiaVariants, type: "variant" as const },
    { title: "Диски металл (CoCr/Ti)", items: metalProducts, type: "product" as const },
    { title: "Диски пластик (PMMA)", items: pmmaProducts, type: "product" as const },
    { title: "Пресс-керамика", items: pressProducts, type: "product" as const },
  ];

  const totalCount = cadcamProducts.length + cadcamVariants.length;

  return (
    <Layout>
      <Helmet>
        <title>Диски CAD/CAM для фрезерования — купить | Артикон</title>
        <meta
          name="description"
          content="Купить диски CAD/CAM для стоматологии: циркониевые диски, металлические диски CoCr/Ti, PMMA диски и пресс-керамика. Бренды Upcera, Aevra, Honchon, Lima. Доставка по России."
        />
        <meta
          name="keywords"
          content="диски cad cam, cad cam диски купить, циркониевые диски, диски для фрезерования, pmma диски, металлические диски, пресс-керамика, upcera диски"
        />
        <link rel="canonical" href="https://articon.pro/shop/catalog/cadcam-discs" />
        <meta property="og:title" content="Диски CAD/CAM для фрезерования — Артикон" />
        <meta property="og:description" content="Циркониевые, металлические, PMMA диски и пресс-керамика для CAD/CAM систем." />
        <meta property="og:url" content="https://articon.pro/shop/catalog/cadcam-discs" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Диски CAD/CAM
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Полный ассортимент дисков для CAD/CAM фрезерования: циркониевые, металлические,
            пластиковые (PMMA) диски и пресс-керамика от ведущих производителей.
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
            <p className="text-muted-foreground text-sm mb-8">
              Найдено {totalCount} товаров
            </p>

            {sections.map((section) =>
              section.items.length > 0 ? (
                <section key={section.title} className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                    <span className="text-muted-foreground text-sm">
                      {section.items.length} товаров
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {section.type === "variant"
                      ? (section.items as typeof cadcamVariants).map((product) => (
                          <VariantProductCard key={product.id} product={product} />
                        ))
                      : (section.items as typeof cadcamProducts).map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                  </div>
                </section>
              ) : null
            )}

            {totalCount === 0 && (
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

export default CadcamDiscs;
