import { Link } from "react-router"
import { Telescope } from "../pages/ShopPage"

type TelescopeListProps = {
 telescopes: Telescope[]
}

export default function TelescopeList({ telescopes }: TelescopeListProps) {
 return (
  <div>
   <div>
    {telescopes.map((telescope) => (
     <div key={telescope.id}>
      <Link to={`/telescope/${telescope.id}`}><h3>{telescope.name}</h3></Link>
      <p>Brand: {telescope.brand}</p>
      <p>{telescope.description}</p>
      <p>{telescope.price} $</p>
     </div>
    ))}
   </div>
  </div>
 )
}