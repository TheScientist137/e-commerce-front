import { useNavigate } from "react-router";

import { useAuthContext } from "../hooks/useContext";
import { useProductsStore } from "../stores/productsStore";
import { useUiStore } from "../stores/uiStore";

import { RiLogoutCircleFill } from "react-icons/ri";
import { FaUserAstronaut } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export default function CategoriesMenu() {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
  const { filterProductsByCategory, selectedCategory } = useProductsStore();
  const { isMenuOpen, setIsMenuOpen, setIsLoginModalOpen } = useUiStore();

  const CATEGORIES = ["Telescopes", "Mounts", "Eyepieces", "Filters"];

  const handleCategoryClick = (category: string) => {
    navigate("/shop");
    filterProductsByCategory(category);
    // Espera 200ms antes de cerrar menu al seleccioanr categoria
    setTimeout(() => setIsMenuOpen(false), 200);
    // Go to the top when changing category
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoginClick = () => {
    setIsMenuOpen(false);
    setIsLoginModalOpen(true);
  };

  if (!isMenuOpen) return null;
  return (
    <>
      {/* Blur Backdrop */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-40 backdrop-blur-sm"
        />
      )}

      {/* Slide in-out fixed menu */}
      <div
        className={`fixed z-50 flex h-full w-[70%] flex-col border-r-4 border-violet-100 bg-white transition-transform duration-300 ease-in-out dark:border-black dark:bg-gray-950 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Login with close menu button */}
        <div className="flex justify-between border-b-4 border-violet-100 bg-slate-100 p-4 dark:border-black dark:bg-gray-800">
          {user ? (
            <button onClick={logout} title="Logout">
              <RiLogoutCircleFill className="text-xl" />
            </button>
          ) : (
            <button
              className="flex items-center gap-2"
              onClick={() => handleLoginClick()}
              title="Login"
            >
              <FaUserAstronaut className="text-xl" />
              <span className="font-space text-base font-semibold">Login</span>
            </button>
          )}
          <button onClick={() => setIsMenuOpen(false)}>
            <IoClose className="size-6" />
          </button>
        </div>

        {/* Categories navbar */}
        <nav className="">
          <ul className="">
            {CATEGORIES.map((category) => (
              <li
                key={category}
                className={`font-orbitron flex h-16 items-center pl-4 text-lg font-bold ${
                  selectedCategory &&
                  selectedCategory === category.toLowerCase() &&
                  "bg-slate-50 dark:bg-gray-800"
                }`}
                onClick={() => handleCategoryClick(category.toLowerCase())}
              >
                {category}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
