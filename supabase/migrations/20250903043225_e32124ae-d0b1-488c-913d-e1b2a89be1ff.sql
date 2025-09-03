-- Create an admin user in the profiles table
-- This will allow the specific email to have admin access
INSERT INTO public.profiles (user_id, email, role, display_name)
VALUES (
  '00000000-0000-0000-0000-000000000000', -- Placeholder UUID for manual admin
  'alnoormall.pk@gmail.com',
  'admin',
  'Al-Noor Admin'
) ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  display_name = 'Al-Noor Admin';

-- Also add a function to automatically set admin role for the specific email
CREATE OR REPLACE FUNCTION public.handle_admin_signup()
RETURNS TRIGGER AS $$
BEGIN
  -- Set admin role for the specific admin email
  IF NEW.email = 'alnoormall.pk@gmail.com' THEN
    NEW.role = 'admin';
    NEW.display_name = 'Al-Noor Admin';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;