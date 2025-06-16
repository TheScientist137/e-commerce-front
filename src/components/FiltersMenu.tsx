import { useEffect } from "react";
import { useUiStore } from "../stores/uiStore";
import FiltersMenuModal from "./FilterMenuModal";
import Filters from "./Filters";

export default function FiltersMenu() {
  const {
    isFiltersMenuOpen,
    setIsFiltersMenuOpen,
    setOpenTelescopeFilters,
    setOpenMountFilters,
    setOpenEyepieceFilters,
    setOpenFilterFilters,
  } = useUiStore();

  // Close subfilters menus when closing Filters Menu
  useEffect(() => {
    if (!isFiltersMenuOpen) {
      setOpenTelescopeFilters("isOpticalDesignFiltersOpen", false);
      setOpenTelescopeFilters("isMountTypeFiltersOpen", false);
      setOpenTelescopeFilters("isBrandFiltersOpen", false);

      setOpenMountFilters("isMountTypeFiltersOpen", false);
      setOpenMountFilters("isBrandFiltersOpen", false);

      setOpenEyepieceFilters("isBuildTypeFiltersOpen", false);
      setOpenEyepieceFilters("isBrandFiltersOpen", false);

      setOpenFilterFilters("isBuildTypeFiltersOpen", false);
      setOpenFilterFilters("isBrandFiltersOpen", false);
    }
  }, [isFiltersMenuOpen]);

  return (
    <FiltersMenuModal
      title="Filters"
      isOpen={isFiltersMenuOpen}
      onClose={() => setIsFiltersMenuOpen(false)}
    >
      <Filters />
    </FiltersMenuModal>
  );
}
