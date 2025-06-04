import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useContext";
import { useProductsStore } from "../stores/productsStore";
import { useUiStore } from "../stores/uiStore";

export default function HomePage() {
  const { user, logout } = useAuthContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { filterProductsByCategory } = useProductsStore();
  const {
    setIsLoginModalOpen,
    setIsSignupModalOpen,
    setIsFiltersMenuOpen,
    setIsSortMenuOpen,
  } = useUiStore();
  const categories: string[] = ["TELESCOPES", "MOUNTS", "EYEPIECES", "FILTERS"];

  const handleCategoryClick = (category: string) => {
    navigate("/shop");
    filterProductsByCategory(category);
    setIsFiltersMenuOpen(false);
    setIsSortMenuOpen(false);
  };

  return (
    <section className="flex h-full flex-col text-center">
      <div className="my-12 flex flex-col">
        <h1 className="font-zen text-4xl">Welcome!</h1>
        <p className="text-xl"> Discover the best astronomy equipment!</p>
      </div>

      {/* Browse Products */}
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-6 rounded-xl border-2 p-2 font-semibold"
        >
          BROWSE PRODUCTS
        </button>
        {/* Categories buttons */}
        <div className={`${!isOpen ? "hidden" : ""} mb-6 flex flex-col gap-2`}>
          {categories.map((category) => (
            <div
              className="flex flex-col items-center rounded-xl border py-2"
              key={category}
              onClick={() => handleCategoryClick(category.toLowerCase())}
            >
              <p className="font-zen">{category}</p>
              {/*<img src={`/categories/${category.toLowerCase()}.png`} alt={category} className="h-24 w-auto" /> */}
            </div>
          ))}
        </div>
      </div>

      {/* Authentication */}
      {user ? (
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="">
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="mb-2 rounded-xl border-2 p-2 font-semibold"
          >
            LOGIN
          </button>
          <div className="text-sm">
            <p className="text-base">Still do not have an account?</p>
            <span
              onClick={() => setIsSignupModalOpen(true)}
              className="ml-2 text-base text-purple-600 underline"
            >
              Signup
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
