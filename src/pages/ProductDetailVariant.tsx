import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { variantProducts } from "@/data/variantProducts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  Phone,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const ProductDetailVariant = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { toast } = useToast();

  const [selectedDiameter, setSelectedDiameter] = useState<number | null>(null);
  const [selectedHeight, setSelectedHeight] = useState<number | null>(null);
  const [selectedShade, setSelectedShade] = useState<string | null>(null);

  const product = variantProducts.find((p) => p.id === id);

  const availableDiameters = useMemo(
    () =>
      product
        ? [...new Set(product.variants.map((v) => v.diameter))].sort((a, b) => a - b)
        : [],
    [product]
  );

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
          content={`${product.description?.slice(0, 150)} Купить в Артикон с доставкой по России.`}
        />
        <link rel="canonical" href={`https://articon.pro/shop/variant/${product.id}`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6 flex gap-2 items-center flex-wrap">
          <Link to="/shop" className="hover:text-foreground">Магазин</Link>
          <span>/</span>
          <Link to="/shop/catalog/zirconia-discs" className="hover:text-foreground">
            Циркониевые диски
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square bg-muted/30 rounded-2xl overflow-hidden border border-border">
              <img
                src={product.image}
                alt={product.name}
                loading="eager"
                decoding="async"
                className="w-full h-full object-contain p-8"
              />
            </div>


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

            {/* Diameter selector */}
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
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={!allSelected}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {allSelected ? "Добавить в корзину" : "Выберите параметры"}
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
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
            <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
              {product.description}
            </div>
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
                <span className="font-medium">В наличии</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProductDetailVariant;
