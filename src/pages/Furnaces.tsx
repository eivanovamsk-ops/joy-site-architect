import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ShoppingCart, Eye, Phone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number | null;
  image: string;
  category: string;
  brand: string;
  inStock: boolean;
  isNew?: boolean;
}

const products: Product[] = [
  {
    id: "furnace-upcera-gt1",
    name: "Зуботехническая печь для синтеризации циркония UPCERA GT1 Pro",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/06/Frame-811546-6-300x300.png",
    category: "Печи для синтеризации",
    brand: "Upcera",
    inStock: true,
    isNew: true,
  },
  {
    id: "furnace-programat-p510",
    name: "Печь для обжига керамики Programat P510",
    price: 650000,
    image: "https://articon.pro/wp-content/uploads/2024/10/programat-p510-300x300.jpg",
    category: "Печи для обжига",
    brand: "Ivoclar",
    inStock: true,
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
};

const Furnaces = () => {
  const { toast } = useToast();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return ["all", ...cats];
  }, []);

  const filteredProducts = useMemo(() => {
    if (categoryFilter === "all") return products;
    return products.filter((p) => p.category === categoryFilter);
  }, [categoryFilter]);

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Добавлено в корзину",
      description: product.name,
    });
  };

  const handleRequest = (product: Product) => {
    toast({
      title: "Запрос отправлен",
      description: `Мы свяжемся с вами по поводу товара: ${product.name}`,
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>Печи для стоматологии | Articon</title>
        <meta
          name="description"
          content="Зуботехнические печи для синтеризации циркония и обжига керамики. Профессиональное оборудование Upcera, Ivoclar для зуботехнических лабораторий."
        />
      </Helmet>

      <Breadcrumbs />
      
      <div className="bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <CatalogSidebar />
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Печи
                </h1>
                <p className="text-muted-foreground">
                  Профессиональные печи для синтеризации циркония и обжига керамики
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={categoryFilter === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategoryFilter(cat)}
                  >
                    {cat === "all" ? "Все" : cat}
                  </Button>
                ))}
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-card border border-border rounded-lg overflow-hidden group hover:shadow-lg transition-shadow"
                  >
                    <Link to={`/shop/product/${product.id}`}>
                      <div className="relative aspect-square bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.isNew && (
                          <Badge className="absolute top-2 right-2 bg-blue-500">
                            Новинка
                          </Badge>
                        )}
                        {product.inStock ? (
                          <Badge className="absolute top-2 left-2 bg-green-500">
                            В наличии
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="absolute top-2 left-2"
                          >
                            Под заказ
                          </Badge>
                        )}
                      </div>
                    </Link>

                    <div className="p-4">
                      <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                        {product.brand}
                      </div>
                      
                      <Link to={`/shop/product/${product.id}`}>
                        <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2 min-h-[3rem] mb-2">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center justify-between mb-3">
                        {product.price ? (
                          <span className="text-lg font-bold text-primary">
                            {formatPrice(product.price)}
                          </span>
                        ) : (
                          <span className="text-lg font-medium text-muted-foreground">
                            По запросу
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {product.price ? (
                          <>
                            <Button
                              size="sm"
                              className="flex-1"
                              onClick={() => handleAddToCart(product)}
                            >
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              В корзину
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                              <Link to={`/shop/product/${product.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handleRequest(product)}
                          >
                            <Phone className="h-4 w-4 mr-1" />
                            Запросить
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Товары не найдены
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Furnaces;
