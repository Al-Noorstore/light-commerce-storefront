import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, CreditCard, Truck, CheckCircle, Plus, Minus } from 'lucide-react';
import { Product } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface CheckoutModalProps {
  product?: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();

  // Use cart items if no specific product is provided
  const orderItems = product ? [{ ...product, quantity: 1 }] : items;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order submission
    setTimeout(() => {
      const orderDescription = product 
        ? `Your order for ${product.name} has been placed.`
        : `Your order with ${getTotalItems()} items has been placed.`;
      
      toast({
        title: "Order Placed Successfully!",
        description: `${orderDescription} We'll contact you soon!`,
      });
      
      // Clear cart if it's a cart checkout
      if (!product) {
        clearCart();
      }
      
      setIsSubmitting(false);
      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        notes: ''
      });
    }, 2000);
  };

  const calculateTotal = () => {
    if (product) {
      const productPrice = parseFloat(product.price.replace(/[^\d.]/g, ''));
      const shippingCost = 150;
      return { subtotal: productPrice, shipping: shippingCost, total: productPrice + shippingCost };
    } else {
      const subtotal = getTotalPrice();
      const shippingCost = 150;
      return { subtotal, shipping: shippingCost, total: subtotal + shippingCost };
    }
  };

  const { subtotal, shipping, total } = calculateTotal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <ShoppingCart className="w-6 h-6 mr-2" />
            Checkout
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
            
            {/* Display items */}
            <div className="space-y-3">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    {!product && (
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{item.price}</p>
                    {!product && item.quantity > 1 && (
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-3" />
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center">
                  <Truck className="w-4 h-4 mr-1" />
                  Shipping:
                </span>
                <span>Rs. {shipping}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          {/* Customer Information Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+92 300 1234567"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <Label htmlFor="address">Complete Address *</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="House/Flat number, Street, Area"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="12345"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="notes">Special Instructions (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any special delivery instructions..."
              />
            </div>
            
            {/* Payment Method */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Method
              </h3>
              <p className="text-sm text-blue-800">
                Cash on Delivery (COD) - Pay when you receive your order
              </p>
            </div>
            
            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3"
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Place Order - Rs. {total.toLocaleString()}
                </>
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;