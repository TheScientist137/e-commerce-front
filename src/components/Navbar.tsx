import { useNavigate, Link } from "react-router";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { removeItem } from "../utils/localStorage";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser, cartItems } = useGlobalContext();

  // move function to services
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to logout');

      // If response is ok:
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
      {user ?
        <button onClick={handleLogout}>Logout</button> :
        <button onClick={() => navigate('/login')}><FaRegUser size={24} /></button>}
      <button onClick={() => navigate('/cart')}><IoCartOutline size={24} /></button>
      {cartItems.length > 0 && <span>{cartItems.length}</span>}
    </div>
  );
}
