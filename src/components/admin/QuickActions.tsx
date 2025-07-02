
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc,
  Eye,
  EyeOff,
  Trash2,
  DollarSign,
  Package
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSavePassword } from '@/hooks/useSavePassword';
import SavePasswordDialog from './SavePasswordDialog';

interface QuickProduct {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  visible: boolean;
  image: string;
}

const QuickActions = () => {
  const { toast } = useToast();
  const { isDialogOpen, dialogConfig, requestSaveConfirmation, handleConfirm, handleClose } = useSavePassword();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<QuickProduct | null>(null);

  const [products, setProducts] = useState<QuickProduct[]>([
    {
      id: 1,
      name: "Premium Face Cream",
      category: "Cosmetics",
      price: "PKR 2,500",
      stock: 15,
      visible: true,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Wireless Headphones",
      category: "Electronics",
      price: "PKR 8,500",
      stock: 8,
      visible: true,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      name: "Kitchen Cookware Set",
      category: "Kitchenware",
      price: "PKR 12,000",
      stock: 2,
      visible: false,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=100&h=100&fit=crop"
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: 0
  });

  const categories = ['All', 'Cosmetics', 'Electronics', 'Kitchenware', 'Clothes', 'Home Decor'];

  const handleQuickAdd = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    requestSaveConfirmation(
      () => {
        const id = Math.max(...products.map(p => p.id)) + 1;
        const product: QuickProduct = {
          id,
          name: newProduct.name,
          category: newProduct.category,
          price: newProduct.price,
          stock: newProduct.stock,
          visible: true,
          image: "https://via.placeholder.com/100x100?text=New"
        };
        
        setProducts(prev => [...prev, product]);
        setNewProduct({ name: '', category: '', price: '', stock: 0 });
        setShowAddForm(false);
        
        toast({
          title: "Product Added",
          description: "New product has been added successfully",
        });
      },
      'Add New Product',
      'Please confirm to add this new product to your inventory.'
    );
  };

  const handleQuickEdit = (product: QuickProduct, field: string, value: string | number) => {
    requestSaveConfirmation(
      () => {
        setProducts(prev =>
          prev.map(p => p.id === product.id ? { ...p, [field]: value } : p)
        );
        
        toast({
          title: "Product Updated",
          description: `${field} has been updated successfully`,
        });
      },
      'Update Product',
      `Please confirm to update the ${field} for ${product.name}.`
    );
  };

  const handleToggleVisibility = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    requestSaveConfirmation(
      () => {
        setProducts(prev =>
          prev.map(p => p.id === productId ? { ...p, visible: !p.visible } : p)
        );
        
        toast({
          title: "Visibility Updated",
          description: `Product is now ${product.visible ? 'hidden' : 'visible'} to customers`,
        });
      },
      'Toggle Product Visibility',
      `Please confirm to ${product.visible ? 'hide' : 'show'} ${product.name} to customers.`
    );
  };

  const handleDeleteProduct = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    requestSaveConfirmation(
      () => {
        setProducts(prev => prev.filter(p => p.id !== productId));
        
        toast({
          title: "Product Deleted",
          description: "Product has been removed from inventory",
        });
      },
      'Delete Product',
      `Are you sure you want to permanently delete ${product.name}?`
    );
  };

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let aVal: any = a[sortBy as keyof QuickProduct];
      let bVal: any = b[sortBy as keyof QuickProduct];
      
      if (sortBy === 'price') {
        aVal = parseFloat(a.price.replace(/[^\d.]/g, ''));
        bVal = parseFloat(b.price.replace(/[^\d.]/g, ''));
      }
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quick Actions</h2>
          <p className="text-gray-600">Fast product management and editing</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-green-500 hover:bg-green-600">
          <Plus className="h-4 w-4 mr-2" />
          Quick Add Product
        </Button>
      </div>

      {/* Quick Add Form */}
      {showAddForm && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-600">Quick Add Product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <select 
                className="px-3 py-2 border rounded-md"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              >
                <option value="">Select Category</option>
                {categories.slice(1).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Input
                placeholder="Price (PKR 1,000)"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleQuickAdd} className="bg-green-500 hover:bg-green-600">
                Add Product
              </Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select 
                className="px-3 py-2 border rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select 
                className="px-3 py-2 border rounded-md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="price">Price</option>
                <option value="stock">Stock</option>
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>
            </div>

            <Badge variant="outline">
              {filteredProducts.length} products found
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <Card key={product.id} className={`${!product.visible ? 'opacity-60 border-gray-300' : 'border-green-200'}`}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64x64?text=No+Image';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm truncate">{product.name}</h3>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleVisibility(product.id)}
                        className="p-1 h-6 w-6"
                      >
                        {product.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-1 h-6 w-6 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="outline" className="text-xs">{product.category}</Badge>
                      <Badge variant={product.stock <= 5 ? 'destructive' : 'default'} className="text-xs">
                        Stock: {product.stock}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-3 w-3 text-green-600" />
                      <input
                        type="text"
                        value={product.price}
                        onChange={(e) => handleQuickEdit(product, 'price', e.target.value)}
                        className="text-xs font-medium bg-transparent border-b border-gray-300 focus:border-green-500 outline-none w-20"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Package className="h-3 w-3 text-blue-600" />
                      <input
                        type="number"
                        value={product.stock}
                        onChange={(e) => handleQuickEdit(product, 'stock', parseInt(e.target.value) || 0)}
                        className="text-xs bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none w-16"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 mb-2">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}

      <SavePasswordDialog
        isOpen={isDialogOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title={dialogConfig.title}
        description={dialogConfig.description}
      />
    </div>
  );
};

export default QuickActions;
