CREATE TABLE public.course_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  specializations TEXT[] NOT NULL DEFAULT '{}',
  direction TEXT NOT NULL,
  direction_other TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.course_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit course recommendation"
ON public.course_recommendations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view course recommendations"
ON public.course_recommendations
FOR SELECT
TO authenticated
USING (public.is_admin());