import { Link } from "react-router"
import { useGlobalContext } from "../hooks/useGlobalContext";
import { Telescope } from "../context/GlobalContext";
import { getItem } from "../utils/localStorage";

export default function TelescopePage() {
  const { setCartItems } = useGlobalContext();

  // Get selected telescope from localStorage
  const telescope = getItem('selectedTelescope');

  // Add a telescope to the shopping cart
  const addToCart = (telescope: Telescope) => {
    if (telescope) {
      setCartItems((prevState) => [...prevState, telescope]);
    }
  }

  return (
    <section>
      <Link to='/'>Back to telescopes list</Link>

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