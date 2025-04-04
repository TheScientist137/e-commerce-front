import { useEffect, useState } from "react";
import { ShopContext } from "./contexts.ts";
import { getProductsService } from "../services/shopService.ts";
import { getItem, setItem } from "../utils/localStorage.ts";
import { Product, CartItem } from '../types/types.ts';

export const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
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
    // // Check localStorage for savedProducts
    // // If no data on localStorage fetch from API
    if (savedProducts) {
      setProducts(savedProducts);
      //setFilteredTelescopes(savedTelescopes);
    } else {
      fetchProducts();
    }

    // Load cart items from localStorage 
    const savedItems = getItem('savedItems');
    if (savedItems) setCartItems(savedItems);
  }, []);

  return (
    <ShopContext.Provider value={{ products, cartItems }}>
      {children}
    </ShopContext.Provider>)
}

