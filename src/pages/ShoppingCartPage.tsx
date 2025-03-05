import { useGlobalContext } from "../hooks/useGlobalContext"
import { Link } from "react-router";

export default function ShoppingCartPage() {
 const { cartItems } = useGlobalContext();

 console.log(cartItems);

 // Modify cart quantity and price with buttons

 return (
  <section>
   <div>
    {cartItems.map((item) => (
     <div key={item.name}>
      <p>{item.name}</p>
      <p>{item.brand}</p>
      <button>-</button>
      <button>+</button>
      <p>{item.price} $</p>
     </div>
    ))}
   </div>

   <Link to='/'>Back to shop</Link>
  </section>
 )
}