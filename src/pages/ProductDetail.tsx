import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

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

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Layout>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square bg-muted/30 rounded-2xl overflow-hidden border border-border">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            </div>
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-primary text-primary-foreground">NEW</Badge>
              )}
              {product.isSale && (
                <Badge className="bg-accent text-accent-foreground">SALE</Badge>
              )}
            </div>
          </div>

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
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </div>
              ) : (
                <div className="text-2xl font-bold text-foreground">
                  Цена по запросу
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90">
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
            <TabsTrigger 
              value="delivery"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Доставка
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="prose max-w-none">
            <p className="text-muted-foreground">
              {product.name} — профессиональное оборудование от {product.brand} для зуботехнических лабораторий и стоматологических клиник.
              Отличается высокой точностью, надежностью и простотой в использовании.
            </p>
            <p className="text-muted-foreground mt-4">
              Продукт прошел сертификацию и соответствует международным стандартам качества.
              Идеально подходит для профессионального использования в сфере цифровой стоматологии.
            </p>
          </TabsContent>
          
          <TabsContent value="specs">
            <div className="grid gap-2">
              <div className="flex py-3 border-b border-border">
                <span className="w-1/3 text-muted-foreground">Бренд</span>
                <span className="font-medium">{product.brand}</span>
              </div>
              <div className="flex py-3 border-b border-border">
                <span className="w-1/3 text-muted-foreground">Категория</span>
                <span className="font-medium">{product.category}</span>
              </div>
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
          
          <TabsContent value="delivery">
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Доставка по Москве:</strong> 1-2 рабочих дня. Бесплатно при заказе от 50 000 ₽.
              </p>
              <p>
                <strong className="text-foreground">Доставка по России:</strong> 3-7 рабочих дней транспортными компаниями СДЭК, DPD, Деловые Линии.
              </p>
              <p>
                <strong className="text-foreground">Самовывоз:</strong> Бесплатно. Москва, ул. Примерная, д. 1.
              </p>
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
