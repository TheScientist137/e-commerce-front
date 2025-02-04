import { useEffect, useState } from "react";
import { useParams, Link } from "react-router"
import { useGlobalContext } from "../hooks/useGlobalContext";
import { Telescope } from "./ShopPage";

export default function TelescopePage() {
  const [telescope, setTelescope] = useState<Telescope | undefined>(undefined);
  const { user, setUser, setCartItems } = useGlobalContext();
  const { id } = useParams();

  const addToCart = (telescope: Telescope) => {
    setCartItems((prevState) => [...prevState, telescope])
  }

  useEffect(() => {
    const fetchTelescopeById = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/shop/telescopes/${id}`, { credentials: 'include' });

        if (response.status === 401) setUser(undefined);
        if (!response.ok) throw new Error('Error fetching telescope by id');

        const data = await response.json();
        setTelescope(data.telescope);

      } catch (error) {
        console.error(error);
      }
    }

    fetchTelescopeById()
  }, [id, user, setUser]);

  return (
    <section>
      <Link to='/telescopes'>Back to telescopes list</Link>

      {telescope ? (
        <div>
          <h3>{telescope.name}</h3>
          <p>{telescope.brand}</p>
          <p>{telescope.description}</p>
          <p>{telescope.price}</p>
          <p>{telescope.telescopeType.type}</p>
        </div>
      ) : (null)}

      <button onClick={() => telescope && addToCart(telescope)}>
        <Link to='/cart'>Add to cart</Link>
      </button>

    </section>
  )
}