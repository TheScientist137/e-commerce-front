import { useEffect } from "react";
import { useShopContext } from "../hooks/useContext";
import { TelescopeType } from "../types/types";

export default function TelescopeFilters() {
  const {
    filteredProducts,
    telescopeFilters,
    updateTelescopesFilter,
    applyFiltersForTelescopes
  } = useShopContext();

  const opticalDesigns = Array.from(
    new Set(
      filteredProducts.map(
        (product) => (product as TelescopeType).telescopeData.optical_design
      )
    )
  );
  const mountingTypes = Array.from(
    new Set(
      filteredProducts.map(
        (product) => (product as TelescopeType).telescopeData.mount_type
      )
    )
  );
  const telescopeBrands = Array.from(
    new Set(
      filteredProducts.map(
        (product) => (product as TelescopeType).brand
      )
    )
  )

  useEffect(() => {
    applyFiltersForTelescopes();
  }, [telescopeFilters]);

  return (
    <div>
      <div>
        <h4>Optical Design</h4>
        {opticalDesigns.map((design) => (
          <button key={design} onClick={() => updateTelescopesFilter(
            "opticalDesign",
            telescopeFilters.opticalDesign === null ? design : null
          )}>
            {design}
          </button>
        ))}
      </div>
      <div>
        <h4>Mounting Type</h4>
        {mountingTypes.map((type) => (
          <button key={type} onClick={() => updateTelescopesFilter(
            "mountingType",
            telescopeFilters.mountingType === null ? type : null
          )}>
            {type}
          </button>
        ))}
      </div>
      <div>
        <h4>BRANDS</h4>
        {telescopeBrands.map((brand) => (
          <button key={brand} onClick={() => updateTelescopesFilter(
            "brand",
            telescopeFilters.brand === null ? brand : null
          )}>
            {brand}
          </button>
        ))}
      </div>
    </div>

  );
}