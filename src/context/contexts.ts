import { createContext } from "react";
import { AuthContextType } from "./AuthContext.tsx";
import { ShopContextType } from "./ShopContext.tsx";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const ShopContext = createContext<ShopContextType | undefined>(undefined);