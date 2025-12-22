-- Add new columns for enhanced analytics
ALTER TABLE public.meta_events
ADD COLUMN IF NOT EXISTS publisher_platform text,
ADD COLUMN IF NOT EXISTS placement text,
ADD COLUMN IF NOT EXISTS os text,
ADD COLUMN IF NOT EXISTS country text,
ADD COLUMN IF NOT EXISTS region text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS campaign_id text,
ADD COLUMN IF NOT EXISTS adset_id text,
ADD COLUMN IF NOT EXISTS ad_id text;

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_meta_events_publisher_platform ON public.meta_events(publisher_platform);
CREATE INDEX IF NOT EXISTS idx_meta_events_placement ON public.meta_events(placement);
CREATE INDEX IF NOT EXISTS idx_meta_events_device ON public.meta_events(device);
CREATE INDEX IF NOT EXISTS idx_meta_events_country ON public.meta_events(country);
CREATE INDEX IF NOT EXISTS idx_meta_events_region ON public.meta_events(region);