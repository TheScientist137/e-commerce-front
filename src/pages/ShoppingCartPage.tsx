import { useGlobalContext } from "../hooks/useGlobalContext"
import { Link } from "react-router";

export default function ShoppingCartPage() {
 const { cartItems } = useGlobalContext();

 console.log(cartItems);

 // make a localStorage.ts file to manage persistedData

 return (
  <section>

   <div>
    {cartItems.map((item) => (
     <div key={item.name}>
      <p>{item.name}</p>
      <p>{item.brand}</p>
      <p>{item.price} $</p>
     </div>
    ))}
   </div>

   <Link to='/telescopes'>Back to shop</Link>
  </section>
 )
}