import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export default function ProtectedRoute() {
 const { user } = useAuth();
 const navigate = useNavigate();

 useEffect(() => {
  if (!user) navigate('/');
 }, [user, navigate])

 console.log(user);
 return <Outlet /> 
}