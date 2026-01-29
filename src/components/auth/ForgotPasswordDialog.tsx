import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { Loader2, Mail, CheckCircle } from "lucide-react";

const emailSchema = z.string().email("Введите корректный email");

interface ForgotPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ForgotPasswordDialog({ open, onOpenChange }: ForgotPasswordDialogProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = emailSchema.safeParse(email);
      if (!result.success) {
        setError(result.error.errors[0].message);
        setIsLoading(false);
        return;
      }

      const redirectUrl = `${window.location.origin}/reset-password`;

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (resetError) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: resetError.message,
        });
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Произошла непредвиденная ошибка",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    setIsSuccess(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {isSuccess ? (
          <div className="text-center py-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <DialogHeader>
              <DialogTitle className="text-center">Проверьте почту</DialogTitle>
              <DialogDescription className="text-center">
                Мы отправили ссылку для восстановления пароля на адрес{" "}
                <span className="font-medium text-foreground">{email}</span>
              </DialogDescription>
            </DialogHeader>
            <p className="text-sm text-muted-foreground mt-4">
              Если письмо не пришло, проверьте папку «Спам»
            </p>
            <Button onClick={handleClose} className="mt-6 gradient-primary">
              Закрыть
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Восстановление пароля</DialogTitle>
              <DialogDescription>
                Введите email, указанный при регистрации. Мы отправим вам ссылку для сброса пароля.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 ${error ? "border-destructive" : ""}`}
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                >
                  Отмена
                </Button>
                <Button
                  type="submit"
                  className="flex-1 gradient-primary text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Отправить
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
