import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send } from "lucide-react";
import { z } from "zod";

const feedbackSchema = z.object({
  name: z.string().min(2, "Введите ваше имя").max(100),
  email: z.string().email("Введите корректный email").max(255),
  phone: z.string().max(20).optional(),
  message: z.string().min(10, "Сообщение слишком короткое").max(1000),
});

interface ContactFormProps {
  title?: string;
  description?: string;
  notifyEmail?: string;
}

export function ContactForm({ 
  title = "Свяжитесь с нами",
  description = "Заполните форму и мы ответим в ближайшее время",
  notifyEmail,
}: ContactFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = feedbackSchema.safeParse({ name, email, phone, message });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const feedbackId = crypto.randomUUID();
      const { error } = await supabase.from("feedback").insert({
        id: feedbackId,
        name,
        email,
        phone: phone || null,
        message,
      });

      if (error) throw error;

      if (notifyEmail) {
        try {
          await supabase.functions.invoke("send-transactional-email", {
            body: {
              templateName: "feedback-notification",
              recipientEmail: notifyEmail,
              idempotencyKey: `feedback-${feedbackId}`,
              templateData: { name, email, phone: phone || undefined, message },
            },
          });
        } catch (emailError) {
          console.error("Failed to send email notification:", emailError);
        }
      }

      toast({
        title: "Сообщение отправлено!",
        description: "Мы свяжемся с вами в ближайшее время",
      });

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка отправки",
        description: "Попробуйте позже или свяжитесь с нами по телефону",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Имя *</Label>
            <Input
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ваше имя"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email">Email *</Label>
            <Input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-phone">Телефон</Label>
          <Input
            id="contact-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (999) 123-45-67"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-message">Сообщение *</Label>
          <Textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ваш вопрос или сообщение..."
            rows={4}
            className={errors.message ? "border-destructive" : ""}
          />
          {errors.message && (
            <p className="text-sm text-destructive">{errors.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full gradient-primary text-primary-foreground"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          Отправить сообщение
        </Button>
      </form>
    </div>
  );
}
