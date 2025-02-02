import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import TelescopeList from "../components/TelescopeList";

export type Telescope = {
  id: number,
  name: string,
  description: string,
  price: number,
  brand: string,
  telescopeType: TelescopeType,
}

type TelescopeType = {
  id: number,
  type: string,
  description: string
}

export default function ShopPage() {
  const [telescopes, setTelescopes] = useState<Telescope[]>([]);
  const { setUser, user } = useAuth();

  // Refactorizar codigo => services!!

  // Fetch Telescopes
  useEffect(() => {
    const fetchTelescopes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/shop/telescopes', { credentials: 'include' });

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
  }, [user, setUser]);

  // Type Telescope Filter

  return (
    <section>
      <TelescopeList telescopes={telescopes} />
    </section>
  )
}