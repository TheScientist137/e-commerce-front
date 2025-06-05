import { useNavigate, Link } from "react-router";
import { useAuthContext } from "../hooks/useContext";

import { useProductsStore } from "../stores/productsStore";
import { useCartStore } from "../stores/cartStore";
import { useUiStore } from "../stores/uiStore";

import { FaSun, FaAlignJustify, FaUserAstronaut } from "react-icons/fa";
import { RiLogoutCircleFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAdmin, user, logout } = useAuthContext();
  const { filterProductsByCategory } = useProductsStore();
  const { cartItems } = useCartStore();
  const { setIsMenuOpen,isMenuOpen, setIsLoginModalOpen, darkMode, setDarkMode } =
    useUiStore();

  const handleTitleClick = () => {
    filterProductsByCategory("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex w-full justify-between items-center">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FaAlignJustify className="text-xl" />
      </button>

      <h1 className="font-orbitron px-2 text-xl font-bold">
        <Link to="/" onClick={() => handleTitleClick()}>
          StellarScope
        </Link>
      </h1>

      <div className="flex gap-2">
        {user ? (
          <button onClick={logout} title="Logout">
            <RiLogoutCircleFill className="text-xl" />
          </button>
        ) : (
          <button onClick={() => setIsLoginModalOpen(true)} title="Login">
            <FaUserAstronaut className="text-xl" />
          </button>
        )}

        <button onClick={() => navigate("/cart")} className="cursor-pointer">
          <FaCartShopping className="text-xl" />
        </button>
        {cartItems.length > 0 && (
          <span className="text-lg font-black">{cartItems.length}</span>
        )}

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
        </button>
      </div>
    </div>
  );
}
