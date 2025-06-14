import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useProductsStore } from "../stores/productsStore";
import { useCartStore } from "../stores/cartStore";
import { useUiStore } from "../stores/uiStore";
import { FaAlignJustify } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function Navbar() {
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const navigate = useNavigate();
  const { filterProductsByCategory } = useProductsStore();
  const { cartItems } = useCartStore();
  const { isMenuOpen, darkMode, setIsMenuOpen, setDarkMode } = useUiStore();

  const handleTitleClick = () => {
    filterProductsByCategory("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleDarkMode = () => {};

  return (
    <div className="flex w-full items-center justify-between">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FaAlignJustify className="cursor-pointer text-xl" />
      </button>

      <h1 className="font-orbitron px-2 text-2xl font-bold">
        <Link to="/" onClick={() => handleTitleClick()}>
          StellarScope
        </Link>
      </h1>

      <div className="flex gap-3">
        <button
          className="cursor-pointer"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <MdLightMode className="text-xl" />
          ) : (
            <MdDarkMode className="text-xl" />
          )}
        </button>
        <button
          onClick={() => navigate("/cart")}
          className="flex cursor-pointer items-center"
        >
          <FaCartShopping className="text-xl" />
          {cartItems.length > 0 && (
            <span className="relative bottom-2 text-lg font-semibold">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
