import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Mount } from "../types/types";
import { fetchMounts } from "../services/shopService";
import { getItem, setItem } from "../utils/localStorage";

export default function MountsPage() {
 const [mounts, setMounts] = useState<Mount[]>([]);
 const [filteredMounts, setFilteredMounts] = useState<Mount[]>([]);

 useEffect(() => {
  const fetchMountsData = async () => {
   try {
    const data = await fetchMounts();
    setMounts(data);

    // Save mounts on localStorage
    setItem('mounts', data);

   } catch (error) {
    console.error('Error fetching mounts', error);
   }
  }

  // Verify if there is data on localStorage
  const savedMounts = getItem('mounts');
  if (savedMounts) {
   setMounts(savedMounts);
   console.log(savedMounts);
   return;
  }

  fetchMountsData();
 }, [])

 return (
  <section>
   <h3>Mounting types</h3>

   {/* Lista de monturas */}
   <div>
    {mounts.map((mount) => (
     <div key={mount.id}>
      <Link
       to={'/product'}
       onClick={() => setItem('selectedProduct', mount)}
      >
       <h3>{mount.name}</h3>
      </Link>
      <p>{mount.brand}</p>
      <p>{mount.description}</p>
      <p>{mount.price}</p>
      <p>Mounting type: {mount.mount_type}</p>
     </div>
    ))}
   </div>
  </section>
 )
}