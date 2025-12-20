-- Create storage bucket for caching VSL audio
INSERT INTO storage.buckets (id, name, public) 
VALUES ('vsl-cache', 'vsl-cache', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to cached audio
CREATE POLICY "Public can read VSL cache" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'vsl-cache');

-- Allow edge functions to write to cache (using service role)
CREATE POLICY "Service role can manage VSL cache" 
ON storage.objects 
FOR ALL 
USING (bucket_id = 'vsl-cache')
WITH CHECK (bucket_id = 'vsl-cache');