import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Loader2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function EducationCTASection() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast({ variant: "destructive", title: "Введите корректный email" });
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("subscribe-unisender", {
        body: { email: email.trim() },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setIsSubscribed(true);
      setEmail("");
      toast({ title: "Вы подписаны!", description: "Спасибо за подписку на рассылку" });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Ошибка подписки", description: "Попробуйте позже" });
    } finally {
      setIsLoading(false);
    }
  };

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
        {isSubscribed ? (
          <div className="flex items-center justify-center gap-2 text-education-foreground">
            <Check className="h-5 w-5" />
            <span>Вы подписаны на рассылку!</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-background border-background"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="bg-foreground text-background hover:bg-foreground/90"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Подписаться
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
