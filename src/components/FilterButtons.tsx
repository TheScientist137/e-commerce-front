import { useState } from "react";
import { useShopContext } from "../hooks/useContext.ts";
import TelescopeFilters from "./TelescopeFilters.tsx";
import MountFilters from "./MountFilters.tsx";
import EyepieceFilters from "./EyepieceFilters.tsx";
import FilterFilters from "./FilterFilters.tsx";

export default function FilterProducts() {
  const { filterProducts, selectedCategory } = useShopContext();
  const [showCategoriesMobile, setShowCategoriesMobile] =
    useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<string | null>(null);
  const productTypes: string[] = [
    "TELESCOPES",
    "MOUNTS",
    "EYEPIECES",
    "FILTERS",
  ];

  const handleCategoryClick = (type: string) => {
    if (isSelected === null) {
      setIsSelected(type);
      filterProducts(type.toLocaleLowerCase());
    } else {
      setIsSelected(null);
      filterProducts("products");
    }
    setShowCategoriesMobile(false);
  };

  return (
    <div>
      <div className="flex flex-col">
        <button
          className={`font-zen mx-1 my-2 cursor-pointer rounded-full bg-gray-400 p-1 text-xs ${showCategoriesMobile ? "bg-gray-500" : ""}`}
          onClick={() => setShowCategoriesMobile(!showCategoriesMobile)}
        >
          {showCategoriesMobile ? "HIDE CATEGORIES" : "CATEGORIES"}
        </button>
        {/* Main Category Buttons */}
        <div
          className={`flex flex-col overflow-hidden rounded-xl bg-gray-200 ${showCategoriesMobile ? "max-h-screen p-2" : "max-h-0 p-0"}`}
        >
          {productTypes.map((type) => (
            <button
              key={type}
              className={`font-zen mx-1 my-1 cursor-pointer rounded-full p-1 text-xs ${isSelected === type ? "bg-gray-400" : "bg-gray-300"}`}
              onClick={() => handleCategoryClick(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Sub Category Buttons by Selected Category */}
      {selectedCategory === "telescopes" && <TelescopeFilters />}
      {selectedCategory === "mounts" && <MountFilters />}
      {selectedCategory === "eyepieces" && <EyepieceFilters />}
      {selectedCategory === "filters" && <FilterFilters />}
    </div>
  );
}
