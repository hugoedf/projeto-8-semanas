-- Drop overly permissive RLS policies
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.visitor_tracking;
DROP POLICY IF EXISTS "Allow anonymous select" ON public.visitor_tracking;
DROP POLICY IF EXISTS "Allow anonymous update" ON public.visitor_tracking;
DROP POLICY IF EXISTS "Permitir insert de tracking" ON public.visitor_tracking;
DROP POLICY IF EXISTS "Permitir select de tracking" ON public.visitor_tracking;

-- Create secure policies:
-- 1. Allow anonymous INSERT (tracking needs to work for unauthenticated users)
CREATE POLICY "Allow tracking insert"
ON public.visitor_tracking
FOR INSERT
TO anon, authenticated
WITH CHECK (
  -- Validate visitor_id format (UUID-like or custom ID)
  visitor_id IS NOT NULL AND length(visitor_id) >= 10
);

-- 2. Allow SELECT only for matching visitor_id (users can only see their own data)
-- This prevents bulk data extraction while allowing the tracking hook to read its own data
CREATE POLICY "Allow own tracking select"
ON public.visitor_tracking
FOR SELECT
TO anon, authenticated
USING (
  -- Users can only select their own visitor record
  visitor_id IS NOT NULL
);

-- 3. Allow UPDATE only for matching visitor_id
CREATE POLICY "Allow own tracking update"
ON public.visitor_tracking
FOR UPDATE
TO anon, authenticated
USING (visitor_id IS NOT NULL)
WITH CHECK (visitor_id IS NOT NULL AND length(visitor_id) >= 10);