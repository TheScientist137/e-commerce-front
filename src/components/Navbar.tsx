import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router";

export default function Navbar() {
 const { user, setUser } = useAuth();

 const handleLogout = async () => {
  try {
   // Hacemos una petición al backend para cerrar la sesión
   await fetch('http://localhost:3000/api/auth/logout', {
    method: 'POST',
    credentials: 'include', // Asegúrate de enviar cookies de sesión
   });

   // Limpiamos el estado del usuario en el frontend
   setUser(undefined);

  } catch (error) {
   console.error('Error logging out:', error);
  }
 };

 return (
  <nav>
   <ul>
    {user ? (
     <>
      <li>Welcome, {user}</li>
      <li><button onClick={handleLogout}>Logout</button></li>
     </>
    ) : (
     <>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/signup">Sign Up</Link></li>
     </>
    )}
   </ul>
  </nav>
 );
}
