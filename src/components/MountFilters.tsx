import { useEffect } from "react";
import { useShopContext } from "../hooks/useContext";
import { MountType } from "../types/types";

export default function MountFilters() {
  const {
    filteredProducts,
    mountFilters,
    applyFiltersForMounts,
    updateMountsFilter
  } = useShopContext();

  const applicationAreas = Array.from(
    new Set(
      filteredProducts.map(
        (product) => (product as MountType).mountData.mount_type
      )
    )
  );
  const mountBrands = Array.from(
    new Set(
      filteredProducts.map(
        (product) => (product as MountType).brand
      )
    )
  );

  useEffect(() => {
    applyFiltersForMounts();
  }, [mountFilters]);

  return (
    <div>
      <div>
        <h4>AREA OF APPLICATION</h4>
        {applicationAreas.map((area) => (
          <button key={area} onClick={() => updateMountsFilter(
            "mountingType",
            mountFilters.mountingType === null ? area : null
          )}>
            {area}
          </button>
        ))}
      </div>
      <div>
        <h4>BRANDS</h4>
        {mountBrands.map((brand) => (
          <button key={brand} onClick={() => updateMountsFilter(
            "brand",
            mountFilters.brand === null ? brand : null
          )}>
            {brand}
          </button>
        ))}
      </div>
    </div>

  );
}