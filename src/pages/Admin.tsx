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
  Boxes
} from 'lucide-react';
import AdminAuth from '@/components/admin/AdminAuth';
import AdminDashboard from '@/components/admin/AdminDashboard';
import ProductManager from '@/components/admin/ProductManager';
import CategoryManager from '@/components/admin/CategoryManager';
import OrdersManager from '@/components/admin/OrdersManager';
import BulkUpload from '@/components/admin/BulkUpload';
import StockManager from '@/components/admin/StockManager';
import AdminRoleManager from '@/components/admin/AdminRoleManager';
import NotificationManager from '@/components/admin/NotificationManager';
import WebsiteCustomizer from '@/components/admin/WebsiteCustomizer';
import FeatureRequestForm from '@/components/admin/FeatureRequestForm';
import SettingsManager from '@/components/admin/SettingsManager';
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
                <p className="text-sm text-gray-600">Complete Store Management System</p>
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
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-12 gap-1">
            <TabsTrigger value="dashboard" className="flex items-center space-x-1">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="integrated" className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Live Data</span>
            </TabsTrigger>
            <TabsTrigger value="sheets" className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Sheets</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center space-x-1">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="stock" className="flex items-center space-x-1">
              <Boxes className="h-4 w-4" />
              <span className="hidden sm:inline">Stock</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center space-x-1">
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Upload</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-1">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Categories</span>
            </TabsTrigger>
            <TabsTrigger value="admins" className="flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Admins</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-1">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="customizer" className="flex items-center space-x-1">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Design</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Requests</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-1">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <AdminDashboard />
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
            <BulkUpload />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersManager />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManager />
          </TabsContent>

          <TabsContent value="admins">
            <AdminRoleManager />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationManager />
          </TabsContent>

          <TabsContent value="customizer">
            <WebsiteCustomizer />
          </TabsContent>

          <TabsContent value="requests">
            <FeatureRequestForm />
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
