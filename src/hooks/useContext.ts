import { useContext } from "react";
import { AuthContext, ShopContext } from "../context/contexts";

export const useShopContext = () => {
 const context = useContext(ShopContext);
 if (!context) throw new Error('useAuth must be used within an AuthProvider');

 return context;
}

export const useAuthContext = () => {
 const context = useContext(AuthContext);
 if (!context) throw new Error('useAuth must be used within an AuthProvider');

 return context;
}