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
        (product) => (product as FilterType).filterData.filter_type,
      ),
    ),
  );
  const filterBrands = Array.from(
    new Set(filteredProducts.map((product) => (product as FilterType).brand)),
  );

  useEffect(() => {
    applyFiltersForFilters();
  }, [filterFilters]);

  return <></>;
}
