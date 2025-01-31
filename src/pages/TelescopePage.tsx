import { useEffect, useState } from "react";
import { useParams, Link } from "react-router"
import { Telescope } from "./ShopPage";

export default function TelescopePage() {
 const [telescope, setTelescope] = useState<Telescope | undefined>(undefined);
 const { id } = useParams();

 useEffect(() => {
  const fetchTelescopeById = async () => {
   try {
    const response = await fetch(`http://localhost:3000/api/shop/telescopes/${id}`, { credentials: 'include' });
    if (!response.ok) throw new Error('Error fetching telescope by id');

    const data = await response.json();
    setTelescope(data.telescope);

   } catch (error) {
    console.error('Error fetching telescope', error)
   }
  }

  fetchTelescopeById()
 }, [id]);

 return (
  <>
   <Link to='/telescopes'>Back to telescopes list</Link>

   {telescope ? (
    <ul>
     <li><h3>{telescope.name}</h3></li>
     <li><p>{telescope.brand}</p></li>
     <li><p>{telescope.description}</p></li>
     <li><p>{telescope.price}</p></li>
     <li><p>{telescope.telescopeType.type}</p></li>
    </ul>
   ) : (null)}
  </>
 )
}