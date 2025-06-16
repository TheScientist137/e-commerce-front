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

export default function Filters() {
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

  // Telescopes
  if (selectedCategory === "telescopes") {
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
    const brands = [
      ...new Set(filteredProducts.map((p) => (p as TelescopeType).brand_name)),
    ];

    return (
      <div className="flex flex-col gap-6">
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
          options={brands}
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
      </div>
    );
  }

  // Mounts
  if (selectedCategory === "mounts") {
    const mountTypes = [
      ...new Set(
        filteredProducts.map(
          (product) => (product as MountType).build_type_name,
        ),
      ),
    ];
    const brands = [
      ...new Set(
        filteredProducts.map((product) => (product as MountType).brand_name),
      ),
    ];

    return (
      <div className="flex flex-col gap-6">
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
          options={brands}
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
      </div>
    );
  }

  // Eyepieces
  if (selectedCategory === "eyepieces") {
    const buildTypes = [
      ...new Set(
        filteredProducts.map(
          (product) => (product as EyepieceType).build_type_name,
        ),
      ),
    ];
    const brands = [
      ...new Set(
        filteredProducts.map((product) => (product as EyepieceType).brand_name),
      ),
    ];

    return (
      <div className="flex flex-col gap-6">
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
          options={brands}
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
      </div>
    );
  }

  // Filters
  if (selectedCategory === "filters") {
    const filterTypes = [
      ...new Set(
        filteredProducts.map(
          (product) => (product as FilterType).build_type_name,
        ),
      ),
    ];
    const brands = [
      ...new Set(
        filteredProducts.map((product) => (product as FilterType).brand_name),
      ),
    ];

    return (
      <div className="flex flex-col gap-6">
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
          options={brands}
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
      </div>
    );
  }
}
