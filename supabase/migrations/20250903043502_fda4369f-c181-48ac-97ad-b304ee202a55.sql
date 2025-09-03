-- Add unique constraint on email column first
ALTER TABLE public.profiles ADD CONSTRAINT profiles_email_unique UNIQUE (email);

-- Now insert admin user
INSERT INTO public.profiles (user_id, email, role, display_name)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'alnoormall.pk@gmail.com',
  'admin',
  'Al-Noor Admin'
) ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  display_name = 'Al-Noor Admin';

-- Create trigger for admin signup
CREATE TRIGGER admin_signup_trigger
BEFORE INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.handle_admin_signup();

-- Create products table for admin management
CREATE TABLE IF NOT EXISTS public.admin_products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  price numeric NOT NULL,
  currency text DEFAULT 'USD',
  original_price numeric,
  quantity integer DEFAULT 100,
  image_url text NOT NULL,
  data_ai_hint text,
  category text NOT NULL,
  description text NOT NULL,
  features text[],
  rating numeric DEFAULT 4.5,
  reviews_count integer DEFAULT 0,
  on_sale boolean DEFAULT false,
  best_seller boolean DEFAULT false,
  shipping jsonb DEFAULT '{"type": "free"}',
  deleted boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on admin_products
ALTER TABLE public.admin_products ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for admin_products
CREATE POLICY "Anyone can view active products" ON public.admin_products
  FOR SELECT USING (deleted = false);

CREATE POLICY "Admins can manage all products" ON public.admin_products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Add trigger for updated_at
CREATE TRIGGER update_admin_products_updated_at
  BEFORE UPDATE ON public.admin_products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();