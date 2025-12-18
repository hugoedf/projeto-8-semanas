-- Remove age column from visitor_tracking table
ALTER TABLE public.visitor_tracking DROP COLUMN IF EXISTS age;

-- Drop existing RLS policies to recreate them
DROP POLICY IF EXISTS "Allow public visitor tracking insert" ON public.visitor_tracking;
DROP POLICY IF EXISTS "deny delete for all" ON public.visitor_tracking;
DROP POLICY IF EXISTS "deny select for all" ON public.visitor_tracking;
DROP POLICY IF EXISTS "deny update for all" ON public.visitor_tracking;

-- Recreate restrictive policies - NO public insert allowed
-- Only service role can insert (Edge Functions use service role)

-- Deny all SELECT (service role bypasses RLS)
CREATE POLICY "deny_select_all" 
ON public.visitor_tracking 
FOR SELECT 
TO public
USING (false);

-- Deny all INSERT from public (service role bypasses RLS)
CREATE POLICY "deny_insert_all" 
ON public.visitor_tracking 
FOR INSERT 
TO public
WITH CHECK (false);

-- Deny all UPDATE
CREATE POLICY "deny_update_all" 
ON public.visitor_tracking 
FOR UPDATE 
TO public
USING (false);

-- Deny all DELETE
CREATE POLICY "deny_delete_all" 
ON public.visitor_tracking 
FOR DELETE 
TO public
USING (false);