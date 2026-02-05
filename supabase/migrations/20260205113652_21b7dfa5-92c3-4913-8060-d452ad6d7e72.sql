-- Grant INSERT permission on orders table to anon and authenticated roles
GRANT INSERT ON public.orders TO anon;
GRANT INSERT ON public.orders TO authenticated;

-- Grant SELECT permission (needed for returning data after insert)
GRANT SELECT ON public.orders TO anon;
GRANT SELECT ON public.orders TO authenticated;

-- Grant UPDATE permission for updating company_file_url after order creation
GRANT UPDATE ON public.orders TO authenticated;

-- Grant permissions on order_items table
GRANT INSERT ON public.order_items TO anon;
GRANT INSERT ON public.order_items TO authenticated;
GRANT SELECT ON public.order_items TO anon;
GRANT SELECT ON public.order_items TO authenticated;