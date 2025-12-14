import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export function EducationCTASection() {
  return (
    <section className="py-16 gradient-education">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-education-foreground mb-4">
          Подпишитесь на рассылку
        </h2>
        <p className="text-education-foreground/80 mb-8 max-w-xl mx-auto">
          Получайте информацию о новых курсах, мастер-классах и специальных
          предложениях первыми
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="email" 
              placeholder="Ваш email" 
              className="pl-10 bg-background border-background"
            />
          </div>
          <Button className="bg-foreground text-background hover:bg-foreground/90">
            Подписаться
          </Button>
        </div>
      </div>
    </section>
  );
}
