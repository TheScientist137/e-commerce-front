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
  const { setIsLoginModalOpen, setIsSignupModalOpen } = useUiStore();
  const categories: string[] = ["TELESCOPES", "MOUNTS", "EYEPIECES", "FILTERS"];

  const handleCategoryClick = (category: string) => {
    navigate("/shop");
    filterProductsByCategory(category);
  };

  return (
    <section className="flex h-full flex-col text-center">
      <div className="my-12 flex flex-col">
        <h1 className="text-4xl">Welcome!</h1>
        <p className="text-xl"> Discover the best astronomy equipment!</p>
      </div>

      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-6 rounded-xl border p-2"
        >
          BROWSE PRODUCTS
        </button>

        <div className={`${!isOpen ? "hidden" : ""} mb-6 flex flex-col gap-2`}>
          {categories.map((category) => (
            <div
              className="rounded-xl border"
              key={category}
              onClick={() => handleCategoryClick(category.toLowerCase())}
            >
              <p>{category}</p>
              <span>image</span>
            </div>
          ))}
        </div>
      </div>

      {user ? (
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="">
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="rounded-xl border p-2"
          >
            LOGIN
          </button>
          <div className="text-sm">
            <p>Still do not have an account?</p>
            <span
              onClick={() => setIsSignupModalOpen(true)}
              className="ml-2 text-purple-600 underline"
            >
              Signup
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
