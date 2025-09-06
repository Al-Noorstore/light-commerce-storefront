import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAdmin } from '@/contexts/AdminContext';
import { useProducts, Product } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import InlineEdit from './InlineEdit';
import ProductDetailModal from './ProductDetailModal';
import CheckoutModal from './CheckoutModal';


interface ProductGridProps {
  searchQuery: string;
  selectedCategory?: string;
  onViewProduct?: (product: Product) => void;
}

const ProductGrid = ({ searchQuery, selectedCategory = 'All Products', onViewProduct }: ProductGridProps) => {
  const { isAdminMode } = useAdmin();
  const { products, updateProduct, deleteProduct } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);

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
    const product = products.find(p => p.id === productId);
    if (product) {
      updateProduct(productId, { ...product, [field]: value });
    }
  };

  const handleDeleteProduct = (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleViewProduct = (product: Product) => {
    if (onViewProduct) {
      onViewProduct(product);
    } else {
      setSelectedProduct(product);
      setIsDetailModalOpen(true);
    }
  };

  const handleBuyNow = (product: Product) => {
    setCheckoutProduct(product);
    setIsCheckoutModalOpen(true);
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
              <div className="relative overflow-hidden cursor-pointer" onClick={() => handleViewProduct(product)}>
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
                  {product.original_price && (
                    <InlineEdit
                      value={product.original_price}
                      onSave={(value) => handleProductSave(product.id, 'original_price', value)}
                      className="text-sm text-gray-500 line-through"
                    />
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleViewProduct(product)}
                    variant="outline"
                    className="flex-1 border-amber-300 text-amber-600 hover:bg-amber-50 hover:border-amber-400 transition-all duration-300"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
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

      {/* Product Detail Modal */}
      <ProductDetailModal 
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onBuyNow={handleBuyNow}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        product={checkoutProduct}
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </div>
  );
};

export default ProductGrid;
