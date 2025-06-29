
import React from 'react';
import { Edit, Eye, Settings, Plus, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';

const AdminToolbar = () => {
  const { isAdminMode, setIsAdminMode, isAdmin } = useAdmin();

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-xl border border-amber-200 p-3">
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => setIsAdminMode(!isAdminMode)}
          size="sm"
          className={`${
            isAdminMode 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-amber-500 hover:bg-amber-600'
          } text-white`}
        >
          {isAdminMode ? (
            <>
              <X className="h-4 w-4 mr-1" />
              Exit Edit
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-1" />
              Edit Mode
            </>
          )}
        </Button>
        
        {isAdminMode && (
          <>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add Product
            </Button>
            <Button size="sm" variant="outline">
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminToolbar;
