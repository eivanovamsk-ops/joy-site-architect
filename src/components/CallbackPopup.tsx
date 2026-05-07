import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Phone } from "lucide-react";
import { safeLocalStorage } from "@/lib/safeStorage";

const POPUP_DISMISSED_KEY = "callback_popup_dismissed";
const DISMISS_HOURS = 24;

export function CallbackPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const wasDismissedRecently = useCallback(() => {
    const ts = safeLocalStorage.getItem(POPUP_DISMISSED_KEY);
    if (!ts) return false;
    return Date.now() - Number(ts) < DISMISS_HOURS * 60 * 60 * 1000;
  }, []);

  const showPopup = useCallback(() => {
    if (wasDismissedRecently() || submitted) return;
    setOpen(true);
  }, [wasDismissedRecently, submitted]);

  useEffect(() => {
    if (wasDismissedRecently()) return;

    const handleScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (window.scrollY > 400 && scrolled >= total * 0.75) {
        showPopup();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showPopup, wasDismissedRecently]);

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      safeLocalStorage.setItem(POPUP_DISMISSED_KEY, String(Date.now()));
    }
    setOpen(isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Пожалуйста, заполните все поля");
      return;
    }

    setSubmitting(true);
    const requestId = crypto.randomUUID();
    try {
      const { error } = await supabase
        .from("callback_requests" as any)
        .insert({ id: requestId, name: name.trim(), phone: phone.trim(), source: "popup" } as any);

      if (error) throw error;

      supabase.functions
        .invoke("send-transactional-email", {
          body: {
            templateName: "callback-notification",
            recipientEmail: "moscow@articon.pro",
            idempotencyKey: `callback-${requestId}`,
            templateData: { name: name.trim(), phone: phone.trim(), source: "popup" },
          },
        })
        .catch((err) => console.error("Email send error:", err));

      setSubmitted(true);
      toast.success("Спасибо! Менеджер свяжется с вами в ближайшее время.");
      safeLocalStorage.setItem(POPUP_DISMISSED_KEY, String(Date.now()));
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Произошла ошибка. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Подберём решение для вас
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground pt-2">
            Подберем для вас идеальное решение по оборудованию и материалам — менеджер свяжется в ближайшее время.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="cb-name">Имя</Label>
            <Input
              id="cb-name"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cb-phone">Телефон</Label>
            <Input
              id="cb-phone"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              maxLength={20}
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={submitting}>
            {submitting ? "Отправка..." : "Свяжитесь со мной"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
