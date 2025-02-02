import { Outlet, Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
 const { user, loading } = useAuth();

 if (loading) return <div>Loading...</div>
 if (!user) return <Navigate to='/' /> 

 return <Outlet />;
}