import { useProductsStore } from "../stores/productsStore";
import {
  TelescopeType,
  MountType,
  EyepieceType,
  FilterType,
} from "../types/types";

// PREDEFINED ORDER FOR FILTERS
const OPTICAL_DESIGNS_ORDER = [
  "Achromat",
  "Apochromat",
  "Newton",
  "Catadioptric",
  "Schmidt-Cassegrain",
  "Maksutov-Cassegrain",
  "Ritchey-Chrétien",
];

const MOUNT_TYPES_ORDER = [
  "Alt-azimuth",
  "Alt-azimuth with GoTo",
  "Equatorial",
  "Equatorial with GoTo",
  "Dobsonian",
  "Fork Mount",
];

// Helper function to sort filter objects by predefined order
const sortFilterObjectsByOrder = (
  filterObjects: { name: string; image: string }[],
  orderArray: string[]
): { name: string; image: string }[] => {
  // First, add items in the predefined order that exist in filterObjects
  const sortedFilters = orderArray
    .map((orderItem) =>
      filterObjects.find((filterObj) => filterObj.name === orderItem)
    )
    .filter(Boolean) as { name: string; image: string }[];

  // Then, add any remaining items that weren't in the predefined order
  const remainingFilters = filterObjects
    .filter((filterObj) => !orderArray.includes(filterObj.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  return [...sortedFilters, ...remainingFilters];
};

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
    getIsFiltersActive,
  } = useProductsStore();

  // FILTERS
  // Telescopes Unique Filters and Brands Values
  const opticalDesignsRaw = Array.from(
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
  const opticalDesigns = sortFilterObjectsByOrder(opticalDesignsRaw, OPTICAL_DESIGNS_ORDER);
  
  const mountingTypesRaw = Array.from(
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
  const mountingTypes = sortFilterObjectsByOrder(mountingTypesRaw, MOUNT_TYPES_ORDER);
  
  const telescopeBrands = Array.from(
    new Map(
      [...telescopes].map((product) => [
        (product as TelescopeType).brand,
        {
          name: (product as TelescopeType).brand,
          image: "", // Las marcas no tienen imagen en este contexto
        },
      ]),
    ).values(),
  ).sort((a, b) => a.name.localeCompare(b.name));

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
        (product as MountType).brand,
        {
          name: (product as MountType).brand,
          image: "",
        },
      ]),
    ).values(),
  ).sort((a, b) => a.name.localeCompare(b.name));
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
        (product as EyepieceType).brand,
        {
          name: (product as EyepieceType).brand,
          image: "",
        },
      ]),
    ).values(),
  ).sort((a, b) => a.name.localeCompare(b.name));

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
        (product as FilterType).brand,
        {
          name: (product as FilterType).brand,
          image: "",
        },
      ]),
    ).values(),
  ).sort((a, b) => a.name.localeCompare(b.name));

  // HANDLERS
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

  // Crear un componente aparte!!!!!!!!!!!!!!!!!!
  function FilterButtonsSection({
    title,
    items,
    onClick,
  }: {
    title: string;
    items: { name: string; image: string }[];
    onClick: (name: string) => void;
  }) {
    return (
      <div className="flex flex-col rounded-xl bg-slate-50 p-4 dark:bg-slate-700">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <div className="grid grid-cols-3 gap-4">
          {items.map((item) => (
            <button
              key={item.name}
              className="flex cursor-pointer flex-col justify-items-start gap-2"
              onClick={() => onClick(item.name)}
            >
              <img className="rounded-full" src={item.image} alt={item.name} />
              <span className="text-xs">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {selectedCategory === "telescopes" && (
        <>
          <FilterButtonsSection
            title="Optical Designs"
            items={sortFilterObjectsByOrder(opticalDesigns, OPTICAL_DESIGNS_ORDER)}
            onClick={handleOpticalDesignFilter}
          />

          <FilterButtonsSection
            title="Mounting Types"
            items={sortFilterObjectsByOrder(mountingTypes, MOUNT_TYPES_ORDER)}
            onClick={handleTelescopeMountingTypeFilter}
          />
          <FilterButtonsSection
            title="Brands"
            items={telescopeBrands}
            onClick={handleTelescopeBrandFilter}
          />
        </>
      )}
      {selectedCategory === "mounts" && (
        <>
          <FilterButtonsSection
            title="Mount Types"
            items={mountTypes}
            onClick={handleMountingTypeFilter}
          />
          <FilterButtonsSection
            title="Brands"
            items={mountBrands}
            onClick={handleMountBrandFilter}
          />
        </>
      )}
      {selectedCategory === "eyepieces" && (
        <>
          <FilterButtonsSection
            title="Build Types"
            items={eyepieceTypes}
            onClick={handleEyepieceTypeFilter}
          />
          <FilterButtonsSection
            title="Brands"
            items={eyepieceBrands}
            onClick={handleEyepieceBrandFilter}
          />
        </>
      )}
      {selectedCategory === "filters" && (
        <>
          <FilterButtonsSection
            title="Build Types"
            items={filterTypes}
            onClick={handleFilterTypeFilter}
          />
          <FilterButtonsSection
            title="Brands"
            items={filterBrands}
            onClick={handleFilterBrandFilter}
          />
        </>
      )}
    </div>
  );
}
