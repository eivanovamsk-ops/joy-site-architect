import { Button } from "@/components/ui/button";
import { FileText, Truck, Handshake } from "lucide-react";
import { Link } from "react-router-dom";

export function LaboratoryCTASection() {
  return (
    <section className="py-16 gradient-lab">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-lab-foreground mb-6">
          Готовы начать сотрудничество?
        </h2>
        <p className="text-lab-foreground/80 mb-8 max-w-xl mx-auto">
          Свяжитесь с нами, и мы поможем вам с любыми вопросами
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8"
          >
            <a href="https://t.me/articonrazvitie" target="_blank" rel="noopener noreferrer">
              <Handshake className="mr-2 h-5 w-5" />
              Начать сотрудничество
            </a>
          </Button>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
            <Link to="/laboratory/documents">
              <FileText className="mr-2 h-5 w-5" />
              Прайс-листы
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
          >
            <a href="https://t.me/articon1" target="_blank" rel="noopener noreferrer">
              <Truck className="mr-2 h-5 w-5" />
              Вызвать курьера
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
