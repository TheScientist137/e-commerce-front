import { useEffect, useState } from "react";
import { ShopContext } from "./contexts.ts";
import { getProductsService } from "../services/shopService.ts";
import { getItem, setItem } from "../utils/localStorage.ts";
import { Product, CartItem } from '../types/types.ts';

export const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchProducts = async () => {
    try {
      const productsData = await getProductsService();
      setProducts(productsData);
      setItem('products', productsData); // Save telescopes on localStorage
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    const savedProducts = getItem('products');
    // Check localStorage for savedProducts
    if (savedProducts) {
      setProducts(savedProducts);
      //setFilteredTelescopes(savedTelescopes);
    } else {
      // If no data on localStorage fetch from API
      fetchProducts();
    }

    // Load cart items from localStorage 
    const savedCartItems = getItem('savedItems');
    if (savedCartItems) setCartItems(savedCartItems);
  }, []);

  return (
    <ShopContext.Provider value={{
      products,
      filteredProducts,
      cartItems,
      setProducts,
      setFilteredProducts
    }}>
      {children}
    </ShopContext.Provider>)
}

