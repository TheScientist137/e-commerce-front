import { useEffect, useState } from "react";
import { AuthContext } from "./contexts";

export type AuthContextType = {
 user: string | undefined, 
 setUser: (user: string | undefined) => void,
 loading: boolean,
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
 const [user, setUser] = useState<string | undefined>(undefined);
 const [loading, setLoading] = useState<boolean>(true);

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

 return <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>
}
