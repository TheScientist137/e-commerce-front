import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useShopContext, useAuthContext } from "../hooks/useContext";
import FilterMenu from "./FilterMenu";
import FilterCategoryButtons from "./FilterCategoryButtons";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAdmin } = useAuthContext();
  const { filterProductsByCategory, cartItems } = useShopContext();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className="flex content-center justify-center">
      <FilterMenu open={menuOpen} setIsOpen={setMenuOpen}>
        <FilterCategoryButtons closeMenu={() => setMenuOpen(false)} />
      </FilterMenu>

      <h1 className="font-zen mr-4 text-lg">
        <Link to="/" onClick={() => filterProductsByCategory("products")}>
          TelescopEcommerce
        </Link>
      </h1>

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
  );
}
