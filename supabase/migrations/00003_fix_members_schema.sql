-- ============================================
-- Fix Members Schema & gympowerhealthinfo@gmail.com
-- Run in Supabase SQL Editor if member add fails
-- ============================================

-- 1. Ensure members table has correct structure
-- Add columns if missing (safe for existing tables)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='members' AND column_name='membership_start') THEN
    ALTER TABLE public.members ADD COLUMN membership_start DATE DEFAULT CURRENT_DATE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='members' AND column_name='membership_type') THEN
    ALTER TABLE public.members ADD COLUMN membership_type TEXT NOT NULL DEFAULT '3 Months';
  END IF;
EXCEPTION WHEN OTHERS THEN
  NULL; -- Ignore if columns exist
END $$;

-- 2. If membership_type is enum, convert to TEXT (run manually if needed)
-- ALTER TABLE public.members ALTER COLUMN membership_type TYPE TEXT USING membership_type::text;

-- 3. Ensure default for membership_type
DO $$ BEGIN
  ALTER TABLE public.members ALTER COLUMN membership_type SET DEFAULT '3 Months';
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 4. Grant admin to gympowerhealthinfo@gmail.com
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users WHERE LOWER(email) = 'gympowerhealthinfo@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'admin'::app_role;

-- 5. Update gym_settings email
UPDATE public.gym_settings SET email = 'gympowerhealthinfo@gmail.com' WHERE id = (SELECT id FROM public.gym_settings LIMIT 1);
