import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router"
import { Telescope } from "./ShopPage";
import { useAuth } from "../hooks/useAuth";

export default function TelescopePage() {
 const [telescope, setTelescope] = useState<Telescope | undefined>(undefined);
 const navigate = useNavigate();
 const { id } = useParams();
 const { user } = useAuth();

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
 }, [id, user, navigate]);

 return (
  <>
   <Link to='/telescopes'>Back to telescopes list</Link>

   {telescope ? (
    <ul>
     <li><h3>{telescope.name}</h3></li>
     <li><p>{telescope.brand}</p></li>
     <li><p>{telescope.description}</p></li>
     <li><p>{telescope.price}</p></li>
    </ul>
   ) : (null)}
  </>
 )
}