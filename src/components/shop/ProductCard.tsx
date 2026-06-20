import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { SPLIT_ELIGIBLE_PRODUCTS } from "./YandexSplitButton";

interface ProductCardProps {
  product: Product;
  showPromo?: boolean;
}


export const ProductCard = ({ product, showPromo }: ProductCardProps) => {
  const { addItem } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.price) {
      // Redirect to Telegram for products without price
      window.open("https://t.me/articondental_bot", "_blank");
      return;
    }

    addItem({
      slug: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    
    toast.success("Товар добавлен в корзину", {
      description: product.name,
    });
  };

  return (
    <Link to={`/shop/product/${product.id}`} className="block">
      <Card className="group overflow-hidden border-border/50 bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {showPromo && product.inStock && (
              <Badge className="bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1">
                АКЦИЯ
              </Badge>
            )}
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground text-xs">
                NEW
              </Badge>
            )}
            {product.isSale && (
              <Badge className="bg-accent text-accent-foreground text-xs">
                SALE
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="destructive" className="text-xs">
                Нет в наличии
              </Badge>
            )}
          </div>


          {/* Quick actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full shadow-md"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide flex items-center gap-1.5">
            {product.brand}
            {product.brand === "Upcera" && (
              <Link
                to="/shop/brands/upcera"
                onClick={(e) => e.stopPropagation()}
                className="text-primary hover:underline normal-case tracking-normal"
              >
                О бренде
              </Link>
            )}
          </div>
          
          {product.shortDescription && (
            <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
              {product.shortDescription}
            </p>
          )}
          
          <h3 className="font-medium text-sm leading-tight mb-3 line-clamp-2 min-h-[2.5rem] text-foreground">
            {product.name}
          </h3>

          {product.price && SPLIT_ELIGIBLE_PRODUCTS.includes(product.id) && (
            <div className="flex items-center gap-1.5 mb-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[hsl(48,100%,50%)] text-[hsl(0,0%,10%)] font-bold text-[9px] leading-none">С</span>
              <span>{formatPrice(Math.ceil(product.price / 4))}</span>
              <span>в Сплит</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            {product.inStock ? (
              <>
                <div className="font-bold text-lg text-foreground">
                  {product.price ? formatPrice(product.price) : "По запросу"}
                </div>
                <Button
                  size="sm"
                  className="h-9 px-3 bg-primary hover:bg-primary/90"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  {product.price ? "В корзину" : "Запросить"}
                </Button>
              </>
            ) : (
              <div className="text-xs text-primary font-medium px-3 py-1.5 border border-primary rounded-lg">
                Выбрать
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
