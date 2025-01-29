import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

export default function Navbar() {
 const { user, setUser } = useAuth();
 const navigate = useNavigate();

 const handleLogout = async () => {
  try {
   await fetch('http://localhost:3000/api/auth/logout', { // Close session
    method: 'POST',
    credentials: 'include', // Asegúrate de enviar cookies de sesión
   });

   setUser(undefined);
   navigate('/');

  } catch (error) {
   console.error('Error logging out:', error);
  }
 };

 return (
  <>
   <div className="nav-container">
    {user ? (<p>Welcome {user}</p>) : null}
    <button onClick={handleLogout}>Logout</button>
   </div>
  </>
 );
}
