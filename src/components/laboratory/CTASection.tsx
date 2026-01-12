import { Button } from "@/components/ui/button";
import { FileText, Truck, MessageCircle } from "lucide-react";

export function LaboratoryCTASection() {
  return (
    <section className="py-16 gradient-lab">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-lab-foreground mb-6">
          Готовы сделать заказ?
        </h2>
        <p className="text-lab-foreground/80 mb-8 max-w-xl mx-auto">
          Свяжитесь с нами, и мы поможем вам с любыми вопросами
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-background text-lab hover:bg-background/90">
            <FileText className="mr-2 h-5 w-5" />
            Прайс-листы
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-lab-foreground/30 text-lab-foreground hover:bg-lab-foreground/10"
          >
            <a href="https://t.me/articon1" target="_blank" rel="noopener noreferrer">
              <Truck className="mr-2 h-5 w-5" />
              Вызвать курьера
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-lab-foreground/30 text-lab-foreground hover:bg-lab-foreground/10"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Связаться с нами
          </Button>
        </div>
      </div>
    </section>
  );
}
