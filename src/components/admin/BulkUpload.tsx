
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, Download, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BulkUpload = () => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(files);
  };

  const processBulkUpload = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select files to upload first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Bulk Upload Complete",
        description: `Successfully uploaded ${uploadedFiles.length} file(s) with product data.`,
      });
      setUploadedFiles([]);
    }, 3000);
  };

  const downloadTemplate = () => {
    // Create CSV template
    const csvContent = "Product Name,Category,Price,Original Price,Image URL,Badge,Stock,Rating\n" +
                      "Sample Product,Electronics,PKR 5000,PKR 6000,https://example.com/image.jpg,NEW,10,4.5\n" +
                      "Another Product,Cosmetics,PKR 2500,,https://example.com/image2.jpg,SALE,25,4.8";
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'product_upload_template.csv';
    link.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Template Downloaded",
      description: "CSV template has been downloaded successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Bulk Product Upload</h2>
        <Button onClick={downloadTemplate} variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Download Template</span>
        </Button>
      </div>

      {/* Upload Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Upload Instructions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Supported File Formats:</h4>
            <ul className="text-blue-800 space-y-1">
              <li>• CSV (.csv) - Comma Separated Values</li>
              <li>• Excel (.xlsx, .xls) - Microsoft Excel</li>
              <li>• Text (.txt) - Tab or comma separated</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">Required Columns:</h4>
            <div className="grid grid-cols-2 gap-4 text-green-800">
              <ul className="space-y-1">
                <li>• Product Name (required)</li>
                <li>• Category (required)</li>
                <li>• Price (required)</li>
                <li>• Image URL (required)</li>
              </ul>
              <ul className="space-y-1">
                <li>• Original Price (optional)</li>
                <li>• Badge (optional)</li>
                <li>• Stock (optional, default: 0)</li>
                <li>• Rating (optional)</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-900 mb-2">Tips for Best Results:</h4>
            <ul className="text-amber-800 space-y-1">
              <li>• Use the provided template for correct formatting</li>
              <li>• Ensure image URLs are valid and accessible</li>
              <li>• Price format should include currency (e.g., "PKR 1000")</li>
              <li>• Categories should match existing ones or new ones will be created</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* File Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Product Files</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-700">Drop files here or click to browse</p>
              <p className="text-sm text-gray-500">Support for CSV, Excel, and Text files</p>
            </div>
            <input
              type="file"
              multiple
              accept=".csv,.xlsx,.xls,.txt"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button className="mt-4" asChild>
                <span className="cursor-pointer">Choose Files</span>
              </Button>
            </label>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Selected Files:</h4>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">{file.name}</span>
                    <span className="text-xs text-gray-500">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              ))}
            </div>
          )}

          {/* Process Button */}
          <div className="flex justify-center">
            <Button
              onClick={processBulkUpload}
              disabled={uploadedFiles.length === 0 || isProcessing}
              className="flex items-center space-x-2"
              size="lg"
            >
              <Upload className="h-5 w-5" />
              <span>{isProcessing ? 'Processing...' : 'Upload Products'}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Processing Status */}
      {isProcessing && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
              <div className="text-center">
                <p className="font-medium">Processing your files...</p>
                <p className="text-sm text-gray-600">This may take a few moments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BulkUpload;
