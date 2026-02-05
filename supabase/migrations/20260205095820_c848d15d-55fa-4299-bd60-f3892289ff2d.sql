-- Drop and recreate the SELECT policy with proper guest order protection
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;

-- Recreate with explicit restriction:
-- 1. Authenticated users can only see their OWN orders (user_id matches)
-- 2. Admins can see ALL orders (including guest orders)
-- 3. Guest orders (user_id IS NULL) are ONLY visible to admins
CREATE POLICY "Users can view own orders" 
ON public.orders 
FOR SELECT 
TO authenticated
USING (
  -- Admin can see everything
  is_admin()
  OR
  -- Regular users can only see their own orders (not guest orders)
  (user_id IS NOT NULL AND user_id = auth.uid())
);