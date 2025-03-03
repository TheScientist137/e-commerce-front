import { useNavigate } from "react-router";
import { useGlobalContext } from "../hooks/useGlobalContext";

export default function Navbar() {
  const { user, setUser } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.status === 500) {
        const error = await response.json();
        throw new Error(error);
      }

      // Comprobar por que no cierra session

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
