import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { VariantProductCard } from "@/components/shop/VariantProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { MobileCatalogDrawer } from "@/components/shop/MobileCatalogDrawer";
import { CadcamFilters, EMPTY_FILTERS, type CadcamFilterState } from "@/components/shop/CadcamFilters";
import { Helmet } from "react-helmet-async";
import { products, type Product } from "@/data/products";
import { variantProducts, type VariantProduct } from "@/data/variantProducts";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * Determine material tags for a product based on its subcategory / name.
 */
function getMaterialTags(subcategory?: string, name?: string): string[] {
  const tags: string[] = [];
  const sub = subcategory ?? "";
  const n = (name ?? "").toLowerCase();

  if (sub.startsWith("zirconia") || n.includes("цирконие")) tags.push("zirconia");
  if (sub === "metal-discs" || n.includes("титан") || n.includes("cocr")) tags.push("titanium");
  if (sub === "zirconia-multilayer" || n.includes("многослой") || n.includes("multilayer") || n.includes("ml"))
    tags.push("multilayer");
  if (sub === "pmma-discs") tags.push("pmma");
  if (sub === "press-ceramic") tags.push("press");

  return tags;
}

/**
 * Extract translucency tags from product name / id.
 */
function getTranslucencyTags(id: string, name: string): string[] {
  const tags: string[] = [];
  const lower = (id + " " + name).toLowerCase();
  if (lower.includes("st ") || lower.includes("st-") || lower.includes("-st")) tags.push("ST");
  if (lower.includes("ht ") || lower.includes("ht-") || lower.includes("-ht")) tags.push("HT");
  if (lower.includes("mt ") || lower.includes("mt-") || lower.includes("-mt")) tags.push("MT");
  return tags;
}

function variantMatchesFilters(product: VariantProduct, filters: CadcamFilterState): boolean {
  const materialTags = getMaterialTags(product.subcategory, product.name);
  const translucencyTags = getTranslucencyTags(product.id, product.name);

  // Material filter
  if (filters.material.length > 0 && !filters.material.some((m) => materialTags.includes(m))) {
    return false;
  }

  // Translucency filter
  if (filters.translucency.length > 0 && !filters.translucency.some((t) => translucencyTags.includes(t))) {
    return false;
  }

  // For height and shade, check if ANY variant matches
  const variants = product.variants;

  if (filters.heights.length > 0) {
    const hasMatchingHeight = variants.some((v) => filters.heights.includes(v.height));
    if (!hasMatchingHeight) return false;
  }

  if (filters.shades.length > 0) {
    if (product.noShade) return false;
    const hasMatchingShade = variants.some((v) => filters.shades.includes(v.shade));
    if (!hasMatchingShade) return false;
  }

  return true;
}

function productMatchesFilters(product: Product, filters: CadcamFilterState): boolean {
  const materialTags = getMaterialTags(product.subcategory, product.name);
  const translucencyTags = getTranslucencyTags(product.id, product.name);

  if (filters.material.length > 0 && !filters.material.some((m) => materialTags.includes(m))) {
    return false;
  }

  if (filters.translucency.length > 0 && !filters.translucency.some((t) => translucencyTags.includes(t))) {
    return false;
  }

  // For regular products we try to parse height/shade from name
  if (filters.heights.length > 0 || filters.shades.length > 0) {
    const name = product.name;
    // try to extract height like "98 x 14"
    const heightMatch = name.match(/98\s*[x×]\s*(\d+)/);
    const height = heightMatch ? parseInt(heightMatch[1]) : null;

    if (filters.heights.length > 0) {
      if (!height || !filters.heights.includes(height)) return false;
    }

    if (filters.shades.length > 0) {
      // Try to match shade from name
      const hasShade = filters.shades.some((shade) => {
        const escaped = shade.replace(".", "\\.");
        return new RegExp(`\\b${escaped}\\b`, "i").test(name);
      });
      if (!hasShade) return false;
    }
  }

  return true;
}

const CadcamDiscs = () => {
  const [filters, setFilters] = useState<CadcamFilterState>(EMPTY_FILTERS);

  const hasActiveFilters =
    filters.heights.length + filters.shades.length + filters.translucency.length + filters.material.length > 0;

  const cadcamVariants = useMemo(
    () => variantProducts.filter((p) => p.category === "cad-cam-discs"),
    []
  );
  const cadcamProducts = useMemo(
    () => products.filter((p) => p.category === "cad-cam-discs"),
    []
  );

  // Apply filters
  const filteredVariants = useMemo(
    () => (hasActiveFilters ? cadcamVariants.filter((p) => variantMatchesFilters(p, filters)) : cadcamVariants),
    [cadcamVariants, filters, hasActiveFilters]
  );
  const filteredProducts = useMemo(
    () => (hasActiveFilters ? cadcamProducts.filter((p) => productMatchesFilters(p, filters)) : cadcamProducts),
    [cadcamProducts, filters, hasActiveFilters]
  );

  // Group by subcategory
  const zirconiaVariants = filteredVariants.filter((p) => p.subcategory?.startsWith("zirconia"));
  const metalProducts = filteredProducts.filter((p) => p.subcategory === "metal-discs");
  const pmmaProducts = filteredProducts.filter((p) => p.subcategory === "pmma-discs");
  const pressProducts = filteredProducts.filter((p) => p.subcategory === "press-ceramic");

  // Also include PMMA variant products
  const pmmaVariants = filteredVariants.filter((p) => p.subcategory === "pmma-discs");

  const sections = [
    { title: "Циркониевые диски", variantItems: zirconiaVariants, productItems: [] as Product[] },
    { title: "Диски металл (CoCr/Ti)", variantItems: [] as VariantProduct[], productItems: metalProducts },
    { title: "Диски пластик (PMMA)", variantItems: pmmaVariants, productItems: pmmaProducts },
    { title: "Пресс-керамика", variantItems: [] as VariantProduct[], productItems: pressProducts },
  ];

  const totalCount = filteredProducts.length + filteredVariants.length;

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
          {/* Mobile: catalog categories + filters */}
          <div className="lg:hidden flex gap-2 mb-4">
            <MobileCatalogDrawer />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Фильтры
                  {hasActiveFilters && (
                    <span className="bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5 ml-1">
                      {filters.heights.length + filters.shades.length + filters.translucency.length + filters.material.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle>Фильтры</SheetTitle>
                </SheetHeader>
                <div className="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
                  <CadcamFilters filters={filters} onChange={setFilters} />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop sidebar */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto space-y-6 pr-1">
              <CatalogSidebar />
              <CadcamFilters filters={filters} onChange={setFilters} />
            </div>
          </div>

          <div className="flex-1">
            <p className="text-muted-foreground text-sm mb-8">
              Найдено {totalCount} товаров
              {hasActiveFilters && (
                <button
                  onClick={() => setFilters(EMPTY_FILTERS)}
                  className="ml-2 text-primary hover:underline"
                >
                  Сбросить фильтры
                </button>
              )}
            </p>

            {sections.map((section) => {
              const sectionCount = section.variantItems.length + section.productItems.length;
              if (sectionCount === 0) return null;

              return (
                <section key={section.title} className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                    <span className="text-muted-foreground text-sm">
                      {sectionCount} товаров
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {section.variantItems.map((product) => (
                      <VariantProductCard key={product.id} product={product} />
                    ))}
                    {section.productItems.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              );
            })}

            {totalCount === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                {hasActiveFilters
                  ? "По выбранным фильтрам товары не найдены"
                  : "Товары в данной категории временно недоступны"}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CadcamDiscs;
