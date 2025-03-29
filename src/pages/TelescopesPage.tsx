import { useState, useEffect } from "react";
import { Link } from "react-router";
// import { useGlobalContext } from "../hooks/useGlobalContext";
import { setItem, getItem } from "../utils/localStorage";
import { fetchTelescopes } from "../services/shopService";
import { Telescope } from "../types/types";

export default function TelescopesPage() {
  // const { setUser } = useGlobalContext();
  const [telescopes, setTelescopes] = useState<Telescope[]>([]); // Lista completa de telescopios
  const [filteredTelescopes, setFilteredTelescopes] = useState<Telescope[]>([]); // Lista filtrada
  const brands = ['all', 'Omegon', 'Skywatcher']; // bring it from api

  // Fetch Telescopes or use localStorage data
  useEffect(() => {
    const fetchTelescopesData = async () => {
      try {
        const data = await fetchTelescopes();
        setTelescopes(data);
        setFilteredTelescopes(data);

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
      console.log(savedTelescopes);
      return;
    }

    // If there is no data on localStorage call the api
    fetchTelescopesData();
  }, []);

  // Filter telescopes by brand function => IMPROVE to filter products by brand
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
      {/* Filter telescopes by type and optical design */}
      <h3>Type</h3>
      <h3>Optical design</h3>

      {/* Filter telescopes by brand => Change to product filter */}
      <div>
        <h2>Telescope brands:</h2>
        {brands.map((brand) => (
          <button key={brand} onClick={() => filterTelescopesByBrand(brand)}>
            {brand}
          </button>
        ))}
      </div>

      {/* Lista de telescopios -- Crear un componente separado y reutilizable para monturas */}
      <div>
        {filteredTelescopes.map((telescope) => (
          <div key={telescope.id}>
            <Link
              to={'/product'}
              onClick={() => setItem('selectedProduct', telescope)}
            >
              <h3>{telescope.name}</h3>
            </Link>
            <p onClick={() => filterTelescopesByBrand(telescope.brand)}>
              Brand: {telescope.brand}
            </p>
            <p>Type: {telescope.telescope_type}</p>
            <p>Optical design: {telescope.optical_design_type}</p>
            <p>{telescope.description}</p>
            <p>{telescope.price} $</p>
          </div>
        ))}
      </div>
    </section>
  );
}
