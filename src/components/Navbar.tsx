import { useNavigate, Link } from "react-router";
import { useProductsStore } from "../stores/productsStore";
import { useCartStore } from "../stores/cartStore";
import { useUiStore } from "../stores/uiStore";
import { FaAlignJustify } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function Navbar() {
  const navigate = useNavigate();
  const { filterProductsByCategory } = useProductsStore();
  const { cartItems } = useCartStore();
  const { isMenuOpen, darkMode, setIsMenuOpen, setDarkMode } = useUiStore();

  const handleTitleClick = () => {
    filterProductsByCategory("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Hamburger Categories Menu */}
      <button
        className="transition-transform md:hover:scale-110"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FaAlignJustify className="cursor-pointer text-xl md:text-2xl" />
      </button>

      {/* Title / Logo */}
      <h1 className="font-orbitron px-2 text-2xl font-bold md:text-3xl lg:text-4xl">
        <Link to="/" onClick={() => handleTitleClick()}>
          StellarScope
        </Link>
      </h1>

      {/* Actions - Dark Mode Toggle / Shopping Cart Link */}
      <div className="flex gap-3 md:gap-4 lg:gap-6">
        {/* Dark Mode Toggle */}
        <button
          className="cursor-pointer transition-transform md:hover:scale-110"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <MdLightMode className="text-xl md:text-2xl" />
          ) : (
            <MdDarkMode className="text-xl md:text-2xl" />
          )}
        </button>
        {/* Shopping Cart Link */}
        <button
          onClick={() => navigate("/cart")}
          className="flex cursor-pointer items-center transition-transform md:hover:scale-110"
        >
          <FaCartShopping className="text-xl md:text-2xl" />
          {cartItems.length > 0 && (
            // Display cart item count
            <span className="relative bottom-2 left-1 text-lg font-semibold md:text-xl">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>
    </>
  );
}
