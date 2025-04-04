import { useEffect, useState } from "react";
import { ShopContext } from "./contexts.ts";
import { getProductsService } from "../services/shopService.ts";
import { getItem, setItem } from "../utils/localStorage.ts";
import { Product } from '../types/types.ts';

export const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState([]);

  const fetchProducts = async () => {
    try {
      const productsData = await getProductsService();
      console.log(productsData);
      setProducts(productsData);
      // setItem('telescopes', data); // Save telescopes on localStorage
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    // const savedTelescopes = getItem('telescopes');
    // const savedMounts = getItem('mounts');
    // // Check localStorage for savedProducts
    // // If no data on localStorage fetch from API
    // if (savedTelescopes) {
    //   setTelescopes(savedTelescopes);
    //   setFilteredTelescopes(savedTelescopes);
    // } else {
    //   fetchTelescopesData();
    // }
    // if (savedMounts) {
    //   setMounts(savedMounts);
    // } else {
    //   fetchMountsData();
    // }
    //
    // // Load cart items from localStorage 
    // const savedItems = getItem('savedItems');
    // if (savedItems) setCartItems(savedItems);
    fetchProducts();
  }, []);

  // Save cart items on localStorage (every time cartItems change)


  return (
    <ShopContext.Provider value={{ products, cartItems }}>
      {children}
    </ShopContext.Provider>)
}

