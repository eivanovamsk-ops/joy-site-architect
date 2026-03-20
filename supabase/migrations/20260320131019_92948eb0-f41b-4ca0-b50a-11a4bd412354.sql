
CREATE TABLE public.bundle_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.bundle_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert bundle requests"
ON public.bundle_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view bundle requests"
ON public.bundle_requests
FOR SELECT
TO authenticated
USING (public.is_admin());
