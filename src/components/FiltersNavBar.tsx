import { useUiStore } from "../stores/uiStore";
import { FiGrid } from "react-icons/fi";

import { FaFilter, FaSort } from "react-icons/fa";

export default function FiltersNavBar() {
  const { setIsFiltersMenuOpen, setIsSortMenuOpen } = useUiStore();

  return (
    <div className="sticky top-20 my-4 flex justify-around rounded-xl border bg-white p-1">
      <div
        className="flex items-center gap-1"
        onClick={() => setIsFiltersMenuOpen(true)}
      >
        <FaFilter className="text-lg" />
        <span className="text-sm text-gray-500">Filter</span>
      </div>

      <div
        className="flex items-center gap-1"
        onClick={() => setIsSortMenuOpen(true)}
      >
        <FaSort className="text-xl" />
        <span className="text-sm text-gray-500">Sort by</span>
      </div>

      <button>
        <FiGrid className="text-xl" />
      </button>
    </div>
  );
}
