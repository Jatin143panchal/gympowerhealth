-- ============================================
-- Gym Power Hub - Stable Production Version
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- ENUM
-- =====================
DO $$ BEGIN
  CREATE TYPE app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- =====================
-- PROFILES
-- =====================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- USER ROLES
-- =====================
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- MEMBERS
-- =====================
CREATE TABLE IF NOT EXISTS public.members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  membership_type TEXT DEFAULT '3 Months',
  membership_start DATE DEFAULT CURRENT_DATE,
  membership_expiry DATE,
  status TEXT DEFAULT 'active',
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- ANNOUNCEMENTS
-- =====================
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT DEFAULT 'normal',
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- BROADCAST
-- =====================
CREATE TABLE IF NOT EXISTS public.broadcast_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_template TEXT NOT NULL,
  recipients_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending',
  sent_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- GYM SETTINGS
-- =====================
CREATE TABLE IF NOT EXISTS public.gym_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gym_name TEXT DEFAULT 'Power Health Gym & Wellness',
  email TEXT DEFAULT 'gympowerhealthinfo@gmail.com',
  phone TEXT DEFAULT '+91 9217441307',
  address TEXT DEFAULT 'Greater Noida West',
  email_notifications BOOLEAN DEFAULT true,
  sms_notifications BOOLEAN DEFAULT true,
  auto_reminder_days INTEGER DEFAULT 7,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.gym_settings (gym_name)
SELECT 'Power Health Gym & Wellness'
WHERE NOT EXISTS (SELECT 1 FROM public.gym_settings);

-- =====================
-- ROLE CHECK FUNCTION
-- =====================
CREATE OR REPLACE FUNCTION public.has_role(_role app_role, _user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- =====================
-- SAFE SIGNUP TRIGGER
-- =====================
CREATE OR REPLACE FUNCTION public.handle_new_user_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  BEGIN
    INSERT INTO public.profiles (user_id, full_name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email))
    ON CONFLICT DO NOTHING;

    IF LOWER(NEW.email) = 'gympowerhealthinfo@gmail.com' THEN
      INSERT INTO public.user_roles (user_id, role)
      VALUES (NEW.id, 'admin')
      ON CONFLICT (user_id) DO UPDATE SET role='admin';
    ELSE
      INSERT INTO public.user_roles (user_id, role)
      VALUES (NEW.id, 'user')
      ON CONFLICT DO NOTHING;
    END IF;

  EXCEPTION WHEN OTHERS THEN
    NULL;
  END;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;

CREATE TRIGGER on_auth_user_created_admin
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_admin();

-- =====================
-- ENABLE RLS
-- =====================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broadcast_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_settings ENABLE ROW LEVEL SECURITY;

-- =====================
-- POLICIES
-- =====================

-- Profiles
CREATE POLICY "Own profile access"
ON public.profiles
FOR ALL
USING (auth.uid() = user_id);

-- Roles
CREATE POLICY "Own role read"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admin manage roles"
ON public.user_roles
FOR ALL
USING (public.has_role('admin', auth.uid()))
WITH CHECK (public.has_role('admin', auth.uid()));

-- Members
CREATE POLICY "Admin full members"
ON public.members
FOR ALL
USING (public.has_role('admin', auth.uid()));

CREATE POLICY "User view own member"
ON public.members
FOR SELECT
USING (auth.uid() = user_id);

-- Announcements
CREATE POLICY "Admin manage announcements"
ON public.announcements
FOR ALL
USING (public.has_role('admin', auth.uid()));

CREATE POLICY "Public read active announcements"
ON public.announcements
FOR SELECT
USING (is_active = true);

-- Broadcast
CREATE POLICY "Admin broadcast access"
ON public.broadcast_messages
FOR ALL
USING (public.has_role('admin', auth.uid()));

-- Gym Settings
CREATE POLICY "Read gym settings"
ON public.gym_settings
FOR SELECT
USING (true);

CREATE POLICY "Admin update gym settings"
ON public.gym_settings
FOR ALL
USING (public.has_role('admin', auth.uid()))
WITH CHECK (public.has_role('admin', auth.uid()));
