import React, { useState } from 'react';
import { useFormSubmissions } from '@/contexts/FormSubmissionContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Eye, Edit, Trash2, Copy, RefreshCw } from 'lucide-react';

const FormManager = () => {
  const { submissions, loading, fetchSubmissions, updateSubmissionStatus, deleteSubmission } = useFormSubmissions();
  const { toast } = useToast();
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState('');
  const [editingNotes, setEditingNotes] = useState('');

  // API URLs for different form integrations
  const apiBaseUrl = 'https://osrolxzvnurzisusv.supabase.co/functions/v1';
  const formApiUrl = `${apiBaseUrl}/submit-form`;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormTypeColor = (formType: string) => {
    switch (formType) {
      case 'netlify': return 'bg-teal-100 text-teal-800';
      case 'google': return 'bg-purple-100 text-purple-800';
      case 'local': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditSubmission = (submission: any) => {
    setSelectedSubmission(submission);
    setEditingStatus(submission.status);
    setEditingNotes(submission.notes || '');
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedSubmission) return;

    try {
      await updateSubmissionStatus(selectedSubmission.id, editingStatus, editingNotes);
      setIsEditModalOpen(false);
      toast({
        title: "Success",
        description: "Form submission updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update form submission",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this form submission?')) {
      try {
        await deleteSubmission(id);
        toast({
          title: "Success",
          description: "Form submission deleted successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete form submission",
          variant: "destructive"
        });
      }
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const groupedSubmissions = submissions.reduce((acc, submission) => {
    const key = `${submission.form_type}-${submission.form_name}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(submission);
    return acc;
  }, {} as Record<string, any[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Form Management</h2>
          <p className="text-muted-foreground">Manage customer form submissions from various sources</p>
        </div>
        <Button onClick={fetchSubmissions} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="submissions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="submissions">Form Submissions ({submissions.length})</TabsTrigger>
          <TabsTrigger value="api">API Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="submissions" className="space-y-4">
          {submissions.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No form submissions yet. Connect your forms using the API tab.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedSubmissions).map(([formKey, formSubmissions]) => {
                const [formType, formName] = formKey.split('-');
                return (
                  <Card key={formKey}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge className={getFormTypeColor(formType)}>{formType.toUpperCase()}</Badge>
                        <span>{formName}</span>
                        <Badge variant="secondary">{formSubmissions.length} submissions</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Delivery</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {formSubmissions.map((submission) => (
                            <TableRow key={submission.id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{submission.customer_name || 'N/A'}</p>
                                  <p className="text-sm text-muted-foreground">{submission.customer_email || 'N/A'}</p>
                                </div>
                              </TableCell>
                              <TableCell>{submission.customer_phone || 'N/A'}</TableCell>
                              <TableCell>
                                <div className="max-w-[200px]">
                                  <p className="text-sm truncate">{submission.delivery_address || 'N/A'}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {submission.delivery_city} {submission.delivery_postal_code}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(submission.status)}>
                                  {submission.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm">
                                {new Date(submission.created_at).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl">
                                      <DialogHeader>
                                        <DialogTitle>Form Submission Details</DialogTitle>
                                      </DialogHeader>
                                      <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <Label>Customer Name</Label>
                                            <p className="text-sm">{submission.customer_name || 'N/A'}</p>
                                          </div>
                                          <div>
                                            <Label>Email</Label>
                                            <p className="text-sm">{submission.customer_email || 'N/A'}</p>
                                          </div>
                                          <div>
                                            <Label>Phone</Label>
                                            <p className="text-sm">{submission.customer_phone || 'N/A'}</p>
                                          </div>
                                          <div>
                                            <Label>Status</Label>
                                            <Badge className={getStatusColor(submission.status)}>
                                              {submission.status}
                                            </Badge>
                                          </div>
                                        </div>
                                        <div>
                                          <Label>Delivery Address</Label>
                                          <p className="text-sm">{submission.delivery_address || 'N/A'}</p>
                                          <p className="text-sm text-muted-foreground">
                                            {submission.delivery_city} {submission.delivery_postal_code}
                                          </p>
                                        </div>
                                        {submission.order_details && (
                                          <div>
                                            <Label>Order Details</Label>
                                            <pre className="text-xs bg-muted p-2 rounded mt-1 overflow-auto max-h-32">
                                              {JSON.stringify(submission.order_details, null, 2)}
                                            </pre>
                                          </div>
                                        )}
                                        {submission.additional_data && (
                                          <div>
                                            <Label>Additional Data</Label>
                                            <pre className="text-xs bg-muted p-2 rounded mt-1 overflow-auto max-h-32">
                                              {JSON.stringify(submission.additional_data, null, 2)}
                                            </pre>
                                          </div>
                                        )}
                                        {submission.notes && (
                                          <div>
                                            <Label>Notes</Label>
                                            <p className="text-sm">{submission.notes}</p>
                                          </div>
                                        )}
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditSubmission(submission)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDelete(submission.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Integration</CardTitle>
              <CardDescription>
                Use these endpoints to connect your forms to the admin panel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-semibold">Form Submission API Endpoint</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input value={formApiUrl} readOnly className="font-mono text-sm" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(formApiUrl, 'API Endpoint')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  POST request to this endpoint to submit form data
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Integration Examples</h3>
                
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Netlify Forms</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        Add this to your Netlify form's success redirect or use a function:
                      </p>
                      <pre className="text-xs bg-muted p-3 rounded overflow-auto">
{`// In your Netlify function
exports.handler = async (event, context) => {
  const formData = JSON.parse(event.body);
  
  const response = await fetch('${formApiUrl}', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      form_type: 'netlify',
      form_name: 'contact-form',
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      delivery_address: formData.address,
      order_details: formData.products,
      additional_data: formData
    })
  });
  
  return { statusCode: 200, body: 'Success' };
};`}
                      </pre>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Google Forms (via Apps Script)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        Add this Apps Script trigger to your Google Form:
                      </p>
                      <pre className="text-xs bg-muted p-3 rounded overflow-auto">
{`function onFormSubmit(e) {
  const responses = e.values;
  
  const payload = {
    form_type: 'google',
    form_name: 'order-form',
    customer_name: responses[1], // Adjust indices
    customer_email: responses[2],
    customer_phone: responses[3],
    delivery_address: responses[4],
    order_details: { items: responses[5] },
    additional_data: { timestamp: responses[0] }
  };
  
  UrlFetchApp.fetch('${formApiUrl}', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    payload: JSON.stringify(payload)
  });
}`}
                      </pre>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Local/Custom Forms</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        JavaScript example for your custom forms:
                      </p>
                      <pre className="text-xs bg-muted p-3 rounded overflow-auto">
{`// JavaScript form submission
document.getElementById('myForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  const payload = {
    form_type: 'local',
    form_name: 'website-order',
    customer_name: formData.get('name'),
    customer_email: formData.get('email'),
    customer_phone: formData.get('phone'),
    delivery_address: formData.get('address'),
    delivery_city: formData.get('city'),
    delivery_postal_code: formData.get('postal_code'),
    order_details: { products: formData.get('products') }
  };
  
  try {
    const response = await fetch('${formApiUrl}', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (response.ok) {
      alert('Order submitted successfully!');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});`}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Form Submission</DialogTitle>
            <DialogDescription>
              Update the status and add notes for this form submission.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={editingStatus} onValueChange={setEditingStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                placeholder="Add any notes about this submission..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormManager;