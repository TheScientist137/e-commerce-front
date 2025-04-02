import { Link } from "react-router";
import { useShopContext } from '../hooks/useContext';
import { setItem } from "../utils/localStorage";

export default function TelescopesPage() {
  const { filteredTelescopes, filterTelescopesByBrand } = useShopContext();
  const brands = ['all', 'Omegon', 'Skywatcher'];

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
