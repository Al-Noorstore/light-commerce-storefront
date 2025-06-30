import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Star,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FeatureRequest {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'submitted' | 'under_review' | 'in_progress' | 'completed' | 'rejected';
  submittedAt: string;
  estimatedTime?: string;
  feedback?: string;
}

const FeatureRequestForm = () => {
  const { toast } = useToast();
  
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    category: 'feature',
    priority: 'medium' as const
  });

  const [requests, setRequests] = useState<FeatureRequest[]>([
    {
      id: 1,
      title: 'Firebase Integration for Products',
      description: 'Integrate Firebase Firestore to store products dynamically instead of static data',
      category: 'integration',
      priority: 'high',
      status: 'in_progress',
      submittedAt: '2024-01-15',
      estimatedTime: '2-3 days',
      feedback: 'Working on Firebase setup and data migration'
    },
    {
      id: 2,
      title: 'Google Sheets API for Orders',
      description: 'Connect Google Sheets API to read order data from Google Forms',
      category: 'integration',
      priority: 'high',
      status: 'submitted',
      submittedAt: '2024-01-14'
    },
    {
      id: 3,
      title: 'WhatsApp Notifications',
      description: 'Send WhatsApp notifications to admin when new orders arrive',
      category: 'notification',
      priority: 'medium',
      status: 'under_review',
      submittedAt: '2024-01-13'
    }
  ]);

  const categories = [
    { value: 'feature', label: 'New Feature' },
    { value: 'integration', label: 'Integration' },
    { value: 'ui_improvement', label: 'UI Improvement' },
    { value: 'bug_fix', label: 'Bug Fix' },
    { value: 'performance', label: 'Performance' },
    { value: 'notification', label: 'Notification' },
    { value: 'security', label: 'Security' },
    { value: 'other', label: 'Other' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-gray-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'high', label: 'High', color: 'bg-red-500' }
  ];

  const statusConfig = {
    submitted: { label: 'Submitted', color: 'bg-blue-500', icon: Clock },
    under_review: { label: 'Under Review', color: 'bg-purple-500', icon: MessageSquare },
    in_progress: { label: 'In Progress', color: 'bg-orange-500', icon: AlertCircle },
    completed: { label: 'Completed', color: 'bg-green-500', icon: CheckCircle },
    rejected: { label: 'Rejected', color: 'bg-red-500', icon: AlertCircle }
  };

  const handleSubmitRequest = () => {
    if (!newRequest.title.trim() || !newRequest.description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both title and description",
        variant: "destructive"
      });
      return;
    }

    const request: FeatureRequest = {
      id: Math.max(...requests.map(r => r.id), 0) + 1,
      title: newRequest.title,
      description: newRequest.description,
      category: newRequest.category,
      priority: newRequest.priority,
      status: 'submitted',
      submittedAt: new Date().toISOString().split('T')[0]
    };

    setRequests([request, ...requests]);
    setNewRequest({
      title: '',
      description: '',
      category: 'feature',
      priority: 'medium'
    });

    toast({
      title: "Feature Request Submitted",
      description: "Your request has been submitted to the development team",
    });
  };

  const getStatusIcon = (status: FeatureRequest['status']) => {
    const StatusIcon = statusConfig[status].icon;
    return <StatusIcon className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Feature Request Dashboard</h2>
        <Badge variant="outline" className="px-3 py-1">
          {requests.length} Total Requests
        </Badge>
      </div>

      {/* Submit New Request */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5" />
            <span>Submit New Feature Request</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Feature Title</label>
            <Input
              value={newRequest.title}
              onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Add dark mode theme"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Detailed Description</label>
            <Textarea
              value={newRequest.description}
              onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the feature in detail, including why it's needed and how it should work..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={newRequest.category}
                onChange={(e) => setNewRequest(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select
                value={newRequest.priority}
                onChange={(e) => setNewRequest(prev => ({ ...prev, priority: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {priorities.map(priority => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button onClick={handleSubmitRequest} className="flex items-center space-x-2">
            <Send className="h-4 w-4" />
            <span>Submit Feature Request</span>
          </Button>
        </CardContent>
      </Card>

      {/* Request Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = requests.filter(r => r.status === status).length;
          return (
            <Card key={status}>
              <CardContent className="p-4 text-center">
                <div className={`w-8 h-8 ${config.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  {getStatusIcon(status as FeatureRequest['status'])}
                </div>
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm text-gray-600">{config.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Existing Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Your Feature Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map(request => {
              const status = statusConfig[request.status];
              const priority = priorities.find(p => p.value === request.priority);
              
              return (
                <div key={request.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{request.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{request.description}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Badge className={`${priority?.color} text-white`}>
                        {priority?.label}
                      </Badge>
                      <Badge className={`${status.color} text-white`}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1">{status.label}</span>
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>Category: {categories.find(c => c.value === request.category)?.label}</span>
                      <span>Submitted: {request.submittedAt}</span>
                      {request.estimatedTime && (
                        <span>Est. Time: {request.estimatedTime}</span>
                      )}
                    </div>
                  </div>

                  {request.feedback && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Developer Feedback</span>
                      </div>
                      <p className="text-sm text-blue-700">{request.feedback}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Development Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Development Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="h-5 w-5 text-amber-600" />
              <span className="font-medium text-amber-800">Direct Communication</span>
            </div>
            <p className="text-amber-700 text-sm mb-3">
              For urgent requests or detailed discussions, you can contact the development team directly:
            </p>
            <div className="flex space-x-4 text-sm">
              <span className="text-amber-600">📧 dev@alnoormall.pk</span>
              <span className="text-amber-600">💬 WhatsApp: +92 300 1234567</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureRequestForm;
