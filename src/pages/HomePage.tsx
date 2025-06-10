import { useUiStore } from "../stores/uiStore";

export default function HomePage() {
  const {
    setIsMenuOpen,
    isMenuOpen,
    setIsLoginModalOpen,
    setIsSignupModalOpen,
  } = useUiStore();

  return (
    <section className="flex h-full flex-col px-12 text-center">
      <div className="my-12 flex flex-col gap-2">
        <h1 className="font-orbitron text-4xl">Welcome!</h1>
        <p className="font-space text-xl font-black">
          {" "}
          Discover the best astronomy equipment!
        </p>
      </div>

      {/* Browse Products */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="font-orbitron shadow-x mb-6 cursor-pointer rounded-2xl bg-slate-50 p-2 text-lg font-semibold shadow-lg dark:bg-slate-700"
      >
        BROWSE PRODUCTS
      </button>

      {/* Authentication */}
      <div className="">
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="font-orbitron mb-2 cursor-pointer rounded-2xl bg-slate-50 px-4 py-2 font-semibold shadow-lg dark:bg-slate-700"
        >
          LOGIN
        </button>
        <div className="text-sm">
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
