import { useNavigate } from "react-router";
import { useCartStore } from "../stores/cartStore";
import { FaEuroSign } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function ShoppingCartPage() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, calculateTotalPrice } =
    useCartStore();

  return (
    <section className="font-space flex h-full flex-col justify-between">
      <h2 className="font-orbitron text-2xl font-bold">Shopping Cart</h2>

      <div className="my-4 flex flex-grow flex-col gap-4 overflow-y-auto rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
        {cartItems.length === 0 && (
          <p className="font-bold">Shopping cart is empty...</p>
        )}

        {cartItems.map((item) => (
          <div
            key={item.product.id}
            className="flex flex-col gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-700"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="size-18 rounded"
              />
              <div className="my-auto text-center">
                <h3 className="font-semibold text-sm">{item.product.name}</h3>
                <p className="font-semibold text-gray-500 dark:text-gray-400">
                  {item.product.brand}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 font-semibold">
                {item.product.price}
                <FaEuroSign />
              </span>

              <div className="flex justify-between gap-4 rounded-full bg-slate-50 px-4 py-1 dark:bg-slate-600">
                <button
                  className=""
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                >
                  <FiMinusCircle className="size-6" />
                </button>
                <span className="text-xl font-medium">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                >
                  <FiPlusCircle className="size-6" />
                </button>
              </div>

              <button onClick={() => removeFromCart(item.product.id)}>
                <RiDeleteBin5Line className="size-6 text-red-300" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total y acciones */}
      {cartItems.length > 0 && (
        <div className="font-space flex flex-col justify-between gap-1 rounded-xl bg-slate-100 dark:bg-slate-800">
          <div className="flex items-center justify-between p-2">
            <span className="font-semibold">Total:</span>
            <span className="font-bold flex items-center gap-1">
              {calculateTotalPrice()}
              <FaEuroSign />
            </span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full rounded-xl bg-slate-50 px-4 py-2 font-semibold dark:bg-slate-700"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      )}
    </section>
  );
}
