-- Fix user_roles RLS policies: Convert RESTRICTIVE to PERMISSIVE

-- Drop all existing RESTRICTIVE policies (except anon blocker)
DROP POLICY IF EXISTS "users_can_view_own_roles" ON public.user_roles;
DROP POLICY IF EXISTS "admins_can_insert_roles" ON public.user_roles;
DROP POLICY IF EXISTS "admins_can_update_roles" ON public.user_roles;
DROP POLICY IF EXISTS "admins_can_delete_roles" ON public.user_roles;
DROP POLICY IF EXISTS "admins_can_select_all_roles" ON public.user_roles;

-- Recreate as PERMISSIVE policies

-- Allow users to view their own roles
CREATE POLICY "users_can_view_own_roles"
ON public.user_roles
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow admins to view all roles
CREATE POLICY "admins_can_select_all_roles"
ON public.user_roles
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to insert roles
CREATE POLICY "admins_can_insert_roles"
ON public.user_roles
AS PERMISSIVE
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to update roles
CREATE POLICY "admins_can_update_roles"
ON public.user_roles
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to delete roles
CREATE POLICY "admins_can_delete_roles"
ON public.user_roles
AS PERMISSIVE
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));