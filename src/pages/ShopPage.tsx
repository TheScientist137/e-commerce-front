import { useShopContext } from "../hooks/useContext";
import { Link } from "react-router";

export default function ShopPage() {
  const { filteredProducts, selectedCategory, filterProducts, telescopes, mounts } = useShopContext();

  // MEJORAR LÓGICA
  // Get telescope and mount types
  const telescopeTypes = telescopes.map((telescope) => telescope.telescope_type);
  const mountTypes = mounts.map((mount) => mount.mount_type);
  // Get optical design types
  const opticalDesignTypes = telescopes.map((telescope) => telescope.optical_design_type);
  console.log(opticalDesignTypes);
  // Eliminate duplicate values (specific types)
  const uniqueTelescopeTypes = [...new Set(telescopeTypes)];
  const uniqueMountTypes = [...new Set(mountTypes)];
  const uniqueOpticalDesignTypes = [...new Set(opticalDesignTypes)];
  console.log(uniqueOpticalDesignTypes);


  return (
    <section>
      <div>
        <button onClick={() => filterProducts('products', 'all types')}>All Products</button>
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
            <img src={product.image} alt="image" style={{ maxWidth: '200px' }} />
            <p>{product.brand}</p>
            <p>{product.price} $</p>
            <Link to={`/product/${product.id}`}>View details</Link>
          </div>
        ))}
      </div>
    </section>
  );
}
