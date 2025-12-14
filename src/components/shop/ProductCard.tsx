import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  return (
    <Card className="group overflow-hidden border-border/50 bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
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
        </div>

        {/* Quick actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link to={`/shop/product/${product.id}`}>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full shadow-md"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
          {product.brand}
        </div>
        
        <h3 className="font-medium text-sm leading-tight mb-3 line-clamp-2 min-h-[2.5rem] text-foreground">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="font-bold text-lg text-foreground">
            {product.price ? formatPrice(product.price) : "По запросу"}
          </div>
          
          <Button
            size="sm"
            className="h-9 px-3 bg-primary hover:bg-primary/90"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {product.price ? "В корзину" : "Запросить"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
