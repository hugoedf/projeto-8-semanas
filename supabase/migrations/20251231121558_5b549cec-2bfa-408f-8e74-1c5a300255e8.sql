-- Add PERMISSIVE policies for service role to access meta_events
-- This allows Edge Functions (which use service role) to insert and select events

-- Allow service role to select all events (PERMISSIVE)
CREATE POLICY "service_role_select_meta_events"
ON public.meta_events
FOR SELECT
TO service_role
USING (true);

-- Allow service role to insert events (PERMISSIVE)
CREATE POLICY "service_role_insert_meta_events"
ON public.meta_events
FOR INSERT
TO service_role
WITH CHECK (true);

-- Allow authenticated admins to view all events (PERMISSIVE)
CREATE POLICY "admins_select_meta_events"
ON public.meta_events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));