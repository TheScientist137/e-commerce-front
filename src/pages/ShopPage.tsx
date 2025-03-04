import { useEffect } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { Link } from "react-router";
import { setItem, getItem } from "../utils/localStorage";

export default function ShopPage() {
  const { setUser, telescopes, setTelescopes } = useGlobalContext();

  // Refactorizar codigo => services!!

  // Fetch Telescopes
  useEffect(() => {
    const fetchTelescopes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/shop/telescopes',
          { credentials: 'include' });

        if (response.status === 401) setUser(undefined);
        if (!response.ok) throw new Error('Error fetching telescopes');

        const data = await response.json();
        console.log(data.message);

        // Save telescopes data on globalContext
        setTelescopes(data.telescopes);

        // Save telescopes on localStorage
        setItem('telescopes', data.telescopes);
      } catch (error) {
        console.error(error);
      }
    }

    // Verify if there is data on localStorage
    // If there is data we use that data and do not call the api
    const savedTelescopes = getItem('telescopes');
    if (savedTelescopes) {
      setTelescopes(savedTelescopes);
      return;
    }

    // If there is no data on localStorage call the api
    fetchTelescopes()
  }, [setUser, setTelescopes]);

  // Type Telescope Filter

  return (
    <section>
      <div>
        {telescopes.map((telescope) => (
          <div key={telescope.id}>
            <Link to={`/telescope/${telescope.id}`}><h3>{telescope.name}</h3></Link>
            <p>Brand: {telescope.brand}</p>
            <p>{telescope.description}</p>
            <p>{telescope.price} $</p>
          </div>
        ))}
      </div>
    </section>
  )
}