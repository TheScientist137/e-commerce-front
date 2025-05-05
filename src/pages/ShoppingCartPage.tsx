import { Link } from "react-router";
import { useShopContext } from "../hooks/useContext"

export default function ShoppingCartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    calculateTotalPrice
  } = useShopContext();


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
                <img src={item.product.image} alt="Product Image" />
                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                <button onClick={() => removeFromCart(item.product.id)}>DELETE</button>
                <p>{(item.product.price * item.quantity).toFixed(2)} $</p>
              </div>
            ))}
          </div>
          <p>Total: {(calculateTotalPrice()).toFixed(2)} $</p>
          <button><Link to='/checkout'>Proceed to checkout</Link></button>
        </div>
      ) : <p>Empty cart</p>
      }

      <Link to='/'>Back to shop</Link>
    </section>
  )
}