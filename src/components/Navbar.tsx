import { useNavigate, Link } from "react-router";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { removeItem } from "../utils/localStorage";
import { logout } from "../services/authService";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser, cartItems } = useGlobalContext();

  const handleLogout = async () => {
    try {
      // Call the logout service
      const result = await logout();
      console.log(result);

      // Remove token from localStorage
      removeItem('token');

      // Clear user state and navigate to signup page
      setUser(undefined);
      navigate('/signup');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // manage logout/login dynamic buttons with user

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
