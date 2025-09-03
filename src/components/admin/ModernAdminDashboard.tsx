import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  AlertTriangle,
  Users,
  Calendar,
  Mail,
  Bell,
  Plus,
  Edit3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  stock: number;
  image: string;
  badge?: string;
}

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  lowStock: number;
  revenue: string;
}

export const ModernAdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    lowStock: 0,
    revenue: 'Rs. 0',
  });
  const [lowStockItems, setLowStockItems] = useState<Product[]>([]);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load products from Supabase
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading products:', error);
        // Fallback to localStorage if Supabase fails
        loadLocalStorageData();
        return;
      }

      if (products) {
        const formattedProducts = products.map(p => ({
          id: p.id.toString(),
          name: p.name,
          price: p.price,
          category: p.category,
          stock: p.stock || 0,
          image: p.image,
          badge: p.badge
        }));

        const lowStock = formattedProducts.filter(p => p.stock <= 5);
        setLowStockItems(lowStock.slice(0, 3));
        setRecentProducts(formattedProducts.slice(0, 3));

        setStats({
          totalProducts: formattedProducts.length,
          totalOrders: 0, // Will be implemented with orders table
          lowStock: lowStock.length,
          revenue: 'Rs. 0' // Will be calculated from orders
        });
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      loadLocalStorageData();
    } finally {
      setLoading(false);
    }
  };

  const loadLocalStorageData = () => {
    // Fallback to localStorage for existing data
    try {
      const customProductsString = localStorage.getItem('customProducts');
      const customProducts = customProductsString ? JSON.parse(customProductsString) : [];
      const deletedProductIdsString = localStorage.getItem('deletedProductIds');
      const deletedProductIds = deletedProductIdsString ? JSON.parse(deletedProductIdsString) : [];
      
      const activeProducts = customProducts.filter((p: any) => !deletedProductIds.includes(p.id));
      const lowStock = activeProducts.filter((p: any) => (p.quantity || 0) <= 5);
      
      setStats({
        totalProducts: activeProducts.length,
        totalOrders: 0,
        lowStock: lowStock.length,
        revenue: 'Rs. 0'
      });
      
      setLowStockItems(lowStock.slice(0, 3).map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price.toString(),
        category: p.category,
        stock: p.quantity || 0,
        image: p.imageUrl
      })));
      
      setRecentProducts(activeProducts.slice(0, 3).map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price.toString(),
        category: p.category,
        stock: p.quantity || 0,
        image: p.imageUrl
      })));
    } catch (error) {
      console.error('Error loading localStorage data:', error);
    }
  };

  const handleAddProduct = () => {
    window.location.href = '/admin/add-product';
  };

  const handleManageProducts = () => {
    window.location.href = '/admin/edit-products';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl p-6">
        <h1 className="text-2xl font-bold text-foreground">Welcome to Al-Noor Admin</h1>
        <p className="text-muted-foreground mt-1">Manage your store with ease and efficiency</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Products</CardTitle>
            <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.totalProducts}</div>
            <p className="text-xs text-blue-600 dark:text-blue-400">active in store</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{stats.totalOrders}</div>
            <p className="text-xs text-green-600 dark:text-green-400">lifetime total</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">{stats.revenue}</div>
            <p className="text-xs text-amber-600 dark:text-amber-400">this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900 dark:text-red-100">{stats.lowStock}</div>
            <p className="text-xs text-red-600 dark:text-red-400">need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={handleAddProduct}
              className="w-full justify-start h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
            <Button 
              onClick={handleManageProducts}
              variant="outline" 
              className="w-full justify-start h-12"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Manage Products
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-12"
              disabled
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Newsletter
              <Badge variant="secondary" className="ml-auto">Soon</Badge>
            </Button>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockItems.length > 0 ? (
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    <Badge variant="destructive" className="text-xs">
                      {item.stock} left
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p>All products are well stocked!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Recent Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentProducts.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-primary">Rs. {product.price}</span>
                    <Badge variant="outline" className="text-xs">
                      Stock: {product.stock}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
              <p>No products found. Add your first product!</p>
              <Button onClick={handleAddProduct} className="mt-3">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ModernAdminDashboard;