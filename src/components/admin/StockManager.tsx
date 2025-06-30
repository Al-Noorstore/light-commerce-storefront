
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Package, Plus, Minus, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StockItem {
  id: number;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  price: string;
  visible: boolean;
  lastOrdered: string;
}

const StockManager = () => {
  const { toast } = useToast();
  const [stockItems, setStockItems] = useState<StockItem[]>([
    {
      id: 1,
      name: "Premium Face Cream",
      category: "Cosmetics",
      currentStock: 15,
      minStock: 5,
      maxStock: 50,
      price: "PKR 2,500",
      visible: true,
      lastOrdered: "2024-01-15"
    },
    {
      id: 2,
      name: "Kitchen Cookware Set",
      category: "Kitchenware",
      currentStock: 2,
      minStock: 5,
      maxStock: 20,
      price: "PKR 12,000",
      visible: true,
      lastOrdered: "2024-01-10"
    },
    {
      id: 3,
      name: "Smart Watch",
      category: "Electronics",
      currentStock: 1,
      minStock: 3,
      maxStock: 15,
      price: "PKR 18,000",
      visible: false,
      lastOrdered: "2024-01-12"
    }
  ]);

  const [showStockToCustomers, setShowStockToCustomers] = useState(true);

  const updateStock = (id: number, change: number) => {
    setStockItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, currentStock: Math.max(0, item.currentStock + change) }
          : item
      )
    );
    
    toast({
      title: "Stock Updated",
      description: `Stock ${change > 0 ? 'increased' : 'decreased'} successfully`,
    });
  };

  const toggleVisibility = (id: number) => {
    setStockItems(items =>
      items.map(item =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const setCustomStock = (id: number, newStock: string) => {
    const stock = parseInt(newStock) || 0;
    setStockItems(items =>
      items.map(item =>
        item.id === id ? { ...item, currentStock: stock } : item
      )
    );
  };

  const getStockStatus = (item: StockItem) => {
    if (item.currentStock === 0) return { status: 'Out of Stock', color: 'bg-red-500' };
    if (item.currentStock <= item.minStock) return { status: 'Low Stock', color: 'bg-yellow-500' };
    if (item.currentStock >= item.maxStock) return { status: 'Overstock', color: 'bg-blue-500' };
    return { status: 'In Stock', color: 'bg-green-500' };
  };

  const lowStockItems = stockItems.filter(item => item.currentStock <= item.minStock);
  const outOfStockItems = stockItems.filter(item => item.currentStock === 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Stock Management</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Show Stock to Customers:</span>
            <Button
              onClick={() => setShowStockToCustomers(!showStockToCustomers)}
              variant={showStockToCustomers ? "default" : "outline"}
              size="sm"
            >
              {showStockToCustomers ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              <span className="ml-2">{showStockToCustomers ? 'Visible' : 'Hidden'}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Stock Alerts */}
      {(lowStockItems.length > 0 || outOfStockItems.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {outOfStockItems.length > 0 && (
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Out of Stock ({outOfStockItems.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {outOfStockItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span className="font-medium">{item.name}</span>
                      <Badge variant="destructive">0 units</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {lowStockItems.length > 0 && (
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-yellow-600">
                  <Package className="h-5 w-5" />
                  <span>Low Stock ({lowStockItems.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lowStockItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                      <span className="font-medium">{item.name}</span>
                      <Badge variant="outline" className="text-yellow-700">
                        {item.currentStock} units
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Stock Items */}
      <div className="grid grid-cols-1 gap-4">
        {stockItems.map(item => {
          const stockStatus = getStockStatus(item);
          return (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.category} • {item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${stockStatus.color} text-white`}>
                      {stockStatus.status}
                    </Badge>
                    <Button
                      onClick={() => toggleVisibility(item.id)}
                      variant="outline"
                      size="sm"
                    >
                      {item.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Current Stock */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Stock</label>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => updateStock(item.id, -1)}
                        variant="outline"
                        size="sm"
                        disabled={item.currentStock <= 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.currentStock}
                        onChange={(e) => setCustomStock(item.id, e.target.value)}
                        className="text-center w-20"
                        min="0"
                      />
                      <Button
                        onClick={() => updateStock(item.id, 1)}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Stock Levels */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Stock Levels</label>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Minimum:</span>
                        <span className="font-medium">{item.minStock}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maximum:</span>
                        <span className="font-medium">{item.maxStock}</span>
                      </div>
                    </div>
                  </div>

                  {/* Last Ordered */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Ordered</label>
                    <p className="text-sm text-gray-600">{item.lastOrdered}</p>
                    <div className="text-xs text-gray-500">
                      {Math.floor((new Date().getTime() - new Date(item.lastOrdered).getTime()) / (1000 * 60 * 60 * 24))} days ago
                    </div>
                  </div>
                </div>

                {/* Stock Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Stock Level</span>
                    <span>{item.currentStock} / {item.maxStock}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.currentStock <= item.minStock ? 'bg-red-500' :
                        item.currentStock >= item.maxStock ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StockManager;
