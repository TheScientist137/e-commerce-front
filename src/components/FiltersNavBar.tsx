import { useUiStore } from "../stores/uiStore";
import { FiGrid } from "react-icons/fi";

import { FaFilter, FaSort } from "react-icons/fa";

export default function FiltersNavBar() {
  const {
    isFiltersMenuOpen,
    isSortMenuOpen,
    setIsFiltersMenuOpen,
    setIsSortMenuOpen,
  } = useUiStore();

  const handleOpenFiltersMenu = () => {
    setIsFiltersMenuOpen(!isFiltersMenuOpen);
    if (!isFiltersMenuOpen && isSortMenuOpen) {
      setIsSortMenuOpen(false);
    }
  }

  const handleOpenSortByMenu = () => {
    setIsSortMenuOpen(!isSortMenuOpen);
    if (!isSortMenuOpen && isFiltersMenuOpen) {
      setIsFiltersMenuOpen(false);
    }
  }

  return (
    <div className="my-4 flex justify-around rounded-xl border border-gray-500 bg-white p-1">
      <div
        className="flex items-center gap-1"
        onClick={() => handleOpenFiltersMenu()}
      >
        <FaFilter className="text-lg" />
        <span className="text-sm text-gray-500">Filters</span>
      </div>

      <div
        className="flex items-center gap-1"
        onClick={() => handleOpenSortByMenu()}
      >
        <FaSort className="text-xl" />
        <span className="text-sm text-gray-500">Sort by</span>
      </div>
    </div>
  );
}
