import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { products } from "@/data/products";
import { getProductBreadcrumbs } from "@/lib/breadcrumbs";
import { Button } from "@/components/ui/button";
import ProductImageSlider from "@/components/shop/ProductImageSlider";
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ChevronRight,
  Truck,
  Shield,
  Phone,
  Check
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { YandexSplitButton, SPLIT_ELIGIBLE_PRODUCTS } from "@/components/shop/YandexSplitButton";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const { toast } = useToast();

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  const hasOldPrice = product.oldPrice && product.oldPrice > (product.price || 0);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // SEO description generation
  const generateSeoDescription = () => {
    if (product.metaDescription) return product.metaDescription;
    const base = product.description?.slice(0, 150) || `${product.name} от ${product.brand}`;
    const priceText = product.price ? ` Цена от ${formatPrice(product.price)}.` : " Цена по запросу.";
    return `${base}${priceText} Купить в Артикон с доставкой по России. Официальная гарантия.`;
  };

  const getCategoryName = () => {
    const categoryNames: Record<string, string> = {
      "3d-print": "3D-печать",
      "3d-scanners": "3D-сканеры",
      "milling": "Фрезерное оборудование",
      "furnaces": "Зуботехнические печи",
      "zircon-discs": "Циркониевые диски",
      "cad-cam-discs": "Диски CAD/CAM",
      "discs": "Диски для фрезерования",
      "paints-glazes": "Краски и глазурь"
    };
    return categoryNames[product.category] || product.category;
  };

  return (
    <Layout>
      <Helmet>
        <title>{product.name} | Купить в Артикон — {product.brand}</title>
        <meta name="description" content={generateSeoDescription()} />
        <meta name="keywords" content={`${product.name}, ${product.brand}, ${getCategoryName()}, купить, цена, Артикон, стоматологическое оборудование, зуботехническая лаборатория`} />
        <link rel="canonical" href={`https://articon.pro/shop/product/${product.id}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${product.name} — купить в Артикон`} />
        <meta property="og:description" content={generateSeoDescription()} />
        <meta property="og:image" content={product.image.startsWith('http') ? product.image : `https://articon.pro${product.image}`} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://articon.pro/shop/product/${product.id}`} />
        <meta property="og:site_name" content="Артикон" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="product:price:amount" content={product.price?.toString() || ""} />
        <meta property="product:price:currency" content="RUB" />
        <meta property="product:availability" content={product.inStock ? "in stock" : "preorder"} />
        <meta property="product:brand" content={product.brand} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} — купить в Артикон`} />
        <meta name="twitter:description" content={generateSeoDescription()} />
        <meta name="twitter:image" content={product.image.startsWith('http') ? product.image : `https://articon.pro${product.image}`} />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.description || `${product.name} — профессиональное оборудование от ${product.brand}`,
            "image": product.image,
            "brand": {
              "@type": "Brand",
              "name": product.brand
            },
            "sku": product.sku || product.id,
            "offers": {
              "@type": "Offer",
              "url": `https://articon.pro/shop/product/${product.id}`,
              "priceCurrency": "RUB",
              "price": product.price || undefined,
              "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
              "seller": {
                "@type": "Organization",
                "name": "Артикон"
              }
            }
          })}
        </script>
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
          {/* Product Image */}
          <ProductImageSlider
            images={[product.image, ...(product.gallery || [])]}
            name={product.name}
            isNew={product.isNew}
            isSale={product.isSale}
          />

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
              {product.brand}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {product.inStock ? (
                <>
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-green-600 font-medium">В наличии</span>
                </>
              ) : (
                <span className="text-muted-foreground">Под заказ</span>
              )}
            </div>

            {/* Price */}
            <div className="mb-6">
              {product.price ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {hasOldPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.oldPrice!)}
                    </span>
                  )}
                </div>
              ) : (
                <div className="text-2xl font-bold text-foreground">
                  Цена по запросу
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button 
                size="lg" 
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={() => {
                  if (product.price) {
                    addItem({
                      slug: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    });
                    toast({
                      title: "Товар добавлен в корзину",
                      description: product.name,
                    });
                  } else {
                    window.open("https://t.me/articondental_bot", "_blank");
                  }
                }}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.price ? "Добавить в корзину" : "Запросить цену"}
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Yandex Split */}
            {product.price && SPLIT_ELIGIBLE_PRODUCTS.includes(product.id) && (
              <div className="mb-8">
                <YandexSplitButton
                  productId={product.id}
                  productName={product.name}
                  price={product.price}
                />
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-xl">
              <div className="flex items-center gap-3">
                <Truck className="h-6 w-6 text-primary" />
                <div>
                  <div className="text-sm font-medium">Доставка</div>
                  <div className="text-xs text-muted-foreground">По всей России</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <div>
                  <div className="text-sm font-medium">Гарантия</div>
                  <div className="text-xs text-muted-foreground">Официальная</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-primary" />
                <div>
                  <div className="text-sm font-medium">Консультация</div>
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
          
          <TabsContent value="description" className="prose max-w-none">
            {product.description ? (
              <div className="text-muted-foreground whitespace-pre-line">
                {product.description}
              </div>
            ) : (
              <>
                <p className="text-muted-foreground">
                  {product.name} — профессиональное оборудование от {product.brand} для зуботехнических лабораторий и стоматологических клиник.
                </p>
                <p className="text-muted-foreground mt-4">
                  Продукт прошел сертификацию и соответствует международным стандартам качества.
                </p>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="specs">
            <div className="grid gap-2">
              <div className="flex py-3 border-b border-border">
                <span className="w-1/3 text-muted-foreground">Бренд</span>
                <span className="font-medium">{product.brand}</span>
              </div>
              {product.sku && (
                <div className="flex py-3 border-b border-border">
                  <span className="w-1/3 text-muted-foreground">Артикул</span>
                  <span className="font-medium">{product.sku}</span>
                </div>
              )}
              {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex py-3 border-b border-border">
                  <span className="w-1/3 text-muted-foreground">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
              <div className="flex py-3 border-b border-border">
                <span className="w-1/3 text-muted-foreground">Наличие</span>
                <span className="font-medium">{product.inStock ? "В наличии" : "Под заказ"}</span>
              </div>
              <div className="flex py-3 border-b border-border">
                <span className="w-1/3 text-muted-foreground">Гарантия</span>
                <span className="font-medium">12 месяцев</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Похожие товары</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relProduct) => (
                <Link
                  key={relProduct.id}
                  to={`/shop/product/${relProduct.id}`}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="aspect-square bg-muted/30 p-4">
                    <img
                      src={relProduct.image}
                      alt={relProduct.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-3">
                    <div className="text-xs text-muted-foreground mb-1">{relProduct.brand}</div>
                    <div className="text-sm font-medium line-clamp-2">{relProduct.name}</div>
                    <div className="text-primary font-bold mt-2">
                      {relProduct.price ? formatPrice(relProduct.price) : "По запросу"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
