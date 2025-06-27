
import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
  badge?: string;
  rating?: number;
}

interface ProductGridProps {
  searchQuery: string;
}

const ProductGrid = ({ searchQuery }: ProductGridProps) => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Premium Face Cream",
      category: "Cosmetics",
      price: "PKR 2,500",
      originalPrice: "PKR 3,000",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      badge: "20% OFF",
      rating: 4.8
    },
    {
      id: 2,
      name: "Elegant Dining Set",
      category: "Home Decor",
      price: "PKR 15,000",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
      badge: "NEW",
      rating: 4.6
    },
    {
      id: 3,
      name: "Wireless Headphones",
      category: "Electronics",
      price: "PKR 8,500",
      originalPrice: "PKR 10,000",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
      badge: "SALE",
      rating: 4.7
    },
    {
      id: 4,
      name: "Designer Handbag",
      category: "Accessories",
      price: "PKR 6,000",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      rating: 4.9
    },
    {
      id: 5,
      name: "Kitchen Cookware Set",
      category: "Kitchenware",
      price: "PKR 12,000",
      originalPrice: "PKR 14,000",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
      badge: "POPULAR",
      rating: 4.5
    },
    {
      id: 6,
      name: "Casual T-Shirt",
      category: "Clothes",
      price: "PKR 1,800",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
      rating: 4.4
    },
    {
      id: 7,
      name: "Moisturizing Serum",
      category: "Cosmetics",
      price: "PKR 3,200",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      badge: "TRENDING",
      rating: 4.8
    },
    {
      id: 8,
      name: "Smart Watch",
      category: "Electronics",
      price: "PKR 18,000",
      originalPrice: "PKR 22,000",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
      badge: "HOT",
      rating: 4.6
    },
    {
      id: 9,
      name: "Formal Shoes",
      category: "Clothes",
      price: "PKR 7,500",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
      rating: 4.3
    },
    {
      id: 10,
      name: "Yoga Mat",
      category: "Sports & Fitness",
      price: "PKR 2,200",
      originalPrice: "PKR 2,800",
      image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=400&fit=crop",
      badge: "FITNESS",
      rating: 4.7
    },
    {
      id: 11,
      name: "Resistance Bands Set",
      category: "Sports & Fitness",
      price: "PKR 1,500",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      badge: "NEW",
      rating: 4.5
    },
    {
      id: 12,
      name: "Protein Shaker Bottle",
      category: "Sports & Fitness",
      price: "PKR 800",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
      rating: 4.4
    }
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [visibleProducts, setVisibleProducts] = useState(6);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleBuyNow = (product: Product) => {
    const formUrl = `https://forms.gle/example?entry.product=${encodeURIComponent(product.name)}&entry.price=${encodeURIComponent(product.price)}`;
    window.open(formUrl, '_blank');
  };

  const loadMoreProducts = () => {
    setVisibleProducts(prev => Math.min(prev + 6, filteredProducts.length));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="space-y-8">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.slice(0, visibleProducts).map((product) => (
          <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-amber-100 overflow-hidden">
            <CardContent className="p-0">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badge */}
                {product.badge && (
                  <Badge 
                    className={`absolute top-3 left-3 text-xs font-bold ${
                      product.badge === 'NEW' ? 'bg-green-500' :
                      product.badge === 'SALE' || product.badge.includes('OFF') ? 'bg-red-500' :
                      product.badge === 'HOT' || product.badge === 'TRENDING' ? 'bg-orange-500' :
                      'bg-blue-500'
                    }`}
                  >
                    {product.badge}
                  </Badge>
                )}

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors">
                    <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                  </button>
                  <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors">
                    <Eye className="h-4 w-4 text-gray-600 hover:text-blue-500" />
                  </button>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-sm text-amber-600 font-medium">{product.category}</p>
                  <h3 className="font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
                </div>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center space-x-1">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-800">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  )}
                </div>

                {/* Buy Now Button */}
                <Button
                  onClick={() => handleBuyNow(product)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <ShoppingCart className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                  Buy Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      {visibleProducts < filteredProducts.length && (
        <div className="text-center">
          <Button
            onClick={loadMoreProducts}
            variant="outline"
            className="border-amber-300 text-amber-600 hover:bg-amber-50 hover:border-amber-400 px-8 py-3 rounded-full font-semibold transition-all duration-300"
          >
            Load More Products
          </Button>
        </div>
      )}

      {/* No Products Found */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
