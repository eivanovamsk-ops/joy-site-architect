-- Drop and recreate policies with explicit role targeting

-- Drop the current policy
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;

-- Create policy for authenticated users creating their own orders
CREATE POLICY "Authenticated users can create own orders" 
ON public.orders 
FOR INSERT 
TO authenticated
WITH CHECK (
  user_id = auth.uid() 
  AND (is_guest_order = false OR is_guest_order IS NULL)
);

-- Create policy for guest orders (accessible by anon role)
CREATE POLICY "Anyone can create guest orders" 
ON public.orders 
FOR INSERT 
TO anon, authenticated
WITH CHECK (
  is_guest_order = true 
  AND user_id IS NULL
  AND guest_email IS NOT NULL
);