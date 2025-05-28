import { useEffect } from "react";
import { FaPlus, FaMinus, FaTimes, FaArrowRight } from "react-icons/fa";
import { useProductsStore } from "../stores/productsStore";
import { useUiStore } from "../stores/uiStore";
import { TelescopeType } from "../types/types";

export default function TelescopeFilters() {
  const { filteredProducts, telescopeFilters, filterProductsBySubCategory } =
    useProductsStore();
  const {
    isFiltersMenuOpen,
    openTelescopeFilters,
    setIsFiltersMenuOpen,
    setOpenTelescopeFilters,
  } = useUiStore();
  const {
    isOpticalDesignFiltersOpen,
    isMountTypeFiltersOpen,
    isBrandFiltersOpen,
  } = openTelescopeFilters;

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleMountingTypeFilter = (mountType: string | null) => {
    filterProductsBySubCategory("telescopes", {
      ...telescopeFilters,
      mountType,
    });
    setIsFiltersMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleBrandFilter = (brand: string | null) => {
    filterProductsBySubCategory("telescopes", { ...telescopeFilters, brand });
    setIsFiltersMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ENTENDER Y MEJORAR !!!!!!!!!
  // Efecto para cerrar submenús al cerrar el menú de filtros
  useEffect(() => {
    if (isFiltersMenuOpen) {
      setOpenTelescopeFilters(
        "isOpticalDesignFiltersOpen",
        !!telescopeFilters.opticalDesign || opticalDesigns.length === 1,
      );
      setOpenTelescopeFilters(
        "isMountTypeFiltersOpen",
        !!telescopeFilters.mountType || mountingTypes.length === 1,
      );
      setOpenTelescopeFilters(
        "isBrandFiltersOpen",
        !!telescopeFilters.brand || telescopeBrands.length === 1,
      );
    } else {
      setOpenTelescopeFilters("isOpticalDesignFiltersOpen", false);
      setOpenTelescopeFilters("isMountTypeFiltersOpen", false);
      setOpenTelescopeFilters("isBrandFiltersOpen", false);
    }
  }, [
    isFiltersMenuOpen,
    telescopeFilters.opticalDesign,
    opticalDesigns.length,
    telescopeFilters.mountType,
    mountingTypes.length,
    telescopeFilters.brand,
    telescopeBrands.length,
    setOpenTelescopeFilters,
  ]);

  return (
    <div className="flex flex-col">
      {/* Optical Designs Filters */}
      <div className="border-t-1 border-t-gray-400 py-2">
        <div
          className="flex items-center justify-between"
          onClick={() =>
            setOpenTelescopeFilters(
              "isOpticalDesignFiltersOpen",
              !isOpticalDesignFiltersOpen,
            )
          }
        >
          <h4 className="text-xl font-medium">Optical Designs</h4>
          <span>
            {isOpticalDesignFiltersOpen ? (
              <FaMinus className="" />
            ) : (
              <FaPlus className="" />
            )}
          </span>
        </div>

        {isOpticalDesignFiltersOpen && (
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
          onClick={() =>
            setOpenTelescopeFilters(
              "isMountTypeFiltersOpen",
              !isMountTypeFiltersOpen,
            )
          }
        >
          <h4 className="text-xl font-medium">Mounting Types</h4>
          <span>
            {isMountTypeFiltersOpen ? (
              <FaMinus className="" />
            ) : (
              <FaPlus className="" />
            )}
          </span>
        </div>

        {isMountTypeFiltersOpen && (
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
          onClick={() =>
            setOpenTelescopeFilters("isBrandFiltersOpen", !isBrandFiltersOpen)
          }
        >
          <h4 className="text-xl font-medium">Brands</h4>
          <span>
            {isBrandFiltersOpen ? (
              <FaMinus className="" />
            ) : (
              <FaPlus className="" />
            )}
          </span>
        </div>

        {isBrandFiltersOpen && (
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
