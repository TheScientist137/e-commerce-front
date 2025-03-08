import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { setItem, getItem } from "../utils/localStorage";
import { Telescope } from "../context/GlobalContext";

export default function ShopPage() {
  const { setUser } = useGlobalContext();
  const [telescopes, setTelescopes] = useState<Telescope[]>([]); // Lista completa de telescopios
  const [filteredTelescopes, setFilteredTelescopes] = useState<Telescope[]>([]); // Lista filtrada
  const brands = ['all', 'Omegon', 'Skywatcher'];

  // Fetch all products instead only telescopes (add more product tyes)

  // Fetch Telescopes or use localStorage data
  useEffect(() => {
    const fetchTelescopes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/shop/telescopes', {
          credentials: 'include',
        });

        if (response.status === 401) setUser(undefined); // necesario?
        if (!response.ok) throw new Error('Error fetching telescopes');

        const data = await response.json();
        console.log(data.message);

        // Save telescopes data on globalContext
        setTelescopes(data.telescopes);
        setFilteredTelescopes(data.telescopes); // Inicialmente, mostrar todos los telescopios

        // Save telescopes on localStorage
        setItem('telescopes', data.telescopes);
      } catch (error) {
        console.error(error);
      }
    };

    // Verify if there is data on localStorage
    const savedTelescopes = getItem('telescopes');
    if (savedTelescopes) {
      setTelescopes(savedTelescopes);
      setFilteredTelescopes(savedTelescopes); 
      return;
    }

    // If there is no data on localStorage call the api
    fetchTelescopes();
  }, [setUser]);

  // Filter telescopes by brand
  const filterTelescopesByBrand = (brand: string) => {
    if (brand === "all") {
      setFilteredTelescopes(telescopes);
    } else {
      const filtered = telescopes.filter(telescope => telescope.brand === brand);
      setFilteredTelescopes(filtered);
    }
  };

  return (
    <section>
      {/* Filter telescopes by brand */}
      <div>
        <h2>Telescope brands:</h2>
        {brands.map((brand) => (
          <button key={brand} onClick={() => filterTelescopesByBrand(brand)}>
            {brand}
          </button>
        ))}
      </div>

      {/* Lista de telescopios */}
      <div>
        {filteredTelescopes.map((telescope) => (
          <div key={telescope.id}>
            <Link
              to={'/telescope'}
              onClick={() => setItem('selectedTelescope', telescope)}
            >
              <h3>{telescope.name}</h3>
            </Link>
            <p onClick={() => filterTelescopesByBrand(telescope.brand)}>
              Brand: {telescope.brand}
            </p>
            <p>{telescope.description}</p>
            <p>{telescope.price} $</p>
          </div>
        ))}
      </div>
    </section>
  );
}