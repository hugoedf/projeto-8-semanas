-- Create table to store Meta events locally for dashboard
CREATE TABLE public.meta_events (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    event_name TEXT NOT NULL,
    event_id TEXT NOT NULL,
    event_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    visitor_id TEXT,
    page_url TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    device TEXT,
    value DECIMAL(10,2),
    currency TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.meta_events ENABLE ROW LEVEL SECURITY;

-- Create policy for edge functions to insert events (service role)
-- Anon users cannot access this table directly
CREATE POLICY "Service role can insert events"
ON public.meta_events
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Service role can select events"
ON public.meta_events
FOR SELECT
TO service_role
USING (true);

-- Block anon access
CREATE POLICY "Block anon insert"
ON public.meta_events
FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "Block anon select"
ON public.meta_events
FOR SELECT
TO anon
USING (false);

-- Create indexes for dashboard queries
CREATE INDEX idx_meta_events_name ON public.meta_events(event_name);
CREATE INDEX idx_meta_events_time ON public.meta_events(event_time);
CREATE INDEX idx_meta_events_visitor ON public.meta_events(visitor_id);