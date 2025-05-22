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
        (product) => (product as MountType).mountData.mount_type,
      ),
    ),
  );
  const mountBrands = Array.from(
    new Set(filteredProducts.map((product) => (product as MountType).brand)),
  );

  useEffect(() => {
    applyFiltersForMounts();
  }, [mountFilters]);

  return <></>;
}
