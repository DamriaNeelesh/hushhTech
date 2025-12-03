-- Add slug column for clean URLs
ALTER TABLE public.investor_profiles 
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Add is_public flag (default true for public by default)
ALTER TABLE public.investor_profiles 
ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT true;

-- Create index for fast slug lookups
CREATE INDEX IF NOT EXISTS idx_investor_profiles_slug ON public.investor_profiles(slug);

-- Function to generate unique slug from name
CREATE OR REPLACE FUNCTION generate_investor_slug(user_name TEXT, user_id_param UUID)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INT := 0;
BEGIN
  -- Convert name to slug format: "John Doe" -> "john-doe"
  base_slug := lower(regexp_replace(user_name, '[^a-zA-Z0-9]+', '-', 'g'));
  base_slug := trim(both '-' from base_slug);
  
  -- Add "investor" suffix
  base_slug := base_slug || '-investor';
  
  final_slug := base_slug;
  
  -- Check uniqueness, add number if exists
  WHILE EXISTS (SELECT 1 FROM investor_profiles WHERE slug = final_slug AND user_id != user_id_param) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate slug on insert/update
CREATE OR REPLACE FUNCTION set_investor_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_investor_slug(NEW.name, NEW.user_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_investor_slug ON public.investor_profiles;
CREATE TRIGGER trigger_set_investor_slug
  BEFORE INSERT OR UPDATE ON public.investor_profiles
  FOR EACH ROW
  EXECUTE FUNCTION set_investor_slug();

-- Update existing RLS policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.investor_profiles;

-- New policies
CREATE POLICY "Users can view their own profile"
  ON public.investor_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view confirmed public profiles"
  ON public.investor_profiles FOR SELECT
  TO public
  USING (
    user_confirmed = true 
    AND is_public = true 
    AND investor_profile IS NOT NULL
  );

CREATE POLICY "Users can update their own public flag"
  ON public.investor_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Backfill slugs for existing profiles
UPDATE public.investor_profiles 
SET slug = generate_investor_slug(name, user_id)
WHERE slug IS NULL;

-- Grant public read access
GRANT SELECT ON public.investor_profiles TO anon;
