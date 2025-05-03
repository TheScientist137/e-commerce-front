import { useShopContext } from "../hooks/useContext.ts";

export default function FilterButtons() {
  const {
    selectedCategory,
    filterProducts,
    filterTelescopes,
    filterMounts,
    filterEyepieces,
    filterFilters,
  } = useShopContext();

  return (
    <div>
      <div>
        <button onClick={() => filterProducts("telescopes")}>Telescopes</button>
        <button onClick={() => filterProducts("mounts")}>Mounts</button>
        <button onClick={() => filterProducts("eyepieces")}>Eyepieces</button>
        <button onClick={() => filterProducts("filters")}>Filters</button>
      </div>

      {selectedCategory === "telescopes" && (
        <div>
          <div>
            <h4>OPTICAL DESIGN</h4>
            <button onClick={() => filterTelescopes('Achromat')}>Achromat</button>
            <button onClick={() => filterTelescopes("Apochromat")}>Apochromat</button>
            <button onClick={() => filterTelescopes("Newton")}>Newton</button>
            <button onClick={() => filterTelescopes("Maksutov")}>Maksutov</button>
          </div>

          <div>
            <h4>MOUNTING TYPE</h4>
            <button
              onClick={() => filterTelescopes(undefined, "Azimuthal")}>Azimuthal</button>
            <button onClick={() => filterTelescopes(undefined, "Azimuthal_GoTo")}>Azimuthal with GoTo</button>
            <button onClick={() => filterTelescopes(undefined, "Equatorial")}>Equatorial</button>
            <button onClick={() => filterTelescopes(undefined, "Equatorial_GoTo")}>Equatorial with GoTo</button>
            <button onClick={() => filterTelescopes(undefined, "Dobson")}>Dobsonian</button>
            <button onClick={() => filterTelescopes(undefined, "no_mount")}>No mount</button>
          </div>
        </div>
      )
      }
      {
        selectedCategory === "mounts" && (
          <div>
            <div>
              <h4>MOUNTING TYPE</h4>
              <button onClick={() => filterMounts("Azimuthal")}>Azimuthal</button>
              <button onClick={() => filterMounts("Azimuthal_GoTo")}>Azimuthal with GoTo</button>
              <button onClick={() => filterMounts("Equatorial")}>Equatorial</button>
              <button onClick={() => filterMounts("Equatorial_GoTo")}>Equatorial with GoTo</button>
            </div>
          </div>
        )
      }
      {
        selectedCategory === "eyepieces" && (
          <div>
            <div>
              <h4>TYPE OF BUILD</h4>
              <button onClick={() => filterEyepieces("Plossl")}>Plössl</button>
              <button onClick={() => filterEyepieces("SWA")}>SWA</button>
              <button onClick={() => filterEyepieces("UWA")}>UWA</button>
              <button onClick={() => filterEyepieces("XWA")}>XWA</button>
              <button onClick={() => filterEyepieces("Zoom")}>Zoom</button>
              <button onClick={() => filterEyepieces("Reticle")}>Reticle</button>
            </div>
          </div>
        )
      }
      {
        selectedCategory === "filters" && (
          <div>
            <div>
              <h4>AREA OF APPLICATION</h4>
              <button onClick={() => filterFilters("moon_filter")}>Moon filters & Polarizing filters</button>
              <button onClick={() => filterFilters("color_filter")}>Colour filters</button>
              <button onClick={() => filterFilters("nebulae_filter")}>Nebulae filters</button>
              <button onClick={() => filterFilters("solar_filter")}>Sun filters</button>
            </div>
          </div>
        )
      }
    </div >
  );
}
