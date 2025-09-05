import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Share2, Eye, Star } from 'lucide-react';
import { Product } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

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

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    toast({
      title: "Added to Wishlist!",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this amazing product: ${product.name}`,
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            
            {/* Badges */}
            {product.badge && (
              <div className="absolute top-3 left-3">
                <Badge 
                  className={`text-xs font-bold ${
                    product.badge === 'NEW' ? 'bg-green-500' :
                    product.badge === 'SALE' || product.badge.includes('OFF') ? 'bg-red-500' :
                    product.badge === 'HOT' || product.badge === 'TRENDING' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`}
                >
                  {product.badge}
                </Badge>
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <span className="text-sm text-amber-600 font-medium">{product.category}</span>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h2>
            </div>
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">({product.rating})</span>
              </div>
            )}
            
            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">{product.price}</span>
              {product.original_price && (
                <span className="text-xl text-gray-500 line-through">{product.original_price}</span>
              )}
            </div>
            
            {/* Stock */}
            {product.stock !== undefined && (
              <div className="text-sm text-gray-600">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </div>
            )}
            
            {/* Description */}
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience premium quality with this carefully selected product. 
                Designed to meet your everyday needs with exceptional durability and style.
              </p>
            </div>
            
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
                onClick={() => onBuyNow(product)}
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
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;