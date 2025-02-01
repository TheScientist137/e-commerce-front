import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import TelescopeCard from "../components/TelescopeCard";

export type Telescope = {
  id: number,
  name: string,
  description: string,
  price: number,
  brand: string,
  telescopeType: TelescopeType,
}

export type TelescopeType = {
  id: number,
  type: string,
  description: string
}

export default function ShopPage() {
  const [telescopes, setTelescopes] = useState<Telescope[]>([]);
  const [telescopeTypes, setTelescopeTypes] = useState<TelescopeType[]>([])
  const [filterType, setFilterType] = useState<number | null>(null);
  const { setUser, user } = useAuth();

  // Refactorizar codigo => services!!

  // Fetch Telescopes
  useEffect(() => {
    const fetchTelescopes = async () => {
      try {
        const url = filterType
          ? `http://localhost:3000/api/shop/telescopes/type/${filterType}`
          : 'http://localhost:3000/api/shop/telescopes';

        const response = await fetch(url, { credentials: 'include' });

        if (response.status === 401) setUser(undefined);
        if (!response.ok) throw new Error('Error fetching telescopes');

        const data = await response.json();
        console.log(data.message)
        setTelescopes(data.telescopes);

      } catch (error) {
        console.error(error);
      }
    }

    fetchTelescopes()
  }, [filterType, user, setUser]);

  // Fetch Telescopes Types
  useEffect(() => {
    const fetchTelescopeTypes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/shop/telescopeTypes', { credentials: 'include' });
        if (!response.ok) throw new Error('Error fetching telescope types');

        const data = await response.json();
        console.log(data.message);
        setTelescopeTypes(data.getTelescopeTypes);

      } catch (error) {
        console.error(error);
      }
    }

    fetchTelescopeTypes();
  }, []);

  // Obtain telescope types
  const [reflector, refractor] = telescopeTypes;

  // Find selected type
  const selectedType = telescopeTypes.find((type) => type.id === filterType);


  return (
    <section>
      <h1 className="shop-page-title">Welcome to AstroShop</h1>

      <div>
        <button onClick={() => setFilterType(null)}>All</button>
        {reflector && <button onClick={() => setFilterType(reflector.id)}>{reflector.type}</button>}
        {refractor && <button onClick={() => setFilterType(refractor.id)}>{refractor.type}</button>}
      </div>

      <div>
        {!selectedType ?
          <p>Showing All Telescopes Types</p> :
          <p>Showing All {selectedType.type} Telescopes: {selectedType.description}</p>}
      </div>

      <TelescopeCard />

      {telescopes.map((telescope) => (
        <ul key={telescope.id}>
          <li><Link to={`/telescope/${telescope.id}`}><h3>{telescope.name}</h3></Link></li>
          <li><p>{telescope.brand}</p></li>
          <li><p>{telescope.description}</p></li>
          <li><p>{telescope.price}</p></li>
          <li><p>{telescope.telescopeType.type}</p></li>
        </ul>))}
    </section>
  )
}