import { Navigate } from "react-router";
import { useAuthContext } from "../hooks/useContext";

export default function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
 const { isAdmin } = useAuthContext();

 if (!isAdmin) return <Navigate to='/' /> 
 // Entender el uso de children
 return children;
}