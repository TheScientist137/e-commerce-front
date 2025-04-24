import { useShopContext } from "../hooks/useContext";
import { Link } from "react-router";

export default function ShopPage() {
  const {
    filteredProducts,
    selectedCategory,
    filterProducts,
    telescopes,
    mounts,
    productsTypes } = useShopContext();

  return (
    <section>
      <div>
        <button onClick={() => filterProducts('products')}>All Products</button>
        <button onClick={() => filterProducts('telescopes', 'all types', 'all optical designs')}>Telescopes</button>
        <button onClick={() => filterProducts('mounts', 'all types')}>Mounts</button>
      </div>

      {selectedCategory === 'telescopes' && (
        <div>
          <div>
            {productsTypes.telescopeTypes.map((type) => (
              <button key={type.id} onClick={() => filterProducts('telescopes', type.type)}>
                {type.type}
              </button>
            ))}
          </div>
          <div>
            {productsTypes.opticalDesigns.map((design) => (
              <button key={design.id} onClick={() => filterProducts('telescopes', 'all types', design.type)}>
                {design.type}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedCategory === 'mounts' && (
        <div>
          <div>
            {productsTypes.mountTypes.map((type) => (
              <button key={type.id} onClick={() => filterProducts('mounts', type.type)}>
                {type.type}
              </button>
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
