
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchOrdersFromSheet, addOrderToSheet, updateOrderStatus } from '@/lib/googleSheetsApi';

interface OrderData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  productName: string;
  quantity: string;
  price: string;
  orderDate: string;
  status: string;
}

export const useGoogleSheets = () => {
  const queryClient = useQueryClient();

  // Fetch orders from Google Sheets
  const {
    data: orders = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['google-sheets-orders'],
    queryFn: fetchOrdersFromSheet,
    refetchInterval: 30000, // Refresh every 30 seconds
    retry: 3,
  });

  // Add new order mutation
  const addOrderMutation = useMutation({
    mutationFn: addOrderToSheet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['google-sheets-orders'] });
    },
  });

  // Update order status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ rowIndex, status }: { rowIndex: number; status: string }) =>
      updateOrderStatus(rowIndex, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['google-sheets-orders'] });
    },
  });

  return {
    orders,
    isLoading,
    error,
    refetch,
    addOrder: addOrderMutation.mutate,
    updateStatus: updateStatusMutation.mutate,
    isAddingOrder: addOrderMutation.isPending,
    isUpdatingStatus: updateStatusMutation.isPending,
  };
};
