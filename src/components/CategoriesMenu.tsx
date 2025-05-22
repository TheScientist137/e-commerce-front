import { useEffect } from "react";
import { useNavigate } from "react-router";
import { logoutService } from "../services/authService";
import { useAuthContext, useShopContext } from "../hooks/useContext";
import { FaUserAstronaut } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function CategoriesMenu() {
  const { user, logout } = useAuthContext();
  const { filterProductsByCategory, isMenuOpen, setIsMenuOpen } =
    useShopContext();
  const navigate = useNavigate();
  const categories: string[] = ["TELESCOPES", "MOUNTS", "EYEPIECES", "FILTERS"];

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

  const handleCategoryClick = (category: string) => {
    // Navigate to products page in case user is in another page and filter by category
    navigate("/");
    filterProductsByCategory(category.toLowerCase());
    // Close menu and go to the top
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUserClick = () => {
    navigate("/login");
    setIsMenuOpen(false);
  };

  // Effect to block body scroll effect when menu is open
  useEffect(() => {
    isMenuOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");

    // Clean the effect
    // This is important to avoid scroll lock when the menu is closed
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  if (!isMenuOpen) return null;
  return (
    <div className="fixed inset-0 left-0 z-50 bg-white px-2 shadow-lg">
      <div className="mb-4 flex w-full justify-between px-4 py-2">
        <button onClick={() => handleUserClick()} className="cursor-pointer">
          <FaUserAstronaut className="text-2xl self-center" />
        </button>
        <button className="" onClick={() => setIsMenuOpen(false)}>
          <IoClose className="text-3xl self-center" />
        </button>
      </div>

      <div className="">
        <nav className="font-zen">
          <ul>
            {categories.map((category) => (
              <li key={category} className="mb-2 px-4 py-2">
                <button
                  onClick={() => handleCategoryClick(category.toLowerCase())}
                  className="text-lg"
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
