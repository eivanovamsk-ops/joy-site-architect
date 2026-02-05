-- Drop and recreate the INSERT policy with explicit anon support
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;

-- Create new policy that explicitly handles both authenticated and anonymous users
CREATE POLICY "Users can create orders" 
ON public.orders 
FOR INSERT 
TO public
WITH CHECK (
  -- Case 1: Authenticated user creating their own order (not guest)
  (
    auth.uid() IS NOT NULL 
    AND user_id = auth.uid() 
    AND (is_guest_order = false OR is_guest_order IS NULL)
  )
  OR
  -- Case 2: Guest order (anonymous or authenticated user placing guest order)
  (
    is_guest_order = true 
    AND user_id IS NULL
    AND guest_email IS NOT NULL
  )
);