import { useEffect, useState } from "react";
import { ShopContext } from "./contexts";
import { getItem, setItem } from "../utils/localStorage";
import { Telescope, Mount, Cart } from '../types/types';

export const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [telescopes, setTelescopes] = useState<Telescope[]>([]);
  const [cartItems, setCartItems] = useState<Cart>([]);

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

  // Load cart items from localStorage
  useEffect(() => {
    const savedItems = getItem('savedItems');
    if (savedItems) setCartItems(savedItems);
  }, []);

  // Save cart items on localStorage
  useEffect(() => {
    if (cartItems.length > 0) setItem('savedItems', cartItems);
  }, [cartItems]);

  return (
    <ShopContext.Provider value={{ telescopes, setTelescopes, cartItems, setCartItems, addToCart }}>
      {children}
    </ShopContext.Provider>)
}

