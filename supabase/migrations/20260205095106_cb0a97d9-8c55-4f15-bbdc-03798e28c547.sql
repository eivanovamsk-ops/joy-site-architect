-- Drop existing insert policy
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;

-- Create new policy that allows both authenticated users and guests
CREATE POLICY "Users can create orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  -- Authenticated user creating their own order
  (auth.uid() IS NOT NULL AND user_id = auth.uid() AND (is_guest_order = false OR is_guest_order IS NULL))
  OR
  -- Guest creating order without auth
  (is_guest_order = true AND user_id IS NULL)
);

-- Also need to allow anonymous users to insert order_items for guest orders
DROP POLICY IF EXISTS "Users can add items to own orders" ON public.order_items;

CREATE POLICY "Users can add items to orders" 
ON public.order_items 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND (orders.user_id = auth.uid() OR orders.is_guest_order = true)
  )
);