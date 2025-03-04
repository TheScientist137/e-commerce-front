import { Outlet, Navigate } from "react-router";
import { useGlobalContext } from "../hooks/useGlobalContext";

// Mopdificar
export default function ProtectedRoute() {
 const { user, loading } = useGlobalContext();

 if (loading) return <div>Loading...</div>
 if (!user) return <Navigate to='/' /> 

 return <Outlet />;
}