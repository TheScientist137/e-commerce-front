import { useProductsStore } from "../stores/productsStore";
import { useUiStore } from "../stores/uiStore";
import TelescopeFilters from "./TelescopeFilters";
import MountFilters from "./MountFilters";
import EyepieceFilters from "./EyepieceFilters";
import FilterFilters from "./FilterFilters";

import FiltersMenuModal from "./FilterMenuModal";

export default function FiltersMenu() {
  const { selectedCategory } = useProductsStore();
  const { isFiltersMenuOpen, setIsFiltersMenuOpen } = useUiStore();

  // MEJORAR ALTURA DEL MENU CON SCROLL

  return (
    <FiltersMenuModal
      title="Filters"
      isOpen={isFiltersMenuOpen}
      onClose={() => setIsFiltersMenuOpen(false)}
    >
        {selectedCategory === "telescopes" && <TelescopeFilters />}
        {selectedCategory === "mounts" && <MountFilters />}
        {selectedCategory === "eyepieces" && <EyepieceFilters />}
        {selectedCategory === "filters" && <FilterFilters />}
    </FiltersMenuModal>
  );
}
