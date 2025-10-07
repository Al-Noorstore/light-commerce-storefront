-- Create payment methods table for admin configuration
CREATE TABLE public.payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('cash_on_delivery', 'advance_payment')),
  method_key text NOT NULL UNIQUE, -- jazz_cash, easy_paisa, debit_card, payoneer
  is_enabled boolean DEFAULT true,
  qr_code_url text,
  account_number text,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;

-- Public can view enabled payment methods
CREATE POLICY "Public can view enabled payment methods"
ON public.payment_methods
FOR SELECT
TO public
USING (is_enabled = true);

-- Admins can manage all payment methods
CREATE POLICY "Admins can manage payment methods"
ON public.payment_methods
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Insert default payment methods
INSERT INTO public.payment_methods (name, type, method_key, is_enabled, display_order) VALUES
('Cash on Delivery', 'cash_on_delivery', 'cash_on_delivery', true, 1),
('Jazz Cash', 'advance_payment', 'jazz_cash', true, 2),
('Easy Paisa', 'advance_payment', 'easy_paisa', true, 3),
('Debit Card', 'advance_payment', 'debit_card', true, 4),
('Payoneer', 'advance_payment', 'payoneer', true, 5);

-- Create trigger for updated_at
CREATE TRIGGER update_payment_methods_updated_at
  BEFORE UPDATE ON public.payment_methods
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();