import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Share2, Eye, Star } from 'lucide-react';
import { Product } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onBuyNow: (product: Product) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onBuyNow
}) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(product);
  const [loading, setLoading] = useState(false);

  // Fetch fresh product data when modal opens
  useEffect(() => {
    const fetchProductData = async () => {
      if (product && isOpen) {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('admin_products')
            .select('*')
            .eq('id', product.id.toString())
            .eq('deleted', false)
            .single();
          
          if (!error && data) {
            // Map admin_products to Product interface
            setCurrentProduct({
              id: Number(data.id),
              name: data.name,
              price: `Rs. ${data.price}`,
              original_price: data.original_price ? `Rs. ${data.original_price}` : undefined,
              image: data.image_url,
              category: data.category,
              description: data.description,
              badge: data.badge,
              rating: data.rating,
              stock: data.quantity,
              delivery_charges: data.delivery_charges,
              sku: data.sku,
              size: data.size,
              color: data.color,
              video_url: data.video_url,
              social_media_link: data.social_media_link
            });
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProductData();
  }, [product, isOpen]);

  if (!currentProduct) return null;

  const handleAddToCart = () => {
    addToCart(currentProduct);
    toast({
      title: "Added to Cart!",
      description: `${currentProduct.name} has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    toast({
      title: "Added to Wishlist!",
      description: `${currentProduct.name} has been added to your wishlist.`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentProduct.name,
        text: `Check out this amazing product: ${currentProduct.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Product link has been copied to clipboard.",
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Product Details
          </DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="relative">
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              
              {/* Badges */}
              {currentProduct.badge && (
                <div className="absolute top-3 left-3">
                  <Badge 
                    className={`text-xs font-bold ${
                      currentProduct.badge === 'NEW' ? 'bg-green-500' :
                      currentProduct.badge === 'SALE' || currentProduct.badge.includes('OFF') ? 'bg-red-500' :
                      currentProduct.badge === 'HOT' || currentProduct.badge === 'TRENDING' ? 'bg-orange-500' :
                      'bg-blue-500'
                    }`}
                  >
                    {currentProduct.badge}
                  </Badge>
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="space-y-4">
              <div>
                <span className="text-sm text-amber-600 font-medium">{currentProduct.category}</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">{currentProduct.name}</h2>
              </div>
              
              {/* Rating */}
              {currentProduct.rating && (
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {renderStars(currentProduct.rating)}
                  </div>
                  <span className="text-sm text-gray-600">({currentProduct.rating})</span>
                </div>
              )}
              
              {/* Price */}
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900">{currentProduct.price}</span>
                {currentProduct.original_price && (
                  <span className="text-xl text-gray-500 line-through">{currentProduct.original_price}</span>
                )}
              </div>
              
              {/* Stock */}
              {currentProduct.stock !== undefined && (
                <div className="text-sm text-gray-600">
                  {currentProduct.stock > 0 ? `${currentProduct.stock} in stock` : 'Out of stock'}
                </div>
              )}
              
              {/* Product Details */}
              <div className="border-t pt-4 space-y-3">
                {currentProduct.sku && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">SKU:</span>
                    <span className="font-medium">{currentProduct.sku}</span>
                  </div>
                )}
                {currentProduct.color && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Color:</span>
                    <span className="font-medium">{currentProduct.color}</span>
                  </div>
                )}
                {currentProduct.size && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">{currentProduct.size}</span>
                  </div>
                )}
                {currentProduct.delivery_charges !== undefined && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery:</span>
                    <span className="font-medium">
                      {currentProduct.delivery_charges === 0 ? 'Free Delivery' : `Rs. ${currentProduct.delivery_charges}`}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Description */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {currentProduct.description || 'Experience premium quality with this carefully selected product. Designed to meet your everyday needs with exceptional durability and style.'}
                </p>
              </div>

              {/* Video */}
              {currentProduct.video_url && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Product Video</h3>
                  <a 
                    href={currentProduct.video_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Watch Product Video
                  </a>
                </div>
              )}

              {/* Social Media */}
              {currentProduct.social_media_link && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Social Media</h3>
                  <a 
                    href={currentProduct.social_media_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    View on Social Media
                  </a>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <Button
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                
                <Button
                  onClick={() => onBuyNow(currentProduct)}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                >
                  Buy Now
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleWishlist}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Wishlist
                </Button>
                
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;