-- Drop and recreate the SELECT policy to ensure it's correctly configured
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;

-- Recreate with explicit restriction: only order owner OR admin can view
CREATE POLICY "Users can view own orders" 
ON public.orders 
FOR SELECT 
TO authenticated
USING (user_id = auth.uid() OR is_admin());

-- Also ensure anonymous users cannot read orders at all
-- The 'TO authenticated' clause above already handles this, 
-- but let's be explicit by not having any policy for anon role