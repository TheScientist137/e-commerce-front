import { useNavigate, Link } from "react-router";
import { useAuthContext, useShopContext } from "../hooks/useContext";
import { logoutService } from "../services/authService";
import { FaUserAstronaut, FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const { filterProducts, cartItems } = useShopContext();
  const { user, logout, isAdmin } = useAuthContext();

  // mover logout logic a auth context ???
  const handleLogout = async () => {
    try {
      await logoutService();
      logout(); // Remove token and clear user info
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex content-center justify-center">
      <h1 className="font-zen mr-4 text-xl">
        <Link to="/" onClick={() => filterProducts("products")}>
          TelescopEcommerce
        </Link>
      </h1>

      <div className="flex">
        {user !== null ? (
          <button className="" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer px-1"
          >
            <FaUserAstronaut className="h-5 w-5 self-center" />
          </button>
        )}

        <button onClick={() => navigate("/cart")} className="cursor-pointer px-1">
          <FaShoppingCart className="h-5 w-5 self-center" />
        </button>
        {cartItems.length > 0 && <span>{cartItems.length}</span>}

        <div>
          {isAdmin ? (
            <button onClick={() => navigate("/admin")}>Admin Panel</button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
