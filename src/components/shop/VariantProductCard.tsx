import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal } from "lucide-react";
import { VariantProduct } from "@/data/variantProducts";

interface VariantProductCardProps {
  product: VariantProduct;
}

export const VariantProductCard = ({ product }: VariantProductCardProps) => {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ru-RU").format(price) + " ₽";

  const heights = [...new Set(product.variants.map((v) => v.height))].sort((a, b) => a - b);
  const shades = [...new Set(product.variants.map((v) => v.shade))];

  return (
    <Link to={`/shop/variant/${product.id}`} className="block">
      <Card className="group overflow-hidden border-border/50 bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground text-xs">Мультислой</Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
            {product.brand}
          </div>

          <h3 className="font-medium text-sm leading-tight mb-2 line-clamp-2 min-h-[2.5rem] text-foreground">
            {product.name}
          </h3>

          {/* Variant hints */}
          <div className="flex items-center gap-1.5 mb-3 text-xs text-muted-foreground">
            <SlidersHorizontal className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{heights.length} высот · {shades.length} оттенков</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">от</div>
              <div className="font-bold text-lg text-foreground">
                {formatPrice(product.basePrice)}
              </div>
            </div>
            <div className="text-xs text-primary font-medium px-3 py-1.5 border border-primary rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              Выбрать
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
