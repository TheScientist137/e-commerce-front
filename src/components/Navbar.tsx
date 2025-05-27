import { useNavigate, Link } from "react-router";
import { useAuthContext } from "../hooks/useContext";

import { useProductsStore } from "../stores/productsStore";
import { useCartStore } from "../stores/cartStore";
import { useUiStore } from "../stores/uiStore";

import {
  FaShoppingCart,
  FaAlignJustify,
  FaUserAstronaut,
} from "react-icons/fa";
import { RiLogoutCircleFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAdmin, user, logout } = useAuthContext();
  const { filterProductsByCategory } = useProductsStore();
  const { cartItems } = useCartStore();
  const { setIsMenuOpen, setIsLoginModalOpen } = useUiStore();

  const handleTitleClick = () => {
    filterProductsByCategory("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  console.log(user);
  return (
    <div className="flex content-center justify-between">
      <button onClick={() => setIsMenuOpen(true)}>
        <FaAlignJustify className="text-xl" />
      </button>

      <h1 className="font-zen mx-2 text-lg">
        <Link to="/" onClick={() => handleTitleClick()}>
          TelescopEcommerce
        </Link>
      </h1>

      {user ? (
        <button onClick={logout} title="Logout">
          <RiLogoutCircleFill className="text-xl" />
        </button>
      ) : (
        <button onClick={() => setIsLoginModalOpen(true)} title="Login">
          <FaUserAstronaut className="text-xl" />
        </button>
      )}

      <div className="flex justify-center">
        <button onClick={() => navigate("/cart")} className="cursor-pointer">
          <FaCartShopping className="text-xl" />
        </button>
        {cartItems.length > 0 && (
          <span className="text-lg font-black">{cartItems.length}</span>
        )}
      </div>
    </div>
  );
}
