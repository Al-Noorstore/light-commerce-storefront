import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, Save, X, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
  badge?: string;
  rating?: number;
  stock: number;
}

const ProductManager = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Premium Face Cream",
      category: "Cosmetics",
      price: "PKR 2,500",
      originalPrice: "PKR 3,000",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      badge: "20% OFF",
      rating: 4.8,
      stock: 15
    },
    {
      id: 2,
      name: "Elegant Dining Set",
      category: "Home Decor",
      price: "PKR 15,000",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
      badge: "NEW",
      rating: 4.6,
      stock: 8
    },
    {
      id: 3,
      name: "Wireless Headphones",
      category: "Electronics",
      price: "PKR 8,500",
      originalPrice: "PKR 10,000",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
      badge: "SALE",
      rating: 4.7,
      stock: 22
    },
    {
      id: 4,
      name: "Designer Handbag",
      category: "Accessories",
      price: "PKR 6,000",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      rating: 4.9,
      stock: 12
    },
    {
      id: 5,
      name: "Kitchen Cookware Set",
      category: "Kitchenware",
      price: "PKR 12,000",
      originalPrice: "PKR 14,000",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
      badge: "POPULAR",
      rating: 4.5,
      stock: 5
    },
    {
      id: 6,
      name: "Casual T-Shirt",
      category: "Clothes",
      price: "PKR 1,800",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
      rating: 4.4,
      stock: 30
    },
    {
      id: 7,
      name: "Moisturizing Serum",
      category: "Cosmetics",
      price: "PKR 3,200",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      badge: "TRENDING",
      rating: 4.8,
      stock: 18
    },
    {
      id: 8,
      name: "Smart Watch",
      category: "Electronics",
      price: "PKR 18,000",
      originalPrice: "PKR 22,000",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
      badge: "HOT",
      rating: 4.6,
      stock: 7
    },
    {
      id: 9,
      name: "Formal Shoes",
      category: "Clothes",
      price: "PKR 7,500",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
      rating: 4.3,
      stock: 14
    },
    {
      id: 10,
      name: "Yoga Mat",
      category: "Sports & Fitness",
      price: "PKR 2,200",
      originalPrice: "PKR 2,800",
      image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=400&fit=crop",
      badge: "FITNESS",
      rating: 4.7,
      stock: 25
    },
    {
      id: 11,
      name: "Resistance Bands Set",
      category: "Sports & Fitness",
      price: "PKR 1,500",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      badge: "NEW",
      rating: 4.5,
      stock: 30
    },
    {
      id: 12,
      name: "Protein Shaker Bottle",
      category: "Sports & Fitness",
      price: "PKR 800",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
      rating: 4.4,
      stock: 40
    },
  ]);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: '',
    price: '',
    image: '',
    stock: 0
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null);
      toast({
        title: "Product Updated",
        description: "Product has been successfully updated.",
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      toast({
        title: "Product Deleted",
        description: "Product has been successfully deleted.",
      });
    }
  };

  const handleAddProduct = () => {
    const id = Math.max(...products.map(p => p.id)) + 1;
    const product = {
      ...newProduct,
      id,
      name: newProduct.name!,
      category: newProduct.category!,
      price: newProduct.price!,
      image: newProduct.image!,
      stock: newProduct.stock || 0
    } as Product;
    
    setProducts([...products, product]);
    setNewProduct({ name: '', category: '', price: '', image: '', stock: 0 });
    setShowAddForm(false);
    toast({
      title: "Product Added",
      description: "New product has been successfully added.",
    });
  };

  const handleImageUpload = (productId?: number) => {
    // Simulate image upload
    const imageUrl = `https://images.unsplash.com/photo-${Date.now()}?w=400&h=400&fit=crop`;
    
    if (productId && editingProduct) {
      setEditingProduct({ ...editingProduct, image: imageUrl });
    } else if (showAddForm) {
      setNewProduct({ ...newProduct, image: imageUrl });
    }
    
    toast({
      title: "Image Uploaded",
      description: "Product image has been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add New Product</span>
        </Button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Product Name</label>
                <Input
                  value={newProduct.name || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Input
                  value={newProduct.category || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  placeholder="Enter category"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <Input
                  value={newProduct.price || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  placeholder="PKR 1,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stock</label>
                <Input
                  type="number"
                  value={newProduct.stock || 0}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Product Image</label>
              <div className="flex items-center space-x-2">
                <Input
                  value={newProduct.image || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  placeholder="Image URL or upload"
                />
                <Button onClick={() => handleImageUpload()} variant="outline" size="sm">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddProduct}>Add Product</Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-2 left-2 bg-red-500">{product.badge}</Badge>
              )}
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  size="sm"
                  onClick={() => handleEdit(product)}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-1 h-8 w-8"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-1 h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-sm text-amber-600 font-medium">{product.category}</p>
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-800">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                  {product.rating && (
                    <span className="text-sm text-gray-600">★ {product.rating}</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Edit Product</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name</label>
                  <Input
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <Input
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Stock</label>
                  <Input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Product Image</label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  />
                  <Button onClick={() => handleImageUpload(editingProduct.id)} variant="outline" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSave} className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
                <Button onClick={() => setEditingProduct(null)} variant="outline">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProductManager;
