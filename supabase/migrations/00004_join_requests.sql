-- Join requests (contact-style form): public can insert, only backend/admin can remove
CREATE TABLE IF NOT EXISTS public.join_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.join_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a join request (anon + authenticated)
CREATE POLICY "Anyone can insert join_requests"
ON public.join_requests
FOR INSERT
WITH CHECK (true);

-- Only admin can read (manage from backend/dashboard later if needed)
CREATE POLICY "Admin read join_requests"
ON public.join_requests
FOR SELECT
USING (public.has_role('admin', auth.uid()));

-- No update/delete from app; remove only from Supabase dashboard/backend
COMMENT ON TABLE public.join_requests IS 'Join/contact form submissions. Delete only from backend/dashboard.';
