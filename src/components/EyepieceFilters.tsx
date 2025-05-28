import { useEffect } from "react";
import { FaPlus, FaMinus, FaTimes, FaArrowRight } from "react-icons/fa";
import { useProductsStore } from "../stores/productsStore";
import { useUiStore } from "../stores/uiStore";
import { EyepieceType } from "../types/types";

export default function EyepieceFilters() {
  const { filteredProducts, eyepieceFilters, filterProductsBySubCategory } =
    useProductsStore();
  const {
    setIsFiltersMenuOpen,
    openEyepieceFilters,
    setOpenEyepieceFilters,
    isFiltersMenuOpen,
  } = useUiStore();
  const { isBuildTypeFiltersOpen, isBrandFiltersOpen } = openEyepieceFilters;

  const buildTypes = Array.from(
    new Set(
      filteredProducts.map(
        (product) => (product as EyepieceType).eyepieceData.eyepiece_type,
      ),
    ),
  );
  const eyepieceBrands = Array.from(
    new Set(filteredProducts.map((product) => (product as EyepieceType).brand)),
  );

  const handleBuildTypeFilter = (buildType: string | null) => {
    filterProductsBySubCategory("eyepieces", { ...eyepieceFilters, buildType });
    setIsFiltersMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleBrandFilter = (brand: string | null) => {
    filterProductsBySubCategory("eyepieces", { ...eyepieceFilters, brand });
    setIsFiltersMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (isFiltersMenuOpen) {
      setOpenEyepieceFilters(
        "isBuildTypeFiltersOpen",
        !!eyepieceFilters.buildType || buildTypes.length === 1,
      );
      setOpenEyepieceFilters(
        "isBrandFiltersOpen",
        !!eyepieceFilters.brand || eyepieceBrands.length === 1,
      );
    } else {
      setOpenEyepieceFilters("isBuildTypeFiltersOpen", false);
      setOpenEyepieceFilters("isBrandFiltersOpen", false);
    }
  }, [
    isFiltersMenuOpen,
    eyepieceFilters.buildType,
    eyepieceFilters.brand,
    buildTypes.length,
    eyepieceBrands.length,
    setOpenEyepieceFilters,
  ]);

  return (
    <div className="flex flex-col">
      {/* Build Types Filters */}
      <div className="border-t-1 border-t-gray-400 py-2">
        <div
          className="flex items-center justify-between"
          onClick={() =>
            setOpenEyepieceFilters(
              "isBuildTypeFiltersOpen",
              !isBuildTypeFiltersOpen,
            )
          }
        >
          <h4 className="text-xl font-medium">Type of Build</h4>
          <span>{isBuildTypeFiltersOpen ? <FaMinus /> : <FaPlus />}</span>
        </div>

        {isBuildTypeFiltersOpen && (
          <div className="ml-4 py-2">
            {eyepieceFilters.buildType ? (
              <div
                className="flex items-center text-lg"
                onClick={() => handleBuildTypeFilter(null)}
              >
                {eyepieceFilters.buildType}
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
          onClick={() =>
            setOpenEyepieceFilters("isBrandFiltersOpen", !isBrandFiltersOpen)
          }
        >
          <h4 className="text-xl font-medium">Brands</h4>
          <span>{isBrandFiltersOpen ? <FaMinus /> : <FaPlus />}</span>
        </div>

        {isBrandFiltersOpen && (
          <div className="ml-4 py-2">
            {eyepieceFilters.brand ? (
              <div
                className="flex items-center text-lg"
                onClick={() => handleBrandFilter(null)}
              >
                {eyepieceFilters.brand}
                <span className="ml-2 text-red-700">
                  <FaTimes />
                </span>
              </div>
            ) : (
              <div className="flex flex-col text-lg">
                {eyepieceBrands.length === 1 ? (
                  <div className="text-gray-500">{eyepieceBrands[0]}</div>
                ) : (
                  eyepieceBrands.map((brand) => (
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
