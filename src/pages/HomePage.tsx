import { useUiStore } from "../stores/uiStore";

export default function HomePage() {
  const { setIsMenuOpen, isMenuOpen, setIsLoginModalOpen, setIsSignupModalOpen } =
    useUiStore();

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
        className="mb-6 rounded-2xl border-2 p-2 text-xl"
      >
        BROWSE PRODUCTS
      </button>

      {/* Authentication */}
      <div className="">
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="mb-2 rounded-2xl border-2 p-2 font-semibold"
        >
          LOGIN
        </button>
        <div className="text-sm">
          <p className="text-base">Still do not have an account?</p>
          <span
            onClick={() => setIsSignupModalOpen(true)}
            className="ml-2 text-base text-purple-600 underline"
          >
            Signup
          </span>
        </div>
      </div>
    </section>
  );
}
