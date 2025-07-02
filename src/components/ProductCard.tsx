import { Link } from "react-router";
import { ProductType } from "../types/types";
import { FaEuroSign } from "react-icons/fa";

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <div
      className="flex h-full flex-col justify-between rounded-lg bg-slate-50 p-4 text-center shadow-lg dark:bg-slate-700"
      key={product.id}
    >
      {/* Product Image */}
      <div className="flex h-42 w-full items-center justify-center overflow-hidden rounded bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="my-4 flex flex-grow flex-col justify-between items-center">
        <div className="">
          <p className="text-gray-400 font-bold">{product.brand}</p>
          <h3 className="my-2 font-mono text-base font-semibold">
            {product.name}
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1 font-semibold">
          {product.price} <FaEuroSign />
        </p>
      </div>

      {/* Link to SelectedProductPage cambiar a useNavigate() ???????? */}
      <Link
        className="underline font-bold underline-offset-4"
        to={`/product/${product.product_type}/${product.id}`}
      >
        View details
      </Link>
    </div>
  );
}
