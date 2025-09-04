import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, Package, Search, Filter, RefreshCw } from 'lucide-react';

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
  features: string[];
  rating: number;
  reviews_count: number;
  on_sale: boolean;
  best_seller: boolean;
  shipping: any;
  deleted: boolean;
}

export default function ModernProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  
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
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory]);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: 0,
      currency: 'PKR',
      quantity: 100,
      image_url: '',
      category: '',
      description: '',
      features: [],
      rating: 4.5,
      reviews_count: 0,
      on_sale: false,
      best_seller: false,
      shipping: { type: 'free' }
    });
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsDialogOpen(true);
  };

  const handleSaveProduct = async () => {
    try {
      if (!formData.name || !formData.category || !formData.image_url) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }

      const productData = {
        name: formData.name!,
        category: formData.category!,
        description: formData.description || '',
        image_url: formData.image_url!,
        price: formData.price || 0,
        currency: formData.currency || 'PKR',
        original_price: formData.original_price,
        quantity: formData.quantity || 100,
        features: Array.isArray(formData.features) ? formData.features : [],
        rating: formData.rating || 4.5,
        reviews_count: formData.reviews_count || 0,
        on_sale: formData.on_sale || false,
        best_seller: formData.best_seller || false,
        shipping: formData.shipping || { type: 'free' },
        deleted: false
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('admin_products')
          .update(productData)
          .eq('id', editingProduct.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Product updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('admin_products')
          .insert(productData);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Product added successfully"
        });
      }

      setIsDialogOpen(false);
      loadProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('admin_products')
        .update({ deleted: true })
        .eq('id', productId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Product deleted successfully"
      });
      
      loadProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-6 h-6 animate-spin text-primary" />
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
          <p className="text-gray-600">Manage your store inventory</p>
        </div>
        <Button onClick={handleAddProduct} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="search">Search Products</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Search by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="w-full sm:w-48">
            <Label htmlFor="category">Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square relative">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.best_seller && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Best Seller
                </div>
              )}
              {product.on_sale && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  On Sale
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg">{product.currency} {product.price}</span>
                  {product.original_price && (
                    <span className="text-sm text-gray-500 line-through">
                      {product.currency} {product.original_price}
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-600">Stock: {product.quantity}</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditProduct(product)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteProduct(product.id)}
                  className="flex-1"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="p-12 text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || selectedCategory !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by adding your first product'
            }
          </p>
          {!searchQuery && selectedCategory === 'all' && (
            <Button onClick={handleAddProduct}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          )}
        </Card>
      )}

      {/* Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Enter category"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="original_price">Original Price</Label>
                <Input
                  id="original_price"
                  type="number"
                  value={formData.original_price || ''}
                  onChange={(e) => setFormData({ ...formData, original_price: parseFloat(e.target.value) || undefined })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Stock Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity || ''}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                  placeholder="100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL *</Label>
              <Input
                id="image_url"
                value={formData.image_url || ''}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProduct}>
              {editingProduct ? 'Update' : 'Add'} Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}