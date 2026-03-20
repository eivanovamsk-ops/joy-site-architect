import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface BundleRequestFormProps {
  triggerClassName?: string;
  triggerSize?: "default" | "sm" | "lg" | "icon";
}

const BundleRequestForm = ({ triggerClassName, triggerSize = "lg" }: BundleRequestFormProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast.error("Пожалуйста, заполните все поля");
      return;
    }

    setSubmitting(true);

    try {
      // Save to DB
      const { data, error } = await supabase
        .from("bundle_requests" as any)
        .insert({ name: name.trim(), phone: phone.trim() } as any)
        .select("id")
        .single();

      if (error) throw error;

      // Send email notification to marketing
      supabase.functions.invoke("send-email-unisender", {
        body: { type: "bundle_request", bundleRequestId: (data as any).id },
      }).catch((err) => console.error("Email send error:", err));

      // Also push to Jivo if available
      if (window.jivo_api) {
        window.jivo_api.setContactInfo({ name: name.trim(), phone: phone.trim() });
        window.jivo_api.open();
        window.jivo_api.sendMessage({
          text: `Запрос стоимости CAD/CAM-комплекта UPCERA\nИмя: ${name.trim()}\nТелефон: ${phone.trim()}`,
        });
      }

      toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
      setName("");
      setPhone("");
      setOpen(false);
    } catch {
      toast.error("Произошла ошибка. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={triggerSize} className={triggerClassName}>
          Запросить стоимость комплекта
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Запросить стоимость комплекта</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="bundle-name">Имя</Label>
            <Input
              id="bundle-name"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bundle-phone">Телефон</Label>
            <Input
              id="bundle-phone"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              maxLength={20}
            />
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Отправка..." : "Отправить заявку"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BundleRequestForm;
