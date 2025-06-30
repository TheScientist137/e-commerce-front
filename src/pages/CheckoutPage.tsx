import { useState } from "react";
import { useNavigate } from "react-router";
import { useCartStore } from "../stores/cartStore.ts";
import AccountModal from "../components/AccountModal.tsx";
import { FaArrowLeft, FaEuroSign } from "react-icons/fa";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, setCartItems, calculateTotalPrice } = useCartStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleRestart = () => {
    setCartItems([]);
    navigate("/");
  };

  return (
    <section className="font-space flex h-full flex-col justify-between">
      <div
        onClick={() => navigate("/cart")}
        className="flex items-center justify-center gap-4 rounded-xl bg-slate-100 py-2 dark:bg-slate-800"
      >
        <FaArrowLeft />
        <span>Back to cart</span>
      </div>

      <h2 className="font-orbitron mt-4 text-2xl font-bold">Checkout</h2>

      <div className="my-4 flex flex-grow flex-col gap-4 overflow-y-auto rounded-xl bg-slate-100 dark:bg-slate-800">
        {cartItems.map((item) => (
          <div
            className="flex flex-col gap-2 rounded bg-slate-50 p-4 font-semibold dark:bg-slate-700"
            key={item.product.id}
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product.image}
                alt="Product Image"
                className="size-18 rounded"
              />
              <div className="text-center">
                <p className="text-sm">{item.product.name}</p>
                <span className="text-gray-500 dark:text-gray-400">
                  {item.product.brand}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-500 dark:text-gray-400">
                Quantity: <span className="text-black dark:text-white">{item.quantity}</span>
              </p>
              <p className="flex items-center gap-1">
                {(item.product.price * item.quantity).toFixed(2)}
                 <FaEuroSign />
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between rounded-xl bg-slate-100 dark:bg-slate-800">
        <div className="p-2">
          <p className="font-semibold text-gray-500 dark:text-gray-400">
            {cartItems.length} Item{cartItems.length > 1 && <span>s</span>}
          </p>
          <p className="font-semibold flex items-center gap-1">
            Total: {calculateTotalPrice().toFixed(2)} 
            <FaEuroSign />
          </p>
        </div>
        <button
          className="dark:bg-slate-70 rounded-xl bg-slate-50 px-4 py-2 font-semibold dark:bg-slate-700"
          onClick={() => setIsModalOpen(true)}
        >
          PAYMENT
        </button>
      </div>

      {isModalOpen && (
        <AccountModal
          title="Payment"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <div className="flex h-full flex-col justify-between gap-4 rounded-xl bg-slate-100 dark:bg-slate-700">
            <h3 className="text-xl">
              Thanks a lot for exploring StellarScope!
            </h3>
            <p>
              This is a demo store for portfolio purposes. <br />
              No real payment has been processed and no personal data has been
              collected.
            </p>

            {/* Message depending of user authenticated */}
            <p className="">
              If you want you can subscribe if you are not subscribed yet and
              try more features of the application like make product reviews.
            </p>

            <p>
              Feel free to browse more products or check out my other projects
              on Github!
            </p>

            <div className="flex flex-col gap-4">
              <button
                className="rounded-full font-semibold bg-slate-50 py-2 dark:bg-slate-600"
                onClick={() => setIsModalOpen(false)}
              >
                CONTINUE SHOPPING
              </button>
              <button
                className="rounded-full font-semibold bg-slate-50 py-2 dark:bg-slate-600"
                onClick={() => handleRestart()}
              >
                RESTART
              </button>
            </div>
          </div>
        </AccountModal>
      )}
    </section>
  );
}
