
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Upload, 
  Eye, 
  Save, 
  RefreshCw, 
  Smartphone, 
  Mail, 
  MessageSquare,
  Globe,
  Image as ImageIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WebsiteCustomizer = () => {
  const { toast } = useToast();
  
  const [websiteSettings, setWebsiteSettings] = useState({
    siteName: 'Al-Noor Store',
    tagline: 'Your Trusted Online Shopping Destination',
    primaryColor: '#f59e0b',
    secondaryColor: '#ea580c',
    whatsappNumber: '+92 300 1234567',
    email: 'alnoormall.pk@gmail.com',
    address: 'Karachi, Pakistan',
    logoUrl: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=100&h=100&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=1200&h=400&fit=crop'
  });

  const [socialLinks, setSocialLinks] = useState({
    facebook: 'https://facebook.com/alnoormall',
    instagram: 'https://instagram.com/alnoormall',
    twitter: '',
    youtube: ''
  });

  const [bannerContent, setBannerContent] = useState({
    title: 'Welcome to Al-Noor Store',
    subtitle: 'Discover Quality Products at Amazing Prices',
    buttonText: 'Shop Now',
    backgroundImage: websiteSettings.bannerUrl
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleSettingChange = (field: string, value: string) => {
    setWebsiteSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialLinkChange = (platform: string, url: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: url
    }));
  };

  const handleBannerChange = (field: string, value: string) => {
    setBannerContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (type: 'logo' | 'banner') => {
    // Simulate image upload
    const newImageUrl = `https://images.unsplash.com/photo-${Date.now()}?w=${type === 'logo' ? '100&h=100' : '1200&h=400'}&fit=crop`;
    
    if (type === 'logo') {
      handleSettingChange('logoUrl', newImageUrl);
    } else {
      handleSettingChange('bannerUrl', newImageUrl);
      handleBannerChange('backgroundImage', newImageUrl);
    }
    
    toast({
      title: "Image Uploaded",
      description: `${type === 'logo' ? 'Logo' : 'Banner'} image has been updated`,
    });
  };

  const saveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Website customization settings have been saved successfully",
    });
  };

  const resetToDefaults = () => {
    if (confirm('Are you sure you want to reset all customizations to default?')) {
      // Reset logic would go here
      toast({
        title: "Settings Reset",
        description: "All customizations have been reset to default values",
      });
    }
  };

  const colorPresets = [
    { name: 'Amber/Orange (Default)', primary: '#f59e0b', secondary: '#ea580c' },
    { name: 'Blue/Indigo', primary: '#3b82f6', secondary: '#6366f1' },
    { name: 'Green/Emerald', primary: '#10b981', secondary: '#059669' },
    { name: 'Purple/Pink', primary: '#8b5cf6', secondary: '#ec4899' },
    { name: 'Red/Rose', primary: '#ef4444', secondary: '#f43f5e' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Website Customizer</h2>
        <div className="flex space-x-2">
          <Button
            onClick={() => setPreviewMode(!previewMode)}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>{previewMode ? 'Exit Preview' : 'Preview'}</span>
          </Button>
          <Button onClick={saveChanges} className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </Button>
        </div>
      </div>

      {/* Basic Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Basic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Store Name</label>
              <Input
                value={websiteSettings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tagline</label>
              <Input
                value={websiteSettings.tagline}
                onChange={(e) => handleSettingChange('tagline', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input
                type="email"
                value={websiteSettings.email}
                onChange={(e) => handleSettingChange('email', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
              <Input
                value={websiteSettings.whatsappNumber}
                onChange={(e) => handleSettingChange('whatsappNumber', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <Textarea
                value={websiteSettings.address}
                onChange={(e) => handleSettingChange('address', e.target.value)}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>Color Scheme</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Color Presets</label>
              <div className="grid grid-cols-1 gap-2">
                {colorPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleSettingChange('primaryColor', preset.primary);
                      handleSettingChange('secondaryColor', preset.secondary);
                    }}
                    className="flex items-center space-x-3 p-2 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex space-x-1">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: preset.primary }}
                      ></div>
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: preset.secondary }}
                      ></div>
                    </div>
                    <span className="text-sm">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Primary Color</label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    value={websiteSettings.primaryColor}
                    onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <Input
                    value={websiteSettings.primaryColor}
                    onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Secondary Color</label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    value={websiteSettings.secondaryColor}
                    onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <Input
                    value={websiteSettings.secondaryColor}
                    onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ImageIcon className="h-5 w-5" />
              <span>Logo & Branding</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Current Logo</label>
              <div className="flex items-center space-x-4">
                <img 
                  src={websiteSettings.logoUrl} 
                  alt="Logo" 
                  className="w-16 h-16 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <Button onClick={() => handleImageUpload('logo')} variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Logo
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">Recommended: 100x100px PNG</p>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Logo URL</label>
              <Input
                value={websiteSettings.logoUrl}
                onChange={(e) => handleSettingChange('logoUrl', e.target.value)}
                placeholder="https://example.com/logo.png"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ImageIcon className="h-5 w-5" />
              <span>Banner Image</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Current Banner</label>
              <div className="space-y-3">
                <img 
                  src={websiteSettings.bannerUrl} 
                  alt="Banner" 
                  className="w-full h-24 object-cover rounded-lg border"
                />
                <Button onClick={() => handleImageUpload('banner')} variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New Banner
                </Button>
                <p className="text-xs text-gray-500">Recommended: 1200x400px JPG/PNG</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Banner URL</label>
              <Input
                value={websiteSettings.bannerUrl}
                onChange={(e) => handleSettingChange('bannerUrl', e.target.value)}
                placeholder="https://example.com/banner.jpg"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Banner Content */}
      <Card>
        <CardHeader>
          <CardTitle>Banner Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Banner Title</label>
              <Input
                value={bannerContent.title}
                onChange={(e) => handleBannerChange('title', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Banner Subtitle</label>
              <Input
                value={bannerContent.subtitle}
                onChange={(e) => handleBannerChange('subtitle', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Button Text</label>
            <Input
              value={bannerContent.buttonText}
              onChange={(e) => handleBannerChange('buttonText', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Facebook</label>
              <Input
                value={socialLinks.facebook}
                onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Instagram</label>
              <Input
                value={socialLinks.instagram}
                onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                placeholder="https://instagram.com/yourpage"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Twitter</label>
              <Input
                value={socialLinks.twitter}
                onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                placeholder="https://twitter.com/yourpage"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">YouTube</label>
              <Input
                value={socialLinks.youtube}
                onChange={(e) => handleSocialLinkChange('youtube', e.target.value)}
                placeholder="https://youtube.com/yourchannel"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <Button onClick={resetToDefaults} variant="outline" className="flex items-center space-x-2">
          <RefreshCw className="h-4 w-4" />
          <span>Reset to Defaults</span>
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Smartphone className="h-4 w-4 mr-2" />
            Mobile Preview
          </Button>
          <Button onClick={saveChanges}>
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WebsiteCustomizer;
