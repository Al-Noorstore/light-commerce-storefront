
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  AlertTriangle,
  Users,
  Calendar,
  Mail,
  Bell
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = {
    totalProducts: 15,
    totalOrders: 48,
    lowStock: 3,
    activeCategories: 9,
    monthlyOrders: 156,
    revenue: 'PKR 125,000'
  };

  const recentOrders = [
    { id: 'ORD001', customer: 'Ahmed Khan', product: 'Premium Face Cream', amount: 'PKR 2,500', status: 'New' },
    { id: 'ORD002', customer: 'Fatima Ali', product: 'Wireless Headphones', amount: 'PKR 8,500', status: 'Processing' },
    { id: 'ORD003', customer: 'Hassan Shah', product: 'Designer Handbag', amount: 'PKR 6,000', status: 'Shipped' }
  ];

  const lowStockItems = [
    { name: 'Kitchen Cookware Set', stock: 2, category: 'Kitchenware' },
    { name: 'Smart Watch', stock: 1, category: 'Electronics' },
    { name: 'Yoga Mat', stock: 3, category: 'Sports & Fitness' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.revenue}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alert</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.lowStock}</div>
            <p className="text-xs text-muted-foreground">Items need restocking</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <span>Recent Orders</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-sm text-gray-600">{order.product}</p>
                  <p className="text-sm font-semibold text-green-600">{order.amount}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  order.status === 'New' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {order.status}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>Low Stock Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowStockItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-red-600">{item.stock}</p>
                  <p className="text-xs text-gray-500">units left</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all">
              <Package className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Add Product</span>
            </button>
            <button className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all">
              <Mail className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Send Alert</span>
            </button>
            <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all">
              <Users className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Manage Admins</span>
            </button>
            <button className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all">
              <Bell className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Notifications</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events Reminder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Upcoming Events & Suggestions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-medium text-green-800">Ramadan Approaching (March 2024)</p>
              <p className="text-sm text-green-700">Consider promoting: Prayer mats, Islamic books, Iftar essentials</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-medium text-blue-800">Pakistan Day (March 23)</p>
              <p className="text-sm text-blue-700">Suggest: Green & white themed products, Pakistani flags</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
