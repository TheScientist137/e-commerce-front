import { useEffect } from "react";
import { useProductsStore } from "../stores/productsStore";
import { useUiStore } from "../stores/uiStore";
import { IoClose } from "react-icons/io5";
import TelescopeFilters from "./TelescopeFilters";
import MountFilters from "./MountFilters";
import EyepieceFilters from "./EyepieceFilters";
import FilterFilters from "./FilterFilters";

export default function FiltersMenu() {
  const { selectedCategory } = useProductsStore();
  const { isFiltersMenuOpen, setIsFiltersMenuOpen } = useUiStore();

  // Effect to block body scroll effect when menu is open
  useEffect(() => {
    isFiltersMenuOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");

    // Clean the effect
    // This is important to avoid scroll lock when the menu is closed
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFiltersMenuOpen]);

  if (!isFiltersMenuOpen) return null;
  return (
    <div className="fixed inset-0 z-50 m-4 overflow-y-auto bg-white p-4 shadow-lg">
      <div className="mb-4 flex w-full justify-between">
        <h3 className="text-2xl font-medium">
          {selectedCategory &&
            `${selectedCategory.charAt(0).toUpperCase()}${selectedCategory.slice(1)} Filters`}
        </h3>
        <button onClick={() => setIsFiltersMenuOpen(false)}>
          <IoClose className="self-center text-2xl" />
        </button>
      </div>

      {selectedCategory === "telescopes" && <TelescopeFilters />}
      {selectedCategory === "mounts" && <MountFilters />}
      {selectedCategory === "eyepieces" && <EyepieceFilters />}
      {selectedCategory === "filters" && <FilterFilters />}
    </div>
  );
}
