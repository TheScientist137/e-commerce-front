import { useState } from "react";
import { FaPlus, FaMinus, FaTimes, FaArrowRight } from "react-icons/fa";
import { useProductsStore } from "../stores/productsStore";
import { useUiStore } from "../stores/uiStore";
import { TelescopeType } from "../types/types";

export default function TelescopeFilters() {
  const { filteredProducts, telescopeFilters, filterProductsBySubCategory } =
    useProductsStore();
  const { setIsFiltersMenuOpen } = useUiStore();

  const [openOpticalDesigns, setOpenOpticalDesigns] = useState<boolean>(false);
  const [openMountingTypes, setOpenMountingTypes] = useState<boolean>(false);
  const [openBrands, setOpenBrands] = useState<boolean>(false);

  // Obtain dynamic options from filtered products
  const opticalDesigns = Array.from(
    new Set(
      filteredProducts.map(
        (product) => (product as TelescopeType).telescopeData.optical_design,
      ),
    ),
  );
  const mountingTypes = Array.from(
    new Set(
      filteredProducts.map(
        (product) => (product as TelescopeType).telescopeData.mount_type,
      ),
    ),
  );
  const telescopeBrands = Array.from(
    new Set(
      filteredProducts.map((product) => (product as TelescopeType).brand),
    ),
  );

  const handleOpticalDesignFilter = (opticalDesign: string | null) => {
    filterProductsBySubCategory("telescopes", {
      ...telescopeFilters,
      opticalDesign,
    });
    setIsFiltersMenuOpen(false);
  };
  const handleMountingTypeFilter = (mountType: string | null) => {
    filterProductsBySubCategory("telescopes", {
      ...telescopeFilters,
      mountType,
    });
    setIsFiltersMenuOpen(false);
  };
  const handleBrandFilter = (brand: string | null) => {
    filterProductsBySubCategory("telescopes", { ...telescopeFilters, brand });
    setIsFiltersMenuOpen(false);
  };

  return (
    <div className="flex flex-col">
      {/* Optical Designs Filters */}
      <div className="border-t-1 border-t-gray-400 py-2">
        <div
          className="flex items-center justify-between"
          onClick={() => setOpenOpticalDesigns(!openOpticalDesigns)}
        >
          <h4 className="text-xl font-medium">Optical Designs</h4>
          <span>
            {openOpticalDesigns ? (
              <FaMinus className="" />
            ) : (
              <FaPlus className="" />
            )}
          </span>
        </div>

        {openOpticalDesigns && (
          <div className="ml-4 py-2">
            {telescopeFilters.opticalDesign !== null ? (
              <div
                className="flex items-center text-lg"
                onClick={() => handleOpticalDesignFilter(null)}
              >
                {telescopeFilters.opticalDesign}
                <span className="ml-2 text-red-700">
                  <FaTimes />
                </span>
              </div>
            ) : (
              <div className="flex flex-col text-lg">
                {opticalDesigns.length === 1 ? (
                  <div className="text-gray-500">{opticalDesigns[0]}</div>
                ) : (
                  opticalDesigns.map((design) => (
                    <div
                      key={design}
                      onClick={() => handleOpticalDesignFilter(design)}
                      className="flex cursor-pointer items-center"
                    >
                      <span className="mr-2">
                        <FaArrowRight />
                      </span>
                      {design}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mounting type Filters */}
      <div className="border-t-1 border-t-gray-400 py-2">
        <div
          className="flex items-center justify-between"
          onClick={() => setOpenMountingTypes(!openMountingTypes)}
        >
          <h4 className="text-xl font-medium">Mounting Types</h4>
          <span>
            {openMountingTypes ? (
              <FaMinus className="" />
            ) : (
              <FaPlus className="" />
            )}
          </span>
        </div>

        {openMountingTypes && (
          <div className="ml-4 py-2">
            {telescopeFilters.mountType ? (
              <div
                className="flex items-center text-lg"
                onClick={() => handleMountingTypeFilter(null)}
              >
                {telescopeFilters.mountType}
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
          <span>
            {openBrands ? <FaMinus className="" /> : <FaPlus className="" />}
          </span>
        </div>

        {openBrands && (
          <div className="ml-4 py-2">
            {telescopeFilters.brand ? (
              <div
                className="flex items-center text-lg"
                onClick={() => handleBrandFilter(null)}
              >
                {telescopeFilters.brand}
                <span className="ml-2 text-red-700">
                  <FaTimes />
                </span>
              </div>
            ) : (
              <div className="flex flex-col text-lg">
                {telescopeBrands.length === 1 ? (
                  <div className="text-gray-500">{telescopeBrands[0]}</div>
                ) : (
                  telescopeBrands.map((brand) => (
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
