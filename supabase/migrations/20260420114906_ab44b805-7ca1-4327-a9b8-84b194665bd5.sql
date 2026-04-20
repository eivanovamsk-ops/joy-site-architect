
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_application_id UUID REFERENCES public.course_applications(id) ON DELETE SET NULL,
  tbank_payment_id TEXT,
  tbank_order_id TEXT NOT NULL UNIQUE,
  amount NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'NEW',
  payment_url TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  course_name TEXT,
  error_code TEXT,
  error_message TEXT,
  raw_response JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_payments_course_application_id ON public.payments(course_application_id);
CREATE INDEX idx_payments_tbank_payment_id ON public.payments(tbank_payment_id);
CREATE INDEX idx_payments_status ON public.payments(status);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Любой может создать запись о платеже (создаётся edge-функцией от имени посетителя)
CREATE POLICY "Anyone can create payment records"
ON public.payments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Только админы могут смотреть платежи
CREATE POLICY "Only admins can view payments"
ON public.payments
FOR SELECT
USING (public.is_admin());

-- Только админы могут обновлять (webhook использует service role и минует RLS)
CREATE POLICY "Only admins can update payments"
ON public.payments
FOR UPDATE
USING (public.is_admin());

-- Только админы могут удалять
CREATE POLICY "Only admins can delete payments"
ON public.payments
FOR DELETE
USING (public.is_admin());

-- Триггер для автообновления updated_at
CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON public.payments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
