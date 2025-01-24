import { useEffect, useState } from "react";
import { Link } from "react-router";

export type Telescope = {
 id: number,
 name: string,
 description: string,
 price: number,
 brand: string,
 telescopeTypeId: number
}

export default function ShopPage() {
 const [telescopes, setTelescopes] = useState<Telescope[]>([]);

 useEffect(() => {
  const fetchTelescopes = async () => {
   try {
    const response = await fetch('http://localhost:3000/api/shop/telescopes', { credentials: 'include' });
    if (!response.ok) throw new Error('Error fetching telescopes');

    const data = await response.json();
    console.log(data.message);
    setTelescopes(data.findTelescopes);

   } catch (error) {
    console.error('Error fetching telescopes', error);
   }
  }

  fetchTelescopes();
 }, []);

 return (
  <>
   <section>
    <h1 className="shop-page-title">Welcome to AstroShop</h1>
    <ul>
     {telescopes.map((telescope) => (
       <li key={telescope.id}>
        <Link to={`/telescope/${telescope.id}`}>
         <h3>{telescope.name}</h3>
        </Link>
        <p>{telescope.brand}</p>
        <p>{telescope.description}</p>
        <p>{telescope.price} $</p>
       </li>
     ))}
    </ul>
   </section>
  </>
 )
}