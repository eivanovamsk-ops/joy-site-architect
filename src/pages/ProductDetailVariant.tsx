import { useState, useMemo, useCallback, useEffect } from "react";
// @ts-ignore - FileDown may not exist in older lucide versions

import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { variantProducts } from "@/data/variantProducts";
import { getProductBreadcrumbs } from "@/lib/breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  Phone,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  FileDown,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ProductDescription } from "@/components/shop/ProductDescription";
import { RelatedProducts } from "@/components/shop/RelatedProducts";

const ProductDetailVariant = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { toast } = useToast();

  const [selectedDiameter, setSelectedDiameter] = useState<number | null>(null);
  const [selectedHeight, setSelectedHeight] = useState<number | null>(null);
  const [selectedShade, setSelectedShade] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const product = variantProducts.find((p) => p.id === id);

  const availableDiameters = useMemo(
    () =>
      product
        ? [...new Set(product.variants.map((v) => v.diameter))].sort((a, b) => a - b)
        : [],
    [product]
  );

  const hasSingleDiameter = availableDiameters.length === 1;

  // Автоматически выбираем диаметр, если он один
  useEffect(() => {
    if (hasSingleDiameter && availableDiameters.length > 0) {
      setSelectedDiameter(availableDiameters[0]);
    }
  }, [hasSingleDiameter, availableDiameters]);

  const availableHeights = useMemo(() => {
    if (!product) return [];
    const filtered = selectedDiameter
      ? product.variants.filter((v) => v.diameter === selectedDiameter)
      : product.variants;
    return [...new Set(filtered.map((v) => v.height))].sort((a, b) => a - b);
  }, [product, selectedDiameter]);

  const availableShades = useMemo(() => {
    if (!product || product.noShade) return [];
    return [
      ...new Set(
        product.variants
          .filter((v) => {
            if (selectedDiameter && v.diameter !== selectedDiameter) return false;
            if (selectedHeight && v.height !== selectedHeight) return false;
            return true;
          })
          .map((v) => v.shade)
      ),
    ];
  }, [product, selectedDiameter, selectedHeight]);

  const currentVariant = useMemo(() => {
    if (!product || !selectedDiameter || !selectedHeight) return null;
    if (!product.noShade && !selectedShade) return null;
    return (
      product.variants.find(
        (v) =>
          v.diameter === selectedDiameter &&
          v.height === selectedHeight &&
          (product.noShade || v.shade === selectedShade)
      ) ?? null
    );
  }, [product, selectedDiameter, selectedHeight, selectedShade]);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
          <Link to="/shop">
            <Button>Вернуться в каталог</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ru-RU").format(price) + " ₽";

  const displayPrice = currentVariant?.price ?? product.basePrice;
  const allSelected = selectedDiameter && selectedHeight && (product.noShade || selectedShade);

  const handleDiameterSelect = (d: number) => {
    setSelectedDiameter(d);
    const heights = [
      ...new Set(
        product.variants.filter((v) => v.diameter === d).map((v) => v.height)
      ),
    ];
    if (selectedHeight && !heights.includes(selectedHeight)) {
      setSelectedHeight(null);
      setSelectedShade(null);
    }
  };

  const handleHeightSelect = (h: number) => {
    setSelectedHeight(h);
    const shades = [
      ...new Set(
        product.variants
          .filter((v) => {
            if (selectedDiameter && v.diameter !== selectedDiameter) return false;
            return v.height === h;
          })
          .map((v) => v.shade)
      ),
    ];
    if (selectedShade && !shades.includes(selectedShade)) {
      setSelectedShade(null);
    }
  };

  const handleAddToCart = () => {
    if (!allSelected || !currentVariant) return;
    const name = `${product.name}, ${selectedDiameter}×${selectedHeight}, ${selectedShade}`;
    addItem({ slug: currentVariant.sku, name, price: currentVariant.price, image: product.image });
    toast({ title: "Товар добавлен в корзину", description: name });
  };

  return (
    <Layout>
      <Helmet>
        <title>{product.name} | Артикон</title>
        <meta
          name="description"
          content={product.metaDescription || `${product.description?.slice(0, 150)} Купить в Артикон с доставкой по России.`}
        />
        <link rel="canonical" href={`https://articon.pro/shop/variant/${product.id}`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        {(() => {
          const crumbs = getProductBreadcrumbs(product.category, product.subcategory);
          return (
            <nav className="text-sm text-muted-foreground mb-6 flex gap-2 items-center flex-wrap">
              {crumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <span>/</span>}
                  <Link to={crumb.href} className="hover:text-foreground">{crumb.label}</Link>
                </span>
              ))}
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>
          );
        })()}

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image / Slider */}
          <div className="relative">
            {(() => {
              const images = product.gallery && product.gallery.length > 0
                ? product.gallery
                : [product.image];

              const openLightbox = (idx: number) => {
                setLightboxIndex(idx);
                setLightboxOpen(true);
              };
              const prev = () => setActiveSlide((s) => (s - 1 + images.length) % images.length);
              const next = () => setActiveSlide((s) => (s + 1) % images.length);

              return (
                <>
                  {/* Main slide */}
                  <div
                    className="aspect-square bg-muted/30 rounded-2xl overflow-hidden border border-border relative cursor-zoom-in group"
                    onClick={() => openLightbox(activeSlide)}
                  >
                    <img
                      src={images[activeSlide]}
                      alt={`${product.name} — фото ${activeSlide + 1}`}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-contain p-8 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/30 rounded-full p-2">
                        <ZoomIn className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); prev(); }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border border-border rounded-full p-1.5 transition-colors"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); next(); }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border border-border rounded-full p-1.5 transition-colors"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {images.length > 1 && (
                    <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                      {images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveSlide(i)}
                          className={cn(
                            "flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-colors bg-muted/30",
                            activeSlide === i ? "border-primary" : "border-border hover:border-primary/50"
                          )}
                        >
                          <img
                            src={img}
                            alt={`Миниатюра ${i + 1}`}
                            className="w-full h-full object-contain p-1"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Lightbox */}
                  {lightboxOpen && (
                    <div
                      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                      onClick={() => setLightboxOpen(false)}
                    >
                      <button
                        className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                        onClick={() => setLightboxOpen(false)}
                      >
                        <X className="h-6 w-6" />
                      </button>
                      {images.length > 1 && (
                        <>
                          <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i - 1 + images.length) % images.length); }}
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </button>
                          <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i + 1) % images.length); }}
                          >
                            <ChevronRight className="h-6 w-6" />
                          </button>
                        </>
                      )}
                      <div
                        className="max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center p-8"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img
                          src={images[lightboxIndex]}
                          alt={`${product.name} — фото ${lightboxIndex + 1}`}
                          className="max-w-full max-h-full object-contain rounded-lg"
                        />
                      </div>
                      {images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {images.map((_, i) => (
                            <button
                              key={i}
                              onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                              className={cn(
                                "w-2 h-2 rounded-full transition-colors",
                                lightboxIndex === i ? "bg-white" : "bg-white/40"
                              )}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              );
            })()}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
              {product.brand}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            {product.subtitle && (
              <p className="text-muted-foreground text-sm mb-6">{product.subtitle}</p>
            )}

            {/* Diameter selector — скрыт если диаметр один */}
            {!hasSingleDiameter && (
              <div className="mb-5">
                <div className="text-sm font-semibold mb-2 text-foreground">
                  Диаметр (мм):{" "}
                  {selectedDiameter && (
                    <span className="font-normal text-primary">{selectedDiameter}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableDiameters.map((d) => (
                    <button
                      key={d}
                      onClick={() => handleDiameterSelect(d)}
                      className={cn(
                        "px-4 py-2 rounded-lg border text-sm font-medium transition-colors",
                        selectedDiameter === d
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-primary"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Height selector */}
            <div className="mb-5">
              <div className="text-sm font-semibold mb-2 text-foreground">
                Высота (мм):{" "}
                {selectedHeight && (
                  <span className="font-normal text-primary">{selectedHeight}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {availableHeights.map((h) => (
                  <button
                    key={h}
                    onClick={() => handleHeightSelect(h)}
                    className={cn(
                      "px-4 py-2 rounded-lg border text-sm font-medium transition-colors",
                      selectedHeight === h
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary"
                    )}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            {/* Shade selector — скрыт для товаров без оттенков (HT White) */}
            {!product.noShade && (
              <div className="mb-6">
                <div className="text-sm font-semibold mb-2 text-foreground">
                  Оттенок (VITA):{" "}
                  {selectedShade && (
                    <span className="font-normal text-primary">{selectedShade}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableShades.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedShade(s)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors",
                        selectedShade === s
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-primary"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              <div className="text-3xl font-bold text-primary">
                {formatPrice(displayPrice)}
              </div>
              {!allSelected && (
                <p className="text-xs text-muted-foreground mt-1">
                  Цена зависит от выбранной высоты
                </p>
              )}
              {currentVariant && (
                <div className="text-xs text-muted-foreground mt-1">
                  Артикул: {currentVariant.sku}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mb-8">
              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!allSelected || product.outOfStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.outOfStock
                  ? "Нет в наличии"
                  : allSelected
                  ? "Добавить в корзину"
                  : "Выберите параметры"}
              </Button>
              <div className="flex gap-3">
                <Button size="lg" variant="outline" className="flex-1" disabled={product.outOfStock}>
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="flex-1" disabled={product.outOfStock}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-xl">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs font-medium">Доставка</div>
                  <div className="text-xs text-muted-foreground">По России</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs font-medium">Гарантия</div>
                  <div className="text-xs text-muted-foreground">Официальная</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs font-medium">Консультация</div>
                  <div className="text-xs text-muted-foreground">Бесплатно</div>
                </div>
              </div>
            </div>

            {product.id === "aevra-ml-d98" && (
              <Button className="w-full gap-2 bg-primary hover:bg-primary/90" asChild>
                <a href="https://www.articon-consulting.ru/guide-to-working-with-zircon" target="_blank" rel="noopener noreferrer">
                  <FileDown className="h-4 w-4" />
                  Скачать гайд по работе с цирконом
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 mb-6">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Описание
            </TabsTrigger>
            <TabsTrigger
              value="specs"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Характеристики
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description">
            {product.description ? (
              <ProductDescription text={product.description} productName={product.name} />
            ) : (
              <p className="text-muted-foreground">
                {product.name} — профессиональный материал от {product.brand}.
              </p>
            )}
          </TabsContent>

          <TabsContent value="specs">
            <div className="grid gap-2">
              <div className="flex py-3 border-b border-border">
                <span className="w-1/3 text-muted-foreground">Бренд</span>
                <span className="font-medium">{product.brand}</span>
              </div>
              <div className="flex py-3 border-b border-border">
                <span className="w-1/3 text-muted-foreground">Диаметр (мм)</span>
                <span className="font-medium">{availableDiameters.join(", ")}</span>
              </div>
              <div className="flex py-3 border-b border-border">
                <span className="w-1/3 text-muted-foreground">Высота (мм)</span>
                <span className="font-medium">{availableHeights.join(", ")}</span>
              </div>
              {!product.noShade && (
                <div className="flex py-3 border-b border-border">
                  <span className="w-1/3 text-muted-foreground">Оттенки VITA</span>
                  <span className="font-medium">{availableShades.join(", ")}</span>
                </div>
              )}
              {product.specifications &&
                Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex py-3 border-b border-border">
                    <span className="w-1/3 text-muted-foreground">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              <div className="flex py-3 border-b border-border">
                <span className="w-1/3 text-muted-foreground">Наличие</span>
                <span className="font-medium">
                  {product.outOfStock ? "Нет в наличии" : "В наличии"}
                </span>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Download files */}
        {product.downloadFiles && product.downloadFiles.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-4">Документы для скачивания</h3>
            <div className="flex flex-col gap-3">
              {product.downloadFiles.map((file, i) => (
                <a
                  key={i}
                  href={file.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-secondary/50 hover:bg-secondary transition-colors group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <FileDown className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">{file.name}</p>
                    {file.size && <p className="text-xs text-muted-foreground">{file.size}</p>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Сопутствующие товары */}
        <RelatedProducts productId={product.id} />
      </div>
    </Layout>
  );
};

export default ProductDetailVariant;
