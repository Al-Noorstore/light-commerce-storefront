-- Add missing columns to orders table for comprehensive order tracking
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS order_number TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS subtotal NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS delivery_charges NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS total NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Add missing columns to order_items table
ALTER TABLE public.order_items
ADD COLUMN IF NOT EXISTS product_name TEXT,
ADD COLUMN IF NOT EXISTS product_image TEXT,
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'PKR';

-- Create function to generate order numbers in format: AN-YYYYMMDDHHMMSS-NNNNNN
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  timestamp_part TEXT;
  sequence_part TEXT;
  order_count INTEGER;
BEGIN
  -- Get timestamp part: YYYYMMDDHHMMSS
  timestamp_part := TO_CHAR(NOW(), 'YYYYMMDDHH24MISS');
  
  -- Get count of orders created today for sequence
  SELECT COUNT(*) INTO order_count
  FROM public.orders
  WHERE DATE(created_at) = CURRENT_DATE;
  
  -- Generate sequence part: 6-digit padded number
  sequence_part := LPAD((order_count + 1)::TEXT, 6, '0');
  
  -- Return formatted order number
  RETURN 'AN-' || timestamp_part || '-' || sequence_part;
END;
$$;

-- Create trigger to auto-generate order number on insert
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_set_order_number ON public.orders;
CREATE TRIGGER trigger_set_order_number
BEFORE INSERT ON public.orders
FOR EACH ROW
EXECUTE FUNCTION set_order_number();

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_orders_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_update_orders_updated_at ON public.orders;
CREATE TRIGGER trigger_update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION update_orders_updated_at();