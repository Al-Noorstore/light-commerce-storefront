-- Phase 1: Create secure role-based access control structure

-- 1. Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 4. RLS Policy for user_roles table
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Phase 2: Fix profiles table RLS policies

-- Drop the insecure policy that lets anyone view all profiles
DROP POLICY IF EXISTS "Profiles are viewable by authenticated users" ON public.profiles;

-- Add secure policies
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Phase 3: Fix form_submissions table RLS policies

-- Remove all the dangerous public access policies
DROP POLICY IF EXISTS "Form submissions are viewable by everyone" ON public.form_submissions;
DROP POLICY IF EXISTS "Form submissions are deletable by everyone" ON public.form_submissions;
DROP POLICY IF EXISTS "Form submissions are insertable by everyone" ON public.form_submissions;
DROP POLICY IF EXISTS "Form submissions are updatable by everyone" ON public.form_submissions;

-- Add secure policies
CREATE POLICY "Public can submit forms"
  ON public.form_submissions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all submissions"
  ON public.form_submissions
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update submissions"
  ON public.form_submissions
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete submissions"
  ON public.form_submissions
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Phase 4: Fix products table RLS policies

-- Remove dangerous public write access
DROP POLICY IF EXISTS "Products are deletable by everyone" ON public.products;
DROP POLICY IF EXISTS "Products are insertable by everyone" ON public.products;
DROP POLICY IF EXISTS "Products are updatable by everyone" ON public.products;
DROP POLICY IF EXISTS "Admins can add products" ON public.products;

-- Add secure policies
CREATE POLICY "Public can view products"
  ON public.products
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage products"
  ON public.products
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Phase 5: Make alnoormall.pk@gmail.com an admin
-- First, get the user_id for this email and insert admin role
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'alnoormall.pk@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;