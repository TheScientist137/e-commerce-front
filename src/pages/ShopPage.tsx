import { useShopContext } from "../hooks/useContext";

export default function ShopPage() {
  const { products } = useShopContext();
  console.log(products);
  return (
    <section>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
