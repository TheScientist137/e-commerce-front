import { Outlet, Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
 const { user } = useAuth();

 return user !== undefined ? <Outlet /> : <Navigate to='/' />;
}