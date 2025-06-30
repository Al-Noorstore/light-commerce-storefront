
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Edit, Trash2, Shield, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: 'full_control' | 'product_only' | 'social_media_only';
  status: 'active' | 'inactive';
  lastLogin: string;
  addedBy: string;
}

const AdminRoleManager = () => {
  const { toast } = useToast();
  const [admins, setAdmins] = useState<AdminUser[]>([
    {
      id: 1,
      email: 'alnoormall.pk@gmail.com',
      name: 'Al-Noor Store Owner',
      role: 'full_control',
      status: 'active',
      lastLogin: '2024-01-15 10:30 AM',
      addedBy: 'System'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    email: '',
    name: '',
    role: 'product_only' as const
  });

  const rolePermissions = {
    full_control: {
      name: 'Full Control',
      color: 'bg-red-500',
      permissions: [
        'All product management',
        'User management',
        'Settings & policies',
        'Analytics & reports',
        'Notifications setup',
        'Website customization'
      ]
    },
    product_only: {
      name: 'Product Only',
      color: 'bg-blue-500',
      permissions: [
        'Add/edit products',
        'Manage inventory',
        'Upload bulk products',
        'Category management'
      ]
    },
    social_media_only: {
      name: 'Social Media Only',
      color: 'bg-green-500',
      permissions: [
        'Edit website content',
        'Manage banners',
        'Update social links',
        'Basic analytics view'
      ]
    }
  };

  const handleAddAdmin = () => {
    if (!newAdmin.email || !newAdmin.name) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const adminExists = admins.find(admin => admin.email === newAdmin.email);
    if (adminExists) {
      toast({
        title: "Admin Already Exists",
        description: "This email is already registered as an admin",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(...admins.map(a => a.id)) + 1;
    const newAdminUser: AdminUser = {
      id: newId,
      email: newAdmin.email,
      name: newAdmin.name,
      role: newAdmin.role,
      status: 'active',
      lastLogin: 'Never',
      addedBy: 'alnoormall.pk@gmail.com'
    };

    setAdmins([...admins, newAdminUser]);
    setNewAdmin({ email: '', name: '', role: 'product_only' });
    setShowAddForm(false);

    toast({
      title: "Admin Added",
      description: `${newAdmin.name} has been added as an admin with ${rolePermissions[newAdmin.role].name} permissions`,
    });
  };

  const handleDeleteAdmin = (id: number) => {
    const admin = admins.find(a => a.id === id);
    if (admin?.email === 'alnoormall.pk@gmail.com') {
      toast({
        title: "Cannot Delete",
        description: "You cannot delete the main admin account",
        variant: "destructive"
      });
      return;
    }

    if (confirm(`Are you sure you want to remove ${admin?.name} as an admin?`)) {
      setAdmins(admins.filter(a => a.id !== id));
      toast({
        title: "Admin Removed",
        description: `${admin?.name} has been removed from admin access`,
      });
    }
  };

  const handleRoleChange = (id: number, newRole: AdminUser['role']) => {
    const admin = admins.find(a => a.id === id);
    if (admin?.email === 'alnoormall.pk@gmail.com' && newRole !== 'full_control') {
      toast({
        title: "Cannot Change Role",
        description: "The main admin must always have full control",
        variant: "destructive"
      });
      return;
    }

    setAdmins(admins.map(admin =>
      admin.id === id ? { ...admin, role: newRole } : admin
    ));

    toast({
      title: "Role Updated",
      description: `${admin?.name}'s role has been updated to ${rolePermissions[newRole].name}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Role Management</h2>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Admin</span>
        </Button>
      </div>

      {/* Add Admin Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Admin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <Input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Role & Permissions</label>
              <select
                value={newAdmin.role}
                onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value as AdminUser['role'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="product_only">Product Only</option>
                <option value="social_media_only">Social Media Only</option>
                <option value="full_control">Full Control</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddAdmin}>Add Admin</Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Role Permissions Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(rolePermissions).map(([key, role]) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className={`h-5 w-5 text-white p-1 rounded ${role.color}`} />
                <span>{role.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                {role.permissions.map((permission, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>{permission}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Admins */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Current Admins ({admins.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {admins.map(admin => (
            <div key={admin.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {admin.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium">{admin.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-3 w-3" />
                    <span>{admin.email}</span>
                  </div>
                  <p className="text-xs text-gray-500">Last login: {admin.lastLogin}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <Badge className={`${rolePermissions[admin.role].color} text-white`}>
                    {rolePermissions[admin.role].name}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">Added by {admin.addedBy}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    value={admin.role}
                    onChange={(e) => handleRoleChange(admin.id, e.target.value as AdminUser['role'])}
                    className="text-sm px-2 py-1 border rounded"
                    disabled={admin.email === 'alnoormall.pk@gmail.com'}
                  >
                    <option value="product_only">Product Only</option>
                    <option value="social_media_only">Social Media Only</option>
                    <option value="full_control">Full Control</option>
                  </select>

                  {admin.email !== 'alnoormall.pk@gmail.com' && (
                    <Button
                      onClick={() => handleDeleteAdmin(admin.id)}
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Admin Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Admin Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium">alnoormall.pk@gmail.com</span>
              <span className="text-gray-600">logged in</span>
              <span className="text-gray-500">2 minutes ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="font-medium">alnoormall.pk@gmail.com</span>
              <span className="text-gray-600">updated product inventory</span>
              <span className="text-gray-500">1 hour ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="font-medium">alnoormall.pk@gmail.com</span>
              <span className="text-gray-600">created admin panel</span>
              <span className="text-gray-500">2 hours ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRoleManager;
