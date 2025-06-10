import { Link } from "react-router";
import { useCartStore } from "../stores/cartStore";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function ShoppingCartPage() {
  const { cartItems, removeFromCart, updateQuantity, calculateTotalPrice } =
    useCartStore();

  return (
    <section>
      <h2>Shopping Cart</h2>

      <div className="border-1 p-1">
        {cartItems.map((item) => (
          <div className="border-1">
            <div className="flex">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="size-24"
              />
              <div>
                <h3>{item.product.name}</h3>
                <p>{item.product.brand_name}</p>
              </div>
            </div>

            <div className="flex justify-between text-center">
              <span>{item.product.price} $</span>
              <div className="rounded-full border-1 px-6">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                >
                  <CiCircleMinus />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                  <CiCirclePlus />
                </button>
              </div>
              <button onClick={() => removeFromCart(item.product.id)}>
                <RiDeleteBin5Line />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="rounded-full border-1 px-4 py-2">
        PROCEED TO CHECKOUT
      </button>
    </section>
  );
}
