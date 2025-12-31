-- Fix meta_events: Add PERMISSIVE policy for admin access

-- Drop existing RESTRICTIVE admin policy
DROP POLICY IF EXISTS "admins_select_meta_events" ON public.meta_events;

-- Create PERMISSIVE policy for admins to view events
CREATE POLICY "admins_select_meta_events"
ON public.meta_events
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));