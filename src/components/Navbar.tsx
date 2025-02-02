import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

export default function Navbar() {
 const { user, setUser } = useAuth();
 const navigate = useNavigate();

 const handleLogout = async () => {
  try {
   const response = await fetch('http://localhost:3000/api/auth/logout', { 
    method: 'POST',
    credentials: 'include'
   });

   if (response.status === 500) {
    const error = await response.json();
    console.log(error);
   }

   setUser(undefined);
   navigate('/');

  } catch (error) {
   console.error(error);
  }
 };

 return (
  <div className="nav-container">
    {user ? (<h2>Welcome {user}</h2>) : null}
    <button onClick={handleLogout}>Logout</button>
  </div>
 );
}
