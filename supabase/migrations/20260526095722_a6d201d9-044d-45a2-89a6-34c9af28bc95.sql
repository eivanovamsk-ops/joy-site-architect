DROP POLICY IF EXISTS "Inserter can read back own row" ON public.bundle_requests;
REVOKE SELECT ON public.bundle_requests FROM anon, authenticated;