import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/hooks/useCart";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemsProps {
  items: CartItem[];
  onUpdateQuantity: (slug: string, quantity: number) => void;
  onRemove: (slug: string) => void;
}

export function CartItems({ items, onUpdateQuantity, onRemove }: CartItemsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.slug}
          className="flex gap-4 p-4 bg-card border border-border rounded-xl"
        >
          <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <Link
              to={`/shop/product/${item.slug}`}
              className="font-medium hover:text-primary line-clamp-2"
            >
              {item.name}
            </Link>
            <div className="text-lg font-bold mt-1">
              {formatPrice(item.price)}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(item.slug, item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(item.slug, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive"
              onClick={() => onRemove(item.slug)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
