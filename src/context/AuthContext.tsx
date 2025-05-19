import { useEffect, useState } from "react";
import { AuthContext } from "./contexts.ts";
import { UserType } from "../types/types.ts";
import { getItem, removeItem, setItem } from "../utils/localStorage.ts";
import { logoutService, checkAuthService } from "../services/authService.ts";

export type AuthContextType = {
    user: UserType | null,
    isAdmin: boolean | null,
    login: (token: string, userData: UserType) => void,
    logout: () => void,
    checkAuth: () => Promise<void>
   }

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
 const [user, setUser] = useState<UserType | null>(null);
 const isAdmin = user && user.role === 'admin'; // boolean

 const login = (token: string, userData: UserType) => {
  setItem('token', token); // Save token on localStorage
  setUser(userData); // Updates user info
 }

 const logout = () => {
  removeItem('token'); // Remove token from localStorage
  setUser(null); // Clean user info
 }

 const checkAuth = async () => {
  const token = getItem('token');
  if (!token) return;

  try {
   const userData = await checkAuthService(token as string);
   setUser(userData.result);
   console.log(userData.message, userData.result);
  } catch (error) {
   console.error(error);
   await logoutService(); // comprobar uso
   removeItem('token');
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
