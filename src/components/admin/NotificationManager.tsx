
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Mail, MessageSquare, Clock, Settings, Send, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NotificationManager = () => {
  const { toast } = useToast();
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    whatsappNotifications: true,
    newOrderAlerts: true,
    lowStockAlerts: true,
    dailyReports: false,
    weeklyReports: true
  });

  const [alertTiming, setAlertTiming] = useState({
    newOrders: 'anytime',
    lowStock: '10_am',
    reports: '10_pm'
  });

  const [contactInfo, setContactInfo] = useState({
    email: 'alnoormall.pk@gmail.com',
    whatsapp: '+92 300 1234567',
    backupEmail: ''
  });

  const [testNotification, setTestNotification] = useState({
    type: 'new_order',
    message: 'Test notification message'
  });

  const handleSettingChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast({
      title: "Setting Updated",
      description: `${setting.replace(/([A-Z])/g, ' $1').toLowerCase()} ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handleTimingChange = (type: string, timing: string) => {
    setAlertTiming(prev => ({
      ...prev,
      [type]: timing
    }));
  };

  const sendTestNotification = () => {
    toast({
      title: "Test Notification Sent",
      description: `${testNotification.type} notification sent to your configured channels`,
    });
  };

  const timingOptions = [
    { value: 'anytime', label: 'Anytime' },
    { value: '10_am', label: '10:00 AM' },
    { value: '10_pm', label: '10:00 PM' },
    { value: 'manual', label: 'Manual Only' }
  ];

  const notificationTypes = [
    { value: 'new_order', label: 'New Order Alert' },
    { value: 'low_stock', label: 'Low Stock Alert' },
    { value: 'daily_report', label: 'Daily Report' },
    { value: 'system_alert', label: 'System Alert' }
  ];

  const recentNotifications = [
    {
      id: 1,
      type: 'new_order',
      message: 'New order received: Premium Face Cream',
      time: '2 minutes ago',
      status: 'sent',
      channels: ['email', 'whatsapp']
    },
    {
      id: 2,
      type: 'low_stock',
      message: 'Low stock alert: Kitchen Cookware Set (2 items left)',
      time: '1 hour ago',
      status: 'sent',
      channels: ['email']
    },
    {
      id: 3,
      type: 'daily_report',
      message: 'Daily sales report for January 15, 2024',
      time: '10:00 AM today',
      status: 'sent',
      channels: ['email']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notification Manager</h2>
        <Button variant="outline" className="flex items-center space-x-2">
          <Settings className="h-4 w-4" />
          <span>Advanced Settings</span>
        </Button>
      </div>

      {/* Notification Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Email Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Enable Email Alerts</span>
              <Switch
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Primary Email</label>
              <Input
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Backup Email (Optional)</label>
              <Input
                type="email"
                value={contactInfo.backupEmail}
                onChange={(e) => setContactInfo(prev => ({ ...prev, backupEmail: e.target.value }))}
                placeholder="backup@example.com"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>WhatsApp Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Enable WhatsApp Alerts</span>
              <Switch
                checked={notificationSettings.whatsappNotifications}
                onCheckedChange={(checked) => handleSettingChange('whatsappNotifications', checked)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
              <Input
                type="tel"
                value={contactInfo.whatsapp}
                onChange={(e) => setContactInfo(prev => ({ ...prev, whatsapp: e.target.value }))}
                placeholder="+92 300 1234567"
              />
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> WhatsApp notifications require Business API setup. 
                Contact support for integration assistance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Types & Timing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Alert Types & Timing</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Alert Types</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>New Order Alerts</span>
                  <Switch
                    checked={notificationSettings.newOrderAlerts}
                    onCheckedChange={(checked) => handleSettingChange('newOrderAlerts', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Low Stock Alerts</span>
                  <Switch
                    checked={notificationSettings.lowStockAlerts}
                    onCheckedChange={(checked) => handleSettingChange('lowStockAlerts', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Daily Reports</span>
                  <Switch
                    checked={notificationSettings.dailyReports}
                    onCheckedChange={(checked) => handleSettingChange('dailyReports', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Weekly Reports</span>
                  <Switch
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(checked) => handleSettingChange('weeklyReports', checked)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Timing Preferences</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">New Orders</label>
                  <select
                    value={alertTiming.newOrders}
                    onChange={(e) => handleTimingChange('newOrders', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    {timingOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Low Stock</label>
                  <select
                    value={alertTiming.lowStock}
                    onChange={(e) => handleTimingChange('lowStock', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    {timingOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Reports</label>
                  <select
                    value={alertTiming.reports}
                    onChange={(e) => handleTimingChange('reports', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    {timingOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Test Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Notification Type</label>
              <select
                value={testNotification.type}
                onChange={(e) => setTestNotification(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {notificationTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Test Message</label>
              <Input
                value={testNotification.message}
                onChange={(e) => setTestNotification(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Enter test message"
              />
            </div>
          </div>
          <Button onClick={sendTestNotification} className="flex items-center space-x-2">
            <Send className="h-4 w-4" />
            <span>Send Test Notification</span>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentNotifications.map(notification => (
              <div key={notification.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    notification.type === 'new_order' ? 'bg-green-500' :
                    notification.type === 'low_stock' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-green-600">
                    {notification.status}
                  </Badge>
                  <div className="flex space-x-1">
                    {notification.channels.includes('email') && (
                      <Mail className="h-4 w-4 text-blue-500" />
                    )}
                    {notification.channels.includes('whatsapp') && (
                      <MessageSquare className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationManager;
