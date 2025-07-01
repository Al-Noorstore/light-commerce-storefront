
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getProducts, 
  updateProductStock, 
  getLowStockProducts,
  subscribeToProducts,
  Product 
} from '@/lib/firestore';

export const useFirestoreProducts = () => {
  const queryClient = useQueryClient();
  const [products, setProducts] = useState<Product[]>([]);

  // Real-time subscription to products
  useEffect(() => {
    const unsubscribe = subscribeToProducts((updatedProducts) => {
      setProducts(updatedProducts);
      queryClient.setQueryData(['firestore-products'], updatedProducts);
    });

    return () => unsubscribe();
  }, [queryClient]);

  // Get all products
  const {
    data: productsData = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['firestore-products'],
    queryFn: getProducts,
    initialData: products,
  });

  // Get low stock products
  const {
    data: lowStockProducts = [],
    isLoading: isLoadingLowStock
  } = useQuery({
    queryKey: ['low-stock-products'],
    queryFn: getLowStockProducts,
    refetchInterval: 60000, // Check every minute
  });

  // Update stock mutation
  const updateStockMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      updateProductStock(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['firestore-products'] });
      queryClient.invalidateQueries({ queryKey: ['low-stock-products'] });
    },
  });

  return {
    products: productsData,
    lowStockProducts,
    isLoading,
    isLoadingLowStock,
    error,
    updateStock: updateStockMutation.mutate,
    isUpdatingStock: updateStockMutation.isPending,
  };
};
