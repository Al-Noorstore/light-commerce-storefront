-- Fix function search_path security issues

-- Update generate_order_number function with secure search_path
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- Update set_order_number trigger function with secure search_path
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$;

-- Update update_orders_updated_at function with secure search_path
CREATE OR REPLACE FUNCTION update_orders_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;