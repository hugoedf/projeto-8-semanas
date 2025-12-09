-- Remove ineffective SELECT policy that exposes visitor data publicly
DROP POLICY IF EXISTS "Allow own tracking select" ON visitor_tracking;

-- Remove ineffective UPDATE policy that allows public modifications
DROP POLICY IF EXISTS "Allow own tracking update" ON visitor_tracking;