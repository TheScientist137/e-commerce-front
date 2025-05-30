import { useProductsStore } from "../stores/productsStore";

export default function FiltersButtons() {
  const {
    selectedCategory,
    subFilters,
    telescopeFilters,
    mountFilters,
    eyepieceFilters,
    filterFilters,
    filterProductsBySubCategory,
  } = useProductsStore();

  const subFiltersByCategory = subFilters.filter(
    (subFilter) => subFilter.category === selectedCategory?.toLowerCase(),
  );
  const mountTypes = subFilters.filter(
    (subFilter) => subFilter.category === "mounts",
  );

  return (
    <>
      {selectedCategory === "telescopes" && (
        <div className="border border-gray-600 p-4">
          <div className="grid grid-cols-2 text-center border border-gray-600">
            {subFiltersByCategory.map((subFilter) => (
              <button
                key={subFilter.name}
                onClick={() =>
                  filterProductsBySubCategory(selectedCategory, {
                    ...telescopeFilters,
                    opticalDesign: subFilter.name,
                  })
                }
              >
                <img src={subFilter.image_url} alt={subFilter.name} />
                <p>{subFilter.name}</p>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 text-center border border-gray-600">
            {mountTypes.map((mountType) => (
              <button
                key={mountType.name}
                onClick={() =>
                  filterProductsBySubCategory(selectedCategory, {
                    ...telescopeFilters,
                    mountType: mountType.name,
                  })
                }
              >
                <img src={mountType.image_url} alt={mountType.name} />
                <p>{mountType.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}
      {selectedCategory === "mounts" && (
        <div className="grid grid-cols-2 text-center">
          {subFiltersByCategory.map(
            (subFilter) =>
              subFilter.name !== "No mount" &&
              subFilter.name !== "Dobsonian" && (
                <button
                  key={subFilter.name}
                  onClick={() =>
                    filterProductsBySubCategory(selectedCategory, {
                      ...mountFilters,
                      buildType: subFilter.name,
                    })
                  }
                >
                  <img src={subFilter.image_url} alt={subFilter.name} />
                  <p>{subFilter.name}</p>
                </button>
              ),
          )}
        </div>
      )}
      {selectedCategory === "eyepieces" && (
        <div className="grid grid-cols-2 text-center">
          {subFiltersByCategory.map((subFilter) => (
            <button
              key={subFilter.name}
              onClick={() =>
                filterProductsBySubCategory(selectedCategory, {
                  ...eyepieceFilters,
                  buildType: subFilter.name,
                })
              }
            >
              <img src={subFilter.image_url} alt={subFilter.name} />
              <p>{subFilter.name}</p>
            </button>
          ))}
        </div>
      )}
      {selectedCategory === "filters" && (
        <div className="grid grid-cols-2 text-center">
          {subFiltersByCategory.map((subFilter) => (
            <button
              key={subFilter.name}
              onClick={() =>
                filterProductsBySubCategory(selectedCategory, {
                  ...filterFilters,
                  buildType: subFilter.name,
                })
              }
            >
              <img src={subFilter.image_url} alt={subFilter.name} />
              <p>{subFilter.name}</p>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
