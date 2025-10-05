-- Fix conflicting RLS policies on products table

-- Drop all existing policies
DROP POLICY IF EXISTS "Products are viewable by everyone" ON public.products;
DROP POLICY IF EXISTS "Public can view products" ON public.products;
DROP POLICY IF EXISTS "admin can insert products" ON public.products;
DROP POLICY IF EXISTS "admin can manage products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

-- Create clean, consolidated policies
-- Allow public read access
CREATE POLICY "Public can view products"
ON public.products
FOR SELECT
USING (true);

-- Allow only admins to manage products (INSERT, UPDATE, DELETE)
CREATE POLICY "Admins can manage products"
ON public.products
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));