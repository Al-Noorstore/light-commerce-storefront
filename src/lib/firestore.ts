
import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  updateDoc, 
  increment,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  minStock: number;
  category: string;
  visible: boolean;
}

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const productsCollection = collection(db, 'products');
    const snapshot = await getDocs(productsCollection);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Update product stock
export const updateProductStock = async (productId: string, quantityChange: number): Promise<void> => {
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, {
      stock: increment(-quantityChange) // Decrease stock
    });
    
    console.log(`Updated stock for product ${productId} by ${quantityChange}`);
  } catch (error) {
    console.error('Error updating product stock:', error);
    throw error;
  }
};

// Get low stock products
export const getLowStockProducts = async (): Promise<Product[]> => {
  try {
    const products = await getProducts();
    return products.filter(product => product.stock <= product.minStock);
  } catch (error) {
    console.error('Error fetching low stock products:', error);
    throw error;
  }
};

// Listen to product changes in real-time
export const subscribeToProducts = (callback: (products: Product[]) => void) => {
  const productsCollection = collection(db, 'products');
  
  return onSnapshot(productsCollection, (snapshot) => {
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
    
    callback(products);
  });
};
