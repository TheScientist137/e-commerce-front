import { useNavigate, Link } from "react-router";
import { useShopContext, useAuthContext } from "../hooks/useContext";
import { FaShoppingCart, FaAlignJustify } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAdmin } = useAuthContext();
  const { filterProductsByCategory, cartItems, setIsMenuOpen } =
    useShopContext();

  const handleTitleClick = () => {
    filterProductsByCategory("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-between">
      <button onClick={() => setIsMenuOpen(true)}>
        <FaAlignJustify className="mr-4 h-5 w-5" />
      </button>

      <h1 className="font-zen mr-4 text-lg">
        <Link to="/" onClick={() => handleTitleClick()}>
          TelescopEcommerce
        </Link>
      </h1>

      <button onClick={() => navigate("/cart")} className="cursor-pointer px-1">
        <FaShoppingCart className="h-5 w-5 self-center" />
      </button>
      {cartItems.length > 0 && <span>{cartItems.length}</span>}

      {isAdmin ? (
        <div>
          <button onClick={() => navigate("/admin")}>Admin Panel</button>
        </div>
      ) : null}
    </div>
  );
}
