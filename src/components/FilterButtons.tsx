import { useShopContext } from "../hooks/useContext.ts";
import TelescopeFilters from "./TelescopeFilters.tsx";
import MountFilters from "./MountFilters.tsx";
import EyepieceFilters from "./EyepieceFilters.tsx";
import FilterFilters from "./FilterFilters.tsx";

export default function FilterProducts() {
  const { filterProducts, selectedCategory } = useShopContext();

  return (
    <div>
      {/* Main Category Buttons */}
      <div>
        <button onClick={() => filterProducts("telescopes")}>Telescopes</button>
        <button onClick={() => filterProducts("mounts")}>Mounts</button>
        <button onClick={() => filterProducts("eyepieces")}>Eyepieces</button>
        <button onClick={() => filterProducts("filters")}>Filters</button>
      </div>

      {selectedCategory === 'telescopes' && <TelescopeFilters />}
      {selectedCategory === 'mounts' && <MountFilters />}
      {selectedCategory === 'eyepieces' && <EyepieceFilters />}
      {selectedCategory === 'filters' && <FilterFilters />}
    </div>
  );
}