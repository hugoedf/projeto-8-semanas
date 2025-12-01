-- Corrigir search_path da função de trigger
DROP FUNCTION IF EXISTS update_visitor_tracking_updated_at() CASCADE;

CREATE OR REPLACE FUNCTION update_visitor_tracking_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_visitor_tracking_updated_at
  BEFORE UPDATE ON public.visitor_tracking
  FOR EACH ROW
  EXECUTE FUNCTION update_visitor_tracking_updated_at();