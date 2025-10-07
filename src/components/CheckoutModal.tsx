import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, CreditCard, Truck, CheckCircle, Plus, Minus, MapPin, Upload } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Product } from '@/contexts/ProductContext';
import { useCart, CartItem } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
    country: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
    paymentType: 'cash_on_delivery',
    paymentMethod: ''
  });
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productQuantities, setProductQuantities] = useState<{[key: number]: number}>({});
  const { items, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();

  // Fetch payment methods
  const { data: paymentMethods } = useQuery({
    queryKey: ['payment-methods'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('is_enabled', true)
        .order('display_order');
      
      if (error) throw error;
      return data;
    },
  });

  const codMethods = paymentMethods?.filter(m => m.type === 'cash_on_delivery') || [];
  const advanceMethods = paymentMethods?.filter(m => m.type === 'advance_payment') || [];
  const selectedAdvanceMethod = advanceMethods.find(m => m.method_key === formData.paymentMethod);

  // Use cart items if no specific product is provided
  const orderItems = product ? [{ ...product, quantity: productQuantities[product.id] || 1 }] : items;

  const updateProductQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    setProductQuantities(prev => ({ ...prev, [productId]: quantity }));
  };

  const getItemPrice = (item: any) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
    const quantity = product ? (productQuantities[item.id] || 1) : item.quantity;
    return price * quantity;
  };

  const getItemQuantity = (item: any) => {
    return product ? (productQuantities[item.id] || 1) : item.quantity;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { subtotal, shipping, total } = calculateTotal();
      const currency = 'PKR';

      let paymentProofUrl = null;

      // Upload payment proof if provided
      if (paymentProof) {
        const fileExt = paymentProof.name.split('.').pop();
        const fileName = `payment-proof-${Date.now()}.${fileExt}`;
        const filePath = `payment-proofs/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('payment-proofs')
          .upload(filePath, paymentProof);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('payment-proofs')
          .getPublicUrl(filePath);

        paymentProofUrl = publicUrl;
      }

      const finalPaymentMethod = formData.paymentType === 'cash_on_delivery' 
        ? 'cash_on_delivery' 
        : formData.paymentMethod;

      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          zip_code: formData.postalCode,
          notes: formData.notes,
          payment_method: finalPaymentMethod,
          payment_proof_url: paymentProofUrl,
          subtotal,
          delivery_charges: shipping,
          total,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItemsToInsert = orderItems.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        product_name: item.name,
        product_image: item.image,
        quantity: getItemQuantity(item),
        price_at_purchase: parseFloat(item.price.replace(/[^\d.]/g, '')),
        currency: currency
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsToInsert);

      if (itemsError) throw itemsError;

      const orderDescription = product 
        ? `Your order for ${product.name} has been placed.`
        : `Your order with ${getTotalItems()} items has been placed.`;
      
      toast({
        title: "Order Placed Successfully!",
        description: `${orderDescription} Order #${orderData.order_number}. We'll contact you soon!`,
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
        country: '',
        address: '',
        city: '',
        postalCode: '',
        notes: '',
        paymentType: 'cash_on_delivery',
        paymentMethod: ''
      });
      setPaymentProof(null);
    } catch (error: any) {
      console.error('Order submission error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to place order. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const calculateTotal = () => {
    if (product) {
      const productPrice = parseFloat(product.price.replace(/[^\d.]/g, ''));
      const quantity = productQuantities[product.id] || 1;
      const subtotal = productPrice * quantity;
      const shippingCost = 150; // This will be dynamic based on product settings
      return { subtotal, shipping: shippingCost, total: subtotal + shippingCost };
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
          <div className="text-sm text-muted-foreground mt-2">
            Complete your order details below
          </div>
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
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => product ? updateProductQuantity(item.id, getItemQuantity(item) - 1) : updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{getItemQuantity(item)}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => product ? updateProductQuantity(item.id, getItemQuantity(item) + 1) : updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Rs. {parseFloat(item.price.replace(/[^\d.]/g, '')).toLocaleString()} each</p>
                    <p className="font-semibold text-gray-900">Rs. {getItemPrice(item).toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Qty: {getItemQuantity(item)}</p>
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
            </div>
            
            <div>
              <Label htmlFor="country" className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Country *
              </Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="e.g., Pakistan, India, Bangladesh"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="PK"
                value={formData.phone}
                onChange={(value) => setFormData(prev => ({ ...prev, phone: value || '' }))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter phone number"
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
            <div className="bg-blue-50 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Method
              </h3>
              
              {/* Payment Type Selection */}
              <RadioGroup
                value={formData.paymentType}
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  paymentType: value,
                  paymentMethod: value === 'cash_on_delivery' ? '' : prev.paymentMethod
                }))}
                className="space-y-3"
              >
                {codMethods.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash_on_delivery" id="cod" />
                    <Label htmlFor="cod" className="flex items-center cursor-pointer">
                      <Truck className="w-4 h-4 mr-2 text-green-600" />
                      Cash on Delivery
                    </Label>
                  </div>
                )}
                
                {advanceMethods.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advance_payment" id="advance" />
                    <Label htmlFor="advance" className="flex items-center cursor-pointer">
                      <CreditCard className="w-4 h-4 mr-2 text-purple-600" />
                      Advance Payment
                    </Label>
                  </div>
                )}
              </RadioGroup>

              {/* Advance Payment Methods Dropdown */}
              {formData.paymentType === 'advance_payment' && advanceMethods.length > 0 && (
                <div className="space-y-3 ml-6">
                  <Label>Select Payment Method</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {advanceMethods.map((method) => (
                        <SelectItem key={method.id} value={method.method_key}>
                          {method.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Show QR Code and Account Number if method is selected */}
                  {selectedAdvanceMethod && (
                    <div className="bg-white p-4 rounded-lg border space-y-3">
                      <h4 className="font-medium text-gray-900">{selectedAdvanceMethod.name} Details</h4>
                      
                      {selectedAdvanceMethod.qr_code_url && (
                        <div>
                          <Label className="text-sm text-gray-600">Scan QR Code</Label>
                          <img
                            src={selectedAdvanceMethod.qr_code_url}
                            alt={`${selectedAdvanceMethod.name} QR Code`}
                            className="w-48 h-48 object-contain border rounded mt-2"
                          />
                        </div>
                      )}
                      
                      {selectedAdvanceMethod.account_number && (
                        <div>
                          <Label className="text-sm text-gray-600">Account Number</Label>
                          <p className="font-mono text-lg font-semibold text-gray-900 mt-1">
                            {selectedAdvanceMethod.account_number}
                          </p>
                        </div>
                      )}

                      {/* Payment Proof Upload */}
                      <div className="space-y-2 pt-3 border-t">
                        <Label className="text-sm text-gray-700">
                          Upload Payment Proof (Screenshot) *
                        </Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setPaymentProof(e.target.files?.[0] || null)}
                          required={formData.paymentType === 'advance_payment'}
                          className="cursor-pointer"
                        />
                        {paymentProof && (
                          <p className="text-sm text-green-600 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            {paymentProof.name}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          Please upload a screenshot of your payment receipt
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
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