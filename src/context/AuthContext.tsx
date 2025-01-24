import { useEffect, useState } from "react";
import { AuthContext } from "./contexts";

export type AuthContextType = {
 user: string | undefined, // user name
 setUser: (user: string | undefined) => void,
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
 const [user, setUser] = useState<string | undefined>(undefined);

 useEffect(() => {
  const fetchUser = async () => {
   try {
    const response = await fetch('http://localhost:3000/api/auth/user',
     { credentials: 'include' });

    if (!response.ok) {
     setUser(undefined);
     return;
    }

    const data = await response.json();
    setUser(data);

   } catch (error) {
    console.error('Error fetching', error)
    setUser(undefined);
   }
  }

  fetchUser();
 }, []);

 return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
