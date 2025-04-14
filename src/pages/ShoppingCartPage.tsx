import { Link } from "react-router";
import { useShopContext } from "../hooks/useContext"

export default function ShoppingCartPage() {
 const { cartItems, removeFromCart, updateQuantity } = useShopContext();

 // Calculate total items price
 const calculateTotalPrice = () => {
  return cartItems.reduce((total, item) =>
   total + item.product.price * item.quantity, 0);
 }

 // Format price with 2 decimal places
 const formatPrice = (price: number) => {
  return price.toFixed(2);
 }

 return (
  <section>
   {cartItems.length > 0 ? (
    <div>
     <div>
      {cartItems.map((item) => (
       <div key={item.product.id}>
        {/* Item Image */}
        <p>{item.product.name}</p>
        <p>{item.product.brand}</p>
        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
        <button onClick={() => removeFromCart(item.product.id)}>DELETE</button>
        <p>{formatPrice(item.product.price * item.quantity)} $</p>
       </div>
      ))}
     </div>
     <p>Total: {calculateTotalPrice()}</p>
     <button><Link to='/checkout'>Proceed to checkout</Link></button>
    </div>
   ) : <p>Empty cart</p>
   }

   <Link to='/'>Back to shop</Link>
  </section>
 )
}