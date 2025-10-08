-- Create storage buckets for payment proofs and QR codes
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('payment-proofs', 'payment-proofs', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/webp']),
  ('payment-qr', 'payment-qr', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/webp']);

-- RLS policies for payment-proofs bucket
CREATE POLICY "Anyone can upload payment proofs"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'payment-proofs');

CREATE POLICY "Anyone can view payment proofs"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'payment-proofs');

CREATE POLICY "Admins can delete payment proofs"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'payment-proofs' AND
  has_role(auth.uid(), 'admin'::app_role)
);

-- RLS policies for payment-qr bucket
CREATE POLICY "Admins can upload QR codes"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'payment-qr' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Anyone can view QR codes"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'payment-qr');

CREATE POLICY "Admins can delete QR codes"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'payment-qr' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update QR codes"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'payment-qr' AND
  has_role(auth.uid(), 'admin'::app_role)
);