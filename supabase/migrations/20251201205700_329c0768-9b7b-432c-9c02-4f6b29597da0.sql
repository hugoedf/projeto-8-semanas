-- Tabela para armazenar dados de tracking de visitantes
CREATE TABLE IF NOT EXISTS public.visitor_tracking (
  visitor_id TEXT PRIMARY KEY,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_id TEXT,
  utm_term TEXT,
  utm_content TEXT,
  referrer TEXT,
  landing_page TEXT,
  device TEXT,
  region TEXT,
  age INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS (mas como não há auth, vamos permitir insert/select público)
ALTER TABLE public.visitor_tracking ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir insert e select (dados não sensíveis de tracking)
CREATE POLICY "Permitir insert de tracking" ON public.visitor_tracking
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir select de tracking" ON public.visitor_tracking
  FOR SELECT USING (true);

-- Índice para busca rápida por visitor_id
CREATE INDEX IF NOT EXISTS idx_visitor_tracking_visitor_id ON public.visitor_tracking(visitor_id);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_visitor_tracking_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_visitor_tracking_updated_at
  BEFORE UPDATE ON public.visitor_tracking
  FOR EACH ROW
  EXECUTE FUNCTION update_visitor_tracking_updated_at();