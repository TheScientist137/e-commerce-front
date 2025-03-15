import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { setItem, getItem } from "../utils/localStorage";
import { fetchTelescopes } from "../services/shopService";
import { Telescope } from "../types/types";

// Change to ProductPage (mounts and telescopes products)
export default function TelescopesPage() {
  const { setUser } = useGlobalContext();
  const [telescopes, setTelescopes] = useState<Telescope[]>([]); // Lista completa de telescopios
  const [filteredTelescopes, setFilteredTelescopes] = useState<Telescope[]>([]); // Lista filtrada
  const brands = ['all', 'Omegon', 'Skywatcher']; // bring it from api

  // Recommended articles for beginners

  // Create a TelescopesPage => add filters
  // Create a MountsPage => add filters

  // Fetch all products instead only telescopes (add mounts)
  // Fetch Telescopes or use localStorage data
  useEffect(() => {
    const fetchTelescopesData = async () => {
      try {
        const data = await fetchTelescopes();
        // Save telescopes data on globalContext
        setTelescopes(data);
        setFilteredTelescopes(data); // Improve

        // Save telescopes on localStorage
        setItem('telescopes', data);
      } catch (error) {
        console.error('Error fetching telescopes:', error);
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
    fetchTelescopesData();
  }, [setUser]);

  // Filter telescopes by brand function => IMPROVE to filter products byu brand
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
      {/* Filter telescopes by brand => Change to product filter */}
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
              to={'/product'}
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
