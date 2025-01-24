import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Telescope } from "./ShopPage";

export default function TelescopePage() {
 const [telescope, setTelescope] = useState<Telescope>()
 const { id } = useParams();

 useEffect(() => {
  const fetchTelescopeById = async () => {
   try {
    const response = await fetch(`http://localhost:3000/api/shop/telescopes/${id}`, { credentials: 'include' });

    if (!response.ok) throw new Error('Error fetching telescope by id');

    const data = await response.json();
    console.log(data);
    setTelescope(data.findTelescopeById);

   } catch (error) {
    console.error('Error fetching telescope', error)
   }
  }

  fetchTelescopeById()
 }, [id]);

 // Soluciona telescope is possible null
 if (!telescope) return <p>Loading...</p>;

 return (
  <>
   <ul>
    <li><h3>{telescope.name}</h3></li>
   <li><p>{telescope.brand}</p></li>
   <li><p>{telescope.description}</p></li>
   <li><p>{telescope.price}</p></li>
   </ul>
  </>
 )
}