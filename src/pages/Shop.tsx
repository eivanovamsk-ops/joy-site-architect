import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Truck, Headphones, BadgePercent, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const categories = [{
  name: "SALE",
  icon: BadgePercent,
  color: "destructive"
}, {
  name: "3D-сканеры",
  icon: null,
  count: 24
}, {
  name: "3D-принтеры",
  icon: null,
  count: 18
}, {
  name: "Фрезерные станки",
  icon: null,
  count: 12
}, {
  name: "Фрезы",
  icon: null,
  count: 85
}, {
  name: "Циркониевые диски",
  icon: null,
  count: 45
}, {
  name: "Фотополимеры",
  icon: null,
  count: 62
}, {
  name: "Краски и глазурь",
  icon: null,
  count: 38
}];
const featuredProducts = [{
  id: 1,
  name: "Интраоральный сканер Runyes 3DS V5",
  category: "3D-сканеры",
  price: 450000,
  oldPrice: 520000,
  image: null,
  badge: "Хит продаж"
}, {
  id: 2,
  name: "3D-принтер Asiga MAX UV",
  category: "3D-принтеры",
  price: 850000,
  image: null,
  badge: "Новинка"
}, {
  id: 3,
  name: "Фрезерный станок CORiTEC 350i",
  category: "Фрезерные станки",
  price: 1250000,
  image: null
}, {
  id: 4,
  name: "Циркониевый диск Upcera 98x18мм",
  category: "Циркониевые диски",
  price: 12500,
  oldPrice: 14000,
  image: null,
  badge: "SALE"
}];
const advantages = [{
  icon: Truck,
  title: "Доставка по всей России",
  description: "Отправка большинства заказов в тот же день"
}, {
  icon: Headphones,
  title: "Техническая поддержка",
  description: "Гарантия качества и полная поддержка"
}, {
  icon: BadgePercent,
  title: "Лучшая цена",
  description: "Конкурентные цены на все товары"
}];
const Shop = () => {
  return <Layout>
      {/* Hero Banner */}
      <section className="relative py-16 lg:py-24 gradient-accent overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-accent-foreground/20 text-accent-foreground text-sm font-medium mb-6">
                CYBER WEEK DEAL!
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-foreground mb-6">
                Скидка 10% на все 3D-принтеры Asiga
              </h1>
              <p className="text-xl text-accent-foreground/80 mb-8">
                Используйте код CyberWeek10 при оформлении заказа
              </p>
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                Купить сейчас
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="hidden lg:block">
              {/* Placeholder for product image */}
              <div className="w-full aspect-square rounded-3xl bg-accent-foreground/10 flex items-center justify-center">
                <span className="text-accent-foreground/40 text-lg">
                  Изображение продукта
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      

      {/* Categories */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Категории товаров</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category, index) => <Link key={index} to="/shop/catalog" className={`bg-card border border-border rounded-xl p-4 text-center hover-lift ${category.color === "destructive" ? "border-destructive" : ""}`}>
                <div className={`text-sm font-medium ${category.color === "destructive" ? "text-destructive" : "text-foreground"}`}>
                  {category.name}
                </div>
                {category.count && <div className="text-xs text-muted-foreground mt-1">
                    {category.count} товаров
                  </div>}
              </Link>)}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              Рекомендуемые товары
            </h2>
            <Link to="/shop/catalog" className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all">
              Весь каталог <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => <div key={product.id} className="bg-card border border-border rounded-2xl overflow-hidden hover-lift group">
                {/* Image */}
                <div className="relative aspect-square bg-secondary">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Фото товара
                  </div>
                  {product.badge && <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${product.badge === "SALE" ? "bg-destructive text-destructive-foreground" : product.badge === "Новинка" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
                      {product.badge}
                    </div>}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="text-xs text-muted-foreground mb-2">
                    {product.category}
                  </div>
                  <h3 className="font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-primary">
                      {product.price.toLocaleString("ru-RU")} ₽
                    </span>
                    {product.oldPrice && <span className="text-sm text-muted-foreground line-through">
                        {product.oldPrice.toLocaleString("ru-RU")} ₽
                      </span>}
                  </div>
                  <Button className="w-full gradient-primary text-primary-foreground">
                    <ShoppingCart className="mr-2 h-4 w-4" />В корзину
                  </Button>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return <div key={index} className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{advantage.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {advantage.description}
                    </p>
                  </div>
                </div>;
          })}
          </div>
        </div>
      </section>
    </Layout>;
};
export default Shop;