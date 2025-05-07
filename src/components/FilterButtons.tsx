import { useShopContext } from "../hooks/useContext.ts";
import TelescopeFilters from "./TelescopeFilters.tsx";

export default function FilterProducts() {
  const {
    filteredProducts,
    filterProducts,
    filterByBrand,
    selectedCategory,
    getUniqueBrands
  } = useShopContext();

  const uniqueBrands = getUniqueBrands();

  return (
    <div>
      {/* Main Category Buttons */}
      <div>
        <button onClick={() => filterProducts("telescopes")}>Telescopes</button>
        <button onClick={() => filterProducts("mounts")}>Mounts</button>
        <button onClick={() => filterProducts("eyepieces")}>Eyepieces</button>
        <button onClick={() => filterProducts("filters")}>Filters</button>
      </div>

      {uniqueBrands.length > 0 && (
        <div>
          <h3>Brands</h3>
          {uniqueBrands.map((brand) => (
            <button key={brand} onClick={() => filterByBrand(brand)}>
              {brand}
            </button>
          ))}
        </div>
      )}

      {selectedCategory === 'telescopes' && <TelescopeFilters />}
    </div>
  );
}