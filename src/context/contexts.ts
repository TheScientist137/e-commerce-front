import { createContext } from "react";
import { AuthContextType, ShopContextType } from "../types/types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const ShopContext = createContext<ShopContextType | undefined>(undefined);