
ALTER TABLE public.course_applications
ADD COLUMN IF NOT EXISTS last_name text,
ADD COLUMN IF NOT EXISTS telegram text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS specialization text,
ADD COLUMN IF NOT EXISTS organization text,
ADD COLUMN IF NOT EXISTS payment_type text DEFAULT 'private';
