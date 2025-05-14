import { useEffect } from "react";
import { useShopContext } from "../hooks/useContext";
import { MountType } from "../types/types";

export default function MountFilters() {
  const {
    filteredProducts,
    mountFilters,
    applyFiltersForMounts,
    updateMountsFilter,
  } = useShopContext();

  const mountingTypes = Array.from(
    new Set(
      filteredProducts.map(
        (product) => (product as MountType).mountData.mount_type
      )
    )
  );
  const mountBrands = Array.from(
    new Set(filteredProducts.map((product) => (product as MountType).brand))
  );

  useEffect(() => {
    applyFiltersForMounts();
  }, [mountFilters]);

  return (
    <>
      <div>
        <h4>MOUNTING TYPE</h4>
        {mountingTypes.length === 1 ? (
          <span>
            {mountingTypes[0]}
            {mountFilters.mountingType === mountingTypes[0] && (
              <button onClick={() => updateMountsFilter("mountingType", null)}>
                x
              </button>
            )}
          </span>
        ) : (
          mountingTypes.map((type) =>
            mountFilters.mountingType === type ? (
              <span key={type}>
                {type}
                <button
                  onClick={() => updateMountsFilter("mountingType", null)}
                >
                  x
                </button>
              </span>
            ) : (
              <button
                key={type}
                onClick={() => updateMountsFilter("mountingType", type)}
              >
                {type}
              </button>
            )
          )
        )}
      </div>

      {/* Brands Filter */}
      <div>
        <h4>Brands</h4>
        {mountBrands.length === 1 ? (
          <span>
            {mountBrands[0]}
            {mountFilters.brand === mountBrands[0] && (
              <button onClick={() => updateMountsFilter("brand", null)}>
                x
              </button>
            )}
          </span>
        ) : (
          mountBrands.map((brand) =>
            mountFilters.brand === brand ? (
              <span key={brand}>
                {brand}
                <button onClick={() => updateMountsFilter("brand", null)}>
                  x
                </button>
              </span>
            ) : (
              <button
                key={brand}
                onClick={() => updateMountsFilter("brand", brand)}
              >
                {brand}
              </button>
            )
          )
        )}
      </div>
    </>
  );
}
