import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAdmin } from '@/contexts/AdminContext';
import InlineEdit from './InlineEdit';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
  badge?: string;
  rating?: number;
  buyNowLink?: string;
  buyNowText?: string;
}

interface ProductGridProps {
  searchQuery: string;
  selectedCategory?: string;
}

const ProductGrid = ({ searchQuery, selectedCategory = 'All Products' }: ProductGridProps) => {
  const { isAdminMode } = useAdmin();
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
    },
    {
      id: 13,
      name: "Running Sneakers",
      category: "Shoes",
      price: "PKR 5,500",
      originalPrice: "PKR 7,000",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      badge: "SPORT",
      rating: 4.6
    },
    {
      id: 14,
      name: "Formal Leather Shoes",
      category: "Shoes",
      price: "PKR 8,000",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      badge: "PREMIUM",
      rating: 4.7
    },
    {
      id: 15,
      name: "Casual Loafers",
      category: "Shoes",
      price: "PKR 4,200",
      originalPrice: "PKR 5,000",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
      badge: "COMFORT",
      rating: 4.5
    }
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [visibleProducts, setVisibleProducts] = useState(6);

  useEffect(() => {
    let filtered = products;
    
    // Filter by category first
    if (selectedCategory && selectedCategory !== 'All Products') {
      filtered = filtered.filter(product => 
        product.category === selectedCategory
      );
    }
    
    // Then filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
    setVisibleProducts(6); // Reset visible products when filter changes
  }, [searchQuery, selectedCategory, products]);

  const handleProductSave = (productId: number, field: string, value: string) => {
    console.log(`Saving product ${productId}.${field}:`, value);
    // Here you would implement the actual save logic to your backend
  };

  const handleDeleteProduct = (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      console.log(`Deleting product ${productId}`);
      // Here you would implement the actual delete logic
    }
  };

  const handleBuyNow = (product: Product) => {
    if (product.buyNowLink) {
      // Use custom buy now link if provided
      window.open(product.buyNowLink, '_blank');
    } else {
      // Fallback to default Google Form URL with product name pre-filled
      const formUrl = `https://forms.gle/98wXZbtzzLcH7GFSA?usp=pp_url&entry.1234567890=${encodeURIComponent(product.name)}&entry.0987654321=${encodeURIComponent(product.price)}`;
      window.open(formUrl, '_blank');
    }
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
          <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-amber-100 overflow-hidden relative">
            {/* Admin Controls */}
            {isAdminMode && (
              <div className="absolute top-2 right-2 z-10 flex space-x-1">
                <Button
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white p-1 h-8 w-8"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-1 h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}

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
                  <InlineEdit
                    value={product.category}
                    onSave={(value) => handleProductSave(product.id, 'category', value)}
                    className="text-sm text-amber-600 font-medium block"
                  />
                  <InlineEdit
                    value={product.name}
                    onSave={(value) => handleProductSave(product.id, 'name', value)}
                    className="font-semibold text-gray-800 group-hover:text-amber-600 transition-colors"
                  />
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
                  <InlineEdit
                    value={product.price}
                    onSave={(value) => handleProductSave(product.id, 'price', value)}
                    className="text-lg font-bold text-gray-800"
                  />
                  {product.originalPrice && (
                    <InlineEdit
                      value={product.originalPrice}
                      onSave={(value) => handleProductSave(product.id, 'originalPrice', value)}
                      className="text-sm text-gray-500 line-through"
                    />
                  )}
                </div>

                {/* Buy Now Button */}
                <Button
                  onClick={() => handleBuyNow(product)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <ShoppingCart className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                  {product.buyNowText || 'Buy Now'}
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
          <p className="text-gray-500">
            {selectedCategory !== 'All Products' 
              ? `No products found in ${selectedCategory} category${searchQuery ? ` matching "${searchQuery}"` : ''}`
              : 'Try adjusting your search terms'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
