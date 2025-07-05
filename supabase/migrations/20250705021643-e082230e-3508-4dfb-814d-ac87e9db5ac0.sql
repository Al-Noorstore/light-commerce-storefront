-- Create products table for persistent storage
CREATE TABLE public.products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price TEXT NOT NULL,
  original_price TEXT,
  image TEXT NOT NULL,
  badge TEXT,
  rating DECIMAL(2,1),
  stock INTEGER DEFAULT 0,
  buy_now_link TEXT,
  buy_now_text TEXT DEFAULT 'Buy Now',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (but make it accessible to everyone for now)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Products are insertable by everyone" 
ON public.products 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Products are updatable by everyone" 
ON public.products 
FOR UPDATE 
USING (true);

CREATE POLICY "Products are deletable by everyone" 
ON public.products 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial sample products
INSERT INTO public.products (name, category, price, original_price, image, badge, rating, stock) VALUES
('Premium Face Cream', 'Cosmetics', 'PKR 2,500', 'PKR 3,000', 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop', '20% OFF', 4.8, 15),
('Elegant Dining Set', 'Home Decor', 'PKR 15,000', NULL, 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop', 'NEW', 4.6, 8),
('Wireless Headphones', 'Electronics', 'PKR 8,500', 'PKR 10,000', 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop', 'SALE', 4.7, 22),
('Designer Handbag', 'Accessories', 'PKR 6,000', NULL, 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop', NULL, 4.9, 12),
('Kitchen Cookware Set', 'Kitchenware', 'PKR 12,000', 'PKR 14,000', 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop', 'POPULAR', 4.5, 5),
('Casual T-Shirt', 'Clothes', 'PKR 1,800', NULL, 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop', NULL, 4.4, 30),
('Moisturizing Serum', 'Cosmetics', 'PKR 3,200', NULL, 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop', 'TRENDING', 4.8, 18),
('Smart Watch', 'Electronics', 'PKR 18,000', 'PKR 22,000', 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop', 'HOT', 4.6, 7),
('Formal Shoes', 'Clothes', 'PKR 7,500', NULL, 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop', NULL, 4.3, 14),
('Yoga Mat', 'Sports & Fitness', 'PKR 2,200', 'PKR 2,800', 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=400&fit=crop', 'FITNESS', 4.7, 25),
('Resistance Bands Set', 'Sports & Fitness', 'PKR 1,500', NULL, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', 'NEW', 4.5, 30),
('Protein Shaker Bottle', 'Sports & Fitness', 'PKR 800', NULL, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop', NULL, 4.4, 40),
('Running Sneakers', 'Shoes', 'PKR 5,500', 'PKR 7,000', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', 'SPORT', 4.6, 20),
('Formal Leather Shoes', 'Shoes', 'PKR 8,000', NULL, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', 'PREMIUM', 4.7, 15),
('Casual Loafers', 'Shoes', 'PKR 4,200', 'PKR 5,000', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop', 'COMFORT', 4.5, 10);