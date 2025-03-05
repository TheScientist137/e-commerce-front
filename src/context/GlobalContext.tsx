import { useEffect, useState } from "react";
import { GlobalContext } from "./contexts";
import { getItem, removeItem } from "../utils/localStorage";

type User = {
  id: number,
  name: string,
  email: string
}

export type Telescope = {
  id: number,
  name: string,
  description: string,
  price: number,
  brand: string,
  telescopeType: TelescopeType,
}

export type TelescopeType = {
  id: number,
  type: string,
  description: string
}

export type GlobalContextType = {
  user: User | undefined,
  setUser: (user: User | undefined) => void,
  cartItems: Telescope[],
  setCartItems: React.Dispatch<React.SetStateAction<Telescope[]>>
  telescopes: Telescope[],
  setTelescopes: React.Dispatch<React.SetStateAction<Telescope[]>>
}

// Chanage context structure -- refactor

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [cartItems, setCartItems] = useState<Telescope[]>([]);
  const [telescopes, setTelescopes] = useState<Telescope[]>([]);


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
      setCartItems,
      telescopes,
      setTelescopes
    }}>
      {children}
    </GlobalContext.Provider>)
}

