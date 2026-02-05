-- Add UPDATE and DELETE policies for order_items (admin only)
CREATE POLICY "Only admins can update order items" 
ON public.order_items 
FOR UPDATE 
USING (is_admin());

CREATE POLICY "Only admins can delete order items" 
ON public.order_items 
FOR DELETE 
USING (is_admin());

-- Add DELETE policy for profiles (admin only, or you can prevent all deletions)
CREATE POLICY "Only admins can delete profiles" 
ON public.profiles 
FOR DELETE 
USING (is_admin());