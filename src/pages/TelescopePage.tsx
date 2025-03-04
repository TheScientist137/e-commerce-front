import { useParams, Link } from "react-router"
import { useGlobalContext } from "../hooks/useGlobalContext";
import { Telescope } from "../context/GlobalContext";

export default function TelescopePage() {
  const { id } = useParams();
  const { telescopes, setCartItems } = useGlobalContext();

  // Find telescope by id if id is not undefined
  const telescope = id && telescopes.find((t) => t.id === parseInt(id));
  console.log(telescope)

  // Add a telescope to the shopping cart
  const addToCart = (telescope: Telescope) => {
    setCartItems((prevState) => [...prevState, telescope]);
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

      <button onClick={() => telescope && addToCart(telescope)}>
        <Link to='/cart'>Add to cart</Link>
      </button>

    </section>
  )
}