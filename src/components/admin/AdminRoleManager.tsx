
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, UserPlus, Mail, Trash2, Edit, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type AdminRole = 'full_control' | 'product_only' | 'social_media_only';

interface Admin {
  id: string;
  email: string;
  role: AdminRole;
  addedAt: string;
  lastActive: string;
  status: 'active' | 'inactive';
}

const AdminRoleManager = () => {
  const { toast } = useToast();
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: '1',
      email: 'alnoormall.pk@gmail.com',
      role: 'full_control',
      addedAt: '2024-01-01',
      lastActive: '2024-01-15',
      status: 'active'
    }
  ]);

  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<AdminRole>('product_only');
  const [editingAdmin, setEditingAdmin] = useState<string | null>(null);
  const [editRole, setEditRole] = useState<AdminRole>('product_only');

  const roleDescriptions = {
    full_control: 'Can manage everything including other admins',
    product_only: 'Can only manage products and categories',
    social_media_only: 'Can only manage social media content and posts'
  };

  const getRoleColor = (role: AdminRole) => {
    switch (role) {
      case 'full_control': return 'bg-red-100 text-red-800';
      case 'product_only': return 'bg-blue-100 text-blue-800';
      case 'social_media_only': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddAdmin = () => {
    if (!newAdminEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    if (admins.some(admin => admin.email === newAdminEmail)) {
      toast({
        title: "Error",
        description: "This email is already an admin",
        variant: "destructive"
      });
      return;
    }

    const newAdmin: Admin = {
      id: Date.now().toString(),
      email: newAdminEmail,
      role: newAdminRole,
      addedAt: new Date().toISOString().split('T')[0],
      lastActive: 'Never',
      status: 'inactive'
    };

    setAdmins([...admins, newAdmin]);
    setNewAdminEmail('');
    setNewAdminRole('product_only');

    toast({
      title: "Admin Added",
      description: `${newAdminEmail} has been added as ${newAdminRole.replace('_', ' ')} admin`,
    });
  };

  const handleDeleteAdmin = (adminId: string) => {
    const adminToDelete = admins.find(admin => admin.id === adminId);
    if (adminToDelete?.email === 'alnoormall.pk@gmail.com') {
      toast({
        title: "Error",
        description: "Cannot delete the main admin account",
        variant: "destructive"
      });
      return;
    }

    setAdmins(admins.filter(admin => admin.id !== adminId));
    toast({
      title: "Admin Removed",
      description: "Admin has been removed successfully",
    });
  };

  const handleEditRole = (adminId: string, newRole: AdminRole) => {
    setAdmins(admins.map(admin => 
      admin.id === adminId ? { ...admin, role: newRole } : admin
    ));
    setEditingAdmin(null);
    toast({
      title: "Role Updated",
      description: "Admin role has been updated successfully",
    });
  };

  const startEditing = (adminId: string, currentRole: AdminRole) => {
    setEditingAdmin(adminId);
    setEditRole(currentRole);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Role Management</h2>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-amber-500" />
          <span className="text-sm text-gray-600">Total Admins: {admins.length}</span>
        </div>
      </div>

      {/* Add New Admin */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>Add New Admin</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="admin@example.com"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Role
              </label>
              <select
                value={newAdminRole}
                onChange={(e) => setNewAdminRole(e.target.value as AdminRole)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="product_only">Product Only</option>
                <option value="social_media_only">Social Media Only</option>
                <option value="full_control">Full Control</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddAdmin} className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Admin
              </Button>
            </div>
          </div>
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
            <p><strong>Role Permissions:</strong></p>
            <ul className="mt-2 space-y-1">
              <li>• <strong>Full Control:</strong> {roleDescriptions.full_control}</li>
              <li>• <strong>Product Only:</strong> {roleDescriptions.product_only}</li>
              <li>• <strong>Social Media Only:</strong> {roleDescriptions.social_media_only}</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Current Admins */}
      <Card>
        <CardHeader>
          <CardTitle>Current Admins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {admins.map((admin) => (
              <div key={admin.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{admin.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {editingAdmin === admin.id ? (
                        <div className="flex items-center space-x-2">
                          <select
                            value={editRole}
                            onChange={(e) => setEditRole(e.target.value as AdminRole)}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value="product_only">Product Only</option>
                            <option value="social_media_only">Social Media Only</option>
                            <option value="full_control">Full Control</option>
                          </select>
                          <Button
                            size="sm"
                            onClick={() => handleEditRole(admin.id, editRole)}
                            className="bg-green-500 hover:bg-green-600 h-6 w-6 p-0"
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingAdmin(null)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Badge className={getRoleColor(admin.role)}>
                          {admin.role.replace('_', ' ').toUpperCase()}
                        </Badge>
                      )}
                      <span className={`text-xs px-2 py-1 rounded ${
                        admin.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {admin.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Added: {admin.addedAt} | Last Active: {admin.lastActive}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {admin.email !== 'alnoormall.pk@gmail.com' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEditing(admin.id, admin.role)}
                        disabled={editingAdmin === admin.id}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  {admin.email === 'alnoormall.pk@gmail.com' && (
                    <Badge variant="outline" className="text-xs">
                      Main Admin
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Full Control</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Manage all products</li>
                <li>• Manage orders</li>
                <li>• Manage categories</li>
                <li>• Add/remove admins</li>
                <li>• Change website settings</li>
                <li>• Access all features</li>
              </ul>
            </div>
            <div className="p-4 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Product Only</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Add/edit/delete products</li>
                <li>• Manage categories</li>
                <li>• Bulk upload products</li>
                <li>• Manage stock levels</li>
                <li>• View product analytics</li>
                <li>• Cannot manage admins</li>
              </ul>
            </div>
            <div className="p-4 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Social Media Only</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Update social media content</li>
                <li>• Manage website banners</li>
                <li>• Edit promotional content</li>
                <li>• Manage customer notifications</li>
                <li>• Cannot access products</li>
                <li>• Cannot manage admins</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRoleManager;
