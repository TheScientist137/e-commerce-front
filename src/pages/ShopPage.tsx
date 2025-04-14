import { useState } from "react";
import { useShopContext } from "../hooks/useContext";
import { MountType, ProductType, TelescopeType } from "../types/types";

export default function ShopPage() {
  const { products, telescopes, mounts } = useShopContext();
  const [selectedCategory, setSelectedCategory] = useState<ProductType[] | TelescopeType[] | MountType[]>(products);

  return (
    <section>
      <div>
        <button onClick={() => setSelectedCategory(products)}>All</button>
        <button onClick={() => setSelectedCategory(telescopes)}>Telescopes</button>
        <button onClick={() => setSelectedCategory(mounts)}>Mounts</button>
      </div>

      <div>
        {selectedCategory.map((product) => (
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
