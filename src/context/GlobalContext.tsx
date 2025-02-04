import { useEffect, useState } from "react";
import { GlobalContext } from "./contexts";
import { Telescope } from "../pages/ShopPage";

export type GlobalContextType = {
  user: string | undefined,
  loading: boolean,
  cartItems: Telescope[],
  setUser: (user: string | undefined) => void,
  setCartItems: React.Dispatch<React.SetStateAction<Telescope[]>>
}


export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<Telescope[]>([]);

  // Guardar cartItems en localStorage cada vez que cambie el carrito

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/user', { credentials: 'include' });

      if (!response.ok) throw new Error('Not Authenticated');

      const data = await response.json();
      if (data) setUser(data.user);
      console.log(data);

    } catch (error) {
      console.error(error);

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

