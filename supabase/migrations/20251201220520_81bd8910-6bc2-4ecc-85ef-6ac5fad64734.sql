-- Fix RLS policy for visitor_tracking table to allow anonymous inserts and updates
-- This is needed for the landing page to track visitors without authentication

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.visitor_tracking;
DROP POLICY IF EXISTS "Allow anonymous update" ON public.visitor_tracking;
DROP POLICY IF EXISTS "Allow anonymous select" ON public.visitor_tracking;

-- Create policy to allow anonymous users to insert their own visitor data
CREATE POLICY "Allow anonymous insert"
ON public.visitor_tracking
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to allow anonymous users to update their own visitor data
CREATE POLICY "Allow anonymous update"
ON public.visitor_tracking
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);

-- Create policy to allow anonymous users to select visitor data (needed for webhook matching)
CREATE POLICY "Allow anonymous select"
ON public.visitor_tracking
FOR SELECT
TO anon
USING (true);