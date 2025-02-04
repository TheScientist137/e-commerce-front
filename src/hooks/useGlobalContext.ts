import { useContext } from "react";
import { GlobalContext } from "../context/contexts";

export const useGlobalContext = () => {
 const context = useContext(GlobalContext);
 if (!context) throw new Error('useAuth must be used within an AuthProvider');

 return context;
}
