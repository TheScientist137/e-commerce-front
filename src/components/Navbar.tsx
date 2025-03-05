import { useNavigate, Link } from "react-router";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { removeItem } from "../utils/localStorage";

export default function Navbar() {
  const { setUser } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to logout');

      // Eliminate token from localStorage
      removeItem('token');

      setUser(undefined);
      navigate('/signup');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="nav-container">
      <h1><Link to='/'>TelescopEcommerce</Link></h1>
      <button>user</button>
      <button onClick={handleLogout}>Logout</button>
      <button>Carrito</button>
    </div>
  );
}
