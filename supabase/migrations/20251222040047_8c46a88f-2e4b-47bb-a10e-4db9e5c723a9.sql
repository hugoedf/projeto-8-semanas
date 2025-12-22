-- Enable RLS on user_roles table (in case it was disabled)
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create restrictive policy to block ALL anonymous access
CREATE POLICY "block_anon_access_user_roles"
ON public.user_roles
AS RESTRICTIVE
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- Allow authenticated users to view only their own roles
CREATE POLICY "users_can_view_own_roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow only admins to insert new roles
CREATE POLICY "admins_can_insert_roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow only admins to delete roles
CREATE POLICY "admins_can_delete_roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));