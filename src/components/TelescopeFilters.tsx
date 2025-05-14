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
                  onClick={() => updateTelescopesFilter("opticalDesign", null)}
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
                onClick={() => updateTelescopesFilter("opticalDesign", design)}
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
                className="m-1 cursor-pointer"
                key={type}
                onClick={() => updateTelescopesFilter("mountingType", type)}
              >
                {type.toUpperCase()}
              </button>
            ),
          )
        )}
      </div>

      {/* Brands Filter */}
      <div className="rounded-xl bg-gray-300 p-1 text-center">
        <h4 className="">BRANDS</h4>
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
                className="m-1 cursor-pointer"
                key={brand}
                onClick={() => updateTelescopesFilter("brand", brand)}
              >
                {brand.toUpperCase()}
              </button>
            ),
          )
        )}
      </div>
    </>
  );
}
