import { useNavigate } from "react-router";
import { useProductsStore } from "../stores/productsStore";
import { useUiStore } from "../stores/uiStore";
import { IoClose } from "react-icons/io5";

export default function CategoriesMenu() {
  const navigate = useNavigate();
  const { filterProductsByCategory } = useProductsStore();
  const { isMenuOpen, setIsMenuOpen, setIsFiltersMenuOpen, setIsSortMenuOpen } =
    useUiStore();
  const categories: string[] = ["TELESCOPES", "MOUNTS", "EYEPIECES", "FILTERS"];

  const handleCategoryClick = (category: string) => {
    navigate("/shop"); // Navigate to shop page in case user is in another page and filter products by category
    filterProductsByCategory(category.toLowerCase());

    setIsMenuOpen(false); // Close menu and go to the top
    setIsFiltersMenuOpen(false);
    setIsSortMenuOpen(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isMenuOpen) return null;
  return (
    <div className="fixed top-0 bottom-0 left-0 z-50 w-[70%] bg-white dark:bg-slate-800 p-4 shadow-lg">
      <div className="mb-6 flex w-full justify-between">
        <h2 className="font-zen text-xl">Categories</h2>
        <button className="" onClick={() => setIsMenuOpen(false)}>
          <IoClose className="self-center text-2xl" />
        </button>
      </div>

      <div className="">
        <nav className="font-zen">
          <ul>
            {categories.map((category) => (
              <li key={category} className="mb-4">
                <button
                  onClick={() => handleCategoryClick(category.toLowerCase())}
                  className=""
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
