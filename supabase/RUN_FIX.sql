-- ============================================
-- RUN IN SUPABASE SQL EDITOR
-- Fix: Member add error + gympowerhealthinfo@gmail.com admin
-- ============================================

-- 1. Fix members.membership_type default
ALTER TABLE public.members ALTER COLUMN membership_type SET DEFAULT '3 Months';

-- 2. Add membership_start if missing
ALTER TABLE public.members ADD COLUMN IF NOT EXISTS membership_start DATE DEFAULT CURRENT_DATE;

-- 3. Admin: gympowerhealthinfo@gmail.com
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users WHERE LOWER(email) = 'gympowerhealthinfo@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'admin'::app_role;

-- 4. gym_settings email
UPDATE public.gym_settings SET email = 'gympowerhealthinfo@gmail.com' WHERE id = (SELECT id FROM public.gym_settings LIMIT 1);
