import { useState } from "react";
import { useNavigate } from "react-router";
import { useProductsStore } from "../stores/productsStore";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { filterProductsByCategory } = useProductsStore();
  const categories: string[] = ["TELESCOPES", "MOUNTS", "EYEPIECES", "FILTERS"];

  const handleCategoryClick = (category: string) => {
    navigate("/shop");
    filterProductsByCategory(category);
  };

  return (
    <section className="flex h-full flex-col text-center">
      <div className="my-12 flex flex-col border-1">
        <h1 className="text-4xl">Welcome!</h1>
        <p className="text-xl"> Discover the best astronomy equipment!</p>
      </div>

      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-6 rounded-lg border-1 p-2"
        >
          BROWSE PRODUCTS
        </button>

          <div className={`${!isOpen ? 'hidden' : ''} mb-6 flex flex-col gap-2`}>
            {categories.map((category) => (
              <div
                className="border-1"
                key={category}
                onClick={() => handleCategoryClick(category.toLowerCase())}
              >
                <p>{category}</p>
                <span>image</span>
              </div>
            ))}
          </div>

      </div>

      <div className="">
        <button
          onClick={() => navigate("/login")}
          className="rounded-lg border-1 p-2"
        >
          LOGIN
        </button>
        <div className="text-base">
          <p>Still do not have an account?</p>
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-600 underline"
          >
            Signup
          </span>
        </div>
      </div>
    </section>
  );
}
