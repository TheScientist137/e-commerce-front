import { useState } from "react";
import { FaPlus, FaMinus, FaTimes, FaArrowRight } from "react-icons/fa";
import { useProductsStore } from "../stores/productsStore";
import { useUiStore } from "../stores/uiStore";
import { MountType } from "../types/types";

export default function MountFilters() {
  const { filteredProducts, mountFilters, filterProductsBySubCategory } =
    useProductsStore();
  const { setIsFiltersMenuOpen } = useUiStore();
  const [openMountingTypes, setOpenMountingTypes] = useState<boolean>(false);
  const [openBrands, setOpenBrands] = useState<boolean>(false);

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

  const handleMountingTypeFilter = (mountType: string | null) => {
    filterProductsBySubCategory("mounts", { ...mountFilters, mountType });
    setIsFiltersMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleBrandFilter = (brand: string | null) => {
    filterProductsBySubCategory("mounts", { ...mountFilters, brand });
    setIsFiltersMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col">
      {/* Mounting Types Filters */}
      <div className="border-t-1 border-t-gray-400 py-2">
        <div
          className="flex items-center justify-between"
          onClick={() => setOpenMountingTypes(!openMountingTypes)}
        >
          <h4 className="text-xl font-medium">Mounting Types</h4>
          <span>{openMountingTypes ? <FaMinus /> : <FaPlus />}</span>
        </div>

        {openMountingTypes && (
          <div className="ml-4 py-2">
            {mountFilters.mountType ? (
              <div
                className="flex items-center text-lg"
                onClick={() => handleMountingTypeFilter(null)}
              >
                {mountFilters.mountType}
                <span className="ml-2 text-red-700">
                  <FaTimes />
                </span>
              </div>
            ) : (
              <div className="flex flex-col text-lg">
                {mountingTypes.length === 1 ? (
                  <div className="text-gray-500">{mountingTypes[0]}</div>
                ) : (
                  mountingTypes.map((mountType) => (
                    <div
                      key={mountType}
                      onClick={() => handleMountingTypeFilter(mountType)}
                      className="flex cursor-pointer items-center"
                    >
                      <span className="mr-2">
                        <FaArrowRight />
                      </span>
                      {mountType}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {/* Brands Filters */}
      <div className="border-t-1 border-t-gray-400 pt-2">
        <div
          className="flex items-center justify-between"
          onClick={() => setOpenBrands(!openBrands)}
        >
          <h4 className="text-xl font-medium">Brands</h4>
          <span>{openBrands ? <FaMinus /> : <FaPlus />}</span>
        </div>

        {openBrands && (
          <div className="ml-4 py-2">
            {mountFilters.brand ? (
              <div
                className="flex items-center text-lg"
                onClick={() => handleBrandFilter(null)}
              >
                {mountFilters.brand}
                <span className="ml-2 text-red-700">
                  <FaTimes />
                </span>
              </div>
            ) : (
              <div className="flex flex-col text-lg">
                {mountBrands.length === 1 ? (
                  <div className="text-gray-500">{mountBrands[0]}</div>
                ) : (
                  mountBrands.map((brand) => (
                    <div
                      key={brand}
                      onClick={() => handleBrandFilter(brand)}
                      className="flex cursor-pointer items-center"
                    >
                      <span className="mr-2">
                        <FaArrowRight />
                      </span>
                      {brand}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
