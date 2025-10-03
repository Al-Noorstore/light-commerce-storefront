-- Add new fields to admin_products table
ALTER TABLE admin_products 
ADD COLUMN IF NOT EXISTS sku text,
ADD COLUMN IF NOT EXISTS color text,
ADD COLUMN IF NOT EXISTS size text,
ADD COLUMN IF NOT EXISTS video_url text,
ADD COLUMN IF NOT EXISTS social_media_link text,
ADD COLUMN IF NOT EXISTS badge text,
ADD COLUMN IF NOT EXISTS delivery_charges numeric DEFAULT 0;

-- Add comment to explain the fields
COMMENT ON COLUMN admin_products.sku IS 'Stock Keeping Unit - unique product identifier';
COMMENT ON COLUMN admin_products.color IS 'Product color';
COMMENT ON COLUMN admin_products.size IS 'Product size';
COMMENT ON COLUMN admin_products.video_url IS 'Optional video URL for product (YouTube, Vimeo, etc.)';
COMMENT ON COLUMN admin_products.social_media_link IS 'Social media link for the product';
COMMENT ON COLUMN admin_products.badge IS 'Custom badge text (e.g., Best Offer, 20% off, Free Delivery)';
COMMENT ON COLUMN admin_products.delivery_charges IS 'Delivery charges for this product in the specified currency';