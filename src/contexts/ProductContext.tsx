import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
  badge?: string;
  rating?: number;
  stock?: number;
  buyNowLink?: string;
  buyNowText?: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, updatedProduct: Product) => void;
  deleteProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Premium Face Cream",
    category: "Cosmetics",
    price: "PKR 2,500",
    originalPrice: "PKR 3,000",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
    badge: "20% OFF",
    rating: 4.8,
    stock: 15
  },
  {
    id: 2,
    name: "Elegant Dining Set",
    category: "Home Decor",
    price: "PKR 15,000",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
    badge: "NEW",
    rating: 4.6,
    stock: 8
  },
  {
    id: 3,
    name: "Wireless Headphones",
    category: "Electronics",
    price: "PKR 8,500",
    originalPrice: "PKR 10,000",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
    badge: "SALE",
    rating: 4.7,
    stock: 22
  },
  {
    id: 4,
    name: "Designer Handbag",
    category: "Accessories",
    price: "PKR 6,000",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
    rating: 4.9,
    stock: 12
  },
  {
    id: 5,
    name: "Kitchen Cookware Set",
    category: "Kitchenware",
    price: "PKR 12,000",
    originalPrice: "PKR 14,000",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
    badge: "POPULAR",
    rating: 4.5,
    stock: 5
  },
  {
    id: 6,
    name: "Casual T-Shirt",
    category: "Clothes",
    price: "PKR 1,800",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
    rating: 4.4,
    stock: 30
  },
  {
    id: 7,
    name: "Moisturizing Serum",
    category: "Cosmetics",
    price: "PKR 3,200",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
    badge: "TRENDING",
    rating: 4.8,
    stock: 18
  },
  {
    id: 8,
    name: "Smart Watch",
    category: "Electronics",
    price: "PKR 18,000",
    originalPrice: "PKR 22,000",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
    badge: "HOT",
    rating: 4.6,
    stock: 7
  },
  {
    id: 9,
    name: "Formal Shoes",
    category: "Clothes",
    price: "PKR 7,500",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
    rating: 4.3,
    stock: 14
  },
  {
    id: 10,
    name: "Yoga Mat",
    category: "Sports & Fitness",
    price: "PKR 2,200",
    originalPrice: "PKR 2,800",
    image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=400&fit=crop",
    badge: "FITNESS",
    rating: 4.7,
    stock: 25
  },
  {
    id: 11,
    name: "Resistance Bands Set",
    category: "Sports & Fitness",
    price: "PKR 1,500",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    badge: "NEW",
    rating: 4.5,
    stock: 30
  },
  {
    id: 12,
    name: "Protein Shaker Bottle",
    category: "Sports & Fitness",
    price: "PKR 800",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    rating: 4.4,
    stock: 40
  },
  {
    id: 13,
    name: "Running Sneakers",
    category: "Shoes",
    price: "PKR 5,500",
    originalPrice: "PKR 7,000",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    badge: "SPORT",
    rating: 4.6,
    stock: 20
  },
  {
    id: 14,
    name: "Formal Leather Shoes",
    category: "Shoes",
    price: "PKR 8,000",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    badge: "PREMIUM",
    rating: 4.7,
    stock: 15
  },
  {
    id: 15,
    name: "Casual Loafers",
    category: "Shoes",
    price: "PKR 4,200",
    originalPrice: "PKR 5,000",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
    badge: "COMFORT",
    rating: 4.5,
    stock: 10
  }
];

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    const newProduct: Product = {
      ...product,
      id: newId,
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: number, updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export type { Product };