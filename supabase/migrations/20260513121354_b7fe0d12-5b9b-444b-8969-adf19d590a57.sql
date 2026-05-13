-- Allow storing duplicate markers without deleting historical applications
ALTER TABLE public.course_applications
DROP CONSTRAINT IF EXISTS course_applications_status_check;

ALTER TABLE public.course_applications
ADD CONSTRAINT course_applications_status_check
CHECK (status = ANY (ARRAY['new'::text, 'contacted'::text, 'confirmed'::text, 'cancelled'::text, 'duplicate'::text]));

-- Mark existing duplicate course applications while preserving the original first application
WITH ranked_applications AS (
  SELECT
    id,
    row_number() OVER (
      PARTITION BY lower(trim(email)), course_name
      ORDER BY created_at ASC, id ASC
    ) AS duplicate_rank
  FROM public.course_applications
  WHERE email IS NOT NULL
    AND trim(email) <> ''
)
UPDATE public.course_applications AS ca
SET status = 'duplicate'
FROM ranked_applications AS ranked
WHERE ca.id = ranked.id
  AND ranked.duplicate_rank > 1
  AND ca.status <> 'duplicate';

-- Prevent future duplicate active registrations for the same course and email
CREATE UNIQUE INDEX IF NOT EXISTS course_applications_unique_active_email_course
ON public.course_applications (lower(trim(email)), course_name)
WHERE status <> 'duplicate'
  AND email IS NOT NULL
  AND trim(email) <> '';
