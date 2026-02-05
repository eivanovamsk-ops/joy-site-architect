-- Create a security definer function to get the current user's role
-- This avoids infinite recursion in RLS policies
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = _user_id
$$;

-- Drop the existing UPDATE policy
DROP POLICY IF EXISTS "Users can update own profile except role" ON public.profiles;

-- Create a new UPDATE policy with proper WITH CHECK to prevent role changes
CREATE POLICY "Users can update own profile except role" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id 
  AND role = public.get_user_role(auth.uid())
);