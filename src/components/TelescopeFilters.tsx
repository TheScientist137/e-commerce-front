import { useEffect, useState } from "react";
import { useShopContext } from "../hooks/useContext";
import { TelescopeType } from "../types/types";

export default function TelescopeFilters() {
  const {
    filteredProducts,
    telescopeFilters,
    updateTelescopesFilter,
    applyFiltersForTelescopes,
  } = useShopContext();
  const [showTelescopeFilters, setShowTelescopeFilters] =
    useState<boolean>(false);

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

  useEffect(() => {
    applyFiltersForTelescopes();
  }, [telescopeFilters]);

  return (
    <div>
      <div>
        <h4>Optical Design</h4>
        {opticalDesigns.length === 1 ? (
          <span>
            {/* Si solo queda uno mostrar texto en vez de botón */}
            {opticalDesigns[0]}
            {/* Si es el seleccionado mostrar boton para limpiar filtro*/}
            {telescopeFilters.opticalDesign === opticalDesigns[0] && (
              <button
                onClick={() => updateTelescopesFilter("opticalDesign", null)}
              >
                x
              </button>
            )}
          </span>
        ) : (
          opticalDesigns.map((design) => (
            <button
              key={design}
              onClick={() => updateTelescopesFilter("opticalDesign", design)}
            >
              {design}
            </button>
          ))
        )}
      </div>
      <div>
        <h4>Mounting Type</h4>
        {mountingTypes.length === 1 ? (
          <span>
            {mountingTypes[0]}
            {telescopeFilters.mountingType === mountingTypes[0] && (
              <button
                onClick={() => updateTelescopesFilter("mountingType", null)}
              >
                x
              </button>
            )}
          </span>
        ) : (
          mountingTypes.map((type) =>
            telescopeFilters.mountingType === type ? (
              <span key={type}>
                {type}
                <button
                  onClick={() => updateTelescopesFilter("mountingType", null)}
                >
                  x
                </button>
              </span>
            ) : (
              <button
                key={type}
                onClick={() => updateTelescopesFilter("mountingType", type)}
              >
                {type}
              </button>
            ),
          )
        )}
      </div>

      {/* Brands Filter */}
      <div>
        <h4>Brands</h4>
        {telescopeBrands.length === 1 ? (
          <span>
            {telescopeBrands[0]}
            {telescopeFilters.brand === telescopeBrands[0] && (
              <button onClick={() => updateTelescopesFilter("brand", null)}>
                x
              </button>
            )}
          </span>
        ) : (
          telescopeBrands.map((brand) =>
            telescopeFilters.brand === brand ? (
              <span key={brand}>
                {brand}
                <button onClick={() => updateTelescopesFilter("brand", null)}>
                  x
                </button>
              </span>
            ) : (
              <button
                key={brand}
                onClick={() => updateTelescopesFilter("brand", brand)}
              >
                {brand}
              </button>
            ),
          )
        )}
      </div>
    </div>
  );
}
