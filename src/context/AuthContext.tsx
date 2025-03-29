import { useEffect, useState } from "react";
import { AuthContext } from "./contexts";
import { User } from "../types/types";
import { getItem, removeItem, setItem } from "../utils/localStorage";
import { logoutService, checkAuthService } from "../services/authService";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
 const [user, setUser] = useState<User | null>(null);
 const isAdmin = user && user.role === 'admin';

 // Pensar si mantener estas dos funciones en el contexto
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
   const userData = await checkAuthService(token);
   setUser(userData.result);
   console.log(userData.message, userData.result);
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





