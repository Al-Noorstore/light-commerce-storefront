import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, 
  Package, 
  Upload,
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut,
  Bell,
  Shield,
  MessageSquare,
  TrendingUp,
  Boxes,
  Zap,
  Edit3,
  Lock,
  Store,
  DollarSign,
  AlertTriangle
} from 'lucide-react';
import ModernProductManager from '@/components/admin/ModernProductManager';
import OrdersManager from '@/components/admin/OrdersManager';
import PasswordManager from '@/components/admin/PasswordManager';
import FormManager from '@/components/admin/FormManager';
import PaymentMethodsManager from '@/components/admin/PaymentMethodsManager';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading, signOut, isAdmin } = useAuth();

  useEffect(() => {
    const loadProducts = async () => {
      if (!isAdmin) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('admin_products')
          .select('*')
          .eq('deleted', false);
        
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      loadProducts();
    }
  }, [isAdmin, authLoading]);

  const handleLogout = async () => {
    try {
      await signOut();
      
      navigate('/auth');
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Logout Error",
        description: "There was an error logging out. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Auto-redirect non-admin users to auth page
  useEffect(() => {
    if (!authLoading && !isAdmin && !user) {
      navigate('/auth');
      toast({
        title: "Authentication Required",
        description: "Please sign in with admin credentials to access the admin panel.",
        variant: "destructive"
      });
    } else if (!authLoading && user && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges. Please contact the administrator.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [authLoading, isAdmin, user, navigate, toast]);

  if (!isAdmin) {
    return null; // Will redirect via useEffect
  }

  const statsData = {
    totalProducts: products.length,
    categories: new Set(products.map(p => p.category)).size,
    lowStock: products.filter(p => (p.quantity || 0) < 10).length,
    revenue: products.reduce((sum, p) => sum + (Number(p.price) || 0), 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Modern Admin Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Al-Noor Admin
                </h1>
                <p className="text-sm text-gray-600">Store Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                <p className="text-xs text-emerald-600 font-medium">Super Admin</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Main Navigation - Organized in logical groups */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Core Management */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground px-2">Core Management</h3>
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === 'dashboard' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveTab('quick')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === 'quick' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <Zap className="h-4 w-4" />
                  <span>Quick Actions</span>
                </button>
              </div>
            </div>

            {/* Product Management */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground px-2">Product Management</h3>
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === 'products' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <Package className="h-4 w-4" />
                  <span>Products</span>
                </button>
                <button
                  onClick={() => setActiveTab('stock')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === 'stock' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <Boxes className="h-4 w-4" />
                  <span>Stock</span>
                </button>
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === 'upload' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <Upload className="h-4 w-4" />
                  <span>Bulk Upload</span>
                </button>
                <button
                  onClick={() => setActiveTab('categories')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === 'categories' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Categories</span>
                </button>
              </div>
            </div>

            {/* Orders & Data */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground px-2">Orders & Analytics</h3>
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === 'orders' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Orders</span>
                </button>
                <button
                  onClick={() => setActiveTab('integrated')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === 'integrated' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Live Data</span>
                </button>
                <button
                  onClick={() => setActiveTab('sheets')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === 'sheets' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Sheets</span>
                </button>
                <button
                  onClick={() => setActiveTab('forms')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === 'forms' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Forms</span>
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === 'notifications' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <Bell className="h-4 w-4" />
                  <span>Alerts</span>
                </button>
              </div>
            </div>

            {/* System Settings */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground px-2">System Settings</h3>
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === 'editor' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Website</span>
                </button>
                <button
                  onClick={() => setActiveTab('admins')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === 'admins' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  <span>Admins</span>
                </button>
                <button
                  onClick={() => setActiveTab('passwords')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === 'passwords' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <Lock className="h-4 w-4" />
                  <span>Passwords</span>
                </button>
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === 'requests' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Requests</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === 'settings' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => setActiveTab('payment-methods')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === 'payment-methods' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <DollarSign className="h-4 w-4" />
                  <span>Payment</span>
                </button>
              </div>
            </div>
          </div>

          <TabsContent value="dashboard">
            <div className="space-y-6">
              {/* Modern Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-100">Total Products</CardTitle>
                    <Package className="h-5 w-5 text-blue-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{statsData.totalProducts}</div>
                    <p className="text-xs text-blue-100 mt-1">Active products</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-emerald-100">Categories</CardTitle>
                    <Boxes className="h-5 w-5 text-emerald-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{statsData.categories}</div>
                    <p className="text-xs text-emerald-100 mt-1">Product categories</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-orange-100">Low Stock</CardTitle>
                    <AlertTriangle className="h-5 w-5 text-orange-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{statsData.lowStock}</div>
                    <p className="text-xs text-orange-100 mt-1">Need restocking</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-purple-100">Total Value</CardTitle>
                    <DollarSign className="h-5 w-5 text-purple-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">Rs.{statsData.revenue.toLocaleString()}</div>
                    <p className="text-xs text-purple-100 mt-1">Inventory value</p>
                  </CardContent>
                </Card>
              </div>

              {/* Welcome Card */}
              <Card className="bg-gradient-to-r from-gray-50 to-white border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Welcome to Al-Noor Admin Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Manage your store efficiently with real-time product management, inventory tracking, and administrative tools.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-200"
                      onClick={() => setActiveTab('products')}
                    >
                      <Package className="h-6 w-6 text-blue-600" />
                      <span className="text-sm">Manage Products</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-green-50 hover:border-green-200"
                      onClick={() => setActiveTab('stock')}
                    >
                      <Boxes className="h-6 w-6 text-green-600" />
                      <span className="text-sm">Check Stock</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 hover:border-purple-200"
                      onClick={() => setActiveTab('forms')}
                    >
                      <MessageSquare className="h-6 w-6 text-purple-600" />
                      <span className="text-sm">View Orders</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-orange-50 hover:border-orange-200"
                      onClick={() => setActiveTab('settings')}
                    >
                      <Settings className="h-6 w-6 text-orange-600" />
                      <span className="text-sm">Settings</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quick">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <p className="text-gray-600 mb-4">Perform quick administrative tasks.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-20 flex flex-col items-center justify-center">
                  <Package className="h-6 w-6 mb-2" />
                  <span>Add Product</span>
                </Button>
                <Button className="h-20 flex flex-col items-center justify-center">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  <span>View Reports</span>
                </Button>
                <Button className="h-20 flex flex-col items-center justify-center">
                  <Settings className="h-6 w-6 mb-2" />
                  <span>Settings</span>
                </Button>
                <Button className="h-20 flex flex-col items-center justify-center">
                  <Users className="h-6 w-6 mb-2" />
                  <span>Manage Users</span>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integrated">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Live Data Integration</h3>
              <p className="text-gray-600 mb-4">Real-time data synchronization features.</p>
              <Button disabled className="opacity-50">
                Feature Available in Full Version
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="sheets">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Google Sheets Integration</h3>
              <p className="text-gray-600 mb-4">Manage orders and data through Google Sheets.</p>
              <Button disabled className="opacity-50">
                Feature Available in Full Version
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <ModernProductManager />
          </TabsContent>

          <TabsContent value="stock">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Stock Management</h3>
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-orange-600">Low Stock Products</h4>
                  {products.filter(p => (p.stock || 0) < 10).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {products.filter(p => (p.stock || 0) < 10).map((product) => (
                        <div key={product.id} className="border border-orange-200 p-4 rounded-lg">
                          <h5 className="font-semibold">{product.name}</h5>
                          <p className="text-sm text-gray-600">{product.category}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm font-medium">Stock: {product.stock || 0}</span>
                            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                              Low Stock
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">All products are well stocked!</p>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="passwords">
            <PasswordManager />
          </TabsContent>

          <TabsContent value="upload">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Bulk Upload</h3>
              <p className="text-gray-600 mb-4">Upload multiple products at once using CSV or Excel files.</p>
              <Button disabled className="opacity-50">
                Feature Available in Full Version
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <OrdersManager />
          </TabsContent>

          <TabsContent value="categories">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Category Management</h3>
              <p className="text-gray-600 mb-4">Organize and manage product categories.</p>
              <div className="space-y-2">
                <h4 className="font-medium">Current Categories:</h4>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(products.map(p => p.category))).map((category, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="editor">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Website Editor</h3>
              <p className="text-gray-600 mb-4">Customize your website appearance and content.</p>
              <Button disabled className="opacity-50">
                Feature Available in Full Version
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="admins">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Admin Role Management</h3>
              <p className="text-gray-600 mb-4">Manage admin users and their permissions.</p>
              <Button disabled className="opacity-50">
                Feature Available in Full Version
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Notification Management</h3>
              <p className="text-gray-600 mb-4">Configure alerts and notifications.</p>
              <Button disabled className="opacity-50">
                Feature Available in Full Version
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="requests">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Feature Requests</h3>
              <p className="text-gray-600 mb-4">Submit and manage feature requests.</p>
              <Button disabled className="opacity-50">
                Feature Available in Full Version
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Settings Management</h3>
              <p className="text-gray-600 mb-4">Configure system settings and preferences.</p>
              <Button disabled className="opacity-50">
                Feature Available in Full Version
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="payment-methods">
            <PaymentMethodsManager />
          </TabsContent>

          <TabsContent value="forms">
            <FormManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
