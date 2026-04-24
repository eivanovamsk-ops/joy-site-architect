ALTER TABLE public.course_recommendations
ADD COLUMN phone TEXT NOT NULL DEFAULT '';

ALTER TABLE public.course_recommendations
ALTER COLUMN phone DROP DEFAULT;