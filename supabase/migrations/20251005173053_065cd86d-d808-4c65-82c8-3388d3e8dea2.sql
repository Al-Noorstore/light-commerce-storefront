-- Add public read access for hero slides
-- This allows all visitors to view hero slides on the website
CREATE POLICY "Public can view hero slides"
ON public.hero_slides
FOR SELECT
USING (true);