-- Create a security definer helper to validate whether the current caller can add items to an order.
-- This avoids relying on SELECT visibility of orders under RLS for anon callers.
CREATE OR REPLACE FUNCTION public.can_add_order_items(_order_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.orders o
    WHERE o.id = _order_id
      AND (
        -- Owner adding items to their own authenticated order
        (auth.uid() IS NOT NULL AND o.user_id IS NOT NULL AND o.user_id = auth.uid())
        OR
        -- Guest order: allow adding items (order id is a random UUID; not enumerable)
        (o.is_guest_order = true AND o.user_id IS NULL)
        OR
        -- Admin override
        public.is_admin()
      )
  )
$$;

-- Replace the INSERT policy on order_items to use the helper
DROP POLICY IF EXISTS "Users can add items to orders" ON public.order_items;

CREATE POLICY "Users can add items to orders"
ON public.order_items
FOR INSERT
TO anon, authenticated
WITH CHECK (public.can_add_order_items(order_id));