import { useEffect, useState } from "react"
import { getItem, removeItem, setItem } from "../utils/localStorage"
import { Link } from "react-router"
import { Telescope } from "../pages/ShopPage"

type TelescopeListProps = {
 telescopes: Telescope[]
}

export default function TelescopeList({ telescopes }: TelescopeListProps) {
 const [filterType, setFilterType] = useState<number | undefined>(() => getItem('filterType') || undefined);

 // Guardar filtro en localStorage cuando cambie
 useEffect(() => {
  setItem('filterType', filterType)
 }, [filterType]);

 // Type Telescope Filter
 const filterTelescopes = filterType ?
  telescopes.filter((telescope) => telescope.telescopeType.id === filterType) :
  telescopes;

 // Mejorar y emtender mejor!!!!!!!!!!!
 const telescopeType = filterType !== null && telescopes.find((t) => t.telescopeType.id === filterType)?.telescopeType;

 return (
  <div>
   <div>
    <button onClick={() => {
     setFilterType(undefined);
     removeItem('filterType'); // Eliminar de local storage al resetear el filtro a undefined
    }}>All</button>
    <button onClick={() => setFilterType(1)}>Reflector</button>
    <button onClick={() => setFilterType(2)}>Refractor</button>
   </div>

   <div>
    {telescopeType ? <p>{telescopeType.description}</p> : undefined}
   </div>

   <div>
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
  </div>
 )
}