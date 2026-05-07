import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, MailX } from "lucide-react";

type Status = "loading" | "valid" | "already" | "invalid" | "confirming" | "done" | "error";

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    fetch(`${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${token}`, {
      headers: { apikey: anonKey },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.valid === false && data.reason === "already_unsubscribed") setStatus("already");
        else if (data.valid) setStatus("valid");
        else setStatus("invalid");
      })
      .catch(() => setStatus("invalid"));
  }, [token]);

  const handleConfirm = async () => {
    setStatus("confirming");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
      if (error) throw error;
      if (data?.success) setStatus("done");
      else if (data?.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center space-y-4">
        {status === "loading" && <><Loader2 className="h-10 w-10 animate-spin mx-auto text-muted-foreground" /><p className="text-muted-foreground">Проверка...</p></>}
        {status === "valid" && (
          <>
            <MailX className="h-12 w-12 mx-auto text-primary" />
            <h1 className="text-xl font-bold">Отписаться от рассылки?</h1>
            <p className="text-muted-foreground">Вы больше не будете получать уведомления на email.</p>
            <Button onClick={handleConfirm} className="w-full" size="lg">Подтвердить отписку</Button>
          </>
        )}
        {status === "confirming" && <><Loader2 className="h-10 w-10 animate-spin mx-auto text-muted-foreground" /><p className="text-muted-foreground">Обработка...</p></>}
        {status === "done" && (
          <>
            <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
            <h1 className="text-xl font-bold">Вы отписаны</h1>
            <p className="text-muted-foreground">Вы больше не будете получать уведомления.</p>
          </>
        )}
        {status === "already" && (
          <>
            <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground" />
            <h1 className="text-xl font-bold">Уже отписаны</h1>
            <p className="text-muted-foreground">Вы уже отписались от рассылки ранее.</p>
          </>
        )}
        {status === "invalid" && (
          <>
            <XCircle className="h-12 w-12 mx-auto text-destructive" />
            <h1 className="text-xl font-bold">Недействительная ссылка</h1>
            <p className="text-muted-foreground">Ссылка для отписки недействительна или устарела.</p>
          </>
        )}
        {status === "error" && (
          <>
            <XCircle className="h-12 w-12 mx-auto text-destructive" />
            <h1 className="text-xl font-bold">Ошибка</h1>
            <p className="text-muted-foreground">Не удалось обработать запрос. Попробуйте позже.</p>
          </>
        )}
      </div>
    </div>
  );
}
