import { useUiStore } from "../stores/uiStore";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import { FaFilter, FaSort } from "react-icons/fa";

export default function FiltersNavBar() {
  const { setIsFiltersMenuOpen, setIsSortMenuOpen } = useUiStore();

  return (
    <div className="sticky top-[60px] my-4 flex justify-around border-2 bg-white p-1">
      <div
        className="flex items-center gap-2"
        onClick={() => setIsFiltersMenuOpen(true)}
      >
        <FaFilter className="text-xl" />
        <span>Filters</span>
      </div>

      <div 
      className="flex items-center gap-2"
      onClick={() => setIsSortMenuOpen(true)}
      >
        <FaSort className="text-2xl" />
        <span>Sort by</span>
      </div>
    </div>
  );
}
