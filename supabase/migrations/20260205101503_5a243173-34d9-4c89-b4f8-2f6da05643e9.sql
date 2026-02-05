-- Update delivery_method constraint to match frontend values
ALTER TABLE public.orders DROP CONSTRAINT orders_delivery_method_check;

ALTER TABLE public.orders ADD CONSTRAINT orders_delivery_method_check 
CHECK (delivery_method = ANY (ARRAY['moscow_delivery'::text, 'russia_delivery'::text, 'pickup'::text, 'delivery'::text]));

-- Update payment_type constraint to match frontend values
ALTER TABLE public.orders DROP CONSTRAINT orders_payment_type_check;

ALTER TABLE public.orders ADD CONSTRAINT orders_payment_type_check 
CHECK (payment_type = ANY (ARRAY['private_cash'::text, 'private_transfer'::text, 'company'::text, 'private_card'::text]));