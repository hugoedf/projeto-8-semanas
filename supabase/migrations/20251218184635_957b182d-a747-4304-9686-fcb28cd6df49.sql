-- Drop the overly restrictive deny-all policies
DROP POLICY IF EXISTS "deny_select_all" ON public.visitor_tracking;
DROP POLICY IF EXISTS "deny_insert_all" ON public.visitor_tracking;
DROP POLICY IF EXISTS "deny_update_all" ON public.visitor_tracking;
DROP POLICY IF EXISTS "deny_delete_all" ON public.visitor_tracking;

-- Create proper RLS policies
-- Note: service_role (used by Edge Functions) BYPASSES RLS entirely

-- INSERT: Block public/anon users (Edge Function uses service_role which bypasses RLS)
CREATE POLICY "block_anon_insert" 
ON public.visitor_tracking 
FOR INSERT 
TO anon
WITH CHECK (false);

-- SELECT: Allow authenticated users to read visitor data (for analytics dashboards)
-- Service role bypasses RLS, so Edge Functions can always read
CREATE POLICY "allow_authenticated_select" 
ON public.visitor_tracking 
FOR SELECT 
TO authenticated
USING (true);

-- Block anon from reading
CREATE POLICY "block_anon_select" 
ON public.visitor_tracking 
FOR SELECT 
TO anon
USING (false);

-- UPDATE: Block all (service_role can still update if needed, bypasses RLS)
CREATE POLICY "block_all_update" 
ON public.visitor_tracking 
FOR UPDATE 
TO public
USING (false);

-- DELETE: Block all (service_role can still delete if needed, bypasses RLS)
CREATE POLICY "block_all_delete" 
ON public.visitor_tracking 
FOR DELETE 
TO public
USING (false);