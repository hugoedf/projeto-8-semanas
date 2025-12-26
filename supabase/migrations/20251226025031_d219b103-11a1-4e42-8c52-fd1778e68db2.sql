-- Visitor Tracking RLS Fix
-- Current state: All RESTRICTIVE policies blocking everything
-- Goal: Allow authenticated/admin to SELECT, keep INSERT via service role (Edge Function)

-- Add PERMISSIVE policy for authenticated users to SELECT (dashboard access)
CREATE POLICY "authenticated_can_select_visitor_tracking"
ON public.visitor_tracking
FOR SELECT
TO authenticated
USING (true);

-- Add PERMISSIVE policy for service role INSERT (Edge Function already uses service role, but this is explicit)
-- Note: Service role bypasses RLS, but adding for documentation
CREATE POLICY "service_role_full_access_visitor_tracking"
ON public.visitor_tracking
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);