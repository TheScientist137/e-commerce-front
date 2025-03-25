import { useEffect, useState } from "react";
import { ShopContext } from "./contexts";
import { getItem, setItem } from "../utils/localStorage";
import { CartItem } from '../types/types';


export const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => { // Initialize cartItems state with [] or savedItems
    const savedItems = getItem('savedItems');
    return savedItems ? savedItems : [];
  });

  // Update cartItems on localStorage
  useEffect(() => {
    setItem('savedItems', cartItems);
  }, [cartItems]);


  return (
    <ShopContext.Provider value={{
      cartItems,
      setCartItems
    }}>
      {children}
    </ShopContext.Provider>)
}

