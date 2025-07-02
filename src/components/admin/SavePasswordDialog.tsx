
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Lock, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SavePasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

const SavePasswordDialog = ({ isOpen, onClose, onConfirm, title, description }: SavePasswordDialogProps) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // For demo purposes, using a simple password. In production, this should be more secure
  const SAVE_PASSWORD = 'SaveAdmin2024';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password === SAVE_PASSWORD) {
      onConfirm();
      setPassword('');
      onClose();
      toast({
        title: "Changes Saved",
        description: "Your changes have been successfully saved.",
      });
    } else {
      toast({
        title: "Invalid Password",
        description: "Incorrect save password. Please try again.",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const handleClose = () => {
    setPassword('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-amber-500" />
            <span>{title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-medium">Security Confirmation Required</p>
              <p className="text-xs text-amber-700 mt-1">{description}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Save Changes Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Enter save password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Confirm & Save'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>

          <div className="text-center text-xs text-gray-500">
            🔐 This password is set in Admin Settings and required for all changes
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SavePasswordDialog;
