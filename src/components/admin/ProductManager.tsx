import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, Save, X, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useProducts, Product } from '@/contexts/ProductContext';


const ProductManager = () => {
  const { toast } = useToast();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: '',
    price: '',
    image: '',
    stock: 0,
    buyNowLink: '',
    buyNowText: 'Buy Now'
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleSave = () => {
    if (editingProduct) {
      updateProduct(editingProduct.id, editingProduct);
      setEditingProduct(null);
      toast({
        title: "Product Updated",
        description: "Product has been successfully updated.",
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      toast({
        title: "Product Deleted",
        description: "Product has been successfully deleted.",
      });
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.image) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const product = {
      name: newProduct.name,
      category: newProduct.category,
      price: newProduct.price,
      image: newProduct.image,
      stock: newProduct.stock || 0,
      buyNowLink: newProduct.buyNowLink,
      buyNowText: newProduct.buyNowText || 'Buy Now'
    };
    
    addProduct(product);
    setNewProduct({ name: '', category: '', price: '', image: '', stock: 0, buyNowLink: '', buyNowText: 'Buy Now' });
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
                <div>
                  <label className="block text-sm font-medium mb-2">Buy Now Link</label>
                  <Input
                    value={newProduct.buyNowLink || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, buyNowLink: e.target.value })}
                    placeholder="https://wa.me/923222520101 or Google Form URL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Buy Now Button Text</label>
                  <Input
                    value={newProduct.buyNowText || 'Buy Now'}
                    onChange={(e) => setNewProduct({ ...newProduct, buyNowText: e.target.value })}
                    placeholder="Buy Now, Order Now, etc."
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
                <div>
                  <label className="block text-sm font-medium mb-2">Buy Now Link</label>
                  <Input
                    value={editingProduct.buyNowLink || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, buyNowLink: e.target.value })}
                    placeholder="https://wa.me/923222520101 or Google Form URL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Buy Now Button Text</label>
                  <Input
                    value={editingProduct.buyNowText || 'Buy Now'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, buyNowText: e.target.value })}
                    placeholder="Buy Now, Order Now, etc."
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
