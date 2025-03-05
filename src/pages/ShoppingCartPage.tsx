import { useGlobalContext } from "../hooks/useGlobalContext"
import { Link } from "react-router";

export default function ShoppingCartPage() {
 const { cartItems } = useGlobalContext();

 console.log(cartItems);

 // Modify cart quantity and price with buttons

 return (
  <section>
   {
    cartItems ? (
     <div>
      <button>Proceed to checkout</button>
      <div>
       {cartItems.map((item) => (
        <div key={item.name}>
         <p>{item.name}</p>
         <p>{item.brand}</p>
         <button>-</button>
         <button>+</button>
         <button>DELETE</button>
         <p>{item.price} $</p>
        </div>
       ))}
      </div>

     </div>
    ) : <p>There are no products in the shopping cart yet</p>
   }
   <Link to='/'>Back to shop</Link>
  </section>
 )
}