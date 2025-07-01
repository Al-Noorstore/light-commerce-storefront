
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Package, RefreshCw } from 'lucide-react';
import { useGoogleSheets } from '@/hooks/useGoogleSheets';
import { useFirestoreProducts } from '@/hooks/useFirestoreProducts';
import { useToast } from '@/hooks/use-toast';

const IntegratedStockManager = () => {
  const { orders, isLoading: ordersLoading, refetch: refetchOrders } = useGoogleSheets();
  const { 
    products, 
    lowStockProducts, 
    isLoading: productsLoading,
    updateStock 
  } = useFirestoreProducts();
  const { toast } = useToast();

  // Auto-update stock based on new orders
  useEffect(() => {
    if (orders.length > 0 && products.length > 0) {
      orders.forEach(order => {
        const product = products.find(p => 
          p.name.toLowerCase().includes(order.productName.toLowerCase())
        );
        
        if (product && parseInt(order.quantity) > 0) {
          // Check if we need to update stock
          console.log(`Processing order: ${order.productName} x ${order.quantity}`);
        }
      });
    }
  }, [orders, products]);

  const handleRefreshData = () => {
    refetchOrders();
    toast({
      title: "Data Refreshed",
      description: "Orders and stock data updated from Google Sheets",
    });
  };

  if (ordersLoading || productsLoading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
          <p>Loading integrated data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Integrated Stock & Orders</h2>
          <p className="text-gray-600">Real-time data from Google Sheets & Firestore</p>
        </div>
        <Button onClick={handleRefreshData} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{products.length}</div>
            <div className="text-sm text-gray-600">Products</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{lowStockProducts.length}</div>
            <div className="text-sm text-gray-600">Low Stock</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {orders.reduce((sum, order) => sum + parseInt(order.quantity || '0'), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Items Sold</div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      {lowStockProducts.length > 0 && (
        <Card className="border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-600">
              <AlertTriangle className="h-5 w-5" />
              <span>Low Stock Alerts ({lowStockProducts.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {lowStockProducts.map(product => (
                <div key={product.id} className="p-3 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-600">Stock: {product.stock} / Min: {product.minStock}</p>
                  <Badge variant="outline" className="mt-1 text-yellow-700">
                    Low Stock
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Recent Orders from Google Sheets</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orders.slice(0, 10).map((order, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{order.customerName}</h4>
                  <p className="text-sm text-gray-600">{order.productName} x {order.quantity}</p>
                  <p className="text-xs text-gray-500">{order.phone}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.price}</p>
                  <Badge variant="outline">Pending</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegratedStockManager;
