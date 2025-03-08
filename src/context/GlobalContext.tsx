import { useEffect, useState } from "react";
import { GlobalContext } from "./contexts";
import { getItem, removeItem, setItem } from "../utils/localStorage";
import {User, CartItem} from '../types/types';

// Create new product types


export type GlobalContextType = {
  user: User | undefined,
  setUser: (user: User | undefined) => void,
  cartItems: CartItem[],
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
}

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => { // Initialize cartItems state with [] or savedItems
    const savedItems = getItem('savedItems');
    return savedItems ? savedItems : [];
  });

  // Update cartItems on localStorage
  useEffect(() => {
    setItem('savedItems', cartItems);
  }, [cartItems]);

  // Mover funcion a services
  const fetchUser = async () => {
    try {
      // Check if there is a token on localStorage
      const token = getItem('token');

      // If there is a token ...
      if (token) {
        const response = await fetch('http://localhost:3000/api/auth/user', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include'
        });

        if (!response.ok) throw new Error('Not Authenticated');

        const user = await response.json();
        if (user) setUser(user);
        console.log(user);
      }
    } catch (error) {
      console.error(error);
      // If there is an error eliminate token and logout user
      removeItem('token');
      setUser(undefined);
    }
  }

  useEffect(() => {
    fetchUser()
  }, []);

  return (
    <GlobalContext.Provider value={{
      user,
      setUser,
      cartItems,
      setCartItems
    }}>
      {children}
    </GlobalContext.Provider>)
}

