import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Upload, Trash2 } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'cash_on_delivery' | 'advance_payment';
  method_key: string;
  is_enabled: boolean;
  qr_code_url: string | null;
  account_number: string | null;
  display_order: number;
}

export default function PaymentMethodsManager() {
  const queryClient = useQueryClient();
  const [uploadingQR, setUploadingQR] = useState<string | null>(null);

  const { data: paymentMethods, isLoading } = useQuery({
    queryKey: ['payment-methods-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      return data as PaymentMethod[];
    },
  });

  const updateMethod = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<PaymentMethod> }) => {
      const { error } = await supabase
        .from('payment_methods')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods-admin'] });
      toast.success('Payment method updated');
    },
    onError: (error) => {
      toast.error('Failed to update payment method: ' + error.message);
    },
  });

  const handleQRUpload = async (methodId: string, file: File) => {
    setUploadingQR(methodId);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `qr-${methodId}-${Date.now()}.${fileExt}`;
      const filePath = `payment-qr/${fileName}`;

      // Note: You need to create a storage bucket called 'payment-qr' first
      const { error: uploadError, data } = await supabase.storage
        .from('payment-qr')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('payment-qr')
        .getPublicUrl(filePath);

      await updateMethod.mutateAsync({
        id: methodId,
        updates: { qr_code_url: publicUrl },
      });

      toast.success('QR code uploaded successfully');
    } catch (error: any) {
      toast.error('Failed to upload QR code: ' + error.message);
    } finally {
      setUploadingQR(null);
    }
  };

  const handleRemoveQR = async (methodId: string) => {
    await updateMethod.mutateAsync({
      id: methodId,
      updates: { qr_code_url: null },
    });
  };

  if (isLoading) {
    return <div className="p-6">Loading payment methods...</div>;
  }

  const codMethods = paymentMethods?.filter(m => m.type === 'cash_on_delivery') || [];
  const advanceMethods = paymentMethods?.filter(m => m.type === 'advance_payment') || [];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Payment Methods Configuration</h2>
        <p className="text-muted-foreground mb-6">
          Configure payment methods, add QR codes, and account numbers
        </p>
      </div>

      {/* Cash on Delivery Section */}
      <Card>
        <CardHeader>
          <CardTitle>Cash on Delivery</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {codMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Switch
                  checked={method.is_enabled}
                  onCheckedChange={(checked) =>
                    updateMethod.mutate({ id: method.id, updates: { is_enabled: checked } })
                  }
                />
                <span className="font-medium">{method.name}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Advance Payment Methods Section */}
      <Card>
        <CardHeader>
          <CardTitle>Advance Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {advanceMethods.map((method) => (
            <div key={method.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Switch
                    checked={method.is_enabled}
                    onCheckedChange={(checked) =>
                      updateMethod.mutate({ id: method.id, updates: { is_enabled: checked } })
                    }
                  />
                  <span className="font-medium">{method.name}</span>
                </div>
              </div>

              {method.is_enabled && (
                <div className="grid md:grid-cols-2 gap-4 ml-12">
                  {/* Account Number */}
                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <Input
                      placeholder="Enter account number"
                      defaultValue={method.account_number || ''}
                      onBlur={(e) => {
                        if (e.target.value !== method.account_number) {
                          updateMethod.mutate({
                            id: method.id,
                            updates: { account_number: e.target.value || null },
                          });
                        }
                      }}
                    />
                  </div>

                  {/* QR Code Upload */}
                  <div className="space-y-2">
                    <Label>QR Code</Label>
                    {method.qr_code_url ? (
                      <div className="space-y-2">
                        <img
                          src={method.qr_code_url}
                          alt={`${method.name} QR Code`}
                          className="w-32 h-32 object-contain border rounded"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveQR(method.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove QR Code
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleQRUpload(method.id, file);
                          }}
                          disabled={uploadingQR === method.id}
                        />
                        {uploadingQR === method.id && (
                          <p className="text-sm text-muted-foreground mt-2">Uploading...</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
