import { useEffect } from "react";
import { useProductsStore } from "../stores/productsStore";
import { useUiStore } from "../stores/uiStore";
import FiltersMenuModal from "./FilterMenuModal";
import FiltersSection from "./FiltersSection";
import {
  TelescopeType,
  MountType,
  EyepieceType,
  FilterType,
} from "../types/types";

export default function FiltersMenu() {
  const {
    filteredProducts,
    selectedCategory,
    telescopeFilters,
    mountFilters,
    eyepieceFilters,
    filterFilters,
    filterProductsBySubCategory,
  } = useProductsStore();
  const {
    isFiltersMenuOpen,
    openTelescopeFilters,
    openMountFilters,
    openEyepieceFilters,
    openFilterFilters,
    setIsFiltersMenuOpen,
    setOpenTelescopeFilters,
    setOpenMountFilters,
    setOpenEyepieceFilters,
    setOpenFilterFilters,
  } = useUiStore();

  // Telescope Filters Dynamic Values
  // Extracted from filteredProducts
  const opticalDesigns = [
    ...new Set(
      filteredProducts.map((p) => (p as TelescopeType).optical_design_name),
    ),
  ];
  const mountingTypes = [
    ...new Set(
      filteredProducts.map((p) => (p as TelescopeType).mount_type_name),
    ),
  ];
  const telescopeBrands = [
    ...new Set(filteredProducts.map((p) => (p as TelescopeType).brand)),
  ];

  // Mount Filters Dynamic Values
  // Extracted from filteredProducts
  const mountTypes = [
    ...new Set(
      filteredProducts.map((product) => (product as MountType).build_type_name),
    ),
  ];
  const mountBrands = [
    ...new Set(
      filteredProducts.map((product) => (product as MountType).brand),
    ),
  ];

  // Eyepiece Filters Dynamic Values
  // Extracted from filteredProducts
  const buildTypes = [
    ...new Set(
      filteredProducts.map(
        (product) => (product as EyepieceType).build_type_name,
      ),
    ),
  ];
  const eyepieceBrands = [
    ...new Set(
      filteredProducts.map((product) => (product as EyepieceType).brand),
    ),
  ];

  // Filter Filters Dynamic Values
  // Extracted from filteredProducts
  const filterTypes = [
    ...new Set(
      filteredProducts.map(
        (product) => (product as FilterType).build_type_name,
      ),
    ),
  ];
  const filterBrands = [
    ...new Set(
      filteredProducts.map((product) => (product as FilterType).brand),
    ),
  ];

  // Effect to close/open submenus if one is selected or there is one left
  // When closing filters menu
  useEffect(() => {
    if (isFiltersMenuOpen) {
      // Telescopes
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
      // Mounts
      setOpenMountFilters(
        "isMountTypeFiltersOpen",
        !!mountFilters.buildType || mountTypes.length === 1,
      );
      setOpenMountFilters(
        "isBrandFiltersOpen",
        !!mountFilters.brand || mountBrands.length === 1,
      );
      // Eyepieces
      setOpenEyepieceFilters(
        "isBuildTypeFiltersOpen",
        !!eyepieceFilters.buildType || buildTypes.length === 1,
      );
      setOpenEyepieceFilters(
        "isBrandFiltersOpen",
        !!eyepieceFilters.brand || eyepieceBrands.length === 1,
      );
      // Filters
      setOpenFilterFilters(
        "isBuildTypeFiltersOpen",
        !!filterFilters.buildType || filterTypes.length === 1,
      );
      setOpenFilterFilters(
        "isBrandFiltersOpen",
        !!filterFilters.brand || filterBrands.length === 1,
      );
    } else {
      setOpenTelescopeFilters("isOpticalDesignFiltersOpen", false);
      setOpenTelescopeFilters("isMountTypeFiltersOpen", false);
      setOpenTelescopeFilters("isBrandFiltersOpen", false);

      setOpenMountFilters("isMountTypeFiltersOpen", false);
      setOpenMountFilters("isBrandFiltersOpen", false);

      setOpenEyepieceFilters("isBuildTypeFiltersOpen", false);
      setOpenEyepieceFilters("isBrandFiltersOpen", false);

      setOpenFilterFilters("isBuildTypeFiltersOpen", false);
      setOpenFilterFilters("isBrandFiltersOpen", false);
    }
  }, [
    isFiltersMenuOpen,
    // Telescopes
    telescopeFilters.opticalDesign,
    opticalDesigns.length,
    telescopeFilters.mountType,
    mountingTypes.length,
    telescopeFilters.brand,
    telescopeBrands.length,
    // Mounts
    mountFilters.buildType,
    mountTypes.length,
    mountFilters.brand,
    mountBrands.length,
    // Eyepieces
    eyepieceFilters.buildType,
    buildTypes.length,
    eyepieceFilters.brand,
    eyepieceBrands.length,
    // Filters
    filterFilters.buildType,
    filterTypes.length,
    filterFilters.brand,
    filterBrands.length,
    // Setters
    setOpenTelescopeFilters,
    setOpenMountFilters,
    setOpenEyepieceFilters,
    setOpenFilterFilters,
  ]);

  return (
    <FiltersMenuModal
      title="Filters"
      isOpen={isFiltersMenuOpen}
      onClose={() => setIsFiltersMenuOpen(false)}
    >
      <div className="flex flex-col gap-4">
        {selectedCategory === "telescopes" && (
          <>
            <FiltersSection
              title="Optical Designs"
              isOpen={openTelescopeFilters.isOpticalDesignFiltersOpen}
              selected={telescopeFilters.opticalDesign || null}
              options={opticalDesigns}
              onSelect={(opticalDesign) => {
                filterProductsBySubCategory("telescopes", {
                  ...telescopeFilters,
                  opticalDesign: opticalDesign,
                });
                setIsFiltersMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onToggle={() =>
                setOpenTelescopeFilters(
                  "isOpticalDesignFiltersOpen",
                  !openTelescopeFilters.isOpticalDesignFiltersOpen,
                )
              }
            />
            <FiltersSection
              title="Mounting Types"
              isOpen={openTelescopeFilters.isMountTypeFiltersOpen}
              selected={telescopeFilters.mountType || null}
              options={mountingTypes}
              onSelect={(mountType) => {
                filterProductsBySubCategory("telescopes", {
                  ...telescopeFilters,
                  mountType: mountType,
                });
                setIsFiltersMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onToggle={() =>
                setOpenTelescopeFilters(
                  "isMountTypeFiltersOpen",
                  !openTelescopeFilters.isMountTypeFiltersOpen,
                )
              }
            />
            <FiltersSection
              title="Brands"
              isOpen={openTelescopeFilters.isBrandFiltersOpen}
              selected={telescopeFilters.brand || null}
              options={telescopeBrands}
              onSelect={(brand) => {
                filterProductsBySubCategory("telescopes", {
                  ...telescopeFilters,
                  brand: brand,
                });
                setIsFiltersMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onToggle={() =>
                setOpenTelescopeFilters(
                  "isBrandFiltersOpen",
                  !openTelescopeFilters.isBrandFiltersOpen,
                )
              }
            />
          </>
        )}
        {selectedCategory === "mounts" && (
          <>
            <FiltersSection
              title="Mounting Types"
              isOpen={openMountFilters.isMountTypeFiltersOpen}
              selected={mountFilters.buildType || null}
              options={mountTypes}
              onSelect={(mountType) => {
                filterProductsBySubCategory("mounts", {
                  ...mountFilters,
                  buildType: mountType,
                });
                setIsFiltersMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onToggle={() =>
                setOpenMountFilters(
                  "isMountTypeFiltersOpen",
                  !openMountFilters.isMountTypeFiltersOpen,
                )
              }
            />
            <FiltersSection
              title="Brands"
              isOpen={openMountFilters.isBrandFiltersOpen}
              selected={mountFilters.brand || null}
              options={mountBrands}
              onSelect={(brand) => {
                filterProductsBySubCategory("mounts", {
                  ...mountFilters,
                  brand: brand,
                });
                setIsFiltersMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onToggle={() =>
                setOpenMountFilters(
                  "isBrandFiltersOpen",
                  !openMountFilters.isBrandFiltersOpen,
                )
              }
            />
          </>
        )}
        {selectedCategory === "eyepieces" && (
          <>
            <FiltersSection
              title="Type of Build"
              isOpen={openEyepieceFilters.isBuildTypeFiltersOpen}
              selected={eyepieceFilters.buildType || null}
              options={buildTypes}
              onSelect={(eyepieceType) => {
                filterProductsBySubCategory("eyepieces", {
                  ...eyepieceFilters,
                  buildType: eyepieceType,
                });
                setIsFiltersMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onToggle={() =>
                setOpenEyepieceFilters(
                  "isBuildTypeFiltersOpen",
                  !openEyepieceFilters.isBuildTypeFiltersOpen,
                )
              }
            />
            <FiltersSection
              title="Brands"
              isOpen={openEyepieceFilters.isBrandFiltersOpen}
              selected={eyepieceFilters.brand || null}
              options={eyepieceBrands}
              onSelect={(brand) => {
                filterProductsBySubCategory("eyepieces", {
                  ...eyepieceFilters,
                  brand: brand,
                });
                setIsFiltersMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onToggle={() =>
                setOpenEyepieceFilters(
                  "isBrandFiltersOpen",
                  !openEyepieceFilters.isBrandFiltersOpen,
                )
              }
            />
          </>
        )}
        {selectedCategory === "filters" && (
          <>
            <FiltersSection
              title="Area of Application"
              isOpen={openFilterFilters.isBuildTypeFiltersOpen}
              selected={filterFilters.buildType || null}
              options={filterTypes}
              onSelect={(filterType) => {
                filterProductsBySubCategory("filters", {
                  ...filterFilters,
                  buildType: filterType,
                });
                setIsFiltersMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onToggle={() =>
                setOpenFilterFilters(
                  "isBuildTypeFiltersOpen",
                  !openFilterFilters.isBuildTypeFiltersOpen,
                )
              }
            />
            <FiltersSection
              title="Brands"
              isOpen={openFilterFilters.isBrandFiltersOpen}
              selected={filterFilters.brand || null}
              options={filterBrands}
              onSelect={(brand) => {
                filterProductsBySubCategory("filters", {
                  ...filterFilters,
                  brand: brand,
                });
                setIsFiltersMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onToggle={() =>
                setOpenFilterFilters(
                  "isBrandFiltersOpen",
                  !openFilterFilters.isBrandFiltersOpen,
                )
              }
            />
          </>
        )}
      </div>
    </FiltersMenuModal>
  );
}
