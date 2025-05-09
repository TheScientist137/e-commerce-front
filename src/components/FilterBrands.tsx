import { useShopContext } from "../hooks/useContext"
import { TelescopeType } from "../types/types";

export default function FilterBrands() {
  const {
    filteredProducts,
    updateTelescopesFilter,
    telescopeFilters
  } = useShopContext();

  // Obtain telescopes brands
  const brands = Array.from(new Set(filteredProducts.map((product) => (product as TelescopeType).brand)));

  return (
    <div>
      {brands.map((brand) => (
        <div key={brand}>
          <button onClick={() => updateTelescopesFilter(
            'brand',
            telescopeFilters.brand === brand ? null : brand
          )}>
            {brand}
          </button>
        </div>
      ))}
    </div>
  )
}