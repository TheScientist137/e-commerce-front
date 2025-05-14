import { useEffect } from "react";
import { useShopContext } from "../hooks/useContext";
import { FilterType } from "../types/types";

export default function FilterFilters() {
  const {
    filteredProducts,
    filterFilters,
    applyFiltersForFilters,
    updateFiltersFilter,
  } = useShopContext();

  const applicationAreas = Array.from(
    new Set(
      filteredProducts.map(
        (product) => (product as FilterType).filterData.filter_type
      )
    )
  );
  const filterBrands = Array.from(
    new Set(filteredProducts.map((product) => (product as FilterType).brand))
  );

  useEffect(() => {
    applyFiltersForFilters();
  }, [filterFilters]);

  return (
    <>
      <div>
        <h4>AREA OF APPLICATION</h4>
        {applicationAreas.length === 1 ? (
          <span>
            {applicationAreas[0]}
            {filterFilters.applicationArea === applicationAreas[0] && (
              <button
                onClick={() => updateFiltersFilter("applicationArea", null)}
              >
                x
              </button>
            )}
          </span>
        ) : (
          applicationAreas.map((area) =>
            filterFilters.applicationArea === area ? (
              <span key={area}>
                {area}
                <button
                  onClick={() => updateFiltersFilter("applicationArea", null)}
                >
                  x
                </button>
              </span>
            ) : (
              <button
                key={area}
                onClick={() => updateFiltersFilter("applicationArea", area)}
              >
                {area}
              </button>
            )
          )
        )}
      </div>
      <div>
        <h4>BRANDS</h4>
        {filterBrands.length === 1 ? (
          <span>
            {filterBrands[0]}
            {filterFilters.brand === filterBrands[0] && (
              <button onClick={() => updateFiltersFilter("brand", null)}>
                x
              </button>
            )}
          </span>
        ) : (
          filterBrands.map((brand) =>
            filterFilters.brand === brand ? (
              <span key={brand}>
                {brand}
                <button onClick={() => updateFiltersFilter("brand", null)}>
                  x
                </button>
              </span>
            ) : (
              <button
                key={brand}
                onClick={() => updateFiltersFilter("brand", brand)}
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
