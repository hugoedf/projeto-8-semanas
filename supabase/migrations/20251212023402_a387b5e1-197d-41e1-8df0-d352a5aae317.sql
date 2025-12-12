-- Drop all existing INSERT policies on visitor_tracking
DROP POLICY IF EXISTS "Allow tracking insert" ON public.visitor_tracking;
DROP POLICY IF EXISTS "Allow public tracking insert" ON public.visitor_tracking;

-- Create new INSERT policy that allows public, anon, and authenticated roles
CREATE POLICY "Allow public visitor tracking insert"
ON public.visitor_tracking
FOR INSERT
TO public, anon, authenticated
WITH CHECK (
  visitor_id IS NOT NULL 
  AND length(visitor_id) >= 10
);