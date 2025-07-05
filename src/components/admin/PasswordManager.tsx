import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Key, Eye, EyeOff, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { updatePassword } from 'firebase/auth';

const PasswordManager = () => {
  const { toast } = useToast();
  const { currentUser } = useFirebaseAuth();
  
  // Login Password State
  const [currentLoginPassword, setCurrentLoginPassword] = useState('');
  const [newLoginPassword, setNewLoginPassword] = useState('');
  const [confirmLoginPassword, setConfirmLoginPassword] = useState('');
  const [showLoginPasswords, setShowLoginPasswords] = useState(false);
  const [isUpdatingLogin, setIsUpdatingLogin] = useState(false);

  // Edit Password State
  const [currentEditPassword, setCurrentEditPassword] = useState('');
  const [newEditPassword, setNewEditPassword] = useState('');
  const [confirmEditPassword, setConfirmEditPassword] = useState('');
  const [showEditPasswords, setShowEditPasswords] = useState(false);
  const [isUpdatingEdit, setIsUpdatingEdit] = useState(false);

  const handleLoginPasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingLogin(true);

    try {
      // Validate current password
      if (currentLoginPassword !== 'Adminwashal746860') {
        toast({
          title: "Invalid Current Password",
          description: "Please enter your current login password correctly.",
          variant: "destructive"
        });
        setIsUpdatingLogin(false);
        return;
      }

      // Validate new password
      if (newLoginPassword.length < 8) {
        toast({
          title: "Password Too Short",
          description: "New password must be at least 8 characters long.",
          variant: "destructive"
        });
        setIsUpdatingLogin(false);
        return;
      }

      if (newLoginPassword !== confirmLoginPassword) {
        toast({
          title: "Passwords Don't Match",
          description: "New password and confirmation don't match.",
          variant: "destructive"
        });
        setIsUpdatingLogin(false);
        return;
      }

      // Update Firebase Auth password if user is authenticated
      if (currentUser) {
        await updatePassword(currentUser, newLoginPassword);
        toast({
          title: "Login Password Updated",
          description: "Your Firebase login password has been successfully changed.",
        });
      } else {
        // Update stored password for local authentication
        localStorage.setItem('adminPassword', newLoginPassword);
        toast({
          title: "Login Password Updated",
          description: "Your login password has been successfully changed.",
        });
      }

      // Clear form
      setCurrentLoginPassword('');
      setNewLoginPassword('');
      setConfirmLoginPassword('');
    } catch (error: any) {
      console.error('Password update error:', error);
      let errorMessage = "Failed to update password. Please try again.";
      
      if (error.code === 'auth/requires-recent-login') {
        errorMessage = "Please log out and log back in before changing your password.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. Please choose a stronger password.";
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = "Network error. Please check your connection and try again.";
      }

      toast({
        title: "Password Update Failed",
        description: errorMessage,
        variant: "destructive"
      });
    }

    setIsUpdatingLogin(false);
  };

  const handleEditPasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingEdit(true);

    try {
      // Validate current edit password
      const storedEditPassword = localStorage.getItem('editPassword') || '548413';
      if (currentEditPassword !== storedEditPassword) {
        toast({
          title: "Invalid Current Edit Password",
          description: "Please enter your current edit password correctly.",
          variant: "destructive"
        });
        setIsUpdatingEdit(false);
        return;
      }

      // Validate new password
      if (newEditPassword.length < 6) {
        toast({
          title: "Password Too Short",
          description: "New edit password must be at least 6 characters long.",
          variant: "destructive"
        });
        setIsUpdatingEdit(false);
        return;
      }

      if (newEditPassword !== confirmEditPassword) {
        toast({
          title: "Passwords Don't Match",
          description: "New edit password and confirmation don't match.",
          variant: "destructive"
        });
        setIsUpdatingEdit(false);
        return;
      }

      // Save new edit password to localStorage
      localStorage.setItem('editPassword', newEditPassword);

      toast({
        title: "Edit Password Updated",
        description: "Your product edit password has been successfully changed.",
      });

      // Clear form
      setCurrentEditPassword('');
      setNewEditPassword('');
      setConfirmEditPassword('');
    } catch (error) {
      console.error('Edit password update error:', error);
      toast({
        title: "Password Update Failed",
        description: "Failed to update edit password. Please try again.",
        variant: "destructive"
      });
    }

    setIsUpdatingEdit(false);
  };

  const PasswordInput = ({ 
    value, 
    onChange, 
    placeholder, 
    show, 
    onToggleShow 
  }: {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    show: boolean;
    onToggleShow: () => void;
  }) => (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pr-10"
        required
      />
      <button
        type="button"
        onClick={onToggleShow}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Password Management</h2>
          <p className="text-sm text-gray-600">Manage your admin panel passwords securely</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Login Password Change */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-amber-600" />
              <span>Change Login Password</span>
            </CardTitle>
            <p className="text-sm text-gray-600">
              Update your Firebase authentication password
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLoginPasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Login Password</label>
                <PasswordInput
                  value={currentLoginPassword}
                  onChange={setCurrentLoginPassword}
                  placeholder="Enter current password"
                  show={showLoginPasswords}
                  onToggleShow={() => setShowLoginPasswords(!showLoginPasswords)}
                />
                <p className="text-xs text-gray-500 mt-1">Current: Adminwashal746860</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">New Login Password</label>
                <PasswordInput
                  value={newLoginPassword}
                  onChange={setNewLoginPassword}
                  placeholder="Enter new password (min 8 characters)"
                  show={showLoginPasswords}
                  onToggleShow={() => setShowLoginPasswords(!showLoginPasswords)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                <PasswordInput
                  value={confirmLoginPassword}
                  onChange={setConfirmLoginPassword}
                  placeholder="Confirm new password"
                  show={showLoginPasswords}
                  onToggleShow={() => setShowLoginPasswords(!showLoginPasswords)}
                />
              </div>

              <Button
                type="submit"
                disabled={isUpdatingLogin}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                {isUpdatingLogin ? 'Updating...' : 'Update Login Password'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Edit Password Change */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Key className="h-5 w-5 text-blue-600" />
              <span>Change Edit Password</span>
            </CardTitle>
            <p className="text-sm text-gray-600">
              Update your product editing security password
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEditPasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Edit Password</label>
                <PasswordInput
                  value={currentEditPassword}
                  onChange={setCurrentEditPassword}
                  placeholder="Enter current edit password"
                  show={showEditPasswords}
                  onToggleShow={() => setShowEditPasswords(!showEditPasswords)}
                />
                <p className="text-xs text-gray-500 mt-1">Current: {localStorage.getItem('editPassword') || '548413'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">New Edit Password</label>
                <PasswordInput
                  value={newEditPassword}
                  onChange={setNewEditPassword}
                  placeholder="Enter new edit password (min 6 characters)"
                  show={showEditPasswords}
                  onToggleShow={() => setShowEditPasswords(!showEditPasswords)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confirm New Edit Password</label>
                <PasswordInput
                  value={confirmEditPassword}
                  onChange={setConfirmEditPassword}
                  placeholder="Confirm new edit password"
                  show={showEditPasswords}
                  onToggleShow={() => setShowEditPasswords(!showEditPasswords)}
                />
              </div>

              <Button
                type="submit"
                disabled={isUpdatingEdit}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                {isUpdatingEdit ? 'Updating...' : 'Update Edit Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Security Notice */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-medium text-amber-800">Security Notice</h4>
              <p className="text-sm text-amber-700">
                • Login Password: Used for Firebase authentication to access the admin panel
              </p>
              <p className="text-sm text-amber-700">
                • Edit Password: Internal security password for product editing operations
              </p>
              <p className="text-sm text-amber-700">
                • Always use strong passwords and keep them secure
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordManager;