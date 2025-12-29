-- Fix 1: Restrict visitor_tracking SELECT to admins only
-- Drop the overly permissive policy that allows any authenticated user to view all visitor data
DROP POLICY IF EXISTS "authenticated_can_select_visitor_tracking" ON public.visitor_tracking;

-- Create admin-only SELECT policy for visitor_tracking
CREATE POLICY "admins_can_select_visitor_tracking"
ON public.visitor_tracking
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix 2: Add missing UPDATE policy on user_roles table
-- Only admins should be able to update roles
CREATE POLICY "admins_can_update_roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));