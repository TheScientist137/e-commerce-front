import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
 const { user } = useAuth();
 const navigate = useNavigate();

 if (!user) navigate('/');

 console.log(user);
 return <Outlet /> 
}