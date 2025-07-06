import React, { useState, useEffect } from 'react';
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
import { Eye, Edit, Trash2, Copy, RefreshCw, Bell, BellRing, Phone, Mail } from 'lucide-react';
import NotificationManager from './NotificationManager';

const RealTimeFormManager = () => {
  const { 
    submissions, 
    loading, 
    fetchSubmissions, 
    updateSubmissionStatus, 
    deleteSubmission,
    newSubmissionsCount,
    markNotificationsRead
  } = useFormSubmissions();
  const { toast } = useToast();
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState('');
  const [editingNotes, setEditingNotes] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // API URLs for different form integrations
  const apiBaseUrl = 'https://osrolxzvnurzisusv.supabase.co/functions/v1';
  const formApiUrl = `${apiBaseUrl}/submit-form`;

  useEffect(() => {
    // Mark notifications as read when component mounts
    markNotificationsRead();
  }, [markNotificationsRead]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getFormTypeColor = (formType: string) => {
    switch (formType) {
      case 'netlify': return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300';
      case 'google': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'local': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
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

  // Filter submissions based on status and search term
  const filteredSubmissions = submissions.filter(submission => {
    const matchesFilter = filter === 'all' || submission.status === filter;
    const matchesSearch = !searchTerm || 
      submission.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.form_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.form_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const groupedSubmissions = filteredSubmissions.reduce((acc, submission) => {
    const key = `${submission.form_type}-${submission.form_name}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(submission);
    return acc;
  }, {} as Record<string, any[]>);

  const statusCounts = {
    all: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    processing: submissions.filter(s => s.status === 'processing').length,
    completed: submissions.filter(s => s.status === 'completed').length,
    cancelled: submissions.filter(s => s.status === 'cancelled').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">Real-Time Form Management</h2>
            {newSubmissionsCount > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                <BellRing className="h-3 w-3 mr-1" />
                {newSubmissionsCount} new
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">Live customer form submissions with instant notifications</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={fetchSubmissions} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by customer name, email, form type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ({statusCounts.all})</SelectItem>
            <SelectItem value="pending">Pending ({statusCounts.pending})</SelectItem>
            <SelectItem value="processing">Processing ({statusCounts.processing})</SelectItem>
            <SelectItem value="completed">Completed ({statusCounts.completed})</SelectItem>
            <SelectItem value="cancelled">Cancelled ({statusCounts.cancelled})</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="submissions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="submissions">
            Form Submissions ({filteredSubmissions.length})
          </TabsTrigger>
          <TabsTrigger value="api">API Integration</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="submissions" className="space-y-4">
          {filteredSubmissions.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  {submissions.length === 0 
                    ? "No form submissions yet. Connect your forms using the API tab."
                    : "No submissions match your current filters."
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedSubmissions).map(([formKey, formSubmissions]) => {
                const [formType, formName] = formKey.split('-');
                return (
                  <Card key={formKey}>
                    <CardHeader>
                      <CardTitle className="flex flex-wrap items-center gap-2">
                        <Badge className={getFormTypeColor(formType)}>{formType.toUpperCase()}</Badge>
                        <span className="text-base">{formName}</span>
                        <Badge variant="secondary">{formSubmissions.length} submissions</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead className="hidden md:table-cell">Delivery</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {formSubmissions.map((submission) => (
                            <TableRow key={submission.id} className="hover:bg-muted/50">
                              <TableCell>
                                <div>
                                  <p className="font-medium text-sm">{submission.customer_name || 'N/A'}</p>
                                  <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                                    {submission.customer_email || 'N/A'}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  <span className="text-sm">{submission.customer_phone || 'N/A'}</span>
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
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
                                <div>
                                  <p>{new Date(submission.created_at).toLocaleDateString()}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(submission.created_at).toLocaleTimeString()}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                                      <DialogHeader>
                                        <DialogTitle>Form Submission Details</DialogTitle>
                                        <DialogDescription>
                                          Submitted via {submission.form_type} form on {new Date(submission.created_at).toLocaleString()}
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-4">
                                          <div>
                                            <Label>Customer Name</Label>
                                            <p className="text-sm font-medium">{submission.customer_name || 'N/A'}</p>
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
                                        <div className="space-y-4">
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
                                        </div>
                                      </div>
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
                                          <Label>Admin Notes</Label>
                                          <p className="text-sm">{submission.notes}</p>
                                        </div>
                                      )}
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
                Use these endpoints to connect your forms to the admin panel. Data will appear here in real-time.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-semibold">Form Submission API Endpoint</Label>
                <div className="flex flex-col sm:flex-row items-center gap-2 mt-2">
                  <Input value={formApiUrl} readOnly className="font-mono text-sm flex-1" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(formApiUrl, 'API Endpoint')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  POST request to this endpoint to submit form data. Method: POST, Content-Type: application/json
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Integration Examples</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Badge className="bg-teal-100 text-teal-800">NETLIFY</Badge>
                        Netlify Forms
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Add this to your Netlify function or form handler:
                      </p>
                      <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-48">
{`// Netlify Function
exports.handler = async (event) => {
  const formData = JSON.parse(event.body);
  
  await fetch('${formApiUrl}', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      form_type: 'netlify',
      form_name: 'contact-form',
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      delivery_address: formData.address,
      delivery_city: formData.city,
      delivery_postal_code: formData.postal,
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
                      <CardTitle className="text-base flex items-center gap-2">
                        <Badge className="bg-purple-100 text-purple-800">GOOGLE</Badge>
                        Google Forms
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Add this Apps Script trigger to your Google Form:
                      </p>
                      <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-48">
{`// Google Apps Script
function onFormSubmit(e) {
  const responses = e.values;
  
  const payload = {
    form_type: 'google',
    form_name: 'order-form',
    customer_name: responses[1],
    customer_email: responses[2], 
    customer_phone: responses[3],
    delivery_address: responses[4],
    delivery_city: responses[5],
    delivery_postal_code: responses[6],
    order_details: { items: responses[7] },
    additional_data: { 
      timestamp: responses[0],
      all_responses: responses 
    }
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
                      <CardTitle className="text-base flex items-center gap-2">
                        <Badge className="bg-indigo-100 text-indigo-800">LOCAL</Badge>
                        Custom/Local Forms
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        JavaScript example for your custom forms:
                      </p>
                      <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-48">
{`// Custom Form Handler
document.getElementById('orderForm')
  .addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  
  const response = await fetch('${formApiUrl}', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      form_type: 'local',
      form_name: 'website-order',
      customer_name: form.get('name'),
      customer_email: form.get('email'),
      customer_phone: form.get('phone'),
      delivery_address: form.get('address'),
      delivery_city: form.get('city'),
      delivery_postal_code: form.get('postal'),
      order_details: {
        product: form.get('product'),
        quantity: form.get('quantity')
      }
    })
  });
  
  if (response.ok) {
    alert('Order submitted successfully!');
  }
});`}
                      </pre>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Testing API</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Use curl to test the API endpoint:
                      </p>
                      <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-48">
{`curl -X POST ${formApiUrl} \\
  -H "Content-Type: application/json" \\
  -d '{
    "form_type": "test",
    "form_name": "api-test",
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "customer_phone": "+1234567890",
    "delivery_address": "123 Main St",
    "delivery_city": "New York",
    "delivery_postal_code": "10001",
    "order_details": {
      "product": "Test Product",
      "quantity": 1
    }
  }'`}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationManager />
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
                  <SelectValue placeholder="Select status" />
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
              <Label htmlFor="notes">Admin Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add notes about this submission..."
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
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

export default RealTimeFormManager;