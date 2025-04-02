import { Link } from "react-router";
import { setItem } from "../utils/localStorage.ts";
import { useShopContext } from "../hooks/useContext.ts";

export default function MountsPage() {
 const { mounts } = useShopContext();
 console.log(mounts);

 console.log(mounts)
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
      <p>Mounting type: {mount.mount_type}</p>
      <p>{mount.description}</p>
      <p>{mount.price} $</p>
     </div>
    ))}
   </div>
  </section>
 )
}