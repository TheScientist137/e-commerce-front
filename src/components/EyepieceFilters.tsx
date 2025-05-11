import { useEffect } from "react";
import { useShopContext } from "../hooks/useContext";
import { EyepieceType } from "../types/types";

export default function EyepieceFilters() {
  const {
    filteredProducts,
    eyepieceFilters,
    applyFiltersForEyepieces,
    updateEyepiecesFilter,
  } = useShopContext();

  const buildTypes = Array.from(
    new Set(
      filteredProducts.map(
        (product) => (product as EyepieceType).eyepieceData.eyepiece_type
      )
    )
  );
  const eyepieceBrands = Array.from(
    new Set(filteredProducts.map((product) => (product as EyepieceType).brand))
  );

  useEffect(() => {
    applyFiltersForEyepieces();
  }, [eyepieceFilters]);

  return (
    <div>
      <div>
        <h4>TYPE OF BUILD</h4>
        {buildTypes.length === 1 ? (
          <span>
            {buildTypes[0]}
            {eyepieceFilters.buildType === buildTypes[0] && (
              <button onClick={() => updateEyepiecesFilter("buildType", null)}>
                x
              </button>
            )}
          </span>
        ) : (
          buildTypes.map((type) =>
            eyepieceFilters.buildType === type ? (
              <span key={type}>
                {type}
                <button
                  onClick={() => updateEyepiecesFilter("buildType", null)}
                >
                  x
                </button>
              </span>
            ) : (
              <button
                key={type}
                onClick={() => updateEyepiecesFilter("buildType", type)}
              >
                {type}
              </button>
            )
          )
        )}
      </div>
      <div>
        <h4>BRANDS</h4>
        {eyepieceBrands.length === 1 ? (
          <span>
            {eyepieceBrands[0]}
            {eyepieceFilters.brand === eyepieceBrands[0] && (
              <button onClick={() => updateEyepiecesFilter("brand", null)}>
                x
              </button>
            )}
          </span>
        ) : (
          eyepieceBrands.map((brand) =>
            eyepieceFilters.brand === brand ? (
              <span key={brand}>
                {brand}
                <button onClick={() => updateEyepiecesFilter("brand", null)}>
                  x
                </button>
              </span>
            ) : (
              <button
                key={brand}
                onClick={() => updateEyepiecesFilter("brand", brand)}
              >
                {brand}
              </button>
            )
          )
        )}
      </div>
    </div>
  );
}
