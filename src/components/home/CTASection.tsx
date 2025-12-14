import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-foreground text-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Готовы начать работу с{" "}
            <span className="text-accent">Артикон?</span>
          </h2>
          <p className="text-lg text-background/70 mb-10 max-w-2xl mx-auto">
            Свяжитесь с нами, и мы поможем вам выбрать оптимальное решение для
            вашей клиники или лаборатории.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="gradient-accent text-accent-foreground px-8 py-6 text-lg hover:opacity-90 transition-opacity"
            >
              <Link to="/contacts">
                Связаться с нами
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-background/30 text-background hover:bg-background/10 px-8 py-6 text-lg"
            >
              <a
                href="https://t.me/articondental_bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send className="mr-2 h-5 w-5" />
                Telegram-бот
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
