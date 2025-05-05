import { useShopContext } from "../hooks/useContext.ts";

export default function FilterButtons() {
  const {
    selectedCategory,
    filterProducts,
    getUniqueBrands,
  } = useShopContext();

  // Obtain brands based on the selected category
  const uniqueBrands = getUniqueBrands();

  return (
    <div>
      <div>
        <button onClick={() => filterProducts({ category: 'telescopes' })}>Telescopes</button>
        <button onClick={() => filterProducts({ category: 'mounts' })}>Mounts</button>
        <button onClick={() => filterProducts({ category: 'eyepieces' })}>Eyepieces</button>
        <button onClick={() => filterProducts({ category: 'filters' })}>Filters</button>
      </div>

      {selectedCategory === "telescopes" && (
        <div>
          <div>
            <h4>OPTICAL DESIGN</h4>
            <button onClick={() => filterProducts({ category: 'telescopes', opticalDesign: 'Achromat' })}>Achromat</button>
            <button onClick={() => filterProducts({ category: 'telescopes', opticalDesign: 'Apochromat' })}>Apochromat</button>
            <button onClick={() => filterProducts({ category: 'telescopes', opticalDesign: 'Newton' })}>Newton</button>
            <button onClick={() => filterProducts({ category: 'telescopes', opticalDesign: 'Catadioptric' })}>Catadioptric</button>
          </div>

          <div>
            <h4>MOUNTING TYPE</h4>
            <button onClick={() => filterProducts({ category: 'telescopes', telescopeMountType: 'Azimuthal' })}>Azimuthal</button>
            <button onClick={() => filterProducts({ category: 'telescopes', telescopeMountType: 'Azimuthal_GoTo' })}>Azimuthal with GoTo</button>
            <button onClick={() => filterProducts({ category: 'telescopes', telescopeMountType: 'Equatorial' })}>Equatorial</button>
            <button onClick={() => filterProducts({ category: 'telescopes', telescopeMountType: 'Equatorial_GoTo' })}>Equatorial with GoTo</button>
            <button onClick={() => filterProducts({ category: 'telescopes', telescopeMountType: 'Dobson' })}>Dobsonian</button>
            <button onClick={() => filterProducts({ category: 'telescopes', telescopeMountType: 'no_mount' })}>No mount</button>
          </div>
        </div>
      )}

      {selectedCategory === "mounts" && (
        <div>
          <h4>MOUNTING TYPE</h4>
          <button onClick={() => filterProducts({ category: 'mounts', mountType: 'Azimuthal' })}>Azimuthal</button>
          <button onClick={() => filterProducts({ category: 'mounts', mountType: 'Azimuthal_GoTo' })}>Azimuthal with GoTo</button>
          <button onClick={() => filterProducts({ category: 'mounts', mountType: 'Equatorial' })}>Equatorial</button>
          <button onClick={() => filterProducts({ category: 'mounts', mountType: 'Equatorial_GoTo' })}>Equatorial with GoTo</button>
        </div>
      )}

      {selectedCategory === "eyepieces" && (
        <div>
          <h4>TYPE OF BUILD</h4>
          <button onClick={() => filterProducts({ category: 'eyepieces', eyepieceType: 'Plossl' })}>Plössl</button>
          <button onClick={() => filterProducts({ category: 'eyepieces', eyepieceType: 'SWA' })}>SWA</button>
          <button onClick={() => filterProducts({ category: 'eyepieces', eyepieceType: 'UWA' })}>UWA</button>
          <button onClick={() => filterProducts({ category: 'eyepieces', eyepieceType: 'XWA' })}>XWA</button>
          <button onClick={() => filterProducts({ category: 'eyepieces', eyepieceType: 'Zoom' })}>Zoom</button>
          <button onClick={() => filterProducts({ category: 'eyepieces', eyepieceType: 'Reticle' })}>Reticle</button>
        </div>
      )}
      
      {selectedCategory === "filters" && (
        <div>
          <h4>AREA OF APPLICATION</h4>
          <button onClick={() => filterProducts({ category: 'filters', filterType: 'moon_filter' })}>Moon filters & Polarizing filters</button>
          <button onClick={() => filterProducts({ category: 'filters', filterType: 'color_filter' })}>Colour filters</button>
          <button onClick={() => filterProducts({ category: 'filters', filterType: 'nebulae_filter' })}>Nebulae filters</button>
          <button onClick={() => filterProducts({ category: 'filters', filterType: 'solar_filter' })}>Sun filters</button>
        </div>
      )}

      <div>
        <h4>BRAND</h4>
        {uniqueBrands.map((brand) => (
          <button onClick={() => filterProducts({ category: selectedCategory, brand })} key={brand}>
            {brand}
          </button>
        ))}
      </div>
    </div >
  );
}
