import { Link } from "react-router-dom";
import { CheckCircle2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RouteSeo } from "@/components/seo/RouteSeo";

export default function PaymentSuccess() {
  return (
    <>
      <RouteSeo />
      <main className="min-h-[70vh] flex items-center justify-center bg-background py-16 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Оплата прошла успешно</h1>
          <p className="text-muted-foreground mb-2">
            Спасибо! Мы получили вашу оплату за участие в курсе.
          </p>
          <p className="text-muted-foreground mb-8 text-sm">
            В ближайшее время мы свяжемся с вами для подтверждения участия и отправки
            организационных деталей. Чек об оплате придёт на указанный email.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/education">
              <Button size="lg" className="w-full sm:w-auto gradient-primary text-primary-foreground">
                <GraduationCap className="mr-2 h-4 w-4" />
                Все курсы
              </Button>
            </Link>
            <Link to="/education/contacts">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Контакты
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
