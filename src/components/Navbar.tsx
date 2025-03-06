import { useNavigate, Link } from "react-router";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { removeItem } from "../utils/localStorage";

export default function Navbar() {
  const { setUser } = useGlobalContext();
  const navigate = useNavigate();

  // move function to services
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to logout');

      // remove token from localStorage
      removeItem('token');

      // Set user state to undefined and navigate to signup page
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
      <button><Link to='/cart'>Cart</Link></button>
    </div>
  );
}
