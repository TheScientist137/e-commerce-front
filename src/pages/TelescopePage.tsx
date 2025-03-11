import { Link } from "react-router"
import { useGlobalContext } from "../hooks/useGlobalContext";
import { getItem } from "../utils/localStorage";
import { Telescope } from "../types/types";

// Change to ProductPage (mounts and telescopes products)
export default function TelescopePage() {
  const { setCartItems } = useGlobalContext();

  // Get selected telescope from localStorage
  const telescope = getItem('selectedTelescope');

  // Change this function to accept different products (not only telescopes)
  // Add a telescope to the shopping cart or
  // increment quantity if the item already exists in the shopping cart
  const addToCart = (telescope: Telescope) => {
    if (!telescope) return;

    setCartItems((prevState) => {
      const existingItem = prevState.find(item => item.product.id === telescope.id);
      // If existingItem exists return a new array with the quantity of that item incremented
      if (existingItem) {
        return prevState.map(item =>
          item.product.id === telescope.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ); // Otherwise return a new array with the new item
      } else {
        return [...prevState, { product: telescope, quantity: 1 }];
      }
    });
  }

  return (
    <section>
      <Link to='/'>Back shop</Link>

      {telescope ? (
        <div>
          <h3>{telescope.name}</h3>
          <p>{telescope.brand}</p>
          <p>{telescope.description}</p>
          <p>{telescope.price}</p>
        </div>
      ) : (<p>Telescope not found</p>)}

      <button onClick={() => addToCart(telescope)}>
        <Link to='/cart'>Add to cart</Link>
      </button>
    </section>
  )
}