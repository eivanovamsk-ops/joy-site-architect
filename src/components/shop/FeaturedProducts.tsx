import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image?: string;
  badge?: string;
  inStock: boolean;
}

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Интраоральный сканер Runyes 3DS V5",
    category: "Интраоральные сканеры",
    price: 450000,
    oldPrice: 520000,
    badge: "Хит продаж",
    inStock: true,
  },
  {
    id: 2,
    name: "3D-принтер Asiga MAX UV",
    category: "3D-принтеры",
    price: 850000,
    badge: "Новинка",
    inStock: true,
  },
  {
    id: 3,
    name: "Фрезерный станок CORiTEC 350i",
    category: "Фрезерные станки",
    price: 1250000,
    inStock: true,
  },
  {
    id: 4,
    name: "Циркониевый диск Upcera 98x18мм",
    category: "Циркониевые диски",
    price: 12500,
    oldPrice: 14000,
    badge: "SALE",
    inStock: true,
  },
  {
    id: 5,
    name: "Лабораторный сканер Medit T710",
    category: "Лабораторные сканеры",
    price: 980000,
    inStock: true,
  },
  {
    id: 6,
    name: "Фотополимер Asiga DentaMODEL",
    category: "Фотополимеры",
    price: 18500,
    inStock: true,
  },
  {
    id: 7,
    name: "3D-принтер Purple Dance P150",
    category: "3D-принтеры",
    price: 320000,
    oldPrice: 380000,
    badge: "SALE",
    inStock: true,
  },
  {
    id: 8,
    name: "Набор фрез imes-icore",
    category: "Фрезы",
    price: 45000,
    inStock: true,
  },
];

export function ShopFeaturedProducts() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Рекомендуемые товары
          </h2>
          <Link
            to="/shop/catalog"
            className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all"
          >
            Весь каталог <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card border border-border rounded-2xl overflow-hidden hover-lift group"
            >
              {/* Image */}
              <div className="relative aspect-square bg-secondary">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Фото товара
                </div>
                {product.badge && (
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${
                      product.badge === "SALE"
                        ? "bg-destructive text-destructive-foreground"
                        : product.badge === "Новинка"
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {product.badge}
                  </div>
                )}
                <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
                  <Heart className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="text-xs text-muted-foreground mb-2">
                  {product.category}
                </div>
                <h3 className="font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors min-h-[2.5rem]">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-primary">
                    {product.price.toLocaleString("ru-RU")} ₽
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {product.oldPrice.toLocaleString("ru-RU")} ₽
                    </span>
                  )}
                </div>
                <Button className="w-full gradient-primary text-primary-foreground">
                  <ShoppingCart className="mr-2 h-4 w-4" />В корзину
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
