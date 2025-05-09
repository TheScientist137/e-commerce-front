import { useEffect } from "react";
import { useShopContext } from "../hooks/useContext";
import { EyepieceType } from "../types/types";

export default function EyepieceFilters() {
  const {
    filteredProducts,
    eyepieceFilters,
    applyFiltersForEyepieces,
    updateEyepiecesFilter
  } = useShopContext();

  const buildTypes = Array.from(
    new Set(
      filteredProducts.map(
        (product) => (product as EyepieceType).eyepieceData.eyepiece_type
      )
    )
  );
  const eyepieceBrands = Array.from(
    new Set(
      filteredProducts.map(
        (product) => (product as EyepieceType).brand
      )
    )
  );

  useEffect(() => {
    applyFiltersForEyepieces();
  }, [eyepieceFilters]);

  return (
    <div>
      <div>
        <h4>TYPE OF BUILD</h4>
        {buildTypes.map((type) => (
          <button key={type} onClick={() => updateEyepiecesFilter(
            "buildType",
            eyepieceFilters.buildType === null ? type : null
          )}>
            {type}
          </button>
        ))}
      </div>
      <div>
        <h4>BRANDS</h4>
        {eyepieceBrands.map((brand) => (
          <button key={brand} onClick={() => updateEyepiecesFilter(
            "brand",
            eyepieceFilters.brand === null ? brand : null
          )}>
            {brand}
          </button>
        ))}
      </div>
    </div>

  );
}   