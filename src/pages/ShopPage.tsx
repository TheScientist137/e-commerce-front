import { useShopContext } from "../hooks/useContext";
import { Link } from "react-router";
import FilterButtons from '../components/FilterButtons.tsx';

export default function ShopPage() {
  const {
    filteredProducts,
  } = useShopContext();

  return (
    <section>
      <FilterButtons />

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
