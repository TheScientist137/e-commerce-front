import { useShopContext } from "../hooks/useContext";

export default function ShopPage() {
  const { filteredProducts, selectedCategory, filterProducts, telescopes, mounts } = useShopContext();

  // Get telescope and mount types
  const telescopeTypes = telescopes.map((telescope) => telescope.telescope_type);
  const mountTypes = mounts.map((mount) => mount.mount_type);
  // Get optical design types
  const opticalDesignTypes = telescopes.map((telescope) => telescope.optical_design_type);
  // Eliminate duplicate values (specific types)
  const uniqueTelescopeTypes = [...new Set(telescopeTypes)];
  const uniqueMountTypes = [...new Set(mountTypes)];
  const uniqueOpticalDesignTypes = [...new Set(opticalDesignTypes)];


  return (
    <section>
      <div>
        <button onClick={() => filterProducts('all', 'all', 'all')}>All Products</button>
        <button onClick={() => filterProducts('telescopes', 'all', 'all')}>Telescopes</button>
        <button onClick={() => filterProducts('mounts', 'all', 'all')}>Mounts</button>
      </div>

      {selectedCategory === 'telescopes' && (
        <div>
          <div>
            {uniqueTelescopeTypes.map((type) => (
              <button key={type} onClick={() => filterProducts('telescopes', type)}>{type}</button>
            ))}
          </div>
          <div>
            {uniqueOpticalDesignTypes.map((design) => (
              <button key={design} onClick={() => filterProducts('telescopes', 'all', design)}>{design}</button>
            ))}
          </div>
        </div>
      )}

      {selectedCategory === 'mounts' && (
        <div>
          <div>
            {uniqueMountTypes.map((type) => (
              <button key={type} onClick={() => filterProducts('mounts', type)}>{type}</button>
            ))}
          </div>
        </div>
      )}

      <div>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.brand}</p>
            <p>{product.price} $</p>
          </div>
        ))}
      </div>
    </section>
  );
}
