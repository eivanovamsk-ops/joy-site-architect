import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { User, UserX } from "lucide-react";

interface CartSummaryProps {
  items: CartItem[];
  totalPrice: number;
  onCheckout: (isGuest: boolean) => void;
}

export function CartSummary({ items, totalPrice, onCheckout }: CartSummaryProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  const handleAuthCheckout = () => {
    if (!user) {
      toast({
        title: "Авторизация",
        description: "Войдите или зарегистрируйтесь для оформления заказа",
      });
      navigate("/auth");
    } else {
      onCheckout(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 sticky top-32">
      <h2 className="text-xl font-bold mb-4">Итого</h2>
      
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Товаров</span>
          <span>{items.reduce((sum, i) => sum + i.quantity, 0)} шт.</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Сумма</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          className="w-full gradient-primary text-primary-foreground"
          onClick={handleAuthCheckout}
        >
          <User className="mr-2 h-4 w-4" />
          {user ? "Оформить заказ" : "Войти и оформить"}
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">или</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => onCheckout(true)}
        >
          <UserX className="mr-2 h-4 w-4" />
          Быстрый заказ без регистрации
        </Button>
      </div>

      {!user && (
        <p className="mt-4 text-xs text-center text-muted-foreground">
          <Link to="/auth" className="text-primary hover:underline">
            Зарегистрируйтесь
          </Link>
          , чтобы отслеживать заказы в личном кабинете
        </p>
      )}
    </div>
  );
}
