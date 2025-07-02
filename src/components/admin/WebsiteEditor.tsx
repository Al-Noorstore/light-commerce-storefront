
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Edit3, 
  Image, 
  Type, 
  Layout, 
  Palette, 
  Save,
  Eye,
  Settings,
  Smartphone,
  Monitor
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSavePassword } from '@/hooks/useSavePassword';
import SavePasswordDialog from './SavePasswordDialog';

interface WebsiteSection {
  id: string;
  title: string;
  type: 'banner' | 'slider' | 'category' | 'text' | 'footer';
  content: string;
  imageUrl?: string;
  isActive: boolean;
}

const WebsiteEditor = () => {
  const { toast } = useToast();
  const { isDialogOpen, dialogConfig, requestSaveConfirmation, handleConfirm, handleClose } = useSavePassword();
  const [activeTab, setActiveTab] = useState('banners');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  const [websiteSections, setWebsiteSections] = useState<WebsiteSection[]>([
    {
      id: 'hero-banner',
      title: 'Main Hero Banner',
      type: 'banner',
      content: 'Al-Noor Store - Bringing Light to Your Life!',
      imageUrl: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=400&fit=crop',
      isActive: true
    },
    {
      id: 'welcome-text',
      title: 'Welcome Message',
      type: 'text',
      content: 'Welcome to Al-Noor Store, your trusted source for quality products across Pakistan.',
      isActive: true
    },
    {
      id: 'special-offer',
      title: 'Special Offer Banner',
      type: 'banner',
      content: 'Special Ramadan Offers - Up to 30% Off on Selected Items!',
      imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=200&fit=crop',
      isActive: true
    },
    {
      id: 'footer-text',
      title: 'Footer Copyright',
      type: 'footer',
      content: '© 2024 Al-Noor Store. All rights reserved. | Bringing Light to Your Life!',
      isActive: true
    }
  ]);

  const [contactInfo, setContactInfo] = useState({
    phone: '+92 300 1234567',
    email: 'alnoormall.pk@gmail.com',
    address: 'Karachi, Pakistan',
    whatsapp: '+92 300 1234567'
  });

  const handleSaveSection = (sectionId: string) => {
    requestSaveConfirmation(
      () => {
        console.log(`Saving section: ${sectionId}`);
        setEditingSection(null);
        toast({
          title: "Section Updated",
          description: "Website content has been updated successfully",
        });
      },
      'Save Website Changes',
      'Please confirm with your save password to update the website content.'
    );
  };

  const handleToggleSection = (sectionId: string) => {
    requestSaveConfirmation(
      () => {
        setWebsiteSections(prev =>
          prev.map(section =>
            section.id === sectionId
              ? { ...section, isActive: !section.isActive }
              : section
          )
        );
        toast({
          title: "Section Updated",
          description: "Section visibility has been changed",
        });
      },
      'Toggle Section Visibility',
      'Please confirm to change the section visibility on the website.'
    );
  };

  const handleSaveContactInfo = () => {
    requestSaveConfirmation(
      () => {
        console.log('Saving contact info:', contactInfo);
        toast({
          title: "Contact Info Updated",
          description: "Contact information has been updated successfully",
        });
      },
      'Save Contact Information',
      'Please confirm to update the contact information.'
    );
  };

  const renderSectionEditor = () => {
    switch (activeTab) {
      case 'banners':
        return (
          <div className="space-y-4">
            {websiteSections.filter(s => s.type === 'banner').map(section => (
              <Card key={section.id} className={`${!section.isActive ? 'opacity-60' : ''}`}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant={section.isActive ? 'default' : 'secondary'}>
                      {section.isActive ? 'Active' : 'Hidden'}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleSection(section.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setEditingSection(section.id)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {editingSection === section.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Banner Text</label>
                        <Input
                          value={section.content}
                          onChange={(e) => {
                            setWebsiteSections(prev =>
                              prev.map(s => s.id === section.id ? { ...s, content: e.target.value } : s)
                            );
                          }}
                          placeholder="Enter banner text"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Background Image URL</label>
                        <Input
                          value={section.imageUrl || ''}
                          onChange={(e) => {
                            setWebsiteSections(prev =>
                              prev.map(s => s.id === section.id ? { ...s, imageUrl: e.target.value } : s)
                            );
                          }}
                          placeholder="Enter image URL"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={() => handleSaveSection(section.id)} className="bg-green-500 hover:bg-green-600">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button onClick={() => setEditingSection(null)} variant="outline">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-gray-700">{section.content}</p>
                      {section.imageUrl && (
                        <img src={section.imageUrl} alt="Banner" className="w-full h-32 object-cover rounded" />
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            {websiteSections.filter(s => s.type === 'text').map(section => (
              <Card key={section.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <Button
                    size="sm"
                    onClick={() => setEditingSection(section.id)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  {editingSection === section.id ? (
                    <div className="space-y-4">
                      <Textarea
                        value={section.content}
                        onChange={(e) => {
                          setWebsiteSections(prev =>
                            prev.map(s => s.id === section.id ? { ...s, content: e.target.value } : s)
                          );
                        }}
                        placeholder="Enter text content"
                        rows={4}
                      />
                      <div className="flex space-x-2">
                        <Button onClick={() => handleSaveSection(section.id)} className="bg-green-500 hover:bg-green-600">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button onClick={() => setEditingSection(null)} variant="outline">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700">{section.content}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'contact':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <Input
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    placeholder="contact@alnoorstore.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
                  <Input
                    value={contactInfo.whatsapp}
                    onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })}
                    placeholder="+92 300 1234567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <Input
                    value={contactInfo.address}
                    onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                    placeholder="Karachi, Pakistan"
                  />
                </div>
              </div>
              <Button onClick={handleSaveContactInfo} className="bg-green-500 hover:bg-green-600">
                <Save className="h-4 w-4 mr-2" />
                Save Contact Info
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Website Editor</h2>
          <p className="text-gray-600">Edit your website content and appearance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={previewMode === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode('desktop')}
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button
            variant={previewMode === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode('mobile')}
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'banners', label: 'Banners & Offers', icon: Image },
          { id: 'text', label: 'Text Content', icon: Type },
          { id: 'contact', label: 'Contact Info', icon: Settings }
        ].map(tab => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center space-x-2"
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </Button>
        ))}
      </div>

      {/* Content Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Edit Content</h3>
          {renderSectionEditor()}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">
            Preview ({previewMode === 'desktop' ? 'Desktop' : 'Mobile'})
          </h3>
          <Card className="h-96 overflow-auto">
            <CardContent className="p-4">
              <div className={`space-y-4 ${previewMode === 'mobile' ? 'max-w-xs mx-auto' : ''}`}>
                {websiteSections.filter(s => s.isActive).map(section => (
                  <div key={section.id} className="border rounded p-3">
                    <div className="text-xs text-gray-500 mb-1">{section.title}</div>
                    {section.type === 'banner' && section.imageUrl && (
                      <div
                        className="h-20 bg-cover bg-center rounded mb-2"
                        style={{ backgroundImage: `url(${section.imageUrl})` }}
                      />
                    )}
                    <div className={`${section.type === 'banner' ? 'font-bold text-center' : ''}`}>
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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

export default WebsiteEditor;
