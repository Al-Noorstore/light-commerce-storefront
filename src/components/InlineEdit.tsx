
import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAdmin } from '@/contexts/AdminContext';

interface InlineEditProps {
  value: string;
  onSave: (newValue: string) => void;
  type?: 'text' | 'textarea' | 'number';
  className?: string;
  placeholder?: string;
}

const InlineEdit = ({ value, onSave, type = 'text', className = '', placeholder }: InlineEditProps) => {
  const { isAdminMode } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  if (!isAdminMode) {
    return <span className={className}>{value}</span>;
  }

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2 min-w-0">
        {type === 'textarea' ? (
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="min-h-[80px]"
            placeholder={placeholder}
          />
        ) : (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            type={type}
            className="flex-1"
            placeholder={placeholder}
          />
        )}
        <Button size="sm" onClick={handleSave} className="bg-green-500 hover:bg-green-600">
          <Check className="h-3 w-3" />
        </Button>
        <Button size="sm" variant="outline" onClick={handleCancel}>
          <X className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <div className="group relative inline-flex items-center">
      <span className={`${className} ${isAdminMode ? 'border border-dashed border-amber-300 px-1 rounded' : ''}`}>
        {value}
      </span>
      {isAdminMode && (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsEditing(true)}
          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
        >
          <Edit2 className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

export default InlineEdit;
