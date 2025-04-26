import { useNavigate } from "react-router";
import { useAuthContext, useShopContext } from "../hooks/useContext";
import { logoutService } from "../services/authService";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const { cartItems } = useShopContext();
  const { user, logout, isAdmin } = useAuthContext();

  // mover logout logic a auth context ???
  const handleLogout = async () => {
    try {
      await logoutService();
      logout(); // Remove token and clear user info
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="nav-container">
      {user !== null ?
        <button onClick={handleLogout}>Logout</button> :
        <button onClick={() => navigate('/login')}><FaRegUser size={24} /></button>}

      <button onClick={() => navigate('/cart')}><IoCartOutline size={24} /></button>
      {cartItems.length > 0 && <span>{cartItems.length}</span>}

      {isAdmin ? <button onClick={() => navigate('/admin')}>Admin Panel</button> : null}

    </div>
  );
}
