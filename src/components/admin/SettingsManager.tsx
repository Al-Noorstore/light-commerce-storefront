
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Save, 
  Upload, 
  Palette, 
  Bell, 
  Settings, 
  Globe,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SettingsManager = () => {
  const { toast } = useToast();
  
  // Site Settings
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'Al-Noor Store',
    tagline: 'Bringing Light to Your Life!',
    logo: '',
    favicon: '',
    primaryColor: '#f59e0b',
    secondaryColor: '#fb923c'
  });

  // Contact Settings
  const [contactSettings, setContactSettings] = useState({
    phone: '+92 322 2520101',
    email: 'alnoormall.pk@gmail.com',
    whatsapp: '+923222520101',
    address: 'Pakistan'
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    whatsappNotifications: false,
    notificationTime: 'anytime',
    lowStockAlert: true,
    newOrderAlert: true
  });

  // Policy Settings
  const [policySettings, setPolicySettings] = useState({
    deliveryPolicy: 'We deliver nationwide within 3-5 business days...',
    returnPolicy: 'Products can be returned within 7 days of delivery...',
    privacyPolicy: 'We respect your privacy and protect your personal information...',
    termsConditions: 'By using our service, you agree to these terms...'
  });

  const handleSave = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been successfully updated.`,
    });
  };

  const handleImageUpload = (type: 'logo' | 'favicon') => {
    // Simulate image upload
    const imageUrl = `https://images.unsplash.com/photo-${Date.now()}?w=200&h=200&fit=crop`;
    setSiteSettings({ ...siteSettings, [type]: imageUrl });
    toast({
      title: "Image Uploaded",
      description: `${type} has been successfully updated.`,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings Management</h2>

      <Tabs defaultValue="site" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="site" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>Site</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span>Contact</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="policies" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Policies</span>
          </TabsTrigger>
        </TabsList>

        {/* Site Settings */}
        <TabsContent value="site" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Site Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Site Name</label>
                  <Input
                    value={siteSettings.siteName}
                    onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tagline</label>
                  <Input
                    value={siteSettings.tagline}
                    onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={() => handleSave('Site')} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save Site Info</span>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Branding</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Logo</label>
                  <div className="space-y-2">
                    {siteSettings.logo && (
                      <img src={siteSettings.logo} alt="Logo" className="w-20 h-20 object-cover rounded" />
                    )}
                    <Button onClick={() => handleImageUpload('logo')} variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Favicon</label>
                  <div className="space-y-2">
                    {siteSettings.favicon && (
                      <img src={siteSettings.favicon} alt="Favicon" className="w-8 h-8 object-cover rounded" />
                    )}
                    <Button onClick={() => handleImageUpload('favicon')} variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Favicon
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Theme Colors</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={siteSettings.primaryColor}
                      onChange={(e) => setSiteSettings({ ...siteSettings, primaryColor: e.target.value })}
                      className="w-12 h-10 border border-gray-300 rounded"
                    />
                    <Input
                      value={siteSettings.primaryColor}
                      onChange={(e) => setSiteSettings({ ...siteSettings, primaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Secondary Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={siteSettings.secondaryColor}
                      onChange={(e) => setSiteSettings({ ...siteSettings, secondaryColor: e.target.value })}
                      className="w-12 h-10 border border-gray-300 rounded"
                    />
                    <Input
                      value={siteSettings.secondaryColor}
                      onChange={(e) => setSiteSettings({ ...siteSettings, secondaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              <Button onClick={() => handleSave('Theme')} variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Colors
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={contactSettings.phone}
                      onChange={(e) => setContactSettings({ ...contactSettings, phone: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      value={contactSettings.email}
                      onChange={(e) => setContactSettings({ ...contactSettings, email: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
                  <Input
                    value={contactSettings.whatsapp}
                    onChange={(e) => setContactSettings({ ...contactSettings, whatsapp: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={contactSettings.address}
                      onChange={(e) => setContactSettings({ ...contactSettings, address: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <Button onClick={() => handleSave('Contact')} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save Contact Info</span>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">WhatsApp Notifications</h4>
                    <p className="text-sm text-gray-600">Receive notifications via WhatsApp</p>
                  </div>
                  <Switch
                    checked={notificationSettings.whatsappNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, whatsappNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Low Stock Alerts</h4>
                    <p className="text-sm text-gray-600">Get notified when products are running low</p>
                  </div>
                  <Switch
                    checked={notificationSettings.lowStockAlert}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, lowStockAlert: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">New Order Alerts</h4>
                    <p className="text-sm text-gray-600">Get notified immediately when new orders arrive</p>
                  </div>
                  <Switch
                    checked={notificationSettings.newOrderAlert}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, newOrderAlert: checked })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Notification Time</label>
                <select
                  value={notificationSettings.notificationTime}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, notificationTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="anytime">Anytime</option>
                  <option value="10am">10:00 AM</option>
                  <option value="10pm">10:00 PM</option>
                  <option value="off">Manual/Off</option>
                </select>
              </div>

              <Button onClick={() => handleSave('Notification')} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save Notification Settings</span>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Policy Settings */}
        <TabsContent value="policies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Policy Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Delivery Policy</label>
                <Textarea
                  value={policySettings.deliveryPolicy}
                  onChange={(e) => setPolicySettings({ ...policySettings, deliveryPolicy: e.target.value })}
                  rows={4}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Return Policy</label>
                <Textarea
                  value={policySettings.returnPolicy}
                  onChange={(e) => setPolicySettings({ ...policySettings, returnPolicy: e.target.value })}
                  rows={4}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Privacy Policy</label>
                <Textarea
                  value={policySettings.privacyPolicy}
                  onChange={(e) => setPolicySettings({ ...policySettings, privacyPolicy: e.target.value })}
                  rows={4}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Terms & Conditions</label>
                <Textarea
                  value={policySettings.termsConditions}
                  onChange={(e) => setPolicySettings({ ...policySettings, termsConditions: e.target.value })}
                  rows={4}
                  className="w-full"
                />
              </div>

              <Button onClick={() => handleSave('Policy')} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save Policies</span>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManager;
