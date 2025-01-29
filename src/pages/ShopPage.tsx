import { useEffect, useState } from "react";
import { Link } from "react-router";

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
  description: string // mostrar al pulsar en el tipo
}

export default function ShopPage() {
  const [telescopes, setTelescopes] = useState<Telescope[]>([]);
  const [filterType, setFilterType] = useState<TelescopeType['id']>(0)
  
  useEffect(() => {
    const fetchTelescopes = async () => {
      try {
        let url = 'http://localhost:3000/api/shop/telescopes';
        if (filterType !== 0) url = `http://localhost:3000/api/shop/telescopes/type/${filterType}`;

        const response = await fetch(url, { credentials: 'include' });
        if (!response.ok) throw new Error('Error fetching telescopes');

        const data = await response.json();
        console.log(data.message);
        console.log(data.telescopes);
        setTelescopes(data.telescopes);

      } catch (error) {
        console.error(error);
      }
    }

    fetchTelescopes();
  }, [filterType]);

  return (
    <>
      <section>
        <h1 className="shop-page-title">Welcome to AstroShop</h1>

        <button onClick={() => setFilterType(0)}>All</button>
        <button onClick={() => setFilterType(1)}>Refractor</button>
        <button onClick={() => setFilterType(2)}>Reflector</button>

        <ul>
          {telescopes.map((telescope) => (
            <li key={telescope.id}>
              <Link to={`/telescope/${telescope.id}`}>
                <h3>{telescope.name}</h3>
              </Link>
              <p>{telescope.brand}</p>
              <p>{telescope.description}</p>
              <p>{telescope.price} $</p>
              <p>{telescope.telescopeType.type}</p>
              <p>{telescope.telescopeType.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}