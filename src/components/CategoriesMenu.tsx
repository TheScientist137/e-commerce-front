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
        className={`fixed z-50 flex h-full w-[80%] flex-col border-r-4 border-violet-100 bg-white transition-transform delay-150 duration-300 ease-in-out sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} dark:border-black dark:bg-gray-950`}
      >
        {/* Header with Login icon */}
        <div className="flex justify-between border-b-4 border-violet-100 bg-slate-100 p-4 md:p-5 lg:p-6 dark:border-black dark:bg-gray-800">
          {user ? (
            <button
              onClick={logout}
              title="Logout"
              className="transition-transform hover:scale-110"
            >
              <RiLogoutCircleFill className="text-xl md:text-2xl" />
            </button>
          ) : (
            <button
              className="flex items-center gap-2 transition-transform hover:scale-110"
              onClick={() => handleLoginClick()}
              title="Login"
            >
              <FaUserAstronaut className="text-xl md:text-2xl" />
              <span className="font-space text-base font-semibold md:text-lg">
                Login
              </span>
            </button>
          )}
          <button onClick={() => setIsMenuOpen(false)} className="transition-transform hover:scale-125">
            <IoClose className="text-xl md:text-2xl" />
          </button>
        </div>

        {/* Categories navbar */}
        <nav className="flex-grow">
          <ul className="">
            {CATEGORIES.map((category) => (
              <li
                key={category}
                className={`font-orbitron flex h-16 cursor-pointer items-center pl-4 text-lg font-bold transition-colors duration-200 hover:bg-slate-100 md:h-18 md:pl-6 md:text-xl lg:h-20 lg:text-2xl dark:hover:bg-gray-800 ${
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
