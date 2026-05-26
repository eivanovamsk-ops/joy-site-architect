import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Loader2, CreditCard } from "lucide-react";
import { useState } from "react";

interface ThankYouState {
  applicationId?: string;
  courseName?: string;
  coursePrice?: number;
  customerEmail?: string;
  customerPhone?: string;
  customerName?: string;
  paymentType?: string;
}

const CourseThankYou = () => {
  const location = useLocation();
  const { toast } = useToast();
  const state = (location.state as ThankYouState) || {};
  const [isPayLoading, setIsPayLoading] = useState(false);

  // Оплата через Т-Банк временно отключена
  const needsPayment = false;

  const handlePay = async () => {
    if (!state.applicationId || !state.coursePrice) return;
    setIsPayLoading(true);

    try {
      const { data, error: payError } = await supabase.functions.invoke(
        "tbank-init-payment",
        {
          body: {
            courseApplicationId: state.applicationId,
            courseName: state.courseName,
            amount: state.coursePrice,
            customerEmail: state.customerEmail,
            customerPhone: state.customerPhone,
            customerName: state.customerName,
            successUrl: `${window.location.origin}/education/payment-success`,
            failUrl: `${window.location.origin}/education/payment-failed`,
          },
        },
      );

      if (payError) throw payError;

      if (data?.paymentUrl) {
        window.location.href = data.paymentUrl;
        return;
      }
      throw new Error("Не получена ссылка на оплату");
    } catch (err) {
      console.error("Payment init failed:", err);
      toast({
        variant: "destructive",
        title: "Не удалось перейти к оплате",
        description: "Попробуйте позже или свяжитесь с нами.",
      });
    } finally {
      setIsPayLoading(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Спасибо за регистрацию | Артикон</title>
      </Helmet>

      <section className="min-h-[70vh] flex items-center justify-center py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-accent" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6">Спасибо, что выбрали Артикон!</h1>

            <p className="text-lg text-muted-foreground mb-2">
              Подтверждение регистрации придет вам на почту.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Куратор Учебного центра свяжется с вами в ближайшее время для уточнения деталей.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Если вы не увидели письмо на почте, пожалуйста, проверьте папку СПАМ
            </p>

            {needsPayment && (
              <div className="mb-10 p-6 rounded-2xl border border-border bg-card">
                <p className="text-muted-foreground mb-4">
                  Курс <strong className="text-foreground">«{state.courseName}»</strong>
                </p>
                <p className="text-3xl font-bold text-accent mb-6">
                  {state.coursePrice?.toLocaleString("ru-RU")} ₽
                </p>
                <Button
                  size="lg"
                  onClick={handlePay}
                  disabled={isPayLoading}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-6 rounded-xl font-bold"
                >
                  {isPayLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <CreditCard className="mr-2 h-5 w-5" />
                  )}
                  Оплатить
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  После оплаты вы получите подтверждение на почту
                </p>
              </div>
            )}

            <div className="border-t border-border pt-8">
              <p className="text-lg font-semibold mb-4">
                Подписывайся и будь в курсе новостей Артикон!
              </p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://t.me/articon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[hsl(200,80%,50%)] hover:bg-[hsl(200,80%,45%)] text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Telegram
                </a>
                <a
                  href="https://max.ru/id7725752561_biz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[hsl(210,70%,50%)] hover:bg-[hsl(210,70%,45%)] text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="7" cy="12" r="3" />
                    <circle cx="17" cy="12" r="3" />
                  </svg>
                  Max
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CourseThankYou;
