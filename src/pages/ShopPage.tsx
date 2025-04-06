import { useShopContext } from "../hooks/useContext";

export default function ShopPage() {
  const { products } = useShopContext();

  return (
    <section>

      <div>
        {products.map((product) => (
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
