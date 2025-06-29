
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, Phone, Mail, Calendar, Filter, Search } from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productName: string;
  productPrice: string;
  quantity: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

const OrdersManager = () => {
  const [orders] = useState<Order[]>([
    {
      id: 'ORD001',
      customerName: 'Ahmed Khan',
      customerEmail: 'ahmed@example.com',
      customerPhone: '+92 300 1234567',
      productName: 'Premium Face Cream',
      productPrice: 'PKR 2,500',
      quantity: 1,
      status: 'pending',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 'ORD002',
      customerName: 'Fatima Ali',
      customerEmail: 'fatima@example.com',
      customerPhone: '+92 301 2345678',
      productName: 'Wireless Headphones',
      productPrice: 'PKR 8,500',
      quantity: 2,
      status: 'confirmed',
      createdAt: '2024-01-14T15:45:00Z'
    },
    {
      id: 'ORD003',
      customerName: 'Hassan Shah',
      customerEmail: 'hassan@example.com',
      customerPhone: '+92 302 3456789',
      productName: 'Designer Handbag',
      productPrice: 'PKR 6,000',
      quantity: 1,
      status: 'shipped',
      createdAt: '2024-01-13T09:20:00Z'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Orders Management</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{orderStats.total}</div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{orderStats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{orderStats.confirmed}</div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{orderStats.shipped}</div>
            <div className="text-sm text-gray-600">Shipped</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{orderStats.delivered}</div>
            <div className="text-sm text-gray-600">Delivered</div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Customer Info */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Customer Details</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="font-medium text-gray-800">{order.customerName}</p>
                    <p className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {order.customerEmail}
                    </p>
                    <p className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {order.customerPhone}
                    </p>
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Product Details</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="font-medium text-gray-800">{order.productName}</p>
                    <p>Price: <span className="font-medium">{order.productPrice}</span></p>
                    <p>Quantity: <span className="font-medium">{order.quantity}</span></p>
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Actions</h4>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full flex items-center justify-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </Button>
                    <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md">
                      <option value={order.status}>Change Status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No orders found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrdersManager;
