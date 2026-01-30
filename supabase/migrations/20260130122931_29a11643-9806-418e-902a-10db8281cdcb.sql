-- Add new columns to orders table for extended checkout
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS telegram text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS delivery_method text DEFAULT 'delivery' CHECK (delivery_method IN ('delivery', 'pickup')),
ADD COLUMN IF NOT EXISTS payment_type text DEFAULT 'private_cash' CHECK (payment_type IN ('private_cash', 'private_card', 'company')),
ADD COLUMN IF NOT EXISTS company_details text,
ADD COLUMN IF NOT EXISTS company_file_url text,
ADD COLUMN IF NOT EXISTS is_guest_order boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS guest_email text;

-- Create storage bucket for company requisites files
INSERT INTO storage.buckets (id, name, public)
VALUES ('company-requisites', 'company-requisites', false)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload their requisites
CREATE POLICY "Users can upload own requisites"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'company-requisites' AND auth.uid() IS NOT NULL);

-- Allow users to view their own uploaded files
CREATE POLICY "Users can view own requisites"
ON storage.objects FOR SELECT
USING (bucket_id = 'company-requisites' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow guest uploads with order ID as folder
CREATE POLICY "Guest can upload requisites with order reference"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'company-requisites' AND auth.uid() IS NULL);

-- Update RLS policy for orders to allow guest orders (no user_id required)
DROP POLICY IF EXISTS "Users can create own orders" ON public.orders;
CREATE POLICY "Users can create orders"
ON public.orders
FOR INSERT
WITH CHECK (user_id = auth.uid() OR (is_guest_order = true AND user_id IS NULL));