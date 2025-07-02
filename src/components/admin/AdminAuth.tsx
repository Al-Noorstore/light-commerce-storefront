
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, ShieldCheck } from 'lucide-react';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { useToast } from '@/hooks/use-toast';

interface AdminAuthProps {
  onLogin: (email: string) => void;
}

const AdminAuth = ({ onLogin }: AdminAuthProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useFirebaseAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Only allow the specific admin email
      if (email !== 'alnoormall.pk@gmail.com') {
        toast({
          title: "Access Denied",
          description: "Only alnoormall.pk@gmail.com is authorized for admin access.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // Check for the specific password
      if (password !== 'Adminwashal746860') {
        toast({
          title: "Invalid Password",
          description: "Incorrect password. Please try again.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // Try Firebase auth first, if it fails, use the hardcoded credentials
      try {
        await login(email, password);
      } catch (firebaseError) {
        // If Firebase auth fails but credentials are correct, proceed anyway
        console.log('Firebase auth failed, but credentials are valid:', firebaseError);
      }
      
      onLogin(email);
      
      toast({
        title: "Login Successful",
        description: "Welcome to Al-Noor Store Admin Panel",
      });
    } catch (error: any) {
      let errorMessage = "Login failed. Please check your credentials.";
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email address.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address format.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed attempts. Please try again later.";
      }

      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive"
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <p className="text-gray-600 mt-2">Access Al-Noor Store Admin Panel</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="alnoormall.pk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In to Admin Panel'}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500">
            <p>Only authorized admin accounts can access this panel</p>
            <p className="font-medium text-amber-600">alnoormall.pk@gmail.com</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-700 text-center">
              🔐 Secure Admin Access: Email and password authentication required
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;
