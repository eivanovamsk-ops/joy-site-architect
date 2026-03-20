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

interface BundleRequestFormProps {
  triggerClassName?: string;
  triggerSize?: "default" | "sm" | "lg" | "icon";
}

const BundleRequestForm = ({ triggerClassName, triggerSize = "lg" }: BundleRequestFormProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast.error("Пожалуйста, заполните все поля");
      return;
    }

    setSubmitting(true);

    try {
      if (window.jivo_api) {
        window.jivo_api.setContactInfo({ name: name.trim(), phone: phone.trim() });
        window.jivo_api.open();
        window.jivo_api.sendMessage({
          text: `Запрос стоимости CAD/CAM-комплекта UPCERA\nИмя: ${name.trim()}\nТелефон: ${phone.trim()}`,
        });
      } else {
        // Fallback: try clicking Jivo launcher
        const launcher = document.querySelector<HTMLElement>("jdiv[class*='button']");
        if (launcher) launcher.click();
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
