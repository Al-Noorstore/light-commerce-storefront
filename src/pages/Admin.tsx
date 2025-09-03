import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Palette,
  MessageSquare,
  TrendingUp,
  Boxes,
  Zap,
  Edit3,
  Lock
} from 'lucide-react';
import AdminLogin from '@/components/AdminLogin';
import ProductManager from '@/components/admin/ProductManager';
import PasswordManager from '@/components/admin/PasswordManager';
import FormManager from '@/components/admin/FormManager';
import ModernAdminDashboard from '@/components/admin/ModernAdminDashboard';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/contexts/ProductContext';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { products } = useProducts();
  const { user, loading, signOut, isAdmin } = useAuth();

  useEffect(() => {
    if (!loading) {
      setIsAuthenticated(isAdmin);
    }
  }, [loading, isAdmin]);

  const handleLogin = (email: string) => {
    if (email === 'alnoormall.pk@gmail.com') {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-primary border-t-transparent"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">You need admin privileges to access this page.</p>
          <Button onClick={() => navigate('/auth')}>Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">AN</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Al-Noor Admin Panel</h1>
                <p className="text-sm text-gray-600">Complete Real-Time Store Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
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
              </div>
            </div>
          </div>

          <TabsContent value="dashboard">
            <ModernAdminDashboard />
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
            <ProductManager />
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
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Orders Management</h3>
              <p className="text-gray-600 mb-4">Manage customer orders and track deliveries.</p>
              <Button disabled className="opacity-50">
                Feature Available in Full Version
              </Button>
            </div>
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

          <TabsContent value="forms">
            <FormManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
