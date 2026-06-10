-- 1) Payments: only the backend (service role) may create payment records
DROP POLICY IF EXISTS "Anyone can create payment records" ON public.payments;
CREATE POLICY "Service role can insert payments"
ON public.payments
FOR INSERT
WITH CHECK (auth.role() = 'service_role'::text);

-- 2) Course applications: drop direct client INSERT policy.
-- All inserts go through the validated SECURITY DEFINER RPC submit_course_application.
DROP POLICY IF EXISTS "Anyone can submit course application" ON public.course_applications;

-- 3) Tighten guest order item inserts: only into fresh pending guest orders
CREATE OR REPLACE FUNCTION public.can_add_order_items(_order_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.orders o
    WHERE o.id = _order_id
      AND (
        -- Owner adding items to their own authenticated order
        (auth.uid() IS NOT NULL AND o.user_id IS NOT NULL AND o.user_id = auth.uid())
        OR
        -- Guest order: only while the order is freshly created and still pending
        (o.is_guest_order = true
          AND o.user_id IS NULL
          AND o.status = 'pending'
          AND o.created_at > now() - interval '30 minutes')
        OR
        -- Admin override
        public.is_admin()
      )
  )
$function$;

-- 4) Storage: authenticated uploads must go to the user's own folder
DROP POLICY IF EXISTS "Users can upload own requisites" ON storage.objects;
CREATE POLICY "Users can upload own requisites"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'company-requisites'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

-- 5) Storage: guest uploads restricted to guest- prefixed folders
DROP POLICY IF EXISTS "Guest can upload requisites with order reference" ON storage.objects;
CREATE POLICY "Guest can upload requisites with order reference"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (
  bucket_id = 'company-requisites'
  AND (storage.foldername(name))[1] LIKE 'guest-%'
);

-- 6) Email queue functions: backend-only execution + fixed search_path
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint) TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) TO service_role;
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path TO 'public';
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path TO 'public';
ALTER FUNCTION public.delete_email(text, bigint) SET search_path TO 'public';
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path TO 'public';