import { useUiStore } from "../stores/uiStore";
import { FaRegArrowAltCircleDown } from "react-icons/fa";

export default function HomePage() {
  const {
    setIsMenuOpen,
    isMenuOpen,
    setIsLoginModalOpen,
    setIsSignupModalOpen,
  } = useUiStore();

  return (
    <section className="flex h-full flex-col items-center gap-12">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="font-orbitron text-4xl">Welcome To StellarScope!</h1>
        <p className="font-space text-xl font-black">
          {" "}
          Discover the best astronomy equipment!
        </p>
      </div>

        {/* Browse Products */}
      <div className="flex flex-col items-center gap-4">
        <FaRegArrowAltCircleDown size={46} className="animate-bounce" />
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="font-orbitron shadow-x cursor-pointer rounded-2xl bg-slate-50 px-6 py-4 text-lg font-semibold dark:bg-slate-700"
        >
          BROWSE PRODUCTS
        </button>
      </div>

      {/* Authentication */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="font-orbitron mb-2 cursor-pointer rounded-2xl bg-slate-50 px-4 py-2 font-semibold dark:bg-slate-700"
        >
          LOGIN
        </button>
        <div className="text-center text-sm">
          <p className="font-space text-base font-semibold">
            Still do not have an account?
          </p>
          <span
            onClick={() => setIsSignupModalOpen(true)}
            className="ml-2 cursor-pointer text-lg underline decoration-violet-500 underline-offset-2"
          >
            Signup
          </span>
        </div>
      </div>
    </section>
  );
}
