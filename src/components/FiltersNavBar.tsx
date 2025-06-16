import { useUiStore } from "../stores/uiStore";
import { FaSort } from "react-icons/fa";
import { IoIosOptions } from "react-icons/io";

export default function FiltersNavBar() {
  const { setIsFiltersMenuOpen, setIsSortMenuOpen } = useUiStore();

  return (
    <div className="flex gap-6 rounded-xl bg-slate-100 p-4 dark:bg-gray-800">
      <div
        className="flex items-center gap-1"
        onClick={() => setIsFiltersMenuOpen(true)}
      >
        <IoIosOptions className="text-2xl" />
        <span className="">Filters</span>
      </div>

      <div
        className="flex items-center gap-1"
        onClick={() => setIsSortMenuOpen(true)}
      >
        <FaSort className="text-xl" />
        <span className="">Sort by</span>
      </div>
    </div>
  );
}
