import { useEffect, useState } from "react";
import { AuthContext } from "./contexts";
import { User } from "../types/types";
import { getItem, removeItem, setItem } from "../utils/localStorage";
import { logoutService } from "../services/authService";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
 const [user, setUser] = useState<User | null>(null);
 const isAdmin = user && user.role === 'admin';

 // Pensar si mantener estas funciones en el contexto
 const login = (token: string, userData: User) => {
  setItem('token', token); // Save token on localStorage
  setUser(userData); // Updates user info
 }

 const logout = () => {
  removeItem('token'); // Remove token form localStorage
  setUser(null); // Clean user info
 }

 const checkAuth = async () => {
  const token = getItem('token');
  if (!token) return;

  try {
   const response = await fetch('http://localhost:3000/api/auth/user', {
    headers: { Authorization: `Bearer ${token}` }
   });

   if (!response.ok) throw new Error('Not authenticated');
   const userData = await response.json();
   setUser(userData);
  } catch (error) {
   console.error(error);
   logoutService(); // comprobar uso
  }
 }

 useEffect(() => {
  checkAuth();
 }, [])

 return (
  <AuthContext.Provider value={{ user, isAdmin, login, logout, checkAuth }}>
   {children}
  </AuthContext.Provider>
 )
}





