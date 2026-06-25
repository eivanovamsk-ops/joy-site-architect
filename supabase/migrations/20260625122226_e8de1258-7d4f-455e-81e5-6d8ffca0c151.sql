
-- 1) Guest read access on order_items for fresh guest orders
DROP POLICY IF EXISTS "Users can view own order items" ON public.order_items;
CREATE POLICY "Users can view own order items"
ON public.order_items
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_items.order_id
      AND (
        (o.user_id = auth.uid())
        OR public.is_admin()
        OR (
          o.is_guest_order = true
          AND o.user_id IS NULL
          AND o.status = 'pending'
          AND o.created_at > now() - interval '30 minutes'
        )
      )
  )
);

-- 2) Storage: allow owners to update/delete their own company-requisites
CREATE POLICY "Users can update own requisites"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'company-requisites' AND (auth.uid())::text = (storage.foldername(name))[1])
WITH CHECK (bucket_id = 'company-requisites' AND (auth.uid())::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own requisites"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'company-requisites' AND (auth.uid())::text = (storage.foldername(name))[1]);
