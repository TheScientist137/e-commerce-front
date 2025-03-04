import { Outlet, Navigate } from "react-router";
import { useGlobalContext } from "../hooks/useGlobalContext";

export default function ProtectedRoute() {
 const { user } = useGlobalContext();

 if (!user) return <Navigate to='/' /> 

 return <Outlet />;
}