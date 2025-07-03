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
import AdminAuth from '@/components/admin/AdminAuth';
import RealTimeDashboard from '@/components/admin/RealTimeDashboard';
import ProductManager from '@/components/admin/ProductManager';
import CategoryManager from '@/components/admin/CategoryManager';
import OrdersManager from '@/components/admin/OrdersManager';
import EnhancedBulkUpload from '@/components/admin/EnhancedBulkUpload';
import StockManager from '@/components/admin/StockManager';
import AdminRoleManager from '@/components/admin/AdminRoleManager';
import NotificationManager from '@/components/admin/NotificationManager';
import WebsiteEditor from '@/components/admin/WebsiteEditor';
import QuickActions from '@/components/admin/QuickActions';
import FeatureRequestForm from '@/components/admin/FeatureRequestForm';
import SettingsManager from '@/components/admin/SettingsManager';
import PasswordManager from '@/components/admin/PasswordManager';
import { useToast } from '@/hooks/use-toast';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import GoogleSheetsOrders from '@/components/admin/GoogleSheetsOrders';
import IntegratedStockManager from '@/components/admin/IntegratedStockManager';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser, logout } = useFirebaseAuth();

  useEffect(() => {
    // Check if user is authenticated and is the authorized admin
    if (currentUser && currentUser.email === 'alnoormall.pk@gmail.com') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [currentUser]);

  const handleLogin = (email: string) => {
    if (email === 'alnoormall.pk@gmail.com') {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      navigate('/');
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

  if (!isAuthenticated) {
    return <AdminAuth onLogin={handleLogin} />;
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
                <p className="text-sm font-medium text-gray-900">{currentUser?.email}</p>
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
            <RealTimeDashboard />
          </TabsContent>

          <TabsContent value="quick">
            <QuickActions />
          </TabsContent>

          <TabsContent value="integrated">
            <IntegratedStockManager />
          </TabsContent>

          <TabsContent value="sheets">
            <GoogleSheetsOrders />
          </TabsContent>

          <TabsContent value="products">
            <ProductManager />
          </TabsContent>

          <TabsContent value="stock">
            <StockManager />
          </TabsContent>

          <TabsContent value="upload">
            <EnhancedBulkUpload />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersManager />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManager />
          </TabsContent>

          <TabsContent value="editor">
            <WebsiteEditor />
          </TabsContent>

          <TabsContent value="admins">
            <AdminRoleManager />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationManager />
          </TabsContent>

          <TabsContent value="requests">
            <FeatureRequestForm />
          </TabsContent>

          <TabsContent value="passwords">
            <PasswordManager />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
