-- Add policy for admins to view all user roles (needed for role management)
CREATE POLICY "admins_can_select_all_roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));