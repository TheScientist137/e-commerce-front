import { useState } from "react"
import { Link } from "react-router"
import { Telescope } from "../pages/ShopPage"

type TelescopeCardProps = {
 telescopes: Telescope[]
}

export default function TelescopeList({ telescopes }: TelescopeCardProps) {
 const [filterType, setFilterType] = useState<number | null>(null);

 // Type Telescope Filter
 const filterTelescopes = filterType ?
  telescopes.filter((telescope) => telescope.telescopeType.id === filterType) :
  telescopes;

 return (
  <div>
   <div>
    <button onClick={() => setFilterType(null)}>All</button>
    <button onClick={() => setFilterType(1)}>Reflector</button>
    <button onClick={() => setFilterType(2)}>Refractor</button>
   </div>


   {filterTelescopes.map((telescope) => (
    <div key={telescope.id}>
     <Link to={`/telescope/${telescope.id}`}><h3>{telescope.name}</h3></Link>
     <p>Brand: {telescope.brand}</p>
     <p>{telescope.description}</p>
     <p>{telescope.price} $</p>
     <p>Type: {telescope.telescopeType.type}</p>
    </div>
   ))}
  </div>
 )
}