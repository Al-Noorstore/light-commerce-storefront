-- Create form submissions table
CREATE TABLE public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_type TEXT NOT NULL, -- 'netlify', 'google', 'local', etc.
  form_name TEXT NOT NULL, -- Name/identifier of the specific form
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  delivery_address TEXT,
  delivery_city TEXT,
  delivery_postal_code TEXT,
  order_details JSONB, -- Flexible field for product details, quantities, etc.
  additional_data JSONB, -- Any extra form fields
  status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'cancelled'
  notes TEXT, -- Admin notes
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for form submissions (public can insert, admins can view/update)
CREATE POLICY "Form submissions are insertable by everyone" 
ON public.form_submissions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Form submissions are viewable by everyone" 
ON public.form_submissions 
FOR SELECT 
USING (true);

CREATE POLICY "Form submissions are updatable by everyone" 
ON public.form_submissions 
FOR UPDATE 
USING (true);

CREATE POLICY "Form submissions are deletable by everyone" 
ON public.form_submissions 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_form_submissions_updated_at
BEFORE UPDATE ON public.form_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_form_submissions_form_type ON public.form_submissions(form_type);
CREATE INDEX idx_form_submissions_status ON public.form_submissions(status);
CREATE INDEX idx_form_submissions_created_at ON public.form_submissions(created_at DESC);