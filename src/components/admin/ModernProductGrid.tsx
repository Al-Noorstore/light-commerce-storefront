import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Search, Filter, Grid, List, ShoppingCart, Eye, Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  original_price?: number;
  quantity: number;
  image_url: string;
  category: string;
  description: string;
  rating: number;
  reviews_count: number;
  on_sale: boolean;
  best_seller: boolean;
  deleted: boolean;
}

interface ModernProductGridProps {
  onProductSelect?: (product: Product) => void;
  showAddToCart?: boolean;
  layout?: 'grid' | 'list';
}

export default function ModernProductGrid({ 
  onProductSelect, 
  showAddToCart = true, 
  layout: initialLayout = 'grid' 
}: ModernProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [layout, setLayout] = useState<'grid' | 'list'>(initialLayout);
  const [loading, setLoading] = useState(true);
  
  const { toast } = useToast();

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('admin_products')
        .select('*')
        .eq('deleted', false)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProducts(data || []);
      setFilteredProducts(data || []);
    } catch (error: any) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
    }
    
    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, sortBy]);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
    }).format(price).replace('USD', '$').replace('PKR', 'Rs.');
  };

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-square bg-gray-200 animate-pulse" />
              <CardContent className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-5 bg-gray-200 rounded animate-pulse w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Layout Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={layout === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLayout('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={layout === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLayout('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {/* Products Grid/List */}
      {layout === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => onProductSelect?.(product)}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.best_seller && (
                    <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Best Seller
                    </div>
                  )}
                  {product.on_sale && (
                    <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Sale
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col gap-2">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Eye className="w-4 h-4" />
                  </Button>
                  {showAddToCart && (
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Stock indicator */}
                {product.quantity < 10 && (
                  <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Only {product.quantity} left
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-600">({product.reviews_count})</span>
                </div>
                
                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-lg text-primary">
                    {formatPrice(product.price, product.currency)}
                  </span>
                  {product.original_price && product.original_price > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.original_price, product.currency)}
                    </span>
                  )}
                </div>
                
                {showAddToCart && (
                  <Button 
                    className="w-full" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    Add to Cart
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onProductSelect?.(product)}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                      <div className="flex gap-1">
                        {product.best_seller && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                            Best Seller
                          </span>
                        )}
                        {product.on_sale && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                            Sale
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                    <p className="text-sm text-gray-700 line-clamp-2 mb-3">{product.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <div className="flex">{renderStars(product.rating)}</div>
                          <span className="text-sm text-gray-600">({product.reviews_count})</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg text-primary">
                            {formatPrice(product.price, product.currency)}
                          </span>
                          {product.original_price && product.original_price > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(product.original_price, product.currency)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {showAddToCart && (
                        <Button 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No results */}
      {filteredProducts.length === 0 && (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria to find what you're looking for.
          </p>
        </Card>
      )}
    </div>
  );
}