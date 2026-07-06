-- ============================================
-- Gym Power Hub - Run in Supabase SQL Editor
-- Copy-paste and Execute (Ctrl+Enter)
-- ============================================

-- 1. Grant admin to gympowerhealthinfo@gmail.com (safe if user doesn't exist yet)
CREATE OR REPLACE FUNCTION public.seed_admin_role()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_user_id uuid;
BEGIN
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE LOWER(email) = 'gympowerhealthinfo@gmail.com'
  LIMIT 1;
  
  IF admin_user_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (admin_user_id, 'admin'::app_role)
    ON CONFLICT (user_id) DO UPDATE SET role = 'admin'::app_role;
  END IF;
END;
$$;

SELECT public.seed_admin_role();
