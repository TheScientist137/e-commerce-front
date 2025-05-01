import { useShopContext } from "../hooks/useContext.ts";

export default function FilterButtons() {
  const { selectedCategory, filterProducts } = useShopContext();

  return (
    <div>
      <div>
        <button onClick={() => filterProducts("products")}>All Products</button>
        <button
          onClick={() =>
            filterProducts("telescopes", "all types", "all optical designs")
          }
        >
          Telescopes
        </button>
        <button onClick={() => filterProducts("mounts", "all types")}>
          Mounts
        </button>
      </div>

      {selectedCategory === "telescopes" && (
        <div>
          {/* Filter by type */}
          <div>
            <button onClick={() => filterProducts('telescopes', 'refractor')}>Refractor</button>
            <button onClick={() => filterProducts('telescopes', 'reflector')}>Reflector</button>
          </div>
          {/* Filter by optical design */}
          <div>
            <button onClick={() => filterProducts('telescopes', 'refractor', 'achromat')}>
              Achromat
              </button>
            <button onClick={() => filterProducts('telescopes', 'refractor', 'apochromat')}>Apochromat</button>
            <button onClick={() => filterProducts('telescopes', 'reflector', 'newton')}>Newton</button>
            <button onClick={() => filterProducts('telescopes', 'reflector', 'catadioptric')}>Catadioptric</button>
          </div>
          {/* Filter by mount */}
        </div>
      )}

      {selectedCategory === "mounts" && (
        <div>
          <div>
            {productsTypes.mountTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => filterProducts("mounts", type.type)}
              >
                {type.type}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
