import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ShoppingCart, Eye } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  inStock: boolean;
}

const products: Product[] = [
  {
    id: "glaze-upcera-realism",
    name: "Глазурь Upcera Realism для керамики и циркония",
    price: 3853,
    image: "https://articon.pro/wp-content/uploads/2024/11/Frame-285-17-300x300.jpg",
    category: "Глазурь",
    brand: "Upcera",
    inStock: true,
  },
  {
    id: "paint-set-upcera-20",
    name: "Набор красок Upcera Realism (20 цветов)",
    price: 74980,
    image: "https://articon.pro/wp-content/uploads/2025/01/Frame-285-20-300x300.jpg",
    category: "Краски",
    brand: "Upcera",
    inStock: true,
  },
  {
    id: "paint-set-upcera-7",
    name: "Набор красок Upcera Realism (7 цветов)",
    price: 26105,
    image: "https://articon.pro/wp-content/uploads/2024/11/%D0%93%D0%BB%D0%B0%D0%B7%D1%83%D1%80%D1%8C-Upcera-Realism-%D0%B4%D0%BB%D1%8F-%D0%BA%D0%B5%D1%80%D0%B0%D0%BC%D0%B8%D0%BA%D0%B8-%D0%B8-%D1%86%D0%B8%D1%80%D0%BA%D0%BE%D0%BD%D0%B8%D1%8F--300x300.jpg",
    category: "Краски",
    brand: "Upcera",
    inStock: true,
  },
  {
    id: "glaze-liquid-upcera",
    name: "Разбавитель Upcera Realism Glaze Liquid для керамики и циркония",
    price: 3680,
    image: "https://articon.pro/wp-content/uploads/2024/11/%D0%A0%D0%B0%D0%B7%D0%B1%D0%B0%D0%B2%D0%B8%D1%82%D0%B5%D0%BB%D1%8C-Upcera-Realism-Glaze-Liquid-%D0%B4%D0%BB%D1%8F-%D0%BA%D0%B5%D1%80%D0%B0%D0%BC%D0%B8%D0%BA%D0%B8-%D0%B8-%D1%86%D0%B8%D1%80%D0%BA%D0%BE%D0%BD%D0%B8%D1%8F-300x300.jpg",
    category: "Разбавители",
    brand: "Upcera",
    inStock: true,
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
};

const PaintsGlaze = () => {
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

  return (
    <Layout>
      <Helmet>
        <title>Краски и глазурь для керамики и циркония | Articon</title>
        <meta
          name="description"
          content="Профессиональные краски и глазури для окрашивания керамики и циркония. Upcera Realism - наборы красок и глазурей для стоматологических реставраций."
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
                  Краски и глазурь
                </h1>
                <p className="text-muted-foreground">
                  Профессиональные материалы для окрашивания керамических и
                  циркониевых реставраций
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
                  <Link
                    key={product.id}
                    to={`/shop/product/${product.id}`}
                    className="block"
                  >
                    <div
                      className="bg-card border border-border rounded-lg overflow-hidden group hover:shadow-lg transition-shadow h-full cursor-pointer"
                    >
                      <div className="relative aspect-square bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
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

                      <div className="p-4">
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem] mb-2">
                          {product.name}
                        </h3>

                        <div className="text-xs text-muted-foreground mb-2">
                          {product.brand} • {product.category}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">
                            {formatPrice(product.price)}
                          </span>
                        </div>

                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToCart(product);
                            }}
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            В корзину
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
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

export default PaintsGlaze;
