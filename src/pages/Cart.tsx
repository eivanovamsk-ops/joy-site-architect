import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { CartItems } from "@/components/cart/CartItems";
import { CartSummary } from "@/components/cart/CartSummary";
import { CheckoutForm } from "@/components/cart/CheckoutForm";

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const [checkoutMode, setCheckoutMode] = useState<"cart" | "checkout">("cart");
  const [isGuestCheckout, setIsGuestCheckout] = useState(false);

  const handleStartCheckout = (isGuest: boolean) => {
    setIsGuestCheckout(isGuest);
    setCheckoutMode("checkout");
  };

  const handleBackToCart = () => {
    setCheckoutMode("cart");
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
          <div className="flex items-center gap-4 mb-8">
            {checkoutMode === "checkout" && (
              <Button variant="ghost" size="icon" onClick={handleBackToCart}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <h1 className="text-3xl font-bold">
              {checkoutMode === "cart" ? "Корзина" : "Оформление заказа"}
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Items or Checkout Form */}
            <div className="lg:col-span-2">
              {checkoutMode === "cart" ? (
                <CartItems 
                  items={items}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ) : (
                <div className="bg-card border border-border rounded-xl p-6">
                  <CheckoutForm
                    items={items}
                    totalPrice={totalPrice}
                    isGuest={isGuestCheckout}
                    onBack={handleBackToCart}
                  />
                </div>
              )}
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              {checkoutMode === "cart" ? (
                <CartSummary 
                  items={items}
                  totalPrice={totalPrice}
                  onCheckout={handleStartCheckout}
                />
              ) : (
                <div className="bg-card border border-border rounded-xl p-6 sticky top-32">
                  <h2 className="text-lg font-bold mb-4">Ваш заказ</h2>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.slug} className="flex gap-3 text-sm">
                        <div className="w-12 h-12 bg-muted rounded flex-shrink-0 overflow-hidden">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="line-clamp-2">{item.name}</p>
                          <p className="text-muted-foreground">
                            {item.quantity} × {new Intl.NumberFormat("ru-RU").format(item.price)} ₽
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-4 pt-4 flex justify-between text-lg font-bold">
                    <span>Итого</span>
                    <span>{new Intl.NumberFormat("ru-RU").format(totalPrice)} ₽</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
