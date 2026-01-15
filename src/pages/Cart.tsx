import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { z } from "zod";

const checkoutSchema = z.object({
  shippingName: z.string().min(2, "Введите имя получателя").max(100),
  shippingPhone: z.string().min(10, "Введите корректный телефон").max(20),
  shippingAddress: z.string().min(10, "Введите полный адрес доставки").max(500),
  notes: z.string().max(500).optional(),
});

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isCheckout, setIsCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shippingName, setShippingName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!user) {
      toast({
        variant: "destructive",
        title: "Необходима авторизация",
        description: "Войдите в аккаунт для оформления заказа",
      });
      navigate("/auth");
      return;
    }

    const result = checkoutSchema.safeParse({
      shippingName,
      shippingPhone,
      shippingAddress,
      notes,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_amount: totalPrice,
          shipping_name: shippingName,
          shipping_phone: shippingPhone,
          shipping_address: shippingAddress,
          notes: notes || null,
          status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_slug: item.slug,
        product_name: item.name,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();
      toast({
        title: "Заказ оформлен!",
        description: "Мы свяжемся с вами для подтверждения",
      });
      navigate("/profile");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка оформления",
        description: error.message || "Попробуйте позже",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-6" />
          <h1 className="text-2xl font-bold mb-2">Корзина пуста</h1>
          <p className="text-muted-foreground mb-6">
            Добавьте товары из каталога
          </p>
          <Button asChild className="gradient-primary text-primary-foreground">
            <Link to="/shop">Перейти в магазин</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Корзина</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.slug}
                  className="flex gap-4 p-4 bg-card border border-border rounded-xl"
                >
                  <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <Link
                      to={`/shop/product/${item.slug}`}
                      className="font-medium hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <div className="text-lg font-bold mt-1">
                      {formatPrice(item.price)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.slug, item.quantity - 1)}
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
                      onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => removeItem(item.slug)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary / Checkout */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-32">
                <h2 className="text-xl font-bold mb-4">Итого</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Товаров</span>
                    <span>{items.reduce((sum, i) => sum + i.quantity, 0)} шт.</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Сумма</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {!isCheckout ? (
                  <Button
                    className="w-full gradient-primary text-primary-foreground"
                    onClick={() => {
                      if (!user) {
                        toast({
                          title: "Авторизация",
                          description: "Войдите для оформления заказа",
                        });
                        navigate("/auth");
                      } else {
                        setIsCheckout(true);
                      }
                    }}
                  >
                    Оформить заказ
                  </Button>
                ) : (
                  <form onSubmit={handleCheckout} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Имя получателя</Label>
                      <Input
                        value={shippingName}
                        onChange={(e) => setShippingName(e.target.value)}
                        placeholder="Иван Иванов"
                        className={errors.shippingName ? "border-destructive" : ""}
                      />
                      {errors.shippingName && (
                        <p className="text-sm text-destructive">{errors.shippingName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Телефон</Label>
                      <Input
                        value={shippingPhone}
                        onChange={(e) => setShippingPhone(e.target.value)}
                        placeholder="+7 (999) 123-45-67"
                        className={errors.shippingPhone ? "border-destructive" : ""}
                      />
                      {errors.shippingPhone && (
                        <p className="text-sm text-destructive">{errors.shippingPhone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Адрес доставки</Label>
                      <Textarea
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Город, улица, дом, квартира"
                        className={errors.shippingAddress ? "border-destructive" : ""}
                      />
                      {errors.shippingAddress && (
                        <p className="text-sm text-destructive">{errors.shippingAddress}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Комментарий (необязательно)</Label>
                      <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Пожелания к заказу"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setIsCheckout(false)}
                      >
                        Назад
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 gradient-primary text-primary-foreground"
                        disabled={isLoading}
                      >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Заказать
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
