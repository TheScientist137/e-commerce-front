import { useProductsStore } from "../stores/productsStore";
import {
  TelescopeType,
  MountType,
  EyepieceType,
  FilterType,
} from "../types/types";

export default function FiltersButtons() {
  const {
    telescopes,
    mounts,
    eyepieces,
    filters,
    selectedCategory,
    telescopeFilters,
    mountFilters,
    eyepieceFilters,
    filterFilters,
    filterProductsBySubCategory,
    getIsFiltersActive
  } = useProductsStore();

  // Telescopes Unique Filters and Brands Values
  const opticalDesigns = Array.from(
    new Map(
      [...telescopes].map((product) => [
        (product as TelescopeType).optical_design_name,
        {
          name: (product as TelescopeType).optical_design_name,
          image: (product as TelescopeType).optical_design_image,
        },
      ]),
    ).values(),
  );
  const mountingTypes = Array.from(
    new Map(
      [...telescopes].map((product) => [
        (product as TelescopeType).mount_type_name,
        {
          name: (product as TelescopeType).mount_type_name,
          image: (product as TelescopeType).mount_type_image,
        },
      ]),
    ).values(),
  );

  const telescopeBrands = Array.from(
    new Map(
      [...telescopes].map((product) => [
        (product as TelescopeType).brand_name,
        {
          name: (product as TelescopeType).brand_name,
          image: (product as TelescopeType).brand_image,
        },
      ]),
    ).values(),
  );

  // Mounts Unique Filters and Brands Values
  const mountTypes = Array.from(
    new Map(
      [...mounts].map((product) => [
        (product as MountType).build_type_name,
        {
          name: (product as MountType).build_type_name,
          image: (product as MountType).build_type_image,
        },
      ]),
    ).values(),
  );
  const mountBrands = Array.from(
    new Map(
      [...mounts].map((product) => [
        (product as MountType).brand_name,
        {
          name: (product as MountType).brand_name,
          image: (product as MountType).brand_image,
        },
      ]),
    ).values(),
  );
  // Eyepieces Unique Filters and Brands Values
  const eyepieceTypes = Array.from(
    new Map(
      [...eyepieces].map((product) => [
        (product as EyepieceType).build_type_name,
        {
          name: (product as EyepieceType).build_type_name,
          image: (product as EyepieceType).build_type_image,
        },
      ]),
    ).values(),
  );
  const eyepieceBrands = Array.from(
    new Map(
      [...eyepieces].map((product) => [
        (product as EyepieceType).brand_name,
        {
          name: (product as EyepieceType).brand_name,
          image: (product as EyepieceType).brand_image,
        },
      ]),
    ).values(),
  );

  // Filters Unique Filters and Brand Values
  const filterTypes = Array.from(
    new Map(
      [...filters].map((product) => [
        (product as FilterType).build_type_name,
        {
          name: (product as FilterType).build_type_name,
          image: (product as FilterType).build_type_image,
        },
      ]),
    ).values(),
  );
  const filterBrands = Array.from(
    new Map(
      [...filters].map((product) => [
        (product as FilterType).brand_name,
        {
          name: (product as FilterType).brand_name,
          image: (product as FilterType).brand_image,
        },
      ]),
    ).values(),
  );

  // Telescopes Filter Handlers
  const handleOpticalDesignFilter = (opticalDesign: string | null) => {
    filterProductsBySubCategory("telescopes", {
      ...telescopeFilters,
      opticalDesign,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleTelescopeMountingTypeFilter = (mountType: string | null) => {
    filterProductsBySubCategory("telescopes", {
      ...telescopeFilters,
      mountType,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleTelescopeBrandFilter = (brand: string | null) => {
    filterProductsBySubCategory("telescopes", { ...telescopeFilters, brand });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Mounts Filter Handlers
  const handleMountingTypeFilter = (buildType: string | null) => {
    filterProductsBySubCategory("mounts", {
      ...mountFilters,
      buildType,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleMountBrandFilter = (brand: string | null) => {
    filterProductsBySubCategory("mounts", { ...mountFilters, brand });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Eyepieces Filter Handlers
  const handleEyepieceTypeFilter = (buildType: string | null) => {
    filterProductsBySubCategory("eyepieces", {
      ...eyepieceFilters,
      buildType,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleEyepieceBrandFilter = (brand: string | null) => {
    filterProductsBySubCategory("eyepieces", { ...eyepieceFilters, brand });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filters Filter Handlers
  const handleFilterTypeFilter = (buildType: string | null) => {
    filterProductsBySubCategory("filters", {
      ...filterFilters,
      buildType,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleFilterBrandFilter = (brand: string | null) => {
    filterProductsBySubCategory("filters", { ...filterFilters, brand });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // If no filters are active, return null to hide the filter buttons
  // This is used to conditionally render the filter buttons only when there are active filters
  // (Avoiding state or functions to manage visibility)


  if (getIsFiltersActive()) return null;
  return (
    <>
      {selectedCategory === "telescopes" && (
        <div className="flex flex-col">
          <h3 className="mb-2 text-lg font-semibold">Optical Designs</h3>
          <div className="grid grid-cols-2 gap-4">
            {opticalDesigns.map((design) => (
              <button
                onClick={() => handleOpticalDesignFilter(design.name)}
                key={design.name}
                className=""
              >
                <img src={design.image} alt={design.name} className="" />
                <span>{design.name}</span>
              </button>
            ))}
          </div>

          <h3 className="mt-4 mb-2 text-lg font-semibold">Mounting Types</h3>
          <div className="grid grid-cols-2 gap-4">
            {mountingTypes.map((type) => (
              <button
                onClick={() => handleTelescopeMountingTypeFilter(type.name)}
                key={type.name}
                className=""
              >
                <img src={type.image} alt={type.name} className="" />
                <span>{type.name}</span>
              </button>
            ))}
          </div>

          <h3 className="mt-4 mb-2 text-lg font-semibold">Brands</h3>
          <div className="grid grid-cols-2 gap-4">
            {telescopeBrands.map((brand) => (
              <button
                onClick={() => handleTelescopeBrandFilter(brand.name)}
                key={brand.name}
                className=""
              >
                <img src={brand.image} alt={brand.name} className="" />
                <span>{brand.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {selectedCategory === "mounts" && (
        <div className="flex flex-col">
          <h3 className="mb-2 text-lg font-semibold">Mount Types</h3>
          <div className="grid grid-cols-2 gap-4">
            {mountTypes.map((type) => (
              <button
                onClick={() => handleMountingTypeFilter(type.name)}
                key={type.name}
                className=""
              >
                <img src={type.image} alt={type.name} className="" />
                <span>{type.name}</span>
              </button>
            ))}
          </div>

          <h3 className="mt-4 mb-2 text-lg font-semibold">Brands</h3>
          <div className="grid grid-cols-2 gap-4">
            {mountBrands.map((brand) => (
              <button
                onClick={() => handleMountBrandFilter(brand.name)}
                key={brand.name}
                className=""
              >
                <img src={brand.image} alt={brand.name} className="" />
                <span>{brand.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {selectedCategory === "eyepieces" && (
        <div className="flex flex-col">
          <h3 className="mb-2 text-lg font-semibold">Build Types</h3>
          <div className="grid grid-cols-2 gap-4">
            {eyepieceTypes.map((type) => (
              <button
                onClick={() => handleEyepieceTypeFilter(type.name)}
                key={type.name}
                className=""
              >
                <img src={type.image} alt={type.name} className="" />
                <span>{type.name}</span>
              </button>
            ))}
          </div>

          <h3 className="mt-4 mb-2 text-lg font-semibold">Brands</h3>
          <div className="grid grid-cols-2 gap-4">
            {eyepieceBrands.map((brand) => (
              <button
                onClick={() => handleEyepieceBrandFilter(brand.name)}
                key={brand.name}
                className=""
              >
                <img src={brand.image} alt={brand.name} className="" />
                <span>{brand.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {selectedCategory === "filters" && (
        <div className="flex flex-col">
          <h3 className="mb-2 text-lg font-semibold">Build Types</h3>
          <div className="grid grid-cols-2 gap-4">
            {filterTypes.map((type) => (
              <button
                onClick={() => handleFilterTypeFilter(type.name)}
                key={type.name}
                className=""
              >
                <img src={type.image} alt={type.name} className="" />
                <span>{type.name}</span>
              </button>
            ))}
          </div>

          <h3 className="mt-4 mb-2 text-lg font-semibold">Brands</h3>
          <div className="grid grid-cols-2 gap-4">
            {filterBrands.map((brand) => (
              <button
                onClick={() => handleFilterBrandFilter(brand.name)}
                key={brand.name}
                className=""
              >
                <img src={brand.image} alt={brand.name} className="" />
                <span>{brand.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
