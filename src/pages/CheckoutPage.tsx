import { useState } from "react";
import { useNavigate } from "react-router";
import { useShopContext } from "../hooks/useContext.ts";
import RedirectModal from '../components/RedirectModal.tsx';

export default function CheckoutPage() {
 const navigate = useNavigate();
 const { cartItems, setCartItems, calculateTotalPrice, formatPrice } = useShopContext();
 const [showModalRedirect, setShowModalRedirect] = useState<boolean>(false)

 const handleShow = () => setShowModalRedirect(true);
 const handleClose = () => setShowModalRedirect(false);
 const handleRestart = () => {
  setCartItems([]);
  navigate('/');
 }

 return (
  <section>
   <div>
    <h2>Checkout</h2>

    <div>
     <p>{cartItems.length} Item{cartItems.length > 1 && <span>s</span>}</p>
     {cartItems.map((item) => (
      <div key={item.product.id}>
       {/* Product Image (small) */}
       <img src={item.product.image} alt="Product Image" />
       <p>{item.product.name}</p>
       <p>Quantity: {item.quantity}</p>
       <p>{formatPrice(item.product.price * item.quantity)} $</p>
      </div>
     ))}
     <p>Total: {formatPrice(calculateTotalPrice())} $</p>
     <button onClick={handleShow}>PAYMENT</button>

     <RedirectModal showModalRedirect={showModalRedirect}>
      <div>
       <p>Thanks a lot for trying the Web Application! :)</p>
       {/* Message depending of user authenticated */}
       <p>If you want you can subscribe if you are not subscribed yet and try more features of the application like make product reviews.</p>
       <button onClick={handleClose}>CONTINUE</button>
       <button onClick={handleRestart}>RESTART</button>
      </div>
     </RedirectModal>
    </div>
   </div>
  </section>
 )
}