import { Link } from "react-router";
import { getItem } from "../utils/localStorage";
import { Telescope, Mount } from "../types/types";
import { useShopContext } from '../hooks/useContext';

export default function ProductPage() {
  const { addToCart } = useShopContext();

  // Mover a ShopContext????????
  const selectedProduct: Telescope | Mount = getItem('selectedProduct');
  
  return (
    <section>
      <Link to='/'>Back shop</Link>

      {selectedProduct ? (
        <div>
          <h3>{selectedProduct.name}</h3>
          <img src={selectedProduct.image} alt="image" />
          <p>{selectedProduct.brand}</p>
          <p>{selectedProduct.description}</p>
          <p>{selectedProduct.price}</p>
        </div>
      ) : (<p>Telescope not found</p>)}

      <button onClick={() => addToCart(selectedProduct)}>
        <Link to='/cart'>Add to cart</Link>
      </button>
    </section>
  )
}