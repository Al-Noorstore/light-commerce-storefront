import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FormSubmission {
  id: string;
  form_type: string;
  form_name: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  delivery_address?: string;
  delivery_city?: string;
  delivery_postal_code?: string;
  order_details?: any;
  additional_data?: any;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface FormSubmissionContextType {
  submissions: FormSubmission[];
  loading: boolean;
  fetchSubmissions: () => Promise<void>;
  updateSubmissionStatus: (id: string, status: string, notes?: string) => Promise<void>;
  deleteSubmission: (id: string) => Promise<void>;
}

const FormSubmissionContext = createContext<FormSubmissionContextType | undefined>(undefined);

export const FormSubmissionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching form submissions:', error);
        return;
      }

      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching form submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSubmissionStatus = async (id: string, status: string, notes?: string) => {
    try {
      const updateData: any = { status };
      if (notes !== undefined) {
        updateData.notes = notes;
      }

      const { data, error } = await supabase
        .from('form_submissions')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating submission:', error);
        throw error;
      }

      if (data) {
        setSubmissions(prev => prev.map(s => s.id === id ? data : s));
      }
    } catch (error) {
      console.error('Error updating submission:', error);
      throw error;
    }
  };

  const deleteSubmission = async (id: string) => {
    try {
      const { error } = await supabase
        .from('form_submissions')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting submission:', error);
        throw error;
      }

      setSubmissions(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting submission:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <FormSubmissionContext.Provider value={{
      submissions,
      loading,
      fetchSubmissions,
      updateSubmissionStatus,
      deleteSubmission
    }}>
      {children}
    </FormSubmissionContext.Provider>
  );
};

export const useFormSubmissions = () => {
  const context = useContext(FormSubmissionContext);
  if (context === undefined) {
    throw new Error('useFormSubmissions must be used within a FormSubmissionProvider');
  }
  return context;
};

export type { FormSubmission };