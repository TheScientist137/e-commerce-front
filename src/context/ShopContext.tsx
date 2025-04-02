import { useEffect, useState } from "react";
import { ShopContext } from "./contexts.ts";
import { getTelescopesService, getMountsService } from "../services/shopService.ts";
import { getItem, setItem } from "../utils/localStorage.ts";
import { Telescope, Mount, Cart } from '../types/types.ts';

export const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [telescopes, setTelescopes] = useState<Telescope[]>([]);
  const [filteredTelescopes, setFilteredTelescopes] = useState<Telescope[]>([]);
  const [mounts, setMounts] = useState<Mount[]>([]);
  const [cartItems, setCartItems] = useState<Cart>([]);


  const fetchTelescopesData = async () => {
    try {
      const data = await getTelescopesService();
      setTelescopes(data);
      setFilteredTelescopes(data);
      setItem('telescopes', data); // Save telescopes on localStorage
    } catch (error) {
      console.error('Error fetching telescopes:', error);
    }
  };

  // Filter telescopes by brand function => IMPROVE to filter products by brand
  // Create the other filters !!!!!!!!!!!!!!
  const filterTelescopesByBrand = (brand: string) => {
    if (brand === "all") {
      setFilteredTelescopes(telescopes);
    } else {
      const filtered = telescopes.filter(telescope => telescope.brand === brand);
      setFilteredTelescopes(filtered);
    }
  };


  const fetchMountsData = async () => {
   try {
    const data = await getMountsService();
    console.log(data);
    setMounts(data);
    setItem('mounts', data);
   } catch (error) {
    console.error('Error fetching mounts', error);
   }
  }

  // Mejorar y entender esta funcion !!!!!!!!!!!!!!!!!!!!!!!!!! 
  const addToCart = (product: Telescope | Mount) => {
    if (!product) return;

    setCartItems((prevState) => {
      console.log(prevState);
      const existingItem = prevState.find(item => item.product.id === product.id);
      // If existingItem exists return a new array with the quantity of that item incremented
      if (existingItem) {
        return prevState.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ); // Otherwise return a new array with the prevState and the new item
      } else {
        return [...prevState, { product: product, quantity: 1 }];
      }
    });
  }

  useEffect(() => {
    const savedTelescopes = getItem('telescopes');
    const savedMounts = getItem('mounts');
    // Check localStorage for savedProducts
    // If no data on localStorage fetch from API
    if (savedTelescopes) {
      setTelescopes(savedTelescopes);
      setFilteredTelescopes(savedTelescopes);
    } else {
      fetchTelescopesData();
    }
    if (savedMounts) {
      setMounts(savedMounts);
    } else {
      fetchMountsData();
    }

    // Load cart items from localStorage 
    const savedItems = getItem('savedItems');
    if (savedItems) setCartItems(savedItems);
  }, []);

  // Save cart items on localStorage (every time cartItems change)
  useEffect(() => {
    if (cartItems.length > 0) setItem('savedItems', cartItems);
  }, [cartItems]);

  return (
    <ShopContext.Provider value={{
      telescopes,
      mounts,
      filteredTelescopes,
      filterTelescopesByBrand,
      setTelescopes,
      setMounts,
      cartItems,
      setCartItems,
      addToCart
    }}>
      {children}
    </ShopContext.Provider>)
}

