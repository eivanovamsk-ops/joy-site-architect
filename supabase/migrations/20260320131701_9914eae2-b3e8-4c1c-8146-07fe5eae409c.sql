CREATE POLICY "Inserter can read back own row"
ON public.bundle_requests
FOR SELECT
TO anon, authenticated
USING (created_at >= now() - interval '5 seconds');