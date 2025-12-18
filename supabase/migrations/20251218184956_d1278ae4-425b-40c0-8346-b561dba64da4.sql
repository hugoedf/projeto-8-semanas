-- Remove the policy that allows any authenticated user to read
DROP POLICY IF EXISTS "allow_authenticated_select" ON public.visitor_tracking;

-- Now only service_role can read (bypasses RLS)
-- No authenticated users exist in this landing page app