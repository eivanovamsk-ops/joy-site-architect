import { Link } from "react-router-dom";
import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RouteSeo } from "@/components/seo/RouteSeo";

export default function PaymentFailed() {
  return (
    <>
      <RouteSeo />
      <main className="min-h-[70vh] flex items-center justify-center bg-background py-16 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
            <XCircle className="w-12 h-12 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Оплата не прошла</h1>
          <p className="text-muted-foreground mb-2">
            К сожалению, платёж не был завершён.
          </p>
          <p className="text-muted-foreground mb-8 text-sm">
            Возможные причины: недостаточно средств, отказ банка или отмена операции.
            Ваша заявка сохранена — вы можете попробовать оплатить позже или связаться
            с нами для оплаты по счёту.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/education">
              <Button size="lg" className="w-full sm:w-auto gradient-primary text-primary-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Вернуться к курсам
              </Button>
            </Link>
            <Link to="/education/contacts">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Связаться с нами
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
