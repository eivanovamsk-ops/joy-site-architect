CREATE OR REPLACE FUNCTION public.submit_course_application(
  p_name text,
  p_email text,
  p_phone text,
  p_course_name text,
  p_course_date date DEFAULT NULL,
  p_user_id uuid DEFAULT NULL,
  p_last_name text DEFAULT NULL,
  p_telegram text DEFAULT NULL,
  p_city text DEFAULT NULL,
  p_specialization text DEFAULT NULL,
  p_organization text DEFAULT NULL,
  p_message text DEFAULT NULL,
  p_payment_type text DEFAULT 'private'
)
RETURNS TABLE(application_id uuid, inserted boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  normalized_email text;
  existing_id uuid;
  new_id uuid;
BEGIN
  normalized_email := lower(trim(p_email));

  IF coalesce(trim(p_name), '') = '' THEN
    RAISE EXCEPTION 'name is required';
  END IF;

  IF coalesce(normalized_email, '') = '' THEN
    RAISE EXCEPTION 'email is required';
  END IF;

  IF coalesce(trim(p_course_name), '') = '' THEN
    RAISE EXCEPTION 'course_name is required';
  END IF;

  SELECT id INTO existing_id
  FROM public.course_applications
  WHERE lower(trim(email)) = normalized_email
    AND course_name = p_course_name
    AND status <> 'duplicate'
  ORDER BY created_at ASC
  LIMIT 1;

  IF existing_id IS NOT NULL THEN
    application_id := existing_id;
    inserted := false;
    RETURN NEXT;
    RETURN;
  END IF;

  BEGIN
    INSERT INTO public.course_applications (
      user_id,
      name,
      email,
      phone,
      course_name,
      course_date,
      last_name,
      telegram,
      city,
      specialization,
      organization,
      message,
      payment_type
    ) VALUES (
      CASE WHEN auth.uid() IS NOT NULL AND auth.uid() = p_user_id THEN p_user_id ELSE NULL END,
      trim(p_name),
      normalized_email,
      nullif(trim(coalesce(p_phone, '')), ''),
      trim(p_course_name),
      p_course_date,
      nullif(trim(coalesce(p_last_name, '')), ''),
      nullif(trim(coalesce(p_telegram, '')), ''),
      nullif(trim(coalesce(p_city, '')), ''),
      nullif(trim(coalesce(p_specialization, '')), ''),
      nullif(trim(coalesce(p_organization, '')), ''),
      nullif(trim(coalesce(p_message, '')), ''),
      coalesce(nullif(trim(p_payment_type), ''), 'private')
    ) RETURNING id INTO new_id;

    application_id := new_id;
    inserted := true;
    RETURN NEXT;
  EXCEPTION WHEN unique_violation THEN
    SELECT id INTO existing_id
    FROM public.course_applications
    WHERE lower(trim(email)) = normalized_email
      AND course_name = p_course_name
      AND status <> 'duplicate'
    ORDER BY created_at ASC
    LIMIT 1;

    application_id := existing_id;
    inserted := false;
    RETURN NEXT;
  END;
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_course_application(text, text, text, text, date, uuid, text, text, text, text, text, text, text) TO anon, authenticated;
