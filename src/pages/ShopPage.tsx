import { useState, useEffect } from "react";
import { useShopContext } from "../hooks/useContext";
import { Link } from "react-router";
import FilterButtons from "../components/FilterButtons.tsx";
import { FaArrowCircleUp } from "react-icons/fa";

export default function ShopPage() {
  const { filteredProducts } = useShopContext();
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="">
      <FilterButtons />

      <div className="mt-8">
        {filteredProducts.map((product) => (
          <div className="flex flex-col items-center" key={product.id}>
            <h3>{product.name}</h3>
            <img
              src={product.image}
              alt="image"
              style={{ maxWidth: "200px" }}
            />
            <p>{product.brand}</p>
            <p>{product.price} $</p>
            <Link
              className="underline"
              to={`/product/${product.product_type}/${product.id}`}
            >
              View details
            </Link>
          </div>
        ))}
      </div>
      {showScrollToTop && (
        <button
          className="fixed right-4 bottom-4"
          onClick={() => scrollToTop()}
        >
          <FaArrowCircleUp className="h-8 w-8 text-gray-400 cursor-pointer" />
        </button>
      )}
    </section>
  );
}
