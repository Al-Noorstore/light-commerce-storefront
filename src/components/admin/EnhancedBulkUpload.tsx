
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Upload, Download, FileSpreadsheet, CheckCircle, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSavePassword } from '@/hooks/useSavePassword';
import SavePasswordDialog from './SavePasswordDialog';

interface BulkProduct {
  productName: string;
  category: string;
  costPrice: number;
  retailPrice: number;
  deliveryCharges: number;
  profit: number;
  description: string;
  productCode: string;
  imageUrl: string;
  stock: number;
  minStock: number;
}

const EnhancedBulkUpload = () => {
  const { toast } = useToast();
  const { isDialogOpen, dialogConfig, requestSaveConfirmation, handleConfirm, handleClose } = useSavePassword();
  const [uploadedProducts, setUploadedProducts] = useState<BulkProduct[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStats, setUploadStats] = useState({ success: 0, skipped: 0 });
  const [editingProduct, setEditingProduct] = useState<number | null>(null);

  const downloadSampleCSV = () => {
    const sampleData = [
      {
        'Product Name': 'Premium Face Cream',
        'Category': 'Cosmetics',
        'Cost Price': '1500',
        'Retail Price': '2500',
        'Delivery Charges': '200',
        'Profit': '800',
        'Description': 'High-quality moisturizing cream for all skin types',
        'Product Code': 'COSM001',
        'Image URL': 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop',
        'Stock': '25',
        'Min Stock': '5'
      },
      {
        'Product Name': 'Wireless Headphones',
        'Category': 'Electronics',
        'Cost Price': '4000',
        'Retail Price': '8500',
        'Delivery Charges': '300',
        'Profit': '4200',
        'Description': 'High-quality wireless headphones with noise cancellation',
        'Product Code': 'ELEC001',
        'Image URL': 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop',
        'Stock': '15',
        'Min Stock': '3'
      }
    ];

    const csvContent = [
      Object.keys(sampleData[0]).join(','),
      ...sampleData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk_upload_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Template Downloaded",
      description: "Sample CSV template has been downloaded to your device",
    });
  };

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      toast({
        title: "Invalid File Format",
        description: "Please upload a CSV or Excel file only",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string;
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        
        const products: BulkProduct[] = [];
        let successCount = 0;
        let skippedCount = 0;

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
          
          if (values.length < headers.length || !values[0]) {
            skippedCount++;
            continue;
          }

          try {
            const product: BulkProduct = {
              productName: values[0] || '',
              category: values[1] || '',
              costPrice: parseFloat(values[2]) || 0,
              retailPrice: parseFloat(values[3]) || 0,
              deliveryCharges: parseFloat(values[4]) || 0,
              profit: parseFloat(values[5]) || 0,
              description: values[6] || '',
              productCode: values[7] || '',
              imageUrl: values[8] || '',
              stock: parseInt(values[9]) || 0,
              minStock: parseInt(values[10]) || 5
            };

            if (product.productName && product.category && product.retailPrice > 0) {
              products.push(product);
              successCount++;
            } else {
              skippedCount++;
            }
          } catch (error) {
            skippedCount++;
          }
        }

        setUploadedProducts(products);
        setUploadStats({ success: successCount, skipped: skippedCount });
        
        toast({
          title: "Upload Successful",
          description: `✅ ${successCount} Products Uploaded Successfully${skippedCount > 0 ? ` ⚠️ ${skippedCount} Rows Skipped (missing fields)` : ''}`,
        });
      } catch (error) {
        toast({
          title: "Upload Failed",
          description: "Error processing the file. Please check the format.",
          variant: "destructive"
        });
      } finally {
        setIsUploading(false);
      }
    };

    reader.readAsText(file);
  }, [toast]);

  const handleSaveProduct = (index: number, updatedProduct: BulkProduct) => {
    requestSaveConfirmation(
      () => {
        setUploadedProducts(prev => 
          prev.map((product, i) => i === index ? updatedProduct : product)
        );
        setEditingProduct(null);
        toast({
          title: "Product Updated",
          description: "Product changes have been saved successfully",
        });
      },
      'Save Product Changes',
      'Please confirm with your save password to update this product.'
    );
  };

  const toggleProductVisibility = (index: number) => {
    const product = uploadedProducts[index];
    console.log(`Toggling visibility for: ${product.productName}`);
    // Here you would implement the actual visibility toggle logic
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Bulk Stock Upload</h2>
          <p className="text-gray-600">Upload products from Excel or CSV files</p>
        </div>
        <Button onClick={downloadSampleCSV} variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Download Sample CSV</span>
        </Button>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload Products File</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <FileSpreadsheet className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Choose your Excel or CSV file</p>
              <p className="text-sm text-gray-600">Drag and drop or click to browse</p>
            </div>
            <div className="mt-4">
              <Input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="max-w-xs mx-auto"
              />
            </div>
            {isUploading && (
              <div className="mt-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500 mx-auto"></div>
                <p className="text-sm text-gray-600 mt-2">Processing file...</p>
              </div>
            )}
          </div>

          {uploadStats.success > 0 && (
            <div className="flex items-center justify-center space-x-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">
                ✅ {uploadStats.success} Products Uploaded Successfully
              </span>
              {uploadStats.skipped > 0 && (
                <>
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <span className="text-yellow-800">
                    ⚠️ {uploadStats.skipped} Rows Skipped
                  </span>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Uploaded Products Table */}
      {uploadedProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Uploaded Products ({uploadedProducts.length})</span>
              <Badge variant="outline">{uploadedProducts.length} items ready</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Image</th>
                    <th className="text-left p-2">Product Name</th>
                    <th className="text-left p-2">Category</th>
                    <th className="text-left p-2">Cost Price</th>
                    <th className="text-left p-2">Retail Price</th>
                    <th className="text-left p-2">Profit</th>
                    <th className="text-left p-2">Stock</th>
                    <th className="text-left p-2">Code</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedProducts.map((product, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-2">
                        <img 
                          src={product.imageUrl || 'https://via.placeholder.com/50x50?text=No+Image'} 
                          alt={product.productName}
                          className="w-12 h-12 object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50x50?text=No+Image';
                          }}
                        />
                      </td>
                      <td className="p-2 font-medium">{product.productName}</td>
                      <td className="p-2">
                        <Badge variant="outline">{product.category}</Badge>
                      </td>
                      <td className="p-2 text-red-600">PKR {product.costPrice}</td>
                      <td className="p-2 text-green-600 font-medium">PKR {product.retailPrice}</td>
                      <td className="p-2 text-blue-600">PKR {product.profit}</td>
                      <td className="p-2">
                        <Badge variant={product.stock <= product.minStock ? 'destructive' : 'default'}>
                          {product.stock}
                        </Badge>
                      </td>
                      <td className="p-2 text-sm font-mono">{product.productCode}</td>
                      <td className="p-2">
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingProduct(index)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleProductVisibility(index)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Product Modal */}
      {editingProduct !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Edit Product</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name</label>
                  <Input
                    value={uploadedProducts[editingProduct]?.productName || ''}
                    onChange={(e) => {
                      const updated = [...uploadedProducts];
                      updated[editingProduct] = { ...updated[editingProduct], productName: e.target.value };
                      setUploadedProducts(updated);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input
                    value={uploadedProducts[editingProduct]?.category || ''}
                    onChange={(e) => {
                      const updated = [...uploadedProducts];
                      updated[editingProduct] = { ...updated[editingProduct], category: e.target.value };
                      setUploadedProducts(updated);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Retail Price</label>
                  <Input
                    type="number"
                    value={uploadedProducts[editingProduct]?.retailPrice || 0}
                    onChange={(e) => {
                      const updated = [...uploadedProducts];
                      updated[editingProduct] = { ...updated[editingProduct], retailPrice: parseFloat(e.target.value) };
                      setUploadedProducts(updated);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Stock</label>
                  <Input
                    type="number"
                    value={uploadedProducts[editingProduct]?.stock || 0}
                    onChange={(e) => {
                      const updated = [...uploadedProducts];
                      updated[editingProduct] = { ...updated[editingProduct], stock: parseInt(e.target.value) };
                      setUploadedProducts(updated);
                    }}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => handleSaveProduct(editingProduct, uploadedProducts[editingProduct])}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Save Changes
                </Button>
                <Button onClick={() => setEditingProduct(null)} variant="outline">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <SavePasswordDialog
        isOpen={isDialogOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title={dialogConfig.title}
        description={dialogConfig.description}
      />
    </div>
  );
};

export default EnhancedBulkUpload;
