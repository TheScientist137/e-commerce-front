import { useEffect, useState } from "react";
import { GlobalContext } from "./contexts";
import { Telescope } from "../pages/ShopPage";
import { getItem, removeItem } from "../utils/localStorage";

type User = {
  id: number,
  name: string,
  email: string
}

export type GlobalContextType = {
  user: User | undefined,
  loading: boolean,
  cartItems: Telescope[],
  setUser: (user: User | undefined) => void,
  setCartItems: React.Dispatch<React.SetStateAction<Telescope[]>>
}

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<Telescope[]>([]);

  // Guardar cartItems en localStorage cada vez que cambie el carrito

  const fetchUser = async () => {
    try {
      // Check if there is a token on localStorage
      const token = getItem('token');

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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser()
  }, []);

  return (
    <GlobalContext.Provider value={{ user, setUser, loading, cartItems, setCartItems }}>
      {children}
    </GlobalContext.Provider>)
}

