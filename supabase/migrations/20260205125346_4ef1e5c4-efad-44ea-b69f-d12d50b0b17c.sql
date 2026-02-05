-- Trigger schema cache reload by adding a comment
COMMENT ON TABLE public.orders IS 'Orders table - updated at 2026-02-05 12:52';

-- Notify PostgREST to reload schema cache
NOTIFY pgrst, 'reload schema';