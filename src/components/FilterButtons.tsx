import { useState } from "react";
import { useShopContext } from "../hooks/useContext.ts";
import TelescopeFilters from "./TelescopeFilters.tsx";
import MountFilters from "./MountFilters.tsx";
import EyepieceFilters from "./EyepieceFilters.tsx";
import FilterFilters from "./FilterFilters.tsx";

export default function FilterProducts() {
  const { filterProducts, selectedCategory, setSelectedCategory } =
    useShopContext();
  const [showCategoriesMobile, setShowCategoriesMobile] =
    useState<boolean>(false);
  const [showSubCategories, setShowSubCategories] = useState<boolean>(false);
  const productTypes: string[] = [
    "telescopes",
    "mounts",
    "eyepieces",
    "filters",
  ];

  const handleCategoryClick = (type: string) => {
    if (selectedCategory !== type) {
      setSelectedCategory(type);
      filterProducts(type.toLocaleLowerCase());
      // Go to the top when changing category
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setSelectedCategory(null);
      setShowSubCategories(false);
      filterProducts("products");
      // Go to the top when desactivate the category 
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setShowCategoriesMobile(false);
  };

  const handleSubCategorieClick = () => {
    setShowSubCategories(!showSubCategories);
  };

  return (
    <div className="font-zen sticky top-[80px] text-xs">
      <div className="flex flex-col">
        <button
          className={`cursor-pointer rounded-full bg-gray-400 p-1 text-xs ${showCategoriesMobile ? "bg-gray-500" : ""}`}
          onClick={() => setShowCategoriesMobile(!showCategoriesMobile)}
        >
          {showCategoriesMobile ? "HIDE CATEGORIES" : "CATEGORIES"}
        </button>
        {/* Main Category Buttons */}
        {showCategoriesMobile && (
          <div className="flex flex-col rounded-xl bg-gray-200">
            {productTypes.map((type) => (
              <button
                key={type}
                className={`mx-1 my-1 cursor-pointer rounded-full p-1 ${selectedCategory === type ? "bg-gray-400" : "bg-gray-300"}`}
                onClick={() => handleCategoryClick(type)}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        )}
        {selectedCategory !== "products" && (
          <button
            className={`cursor-pointer rounded-full bg-gray-400 p-1 ${showSubCategories ? "bg-gray-500" : ""}`}
            onClick={() => handleSubCategorieClick()}
          >
            {selectedCategory?.toUpperCase()} CATEGORIES
          </button>
        )}
      </div>

      {/* Sub Category Buttons by Selected Category */}
      {showSubCategories && (
        <div className="rounded-xl bg-gray-200 p-1">
          {selectedCategory === "telescopes" && <TelescopeFilters />}
          {selectedCategory === "mounts" && <MountFilters />}
          {selectedCategory === "eyepieces" && <EyepieceFilters />}
          {selectedCategory === "filters" && <FilterFilters />}
        </div>
      )}
    </div>
  );
}
