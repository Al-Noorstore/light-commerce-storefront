
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import { useGoogleSheets } from '@/hooks/useGoogleSheets';
import { useToast } from '@/hooks/use-toast';

const GoogleSheetsOrders = () => {
  const { orders, isLoading, error, refetch, updateStatus } = useGoogleSheets();
  const { toast } = useToast();

  const handleStatusUpdate = (rowIndex: number, newStatus: string) => {
    updateStatus({ rowIndex, status: newStatus });
    toast({
      title: "Status Updated",
      description: `Order status updated to ${newStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-500';
      case 'processing':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Error Loading Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Failed to load orders from Google Sheets</p>
          <Button onClick={() => refetch()} className="mt-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Google Sheets Orders</h2>
          <p className="text-gray-600">Real-time order tracking from your Google Form</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => refetch()}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={() => window.open('https://docs.google.com/spreadsheets/d/1gTAlaI-j4BsjNzJBgGc5arSDP30Gmd8FlEjfWdi5tDo/edit', '_blank')}
            variant="outline"
            size="sm"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Sheet
          </Button>
        </div>
      </div>

      {/* Orders List */}
      <div className="grid gap-4">
        {isLoading ? (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center">
                <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                Loading orders...
              </div>
            </CardContent>
          </Card>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Orders Found</h3>
              <p className="text-gray-500">No orders have been submitted yet.</p>
            </CardContent>
          </Card>
        ) : (
          orders.map((order, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{order.customerName}</CardTitle>
                    <p className="text-sm text-gray-600">Order #{index + 1}</p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Customer Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{order.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{order.phone}</span>
                    </div>
                    <div className="flex items-start space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <span>{order.address}</span>
                    </div>
                  </div>
                  
                  {/* Order Details */}
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Product:</span> {order.productName}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Quantity:</span> {order.quantity}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Price:</span> {order.price}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Date:</span> {order.orderDate}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Status Update Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => handleStatusUpdate(index, 'Processing')}
                    size="sm"
                    variant="outline"
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    Mark Processing
                  </Button>
                  <Button
                    onClick={() => handleStatusUpdate(index, 'Shipped')}
                    size="sm"
                    variant="outline"
                    className="text-purple-600 border-purple-200 hover:bg-purple-50"
                  >
                    Mark Shipped
                  </Button>
                  <Button
                    onClick={() => handleStatusUpdate(index, 'Delivered')}
                    size="sm"
                    variant="outline"
                    className="text-green-600 border-green-200 hover:bg-green-50"
                  >
                    Mark Delivered
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default GoogleSheetsOrders;
