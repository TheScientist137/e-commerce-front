import { Link } from "react-router";
import { ProductType } from "../types/types";
import { FaEuroSign } from "react-icons/fa";

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <div
      className="flex h-full flex-col justify-between rounded-lg bg-slate-50 p-3 shadow-lg sm:p-4 md:p-5 lg:p-6 dark:bg-slate-700"
      key={product.id}
    >
      {/* Product Image */}
      <div className="mx-auto mb-4 flex h-36 w-full overflow-hidden rounded bg-gray-100 sm:h-40 md:h-44 lg:h-48 xl:h-52 2xl:h-56">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-grow flex-col items-center justify-between">
        <h3 className="font-mono text-xs font-semibold sm:text-sm md:text-base">
          {product.name}
        </h3>
        <p className="text-xs font-bold text-gray-400 sm:text-sm md:text-base">
          {product.brand}
        </p>
      </div>
      <p className="flex items-center gap-1 font-semibold text-gray-600 dark:text-gray-300">
        {product.price} <FaEuroSign />
      </p>

      {/* Link to SelectedProductPage cambiar a useNavigate() ???????? */}
      <Link
        className="font-bold underline underline-offset-4"
        to={`/product/${product.product_type}/${product.id}`}
      >
        View details
      </Link>
    </div>
  );
}
