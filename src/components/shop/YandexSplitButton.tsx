import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface YandexSplitButtonProps {
  productId: string;
  productName: string;
  price: number;
}

// IDs товаров, для которых доступен Яндекс Сплит
export const SPLIT_ELIGIBLE_PRODUCTS = ["rundeer-3ds-v5", "rundeer-3ds-v6"];

export const YandexSplitButton = ({ productId, productName, price }: YandexSplitButtonProps) => {
  const [loading, setLoading] = useState(false);

  const monthlyPayment = Math.ceil(price / 4);
  const formatPrice = (p: number) => new Intl.NumberFormat("ru-RU").format(p) + " ₽";

  const handleSplitPayment = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-split-order", {
        body: {
          productId,
          productName,
          price,
          successUrl: `${window.location.origin}/shop/product/${productId}?payment=success`,
          errorUrl: `${window.location.origin}/shop/product/${productId}?payment=error`,
        },
      });

      if (error) throw error;

      if (data?.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error("Не получена ссылка на оплату");
      }
    } catch (err) {
      console.error("Split payment error:", err);
      toast.error("Не удалось создать заказ для оплаты через Сплит. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-border rounded-xl p-4 bg-muted/20">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-semibold">Яндекс Сплит</span>
        <span className="text-xs text-muted-foreground">— оплата частями</span>
      </div>
      <p className="text-sm text-muted-foreground mb-3">
        4 платежа по <span className="font-bold text-foreground">{formatPrice(monthlyPayment)}</span> без переплат
      </p>
      <Button
        onClick={handleSplitPayment}
        disabled={loading}
        className="w-full bg-[hsl(48,100%,50%)] hover:bg-[hsl(48,100%,45%)] text-[hsl(0,0%,10%)] font-semibold"
        size="lg"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
        ) : null}
        {loading ? "Создаём заказ..." : "Оплатить через Сплит"}
      </Button>
    </div>
  );
};
