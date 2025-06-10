import { useProductsStore } from "../stores/productsStore";
import { useUiStore } from "../stores/uiStore";
import TelescopeFilters from "./TelescopeFilters";
import MountFilters from "./MountFilters";
import EyepieceFilters from "./EyepieceFilters";
import FilterFilters from "./FilterFilters";

export default function FiltersMenu() {
  const { selectedCategory } = useProductsStore();
  const { isFiltersMenuOpen } = useUiStore();

  // MEJORAR ALTURA DEL MENU CON SCROLL

  if (!isFiltersMenuOpen) return null;
  return (
    <div className="max-h-[70vh] overflow-y-auto rounded-xl bg-white p-6 shadow-lg inset-shadow-sm">
      {selectedCategory === "telescopes" && <TelescopeFilters />}
      {selectedCategory === "mounts" && <MountFilters />}
      {selectedCategory === "eyepieces" && <EyepieceFilters />}
      {selectedCategory === "filters" && <FilterFilters />}
    </div>
  );
}
