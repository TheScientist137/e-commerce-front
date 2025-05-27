import { useState } from "react";
import { FaPlus, FaMinus, FaTimes, FaArrowRight } from "react-icons/fa";
import { useProductsStore } from "../stores/productsStore";
import { useUiStore } from "../stores/uiStore";
import { FilterType } from "../types/types";

export default function FilterFilters() {
  const { filteredProducts, filterFilters, filterProductsBySubCategory } =
    useProductsStore();
  const { setIsFiltersMenuOpen } = useUiStore();
  const [openBuildTypes, setOpenBuildTypes] = useState<boolean>(false);
  const [openBrands, setOpenBrands] = useState<boolean>(false);

  const buildTypes = Array.from(
    new Set(
      filteredProducts.map(
        (product) => (product as FilterType).filterData.filter_type,
      ),
    ),
  );
  const filterBrands = Array.from(
    new Set(filteredProducts.map((product) => (product as FilterType).brand)),
  );

  const handleBuildTypeFilter = (buildType: string | null) => {
    filterProductsBySubCategory("filters", { ...filterFilters, buildType });
    setIsFiltersMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleBrandFilter = (brand: string | null) => {
    filterProductsBySubCategory("filters", { ...filterFilters, brand });
    setIsFiltersMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col">
      {/* Build Types Filters */}
      <div className="border-t-1 border-t-gray-400 py-2">
        <div
          className="flex items-center justify-between"
          onClick={() => setOpenBuildTypes(!openBuildTypes)}
        >
          <h4 className="text-xl font-medium">Type of Build</h4>
          <span>{openBuildTypes ? <FaMinus /> : <FaPlus />}</span>
        </div>

        {openBuildTypes && (
          <div className="ml-4 py-2">
            {filterFilters.buildType ? (
              <div
                className="flex items-center text-lg"
                onClick={() => handleBuildTypeFilter(null)}
              >
                {filterFilters.buildType}
                <span className="ml-2 text-red-700">
                  <FaTimes />
                </span>
              </div>
            ) : (
              <div className="flex flex-col text-lg">
                {buildTypes.length === 1 ? (
                  <div className="text-gray-500">{buildTypes[0]}</div>
                ) : (
                  buildTypes.map((type) => (
                    <div
                      key={type}
                      onClick={() => handleBuildTypeFilter(type)}
                      className="flex cursor-pointer items-center"
                    >
                      <span className="mr-2">
                        <FaArrowRight />
                      </span>
                      {type}
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
            {filterFilters.brand ? (
              <div
                className="flex items-center text-lg"
                onClick={() => handleBrandFilter(null)}
              >
                {filterFilters.brand}
                <span className="ml-2 text-red-700">
                  <FaTimes />
                </span>
              </div>
            ) : (
              <div className="flex flex-col text-lg">
                {filterBrands.length === 1 ? (
                  <div className="text-gray-500">{filterBrands[0]}</div>
                ) : (
                  filterBrands.map((brand) => (
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
