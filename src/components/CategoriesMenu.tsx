import { useNavigate } from "react-router";
import { useProductsStore } from "../stores/productsStore";
import { useUiStore } from "../stores/uiStore";
import { IoClose } from "react-icons/io5";
import logo from "../assets/Telescopios-Prismáticos-Astroshop-es-06-05-2025_07_32_PM.png";

export default function CategoriesMenu() {
  const navigate = useNavigate();
  const { filterProductsByCategory, selectedCategory } = useProductsStore();
  const { isMenuOpen, setIsMenuOpen } = useUiStore();

  const CATEGORIES = ["Telescopes", "Mounts", "Eyepieces", "Filters"];

  const handleCategoryClick = (category: string) => {
    navigate("/shop");
    filterProductsByCategory(category);
    setTimeout(() => setIsMenuOpen(false), 200); // Espera 200ms antes de cerrar menu al seleccioanr categoria
  };

  return (
    <>
      {/* Backdrop Blur */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-40 backdrop-blur-sm"
        />
      )}

      {/* Slide in-out fixed menu */}
      <div
        className={`fixed z-50 flex h-full w-[70%] flex-col bg-white transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between border-b-1 p-4">
          <button className="text-2xl font-semibold">Categories</button>
          <button onClick={() => setIsMenuOpen(false)}>
            <IoClose className="size-6" />
          </button>
        </div>

        <nav className="mt-4">
          <ul className="space-y-6">
            {CATEGORIES.map((category) => (
              <li
                className={`flex h-16 items-center pl-4 text-2xl font-bold text-gray-500 ${
                  selectedCategory &&
                  selectedCategory === category.toLowerCase() &&
                  "bg-violet-50"
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
