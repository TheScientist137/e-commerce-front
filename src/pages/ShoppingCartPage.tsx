import { useGlobalContext } from "../hooks/useGlobalContext"
import { Link } from "react-router";

export default function ShoppingCartPage() {
 const { cartItems, setCartItems } = useGlobalContext();

 // Remove an item/items from the shopping cart
 const removeItem = (id: number) => {
  setCartItems((prevItems) => prevItems.filter(item => item.product.id !== id));
 }

 // Increment the quantity of an item
 const incrementQuantity = (id: number) => {
  setCartItems((prevItems) => {
   return prevItems.map((item) => item.product.id === id ?
    { ...item, quantity: item.quantity + 1 } :
    item
   );
  });
 }

 // Decrement the quantity of an item
 const decrementQuantity = (id: number) => {
  setCartItems((prevItems) => {
   return prevItems.map((item) => item.product.id === id && item.quantity > 1 ?
    { ...item, quantity: item.quantity - 1 } :
    item
   );
  });
 }

 // Calculate total items price
 const calculateTotalPrice = () => {
  return cartItems.reduce((total, item) =>
   total + item.product.price * item.quantity, 0);
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
        <button onClick={() => decrementQuantity(item.product.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => incrementQuantity(item.product.id)}>+</button>
        <button onClick={() => removeItem(item.product.id)}>DELETE</button>
        <p>{item.product.price * item.quantity} $</p>
       </div>
      ))}
     </div>
     <p>Total: {calculateTotalPrice()}</p>
     <button>Proceed to checkout</button>
    </div>
   ) : <p>Empty cart</p>
   }

   <Link to='/'>Back to shop</Link>
  </section>
 )
}