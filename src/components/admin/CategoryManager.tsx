
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: number;
  name: string;
  productCount: number;
}

const CategoryManager = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'All Products', productCount: 15 },
    { id: 2, name: 'Cosmetics', productCount: 3 },
    { id: 3, name: 'Home Decor', productCount: 2 },
    { id: 4, name: 'Electronics', productCount: 4 },
    { id: 5, name: 'Accessories', productCount: 2 },
    { id: 6, name: 'Kitchenware', productCount: 1 },
    { id: 7, name: 'Clothes', productCount: 2 },
    { id: 8, name: 'Sports & Fitness', productCount: 3 },
    { id: 9, name: 'Shoes', productCount: 3 }
  ]);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleEdit = (category: Category) => {
    setEditingCategory({ ...category });
  };

  const handleSave = () => {
    if (editingCategory) {
      setCategories(categories.map(c => 
        c.id === editingCategory.id ? editingCategory : c
      ));
      setEditingCategory(null);
      toast({
        title: "Category Updated",
        description: "Category has been successfully updated.",
      });
    }
  };

  const handleDelete = (id: number) => {
    const category = categories.find(c => c.id === id);
    if (category?.name === 'All Products') {
      toast({
        title: "Cannot Delete",
        description: "The 'All Products' category cannot be deleted.",
        variant: "destructive",
      });
      return;
    }

    if (confirm(`Are you sure you want to delete this category? This will affect ${category?.productCount} products.`)) {
      setCategories(categories.filter(c => c.id !== id));
      toast({
        title: "Category Deleted",
        description: "Category has been successfully deleted.",
      });
    }
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Invalid Name",
        description: "Please enter a valid category name.",
        variant: "destructive",
      });
      return;
    }

    const newId = Math.max(...categories.map(c => c.id)) + 1;
    const newCategory = {
      id: newId,
      name: newCategoryName.trim(),
      productCount: 0
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setShowAddForm(false);
    toast({
      title: "Category Added",
      description: "New category has been successfully created.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Category Management</h2>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Category</span>
        </Button>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category Name</label>
              <Input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddCategory}>Add Category</Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="relative">
            <CardContent className="p-6">
              {editingCategory?.id === category.id ? (
                <div className="space-y-4">
                  <Input
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    className="font-semibold text-lg"
                  />
                  <div className="flex space-x-2">
                    <Button onClick={handleSave} size="sm" className="flex items-center space-x-1">
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </Button>
                    <Button onClick={() => setEditingCategory(null)} size="sm" variant="outline">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline">{category.productCount} products</Badge>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleEdit(category)}
                      size="sm"
                      variant="outline"
                      className="flex items-center space-x-1"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </Button>
                    {category.name !== 'All Products' && (
                      <Button
                        onClick={() => handleDelete(category.id)}
                        size="sm"
                        variant="outline"
                        className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Category Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">Total Categories:</span>
              <span>{categories.length}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">Total Products:</span>
              <span>{categories.reduce((sum, cat) => sum + cat.productCount, 0)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">Average Products per Category:</span>
              <span>{(categories.reduce((sum, cat) => sum + cat.productCount, 0) / categories.length).toFixed(1)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryManager;
