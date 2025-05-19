import { useShopContext } from "../hooks/useContext";
import { TelescopeType } from "../types/types";

export default function TelescopeFilters() {
  const {
    filteredProducts,
    telescopeFilters,
    filterTelescopesBySubCategory,
  } = useShopContext();

  // Obtain dynamic subFilters from filtered telescopes
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

  return (
    <>
      <div className="rounded-xl bg-gray-300 p-1 text-center">
        <h4>OPTICAL DESIGNS</h4>
        <div>
          {opticalDesigns.length === 1 ? (
            <span className="">
              {/* Si solo queda uno mostrar texto en vez de botón */}
              {opticalDesigns[0]}
              {/* Si es el seleccionado mostrar boton para limpiar filtro*/}
              {telescopeFilters.opticalDesign === opticalDesigns[0] && (
                <button
                  className=""
                  onClick={() => filterTelescopesBySubCategory("opticalDesign", null)}
                >
                  x
                </button>
              )}
            </span>
          ) : (
            opticalDesigns.map((design) => (
              <button
                className="m-1 cursor-pointer"
                key={design}
                onClick={() => filterTelescopesBySubCategory("opticalDesign", design)}
              >
                {design.toUpperCase()}
              </button>
            ))
          )}
        </div>
      </div>
      <div className="rounded-xl bg-gray-300 p-1 text-center">
        <h4>MOUNTING TYPES</h4>
        {mountingTypes.length === 1 ? (
          <span>
            {mountingTypes[0]}
            {telescopeFilters.mountingType === mountingTypes[0] && (
              <button onClick={() => filterTelescopesBySubCategory("mountingType", null)}>
                x
              </button>
            )}
          </span>
        ) : (
          mountingTypes.map((type) => (
            <button
              className="m-1 cursor-pointer"
              key={type}
              onClick={() => filterTelescopesBySubCategory("mountingType", type)}
            >
              {type.toUpperCase()}
            </button>
          ))
        )}
      </div>

      {/* Brands Filter */}
      <div className="rounded-xl bg-gray-300 p-1 text-center">
        <h4 className="">BRANDS</h4>
        {telescopeBrands.length === 1 ? (
          <span>
            {telescopeBrands[0]}
            {telescopeFilters.brand === telescopeBrands[0] && (
              <button onClick={() => filterTelescopesBySubCategory("brand", null)}>
                x
              </button>
            )}
          </span>
        ) : (
          telescopeBrands.map((brand) => (
            <button
              className="m-1 cursor-pointer"
              key={brand}
              onClick={() => filterTelescopesBySubCategory("brand", brand)}
            >
              {brand.toUpperCase()}
            </button>
          ))
        )}
      </div>
    </>
  );
}
