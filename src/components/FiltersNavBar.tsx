import { ShopContext } from "../context/contexts";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import { FaFilter, FaSort } from "react-icons/fa";
import { useShopContext } from "../hooks/useContext";

export default function FiltersNavBar() {
  const { setIsFiltersMenuOpen } = useShopContext();

  return (
    <div className="sticky top-[60px] my-4 flex justify-around border-2 bg-white p-1">
      <div
        className="flex items-center gap-2"
        onClick={() => setIsFiltersMenuOpen(true)}
      >
        <FaFilter className="text-xl" />
        <span>Filters</span>
      </div>

      <div className="flex items-center gap-2">
        <FaSort className="text-2xl" />
        <span>Sort by</span>
      </div>
    </div>
  );
}
